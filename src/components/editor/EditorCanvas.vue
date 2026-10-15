<script setup>
import { ref } from "vue";
import { useEditor } from "@/composables/useEditor";
import EditorNode from "./EditorNode.vue";
import SectionLayoutPicker from "./SectionLayoutPicker.vue";

const props = defineProps({ component: { type: Object, required: true } });
const { document, addSection, addContainer, beginFillDraft, draggingNodeType, endDragging } = useEditor();
const showSectionPicker = ref(false);

function getDraggedType(event) {
  return draggingNodeType.value
    || event.dataTransfer?.getData("application/x-editor-node-type")
    || null;
}

function handleEmptyCanvasDragOver(event) {
  if (getDraggedType(event) !== "container") return;
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
}

function handleEmptyCanvasDrop(event) {
  if (getDraggedType(event) !== "container") return;
  event.preventDefault();
  event.stopPropagation();
  const created = addContainer("column");
  beginFillDraft(created);
  endDragging();
}
</script>

<template>
  <main class="editor-canvas" :data-editor-component-id="component.id">
    <div
      v-if="!document.children.length"
      class="empty-canvas"
      @dragover="handleEmptyCanvasDragOver"
      @drop="handleEmptyCanvasDrop"
    >
      <p>Your page is empty.</p>
      <button type="button" @click="showSectionPicker = true">Add Section</button>
      <SectionLayoutPicker v-if="showSectionPicker"
        @select="(layout) => { addSection(layout); showSectionPicker = false }" @close="showSectionPicker = false" />
    </div>
    <EditorNode v-for="node in document.children" v-else :key="node.id" :node="node" :component-id="component.id" />
  </main>
</template>

<style scoped>
.editor-canvas {
  width: 100%;
  box-sizing: border-box;
  overflow: visible;
  background: #fff
}

.empty-canvas {
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #6b7280
}

.empty-canvas p {
  font-size: 11px;
  margin: 0
}

.empty-canvas button {
  border: 0;
  border-radius: 7px;
  padding: 8px 13px;
  background: #111827;
  color: #fff;
  font-size: 10px;
  cursor: pointer
}
</style>
