import { reactive } from "vue";
import { useComponentManager } from "./useComponentManager";

export function useComponentStyles(componentId, initialStyles = {}, metadata = {}) {
  const styles = reactive({ ...initialStyles });
  const { registerComponent } = useComponentManager();

  registerComponent(componentId, {
    name: metadata.name || componentId,
    styles,
    sourcePath: metadata.sourcePath || null,
  });

  return styles;
}
