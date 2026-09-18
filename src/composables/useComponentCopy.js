import { useStyleManager } from "./useStyleManager";
import { useComponentEditor } from "./useComponentEditor";
import { componentRegistry } from "@/config/componentRegistry";

export function useComponentCopy() {
  const { selectedComponent } = useStyleManager();
  const { overrides } = useComponentEditor();

  const copySelectedComponent = async () => {
    const component = selectedComponent.value;
    if (!component) return { ok: false, error: "No component is selected." };

    const registryEntry = componentRegistry[component.id];
    if (!registryEntry?.source) {
      return { ok: false, error: "The selected component source is unavailable." };
    }

    try {
      const response = await registryEntry.source();
      const source = typeof response === "string" ? response : response?.default;
      if (typeof source !== "string" || !source.trim()) {
        return { ok: false, error: "The component source is empty." };
      }

      const withStyles = applyStyleValues(source, component.styles || {});
      const finalSource = appendElementOverrides(
        withStyles,
        overrides[component.id] || {}
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

  return { copySelectedComponent };
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
    return `.${selector} {\n${rules}\n}`;
  }).join("\n\n");

  if (source.includes("</style>")) {
    return source.replace(/<\/style>/i, `${css}\n</style>`);
  }

  return `${source}\n\n<style scoped>\n${css}\n</style>`;
}

function toKebabCase(value) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
