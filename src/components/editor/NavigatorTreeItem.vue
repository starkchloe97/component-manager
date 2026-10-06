<script setup>
import { computed } from "vue";
import { componentRegistry } from "@/config/componentRegistry";
import { editorRegistry } from "@/config/editorRegistry";

defineOptions({ name: "NavigatorTreeItem" });

const props = defineProps({
  node: { type: Object, required: true },
  depth: { type: Number, default: 0 },
  expandedIds: { type: Set, required: true },
  selectedNodeId: { type: String, default: null },
  draggingNodeId: { type: String, default: null },
  dropTarget: { type: Object, default: null },
});
const emit = defineEmits(["select", "toggle", "drag-start", "drag-end", "drag-over", "drag-leave", "drop"]);

const children = computed(() => props.node.children || []);
const isExpanded = computed(() => props.expandedIds.has(props.node.id));
const isSelected = computed(() => props.selectedNodeId === props.node.id);
const canContainChildren = computed(() => ["section", "column", "container"].includes(props.node.type));
const nodeLabel = computed(() => {
  if (props.node.type === "component") {
    return componentRegistry[props.node.props?.componentId]?.name
      || props.node.props?.componentId
      || "Component";
  }
  return editorRegistry[props.node.type]?.label
    || props.node.type.charAt(0).toUpperCase() + props.node.type.slice(1);
});
const dropClass = computed(() => {
  if (props.dropTarget?.nodeId !== props.node.id) return "";
  return `navigator-row--drop-${props.dropTarget.position}`;
});

function handleDragStart(event) {
  if (!event.dataTransfer) return;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("application/x-editor-node-id", props.node.id);
  event.dataTransfer.setData("text/plain", props.node.id);
  emit("drag-start", props.node.id);
}

function handleDragOver(event) {
  event.preventDefault();
  const bounds = event.currentTarget.getBoundingClientRect();
  const ratio = bounds.height ? (event.clientY - bounds.top) / bounds.height : 0.5;
  const position = ratio < 0.25
    ? "before"
    : ratio > 0.75
      ? "after"
      : canContainChildren.value
        ? "inside"
        : ratio < 0.5 ? "before" : "after";
  emit("drag-over", { nodeId: props.node.id, position });
}

function handleDrop(event) {
  event.preventDefault();
  event.stopPropagation();
  const sourceId = event.dataTransfer?.getData("application/x-editor-node-id")
    || props.draggingNodeId;
  const bounds = event.currentTarget.getBoundingClientRect();
  const ratio = bounds.height ? (event.clientY - bounds.top) / bounds.height : 0.5;
  const position = ratio < 0.25
    ? "before"
    : ratio > 0.75
      ? "after"
      : canContainChildren.value
        ? "inside"
        : ratio < 0.5 ? "before" : "after";
  emit("drop", { sourceId, targetId: props.node.id, position });
}
</script>

<template>
  <div class="navigator-tree-item" role="none">
    <div
      class="navigator-row"
      :class="[{ 'navigator-row--selected': isSelected, 'navigator-row--dragging': draggingNodeId === node.id }, dropClass]"
      :data-node-id="node.id"
      role="treeitem"
      :aria-selected="isSelected"
      :aria-level="depth + 1"
      :aria-expanded="children.length ? isExpanded : undefined"
      :draggable="true"
      :style="{ '--navigator-depth': depth }"
      @click="emit('select', node.id)"
      @dragstart="handleDragStart"
      @dragend="emit('drag-end')"
      @dragover="handleDragOver"
      @dragleave="emit('drag-leave', node.id)"
      @drop="handleDrop"
    >
      <button
        class="navigator-disclosure"
        type="button"
        :aria-label="isExpanded ? `Collapse ${nodeLabel}` : `Expand ${nodeLabel}`"
        :aria-expanded="isExpanded"
        :disabled="!children.length"
        @click.stop="children.length && emit('toggle', node.id)"
      >
        <span v-if="children.length" class="navigator-chevron" :class="{ expanded: isExpanded }" aria-hidden="true" />
      </button>
      <span class="navigator-grip" aria-hidden="true">::</span>
      <span class="navigator-node-type" aria-hidden="true">{{ node.type === "component" ? "C" : node.type.slice(0, 1).toUpperCase() }}</span>
      <span class="navigator-label" :title="nodeLabel">{{ nodeLabel }}</span>
      <span v-if="children.length" class="navigator-child-count">{{ children.length }}</span>
    </div>

    <div v-if="children.length && isExpanded" class="navigator-children" role="group">
      <NavigatorTreeItem
        v-for="child in children"
        :key="child.id"
        :node="child"
        :depth="depth + 1"
        :expanded-ids="expandedIds"
        :selected-node-id="selectedNodeId"
        :dragging-node-id="draggingNodeId"
        :drop-target="dropTarget"
        @select="emit('select', $event)"
        @toggle="emit('toggle', $event)"
        @drag-start="emit('drag-start', $event)"
        @drag-end="emit('drag-end')"
        @drag-over="emit('drag-over', $event)"
        @drag-leave="emit('drag-leave', $event)"
        @drop="emit('drop', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.navigator-tree-item {
  min-width: 0;
}

.navigator-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  min-height: 31px;
  margin: 1px 5px;
  padding: 0 7px 0 calc(7px + var(--navigator-depth) * 14px);
  border: 1px solid transparent;
  border-radius: 4px;
  color: #424b55;
  cursor: grab;
  font: 12px/1.2 Arial, Helvetica, sans-serif;
  user-select: none;
}

.navigator-row:hover {
  background: #f1f4f7;
}

.navigator-row--selected {
  border-color: #cce3fa;
  background: #eaf4fe;
  color: #1467a5;
  font-weight: 600;
}

.navigator-row--dragging {
  opacity: 0.42;
}

.navigator-row--drop-before {
  box-shadow: inset 0 2px #1685d1;
}

.navigator-row--drop-after {
  box-shadow: inset 0 -2px #1685d1;
}

.navigator-row--drop-inside {
  border-color: #1685d1;
  background: #e6f3fc;
}

.navigator-disclosure {
  display: grid;
  flex: 0 0 13px;
  place-items: center;
  width: 13px;
  height: 20px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #74808c;
  cursor: pointer;
}

.navigator-disclosure:disabled {
  cursor: default;
}

.navigator-chevron {
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 5px solid currentColor;
  transition: transform 120ms ease;
}

.navigator-chevron.expanded {
  transform: rotate(90deg);
}

.navigator-grip {
  width: 9px;
  color: #a6afb8;
  font-size: 14px;
  line-height: 1;
}

.navigator-node-type {
  display: grid;
  flex: 0 0 17px;
  place-items: center;
  width: 17px;
  height: 17px;
  border-radius: 3px;
  background: #e8edf2;
  color: #647282;
  font-size: 9px;
  font-weight: 700;
}

.navigator-row--selected .navigator-node-type {
  background: #d1e7fa;
  color: #1467a5;
}

.navigator-label {
  overflow: hidden;
  flex: 1;
  min-width: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.navigator-child-count {
  color: #929ca6;
  font-size: 10px;
}

.navigator-children {
  margin-left: 13px;
  border-left: 1px solid #e1e6eb;
}
</style>
