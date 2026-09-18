import { reactive, ref, watch } from "vue";

const selectedElement = ref(null);
const STORAGE_KEY = "component-manager:element-overrides";
const overrides = reactive(loadOverrides());

function loadOverrides() {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.warn("Unable to restore element edits:", error);
    return {};
  }
}

if (typeof window !== "undefined") {
  watch(overrides, () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch (error) {
      console.warn("Unable to save element edits:", error);
    }
  }, { deep: true });
}

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
