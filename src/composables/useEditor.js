import { computed, reactive, ref } from "vue";
import { createEditorDocument } from "@/components/editor/editorModel";
import { createEditorNode } from "@/components/editor/nodeFactory";

const document = reactive(createEditorDocument());
const selectedNodeId = ref(null);

export function useEditor() {
  const selectedNode = computed(() => selectedNodeId.value ? findNode(document.children, selectedNodeId.value) : null);
  const selectNode = (id) => { selectedNodeId.value = id; };

  function addSection(layout = "100", index = document.children.length) {
    const section = createEditorNode("section");
    const columns = layout.split("-").map(Number);
    section.children.push(...columns.map((width) => {
      const column = createEditorNode("column");
      column.styles.width = `${width}%`;
      return column;
    }));
    document.children.splice(Math.max(0, index), 0, section);
    selectNode(section.id);
    return section;
  }

  function addNode(type, parentId = null, overrides = {}) {
    const node = createEditorNode(type, overrides);
    const parent = parentId ? findNode(document.children, parentId) : document;
    if (!parent || !Array.isArray(parent.children)) return null;
    parent.children.push(node);
    selectNode(node.id);
    return node;
  }

  function addComponent(componentId, parentId) {
    return addNode("component", parentId, { props: { componentId } });
  }

  function updateNode(id, patch = {}) {
    const node = findNode(document.children, id);
    if (!node) return null;
    if (patch.props) node.props = { ...node.props, ...patch.props };
    if (patch.styles) node.styles = { ...node.styles, ...patch.styles };
    Object.entries(patch).forEach(([key, value]) => { if (key !== "props" && key !== "styles") node[key] = value; });
    return node;
  }

  function deleteNode(id) {
    if (!removeNode(document.children, id)) return false;
    if (selectedNodeId.value === id) selectedNodeId.value = null;
    return true;
  }

  function duplicateNode(id) {
    const node = findNode(document.children, id);
    if (!node) return null;
    const clone = deepClone(node);
    regenerateIds(clone);
    const parent = findParent(document.children, id);
    const list = parent ? parent.children : document.children;
    const index = list.findIndex((child) => child.id === id);
    list.splice(index + 1, 0, clone);
    selectNode(clone.id);
    return clone;
  }

  function moveNode(id, targetParentId, index = 0) {
    const sourceParent = findParent(document.children, id);
    const sourceList = sourceParent ? sourceParent.children : document.children;
    const sourceIndex = sourceList.findIndex((child) => child.id === id);
    if (sourceIndex < 0) return false;
    const [node] = sourceList.splice(sourceIndex, 1);
    const target = targetParentId ? findNode(document.children, targetParentId) : document;
    if (!target || !Array.isArray(target.children)) { sourceList.splice(sourceIndex, 0, node); return false; }
    target.children.splice(Math.max(0, Math.min(index, target.children.length)), 0, node);
    selectNode(id);
    return true;
  }

  return { document, selectedNodeId, selectedNode, selectNode, addSection, addNode, addComponent, updateNode, moveNode, deleteNode, duplicateNode };
}

function findNode(nodes, id) { for (const node of nodes) { if (node.id === id) return node; const found = findNode(node.children || [], id); if (found) return found; } return null; }
function findParent(nodes, id, parent = null) { for (const node of nodes) { if (node.id === id) return parent; const found = findParent(node.children || [], id, node); if (found) return found; } return null; }
function removeNode(nodes, id) { const index = nodes.findIndex((node) => node.id === id); if (index !== -1) { nodes.splice(index, 1); return true; } for (const node of nodes) if (removeNode(node.children || [], id)) return true; return false; }
function deepClone(value) { return JSON.parse(JSON.stringify(value)); }
function regenerateIds(node) { node.id = `${node.type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; (node.children || []).forEach(regenerateIds); }
