<script setup>
import { computed } from "vue";
import { useComponentEditor } from "@/composables/useComponentEditor";

const { selectedElement, getStyles, setStyle } = useComponentEditor();
const element = computed(() => selectedElement.value);
const styles = computed(() => element.value ? getStyles(element.value.componentId, element.value.selector) : {});
const styleKeys = [
  "fontSize", "fontWeight", "lineHeight", "color", "backgroundColor", "width", "maxWidth",
  "height", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
  "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "borderRadius", "textAlign",
  "display", "gap", "opacity",
];

function value(key) {
  return styles.value[key] ?? element.value?.element?.style?.[key] ?? "";
}
function update(key, value) {
  if (!element.value) return;
  setStyle(element.value.componentId, element.value.selector, key, value);
}
function label(key) { return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()); }
function isColor(key) { return ["color", "backgroundColor"].includes(key); }
</script>

<template>
  <aside class="settings-panel">
    <template v-if="element">
      <header class="settings-header">
        <small>Element</small>
        <h3>{{ element.label }}</h3>
        <code>.{{ element.selector }}</code>
      </header>

      <section class="settings-section">
        <h4>Style</h4>
        <label v-for="key in styleKeys" :key="key">
          {{ label(key) }}
          <div v-if="isColor(key)" class="color-control">
            <input type="color" :value="value(key) || '#000000'" @input="update(key, $event.target.value)" />
            <input type="text" :value="value(key)" @input="update(key, $event.target.value)" />
          </div>
          <input v-else type="text" :value="value(key)" :placeholder="key === 'fontSize' ? 'e.g. 48px' : 'Auto'" @input="update(key, $event.target.value)" />
        </label>
      </section>
    </template>
    <div v-else class="empty">Click an element in the component to edit it.</div>
  </aside>
</template>

<style scoped>
.settings-panel{width:300px;flex:0 0 300px;background:#fff;border-left:1px solid #e5e7eb;overflow-y:auto}.settings-header{padding:16px;border-bottom:1px solid #e5e7eb}.settings-header small{color:#9ca3af}.settings-header h3{margin:4px 0 6px}.settings-header code{font-size:10px;color:#6b7280}.settings-section{padding:16px;border-bottom:1px solid #e5e7eb}.settings-section h4{margin:0 0 14px}.settings-section label{display:block;margin-bottom:12px;font-size:11px;font-weight:600;color:#374151}.settings-section input{width:100%;box-sizing:border-box;margin-top:5px;padding:7px 8px;border:1px solid #d1d5db;border-radius:6px;font:inherit;font-weight:400}.color-control{display:flex;gap:6px}.color-control input[type=color]{width:38px;padding:2px}.empty{padding:20px;color:#6b7280;font-size:12px}
</style>
