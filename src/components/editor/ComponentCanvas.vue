<script setup>
import { computed, nextTick, onMounted, onUnmounted, onUpdated, ref, watch } from "vue";
import EditorNode from "./EditorNode.vue";
import SectionLayoutPicker from "./SectionLayoutPicker.vue";
import { useComponentEditor } from "@/composables/useComponentEditor";
import { useEditor } from "@/composables/useEditor";

const props = defineProps({
  component: { type: Object, required: true },
  drawerOpen: { type: Boolean, default: false },
  preview: { type: Boolean, default: false },
});
const emit = defineEmits(["element-selected"]);
const canvas = ref(null);
const stage = ref(null);
const hoveredElement = ref(null);
const selectedDomElement = ref(null);
const editingElement = ref(null);
const { selectedElement, selectElement, clearElement, applyOverrides, getContent, setContent } = useComponentEditor();
const { selectNode, document, addSection, addContainer } = useEditor();
const showEmptySectionPicker = ref(false);
const showEmptyContainerPicker = ref(false);
const componentName = computed(() => props.component?.name || props.component?.id || "Component");
const selectableTags = "section, div, h1, h2, h3, h4, h5, h6, p, span, strong, em, small, blockquote, figcaption, a, button, img, ul, ol, li, form, input, textarea, label";

const elementMap = {
  "section-title": "Heading", "section-label": "Label", "body-text": "Text", "feature-title": "Feature title",
  "feature-desc": "Feature description", "feature-card": "Feature card", "image-box": "Image", "image-wrap": "Image",
  button: "Button", overview: "Section", container: "Container", grid: "Layout",
};

const tagMap = {
  h1: "Heading", h2: "Heading", h3: "Heading", h4: "Heading", h5: "Heading", h6: "Heading", p: "Text",
  img: "Image", a: "Link", button: "Button", section: "Section", div: "Container", span: "Text",
  strong: "Text", em: "Text", small: "Text", blockquote: "Quote", figcaption: "Caption", ul: "List",
  ol: "List", li: "List item", form: "Form", input: "Input", textarea: "Text area", label: "Label",
};

function elementPath(element) {
  const parts = [];
  let current = element;
  while (current && current !== stage.value) {
    const parent = current.parentElement;
    if (!parent) break;
    parts.unshift(Array.from(parent.children).indexOf(current));
    current = parent;
  }
  return parts.join("-");
}

function describeElement(element) {
  if (!element || element === stage.value || element === canvas.value) return null;

  const classes = typeof element.className === "string"
    ? element.className.split(/\s+/).filter(Boolean)
    : [];
  const className = classes.find((name) => elementMap[name]);
  const tag = element.tagName?.toLowerCase();

  if (!tagMap[tag] && !className) return null;

  const key = element.getAttribute("data-editor-element") || elementPath(element);
  element.setAttribute("data-editor-element", key);

  // Style overrides keep the existing class/tag selector behavior.
  // Content overrides always use this element's unique editor key.
  const selector = className
    ? `.${className}`
    : `[data-editor-element="${CSS.escape(key)}"]`;
  const contentSelector = `[data-editor-element="${CSS.escape(key)}"]`;

  // Any leaf element with rendered text is editable. This removes the
  // brittle dependency on a hard-coded list of semantic CSS classes.
  const nonTextTags = new Set(["img", "input", "textarea", "select", "option", "br", "hr", "svg"]);
  const hasRenderedText = typeof element.textContent === "string" && element.textContent.trim().length > 0;
  const editableText = !nonTextTags.has(tag) && element.children.length === 0 && hasRenderedText;
  const textValue = editableText ? element.textContent || "" : "";

  // Export/copy needs a deterministic source occurrence. Runtime editing
  // remains scoped by contentSelector, so duplicate text/classes never collide.
  const sameTextRoleElements = editableText
    ? Array.from(stage.value?.querySelectorAll(tag) || []).filter((candidate) => {
        if (candidate.children.length > 0) return false;
        const candidateTag = candidate.tagName?.toLowerCase();
        if (nonTextTags.has(candidateTag)) return false;
        if (className && !candidate.classList.contains(className)) return false;
        return typeof candidate.textContent === "string" && candidate.textContent.trim().length > 0;
      })
    : [];
  const textOccurrence = sameTextRoleElements.indexOf(element);

  return {
    label: className ? elementMap[className] : editableText ? "Text" : tagMap[tag],
    selector,
    contentSelector,
    tag,
    className: className || "",
    element,
    componentId: props.component.id,
    editableText,
    textValue,
    textOccurrence: Math.max(0, textOccurrence),
  };
}

function setHoverElement(element) {
  if (hoveredElement.value?.element && hoveredElement.value.element !== element) {
    hoveredElement.value.element.removeAttribute("data-editor-hovered");
  }
  const descriptor = describeElement(element);
  if (!descriptor) {
    hoveredElement.value = null;
    return;
  }
  descriptor.element.setAttribute("data-editor-hovered", "true");
  hoveredElement.value = descriptor;
}

function setSelectedElement(element) {
  if (selectedDomElement.value && selectedDomElement.value !== element) {
    selectedDomElement.value.removeAttribute("data-editor-selected");
  }
  selectedDomElement.value = element;
  element?.setAttribute("data-editor-selected", "true");
}

function clearVisualState() {
  hoveredElement.value?.element?.removeAttribute("data-editor-hovered");
  selectedDomElement.value?.removeAttribute("data-editor-selected");
  if (editingElement.value) finishInlineEdit();
  hoveredElement.value = null;
  selectedDomElement.value = null;
}

function handleMouseOver(event) {
  if (props.preview || !(event.target instanceof Element)) return;
  const target = event.target.closest(selectableTags);
  if (!target || !stage.value?.contains(target)) return;
  setHoverElement(target);
}

function handleMouseOut(event) {
  if (props.preview) return;
  const next = event.relatedTarget;
  if (next instanceof Element && stage.value?.contains(next)) {
    const target = next.closest(selectableTags);
    if (target && target !== hoveredElement.value?.element) setHoverElement(target);
    return;
  }
  hoveredElement.value?.element?.removeAttribute("data-editor-hovered");
  hoveredElement.value = null;
}

function handleClick(event) {
  if (props.preview || !(event.target instanceof Element)) return;
  const target = event.target.closest(selectableTags);
  if (!target || !stage.value?.contains(target)) return;
  const descriptor = describeElement(target);
  if (!descriptor) return;
  event.preventDefault();
  event.stopPropagation();
  selectNode(null);
  setSelectedElement(target);
  selectElement(descriptor);
  setHoverElement(target);
  emit("element-selected", descriptor);
}

function addFirstSection(layout) {
  addSection(layout);
  showEmptySectionPicker.value = false;
}
function addFirstContainer(layout) {
  addContainer(layout);
  showEmptyContainerPicker.value = false;
}

function startInlineEdit(event) {
  if (props.preview || !(event.target instanceof Element)) return;
  const target = event.target.closest(selectableTags);
  if (!target || !stage.value?.contains(target)) return;
  const descriptor = describeElement(target);
  if (!descriptor?.editableText) return;

  event.preventDefault();
  event.stopPropagation();
  selectNode(null);
  setSelectedElement(target);
  selectElement(descriptor);
  setHoverElement(target);
  editingElement.value = target;
  target.setAttribute("contenteditable", "true");
  target.setAttribute("spellcheck", "true");
  target.focus();
  const range = globalThis.document.createRange();
  range.selectNodeContents(target);
  range.collapse(false);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

function handleInlineInput(event) {
  const target = event.target;
  if (!(target instanceof Element) || target !== editingElement.value) return;
  const descriptor = describeElement(target);
  if (!descriptor?.editableText) return;
  selectElement(descriptor);
  const value = target.textContent || "";
  const existing = getContentValue(descriptor);
  setInlineContent(descriptor, value, existing);
}

function getContentValue(descriptor) {
  return descriptor?.componentId && descriptor?.contentSelector
    ? getContent(descriptor.componentId, descriptor.contentSelector)
    : null;
}

function setInlineContent(descriptor, value, existing) {
  if (!descriptor) return;
  const metadata = {
    originalText: existing ?? descriptor.textValue,
    occurrence: descriptor.textOccurrence,
    tag: descriptor.tag,
    className: descriptor.className,
  };
  setContent(descriptor.componentId, descriptor.contentSelector, value, metadata);
}

function finishInlineEdit() {
  const target = editingElement.value;
  if (!target) return;
  const descriptor = describeElement(target);
  if (descriptor?.editableText) {
    setInlineContent(descriptor, target.textContent || "", getContentValue(descriptor));
    selectElement(descriptor);
  }
  target.removeAttribute("contenteditable");
  target.removeAttribute("spellcheck");
  editingElement.value = null;
}

function handleStageClick(event) {
  if (event.target === stage.value && !props.preview) {
    clearVisualState();
    clearElement();
    selectNode(null);
  }
}



function prepareEditorElements() {
  const hitLayer = stage.value?.querySelector(".component-hit-layer");
  if (!hitLayer) return;
  hitLayer.querySelectorAll(selectableTags).forEach((element) => describeElement(element));
}

function refreshOverrides() {
  nextTick(() => {
    prepareEditorElements();
    applyOverrides(stage.value, props.component.id);
  });
}

onMounted(refreshOverrides);
onUpdated(refreshOverrides);
watch(() => props.component.id, () => {
  clearVisualState();
  refreshOverrides();
});
watch(() => props.preview, (isPreview) => {
  if (isPreview) clearVisualState();
});
onUnmounted(() => {
  clearVisualState();
  clearElement();
});
</script>

<template>
  <main ref="canvas" class="component-canvas" :class="{ 'canvas--drawer-open': drawerOpen, 'canvas--preview': preview }">
    <div class="canvas-header">
      <span>{{ componentName }}</span>
      <span v-if="selectedElement && !preview" class="selection-info">{{ selectedElement.label }}</span>
    </div>

    <div ref="stage" class="component-stage" :data-editor-component-id="component.id" @click="handleStageClick">
      <div
        class="component-hit-layer"
        :class="{ 'hit-layer--preview': preview }"
        @mouseover="handleMouseOver"
        @mouseout="handleMouseOut"
        @click="handleClick"
        @dblclick="startInlineEdit"
        @input="handleInlineInput"
        @blur="finishInlineEdit"
        @keydown.esc.prevent="finishInlineEdit"
      >
        <component :is="component.component" />
      </div>

      <div v-if="!preview" class="component-builder-extension" @click.stop>
        <div class="page-section-list">
          <div v-for="node in document.children" :key="node.id" class="page-section-node">
            <EditorNode :node="node" :root-section="true" />
          </div>
          <div v-if="!document.children.length" class="empty-page-state" @click.stop>
            <span class="empty-page-title">Build your page</span>
            <span>Add a section to continue designing.</span>
            <div class="empty-page-actions">
              <button
                type="button"
                class="section-insert-button empty-section-button"
                aria-label="Add first section"
                @click="showEmptySectionPicker = true"
              >+ Section</button>
              <button
                type="button"
                class="section-insert-button empty-container-button"
                aria-label="Add first container"
                @click="showEmptyContainerPicker = true"
              >+ Container</button>
            </div>
            <SectionLayoutPicker
              v-if="showEmptySectionPicker"
              @select="addFirstSection"
              @close="showEmptySectionPicker = false"
            />
            <SectionLayoutPicker
              v-if="showEmptyContainerPicker"
              title="Add container"
              description="Choose a layout, or start with an empty container."
              :allow-empty-container="true"
              @select="addFirstContainer"
              @close="showEmptyContainerPicker = false"
            />
          </div>
        </div>

        <EditorNode
          v-for="node in document.componentChildren"
          :key="node.id"
          :node="node"
        />


        <!-- Root-level section insertion is intentionally handled by the
             + control between sections in EditorNode. There is no second
             "Add element" control at the bottom of the canvas. -->
      </div>
    </div>
  </main>
</template>

<style scoped>
.component-canvas {
  position: relative;
  min-width: 0;
  min-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: #fff;
}

.canvas-header {
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  padding: 0 24px;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  font-size: 12px;
  font-weight: 700;
  color: #30343a;
}

.selection-info { color: #93003f; }

.component-stage {
  position: relative;
  width: min(100%, 1600px);
  margin: 0 auto 48px;
  background: #fff;
  box-shadow: none;
}

.component-hit-layer { position: relative; width: 100%; }
.component-hit-layer.hit-layer--preview { pointer-events: none; }

/* Highlight the actual element only. No full-canvas overlay is used, so the drawer can never be covered by a selection frame. */
.component-hit-layer :deep([data-editor-hovered="true"]) {
  outline: 1px dashed rgba(192,40,179,.7) !important;
  outline-offset: 2px;
  cursor: pointer;
}

.component-hit-layer :deep([data-editor-selected="true"]) {
  outline: 1px solid #c028b3 !important;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px rgba(232,175,244,.35);
  cursor: pointer;
}

.component-hit-layer :deep(a[data-editor-hovered="true"]),
.component-hit-layer :deep(button[data-editor-hovered="true"]) { cursor: pointer; }

.component-hit-layer :deep(*:focus-visible) {
  outline: 2px solid #93003f;
  outline-offset: 2px;
}

@media (max-width: 760px) {
  .component-stage { width: calc(100% - 24px); margin-top: 12px; }
}
</style>

<style scoped>
.component-builder-extension{position:relative;background:#fff}
.page-section-list{width:100%}
.page-section-node{position:relative;width:100%;margin:0}
.empty-page-state{position:relative;min-height:188px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;border:1px dashed #cbd0d7;background:#fff;color:#6b7280;font-size:12px}
.empty-page-title{font-size:14px;font-weight:700;color:#30343a}
.empty-page-actions{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:8px}
.empty-section-button,.empty-container-button{opacity:1;pointer-events:auto;position:relative;bottom:auto;left:auto;right:auto;display:inline-flex;align-items:center;justify-content:center;height:34px;padding:0 13px;border:1px solid #df97ef;border-radius:50px;background:#fff;color:#8f0070;font-size:11px;font-weight:700;line-height:1;cursor:pointer;box-shadow:none}
.empty-container-button{border-color:#d8dbe0;color:#4d5560}
</style>
