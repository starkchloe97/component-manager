import { reactive, ref, watch } from "vue";

const selectedElement = ref(null);
const STORAGE_KEY = "component-manager:element-overrides";
const overrides = reactive(loadOverrides());
const PERSIST_DELAY = 250;
let persistTimer = null;
let styleFrame = null;
const pendingStyleWrites = new Map();

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

function persistOverrides() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch (error) {
    console.warn("Unable to save element edits:", error);
  }
}

function scheduleOverridePersistence() {
  if (typeof window === "undefined") return;
  if (persistTimer) window.clearTimeout(persistTimer);
  persistTimer = window.setTimeout(() => {
    persistTimer = null;
    persistOverrides();
  }, PERSIST_DELAY);
}

function flushOverridePersistence() {
  if (typeof window !== "undefined" && persistTimer) {
    window.clearTimeout(persistTimer);
    persistTimer = null;
  }
  persistOverrides();
}

function queueStyleWrite(componentId, selector, property, value) {
  let componentWrites = pendingStyleWrites.get(componentId);
  if (!componentWrites) {
    componentWrites = new Map();
    pendingStyleWrites.set(componentId, componentWrites);
  }

  let selectorWrites = componentWrites.get(selector);
  if (!selectorWrites) {
    selectorWrites = new Map();
    componentWrites.set(selector, selectorWrites);
  }
  selectorWrites.set(property, value);

  if (styleFrame !== null || typeof window === "undefined") return;
  styleFrame = window.requestAnimationFrame(flushStyleWrites);
}

function flushStyleWrites() {
  styleFrame = null;
  pendingStyleWrites.forEach((componentWrites, componentId) => {
    const roots = document.querySelectorAll(`[data-editor-component-id="${CSS.escape(componentId)}"]`);
    componentWrites.forEach((styleWrites, selector) => {
      roots.forEach((root) => {
        root.querySelectorAll(toSelector(selector)).forEach((element) => {
          styleWrites.forEach((value, property) => {
            if (value === "") element.style.removeProperty(property);
            else element.style[property] = value;
          });
        });
      });
    });
  });
  pendingStyleWrites.clear();
}

if (typeof window !== "undefined") {
  watch(overrides, scheduleOverridePersistence, { deep: true });
  window.addEventListener("pagehide", flushOverridePersistence);
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
    queueStyleWrite(componentId, selector, property, value);
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
