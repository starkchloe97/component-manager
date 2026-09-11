import { useStyleManager } from "./useStyleManager";
import { componentRegistry } from "@/config/componentRegistry";

export function useComponentCopy() {
  const { selectedComponent } = useStyleManager();

  const copySelectedComponent = async () => {
    const component = selectedComponent.value;

    if (!component) return false;

    const registryEntry = componentRegistry[component.id];

    if (!registryEntry) {
      console.error(`Component "${component.id}" is not registered.`);
      return false;
    }

    try {
      const response = await registryEntry.source();
      const source = response.default;
      const updatedSource = applyStyleValues(source, component.styles || {});

      await navigator.clipboard.writeText(updatedSource);
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
