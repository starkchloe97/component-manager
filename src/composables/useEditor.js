import { computed, reactive, ref, watch } from "vue";
import { createEditorDocument } from "@/components/editor/editorModel";
import { createEditorNode } from "@/components/editor/nodeFactory";

const STORAGE_PREFIX = "component-manager:editor:";
const document = reactive(createEditorDocument());
const selectedNodeId = ref(null);
const activeComponentId = ref(null);
let persistenceReady = false;
let persistTimer = null;
const PERSIST_DELAY = 250;

function storageKey(componentId) {
  return componentId ? STORAGE_PREFIX + componentId : null;
}

function readStoredDocument(componentId) {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey(componentId));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch (error) {
    console.warn("Unable to restore editor state:", error);
    return null;
  }
}

function replaceDocument(next) {
  Object.keys(document).forEach((key) => delete document[key]);
  Object.assign(document, createEditorDocument());
  if (next?.children && Array.isArray(next.children)) document.children.push(...next.children);
  if (next?.componentChildren && Array.isArray(next.componentChildren)) document.componentChildren.push(...next.componentChildren);
  migrateLegacyLayout(document.children);
  migrateLegacyLayout(document.componentChildren);
  normalizePageStructure(document.children);
  normalizePageStructure(document.componentChildren);
  if (next?.version) document.version = Math.max(Number(next.version) || 0, document.version);
}

function migrateLegacyLayout(nodes) {
  for (const node of nodes || []) {
    if (node.type === "section") {
      const s = node.styles || {};
      if (s.paddingTop === "60px" && s.paddingBottom === "60px" && s.paddingLeft === "20px" && s.paddingRight === "20px") {
        Object.assign(s, { paddingTop: "40px", paddingRight: "0px", paddingBottom: "40px", paddingLeft: "0px" });
      }
      if (s.gap === "12px") s.gap = "0px";
    }
    if (node.type === "column") {
      const s = node.styles || {};
      if (s.padding === "14px") s.padding = "0px";
      if (s.minHeight === "120px") s.minHeight = "72px";
    }
    if (node.type === "container" && node.styles?.gap === "12px") node.styles.gap = "0px";
    migrateLegacyLayout(node.children);
  }
}

function persistDocument() {
  if (!persistenceReady || !activeComponentId.value || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(activeComponentId.value), JSON.stringify(document));
  } catch (error) {
    console.warn("Unable to save editor state:", error);
  }
}

function scheduleDocumentPersistence() {
  if (!persistenceReady || typeof window === "undefined") return;
  if (persistTimer) window.clearTimeout(persistTimer);
  persistTimer = window.setTimeout(() => {
    persistTimer = null;
    persistDocument();
  }, PERSIST_DELAY);
}

function flushDocumentPersistence() {
  if (typeof window !== "undefined" && persistTimer) {
    window.clearTimeout(persistTimer);
    persistTimer = null;
  }
  persistDocument();
}

function setActiveComponent(componentId) {
  if (!componentId || activeComponentId.value === componentId) return;
  if (activeComponentId.value) flushDocumentPersistence();
  const stored = readStoredDocument(componentId);
  replaceDocument(stored);
  activeComponentId.value = componentId;
  selectedNodeId.value = null;
  persistenceReady = true;
  // Persist the normalized tree immediately so old nested layouts cannot
  // reappear on the next editor open.
  persistDocument();
}

function resetActiveComponent() {
  const componentId = activeComponentId.value;
  if (!componentId) return false;

  if (typeof window !== "undefined") {
    if (persistTimer) {
      window.clearTimeout(persistTimer);
      persistTimer = null;
    }
    window.localStorage.removeItem(storageKey(componentId));
  }

  replaceDocument(null);
  selectedNodeId.value = null;
  persistenceReady = true;
  return true;
}
function clearActiveComponent() {
  if (activeComponentId.value) flushDocumentPersistence();
  activeComponentId.value = null;
  replaceDocument(null);
  selectedNodeId.value = null;
  persistenceReady = false;
}

if (typeof window !== "undefined") {
  watch(document, scheduleDocumentPersistence, { deep: true });
  window.addEventListener("pagehide", flushDocumentPersistence);
}

function cloneState(value) {
  return JSON.parse(JSON.stringify(value));
}

export function useEditor() {
  const getDocumentSnapshot = () => ({
    children: cloneState(document.children),
    componentChildren: cloneState(document.componentChildren),
  });

  const restoreDocumentSnapshot = (snapshot = {}) => {
    replaceDocument({
      children: cloneState(snapshot.children || []),
      componentChildren: cloneState(snapshot.componentChildren || []),
      version: document.version,
    });
    selectedNodeId.value = null;
    scheduleDocumentPersistence();
  };

  const selectedNode = computed(() => selectedNodeId.value ? findNodeInDocument(selectedNodeId.value) : null);
  const selectNode = (id) => { selectedNodeId.value = id; };

  function addComponentElement(type, overrides = {}) {
    const node = createEditorNode(type, overrides);
    document.componentChildren.push(node);
    selectNode(node.id);
    return node;
  }

  function addContainerToComponent(layout = "100") {
    const container = createContainer(layout);
    document.componentChildren.push(container);
    selectNode(container.id);
    return container;
  }

  function createSection(layout = "100") {
    const section = createEditorNode("section");
    const columns = layout.split("-").map(Number);
    section.styles.display = "grid";
    section.styles.gridTemplateColumns = columns.map((width) => `${width}fr`).join(" ");
    section.styles.gap = "0px";
    section.children.push(...createLayoutChildren(layout));
    return section;
  }

  function createContainer(layout = null) {
    // A container is always a standalone root/layout node. Columns are created
    // only when the user explicitly chooses a layout in the picker.
    const container = createEditorNode("container");
    container.styles.display = "grid";
    container.styles.width = "100%";
    container.styles.maxWidth = "100%";
    container.styles.gap = "0px";

    if (layout) {
      const columns = layout.split("-").map(Number);
      container.styles.gridTemplateColumns = columns.map((width) => `${width}fr`).join(" ");
      container.children.push(...createLayoutChildren(layout));
    }

    return container;
  }

  function addSection(layout = "100", index = document.children.length, list = document.children) {
    const section = createSection(layout);
    list.splice(Math.max(0, Math.min(index, list.length)), 0, section);
    selectNode(section.id);
    return section;
  }

  function addSectionAfter(sectionId, layout = "100") {
    const root = findRootLayoutContext(sectionId);
    const list = root?.list || document.children;
    const rootNode = root?.node || null;
    const index = rootNode ? list.findIndex((node) => node.id === rootNode.id) + 1 : list.length;
    return addSection(layout, index, list);
  }

  function addSectionToNode(parentId, layout = "100") {
    const parent = findNodeInDocument(parentId);
    if (!parent || !["container", "column"].includes(parent.type)) return null;
    const section = createSection(layout);
    parent.children.push(section);
    selectNode(section.id);
    return section;
  }

  function createLayoutChildren(layout) {
    return layout.split("-").map(Number).map((width) => {
      const column = createEditorNode("column");
      column.styles.width = "100%";
      column.styles.minWidth = "0";
      column.styles.minHeight = "72px";
      column.styles.boxSizing = "border-box";
      column.styles.padding = "0";
      return column;
    });
  }

  function addSectionToParent(parentId, layout = "100") {
    const topLevel = findTopLevelSection(parentId);
    const index = topLevel ? document.children.findIndex((node) => node.id === topLevel.id) + 1 : document.children.length;
    return addSection(layout, index, document.children);
  }

  // A container is a first-class layout node. Creating one from the
  // container/column controls keeps it in that parent; creating one without
  // a container/column context puts it directly at the page root.
  function addContainer(layout = null, parentId = null) {
    const parent = parentId ? findNodeInDocument(parentId) : null;
    if (parent?.type === "column" || parent?.type === "container") {
      const container = createContainer(layout);
      parent.children.push(container);
      selectNode(container.id);
      return container;
    }

    const container = createContainer(layout);
    document.children.push(container);
    selectNode(container.id);
    return container;
  }

  function addContainerAfter(nodeId, layout = null) {
    const container = createContainer(layout);
    const parent = findParentInDocument(nodeId);
    const list = parent ? parent.children : rootListFor(nodeId);
    const index = list.findIndex((node) => node.id === nodeId);
    list.splice(index >= 0 ? index + 1 : list.length, 0, container);
    selectNode(container.id);
    return container;
  }

  function addNode(type, parentId = null, overrides = {}) {
    const node = createEditorNode(type, overrides);
    const parent = parentId ? findNodeInDocument(parentId) : document;
    if (!parent || !Array.isArray(parent.children)) return null;
    parent.children.push(node);
    selectNode(node.id);
    return node;
  }

  function addComponent(componentId, parentId) {
    return addNode("component", parentId, { props: { componentId } });
  }

  function updateNode(id, patch = {}) {
    const node = findNodeInDocument(id);
    if (!node) return null;
    if (patch.props) node.props = { ...node.props, ...patch.props };
    if (patch.styles) node.styles = { ...node.styles, ...patch.styles };
    const updatedColumnWidth = node.type === "column" && Object.prototype.hasOwnProperty.call(patch.styles || {}, "width");
    if (updatedColumnWidth) syncSectionColumnWidths(id);
    Object.entries(patch).forEach(([key, value]) => { if (key !== "props" && key !== "styles") node[key] = value; });
    return node;
  }

  function deleteNode(id) {
    if (!removeNode(document.children, id) && !removeNode(document.componentChildren, id)) return false;
    if (selectedNodeId.value === id) selectedNodeId.value = null;
    return true;
  }

  function duplicateNode(id) {
    const node = findNodeInDocument(id);
    if (!node) return null;
    const clone = deepClone(node);
    regenerateIds(clone);
    const parent = findParentInDocument(id);
    const list = parent ? parent.children : rootListFor(id);
    const index = list.findIndex((child) => child.id === id);
    list.splice(index + 1, 0, clone);
    selectNode(clone.id);
    return clone;
  }

  function moveNode(id, targetParentId, index = 0) {
    const sourceParent = findParentInDocument(id);
    const sourceList = sourceParent ? sourceParent.children : rootListFor(id);
    const sourceIndex = sourceList.findIndex((child) => child.id === id);
    if (sourceIndex < 0) return false;
    const [node] = sourceList.splice(sourceIndex, 1);
    const target = targetParentId ? findNodeInDocument(targetParentId) : document;
    if (!target || !Array.isArray(target.children)) { sourceList.splice(sourceIndex, 0, node); return false; }
    target.children.splice(Math.max(0, Math.min(index, target.children.length)), 0, node);
    selectNode(id);
    return true;
  }

  return {
    document,
    selectedNodeId,
    selectedNode,
    activeComponentId,
    setActiveComponent,
    resetActiveComponent,
    clearActiveComponent,
    selectNode,
    addSection,
    addSectionAfter,
    addSectionToParent,
    addContainer,
    addComponentElement,
    addContainerToComponent,
    addNode,
    addComponent,
    updateNode,
    moveNode,
    deleteNode,
    duplicateNode,
    getDocumentSnapshot,
    restoreDocumentSnapshot,
  };
}

function findNode(nodes, id) {
  for (const node of nodes || []) {
    if (node.id === id) return node;
    const found = findNode(node.children || [], id);
    if (found) return found;
  }
  return null;
}
function findNodeInDocument(id) {
  return findNode(document.children, id) || findNode(document.componentChildren, id);
}
function findParent(nodes, id, parent = null) {
  for (const node of nodes || []) {
    if (node.id === id) return parent;
    const found = findParent(node.children || [], id, node);
    if (found) return found;
  }
  return null;
}
function findParentInDocument(id) {
  return findParent(document.children, id) || findParent(document.componentChildren, id);
}
function findTopLevelSection(id) {
  const walk = (nodes, ancestor = null) => {
    for (const node of nodes || []) {
      if (node.id === id) return node.type === "section" ? node : ancestor;
      const found = walk(node.children || [], node.type === "section" ? node : ancestor);
      if (found) return found;
    }
    return null;
  };
  return walk(document.children);
}

function findRootLayoutContext(id) {
  const find = (nodes, list, ancestor = null) => {
    for (const node of nodes || []) {
      if (node.id === id) {
        return { node: node.type === "section" ? node : ancestor, list };
      }
      const found = find(node.children || [], list, node.type === "section" ? node : ancestor);
      if (found) return found;
    }
    return null;
  };
  return find(document.children, document.children) || find(document.componentChildren, document.componentChildren);
}
function getPercentWidth(value) {
  const match = /^\s*(\d+(?:\.\d+)?)%\s*$/.exec(String(value ?? ""));
  if (!match) return null;
  const percentage = Number(match[1]);
  return percentage > 0 && percentage < 100 ? percentage : null;
}

function syncSectionColumnWidths(columnId) {
  const layout = findParentInDocument(columnId);
  if (!layout || !["section", "container"].includes(layout.type)) return;

  const columns = (layout.children || []).filter((child) => child.type === "column");
  const changedIndex = columns.findIndex((column) => column.id === columnId);
  const changedWidth = getPercentWidth(columns[changedIndex]?.styles?.width);
  if (columns.length !== 2 || changedIndex === -1 || changedWidth === null) return;

  const adjacentColumn = columns[changedIndex === 0 ? 1 : 0];
  const adjacentWidth = 100 - changedWidth;
  adjacentColumn.styles = { ...adjacentColumn.styles, width: `${adjacentWidth}%` };
  layout.styles = {
    ...layout.styles,
    gridTemplateColumns: columns.map((column) => `${getPercentWidth(column.styles.width) || 50}fr`).join(" "),
  };
}

function normalizePageStructure(nodes) {
  const source = Array.isArray(nodes) ? [...nodes] : [];
  const result = [];

  function normalizeContainerNode(node) {
    if (!node) return null;
    node.styles = {
      ...(node.styles || {}),
      display: "grid",
      gap: "0px",
      width: "100%",
      maxWidth: node.styles?.maxWidth || "100%",
    };

    // Containers are first-class nodes and may contain columns, nested
    // containers, or editable elements. Never promote them to sections.
    const columns = (node.children || []).filter(child => child?.type === "column");
    if (columns.length) {
      const tracks = columns.map(column => {
        const n = Number.parseFloat(column.styles?.width);
        return Number.isFinite(n) && n > 0 ? n : 1;
      });
      const total = tracks.reduce((sum, n) => sum + n, 0);
      node.styles.gridTemplateColumns = tracks.map(n => `${n / total}fr`).join(" ");
    }
    return node;
  }

  function asSection(node) {
    if (!node) return null;
    if (node.type !== "section") return null;
    node.styles = { ...(node.styles || {}), display: "grid", gap: "0px", width: "100%" };

    const directColumns = (node.children || []).filter(child => child?.type === "column");
    const nestedLayouts = (node.children || []).filter(child => child?.type === "section" || child?.type === "container");

    if (directColumns.length) {
      node.children = directColumns;
      const tracks = directColumns.map(column => {
        const n = Number.parseFloat(column.styles?.width);
        return Number.isFinite(n) && n > 0 ? n : 1;
      });
      const total = tracks.reduce((sum, n) => sum + n, 0);
      node.styles.gridTemplateColumns = tracks.map(n => `${n / total}fr`).join(" ");
      directColumns.forEach(column => {
        column.styles = { ...(column.styles || {}), width: "100%", minWidth: "0", padding: "0", boxSizing: "border-box" };
        extractNestedLayouts(column);
      });
      return node;
    }

    // Old structure: section -> container/section. Promote those layouts
    // instead of keeping an empty wrapper around them.
    for (const child of nestedLayouts) {
      const promoted = asSection(child);
      if (promoted) result.push(promoted);
    }
    return null;
  }

  function extractNestedLayouts(node) {
    if (!node?.children) return;
    const kept = [];
    for (const child of node.children) {
      if (child?.type === "section" || child?.type === "container") {
        const promoted = asSection(child);
        if (promoted) result.push(promoted);
      } else {
        extractNestedLayouts(child);
        kept.push(child);
      }
    }
    node.children = kept;
  }

  for (const node of source) {
    if (node?.type === "section") {
      const section = asSection(node);
      if (section) result.push(section);
    } else if (node?.type === "container") {
      const container = normalizeContainerNode(node);
      if (container) result.push(container);
    } else {
      result.push(node);
    }
  }

  // Replace the reactive array without retaining the obsolete wrappers.
  nodes.splice(0, nodes.length, ...result);
}

function rootListFor(id) {
  if (findNode(document.children, id)) return document.children;
  if (findNode(document.componentChildren, id)) return document.componentChildren;
  return document.children;
}
function removeNode(nodes, id) {
  const index = (nodes || []).findIndex((node) => node.id === id);
  if (index !== -1) { nodes.splice(index, 1); return true; }
  for (const node of nodes || []) if (removeNode(node.children || [], id)) return true;
  return false;
}
function deepClone(value) { return JSON.parse(JSON.stringify(value)); }
function regenerateIds(node) { node.id = `${node.type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; (node.children || []).forEach(regenerateIds); }
