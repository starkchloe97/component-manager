<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useComponentEditor } from "@/composables/useComponentEditor";

const props = defineProps({ component: { type: Object, required: true } });
const canvas = ref(null);
const { selectedElement, selectElement, clearElement, applyOverrides } = useComponentEditor();
const componentName = computed(() => props.component?.name || props.component?.id || "Component");

const elementMap = {
  "section-title": "Heading", "section-label": "Label", "body-text": "Text",
  "feature-title": "Feature title", "feature-desc": "Feature description", "feature-card": "Feature card",
  "image-box": "Image", "image-wrap": "Image", "button": "Button", "overview": "Section",
  "container": "Container", "grid": "Layout",
};
const tagMap = { h1: "Heading", h2: "Heading", h3: "Heading", h4: "Heading", h5: "Heading", p: "Text", img: "Image", a: "Link", button: "Button", section: "Section" };

function describeElement(element) {
  if (!element) return null;
  const classes = typeof element.className === "string" ? element.className.split(/\s+/).filter(Boolean) : [];
  const className = classes.find((name) => elementMap[name]);
  const tag = element.tagName?.toLowerCase();
  if (!className && !tagMap[tag]) return null;
  return { label: className ? elementMap[className] : tagMap[tag], selector: className || tag, tag, element, componentId: props.component.id };
}

function handleClick(event) {
  const target = event.target instanceof Element ? event.target.closest("section, div, h1, h2, h3, h4, h5, p, span, a, button, img") : null;
  if (!target || !canvas.value?.contains(target)) return;
  const descriptor = describeElement(target);
  if (!descriptor) return;
  event.preventDefault(); event.stopPropagation(); selectElement(descriptor);
}
function handleDocumentClick(event) { if (!canvas.value?.contains(event.target)) clearElement(); }
function refreshOverrides() { nextTick(() => applyOverrides(canvas.value, props.component.id)); }

onMounted(() => { document.addEventListener("click", handleDocumentClick, true); refreshOverrides(); });
onUnmounted(() => document.removeEventListener("click", handleDocumentClick, true));
watch(() => props.component.id, refreshOverrides);
</script>

<template>
  <main ref="canvas" class="component-canvas" @click="handleClick">
    <div class="canvas-header"><span>{{ componentName }}</span><span v-if="selectedElement" class="selection-info">{{ selectedElement.label }}</span></div>
    <div class="component-stage" data-editor-component :data-editor-component-id="component.id">
      <component :is="component.component" />
    </div>
  </main>
</template>

<style scoped>
.component-canvas{position:relative;min-width:0;min-height:100vh;overflow:auto;background:#eef1f5}.canvas-header{position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;height:38px;padding:0 14px;box-sizing:border-box;background:rgba(255,255,255,.96);border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:600;color:#374151}.selection-info{color:#2563eb}.component-stage{width:min(1400px,calc(100% - 48px));margin:24px auto 60px;background:#fff;box-shadow:0 8px 30px rgba(15,23,42,.08)}
</style>
