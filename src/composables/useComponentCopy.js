import { useStyleManager } from "./useStyleManager";
import { componentRegistry } from "@/config/componentRegistry";

export function useComponentCopy() {
  const { selectedComponent } = useStyleManager();

  const copySelectedComponent = async () => {
    const component = selectedComponent.value;

    if (!component) {
      return;
    }

    const registryEntry = componentRegistry[component.id];

    if (!registryEntry) {
      console.error(
        `Component "${component.id}" is not registered.`
      );

      return;
    }

    const response = await registryEntry.source();
    const source = response.default;

    const updatedSource = applyStyleValues(
      source,
      component.styles
    );

    await navigator.clipboard.writeText(updatedSource);
  };

  return {
    copySelectedComponent
  };
}

function applyStyleValues(source, styles) {
  let updatedSource = source;

  Object.entries(styles).forEach(([name, value]) => {
    const pattern = new RegExp(
      `(${name}:\\s*["'])[^"']*(["'])`,
      "g"
    );

    updatedSource = updatedSource.replace(
      pattern,
      `$1${value}$2`
    );
  });

  return updatedSource;
}