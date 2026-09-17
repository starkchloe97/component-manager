import { reactive, ref } from "vue";

const selectedElement = ref(null);
const overrides = reactive({});

function toSelector(selector) { return selector || ""; }

export function useComponentEditor() {
  const selectElement = (payload) => { selectedElement.value = payload; };
  const clearElement = () => { selectedElement.value = null; };

  const setStyle = (componentId, selector, property, value) => {
    if (!componentId || !selector || !property) return;
    if (!overrides[componentId]) overrides[componentId] = {};
    if (!overrides[componentId][selector]) overrides[componentId][selector] = {};
    overrides[componentId][selector][property] = value;
    document.querySelectorAll(`[data-editor-component-id="${CSS.escape(componentId)}"]`).forEach((root) => {
      root.querySelectorAll(toSelector(selector)).forEach((element) => {
        if (value === "") element.style.removeProperty(property);
        else element.style[property] = value;
      });
    });
  };

  const getStyles = (componentId, selector) => overrides[componentId]?.[selector] || {};

  const applyOverrides = (root, componentId) => {
    const componentOverrides = overrides[componentId];
    if (!root || !componentOverrides) return;
    Object.entries(componentOverrides).forEach(([selector, styles]) => {
      root.querySelectorAll(toSelector(selector)).forEach((element) => {
        Object.entries(styles).forEach(([property, value]) => {
          if (value === "") element.style.removeProperty(property);
          else element.style[property] = value;
        });
      });
    });
  };

  return { selectedElement, overrides, selectElement, clearElement, setStyle, getStyles, applyOverrides };
}
