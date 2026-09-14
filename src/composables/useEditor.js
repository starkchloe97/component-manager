import { computed, reactive, ref } from "vue";
import { createEditorDocument } from "@/components/editor/editorModel";
import { createEditorNode } from "@/components/editor/nodeFactory";

const document = reactive(createEditorDocument());

const selectedNodeId = ref(null);

export function useEditor() {
  const selectedNode = computed(() => {
    if (!selectedNodeId.value) {
      return null;
    }

    return findNode(document.children, selectedNodeId.value);
  });

  function selectNode(id) {
    selectedNodeId.value = id;
  }

  function addSection(layout = "100") {
    const section = createEditorNode("section");

    const columns = layout
      .split("-")
      .map(Number);

    section.children.push(
      ...columns.map((width) => {
        const column = createEditorNode("column");

        column.styles.width = `${width}%`;

        return column;
      })
    );

    document.children.push(section);

    selectNode(section.id);

    return section;
  }

  function addNode(type, parentId = null) {
    const node = createEditorNode(type);

    if (!parentId) {
      document.children.push(node);
    } else {
      const parent = findNode(
        document.children,
        parentId
      );

      if (!parent) return null;

      parent.children.push(node);
    }

    selectNode(node.id);

    return node;
  }

  function deleteNode(id) {
    removeNode(document.children, id);

    if (selectedNodeId.value === id) {
      selectedNodeId.value = null;
    }
  }

  function duplicateNode(id) {
    const node = findNode(document.children, id);

    if (!node) return null;

    const clone = deepClone(node);

    regenerateIds(clone);

    const parent = findParent(
      document.children,
      id
    );

    if (parent) {
      const index = parent.children.findIndex(
        (child) => child.id === id
      );

      parent.children.splice(index + 1, 0, clone);
    } else {
      const index = document.children.findIndex(
        (child) => child.id === id
      );

      document.children.splice(index + 1, 0, clone);
    }

    selectNode(clone.id);

    return clone;
  }

  return {
    document,
    selectedNodeId,
    selectedNode,

    selectNode,
    addSection,
    addNode,
    deleteNode,
    duplicateNode,
  };
}

function findNode(nodes, id) {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }

    const result = findNode(node.children, id);

    if (result) {
      return result;
    }
  }

  return null;
}

function findParent(nodes, id, parent = null) {
  for (const node of nodes) {
    if (node.id === id) {
      return parent;
    }

    const result = findParent(
      node.children,
      id,
      node
    );

    if (result) {
      return result;
    }
  }

  return null;
}

function removeNode(nodes, id) {
  const index = nodes.findIndex(
    (node) => node.id === id
  );

  if (index !== -1) {
    nodes.splice(index, 1);
    return true;
  }

  for (const node of nodes) {
    if (removeNode(node.children, id)) {
      return true;
    }
  }

  return false;
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function regenerateIds(node) {
  node.id = `${node.type}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  node.children.forEach(regenerateIds);
}
