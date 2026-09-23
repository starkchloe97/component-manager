<script setup>
import { computed, ref, watch } from "vue";
import { Box, Paintbrush, SlidersHorizontal, Type } from "@lucide/vue";
import { useEditor } from "@/composables/useEditor";
import { useComponentEditor } from "@/composables/useComponentEditor";

const { selectedNode, updateNode } = useEditor();
const { selectedElement, getStyles, setStyle, getContent, getContentEntry, setContent, resetContent } = useComponentEditor();
const activeTab = ref("layout");
const unitKeys = new Set(["width", "maxWidth", "minWidth", "height", "minHeight", "gap", "columnGap", "rowGap", "flexBasis", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "fontSize", "letterSpacing", "borderWidth", "borderRadius"]);
const numericKeys = new Set(["zIndex", "flexGrow", "flexShrink"]);
const nodeTypes = new Set(["section", "column", "container", "component"]);
const entity = computed(() => selectedNode.value || selectedElement.value);
const isNode = computed(() => !!selectedNode.value);
const isLayout = computed(() => isNode.value && nodeTypes.has(selectedNode.value.type));
const entityName = computed(() => selectedNode.value?.type || selectedElement.value?.label || "Element");
const normalizedName = computed(() => entityName.value.replace(/\b\w/g, (letter) => letter.toUpperCase()));
const tabs = computed(() => isLayout.value
  ? [{ id: "layout", label: "Layout", icon: Box }, { id: "style", label: "Style", icon: Paintbrush }, { id: "advanced", label: "Advanced", icon: SlidersHorizontal }]
  : [{ id: "content", label: "Content", icon: Type }, { id: "style", label: "Style", icon: Paintbrush }, { id: "advanced", label: "Advanced", icon: SlidersHorizontal }]);
watch(tabs, (nextTabs) => { if (!nextTabs.some((tab) => tab.id === activeTab.value)) activeTab.value = nextTabs[0].id; }, { immediate: true });

const layoutFields = [
  { key: "display", label: "Display", options: ["", "block", "inline-block", "flex", "grid", "none"] },
  { key: "width", label: "Width", placeholder: "Auto" }, { key: "maxWidth", label: "Max Width", placeholder: "None" },
  { key: "minWidth", label: "Min Width", placeholder: "Auto" }, { key: "height", label: "Height", placeholder: "Auto" }, { key: "minHeight", label: "Min Height", placeholder: "Auto" },
  { key: "position", label: "Position", options: ["", "static", "relative", "absolute", "sticky", "fixed"] }, { key: "zIndex", label: "Z-index", placeholder: "Auto" },
];
const typographyFields = [
  { key: "fontFamily", label: "Family", placeholder: "Default" }, { key: "fontSize", label: "Size", placeholder: "16px" },
  { key: "fontWeight", label: "Weight", options: ["", "100", "200", "300", "400", "500", "600", "700", "800", "900"] }, { key: "lineHeight", label: "Line Height", placeholder: "Normal" }, { key: "letterSpacing", label: "Letter Spacing", placeholder: "0px" },
  { key: "textAlign", label: "Align", options: ["", "left", "center", "right", "justify"] }, { key: "textTransform", label: "Transform", options: ["", "none", "uppercase", "lowercase", "capitalize"] }, { key: "textDecoration", label: "Decoration", options: ["", "none", "underline", "overline", "line-through"] },
];
const appearanceFields = [
  { key: "backgroundColor", label: "Background", color: true }, { key: "color", label: "Text Color", color: true }, { key: "borderWidth", label: "Border Width", placeholder: "0px" }, { key: "borderStyle", label: "Border Style", options: ["", "none", "solid", "dashed", "dotted", "double"] }, { key: "borderColor", label: "Border Color", color: true }, { key: "borderRadius", label: "Radius", placeholder: "0px" }, { key: "opacity", label: "Opacity", placeholder: "1" }, { key: "overflow", label: "Overflow", options: ["", "visible", "hidden", "auto", "scroll"] }, { key: "boxShadow", label: "Shadow", placeholder: "None" },
];
const flexFields = [
  { key: "flexDirection", label: "Direction", options: ["row", "row-reverse", "column", "column-reverse"] }, { key: "flexWrap", label: "Wrap", options: ["nowrap", "wrap", "wrap-reverse"] }, { key: "justifyContent", label: "Justify", options: ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"] }, { key: "alignItems", label: "Align", options: ["stretch", "flex-start", "center", "flex-end", "baseline"] }, { key: "alignContent", label: "Align Content", options: ["normal", "stretch", "flex-start", "center", "flex-end", "space-between"] }, { key: "flexGrow", label: "Grow", placeholder: "0" }, { key: "flexShrink", label: "Shrink", placeholder: "1" }, { key: "flexBasis", label: "Basis", placeholder: "Auto" },
];
const gridFields = [
  { key: "gridTemplateColumns", label: "Columns", placeholder: "1fr 1fr" }, { key: "gridTemplateRows", label: "Rows", placeholder: "Auto" }, { key: "gridAutoColumns", label: "Auto Columns", placeholder: "Auto" }, { key: "gridAutoRows", label: "Auto Rows", placeholder: "Auto" }, { key: "justifyItems", label: "Justify Items", options: ["stretch", "start", "center", "end"] },
];

function current(key) {
  if (selectedNode.value) return selectedNode.value.styles?.[key] ?? "";
  if (selectedElement.value) return getStyles(selectedElement.value.componentId, selectedElement.value.selector)[key] ?? "";
  return "";
}
function normalize(key, raw) {
  const value = String(raw ?? "").trim();
  if (!value) return "";
  if (unitKeys.has(key) && /^-?\d+(\.\d+)?$/.test(value)) return `${value}px`;
  if (numericKeys.has(key) && !/^-?\d+(\.\d+)?$/.test(value)) return "";
  return value;
}
function updateStyle(key, value) {
  const nextValue = normalize(key, value);
  if (selectedNode.value) updateNode(selectedNode.value.id, { styles: { [key]: nextValue } });
  else if (selectedElement.value) setStyle(selectedElement.value.componentId, selectedElement.value.selector, key, nextValue);
}
function resetStyle(key) { updateStyle(key, ""); }
function updateProp(key, value) { if (selectedNode.value) updateNode(selectedNode.value.id, { props: { [key]: value } }); }
function contentValue() { return getContent(selectedElement.value.componentId, selectedElement.value.contentSelector) ?? selectedElement.value.textValue ?? ""; }
function updateContent(value) {
  const element = selectedElement.value;
  if (!element?.editableText) return;
  setContent(element.componentId, element.contentSelector, value, { originalText: element.textValue, occurrence: element.textOccurrence, tag: element.tag, className: element.className });
}
function resetText() { const element = selectedElement.value; if (element) resetContent(element.componentId, element.contentSelector); }
const isFlex = computed(() => current("display") === "flex");
const isGrid = computed(() => current("display") === "grid");
</script>

<template>
  <aside class="elementor-inspector" aria-label="Element settings">
    <header class="inspector-title"><strong>Edit {{ normalizedName }}</strong><span>{{ isNode ? 'Builder node' : 'Component element' }}</span></header>
    <nav class="inspector-tabs" aria-label="Settings categories">
      <button v-for="tab in tabs" :key="tab.id" type="button" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id"><component :is="tab.icon" :size="18" /><span>{{ tab.label }}</span></button>
    </nav>
    <div v-if="entity" class="inspector-body">
      <template v-if="activeTab === 'content'">
        <section v-if="isNode && ['heading', 'text', 'button'].includes(selectedNode.type)" class="control-group"><h3>Content</h3><label>Text<textarea v-if="selectedNode.type === 'text'" rows="4" :value="selectedNode.props.text" @input="updateProp('text', $event.target.value)" /><input v-else :value="selectedNode.props.text" @input="updateProp('text', $event.target.value)" /></label><label v-if="selectedNode.type === 'heading'">HTML Tag<select :value="selectedNode.props.tag || 'h2'" @change="updateProp('tag', $event.target.value)"><option v-for="tag in ['h1','h2','h3','h4','h5','h6']" :key="tag">{{ tag }}</option></select></label><label v-if="selectedNode.type === 'button'">Link<input :value="selectedNode.props.href" @input="updateProp('href', $event.target.value)" /></label></section>
        <section v-else-if="isNode && selectedNode.type === 'image'" class="control-group"><h3>Image</h3><label>Source URL<input :value="selectedNode.props.src" @input="updateProp('src', $event.target.value)" /></label><label>Alt text<input :value="selectedNode.props.alt" @input="updateProp('alt', $event.target.value)" /></label></section>
        <section v-else-if="selectedElement?.editableText" class="control-group"><h3>Text</h3><textarea rows="6" :value="contentValue()" @input="updateContent($event.target.value)" /><button v-if="getContentEntry(selectedElement.componentId, selectedElement.contentSelector)" class="reset-text" type="button" @click="resetText">Reset text</button></section>
        <section v-else class="empty-state"><Type :size="28" /><strong>No editable content</strong><span>Select text, an image, or a button to edit its content.</span></section>
      </template>
      <template v-else-if="activeTab === 'layout'">
        <section class="control-group"><h3>Container Layout</h3><div v-for="field in layoutFields" :key="field.key" class="field"><label :for="`layout-${field.key}`">{{ field.label }}</label><select v-if="field.options" :id="`layout-${field.key}`" :value="current(field.key)" @change="updateStyle(field.key, $event.target.value)"><option v-for="option in field.options" :key="option" :value="option">{{ option || 'Default' }}</option></select><div v-else class="value-control"><input :id="`layout-${field.key}`" :value="current(field.key)" :placeholder="field.placeholder" @input="updateStyle(field.key, $event.target.value)" /><button v-if="current(field.key)" type="button" @click="resetStyle(field.key)">×</button></div></div></section>
        <section v-if="isFlex || isGrid" class="control-group"><h3>{{ isFlex ? 'Items' : 'Grid' }}</h3><div v-for="field in isFlex ? flexFields : gridFields" :key="field.key" class="field"><label>{{ field.label }}</label><select v-if="field.options" :value="current(field.key)" @change="updateStyle(field.key, $event.target.value)"><option v-for="option in field.options" :key="option" :value="option">{{ option }}</option></select><input v-else :value="current(field.key)" :placeholder="field.placeholder" @input="updateStyle(field.key, $event.target.value)" /></div></section>
      </template>
      <template v-else-if="activeTab === 'style'">
        <section class="control-group"><h3>Typography</h3><div v-for="field in typographyFields" :key="field.key" class="field"><label>{{ field.label }}</label><select v-if="field.options" :value="current(field.key)" @change="updateStyle(field.key, $event.target.value)"><option v-for="option in field.options" :key="option" :value="option">{{ option || 'Default' }}</option></select><input v-else :value="current(field.key)" :placeholder="field.placeholder" @input="updateStyle(field.key, $event.target.value)" /></div></section>
        <section class="control-group"><h3>Appearance</h3><div v-for="field in appearanceFields" :key="field.key" class="field"><label>{{ field.label }}</label><div v-if="field.color" class="color-control"><input type="color" :value="current(field.key) || '#ffffff'" @input="updateStyle(field.key, $event.target.value)" /><input :value="current(field.key)" placeholder="#ffffff" @input="updateStyle(field.key, $event.target.value)" /></div><select v-else-if="field.options" :value="current(field.key)" @change="updateStyle(field.key, $event.target.value)"><option v-for="option in field.options" :key="option" :value="option">{{ option || 'Default' }}</option></select><input v-else :value="current(field.key)" :placeholder="field.placeholder" @input="updateStyle(field.key, $event.target.value)" /></div></section>
      </template>
      <template v-else-if="activeTab === 'advanced'">
        <section class="control-group"><h3>Spacing</h3><div v-for="box in [['padding', 'Padding'], ['margin', 'Margin']]" :key="box[0]" class="spacing"><div class="field"><label>{{ box[1] }}</label><input :value="current(box[0])" placeholder="All" @input="updateStyle(box[0], $event.target.value)" /></div><div class="side-grid"><label v-for="side in ['Top','Right','Bottom','Left']" :key="side">{{ side }}<input :value="current(`${box[0]}${side}`)" @input="updateStyle(`${box[0]}${side}`, $event.target.value)" /></label></div></div></section>
        <section class="control-group"><h3>Layout</h3><div v-for="field in [{ key: 'gap', label: 'Gap', placeholder: '0px' }, { key: 'columnGap', label: 'Column gap', placeholder: '0px' }, { key: 'rowGap', label: 'Row gap', placeholder: '0px' }]" :key="field.key" class="field"><label>{{ field.label }}</label><input :value="current(field.key)" :placeholder="field.placeholder" @input="updateStyle(field.key, $event.target.value)" /></div></section>
      </template>
    </div>
    <div v-else class="empty-state"><Box :size="30" /><strong>Select an element</strong><span>Click a component element or builder container to edit it.</span></div>
  </aside>
</template>

<style scoped>
.elementor-inspector{--ink:#1f2937;--muted:#6b7280;--line:#e5e7eb;--accent:#93003f;width:375px;flex:0 0 375px;display:flex;flex-direction:column;min-width:0;height:100%;background:#fff;color:var(--ink);font:14px Arial,Helvetica,sans-serif;border-right:1px solid var(--line)}.inspector-title{height:61px;padding:0 24px;display:flex;flex-direction:column;justify-content:center;gap:3px;border-bottom:1px solid var(--line)}.inspector-title strong{font-size:16px}.inspector-title span{font-size:11px;color:var(--muted)}.inspector-tabs{height:72px;display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid var(--line)}.inspector-tabs button{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;border:0;background:#fff;color:#59616d;font-size:12px;cursor:pointer}.inspector-tabs button.active{color:#111}.inspector-tabs button.active:after{position:absolute;right:0;bottom:0;left:0;height:3px;content:"";background:#111}.inspector-tabs button:hover{background:#fafafa}.inspector-body{flex:1;min-height:0;overflow:auto;padding:25px}.control-group{padding:0 0 20px;margin:0 0 20px;border-bottom:1px solid var(--line)}.control-group h3{margin:0 0 17px;font-size:15px}.field{display:grid;grid-template-columns:128px minmax(0,1fr);align-items:center;gap:10px;min-height:42px}.field>label,.control-group>label{font-size:13px;color:#59616d}.field input,.field select,.control-group>label input,.control-group>label textarea,.control-group>textarea{width:100%;min-height:34px;border:1px solid #d5d9df;border-radius:3px;background:#fff;padding:7px 9px;color:#30343a;font:13px Arial,sans-serif;outline:0}.control-group>label{display:flex;flex-direction:column;gap:7px;margin:0 0 14px}.field input:focus,.field select:focus,.control-group input:focus,.control-group textarea:focus{border-color:#93003f;box-shadow:0 0 0 1px #93003f}.value-control,.color-control{display:flex;align-items:center;gap:5px}.value-control input,.color-control input:last-child{min-width:0;flex:1}.value-control button,.reset-text{border:0;background:transparent;color:#93003f;cursor:pointer;font-size:18px}.color-control input[type=color]{width:34px;height:34px;padding:2px}.spacing+.spacing{margin-top:16px}.side-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-top:8px}.side-grid label{font-size:10px;color:var(--muted)}.side-grid input{width:100%;height:32px;margin-top:3px;border:1px solid #d5d9df;border-radius:3px;text-align:center;outline:0}.empty-state{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:28px;text-align:center;color:#8a9099}.empty-state strong{color:#4a5058;font-size:14px}.empty-state span{max-width:220px;font-size:12px;line-height:1.5}.reset-text{margin-top:8px;padding:0;font-size:12px;font-weight:700}
</style>
