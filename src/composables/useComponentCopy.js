import { useComponentManager } from "./useComponentManager";
import { useComponentEditor } from "./useComponentEditor";
import { componentRegistry } from "@/config/componentRegistry";
import { useEditor } from "./useEditor";

export function useComponentCopy() {
  const { components, selectedComponent } = useComponentManager();
  const { overrides, contentOverrides } = useComponentEditor();
  const { document } = useEditor();

  const copySelectedComponent = async (componentId = null) => {
    // Prefer the editor's explicit active ID. The global selectedComponent can
    // lag behind the canvas when component switching happens elsewhere.
    const component = componentId
      ? components[componentId] || componentRegistry[componentId]
        || (componentId.startsWith("playground-") ? { id: componentId, styles: {} } : null)
      : selectedComponent.value;
    if (!component) return { ok: false, error: "No component is selected." };

    const isPlayground = component.id.startsWith("playground-");
    const registryEntry = componentRegistry[component.id];
    if (!registryEntry?.source && !isPlayground) {
      return { ok: false, error: "The selected component source is unavailable." };
    }

    try {
      const response = isPlayground
        ? "<template>\n</template>"
        : typeof registryEntry.source === "function"
          ? await registryEntry.source()
          : registryEntry.source;
      const source = typeof response === "string" ? response : response?.default;
      if (typeof source !== "string" || !source.trim()) {
        return { ok: false, error: "The component source is empty." };
      }

      const withStyles = applyStyleValues(source, component.styles || {});
      const withElementStyles = appendElementOverrides(
        withStyles,
        overrides[component.id] || {}
      );
      const withContent = appendContentOverrides(
        withElementStyles,
        contentOverrides[component.id] || {}
      );
      const finalSource = appendBuilderContent(
        withContent,
        document.componentChildren,
        document.children,
        isPlayground
      );

      await writeClipboard(finalSource);
      return { ok: true, source: finalSource };
    } catch (error) {
      console.error("Failed to copy component:", error);
      return {
        ok: false,
        error: error?.message || "Unable to copy the component source."
      };
    }
  };

  const copySection = async (sectionId) => {
    const section = findNode(document.children, sectionId);
    if (!section || section.type !== "section") return { ok: false, error: "No section is selected." };
    try {
      await writeClipboard(serializeNode(section, 0));
      return { ok: true, source: serializeNode(section, 0) };
    } catch (error) {
      console.error("Failed to copy section:", error);
      return { ok: false, error: error?.message || "Unable to copy the section." };
    }
  };

  return { copySelectedComponent, copySection };
}

async function writeClipboard(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (_) {
      // Fall through for insecure origins or denied Clipboard API permissions.
    }
  }

  if (typeof document === "undefined") {
    throw new Error("Clipboard access is unavailable in this environment.");
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);

  let copied = false;
  try {
    textarea.focus();
    textarea.select();
    copied = document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }

  if (!copied) {
    throw new Error("Clipboard permission was denied. Please allow clipboard access and try again.");
  }
}

function applyStyleValues(source, styles) {
  let updatedSource = source;
  Object.entries(styles).forEach(([name, value]) => {
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(${escapedName}\\s*:\\s*["'])[^"']*(["'])`, "g");
    updatedSource = updatedSource.replace(pattern, `$1${value}$2`);
  });
  return updatedSource;
}

function appendElementOverrides(source, overrides) {
  const entries = Object.entries(overrides);
  if (!entries.length) return source;

  const css = entries.map(([selector, styles]) => {
    const rules = Object.entries(styles)
      .map(([property, value]) => `  ${toKebabCase(property)}: ${value};`)
      .join("\n");
    return `${normalizeSelector(selector)} {\n${rules}\n}`;
  }).join("\n\n");

  if (source.includes("</style>")) {
    return source.replace(/<\/style>/i, `${css}\n</style>`);
  }

  return `${source}\n\n<style scoped>\n${css}\n</style>`;
}

function normalizeSelector(selector) {
  const value = String(selector || "").trim();
  if (!value) return "";
  return value.startsWith(".") ||
    value.startsWith("#") ||
    value.includes(" ") ||
    value.includes("[") ||
    value.includes(":")
    ? value
    : "." + value;
}

function toKebabCase(value) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}


function appendContentOverrides(source, content) {
  const entries = Object.values(content || {}).filter((entry) => entry && typeof entry === "object" && entry.text !== undefined);
  if (!entries.length) return source;
  let updatedSource = source;
  entries.forEach((entry) => {
    const original = String(entry.originalText ?? "");
    const replacement = String(entry.text ?? "");
    if (!original || original === replacement) return;
    if (entry.tag) updatedSource = replaceTagTextOccurrence(
      updatedSource,
      entry.tag,
      entry.className === undefined ? null : String(entry.className || ""),
      original,
      replacement,
      Number(entry.occurrence) || 0
    );
    else updatedSource = replaceTextOccurrence(updatedSource, original, replacement, Number(entry.occurrence) || 0);
  });
  return updatedSource;
}

function replaceTagTextOccurrence(source, tag, className, original, replacement, occurrence) {
  const templateMatch = source.match(/<template\b[^>]*>[\s\S]*?<\/template>/i);
  if (!templateMatch) return source;

  const template = templateMatch[0];
  const pattern = new RegExp(
    "(<" + tag + "\\b[^>]*>)([\\s\\S]*?)(</" + tag + ">)",
    "gi"
  );
  const legacyMatch = className === null;
  const classPattern = className
    ? new RegExp("\\bclass\\s*=\\s*[\\\"'][^\\\"']*\\b" + escapeRegExp(className) + "\\b[^\\\"']*[\\\"']", "i")
    : null;

  let index = 0;
  let match;

  while ((match = pattern.exec(template))) {
    const openingTag = match[1];
    const inner = match[2];

    if (classPattern && !classPattern.test(openingTag)) continue;
    if (inner.includes("<") || inner.includes(">")) continue;
    if (legacyMatch && inner.trim() !== original.trim()) continue;

    if (index !== occurrence) {
      index += 1;
      continue;
    }

    const safeReplacement = escapeHtml(replacement);
    const nextInner = inner.includes("{{") || inner.trim() !== original.trim()
      ? safeReplacement
      : inner.replace(original, safeReplacement);

    const nextTemplate =
      template.slice(0, match.index) +
      openingTag +
      nextInner +
      match[3] +
      template.slice(match.index + match[0].length);

    return source.replace(template, nextTemplate);
  }

  return source;
}


function replaceTextOccurrence(source, original, replacement, occurrence) {
  let from = 0;
  let index = 0;
  while (true) {
    const found = source.indexOf(original, from);
    if (found === -1) return source;
    if (index === occurrence) return source.slice(0, found) + replacement + source.slice(found + original.length);
    index += 1;
    from = found + original.length;
  }
}

function appendBuilderContent(source, componentChildren, sections, includeAllPageNodes = false) {
  const children = Array.isArray(componentChildren) ? componentChildren : [];
  const pageSections = Array.isArray(sections)
    ? sections.filter((node) => includeAllPageNodes || node?.type === "section")
    : [];
  const nodes = [...children, ...pageSections];
  if (!nodes.length) return source;

  const iconNames = new Set();
  const markup = nodes.map((node) => serializeNode(node, 2, iconNames)).join("\n\n");
  const withIcons = ensureIconResolver(source, iconNames);

  if (/<\/template>/i.test(withIcons)) {
    return withIcons.replace(/<\/template>/i, "\n\n" + markup + "\n</template>");
  }

  return "<template>\n" + markup + "\n</template>\n\n" + withIcons;
}

function ensureIconResolver(source, iconNames) {
  if (!iconNames.size) return source;
  const imports = 'import { resolveIcon } from "@/config/iconLibrary";';
  const scriptMatch = source.match(/<script setup\b[^>]*>[\s\S]*?<\/script>/i);
  if (scriptMatch) {
    if (/\bresolveIcon\b/.test(scriptMatch[0])) return source;
    return source.replace(scriptMatch[0], scriptMatch[0].replace(/<script setup\b([^>]*)>/i, `<script setup$1>\n${imports}`));
  }
  const names = [...iconNames].map((name) => JSON.stringify(name)).join(", ");
  return `<script setup>\n${imports}\n</script>\n\n${source}`;
}

function serializeNode(node, depth = 0, iconNames = new Set()) {
  const indent = " ".repeat(depth);
  const style = styleAttribute(node.styles);
  const attrs = style ? ` style="${escapeAttribute(style)}"` : "";

  switch (node.type) {
    case "section":
      return wrapNode("section", node, attrs, depth, iconNames);
    case "column":
      return wrapNode("div", node, attrs, depth, iconNames);
    case "container":
      return wrapNode("div", node, attrs, depth, iconNames);
    case "heading": {
      const tag = /^h[1-6]$/i.test(node.props?.tag) ? node.props.tag : "h2";
      return `${indent}<${tag}${attrs}>${escapeHtml(node.props?.text || "")}</${tag}>`;
    }
    case "text":
      return `${indent}<p${attrs}>${escapeHtml(node.props?.text || "")}</p>`;
    case "button": {
      const href = escapeAttribute(node.props?.href || "#");
      return `${indent}<a href="${href}"${attrs}>${escapeHtml(node.props?.text || "Button")}</a>`;
    }
    case "image": {
      const src = escapeAttribute(node.props?.src || "");
      const alt = escapeAttribute(node.props?.alt || "");
      return `${indent}<img src="${src}" alt="${alt}"${attrs} />`;
    }
    case "icon": {
      const name = String(node.props?.icon || "Heart");
      iconNames.add(name);
      const aria = node.props?.decorative
        ? ' aria-hidden="true"'
        : ` role="img" aria-label="${escapeAttribute(node.props?.ariaLabel || node.props?.title || name)}"`;
      const svg = `<component :is="resolveIcon(${JSON.stringify(name)})" :size="'100%'" :stroke-width="${Number(node.props?.strokeWidth) || 2}"${aria} focusable="false" />`;
      if (node.props?.href) {
        const target = node.props?.newTab ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `${indent}<a href="${escapeAttribute(node.props.href)}"${target}${attrs}>${svg}</a>`;
      }
      return `${indent}<span${attrs}>${svg}</span>`;
    }
    case "icon-list": {
      const name = String(node.props?.icon || "Check");
      iconNames.add(name);
      const items = Array.isArray(node.props?.items) ? node.props.items : [];
      const styleValue = styleAttribute(node.styles);
      const listAttrs = styleValue ? ` style="${escapeAttribute(styleValue)}"` : "";
      const itemStyle = "display: flex; align-items: flex-start; gap: 9px;";
      const iconStyle = "flex: 0 0 auto; margin-top: .25em;";
      const rows = items.map((item) => {
        const safeItem = escapeHtml(item);
        const icon = `<component :is="resolveIcon(${JSON.stringify(name)})" :size="16" aria-hidden="true" />`;
        return `${" ".repeat(depth + 2)}<div style="${itemStyle}">\\n${" ".repeat(depth + 4)}${icon.replace(" aria-hidden=", ` style="${iconStyle}" aria-hidden=`)}\\n${" ".repeat(depth + 4)}<span>${safeItem}</span>\\n${" ".repeat(depth + 2)}</div>`;
      }).join("\\n");
      return `${indent}<div${listAttrs}>${rows ? "\\n" + rows + "\\n" + indent : ""}</div>`;
    }
    case "component": {
      const children = (node.children || [])
        .map((child) => serializeNode(child, depth, iconNames))
        .join("\n");
      const marker = `${indent}<!-- Registered component "${escapeHtml(node.props?.componentId || "unknown")}" is rendered by the builder. -->`;
      return children ? marker + "\n" + children : marker;
    }
    default:
      return `${indent}<!-- Unsupported builder node: ${escapeHtml(node.type || "unknown")} -->`;
  }
}

function wrapNode(tag, node, attrs, depth, iconNames) {
  const indent = " ".repeat(depth);
  const children = (node.children || [])
    .map((child) => serializeNode(child, depth + 2, iconNames))
    .join("\n");
  if (!children) return `${indent}<${tag}${attrs}></${tag}>`;
  return `${indent}<${tag}${attrs}>\n${children}\n${indent}</${tag}>`;
}

function styleAttribute(styles) {
  if (!styles || typeof styles !== "object") return "";
  return Object.entries(styles)
    .filter(([, value]) => value !== null && value !== undefined && String(value).trim() !== "")
    .map(([property, value]) => `${toKebabCase(property)}: ${String(value).trim()};`)
    .join(" ");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^$()|[\]\\]/g, "\\$&");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function findNode(nodes, id) {
  for (const node of nodes || []) {
    if (node.id === id) return node;
    const found = findNode(node.children || [], id);
    if (found) return found;
  }
  return null;
}
