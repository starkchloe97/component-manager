import { reactive } from "vue";
import { useStyleManager } from "./useStyleManager";

export function useComponentStyles(componentId, initialStyles = {}, metadata = {}) {
  const styles = reactive({ ...initialStyles });
  const { registerComponent } = useStyleManager();

  registerComponent(componentId, {
    name: metadata.name || componentId,
    styles,
    sourcePath: metadata.sourcePath || null,
  });

  return styles;
}
