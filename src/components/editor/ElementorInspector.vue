<script setup>
import { computed, reactive, ref, watch } from "vue";
import { Box, Link2, Paintbrush, SlidersHorizontal, Type } from "@lucide/vue";
import { useEditor } from "@/composables/useEditor";
import { useComponentEditor } from "@/composables/useComponentEditor";

const { selectedNode, updateNode } = useEditor();
const { selectedElement, getStyles, setStyle, getContent, getContentEntry, setContent, setImage, getImage, resetContent } = useComponentEditor();
const activeTab = ref("layout");
const uploadingImage = ref(false);
const imageUploadError = ref("");
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

// --- Unit handling, Elementor-style -------------------------------------
// A dimension value like "10px" is never edited as one opaque string. It is
// split into a number ("10") and a unit ("px") so each can be changed on its
// own — typing a new number keeps the current unit, and switching the unit
// keeps the current number. Nothing is force-appended; "px" is only the
// fallback shown when a field has no value yet, exactly like Elementor's
// unit switcher defaults to PX until the user picks something else.
const sizeUnits = ["px", "%", "em", "rem", "vw", "vh"];
const UNIT_PATTERN = /^(-?\d*\.?\d+)\s*([a-z%]*)$/i;
function splitUnitValue(raw) {
  const value = String(raw ?? "").trim();
  if (!value) return { number: "", unit: "px" };
  const match = UNIT_PATTERN.exec(value);
  if (!match) return { number: "", unit: "px" };
  return { number: match[1], unit: match[2] ? match[2].toLowerCase() : "px" };
}
function numberOf(key) { return splitUnitValue(current(key)).number; }
function unitOf(key) { return splitUnitValue(current(key)).unit; }
function setNumber(key, rawNumber) {
  const number = String(rawNumber ?? "").trim();
  updateStyle(key, number === "" ? "" : `${number}${unitOf(key)}`);
}
function setUnit(key, unit) {
  const number = numberOf(key);
  updateStyle(key, number === "" ? "" : `${number}${unit}`);
}

// A "box" control (padding, margin) uses one unit for the whole group, shown
// as PX / EM / % / REM tabs — never a per-side dropdown.
const boxUnits = ["px", "em", "%", "rem"];
function groupUnit(prefix) {
  for (const side of ["Top", "Right", "Bottom", "Left"]) {
    const value = current(`${prefix}${side}`);
    if (value) return splitUnitValue(value).unit;
  }
  return "px";
}
function setGroupUnit(prefix, unit) {
  for (const side of ["Top", "Right", "Bottom", "Left"]) {
    const key = `${prefix}${side}`;
    const number = numberOf(key);
    if (number !== "") updateStyle(key, `${number}${unit}`);
  }
}

// The chain icon links Top/Right/Bottom/Left so editing any one side sets
// all four to the same value, exactly like Elementor's link toggle. Starts
// linked, same as Elementor's default state.
const linkedGroups = reactive({ padding: true, margin: true });
function isLinked(prefix) { return !!linkedGroups[prefix]; }
function toggleLink(prefix) {
  const next = !linkedGroups[prefix];
  linkedGroups[prefix] = next;
  if (next) {
    const seed = ["Top", "Right", "Bottom", "Left"].map((side) => numberOf(`${prefix}${side}`)).find((value) => value !== "");
    if (seed !== undefined) setSideNumber(prefix, "Top", seed);
  }
}
function setSideNumber(prefix, side, rawNumber) {
  const number = String(rawNumber ?? "").trim();
  const value = number === "" ? "" : `${number}${groupUnit(prefix)}`;
  if (isLinked(prefix)) {
    ["Top", "Right", "Bottom", "Left"].forEach((s) => updateStyle(`${prefix}${s}`, value));
  } else {
    updateStyle(`${prefix}${side}`, value);
  }
}

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
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Unable to read the image."));
    reader.readAsDataURL(file);
  });
}
function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to decode the image."));
    image.src = dataUrl;
  });
}
async function prepareImageForStorage(file) {
  const original = await fileToDataUrl(file);
  const image = await loadImage(original);
  const maxDimension = 1920;
  const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth || image.width, image.naturalHeight || image.height));
  const width = Math.max(1, Math.round((image.naturalWidth || image.width) * scale));
  const height = Math.max(1, Math.round((image.naturalHeight || image.height) * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser could not prepare the image.");
  context.drawImage(image, 0, 0, width, height);
  const webp = canvas.toDataURL("image/webp", 0.82);
  if (webp.startsWith("data:image/webp")) return webp;
  return canvas.toDataURL("image/jpeg", 0.82);
}
async function handleImageUpload(event) {
  const input = event.target;
  const file = input.files?.[0];
  imageUploadError.value = "";
  if (!file || (!selectedNode.value && !selectedElement.value)) return;
  if (!file.type.startsWith("image/")) {
    imageUploadError.value = "Please select an image file.";
    input.value = "";
    return;
  }
  uploadingImage.value = true;
  try {
    const dataUrl = await prepareImageForStorage(file);
    if (selectedNode.value) updateProp("src", dataUrl);
    else updateImageUrl(dataUrl);
  } catch (error) {
    console.warn("Unable to upload image:", error);
    imageUploadError.value = "Could not load this image. Please try another file.";
  } finally {
    uploadingImage.value = false;
    input.value = "";
  }
}
function contentValue() { return getContent(selectedElement.value.componentId, selectedElement.value.contentSelector) ?? selectedElement.value.textValue ?? ""; }
function imageValue() { return getImage(selectedElement.value.componentId, selectedElement.value.contentSelector) ?? selectedElement.value.element?.getAttribute("src") ?? ""; }
function updateImageUrl(value) {
  const element = selectedElement.value;
  if (!element?.componentId || !element?.contentSelector) return;
  setImage(element.componentId, element.contentSelector, value);
}
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
    <header class="inspector-title">
      <span class="title-crumbs"><em>{{ isNode ? 'Builder node' : 'Component element' }}</em></span>
      <strong>{{ normalizedName }}</strong>
    </header>
    <nav class="inspector-tabs" aria-label="Settings categories">
      <button v-for="tab in tabs" :key="tab.id" type="button" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
        <component :is="tab.icon" :size="16" stroke-width="1.75" /><span>{{ tab.label }}</span>
      </button>
    </nav>
    <div v-if="entity" class="inspector-body">
      <template v-if="activeTab === 'content'">
        <section v-if="isNode && ['heading', 'text', 'button'].includes(selectedNode.type)" class="control-group">
          <h3>Content</h3>
          <label>Text<textarea v-if="selectedNode.type === 'text'" rows="4" :value="selectedNode.props.text" @input="updateProp('text', $event.target.value)" /><input v-else :value="selectedNode.props.text" @input="updateProp('text', $event.target.value)" /></label>
          <label v-if="selectedNode.type === 'heading'">HTML Tag<select :value="selectedNode.props.tag || 'h2'" @change="updateProp('tag', $event.target.value)"><option v-for="tag in ['h1','h2','h3','h4','h5','h6']" :key="tag">{{ tag }}</option></select></label>
          <label v-if="selectedNode.type === 'button'">Link<input :value="selectedNode.props.href" @input="updateProp('href', $event.target.value)" placeholder="https://" /></label>
        </section>
        <section v-else-if="isNode && selectedNode.type === 'image'" class="control-group">
          <h3>Image</h3>
          <label>Source URL<input :value="selectedNode.props.src" @input="updateProp('src', $event.target.value)" /></label>
          <label>Alt text<input :value="selectedNode.props.alt" @input="updateProp('alt', $event.target.value)" /></label>
          <label class="image-upload" :class="{ disabled: uploadingImage }">
            <span>{{ uploadingImage ? 'Processing image…' : 'Upload image' }}</span>
            <input type="file" accept="image/*" :disabled="uploadingImage" @change="handleImageUpload" />
          </label>
          <p v-if="imageUploadError" class="upload-error">{{ imageUploadError }}</p>
          <img v-if="selectedNode.props.src" class="image-preview" :src="selectedNode.props.src" :alt="selectedNode.props.alt || 'Preview'" />
        </section>
        <section v-else-if="selectedElement?.tag === 'img'" class="control-group">
          <h3>Image</h3>
          <label>Source URL<input :value="imageValue()" @input="updateImageUrl($event.target.value)" /></label>
          <label class="image-upload" :class="{ disabled: uploadingImage }">
            <span>{{ uploadingImage ? 'Processing image…' : 'Upload image' }}</span>
            <input type="file" accept="image/*" :disabled="uploadingImage" @change="handleImageUpload" />
          </label>
          <p v-if="imageUploadError" class="upload-error">{{ imageUploadError }}</p>
          <img v-if="imageValue()" class="image-preview" :src="imageValue()" alt="Preview" />
        </section>
        <section v-else-if="selectedElement?.editableText" class="control-group">
          <h3>Text</h3>
          <textarea rows="6" :value="contentValue()" @input="updateContent($event.target.value)" />
          <button v-if="getContentEntry(selectedElement.componentId, selectedElement.contentSelector)" class="reset-text" type="button" @click="resetText">↺ Reset text</button>
        </section>
        <section v-else class="empty-state"><Type :size="26" stroke-width="1.5" /><strong>No editable content</strong><span>Select text, an image, or a button to edit its content.</span></section>
      </template>

      <template v-else-if="activeTab === 'layout'">
        <section class="control-group">
          <h3>Container Layout</h3>
          <div v-for="field in layoutFields" :key="field.key" class="field">
            <label :for="`layout-${field.key}`">{{ field.label }}</label>
            <select v-if="field.options" :id="`layout-${field.key}`" :value="current(field.key)" @change="updateStyle(field.key, $event.target.value)"><option v-for="option in field.options" :key="option" :value="option">{{ option || 'Default' }}</option></select>
            <div v-else-if="unitKeys.has(field.key)" class="unit-control">
              <input :id="`layout-${field.key}`" type="number" step="any" inputmode="decimal" :value="numberOf(field.key)" :placeholder="field.placeholder" @input="setNumber(field.key, $event.target.value)" />
              <select class="unit-select" :value="unitOf(field.key)" @change="setUnit(field.key, $event.target.value)"><option v-for="u in sizeUnits" :key="u" :value="u">{{ u }}</option></select>
              <button v-if="current(field.key)" type="button" class="clear-btn" @click="resetStyle(field.key)">×</button>
            </div>
            <div v-else class="value-control"><input :id="`layout-${field.key}`" :value="current(field.key)" :placeholder="field.placeholder" @input="updateStyle(field.key, $event.target.value)" /><button v-if="current(field.key)" type="button" class="clear-btn" @click="resetStyle(field.key)">×</button></div>
          </div>
        </section>
        <section v-if="isFlex || isGrid" class="control-group">
          <h3>{{ isFlex ? 'Items' : 'Grid' }}</h3>
          <div v-for="field in isFlex ? flexFields : gridFields" :key="field.key" class="field">
            <label>{{ field.label }}</label>
            <select v-if="field.options" :value="current(field.key)" @change="updateStyle(field.key, $event.target.value)"><option v-for="option in field.options" :key="option" :value="option">{{ option }}</option></select>
            <div v-else-if="unitKeys.has(field.key)" class="unit-control">
              <input type="number" step="any" inputmode="decimal" :value="numberOf(field.key)" :placeholder="field.placeholder" @input="setNumber(field.key, $event.target.value)" />
              <select class="unit-select" :value="unitOf(field.key)" @change="setUnit(field.key, $event.target.value)"><option v-for="u in sizeUnits" :key="u" :value="u">{{ u }}</option></select>
            </div>
            <input v-else :value="current(field.key)" :placeholder="field.placeholder" @input="updateStyle(field.key, $event.target.value)" />
          </div>
        </section>
      </template>

      <template v-else-if="activeTab === 'style'">
        <section class="control-group">
          <h3>Typography</h3>
          <div v-for="field in typographyFields" :key="field.key" class="field">
            <label>{{ field.label }}</label>
            <select v-if="field.options" :value="current(field.key)" @change="updateStyle(field.key, $event.target.value)"><option v-for="option in field.options" :key="option" :value="option">{{ option || 'Default' }}</option></select>
            <div v-else-if="unitKeys.has(field.key)" class="unit-control">
              <input type="number" step="any" inputmode="decimal" :value="numberOf(field.key)" :placeholder="field.placeholder" @input="setNumber(field.key, $event.target.value)" />
              <select class="unit-select" :value="unitOf(field.key)" @change="setUnit(field.key, $event.target.value)"><option v-for="u in sizeUnits" :key="u" :value="u">{{ u }}</option></select>
            </div>
            <input v-else :value="current(field.key)" :placeholder="field.placeholder" @input="updateStyle(field.key, $event.target.value)" />
          </div>
        </section>
        <section class="control-group">
          <h3>Appearance</h3>
          <div v-for="field in appearanceFields" :key="field.key" class="field">
            <label>{{ field.label }}</label>
            <div v-if="field.color" class="color-control"><input type="color" class="swatch" :value="current(field.key) || '#ffffff'" @input="updateStyle(field.key, $event.target.value)" /><input :value="current(field.key)" placeholder="#ffffff" @input="updateStyle(field.key, $event.target.value)" /></div>
            <select v-else-if="field.options" :value="current(field.key)" @change="updateStyle(field.key, $event.target.value)"><option v-for="option in field.options" :key="option" :value="option">{{ option || 'Default' }}</option></select>
            <div v-else-if="unitKeys.has(field.key)" class="unit-control">
              <input type="number" step="any" inputmode="decimal" :value="numberOf(field.key)" :placeholder="field.placeholder" @input="setNumber(field.key, $event.target.value)" />
              <select class="unit-select" :value="unitOf(field.key)" @change="setUnit(field.key, $event.target.value)"><option v-for="u in sizeUnits" :key="u" :value="u">{{ u }}</option></select>
            </div>
            <input v-else :value="current(field.key)" :placeholder="field.placeholder" @input="updateStyle(field.key, $event.target.value)" />
          </div>
        </section>
      </template>

      <template v-else-if="activeTab === 'advanced'">
        <section class="control-group">
          <h3>Spacing</h3>
          <div v-for="box in [['padding', 'Padding'], ['margin', 'Margin']]" :key="box[0]" class="spacing">
            <div class="spacing-header">
              <label>{{ box[1] }}</label>
              <div class="unit-tabs">
                <button v-for="u in boxUnits" :key="u" type="button" :class="{ active: groupUnit(box[0]) === u }" @click="setGroupUnit(box[0], u)">{{ u }}</button>
              </div>
            </div>
            <div class="side-row">
              <div class="side-grid">
                <label v-for="side in ['Top','Right','Bottom','Left']" :key="side">
                  <input type="number" step="any" inputmode="decimal" :value="numberOf(`${box[0]}${side}`)" @input="setSideNumber(box[0], side, $event.target.value)" />
                  <span>{{ side }}</span>
                </label>
              </div>
              <button type="button" class="link-btn" :class="{ active: isLinked(box[0]) }" :aria-pressed="isLinked(box[0])" title="Link values together" @click="toggleLink(box[0])">
                <Link2 :size="14" stroke-width="2" />
              </button>
            </div>
          </div>
        </section>
        <section class="control-group">
          <h3>Layout</h3>
          <div v-for="field in [{ key: 'gap', label: 'Gap', placeholder: '0px' }, { key: 'columnGap', label: 'Column gap', placeholder: '0px' }, { key: 'rowGap', label: 'Row gap', placeholder: '0px' }]" :key="field.key" class="field">
            <label>{{ field.label }}</label>
            <div class="unit-control">
              <input type="number" step="any" inputmode="decimal" :value="numberOf(field.key)" :placeholder="field.placeholder" @input="setNumber(field.key, $event.target.value)" />
              <select class="unit-select" :value="unitOf(field.key)" @change="setUnit(field.key, $event.target.value)"><option v-for="u in sizeUnits" :key="u" :value="u">{{ u }}</option></select>
            </div>
          </div>
        </section>
      </template>
    </div>
    <div v-else class="empty-state"><Box :size="28" stroke-width="1.5" /><strong>Select an element</strong><span>Click a component element or builder container to edit it.</span></div>
  </aside>
</template>

<style scoped>
.elementor-inspector {
  --ink: #32373c;
  --label: #515962;
  --muted: #6d7882;
  --faint: #a4afb7;
  --line: #e6e9ec;
  --line-soft: #eef0f2;
  --field-bg: #f1f3f5;
  --field-border: #d5dadf;
  --accent: #93003f;
  --accent-soft: rgba(147, 0, 63, 0.08);
  width: 300px;
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  background: #fff;
  color: var(--ink);
  font: 13px/1.5 "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  border-right: 1px solid var(--line);
  -webkit-font-smoothing: antialiased;
}

/* Header */
.inspector-title {
  height: 56px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  border-bottom: 1px solid var(--line);
  background: #fff;
}
.inspector-title strong {
  font-size: 13px;
  font-weight: 500;
  color: var(--ink);
}
.title-crumbs em {
  font-style: normal;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--faint);
}

/* Tabs */
.inspector-tabs {
  display: flex;
  border-bottom: 1px solid var(--line);
  background: #fcfcfc;
}
.inspector-tabs button {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 44px;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--muted);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.12s ease, border-color 0.12s ease, background-color 0.12s ease;
}
.inspector-tabs button svg { opacity: 0.85; }
.inspector-tabs button:hover { color: var(--ink); background: #f4f5f6; }
.inspector-tabs button.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
  background: #fff;
}
.inspector-tabs button.active svg { opacity: 1; }

/* Body */
.inspector-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 4px 0 40px;
}
.inspector-body::-webkit-scrollbar { width: 8px; }
.inspector-body::-webkit-scrollbar-thumb { background: #d9dce0; border-radius: 4px; }
.inspector-body::-webkit-scrollbar-track { background: transparent; }

.control-group {
  padding: 18px 20px;
  border-bottom: 1px solid var(--line-soft);
}
.control-group:last-child { border-bottom: 0; }
.control-group h3 {
  margin: 0 0 16px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--muted);
}
.control-group > label {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin: 0 0 14px;
  font-size: 12px;
  font-weight: 500;
  color: var(--label);
}
.control-group > label:last-child { margin-bottom: 0; }

/* Field rows (label left, control right) — the Elementor two-column control */
.field {
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 4px 0;
}
.field > label {
  font-size: 12px;
  font-weight: 500;
  color: var(--label);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Inputs / selects */
.field input,
.field select,
.control-group > label input,
.control-group > label textarea,
.control-group > textarea {
  width: 100%;
  min-height: 32px;
  border: 1px solid var(--field-border);
  border-radius: 3px;
  background: #fff;
  padding: 6px 9px;
  color: var(--ink);
  font: 12px/1.4 "Roboto", Arial, sans-serif;
  outline: 0;
  transition: border-color 0.12s ease, box-shadow 0.12s ease;
}
.field select { appearance: none; background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%236d7882'/%3E%3C/svg%3E") no-repeat right 10px center; padding-right: 26px; cursor: pointer; }
.control-group > textarea,
.field textarea { resize: vertical; min-height: 76px; line-height: 1.5; }
.field input::placeholder,
.control-group input::placeholder,
.control-group textarea::placeholder { color: var(--faint); }
.field input:hover,
.field select:hover,
.control-group input:hover,
.control-group textarea:hover { border-color: #b9bfc5; }
.field input:focus,
.field select:focus,
.control-group input:focus,
.control-group textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent);
}

/* Spacing box: label + unit tabs, then 4 sides + chain link */
.spacing-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.spacing-header > label {
  font-size: 12px;
  font-weight: 500;
  color: var(--label);
}
.unit-tabs {
  display: flex;
  align-items: center;
  gap: 10px;
}
.unit-tabs button {
  border: 0;
  background: transparent;
  padding: 0 0 2px;
  color: var(--faint);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: color 0.12s ease, border-color 0.12s ease;
}
.unit-tabs button:hover { color: var(--label); }
.unit-tabs button.active { color: var(--ink); border-bottom-color: var(--ink); }

.side-row { display: flex; align-items: flex-start; gap: 6px; }
.side-row .side-grid { flex: 1; margin-top: 0; }
.link-btn {
  flex: 0 0 34px;
  width: 34px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--field-border);
  border-radius: 3px;
  background: #fff;
  color: var(--faint);
  cursor: pointer;
  transition: background-color 0.12s ease, color 0.12s ease, border-color 0.12s ease;
}
.link-btn:hover { border-color: #b9bfc5; color: var(--label); }
.link-btn.active {
  background: #98a2b3;
  border-color: #98a2b3;
  color: #fff;
}
.link-btn.active:hover { background: #838fa3; border-color: #838fa3; }

/* Number + unit control — Elementor-style unit switcher */
.unit-control {
  display: flex;
  align-items: center;
  gap: 4px;
}
.unit-control input[type="number"] {
  min-width: 0;
  flex: 1 1 auto;
  -moz-appearance: textfield;
}
.unit-control input[type="number"]::-webkit-outer-spin-button,
.unit-control input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.unit-select {
  flex: 0 0 50px;
  width: 50px;
  min-height: 32px;
  padding: 6px 16px 6px 6px;
  border: 1px solid var(--field-border);
  border-radius: 3px;
  background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5'%3E%3Cpath d='M0 0l4 5 4-5z' fill='%236d7882'/%3E%3C/svg%3E") no-repeat right 6px center;
  color: var(--muted);
  font-size: 11px;
  font-weight: 500;
  text-transform: lowercase;
  text-align: center;
  text-align-last: center;
  appearance: none;
  cursor: pointer;
}
.unit-select:hover { border-color: #b9bfc5; color: var(--ink); }
.unit-select:focus { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent); outline: 0; }
.unit-control .clear-btn { position: static; flex: 0 0 auto; }
.side-grid input[type="number"] {
  height: 30px;
  text-align: center;
  -moz-appearance: textfield;
}
.side-grid input[type="number"]::-webkit-outer-spin-button,
.side-grid input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Value control with clear (×) button */
.value-control { position: relative; display: flex; align-items: center; }
.value-control input { padding-right: 26px; }
.clear-btn {
  position: absolute;
  right: 3px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--faint);
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
  transition: color 0.12s ease, background-color 0.12s ease;
}
.clear-btn:hover { color: var(--accent); background: var(--accent-soft); }

/* Color control */
.color-control { display: flex; align-items: center; gap: 6px; }
.color-control input:last-child { min-width: 0; flex: 1; }
.swatch {
  appearance: none;
  -webkit-appearance: none;
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  padding: 0;
  border: 1px solid var(--field-border);
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}
.swatch::-webkit-color-swatch-wrapper { padding: 3px; }
.swatch::-webkit-color-swatch { border: 0; border-radius: 2px; }

.image-upload {
  display: flex !important;
  flex-direction: row !important;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  margin-top: 2px !important;
  padding: 0 10px;
  border: 1px dashed #c8ced4;
  border-radius: 3px;
  background: #fafafa;
  color: var(--label);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}
.image-upload:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-soft); }
.image-upload.disabled { opacity: .6; cursor: wait; }
.image-upload input { display: none; }
.upload-error { margin: 4px 0 0; color: #b42318; font-size: 10px; }
.image-preview { display: block; width: 100%; max-height: 160px; object-fit: contain; margin-top: 8px; border: 1px solid var(--line); border-radius: 3px; background: #f7f8f9; }

/* Reset text */
.reset-text {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
  padding: 5px 10px;
  border: 0;
  border-radius: 3px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.12s ease;
}
.reset-text:hover { background: rgba(147, 0, 63, 0.14); }

/* Spacing box (padding / margin) */
.spacing + .spacing { margin-top: 18px; }
.side-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-top: 8px;
}
.side-grid label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--faint);
  text-align: center;
}
.side-grid input {
  width: 100%;
  height: 30px;
  border: 1px solid var(--field-border);
  border-radius: 3px;
  background: #fff;
  text-align: center;
  font-size: 12px;
  outline: 0;
}
.side-grid input:focus { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent); }

/* Empty states */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 32px 28px;
  text-align: center;
  color: var(--faint);
}
.empty-state svg { color: var(--field-border); }
.empty-state strong { color: var(--label); font-size: 13px; font-weight: 500; }
.empty-state span { max-width: 200px; font-size: 11px; line-height: 1.6; color: var(--faint); }
</style>
