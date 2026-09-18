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
    const container = createEditorNode("container");
    const columns = layout.split("-").map(Number);
    container.styles.display = "grid";
    container.styles.gridTemplateColumns = columns.map((width) => `${width}fr`).join(" ");
    container.styles.gap = "0px";
    container.children.push(...createLayoutChildren(layout));
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

  function addSection(layout = "100", index = document.children.length, list = document.children) {
    const section = createSection(layout);
    list.splice(Math.max(0, Math.min(index, list.length)), 0, section);
    selectNode(section.id);
    return section;
  }

  function addSectionAfter(sectionId, layout = "100") {
    const parent = findParentInDocument(sectionId);
    const list = parent ? parent.children : document.children;
    const index = list.findIndex((node) => node.id === sectionId);
    if (index < 0) return null;
    return addSection(layout, index + 1, list);
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
    const parent = findNodeInDocument(parentId);
    if (!parent || !Array.isArray(parent.children)) return null;

    const section = createEditorNode("section");
    const columns = layout.split("-").map(Number);
    section.styles.display = "grid";
    section.styles.gridTemplateColumns = columns.map((width) => width + "fr").join(" ");
    section.styles.gap = "0px";
    section.children.push(...createLayoutChildren(layout));
    parent.children.push(section);
    selectNode(section.id);
    return section;
  }

  function addContainer(layout = "100", parentId = null) {
    const container = createEditorNode("container");
    const columns = layout.split("-").map(Number);
    container.styles.display = "grid";
    container.styles.gridTemplateColumns = columns.map((width) => `${width}fr`).join(" ");
    container.styles.gap = "0px";
    container.children.push(...createLayoutChildren(layout));
    const parent = parentId ? findNodeInDocument(parentId) : document;
    if (!parent || !Array.isArray(parent.children)) return null;
    parent.children.push(container);
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
