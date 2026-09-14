<script setup>
import { computed } from "vue";
import { useEditor } from "@/composables/useEditor";

const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
});

const {
  selectedNodeId,
  selectNode,
  duplicateNode,
  deleteNode,
} = useEditor();

const isSelected = computed(
  () => selectedNodeId.value === props.node.id
);

function select(event) {
  event.stopPropagation();

  selectNode(props.node.id);
}
</script>

<template>
  <div
    class="editor-node"
    :class="{
      'editor-node--selected': isSelected
    }"
    @click="select"
  >
    <!-- SECTION -->
    <section
      v-if="node.type === 'section'"
      class="editor-section"
      :style="node.styles"
    >
      <EditorNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
      />
    </section>

    <!-- CONTAINER -->
    <div
      v-else-if="node.type === 'container'"
      class="editor-container"
      :style="node.styles"
    >
      <EditorNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
      />
    </div>

    <!-- COLUMN -->
    <div
      v-else-if="node.type === 'column'"
      class="editor-column"
      :style="node.styles"
    >
      <EditorNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
      />
    </div>

    <!-- HEADING -->
    <h2
      v-else-if="node.type === 'heading'"
      :style="node.styles"
    >
      {{ node.props.text }}
    </h2>

    <!-- TEXT -->
    <p
      v-else-if="node.type === 'text'"
      :style="node.styles"
    >
      {{ node.props.text }}
    </p>

    <!-- BUTTON -->
    <a
      v-else-if="node.type === 'button'"
      :href="node.props.href"
      :style="node.styles"
    >
      {{ node.props.text }}
    </a>

    <!-- IMAGE -->
    <img
      v-else-if="node.type === 'image'"
      :src="node.props.src"
      :alt="node.props.alt"
      :style="node.styles"
    />

    <div
      v-if="isSelected"
      class="selection-label"
    >
      {{ node.type }}
    </div>
  </div>

  <div
  v-if="isSelected"
  class="node-toolbar"
>
  <span>{{ node.type }}</span>

  <button @click.stop="duplicateNode(node.id)">
    Duplicate
  </button>

  <button @click.stop="deleteNode(node.id)">
    Delete
  </button>
</div>

<button
  type="button"
  @click="copyComponent"
>
  Copy Vue Component
</button>
</template>

<style scoped>
.editor-node {
  position: relative;
}

.editor-node--selected {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}

.selection-label {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  padding: 3px 7px;
  background: #3b82f6;
  color: white;
  font-size: 10px;
  font-weight: 600;
  z-index: 20;
}

.editor-section {
  width: 100%;
}

.editor-container {
  width: 100%;
  box-sizing: border-box;
}

.editor-column {
  box-sizing: border-box;
}

.node-toolbar {
  position: absolute;
  top: -32px;
  right: 0;
  z-index: 50;

  display: flex;
  align-items: center;
  gap: 4px;

  padding: 4px;

  background: #111827;
  color: white;
  border-radius: 6px;

  font-size: 10px;
}

.node-toolbar button {
  border: 0;
  background: transparent;
  color: white;
  cursor: pointer;
  font-size: 10px;
}
</style>
