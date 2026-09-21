import { reactive, ref, watch } from "vue";

const selectedElement = ref(null);
const STYLE_STORAGE_KEY = "component-manager:element-overrides";
const CONTENT_STORAGE_KEY = "component-manager:content-overrides";
const overrides = reactive(loadStorage(STYLE_STORAGE_KEY));
const contentOverrides = reactive(loadStorage(CONTENT_STORAGE_KEY));
const PERSIST_DELAY = 250;
let stylePersistTimer = null;
let contentPersistTimer = null;
let styleFrame = null;
let contentFrame = null;
const pendingStyleWrites = new Map();
const pendingContentWrites = new Map();

function loadStorage(key) {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.warn("Unable to restore editor overrides:", error);
    return {};
  }
}

function persistStorage(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Unable to save editor overrides:", error);
  }
}

function schedulePersistence(kind) {
  if (typeof window === "undefined") return;
  const timerKey = kind === "content" ? "contentPersistTimer" : "stylePersistTimer";
  const delay = PERSIST_DELAY;
  if (kind === "content") {
    if (contentPersistTimer) window.clearTimeout(contentPersistTimer);
    contentPersistTimer = window.setTimeout(() => {
      contentPersistTimer = null;
      persistStorage(CONTENT_STORAGE_KEY, contentOverrides);
    }, delay);
    return;
  }
  if (stylePersistTimer) window.clearTimeout(stylePersistTimer);
  stylePersistTimer = window.setTimeout(() => {
    stylePersistTimer = null;
    persistStorage(STYLE_STORAGE_KEY, overrides);
  }, delay);
}

function flushPersistence() {
  if (typeof window === "undefined") return;
  if (stylePersistTimer) window.clearTimeout(stylePersistTimer);
  if (contentPersistTimer) window.clearTimeout(contentPersistTimer);
  stylePersistTimer = null;
  contentPersistTimer = null;
  persistStorage(STYLE_STORAGE_KEY, overrides);
  persistStorage(CONTENT_STORAGE_KEY, contentOverrides);
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

function queueContentWrite(componentId, selector, value) {
  let componentWrites = pendingContentWrites.get(componentId);
  if (!componentWrites) {
    componentWrites = new Map();
    pendingContentWrites.set(componentId, componentWrites);
  }
  componentWrites.set(selector, value);
  if (contentFrame !== null || typeof window === "undefined") return;
  contentFrame = window.requestAnimationFrame(flushContentWrites);
}

function flushContentWrites() {
  contentFrame = null;
  pendingContentWrites.forEach((componentWrites, componentId) => {
    const roots = document.querySelectorAll(`[data-editor-component-id="${CSS.escape(componentId)}"]`);
    componentWrites.forEach((value, selector) => {
      roots.forEach((root) => {
        root.querySelectorAll(toSelector(selector)).forEach((element) => {
          element.textContent = value;
        });
      });
    });
  });
  pendingContentWrites.clear();
}

if (typeof window !== "undefined") {
  watch(overrides, () => schedulePersistence("style"), { deep: true });
  watch(contentOverrides, () => schedulePersistence("content"), { deep: true });
  window.addEventListener("pagehide", flushPersistence);
}

function toSelector(selector) {
  return selector || "";
}

function ensurePath(target, componentId, selector) {
  if (!target[componentId]) target[componentId] = {};
  if (!target[componentId][selector]) target[componentId][selector] = {};
  return target[componentId][selector];
}

export function useComponentEditor() {
  const selectElement = (payload) => { selectedElement.value = payload; };
  const clearElement = () => { selectedElement.value = null; };

  const setStyle = (componentId, selector, property, value) => {
    if (!componentId || !selector || !property) return;
    ensurePath(overrides, componentId, selector)[property] = value;
    queueStyleWrite(componentId, selector, property, value);
  };

  const getStyles = (componentId, selector) => overrides[componentId]?.[selector] || {};

  const setContent = (componentId, selector, value, metadata = {}) => {
    if (!componentId || !selector) return;
    const entry = ensurePath(contentOverrides, componentId, selector);
    const next = String(value ?? "");
    entry.text = next;
    // Capture the source value only once. Re-selecting an already edited
    // element must never turn the edited value into the new reset baseline.
    if (entry.originalText === undefined && metadata.originalText !== undefined) {
      entry.originalText = String(metadata.originalText);
    }
    if (metadata.occurrence !== undefined) entry.occurrence = Number(metadata.occurrence) || 0;
    if (metadata.tag) entry.tag = metadata.tag;
    if (metadata.className !== undefined) entry.className = String(metadata.className || "");
    queueContentWrite(componentId, selector, next);
  };

  const getContent = (componentId, selector) => contentOverrides[componentId]?.[selector]?.text ?? null;

  const getContentEntry = (componentId, selector) => contentOverrides[componentId]?.[selector] || null;

  const resetContent = (componentId, selector) => {
    if (!componentId || !selector) return;
    const original = contentOverrides[componentId]?.[selector]?.originalText ?? null;
    if (contentOverrides[componentId]) {
      delete contentOverrides[componentId][selector];
      if (!Object.keys(contentOverrides[componentId]).length) delete contentOverrides[componentId];
    }
    if (original !== null) queueContentWrite(componentId, selector, original);
  };

  const applyOverrides = (root, componentId) => {
    if (!root || !componentId) return;

    const componentStyles = overrides[componentId];
    if (componentStyles) {
      Object.entries(componentStyles).forEach(([selector, styles]) => {
        root.querySelectorAll(toSelector(selector)).forEach((element) => {
          Object.entries(styles).forEach(([property, value]) => {
            if (value === "") element.style.removeProperty(property);
            else element.style[property] = value;
          });
        });
      });
    }

    const componentContent = contentOverrides[componentId];
    if (componentContent) {
      Object.entries(componentContent).forEach(([selector, entry]) => {
        const value = typeof entry === "string" ? entry : entry?.text;
        if (value === null || value === undefined) return;
        root.querySelectorAll(toSelector(selector)).forEach((element) => {
          element.textContent = value;
        });
      });
    }
  };

  return {
    selectedElement,
    overrides,
    contentOverrides,
    selectElement,
    clearElement,
    setStyle,
    getStyles,
    setContent,
    getContent,
    getContentEntry,
    resetContent,
    applyOverrides,
  };
}
