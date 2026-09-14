import { useStyleManager } from "./useStyleManager";
import { useComponentEditor } from "./useComponentEditor";
import { componentRegistry } from "@/config/componentRegistry";

export function useComponentCopy() {
  const { selectedComponent } = useStyleManager();
  const { overrides } = useComponentEditor();

  const copySelectedComponent = async () => {
    const component = selectedComponent.value;
    if (!component) return false;

    const registryEntry = componentRegistry[component.id];
    if (!registryEntry) return false;

    try {
      const response = await registryEntry.source();
      let source = response.default;
      source = applyStyleValues(source, component.styles || {});
      source = appendElementOverrides(source, overrides[component.id] || {});
      await navigator.clipboard.writeText(source);
      return true;
    } catch (error) {
      console.error("Failed to copy component:", error);
      return false;
    }
  };

  return { copySelectedComponent };
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
