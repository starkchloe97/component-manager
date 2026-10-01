import { computed, reactive, ref, watch } from "vue";
import { createEditorDocument } from "@/components/editor/editorModel";
import { createEditorNode } from "@/components/editor/nodeFactory";
import { useEditorHistory } from "@/composables/useEditorHistory";

const STORAGE_PREFIX = "component-manager:editor:";
const document = reactive(createEditorDocument());
const selectedNodeId = ref(null);
const hoveredNodeId = ref(null);
// Set while an HTML5 drag of a builder node is in progress. Hover updates are
// ignored during a drag so the interaction layer stays stable.
const draggingNodeId = ref(null);
// Shared, rAF-throttled viewport tick. Replaces per-node window scroll/resize
// listeners (2N listeners for N nodes) with exactly two global listeners.
const viewportTick = ref(0);
const activeComponentId = ref(null);
let persistenceReady = false;
let persistTimer = null;
const PERSIST_DELAY = 250;
const { markDirty } = useEditorHistory();

if (typeof window !== "undefined") {
  let viewportFrame = null;
  const bumpViewportTick = () => {
    if (viewportFrame !== null) return;
    viewportFrame = window.requestAnimationFrame(() => {
      viewportFrame = null;
      viewportTick.value += 1;
    });
  };
  window.addEventListener("resize", bumpViewportTick, { passive: true });
  window.addEventListener("scroll", bumpViewportTick, { capture: true, passive: true });
}

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

function replaceDocument(next, { normalize = true } = {}) {
  Object.keys(document).forEach((key) => delete document[key]);
  Object.assign(document, createEditorDocument());
  if (next?.children && Array.isArray(next.children)) document.children.push(...next.children);
  if (next?.componentChildren && Array.isArray(next.componentChildren)) document.componentChildren.push(...next.componentChildren);

  // Migration/normalization is only for persisted documents being loaded into
  // the editor. History snapshots already contain the exact live tree and must
  // be restored byte-for-byte. Running normalizePageStructure() during undo
  // can promote nested layouts and detach columns from their parent section.
  if (normalize) {
    migrateLegacyLayout(document.children);
    migrateLegacyLayout(document.componentChildren);
    normalizePageStructure(document.children);
    normalizePageStructure(document.componentChildren);
  }

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
  hoveredNodeId.value = null;
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
  hoveredNodeId.value = null;
  persistenceReady = true;
  return true;
}
function clearActiveComponent() {
  if (activeComponentId.value) flushDocumentPersistence();
  activeComponentId.value = null;
  replaceDocument(null);
  selectedNodeId.value = null;
  hoveredNodeId.value = null;
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
    }, { normalize: false });
    selectedNodeId.value = null;
    hoveredNodeId.value = null;
    scheduleDocumentPersistence();
  };

  const selectedNode = computed(() => selectedNodeId.value ? findNodeInDocument(selectedNodeId.value) : null);
  // Selection only ever changes through an intentional action. The id is
  // validated against the live document so a stale id can never be selected.
  const selectNode = (id) => {
    if (!id) { selectedNodeId.value = null; return; }
    if (!findNodeInDocument(id)) return;
    selectedNodeId.value = id;
  };
  const clearSelection = () => { selectedNodeId.value = null; };
  const setHoveredNode = (id) => {
    if (draggingNodeId.value) return;
    hoveredNodeId.value = id || null;
  };
  const startDragging = (id) => { draggingNodeId.value = id || null; };
  const endDragging = () => { draggingNodeId.value = null; };
  const getNodeParentId = (id) => findParentInDocument(id)?.id || null;
  const getNodeById = (id) => (id ? findNodeInDocument(id) : null);
  const getNodeParent = (id) => (id ? findParentInDocument(id) : null);
  const getNodeAncestors = (id) => {
    const ancestors = [];
    let parent = id ? findParentInDocument(id) : null;
    while (parent) {
      ancestors.unshift(parent);
      parent = findParentInDocument(parent.id);
    }
    return ancestors;
  };
  const getNodeDepth = (id) => getNodeAncestors(id).length;
  const isContainerNode = (id) => ["section", "column", "container"].includes(getNodeById(id)?.type);
  const isDescendantOf = (childId, parentId) => isNodeAncestor(parentId, childId);
  // Moves selection one level up the tree. Returns false when there is no
  // parent (the node already sits at the document root).
  const selectParent = () => {
    const parent = findParentInDocument(selectedNodeId.value);
    if (!parent) return false;
    selectedNodeId.value = parent.id;
    return true;
  };
  // Moves selection into the first child of the current selection.
  const selectChild = () => {
    const node = selectedNodeId.value ? findNodeInDocument(selectedNodeId.value) : null;
    const firstChild = node?.children?.[0];
    if (!firstChild) return false;
    selectedNodeId.value = firstChild.id;
    return true;
  };
  const isNodeAncestor = (ancestorId, descendantId) => {
    if (!ancestorId || !descendantId || ancestorId === descendantId) return false;
    let parent = findParentInDocument(descendantId);
    while (parent) {
      if (parent.id === ancestorId) return true;
      parent = findParentInDocument(parent.id);
    }
    return false;
  };

  function addComponentElement(type, overrides = {}) {
    const node = createEditorNode(type, overrides);
    document.componentChildren.push(node);
    selectNode(node.id);
    markDirty();
    return node;
  }

  function addContainerToComponent(direction = "column") {
    const container = createContainer(direction);
    document.componentChildren.push(container);
    selectNode(container.id);
    markDirty();
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

  function createContainer(direction = "column") {
    const container = createEditorNode("container");
    container.styles = {
      ...container.styles,
      display: "flex",
      flexDirection: direction === "row" ? "row" : "column",
      flexWrap: "nowrap",
      alignItems: "stretch",
      justifyContent: "flex-start",
      alignContent: "stretch",
      gap: "0px",
      columnGap: "0px",
      rowGap: "0px",
      width: "100%",
      maxWidth: "100%",
      minWidth: "0",
      minHeight: "80px",
      boxSizing: "border-box",
    };
    return container;
  }

  function addSection(layout = "100", index = document.children.length, list = document.children) {
    const section = createSection(layout);
    list.splice(Math.max(0, Math.min(index, list.length)), 0, section);
    selectNode(section.id);
    markDirty();
    return section;
  }

  function addSectionAfter(sectionId, layout = "100") {
    const root = findRootLayoutContext(sectionId);
    const list = root?.list || document.children;
    const rootNode = root?.node || null;
    const index = rootNode ? list.findIndex((node) => node.id === rootNode.id) + 1 : list.length;
    return addSection(layout, index, list);
  }

  // Adds a new section as a top-level sibling of the selected layout.
  // Unlike addSectionAfter(), this never nests into or under an ancestor
  // section/container; it inserts into the document's root layout list.
  function addStandaloneSectionAfter(nodeId, layout = "100") {
    const rootNode = findTopLevelDocumentNode(nodeId);
    const index = rootNode
      ? document.children.findIndex((node) => node.id === rootNode.id) + 1
      : document.children.length;
    return addSection(layout, index, document.children);
  }

  function addSectionToNode(parentId, layout = "100") {
    const parent = findNodeInDocument(parentId);
    if (!parent || !["container", "column"].includes(parent.type)) return null;
    const section = createSection(layout);
    parent.children.push(section);
    selectNode(section.id);
    markDirty();
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
  function addContainer(direction = "column", parentId = null) {
    const parent = parentId ? findNodeInDocument(parentId) : null;
    if (parent?.type === "column" || parent?.type === "container") {
      const container = createContainer(direction);
      parent.children.push(container);
      selectNode(container.id);
      markDirty();
      return container;
    }

    const container = createContainer(direction);
    document.children.push(container);
    selectNode(container.id);
    markDirty();
    return container;
  }

  function addContainerAfter(nodeId, direction = "column") {
    const container = createContainer(direction);
    const parent = findParentInDocument(nodeId);
    const list = parent ? parent.children : rootListFor(nodeId);
    const index = list.findIndex((node) => node.id === nodeId);
    list.splice(index >= 0 ? index + 1 : list.length, 0, container);
    selectNode(container.id);
    markDirty();
    return container;
  }

  function addNode(type, parentId = null, overrides = {}) {
    const node = createEditorNode(type, overrides);
    const parent = parentId ? findNodeInDocument(parentId) : document;
    if (!parent || !Array.isArray(parent.children)) return null;
    parent.children.push(node);
    selectNode(node.id);
    markDirty();
    return node;
  }

  // Used by contextual "Add after" controls. Keeping this mutation here
  // ensures sibling insertion follows the same persisted document tree as
  // drag, duplicate, undo, and delete.
  function addNodeAfter(type, nodeId, overrides = {}) {
    const node = createEditorNode(type, overrides);
    const parent = findParentInDocument(nodeId);
    const list = parent ? parent.children : rootListFor(nodeId);
    const index = list.findIndex((child) => child.id === nodeId);
    list.splice(index >= 0 ? index + 1 : list.length, 0, node);
    selectNode(node.id);
    markDirty();
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
    markDirty();
    return node;
  }

  function deleteNode(id) {
    if (!removeNode(document.children, id) && !removeNode(document.componentChildren, id)) return false;
    // The deleted subtree may contain the selected/hovered node. Any id that
    // no longer resolves against the live tree is cleared, so selection never
    // points at a node that does not exist.
    if (selectedNodeId.value && !findNodeInDocument(selectedNodeId.value)) selectedNodeId.value = null;
    if (hoveredNodeId.value && !findNodeInDocument(hoveredNodeId.value)) hoveredNodeId.value = null;
    markDirty();
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
    markDirty();
    return clone;
  }

  function moveNode(id, targetParentId, index = 0) {
    const sourceNode = findNodeInDocument(id);
    if (!sourceNode) return false;

    const sourceParent = findParentInDocument(id);
    const sourceList = sourceParent ? sourceParent.children : rootListFor(id);
    const sourceIndex = sourceList.findIndex((node) => node.id === id);
    if (sourceIndex < 0) return false;

    const target = targetParentId ? findNodeInDocument(targetParentId) : document;
    if (!target || !Array.isArray(target.children)) return false;

    // Never allow a node to be dropped into itself or one of its descendants.
    if (targetParentId === id || isNodeAncestor(id, targetParentId)) return false;
    if (targetParentId && !["section", "column", "container"].includes(target.type)) return false;

    const [node] = sourceList.splice(sourceIndex, 1);
    const targetIndex = Math.max(0, Math.min(Number(index) || 0, target.children.length));
    target.children.splice(targetIndex, 0, node);
    selectNode(id);
    markDirty();
    return true;
  }

  return {
    document,
    selectedNodeId,
    hoveredNodeId,
    draggingNodeId,
    viewportTick,
    selectedNode,
    setHoveredNode,
    startDragging,
    endDragging,
    getNodeParentId,
    getNodeById,
    getNodeParent,
    getNodeAncestors,
    getNodeDepth,
    isContainerNode,
    isDescendantOf,
    isNodeAncestor,
    activeComponentId,
    setActiveComponent,
    resetActiveComponent,
    clearActiveComponent,
    selectNode,
    clearSelection,
    selectParent,
    selectChild,
    addSection,
    addSectionAfter,
    addStandaloneSectionAfter,
    addSectionToNode,
    addSectionToParent,
    addContainer,
    addContainerAfter,
    addComponentElement,
    addContainerToComponent,
    addNode,
    addNodeAfter,
    addComponent,
    updateNode,
    moveNode,
    deleteNode,
    duplicateNode,
    getDocumentSnapshot,
    restoreDocumentSnapshot,
  };
}

function findTopLevelDocumentNode(id) {
  function walk(nodes) {
    for (const node of nodes || []) {
      if (node.id === id) return node;
      const found = walk(node.children || []);
      if (found) return node;
    }
    return null;
  }
  return walk(document.children) || walk(document.componentChildren);
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

  function numericWidth(value) {
    const match = /^(\d+(?:\.\d+)?)%$/.exec(String(value || "").trim());
    return match ? Number(match[1]) : null;
  }

  function flexDefaults(styles = {}, direction = "column") {
    const nextStyles = { ...(styles || {}) };
    delete nextStyles.gridTemplateColumns;
    delete nextStyles.gridTemplateRows;
    delete nextStyles.gridAutoColumns;
    delete nextStyles.gridAutoRows;
    nextStyles.display = "flex";
    nextStyles.flexDirection = direction;
    nextStyles.flexWrap = nextStyles.flexWrap || "nowrap";
    nextStyles.alignItems = nextStyles.alignItems || "stretch";
    nextStyles.justifyContent = nextStyles.justifyContent || "flex-start";
    nextStyles.alignContent = nextStyles.alignContent || "stretch";
    nextStyles.gap = nextStyles.gap || "0px";
    nextStyles.columnGap = nextStyles.columnGap || nextStyles.gap || "0px";
    nextStyles.rowGap = nextStyles.rowGap || nextStyles.gap || "0px";
    nextStyles.width = nextStyles.width || "100%";
    nextStyles.maxWidth = nextStyles.maxWidth || "100%";
    nextStyles.minWidth = nextStyles.minWidth || "0";
    nextStyles.boxSizing = nextStyles.boxSizing || "border-box";
    return nextStyles;
  }

  function convertNode(node) {
    if (!node || typeof node !== "object") return node;
    if (node.type === "section") return convertSection(node);
    if (node.type === "column") return convertColumn(node);
    if (node.type === "container") return convertContainer(node);

    if (Array.isArray(node.children)) node.children = node.children.map(convertNode);
    return node;
  }

  function convertColumn(node, flexBasis = null) {
    node.type = "container";
    node.styles = flexDefaults(node.styles, "column");
    node.styles.minHeight = node.styles.minHeight || "72px";
    node.styles.padding = node.styles.padding ?? "0";
    if (flexBasis) {
      node.styles.flex = node.styles.flex || `0 1 ${flexBasis}`;
      node.styles.flexBasis = node.styles.flexBasis || flexBasis;
    }
    node.children = (node.children || []).map(convertNode);
    return node;
  }

  function convertSection(node) {
    const oldChildren = Array.isArray(node.children) ? node.children : [];
    const columns = oldChildren.filter((child) => child?.type === "column");
    const otherChildren = oldChildren.filter((child) => child?.type !== "column");

    const trackValues = columns.map((column) => numericWidth(column.styles?.width));
    const hasMultipleColumns = columns.length > 1;
    const direction = hasMultipleColumns
      ? "row"
      : node.styles?.flexDirection || "column";

    node.type = "container";
    node.styles = flexDefaults(node.styles, direction);
    node.styles.minHeight = node.styles.minHeight || "80px";

    if (columns.length) {
      const total = trackValues.reduce((sum, value) => sum + (value || 1), 0);
      node.children = columns.map((column, index) => {
        const width = trackValues[index];
        const basis = width ? `${(width / total) * 100}%` : null;
        return convertColumn(column, basis);
      });
      node.children.push(...otherChildren.map(convertNode));
    } else {
      node.children = otherChildren.map(convertNode);
    }

    return node;
  }

  function convertContainer(node) {
    const oldChildren = Array.isArray(node.children) ? node.children : [];
    const columns = oldChildren.filter((child) => child?.type === "column");
    const otherChildren = oldChildren.filter((child) => child?.type !== "column");
    const direction = columns.length > 1
      ? "row"
      : node.styles?.flexDirection || "column";

    node.styles = flexDefaults(node.styles, direction);
    node.styles.minHeight = node.styles.minHeight || "80px";

    if (columns.length) {
      const widths = columns.map((column) => numericWidth(column.styles?.width));
      const total = widths.reduce((sum, value) => sum + (value || 1), 0);
      node.children = columns.map((column, index) => {
        const width = widths[index];
        return convertColumn(column, width ? `${(width / total) * 100}%` : null);
      });
      node.children.push(...otherChildren.map(convertNode));
    } else {
      node.children = oldChildren.map(convertNode);
    }

    return node;
  }

  const result = source.map(convertNode).filter(Boolean);
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
