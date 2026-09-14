<script setup>
import { computed } from "vue";
import { editorRegistry } from "@/config/editorRegistry";
import { useEditor } from "@/composables/useEditor";

const {
  selectedNodeId,
  addSection,
  addNode,
} = useEditor();

const elements = computed(() =>
  Object.entries(editorRegistry)
    .filter(([type]) => type !== "section")
    .map(([type, definition]) => ({
      type,
      ...definition,
    }))
);

function add(type) {
  if (!selectedNodeId.value) {
    addNode(type);
    return;
  }

  addNode(type, selectedNodeId.value);
}
</script>

<template>
  <aside class="element-panel">
    <h3>Elements</h3>

    <button
      class="section-button"
      type="button"
      @click="addSection('100')"
    >
      + Section
    </button>

    <div class="element-grid">
      <button
        v-for="element in elements"
        :key="element.type"
        type="button"
        class="element-item"
        @click="add(element.type)"
      >
        <strong>{{ element.label }}</strong>
        <small>{{ element.category }}</small>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.element-panel {
  width: 240px;
  flex: 0 0 240px;
  padding: 16px;
  box-sizing: border-box;
  background: white;
  border-right: 1px solid #e5e7eb;
}

.element-panel h3 {
  margin: 0 0 16px;
}

.section-button {
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
  border: 0;
  border-radius: 8px;
  background: #111827;
  color: white;
  cursor: pointer;
}

.element-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.element-item {
  min-height: 70px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  text-align: left;
  padding: 10px;
}

.element-item:hover {
  border-color: #3b82f6;
}

.element-item strong,
.element-item small {
  display: block;
}

.element-item small {
  margin-top: 4px;
  color: #9ca3af;
  font-size: 10px;
}
</style>
