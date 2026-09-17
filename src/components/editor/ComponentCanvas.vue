<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useComponentEditor } from "@/composables/useComponentEditor";

const props = defineProps({ component: { type: Object, required: true } });
const emit = defineEmits(["element-selected"]);
const canvas = ref(null);
const stage = ref(null);
const hoveredElement = ref(null);
const { selectedElement, selectElement, clearElement, applyOverrides } = useComponentEditor();
const componentName = computed(() => props.component?.name || props.component?.id || "Component");
const selectableTags = "section, div, h1, h2, h3, h4, h5, h6, p, span, a, button, img, ul, ol, li, form, input, textarea, label";

const elementMap = {
  "section-title": "Heading", "section-label": "Label", "body-text": "Text", "feature-title": "Feature title",
  "feature-desc": "Feature description", "feature-card": "Feature card", "image-box": "Image", "image-wrap": "Image",
  button: "Button", overview: "Section", container: "Container", grid: "Layout",
};

const tagMap = {
  h1: "Heading", h2: "Heading", h3: "Heading", h4: "Heading", h5: "Heading", h6: "Heading", p: "Text",
  img: "Image", a: "Link", button: "Button", section: "Section", div: "Container", span: "Text", ul: "List",
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
  if (!element) return null;
  const classes = typeof element.className === "string" ? element.className.split(/\s+/).filter(Boolean) : [];
  const className = classes.find((name) => elementMap[name]);
  const tag = element.tagName?.toLowerCase();
  if (!tagMap[tag] && !className) return null;

  let selector;
  if (className) selector = `.${className}`;
  else {
    const key = element.getAttribute("data-editor-element") || elementPath(element);
    element.setAttribute("data-editor-element", key);
    selector = `[data-editor-element="${CSS.escape(key)}"]`;
  }
  return { label: className ? elementMap[className] : tagMap[tag], selector, tag, element, componentId: props.component.id };
}

function handleMouseOver(event) {
  if (!(event.target instanceof Element)) return;
  const target = event.target.closest(selectableTags);
  if (!target || !stage.value?.contains(target)) return;
  const descriptor = describeElement(target);
  if (descriptor) hoveredElement.value = descriptor;
}

function handleMouseOut(event) {
  const related = event.relatedTarget;
  if (!(related instanceof Element) || !stage.value?.contains(related)) hoveredElement.value = null;
}

function handleClick(event) {
  if (!(event.target instanceof Element)) return;
  const target = event.target.closest(selectableTags);
  if (!target || !stage.value?.contains(target)) return;
  const descriptor = describeElement(target);
  if (!descriptor) return;
  event.preventDefault();
  event.stopPropagation();
  selectElement(descriptor);
  hoveredElement.value = descriptor;
  emit("element-selected", descriptor);
}

function handleStageClick(event) {
  if (event.target === stage.value) {
    clearElement();
    hoveredElement.value = null;
  }
}

function refreshOverrides() { nextTick(() => applyOverrides(stage.value, props.component.id)); }
onMounted(refreshOverrides);
watch(() => props.component.id, () => { hoveredElement.value = null; refreshOverrides(); });
onUnmounted(() => { clearElement(); hoveredElement.value = null; });
</script>

<template>
  <main ref="canvas" class="component-canvas">
    <div class="canvas-header">
      <span>{{ componentName }}</span>
      <span v-if="selectedElement" class="selection-info">{{ selectedElement.label }}</span>
    </div>
    <div ref="stage" class="component-stage" :data-editor-component-id="component.id" @click="handleStageClick">
      <div class="component-hit-layer" @mouseover="handleMouseOver" @mouseout="handleMouseOut" @click="handleClick">
        <div v-if="hoveredElement" class="editor-hover-frame" :class="{ selected: selectedElement?.element === hoveredElement.element }">
          <span class="hover-label">{{ hoveredElement.label }}</span>
        </div>
        <div v-if="selectedElement" class="editor-selected-frame" :class="{ visible: selectedElement.componentId === component.id }">
          <span class="selected-label">{{ selectedElement.label }}</span>
        </div>
        <component :is="component.component" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.component-canvas { position:relative; min-width:0; min-height:100%; overflow:auto; background:#eef1f5; }
.canvas-header { position:sticky; top:0; z-index:40; display:flex; align-items:center; justify-content:space-between; height:38px; padding:0 14px; box-sizing:border-box; background:rgba(255,255,255,.96); border-bottom:1px solid #e5e7eb; font-size:11px; font-weight:600; color:#374151; }
.selection-info { color:#2563eb; }
.component-stage { position:relative; width:min(1400px,calc(100% - 48px)); margin:24px auto 60px; background:#fff; box-shadow:0 8px 30px rgba(15,23,42,.08); }
.component-hit-layer { position:relative; }

/* The frames sit above the live component without changing its layout. */
.editor-hover-frame,
.editor-selected-frame { position:absolute; z-index:999; pointer-events:none; box-sizing:border-box; }
.editor-hover-frame { inset:0; border:1px dashed rgba(37,99,235,.72); background:rgba(37,99,235,.025); opacity:0; transition:opacity .12s ease; }
.component-hit-layer:hover .editor-hover-frame { opacity:1; }
.hover-label,
.selected-label { position:absolute; top:-22px; left:-1px; display:inline-flex; align-items:center; min-height:20px; padding:0 7px; border-radius:4px 4px 0 0; box-sizing:border-box; color:#fff; background:#2563eb; font-size:9px; font-weight:700; letter-spacing:.02em; white-space:nowrap; box-shadow:0 2px 5px rgba(15,23,42,.15); }
.editor-selected-frame { inset:0; border:1.5px solid #2563eb; opacity:0; transition:opacity .12s ease, box-shadow .12s ease; }
.editor-selected-frame.visible { opacity:1; box-shadow:0 0 0 1px rgba(37,99,235,.08); }
.editor-selected-frame .selected-label { top:-22px; }

/* Individual element highlight: use the browser outline so it never shifts the CTA/layout. */
.component-hit-layer :deep(*) { transition: outline-color .12s ease, box-shadow .12s ease; }
.component-hit-layer :deep(*) { cursor:pointer; }
.component-hit-layer :deep(*:hover) { outline:1px dashed rgba(37,99,235,.62); outline-offset:2px; }
.component-hit-layer :deep(*:focus-visible) { outline:2px solid #2563eb; outline-offset:2px; }

@media (max-width:760px) { .component-stage { width:calc(100% - 24px); margin-top:12px; } }
</style>
