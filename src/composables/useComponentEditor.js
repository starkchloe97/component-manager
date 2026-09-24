import { reactive, ref, watch } from "vue";

const selectedElement = ref(null);
const STYLE_STORAGE_KEY = "component-manager:element-overrides";
const CONTENT_STORAGE_KEY = "component-manager:content-overrides";
const overrides = reactive(loadStorage(STYLE_STORAGE_KEY));
const contentOverrides = reactive(loadStorage(CONTENT_STORAGE_KEY));
const IMAGE_STORAGE_KEY = "component-manager:image-overrides";
const imageOverrides = reactive(loadStorage(IMAGE_STORAGE_KEY));
const PERSIST_DELAY = 250;
let stylePersistTimer = null;
let contentPersistTimer = null;
let imagePersistTimer = null;
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
  if (kind === "image") {
    if (imagePersistTimer) window.clearTimeout(imagePersistTimer);
    imagePersistTimer = window.setTimeout(() => {
      imagePersistTimer = null;
      persistStorage(IMAGE_STORAGE_KEY, imageOverrides);
    }, delay);
    return;
  }
  if (kind === "content") {
    if (contentPersistTimer) window.clearTimeout(contentPersistTimer);
  if (imagePersistTimer) window.clearTimeout(imagePersistTimer);
    contentPersistTimer = window.setTimeout(() => {
      contentPersistTimer = null;
  imagePersistTimer = null;
      persistStorage(CONTENT_STORAGE_KEY, contentOverrides);
  persistStorage(IMAGE_STORAGE_KEY, imageOverrides);
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
  if (styleFrame !== null) window.cancelAnimationFrame(styleFrame);
  if (contentFrame !== null) window.cancelAnimationFrame(contentFrame);
  stylePersistTimer = null;
  contentPersistTimer = null;
  styleFrame = null;
  contentFrame = null;
  pendingStyleWrites.clear();
  pendingContentWrites.clear();
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

function queueContentWrite(componentId, selector, value, skipElement = null) {
  let componentWrites = pendingContentWrites.get(componentId);
  if (!componentWrites) {
    componentWrites = new Map();
    pendingContentWrites.set(componentId, componentWrites);
  }
  componentWrites.set(selector, { value, skipElement });
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
          if (element === value.skipElement) return;
          element.textContent = value.value;
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

function matchingElements(root, selector) {
  const matches = [];
  if (!root || !selector) return matches;
  try {
    if (root.matches?.(toSelector(selector))) matches.push(root);
    matches.push(...root.querySelectorAll(toSelector(selector)));
  } catch {
    return matches;
  }
  return matches;
}

function deepClone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
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
    queueContentWrite(componentId, selector, next, metadata.preserveElement || null);
  };

  const getContent = (componentId, selector) => contentOverrides[componentId]?.[selector]?.text ?? null;

  const getContentEntry = (componentId, selector) => contentOverrides[componentId]?.[selector] || null;

  const setImage = (componentId, selector, value) => {
    if (!componentId || !selector) return;
    const entry = ensurePath(imageOverrides, componentId, selector);
    if (entry.originalSrc === undefined) {
      const roots = typeof window !== "undefined"
        ? document.querySelectorAll(`[data-editor-component-id="${CSS.escape(componentId)}"]`)
        : [];
      const source = roots[0]?.querySelector(toSelector(selector))?.getAttribute("src") ?? "";
      entry.originalSrc = source;
    }
    entry.src = String(value ?? "");
    const roots = typeof window !== "undefined"
      ? document.querySelectorAll(`[data-editor-component-id="${CSS.escape(componentId)}"]`)
      : [];
    roots.forEach((root) => root.querySelectorAll(toSelector(selector)).forEach((element) => {
      element.setAttribute("src", String(value ?? ""));
    }));
    schedulePersistence("image");
  };
  const getImage = (componentId, selector) => imageOverrides[componentId]?.[selector]?.src ?? null;

  const resetContent = (componentId, selector) => {
    if (!componentId || !selector) return;
    const original = contentOverrides[componentId]?.[selector]?.originalText ?? null;
    if (contentOverrides[componentId]) {
      delete contentOverrides[componentId][selector];
      if (!Object.keys(contentOverrides[componentId]).length) delete contentOverrides[componentId];
    }
    if (original !== null) queueContentWrite(componentId, selector, original);
  };

  const resetComponentState = (componentId) => {
    if (!componentId) return false;

    const componentStyles = deepClone(overrides[componentId] || {});
    const componentContent = deepClone(contentOverrides[componentId] || {});
    const componentImages = deepClone(imageOverrides[componentId] || {});
    const roots = typeof window !== "undefined"
      ? document.querySelectorAll(`[data-editor-component-id="${CSS.escape(componentId)}"]`)
      : [];

    roots.forEach((root) => {
      Object.entries(componentStyles).forEach(([selector, styles]) => {
        matchingElements(root, selector).forEach((element) => {
          Object.keys(styles || {}).forEach((property) => {
            element.style[property] = "";
          });
        });
      });

      Object.entries(componentImages).forEach(([selector, entry]) => {
        if (entry?.originalSrc === undefined) return;
        matchingElements(root, selector).forEach((element) => element.setAttribute("src", entry.originalSrc));
      });

      Object.entries(componentContent).forEach(([selector, entry]) => {
        const original = typeof entry === "string" ? null : entry?.originalText;
        if (original === undefined || original === null) return;
        matchingElements(root, selector).forEach((element) => {
          element.textContent = original;
        });
      });
    });

    delete overrides[componentId];
    delete contentOverrides[componentId];
    delete imageOverrides[componentId];
    pendingStyleWrites.delete(componentId);
    pendingContentWrites.delete(componentId);
    flushPersistence();
    return true;
  };
  const getComponentState = (componentId) => ({
    styles: deepClone(overrides[componentId] || {}),
    content: deepClone(contentOverrides[componentId] || {}),
    images: deepClone(imageOverrides[componentId] || {}),
  });

  const restoreComponentState = (componentId, state = {}) => {
    if (!componentId) return;

    const oldStyles = deepClone(overrides[componentId] || {});
    const oldContent = deepClone(contentOverrides[componentId] || {});
    const oldImages = deepClone(imageOverrides[componentId] || {});
    const roots = typeof window !== "undefined"
      ? document.querySelectorAll(`[data-editor-component-id="${CSS.escape(componentId)}"]`)
      : [];

    roots.forEach((root) => {
      Object.entries(oldStyles).forEach(([selector, styles]) => {
        root.querySelectorAll(toSelector(selector)).forEach((element) => {
          Object.keys(styles || {}).forEach((property) => element.style.removeProperty(property));
        });
      });
      Object.entries(oldImages).forEach(([selector, entry]) => {
        if (entry?.src === undefined) return;
        root.querySelectorAll(toSelector(selector)).forEach((element) => element.setAttribute("src", entry.src));
      });
      Object.entries(oldContent).forEach(([selector, entry]) => {
        const original = typeof entry === "string" ? null : entry?.originalText;
        if (original === undefined || original === null) return;
        root.querySelectorAll(toSelector(selector)).forEach((element) => {
          element.textContent = original;
        });
      });
    });

    if (overrides[componentId]) delete overrides[componentId];
    if (contentOverrides[componentId]) delete contentOverrides[componentId];
    if (imageOverrides[componentId]) delete imageOverrides[componentId];

    const nextStyles = deepClone(state.styles || {});
    const nextContent = deepClone(state.content || {});
    const nextImages = deepClone(state.images || {});
    if (Object.keys(nextStyles).length) overrides[componentId] = nextStyles;
    if (Object.keys(nextContent).length) contentOverrides[componentId] = nextContent;
    if (Object.keys(nextImages).length) imageOverrides[componentId] = nextImages;

    roots.forEach((root) => applyOverrides(root, componentId));
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

    const componentImages = imageOverrides[componentId];
    if (componentImages) {
      Object.entries(componentImages).forEach(([selector, entry]) => {
        if (entry?.src === undefined) return;
        root.querySelectorAll(toSelector(selector)).forEach((element) => element.setAttribute("src", entry.src));
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
    imageOverrides,
    selectElement,
    clearElement,
    setStyle,
    getStyles,
    setContent,
    getContent,
    getContentEntry,
    setImage,
    getImage,
    resetContent,
    getComponentState,
    restoreComponentState,
    resetComponentState,
    applyOverrides,
  };
}
