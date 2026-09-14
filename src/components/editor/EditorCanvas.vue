<script setup>
import { useEditor } from "@/composables/useEditor";
import EditorNode from "./EditorNode.vue";
import { computed } from "vue";

const props = defineProps({
  component: {
    type: Object,
    required: true,
  },
});
const {
  document,
  addSection,
} = useEditor();
</script>

<template>
  <main class="editor-canvas">
    <div
      v-if="!document.children.length"
      class="empty-canvas"
    >
      <p>Your page is empty.</p>

      <button
        type="button"
        @click="addSection('100')"
      >
        Add Section
      </button>
    </div>


    <EditorNode
      v-for="node in document.children"
      v-else
      :key="node.id"
      :node="node"
    />
    <!-- <component
      :is="component.component"
    /> -->
  </main>
</template>

<style scoped>
.editor-canvas {
  min-height: 100vh;
  background: #f3f4f6;
}

.empty-canvas {
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #6b7280;
}

.empty-canvas button {
  border: 0;
  border-radius: 8px;
  padding: 10px 16px;
  background: #111827;
  color: white;
  cursor: pointer;
}
</style>
