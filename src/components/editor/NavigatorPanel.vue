<script setup>
import { computed, onBeforeUnmount, reactive, ref, watch } from "vue";
import { useEditor } from "@/composables/useEditor";
import NavigatorTreeItem from "./NavigatorTreeItem.vue";

const props = defineProps({
  inspectorOpen: { type: Boolean, default: true },
});
const emit = defineEmits(["close"]);

const {
  document,
  selectedNodeId,
  selectionRevision,
  draggingNodeId,
  selectNode,
  startDragging,
  endDragging,
  getNodeById,
  getNodeParentId,
  getNodeAncestors,
  isNodeAncestor,
  moveNode,
} = useEditor();

const expandedIds = reactive(new Set());
const dropTarget = ref(null);
const panelPosition = reactive({ x: props.inspectorOpen ? 312 : 12, y: 62 });
const panelMoved = ref(false);
const pointerDrag = ref(null);
const panelStyle = computed(() => ({
  left: `${panelPosition.x}px`,
  top: `${panelPosition.y}px`,
}));
const selectedPath = computed(() => getNodeAncestors(selectedNodeId.value).map((node) => node.id).join("\\u0000"));

watch(() => props.inspectorOpen, (isOpen) => {
  if (!panelMoved.value) panelPosition.x = isOpen ? 312 : 12;
});

watch([selectedNodeId, selectedPath, selectionRevision], ([, path]) => {
  if (!path) return;
  path.split("\\u0000").forEach((id) => expandedIds.add(id));
}, { immediate: true });

function toggleNode(id) {
  if (expandedIds.has(id)) expandedIds.delete(id);
  else expandedIds.add(id);
}

function findRootList(id) {
  const rootId = getNodeAncestors(id)[0]?.id || id;
  return document.componentChildren.some((node) => node.id === rootId)
    ? document.componentChildren
    : document.children;
}

function findSiblings(parentId, nodeId) {
  if (parentId) return getNodeById(parentId)?.children || [];
  return findRootList(nodeId);
}

function rootKeyFor(nodeId) {
  return findRootList(nodeId) === document.componentChildren ? "componentChildren" : "children";
}

function isValidDrop(sourceId, targetId) {
  return Boolean(
    sourceId
    && targetId
    && sourceId !== targetId
    && getNodeById(sourceId)
    && getNodeById(targetId)
    && !isNodeAncestor(sourceId, targetId),
  );
}

function handleDragOver(payload) {
  const sourceId = draggingNodeId.value;
  if (!isValidDrop(sourceId, payload.nodeId)) {
    dropTarget.value = null;
    return;
  }
  dropTarget.value = payload;
}

function handleDragEnd() {
  dropTarget.value = null;
  endDragging();
}

function handleDrop({ sourceId, targetId, position }) {
  const source = sourceId || draggingNodeId.value;
  if (isValidDrop(source, targetId)) {
    if (position === "inside") {
      moveNode(source, targetId, getNodeById(targetId)?.children?.length || 0);
      expandedIds.add(targetId);
    } else {
      const targetParentId = getNodeParentId(targetId);
      const siblings = findSiblings(targetParentId, targetId);
      const targetIndex = siblings.findIndex((node) => node.id === targetId);
      const sourceParentId = getNodeParentId(source);
      const sameList = sourceParentId === targetParentId
        && (targetParentId || rootKeyFor(source) === rootKeyFor(targetId));
      let insertionIndex = targetIndex + (position === "after" ? 1 : 0);
      const sourceSiblings = findSiblings(sourceParentId, source);
      const sourceIndex = sourceSiblings.findIndex((node) => node.id === source);
      if (sameList && sourceIndex >= 0 && sourceIndex < insertionIndex) insertionIndex -= 1;

      moveNode(source, targetParentId, insertionIndex, rootKeyFor(targetId));
    }
  }
  dropTarget.value = null;
  endDragging();
}

function handleRootDrop(event, rootKey) {
  event.preventDefault();
  const sourceId = event.dataTransfer?.getData("application/x-editor-node-id") || draggingNodeId.value;
  if (sourceId && getNodeById(sourceId)) {
    const list = rootKey === "componentChildren" ? document.componentChildren : document.children;
    moveNode(sourceId, null, list.length, rootKey);
  }
  dropTarget.value = null;
  endDragging();
}

function clampPosition(x, y) {
  const panel = documentPanel.value;
  const width = panel?.offsetWidth || 286;
  const height = panel?.offsetHeight || 240;
  return {
    x: Math.max(0, Math.min(x, window.innerWidth - Math.min(width, window.innerWidth))),
    y: Math.max(0, Math.min(y, window.innerHeight - Math.min(height, window.innerHeight))),
  };
}

const documentPanel = ref(null);

function handlePointerMove(event) {
  if (!pointerDrag.value || event.pointerId !== pointerDrag.value.pointerId) return;
  const next = clampPosition(
    event.clientX - pointerDrag.value.offsetX,
    event.clientY - pointerDrag.value.offsetY,
  );
  panelPosition.x = next.x;
  panelPosition.y = next.y;
}

function stopPanelDrag(event) {
  if (!pointerDrag.value || (event && event.pointerId !== pointerDrag.value.pointerId)) return;
  pointerDrag.value = null;
  window.removeEventListener("pointermove", handlePointerMove);
  window.removeEventListener("pointerup", stopPanelDrag);
  window.removeEventListener("pointercancel", stopPanelDrag);
}

function startPanelDrag(event) {
  if (event.button !== 0 || event.target.closest("button")) return;
  const rect = documentPanel.value?.getBoundingClientRect();
  if (!rect) return;
  event.preventDefault();
  panelMoved.value = true;
  pointerDrag.value = {
    pointerId: event.pointerId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
  };
  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerup", stopPanelDrag);
  window.addEventListener("pointercancel", stopPanelDrag);
}

onBeforeUnmount(() => stopPanelDrag());
</script>

<template>
  <aside
    ref="documentPanel"
    class="navigator-panel"
    :style="panelStyle"
    aria-label="Navigator"
  >
    <header class="navigator-header" @pointerdown="startPanelDrag">
      <div class="navigator-heading">
        <h2>Structure</h2>
        <p>Drag to reorder or nest</p>
      </div>
      <button type="button" aria-label="Close Structure panel" @pointerdown.stop @click="emit('close')">×</button>
    </header>

    <div class="navigator-scroll" role="tree" aria-label="Editor structure">
      <section class="navigator-group" aria-label="Page">
        <h3>Page</h3>
        <NavigatorTreeItem
          v-for="node in document.children"
          :key="node.id"
          :node="node"
          :depth="0"
          :expanded-ids="expandedIds"
          :selected-node-id="selectedNodeId"
          :dragging-node-id="draggingNodeId"
          :drop-target="dropTarget"
          @select="selectNode"
          @toggle="toggleNode"
          @drag-start="startDragging"
          @drag-end="handleDragEnd"
          @drag-over="handleDragOver"
          @drag-leave="dropTarget = null"
          @drop="handleDrop"
        />
        <div
          v-if="draggingNodeId"
          class="navigator-root-drop"
          @dragover.prevent
          @drop="handleRootDrop($event, 'children')"
        >Drop at page root</div>
      </section>

      <section v-if="document.componentChildren.length" class="navigator-group" aria-label="Component">
        <h3>Component</h3>
        <NavigatorTreeItem
          v-for="node in document.componentChildren"
          :key="node.id"
          :node="node"
          :depth="0"
          :expanded-ids="expandedIds"
          :selected-node-id="selectedNodeId"
          :dragging-node-id="draggingNodeId"
          :drop-target="dropTarget"
          @select="selectNode"
          @toggle="toggleNode"
          @drag-start="startDragging"
          @drag-end="handleDragEnd"
          @drag-over="handleDragOver"
          @drag-leave="dropTarget = null"
          @drop="handleDrop"
        />
        <div
          v-if="draggingNodeId"
          class="navigator-root-drop"
          @dragover.prevent
          @drop="handleRootDrop($event, 'componentChildren')"
        >Drop at component root</div>
      </section>
    </div>
  </aside>
</template>

<style scoped>
.navigator-panel {
  position: fixed;
  z-index: 10030;
  display: flex;
  width: min(286px, calc(100vw - 24px));
  max-height: min(68vh, 680px);
  min-height: 180px;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #d9dfe5;
  border-radius: 7px;
  background: #fff;
  box-shadow: 0 10px 34px rgb(31 45 61 / 18%);
  color: #26313c;
  font-family: Arial, Helvetica, sans-serif;
}

.navigator-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 53px;
  padding: 7px 12px 8px 14px;
  border-bottom: 1px solid #e8ecf0;
  cursor: grab;
  touch-action: none;
  user-select: none;
}

.navigator-header:active {
  cursor: grabbing;
}

.navigator-heading {
  min-width: 0;
}

.navigator-header h2 {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
}

.navigator-header p {
  margin: 3px 0 0;
  color: #818b95;
  font-size: 10px;
}

.navigator-header button {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 25px;
  height: 25px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: #6b7680;
  cursor: pointer;
  font-size: 20px;
}

.navigator-header button:hover {
  background: #f0f3f6;
}

.navigator-scroll {
  overflow: auto;
  padding: 7px 0 12px;
}

.navigator-group + .navigator-group {
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px solid #edf0f3;
}

.navigator-group h3 {
  margin: 0;
  padding: 4px 13px 6px;
  color: #818b95;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.navigator-root-drop {
  margin: 3px 12px 0 30px;
  padding: 5px 8px;
  border: 1px dashed #d7dee5;
  border-radius: 4px;
  color: #98a2ac;
  font-size: 10px;
  text-align: center;
}

.navigator-root-drop:hover {
  border-color: #1685d1;
  background: #f1f8fd;
  color: #2676aa;
}

@media (max-width: 700px) {
  .navigator-panel {
    width: min(286px, calc(100vw - 16px));
  }
}
</style>
