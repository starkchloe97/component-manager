import { computed, reactive, ref, watch } from "vue";
import { createEditorDocument } from "@/components/editor/editorModel";
import { createEditorNode } from "@/components/editor/nodeFactory";

const STORAGE_PREFIX = "component-manager:editor:";
const document = reactive(createEditorDocument());
const selectedNodeId = ref(null);
const activeComponentId = ref(null);
let persistenceReady = false;

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

function setActiveComponent(componentId) {
  if (!componentId || activeComponentId.value === componentId) return;
  if (activeComponentId.value) persistDocument();
  const stored = readStoredDocument(componentId);
  replaceDocument(stored);
  activeComponentId.value = componentId;
  selectedNodeId.value = null;
  persistenceReady = true;
  // Persist the normalized tree immediately so old nested layouts cannot
  // reappear on the next editor open.
  persistDocument();
}

function clearActiveComponent() {
  if (activeComponentId.value) persistDocument();
  activeComponentId.value = null;
  replaceDocument(null);
  selectedNodeId.value = null;
  persistenceReady = false;
}

if (typeof window !== "undefined") {
  watch(document, persistDocument, { deep: true });
}

export function useEditor() {
  const selectedNode = computed(() => selectedNodeId.value ? findNodeInDocument(selectedNodeId.value) : null);
  const selectNode = (id) => { selectedNodeId.value = id; };

  function addComponentElement(type, overrides = {}) {
    const node = createEditorNode(type, overrides);
    document.componentChildren.push(node);
    selectNode(node.id);
    return node;
  }

  function addContainerToComponent(layout = "100") {
    // Component-level layouts belong to componentChildren. They are siblings
    // of the rendered component content, not page-level document sections.
    const section = createSection(layout);
    document.componentChildren.push(section);
    selectNode(section.id);
    return section;
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

  function addSection(layout = "100", index = document.children.length, list = document.children) {
    const section = createSection(layout);
    list.splice(Math.max(0, Math.min(index, list.length)), 0, section);
    selectNode(section.id);
    return section;
  }

  function addSectionAfter(sectionId, layout = "100") {
    const topLevel = findTopLevelSection(sectionId);
    const index = topLevel ? document.children.findIndex((node) => node.id === topLevel.id) + 1 : document.children.length;
    return addSection(layout, index, document.children);
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

  // "Container" in the layout picker is a top-level layout section.
  // We deliberately do not create section -> container -> columns nesting.
  function addContainer(layout = "100", parentId = null) {
    // A layout selected from a node's contextual menu is inserted alongside
    // the current top-level builder layout, never inside one of its columns.
    const topLevel = parentId ? findTopLevelSection(parentId) : null;
    const index = topLevel
      ? document.children.findIndex((node) => node.id === topLevel.id) + 1
      : document.children.length;
    return addSection(layout, index, document.children);
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

  return { document, selectedNodeId, selectedNode, activeComponentId, setActiveComponent, clearActiveComponent, selectNode, addSection, addSectionAfter, addSectionToParent, addContainer, addComponentElement, addContainerToComponent, addNode, addComponent, updateNode, moveNode, deleteNode, duplicateNode };
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
function normalizePageStructure(nodes) {
  const source = Array.isArray(nodes) ? [...nodes] : [];
  const result = [];

  function asSection(node) {
    if (!node) return null;
    if (node.type === "container") {
      node.type = "section";
      node.styles = { ...(node.styles || {}), display: "grid", gap: "0px", width: "100%" };
    }
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
    if (node?.type === "section" || node?.type === "container") {
      const section = asSection(node);
      if (section) result.push(section);
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
