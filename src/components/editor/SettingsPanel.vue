<script setup>
import { computed } from "vue";
import { useComponentEditor } from "@/composables/useComponentEditor";

const { selectedElement, getStyles, setStyle } = useComponentEditor();
const element = computed(() => selectedElement.value);

const groups = [
  { title: "Layout", keys: ["width", "maxWidth", "height", "display", "gap"] },
  { title: "Spacing", keys: ["padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft"] },
  { title: "Typography", keys: ["fontSize", "fontWeight", "lineHeight", "textAlign", "color"] },
  { title: "Appearance", keys: ["backgroundColor", "borderRadius", "opacity"] },
];

const colorKeys = new Set(["color", "backgroundColor"]);
const unitKeys = new Set(["width", "maxWidth", "height", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "borderRadius", "gap", "fontSize"]);

function current(key) {
  if (!element.value) return "";
  const styles = getStyles(element.value.componentId, element.value.selector);
  return styles[key] ?? "";
}

function update(key, value) {
  if (!element.value) return;
  let next = value;
  if (unitKeys.has(key) && next !== "" && next !== "auto" && next !== "initial" && next !== "inherit" && !/[a-z%]+$/i.test(next)) next = `${next}px`;
  setStyle(element.value.componentId, element.value.selector, key, next);
}

function label(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}
</script>

<template>
  <aside class="settings-panel">
    <template v-if="element">
      <header class="settings-header">
        <small>Selected element</small>
        <h3>{{ element.label }}</h3>
        <code>.{{ element.selector }}</code>
      </header>

      <section v-for="group in groups" :key="group.title" class="settings-section">
        <h4>{{ group.title }}</h4>
        <div v-for="key in group.keys" :key="key" class="control">
          <label>{{ label(key) }}</label>

          <div v-if="colorKeys.has(key)" class="color-control">
            <input type="color" :value="/^#[0-9a-f]{6}$/i.test(current(key)) ? current(key) : '#000000'" @input="update(key, $event.target.value)" />
            <input type="text" :value="current(key)" @input="update(key, $event.target.value)" />
          </div>

          <select v-else-if="key === 'display'" :value="current(key)" @change="update(key, $event.target.value)">
            <option value="">Default</option>
            <option value="block">Block</option>
            <option value="flex">Flex</option>
            <option value="grid">Grid</option>
            <option value="inline-block">Inline block</option>
            <option value="none">None</option>
          </select>

          <select v-else-if="key === 'textAlign'" :value="current(key)" @change="update(key, $event.target.value)">
            <option value="">Default</option>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>

          <input
            v-else
            type="text"
            :value="current(key)"
            :placeholder="unitKeys.has(key) ? '0px / auto' : 'Default'"
            @input="update(key, $event.target.value)"
          />
        </div>
      </section>
    </template>
    <div v-else class="empty">Select an element in the component to edit it.</div>
  </aside>
</template>

<style scoped>
.settings-panel{width:300px;flex:0 0 300px;background:#fff;border-left:1px solid #e5e7eb;overflow-y:auto}.settings-header{padding:16px;border-bottom:1px solid #e5e7eb}.settings-header small{color:#9ca3af;font-size:10px}.settings-header h3{margin:4px 0 6px;font-size:14px}.settings-header code{font-size:10px;color:#6b7280}.settings-section{padding:14px 16px;border-bottom:1px solid #e5e7eb}.settings-section h4{margin:0 0 12px;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#475569}.control{margin-bottom:10px}.control label{display:block;margin-bottom:4px;font-size:10px;font-weight:600;color:#475569}.settings-panel input,.settings-panel select{width:100%;box-sizing:border-box;padding:7px 8px;border:1px solid #d1d5db;border-radius:6px;background:#fff;font:inherit;font-size:11px;color:#1f2937}.color-control{display:grid;grid-template-columns:38px 1fr;gap:6px}.color-control input[type=color]{padding:2px;height:31px}.empty{padding:20px;color:#6b7280;font-size:12px;line-height:1.5}
</style>
