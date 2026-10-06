<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { ChevronUp, Copy, FolderOpen, GripVertical, Plus, Sparkles, Trash2, X } from "@lucide/vue";
import { useEditor } from "@/composables/useEditor";
import { useComponentEditor } from "@/composables/useComponentEditor";
import { componentRegistry } from "@/config/componentRegistry";
import { editorRegistry } from "@/config/editorRegistry";
import { resolveIcon } from "@/config/iconLibrary";
import { resolveResponsiveNodeStyles } from "@/composables/useResponsiveNodeStyles";
import AddMenu from "./AddMenu.vue";
import InsertionPoint from "./InsertionPoint.vue";
import ContainerStructurePicker from "./ContainerStructurePicker.vue";

defineOptions({ name: "EditorNode" });

const props = defineProps({
  node: { type: Object, required: true },
  parentId: { type: String, default: null },
  parentType: { type: String, default: null },
  parentStyles: { type: Object, default: () => ({}) },
  rootNode: { type: Boolean, default: false },
});

const {
  document,
  selectedNodeId,
  hoveredNodeId,
  draggingNodeId,
  draggingNodeType,
  viewportTick,
  selectNode,
  startDragging,
  endDragging,
  isNodeAncestor,
  getNodeParentId,
  addNode,
  addNodeBefore,
  addNodeAfter,
  addContainer,
  addContainerAfter,
  duplicateNode,
  deleteNode,
  updateNode,
  moveNode,
  containerDraft,
  beginContainerDraft,
  beginFillDraft,
  cancelContainerDraft,
  commitContainerDraft,
} = useEditor();
const { clearElement } = useComponentEditor();

const addTrigger = ref(null);
const showAdd = ref(false);
const addMode = ref("inside");
const leafElement = ref(null);
const leafToolbarStyle = ref({});
const dragDepth = ref(0);
const isDropTarget = ref(false);
const dropPosition = ref(null);

const isContainer = computed(() => props.node.type === "container");
const isSelected = computed(() => selectedNodeId.value === props.node.id);
const isSelectionAncestor = computed(() => isNodeAncestor(props.node.id, selectedNodeId.value));
const isDirectChildOfSelectedContainer = computed(
  () => isContainer.value && !!props.parentId && selectedNodeId.value === props.parentId,
);
const isNestedContainer = computed(() => isContainer.value && !!props.parentId);
const isHovered = computed(() => hoveredNodeId.value === props.node.id);
const hasParentNode = computed(() => !!props.parentId);
const isEmptyContainer = computed(() => isContainer.value && !props.node.children?.length);
const isFillDraftHost = computed(
  () => containerDraft.value?.kind === "fill" && containerDraft.value.nodeId === props.node.id,
);
const isLastRootNode = computed(() => props.rootNode && document.children.at(-1)?.id === props.node.id);
const componentEntry = computed(() => componentRegistry[props.node.props?.componentId] || null);
const componentLabel = computed(() => componentEntry.value?.name || props.node.props?.componentId || "Component");
const nodeLabel = computed(() => props.node.type === "component" ? componentLabel.value : (editorRegistry[props.node.type]?.label || props.node.type));
const renderedStyles = resolveResponsiveNodeStyles(props.node);
const isFlexRowItem = computed(() => props.parentStyles.display === "flex" && ["row", "row-reverse"].includes(props.parentStyles.flexDirection));
const layoutItemStyles = computed(() => {
  if (!isFlexRowItem.value) return null;
  const styles = renderedStyles.value;
  return {
    width: styles.width || "auto",
    minWidth: styles.minWidth || "0",
    maxWidth: styles.maxWidth,
    boxSizing: styles.boxSizing || "border-box",
    flex: styles.flex,
    flexGrow: styles.flexGrow,
    flexShrink: styles.flexShrink,
    flexBasis: styles.flexBasis,
  };
});
const renderedContentStyles = computed(() => isFlexRowItem.value
  ? { ...renderedStyles.value, width: "100%", minWidth: "0", maxWidth: "100%" }
  : renderedStyles.value);
const resolvedIcon = computed(() => resolveIcon(props.node.props?.icon));
const isLeaf = computed(() => ["heading", "text", "button", "image", "icon"].includes(props.node.type));
const canAcceptChildren = computed(() => ["container", "column", "section"].includes(props.node.type));

watch([selectedNodeId, viewportTick], () => {
  if (selectedNodeId.value === props.node.id) nextTick(updateLeafToolbarPosition);
});

function closeMenus() {
  showAdd.value = false;
}

function selectParentNode(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (!props.parentId) return;
  clearElement();
  selectNode(props.parentId);
  closeMenus();
}

function openInsertion(event) { openAdd(event, "after"); }

function openAdd(event, mode = "inside") {
  event?.stopPropagation?.();
  addTrigger.value = event?.currentTarget || event || addTrigger.value;
  addMode.value = mode;
  selectNode(props.node.id);
  showAdd.value = !showAdd.value;
}

function handleAdd(type) {
  showAdd.value = false;
  if (type === "container") {
    if (addMode.value === "inside" && isEmptyContainer.value) {
      beginContainerDraft({ kind: "fill", nodeId: props.node.id });
      return;
    }
    const created = addMode.value === "inside"
      ? addContainer("column", props.node.id)
      : addContainerAfter(props.node.id, "column");
    beginFillDraft(created);
    return;
  }
  if (addMode.value === "inside") addNode(type, props.node.id);
  else addNodeAfter(type, props.node.id);
}

function commitFillDraft(payload) {
  commitContainerDraft(payload);
}

function removeNode() {
  deleteNode(props.node.id);
}

function updateLeafToolbarPosition() {
  if (!isSelected.value || !leafElement.value) return;
  const rect = leafElement.value.getBoundingClientRect();
  leafToolbarStyle.value = {
    top: `${Math.max(4, rect.top - 36)}px`,
    left: `${Math.max(4, rect.right - 190)}px`,
  };
}

function beginInlineEdit(event) {
  if (!["heading", "text", "button"].includes(props.node.type)) return;
  event.preventDefault();
  event.stopPropagation();
  selectNode(props.node.id);
  const element = event.currentTarget;
  if (!(element instanceof HTMLElement)) return;
  element.setAttribute("contenteditable", "true");
  element.setAttribute("spellcheck", "true");
  element.focus();
}

function syncInlineText(event) {
  const element = event.currentTarget;
  if (element instanceof HTMLElement) updateNode(props.node.id, { props: { text: element.textContent || "" } });
}

function finishInlineEdit(event) {
  const element = event.currentTarget;
  if (element instanceof HTMLElement) {
    updateNode(props.node.id, { props: { text: element.textContent || "" } });
    element.removeAttribute("contenteditable");
    element.removeAttribute("spellcheck");
  }
}

function cancelInlineEdit(event) {
  const element = event.currentTarget;
  if (element instanceof HTMLElement) {
    element.textContent = props.node.props.text || "";
    element.removeAttribute("contenteditable");
    element.removeAttribute("spellcheck");
  }
}

function resetDropState() {
  dragDepth.value = 0;
  isDropTarget.value = false;
  dropPosition.value = null;
}

function getDragPayload(event) {
  const nodeId = draggingNodeId.value
    || event.dataTransfer?.getData("application/x-editor-node-id")
    || null;
  const type = draggingNodeType.value
    || event.dataTransfer?.getData("application/x-editor-node-type")
    || null;
  return { nodeId, type };
}

function canAcceptDrag(event) {
  const { nodeId, type } = getDragPayload(event);
  if (nodeId) {
    return nodeId !== props.node.id && !isNodeAncestor(nodeId, props.node.id);
  }
  return Boolean(type && editorRegistry[type] && (canAcceptChildren.value || !!props.parentId));
}

function startNodeDrag(event) {
  event.stopPropagation();
  if (!event.dataTransfer) return;
  startDragging(props.node.id);
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("application/x-editor-node-id", props.node.id);
  event.dataTransfer.setData("text/plain", props.node.id);
}

function endNodeDrag() {
  endDragging();
}

function handleDragEnter(event) {
  if (!canAcceptDrag(event)) return;
  event.preventDefault();
  event.stopPropagation();
  dragDepth.value += 1;
  isDropTarget.value = true;
  dropPosition.value = getDropPosition(event);
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
}

function handleDragOver(event) {
  if (!canAcceptDrag(event)) {
    if (event.dataTransfer) event.dataTransfer.dropEffect = "none";
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  isDropTarget.value = true;
  dropPosition.value = getDropPosition(event);
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
}

function handleDragLeave(event) {
  if (!isDropTarget.value) return;
  event.preventDefault();
  event.stopPropagation();
  dragDepth.value = Math.max(0, dragDepth.value - 1);
  if (dragDepth.value === 0) isDropTarget.value = false;
}

function getDropPosition(event) {
  const rect = event.currentTarget?.getBoundingClientRect?.();
  if (!rect || !rect.height) return canAcceptChildren.value ? "inside" : "after";
  const ratio = (event.clientY - rect.top) / rect.height;
  if (ratio < 0.25) return "before";
  if (ratio > 0.75) return "after";
  return canAcceptChildren.value ? "inside" : ratio < 0.5 ? "before" : "after";
}

function handleDrop(event) {
  if (!canAcceptDrag(event)) return;
  event.preventDefault();
  event.stopPropagation();

  const { nodeId, type } = getDragPayload(event);
  const position = getDropPosition(event);

  if (nodeId && nodeId !== props.node.id) {
    if (position === "inside" && canAcceptChildren.value) {
      moveNode(nodeId, props.node.id, props.node.children?.length || 0);
    } else {
      const targetParentId = getNodeParentId(props.node.id);
      const targetList = findSiblingListForNode(props.node.id);
      const targetIndex = targetList.findIndex((item) => item.id === props.node.id);
      const sourceParentId = getNodeParentId(nodeId);
      const sourceList = findSiblingListForNode(nodeId);
      const sourceIndex = sourceList.findIndex((item) => item.id === nodeId);
      const sameList = sourceParentId === targetParentId
        && (targetParentId || sourceList === targetList);

      if (targetIndex >= 0) {
        let insertionIndex = targetIndex + (position === "after" ? 1 : 0);
        if (sameList && sourceIndex >= 0 && sourceIndex < insertionIndex) insertionIndex -= 1;
        const targetRoot = targetList === document.componentChildren ? "componentChildren" : "children";
        moveNode(nodeId, targetParentId, insertionIndex, targetRoot);
      }
    }
  } else if (type && editorRegistry[type]) {
    if (position === "inside" && canAcceptChildren.value) {
      const created = addNode(type, props.node.id);
      if (created?.type === "container") beginFillDraft(created);
    } else if (position === "before" && props.parentId) {
      const created = addNodeBefore(type, props.node.id);
      if (created?.type === "container") beginFillDraft(created);
    } else if (position === "after" && props.parentId) {
      const created = addNodeAfter(type, props.node.id);
      if (created?.type === "container") beginFillDraft(created);
    }
  }

  resetDropState();
}

function findSiblingListForNode(nodeId) {
  const parentId = getNodeParentId(nodeId);
  if (parentId) return findNodeInEditorDocument(parentId)?.children || [];

  const rootNodeExists = document.children.some((node) => node.id === nodeId);
  return rootNodeExists ? document.children : document.componentChildren;
}

function findNodeInEditorDocument(id) {
  const walk = (nodes) => {
    for (const node of nodes || []) {
      if (node.id === id) return node;
      const found = walk(node.children || []);
      if (found) return found;
    }
    return null;
  };
  return walk(document.children) || walk(document.componentChildren);
}

function openDropAdd(event) {
  event.stopPropagation();
  openAdd(event, "inside");
}

function openDropLibrary(event) {
  event.stopPropagation();
  openAdd(event, "inside");
}

function openDropAi(event) {
  event.stopPropagation();
  openAdd(event, "inside");
}
</script>

<template>
  <div
    v-if="node.type === 'container'"
    class="editor-node editor-node--container"
    :style="layoutItemStyles"
    :data-editor-node-id="node.id"
    data-editor-node-type="container"
    :class="{
      'editor-node--selected': isSelected,
      'editor-node--selection-ancestor': isSelectionAncestor,
      'editor-node--direct-child-container': isDirectChildOfSelectedContainer,
      'editor-node--nested-container': isNestedContainer,
      'editor-node--hovered': isHovered,
      'editor-node--drop-target': isDropTarget,
      'editor-node--drop-before': dropPosition === 'before',
      'editor-node--drop-after': dropPosition === 'after',
      'editor-node--drop-inside': dropPosition === 'inside',
    }"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <div class="editor-container elementor-container" :style="renderedContentStyles">
      <ContainerStructurePicker
        v-if="isFillDraftHost"
        @select="commitFillDraft"
        @close="cancelContainerDraft"
      />
      <div v-else-if="isEmptyContainer" class="container-empty-state">
        <button
          type="button"
          class="container-quick-add"
          data-editor-chrome="true"
          title="Add element"
          aria-label="Add element"
          @click.stop="openAdd($event, 'inside')"
        >
          <Plus :size="24" stroke-width="1.8" />
        </button>
        <span>Drag widget here or click +</span>
      </div>

      <EditorNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :parent-id="node.id"
        :parent-type="node.type"
        :parent-styles="renderedStyles"
      />

      <div v-if="isDropTarget && dropPosition === 'inside'" class="context-drop-zone" data-editor-chrome="true" @click.stop>
        <span class="context-drop-line" />
        <div class="context-drop-actions">
          <button type="button" title="Add element" aria-label="Add element" @click="openDropAdd">
            <Plus :size="17" />
          </button>
          <button type="button" title="Open library" aria-label="Open library" @click="openDropLibrary">
            <FolderOpen :size="16" />
          </button>
          <button type="button" title="AI assist" aria-label="AI assist" @click="openDropAi">
            <Sparkles :size="16" />
          </button>
        </div>
        <span class="context-drop-label">Drop here</span>
      </div>
    </div>

    <div v-if="isSelected" class="container-handle" data-editor-chrome="true" @click.stop>
      <button
        v-if="hasParentNode"
        type="button"
        class="container-handle__button"
        title="Select parent container"
        aria-label="Select parent container"
        @click="selectParentNode"
      >
        <ChevronUp :size="16" />
      </button>
      <button
        type="button"
        class="container-handle__button container-handle__drag"
        draggable="true"
        title="Drag container"
        aria-label="Drag container"
        @dragstart="startNodeDrag"
        @dragend="endNodeDrag"
      >
        <GripVertical :size="15" />
      </button>
      <button
        type="button"
        class="container-handle__button"
        title="Add element"
        aria-label="Add element"
        @click="openAdd($event, 'inside')"
      >
        <Plus :size="16" />
      </button>
      <button
        type="button"
        class="container-handle__button container-handle__delete"
        title="Delete container"
        aria-label="Delete container"
        @click="removeNode"
      >
        <X :size="16" />
      </button>
    </div>

    <InsertionPoint
      v-if="!rootNode && isSelected"
      label="Add"
      :visible="true"
      data-editor-chrome="true"
      @activate="openInsertion"
    />
  </div>

  <div
    v-else-if="node.type === 'section' || node.type === 'column'"
    class="editor-node editor-node--legacy"
    :style="layoutItemStyles"
    :data-editor-node-id="node.id"
    :data-editor-node-type="node.type"
    :class="{ 'editor-node--selected': isSelected, 'editor-node--hovered': isHovered, 'editor-node--drop-target': isDropTarget, 'editor-node--drop-before': dropPosition === 'before', 'editor-node--drop-after': dropPosition === 'after', 'editor-node--drop-inside': dropPosition === 'inside' }"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <div class="editor-legacy-layout" :style="renderedContentStyles">
      <EditorNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :parent-id="node.id"
        :parent-type="node.type"
        :parent-styles="renderedStyles"
      />
    </div>
    <div v-if="isSelected" class="node-toolbar legacy-toolbar" data-editor-chrome="true" @click.stop>
      <button v-if="hasParentNode" type="button" @click="selectParentNode" title="Select parent" aria-label="Select parent"><ChevronUp :size="15" /></button>
      <span>{{ nodeLabel }}</span>
      <GripVertical class="drag-grip" :size="15" draggable="true" title="Drag to move" aria-label="Drag to move" @dragstart="startNodeDrag" @dragend="endNodeDrag" />
      <button type="button" @click="openAdd($event, 'inside')" title="Add inside"><Plus :size="15" /></button>
      <button type="button" @click="duplicateNode(node.id)" title="Duplicate"><Copy :size="15" /></button>
      <button type="button" class="toolbar-icon-danger" @click="removeNode" title="Delete"><Trash2 :size="15" /></button>
    </div>
  </div>

  <div
    v-else-if="node.type === 'component'"
    class="editor-node editor-node--component"
    :style="layoutItemStyles"
    :data-editor-node-id="node.id"
    data-editor-node-type="component"
    :class="{ 'editor-node--selected': isSelected, 'editor-node--hovered': isHovered, 'editor-node--drop-target': isDropTarget, 'editor-node--drop-before': dropPosition === 'before', 'editor-node--drop-after': dropPosition === 'after', 'editor-node--drop-inside': dropPosition === 'inside' }"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <div class="component-node" :style="renderedContentStyles">
      <div class="component-node-label">{{ componentLabel }}</div>
      <component v-if="componentEntry" :is="componentEntry.component" />
      <div v-else class="component-missing">Component unavailable</div>
    </div>
    <div v-if="isSelected" class="node-toolbar" data-editor-chrome="true" @click.stop>
      <button v-if="hasParentNode" type="button" class="toolbar-icon-button" aria-label="Select parent" title="Select parent" @click="selectParentNode"><ChevronUp :size="15" /></button>
      <span class="node-toolbar-label">{{ nodeLabel }}</span>
      <GripVertical :size="15" class="drag-grip" draggable="true" @dragstart="startNodeDrag" @dragend="endNodeDrag" />
      <button type="button" class="toolbar-icon-button" aria-label="Add after component" @click="openAdd($event, 'after')"><Plus :size="15" /></button>
      <button type="button" class="toolbar-icon-button" aria-label="Duplicate component" @click="duplicateNode(node.id)"><Copy :size="15" /></button>
      <button type="button" class="toolbar-icon-button toolbar-icon-danger" aria-label="Delete component" @click="removeNode"><Trash2 :size="15" /></button>
    </div>
  </div>

  <div
    v-else-if="isLeaf"
    class="editor-node editor-node--leaf"
    :style="layoutItemStyles"
    :data-editor-node-id="node.id"
    :data-editor-node-type="node.type"
    :class="{ 'editor-node--selected': isSelected, 'editor-node--hovered': isHovered, 'editor-node--drop-target': isDropTarget, 'editor-node--drop-before': dropPosition === 'before', 'editor-node--drop-after': dropPosition === 'after', 'editor-node--drop-inside': dropPosition === 'inside' }"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <component
      v-if="node.type === 'heading'"
      :is="node.props.tag || 'h2'"
      ref="leafElement"
      class="builder-element"
      :style="renderedContentStyles"
      @dblclick="beginInlineEdit"
      @input="syncInlineText"
      @blur="finishInlineEdit"
      @keydown.esc.prevent="cancelInlineEdit"
    >{{ node.props.text }}</component>

    <p
      v-else-if="node.type === 'text'"
      ref="leafElement"
      class="builder-element"
      :style="renderedContentStyles"
      @dblclick="beginInlineEdit"
      @input="syncInlineText"
      @blur="finishInlineEdit"
      @keydown.esc.prevent="cancelInlineEdit"
    >{{ node.props.text }}</p>

    <a
      v-else-if="node.type === 'button'"
      ref="leafElement"
      class="builder-element"
      :href="node.props.href || '#'"
      :style="renderedContentStyles"
      @click.prevent
      @dblclick="beginInlineEdit"
      @input="syncInlineText"
      @blur="finishInlineEdit"
      @keydown.esc.prevent="cancelInlineEdit"
    >{{ node.props.text }}</a>

    <img
      v-else-if="node.type === 'image'"
      ref="leafElement"
      class="builder-element builder-image"
      :src="node.props.src"
      :alt="node.props.alt"
      :style="renderedContentStyles"
      @click.prevent
    />

    <div
      v-else-if="node.type === 'icon'"
      ref="leafElement"
      class="builder-icon-alignment"
      :style="{ textAlign: renderedStyles.textAlign || 'left' }"
    >
      <a
        v-if="node.props.href"
        class="builder-element builder-icon-element"
        :style="renderedContentStyles"
        :href="node.props.href"
        :target="node.props.newTab ? '_blank' : null"
        :rel="node.props.newTab ? 'noopener noreferrer' : null"
        :aria-label="node.props.decorative ? null : (node.props.ariaLabel || node.props.title || node.props.icon)"
        :title="node.props.title || null"
        @click.prevent
      >
        <component :is="resolvedIcon" :size="'100%'" :stroke-width="node.props.strokeWidth || 2" :aria-hidden="node.props.decorative ? 'true' : null" focusable="false" />
      </a>
      <span
        v-else
        class="builder-element builder-icon-element"
        :style="renderedContentStyles"
        :role="node.props.decorative ? null : 'img'"
        :aria-label="node.props.decorative ? null : (node.props.ariaLabel || node.props.title || node.props.icon)"
        :title="node.props.title || null"
        @click.prevent
      >
        <component :is="resolvedIcon" :size="'100%'" :stroke-width="node.props.strokeWidth || 2" :aria-hidden="node.props.decorative ? 'true' : null" focusable="false" />
      </span>
    </div>

    <div v-if="isSelected" class="node-toolbar node-toolbar--leaf" data-editor-chrome="true" :style="leafToolbarStyle" @click.stop>
      <button v-if="hasParentNode" type="button" class="toolbar-icon-button" aria-label="Select parent" title="Select parent" @click="selectParentNode"><ChevronUp :size="15" /></button>
      <span class="node-toolbar-label">{{ nodeLabel }}</span>
      <GripVertical :size="15" class="drag-grip" draggable="true" @dragstart="startNodeDrag" @dragend="endNodeDrag" />
      <button type="button" class="toolbar-icon-button" aria-label="Add after element" @click="openAdd($event, 'after')"><Plus :size="15" /></button>
      <button type="button" class="toolbar-icon-button" aria-label="Duplicate" @click="duplicateNode(node.id)"><Copy :size="15" /></button>
      <button type="button" class="toolbar-icon-button toolbar-icon-danger" aria-label="Delete" @click="removeNode"><Trash2 :size="15" /></button>
    </div>
  </div>

  <div v-else class="editor-node editor-node--leaf editor-node--unknown"
    :style="layoutItemStyles"
    :data-editor-node-id="node.id"
    :data-editor-node-type="node.type"
    :class="{ 'editor-node--selected': isSelected, 'editor-node--hovered': isHovered }"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop">
    <div class="builder-element" :style="renderedContentStyles">{{ nodeLabel }}</div>
  </div>

  <AddMenu
    :open="showAdd"
    :anchor="addTrigger"
    title="Add to page"
    @select="handleAdd"
    @close="showAdd = false"
  />
</template>

<style scoped>
.editor-node {
  position: relative;
  min-width: 0;
  box-sizing: border-box;
}

.editor-node--container {
  position: relative;
  width: 100%;
  min-height: 80px;
  z-index: 1;
  overflow: visible;
}

.editor-node--container.editor-node--nested-container {
  min-height: 56px;
}

.editor-node--container.editor-node--selection-ancestor {
  z-index: 8;
}

.editor-node--container.editor-node--selected {
  z-index: 40;
}

.editor-node--container > .editor-container {
  position: relative;
  width: 100%;
  min-width: 0;
  min-height: inherit;
  box-sizing: border-box;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, .42);
}

.editor-node--container.editor-node--hovered:not(.editor-node--selected) > .editor-container {
  border-color: rgba(71, 145, 255, .72);
  border-style: dashed;
}

.editor-node--container.editor-node--selected > .editor-container {
  border-color: #d86ce9;
  border-style: solid;
  box-shadow: 0 0 0 1px rgba(216, 108, 233, .16);
  background: rgba(255, 250, 255, .48);
}

.editor-node--container.editor-node--selection-ancestor > .editor-container {
  border-color: rgba(205, 145, 214, .42);
  border-style: solid;
  box-shadow: none;
  background: rgba(255, 255, 255, .2);
}

.editor-node--container.editor-node--selection-ancestor.editor-node--hovered:not(.editor-node--selected) > .editor-container {
  border-color: rgba(71, 145, 255, .72);
  border-style: dashed;
}

.editor-node--container.editor-node--direct-child-container > .editor-container {
  border-color: rgba(160, 166, 176, .72);
  border-style: dashed;
  border-width: 1px;
  background: rgba(249, 250, 251, .38);
}

.editor-node--container.editor-node--direct-child-container.editor-node--hovered:not(.editor-node--selected) > .editor-container {
  border-color: rgba(71, 145, 255, .9);
  border-style: dashed;
  background: rgba(240, 248, 255, .5);
}

.editor-node--container.editor-node--direct-child-container.editor-node--selected > .editor-container {
  border-color: #d86ce9;
  border-style: solid;
  background: rgba(255, 250, 255, .48);
}

.editor-node--drop-target > .editor-container {
  border-color: #55a2ff;
  border-style: dashed;
  background: rgba(236, 247, 255, .7);
}

.editor-node--drop-before,
.editor-node--drop-after {
  z-index: 25;
}

.editor-node--drop-before::before,
.editor-node--drop-after::after {
  content: "";
  position: absolute;
  left: 4px;
  right: 4px;
  height: 3px;
  border-radius: 999px;
  background: #4b9cfb;
  box-shadow: 0 0 0 2px rgba(75, 156, 251, .12);
  pointer-events: none;
  z-index: 80;
}

.editor-node--drop-before::before {
  top: -2px;
}

.editor-node--drop-after::after {
  bottom: -2px;
}

.editor-node--drop-inside > .editor-container,
.editor-node--drop-inside > .editor-legacy-layout,
.editor-node--drop-inside > .component-node {
  outline: 2px solid rgba(75, 156, 251, .72);
  outline-offset: -2px;
  background: rgba(236, 247, 255, .38);
}

.container-empty-state {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  color: #7d8792;
  font-size: 11px;
  font-style: italic;
  text-align: center;
}

.container-quick-add {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  padding: 0;
  border: 1px dashed #aeb7c2;
  border-radius: 50%;
  background: #fff;
  color: #7e91a8;
  cursor: pointer;
  transition: border-color .16s ease, color .16s ease, transform .16s ease, box-shadow .16s ease;
}

.container-quick-add:hover,
.container-quick-add:focus-visible {
  outline: 0;
  border-color: #b9159d;
  color: #a30084;
  transform: scale(1.04);
  box-shadow: 0 4px 14px rgba(185, 21, 157, .12);
}

.container-handle {
  position: absolute;
  top: -1px;
  left: 50%;
  z-index: 150;
  display: flex;
  align-items: center;
  gap: 2px;
  min-height: 28px;
  padding: 2px 5px;
  transform: translate(-50%, -100%);
  border-radius: 7px 7px 0 0;
  background: #e7a7f1;
  box-shadow: 0 3px 10px rgba(103, 43, 111, .12);
}

.container-handle::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -5px;
  width: 10px;
  height: 10px;
  transform: translateX(-50%) rotate(45deg);
  background: #e7a7f1;
  z-index: -1;
}

.container-handle__button {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: #332039;
  cursor: pointer;
}

.container-handle__button:hover,
.container-handle__button:focus-visible {
  outline: 0;
  background: rgba(255,255,255,.55);
}

.container-handle__drag {
  cursor: grab;
}

.container-handle__drag:active {
  cursor: grabbing;
}

.container-handle__delete:hover {
  background: #b9159d;
  color: #fff;
}

.context-drop-zone {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 76px;
  margin: 10px 12px 4px;
  border: 1px dashed #c7cdd5;
  background: rgba(255,255,255,.78);
  pointer-events: auto;
}

.context-drop-line {
  position: absolute;
  top: 50%;
  left: 16px;
  right: 16px;
  height: 1px;
  background: #d9dde3;
}

.context-drop-actions {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  background: #fff;
}

.context-drop-actions button {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid #e0e4e9;
  border-radius: 50%;
  background: #f3f4f6;
  color: #20252b;
  cursor: pointer;
  transition: transform .16s ease, border-color .16s ease, color .16s ease;
}

.context-drop-actions button:hover,
.context-drop-actions button:focus-visible {
  outline: 0;
  transform: translateY(-1px);
  border-color: #d68ce6;
  color: #9b0080;
}

.context-drop-label {
  position: relative;
  z-index: 1;
  padding: 0 6px;
  background: #fff;
  color: #9aa3ad;
  font-size: 9px;
  font-style: italic;
}

.editor-node--leaf {
  min-width: 0;
  min-height: 1px;
}

.editor-node--leaf.editor-node--hovered > .builder-element {
  outline: 1px dashed #4791ff !important;
  outline-offset: 2px;
  cursor: pointer;
}

.editor-node--leaf.editor-node--selected > .builder-element {
  outline: 1px solid #c028b3 !important;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px rgba(232, 175, 244, .24);
}

.builder-element {
  box-sizing: border-box;
  min-width: 0;
}

.builder-image {
  max-width: 100%;
}

.builder-icon-alignment {
  line-height: 0;
}

.builder-icon-element {
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  color: inherit;
  text-decoration: none;
}

.builder-icon-element svg {
  display: block;
  max-width: 100%;
  max-height: 100%;
}

.component-node {
  position: relative;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.component-node-label {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 5;
  padding: 3px 6px;
  border-radius: 4px;
  background: rgba(15, 23, 42, .78);
  color: #fff;
  font-size: 8px;
  pointer-events: none;
}

.component-missing {
  min-height: 100px;
  display: grid;
  place-items: center;
  color: #94a3b8;
  background: #f8fafc;
}

.node-toolbar {
  position: absolute;
  top: -30px;
  left: 50%;
  z-index: 150;
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 3px 7px;
  transform: translateX(-50%);
  background: #e8aff4;
  color: #2a1830;
}

.node-toolbar--leaf {
  position: fixed;
  z-index: 1000;
  transform: none;
}

.node-toolbar-label {
  max-width: 82px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 10px;
  font-weight: 700;
}

.drag-grip {
  cursor: grab;
}

.toolbar-icon-button {
  display: grid;
  place-items: center;
  width: 23px;
  height: 23px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #2a1830;
  cursor: pointer;
}

.toolbar-icon-button:hover,
.toolbar-icon-button:focus-visible {
  outline: 0;
  background: rgba(255, 255, 255, .5);
}

.toolbar-icon-danger:hover {
  background: #b9159d;
  color: #fff;
}

.editor-legacy-layout {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.editor-node--component.editor-node--hovered > .component-node {
  outline: 1px dashed #4791ff;
  outline-offset: 2px;
}

.editor-node--component.editor-node--selected > .component-node {
  outline: 1px solid #c028b3;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px rgba(232, 175, 244, .24);
}

.editor-node--legacy.editor-node--hovered > .editor-legacy-layout {
  outline: 1px dashed #4791ff;
  outline-offset: 2px;
}

.editor-node--legacy.editor-node--selected > .editor-legacy-layout {
  outline: 1px solid #c028b3;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .editor-container,
  .container-quick-add,
  .container-handle,
  .context-drop-actions button {
    transition: none;
  }
}
</style>


<style scoped>
/* Nested empty containers deliberately use a compact interaction target so
   several levels can be inspected without consuming the whole canvas. */
.editor-node--container.editor-node--nested-container > .editor-container > .container-empty-state {
  min-height: 54px;
  gap: 4px;
  font-size: 9px;
  line-height: 1.25;
}

.editor-node--container.editor-node--nested-container > .editor-container > .container-empty-state .container-quick-add {
  width: 28px;
  height: 28px;
}

.editor-node--container.editor-node--nested-container > .editor-container > .container-empty-state .container-quick-add svg {
  width: 16px;
  height: 16px;
}

.editor-node--container.editor-node--nested-container > .container-handle {
  z-index: 1000;
}

.editor-node--container.editor-node--selection-ancestor > .container-handle {
  display: none;
}

.editor-node--container.editor-node--selected > .container-handle {
  z-index: 1200;
}

.editor-node--container > .insertion-point {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 30;
  min-height: 0;
  transform: translateY(50%);
}
</style>
