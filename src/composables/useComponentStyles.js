import { reactive } from "vue";
import { useStyleManager } from "./useStyleManager";

export function useComponentStyles(componentId, values) {
  const styleValues = reactive(values);

  const { registerComponent } = useStyleManager();

  registerComponent(componentId, {
    styles: styleValues
  });

  return styleValues;
}