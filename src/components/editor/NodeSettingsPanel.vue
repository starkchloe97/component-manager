<script setup>
import { computed, ref } from "vue";
import { useEditor } from "@/composables/useEditor";

const { selectedNode, updateNode } = useEditor();
const node = computed(() => selectedNode.value);
const open = ref({ content: true, layout: true, spacing: true, flex: false, grid: false, typography: false, appearance: false });

const labelMap = {
  width: "Width", maxWidth: "Max width", minWidth: "Min width", height: "Height", minHeight: "Min height",
  display: "Display", position: "Position", zIndex: "Z-index", gap: "Gap", columnGap: "Column gap", rowGap: "Row gap",
  flexDirection: "Direction", flexWrap: "Wrap", flexGrow: "Grow", flexShrink: "Shrink", flexBasis: "Basis",
  justifyContent: "Justify content", alignItems: "Align items", alignContent: "Align content", justifyItems: "Justify items",
  gridTemplateColumns: "Columns", gridTemplateRows: "Rows", gridAutoColumns: "Auto columns", gridAutoRows: "Auto rows",
  padding: "Padding", margin: "Margin", paddingTop: "Top", paddingRight: "Right", paddingBottom: "Bottom", paddingLeft: "Left",
  marginTop: "Top", marginRight: "Right", marginBottom: "Bottom", marginLeft: "Left",
  fontFamily: "Family", fontSize: "Size", fontWeight: "Weight", lineHeight: "Line height", letterSpacing: "Letter spacing",
  textAlign: "Align", textTransform: "Transform", textDecoration: "Decoration", color: "Text",
  backgroundColor: "Background", borderWidth: "Width", borderStyle: "Style", borderColor: "Color",
  borderRadius: "Radius", opacity: "Opacity", overflow: "Overflow", boxShadow: "Shadow",
};

const unitKeys = new Set([
  "width","maxWidth","minWidth","height","minHeight","gap","columnGap","rowGap","flexBasis",
  "padding","paddingTop","paddingRight","paddingBottom","paddingLeft",
  "margin","marginTop","marginRight","marginBottom","marginLeft",
  "fontSize","letterSpacing","borderWidth","borderRadius",
]);
const numericKeys = new Set(["zIndex","flexGrow","flexShrink"]);
const unitlessKeys = new Set(["lineHeight","opacity"]);
const current = (key) => node.value?.styles?.[key] ?? "";

function normalize(key, raw) {
  let value = String(raw ?? "").trim();
  if (!value) return "";
  if (unitKeys.has(key) && /^-?\d+(\.\d+)?$/.test(value)) return `${value}px`;
  if (numericKeys.has(key) && !/^-?\d+(\.\d+)?$/.test(value)) return "";
  if (unitlessKeys.has(key) && key === "opacity") {
    const n = Number(value);
    return Number.isFinite(n) ? String(Math.min(1, Math.max(0, n))) : "";
  }
  return value;
}
function setStyle(key, value) {
  if (!node.value) return;
  updateNode(node.value.id, { styles: { [key]: normalize(key, value) } });
}
function resetStyle(key) { setStyle(key, ""); }
function setProp(key, value) {
  if (!node.value) return;
  updateNode(node.value.id, { props: { [key]: value } });
}
function toggle(key) { open.value[key] = !open.value[key]; }
function isSet(key) { return !!current(key); }
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
async function handleImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file || !node.value) return;
  if (!file.type.startsWith("image/")) return;
  const dataUrl = await fileToDataUrl(file);
  setProp("src", dataUrl);
}
const title = computed(() => {
  if (!node.value) return "Element";
  const labels = { section: "Section", column: "Column", heading: "Heading", text: "Text", button: "Button", image: "Image", component: "Component", container: "Container" };
  return labels[node.value.type] || node.value.type;
});
const isFlex = computed(() => current("display") === "flex");
const isGrid = computed(() => current("display") === "grid");
</script>

<template>
  <aside v-if="node" class="node-panel">
    <header class="panel-header">
      <div class="node-icon">✦</div>
      <div><span>EDITING</span><strong>{{ title }}</strong></div>
      <code>{{ node.id.slice(0, 16) }}</code>
    </header>

    <div class="body">
      <section v-if="['heading','text','button','image'].includes(node.type)" class="card">
        <button class="head" type="button" @click="toggle('content')"><b>Content</b><span>{{ open.content ? '⌃' : '⌄' }}</span></button>
        <div v-if="open.content" class="content">
          <label v-if="node.type === 'heading'">Text<input :value="node.props.text" @input="setProp('text', $event.target.value)" /></label>
          <label v-if="node.type === 'text'">Text<textarea :value="node.props.text" rows="3" @input="setProp('text', $event.target.value)" /></label>
          <label v-if="node.type === 'button'">Text<input :value="node.props.text" @input="setProp('text', $event.target.value)" /></label>
          <label v-if="node.type === 'button'">Link<input :value="node.props.href" placeholder="#" @input="setProp('href', $event.target.value)" /></label>
          <label v-if="node.type === 'heading'">Tag
            <select :value="node.props.tag || 'h2'" @change="setProp('tag', $event.target.value)">
              <option v-for="tag in ['h1','h2','h3','h4','h5','h6']" :key="tag" :value="tag">{{ tag.toUpperCase() }}</option>
            </select>
          </label>
          <template v-if="node.type === 'image'">
            <label>Image URL<input :value="node.props.src" @input="setProp('src', $event.target.value)" /></label>
            <label>Alt text<input :value="node.props.alt" @input="setProp('alt', $event.target.value)" /></label>
            <label class="upload"><span>Upload image</span><input type="file" accept="image/*" @change="handleImageUpload" /></label>
            <img v-if="node.props.src" class="image-preview" :src="node.props.src" :alt="node.props.alt || 'Preview'" />
          </template>
        </div>
      </section>

      <section class="card">
        <button class="head" type="button" @click="toggle('layout')"><b>Layout</b><span>{{ open.layout ? '⌃' : '⌄' }}</span></button>
        <div v-if="open.layout" class="content">
          <div class="row"><label>Width</label><input :value="current('width')" placeholder="Auto" @input="setStyle('width',$event.target.value)" /></div>
          <div class="row"><label>Max width</label><input :value="current('maxWidth')" placeholder="None" @input="setStyle('maxWidth',$event.target.value)" /></div>
          <div class="row"><label>Height</label><input :value="current('height')" placeholder="Auto" @input="setStyle('height',$event.target.value)" /></div>
          <div class="row"><label>Min height</label><input :value="current('minHeight')" placeholder="Auto" @input="setStyle('minHeight',$event.target.value)" /></div>
          <div class="row"><label>Display</label>
            <select :value="current('display')" @change="setStyle('display',$event.target.value)">
              <option value="">Default</option><option value="block">Block</option><option value="inline-block">Inline block</option><option value="flex">Flex</option><option value="grid">Grid</option><option value="none">None</option>
            </select>
          </div>
          <div class="row"><label>Position</label>
            <select :value="current('position')" @change="setStyle('position',$event.target.value)">
              <option value="">Static</option><option value="relative">Relative</option><option value="absolute">Absolute</option><option value="sticky">Sticky</option><option value="fixed">Fixed</option>
            </select>
          </div>
          <div class="row"><label>Z-index</label><input :value="current('zIndex')" placeholder="Auto" @input="setStyle('zIndex',$event.target.value)" /></div>
        </div>
      </section>

      <section class="card">
        <button class="head" type="button" @click="toggle('spacing')"><b>Spacing</b><span>{{ open.spacing ? '⌃' : '⌄' }}</span></button>
        <div v-if="open.spacing" class="content">
          <div v-for="box in [['padding','Padding'],['margin','Margin']]" :key="box[0]" class="spacing">
            <div class="subhead"><b>{{ box[1] }}</b><input :value="current(box[0])" placeholder="All" @input="setStyle(box[0],$event.target.value)" /><button v-if="isSet(box[0])" @click="resetStyle(box[0])">×</button></div>
            <div class="sides">
              <input v-for="side in ['Top','Right','Bottom','Left']" :key="side" :value="current(box[0]+side)" :placeholder="side[0]" @input="setStyle(box[0]+side,$event.target.value)" />
            </div>
          </div>
        </div>
      </section>

      <section class="card" v-if="isFlex || node.type === 'section' || node.type === 'column'">
        <button class="head" type="button" @click="toggle('flex')"><b>Flexbox</b><span>{{ open.flex ? '⌃' : '⌄' }}</span></button>
        <div v-if="open.flex" class="content">
          <div class="row"><label>Direction</label><select :value="current('flexDirection')" @change="setStyle('flexDirection',$event.target.value)"><option value="row">Row</option><option value="row-reverse">Row reverse</option><option value="column">Column</option><option value="column-reverse">Column reverse</option></select></div>
          <div class="row"><label>Wrap</label><select :value="current('flexWrap')" @change="setStyle('flexWrap',$event.target.value)"><option value="nowrap">No wrap</option><option value="wrap">Wrap</option><option value="wrap-reverse">Wrap reverse</option></select></div>
          <div class="row"><label>Justify</label><select :value="current('justifyContent')" @change="setStyle('justifyContent',$event.target.value)"><option value="flex-start">Start</option><option value="center">Center</option><option value="flex-end">End</option><option value="space-between">Space between</option><option value="space-around">Space around</option><option value="space-evenly">Space evenly</option></select></div>
          <div class="row"><label>Align</label><select :value="current('alignItems')" @change="setStyle('alignItems',$event.target.value)"><option value="stretch">Stretch</option><option value="flex-start">Start</option><option value="center">Center</option><option value="flex-end">End</option><option value="baseline">Baseline</option></select></div>
          <div class="row"><label>Align content</label><select :value="current('alignContent')" @change="setStyle('alignContent',$event.target.value)"><option value="normal">Normal</option><option value="stretch">Stretch</option><option value="flex-start">Start</option><option value="center">Center</option><option value="flex-end">End</option><option value="space-between">Space between</option></select></div>
          <div class="row"><label>Gap</label><input :value="current('gap')" placeholder="0px" @input="setStyle('gap',$event.target.value)" /></div>
          <div class="row"><label>Column gap</label><input :value="current('columnGap')" placeholder="0px" @input="setStyle('columnGap',$event.target.value)" /></div>
          <div class="row"><label>Row gap</label><input :value="current('rowGap')" placeholder="0px" @input="setStyle('rowGap',$event.target.value)" /></div>
          <div class="row"><label>Grow</label><input :value="current('flexGrow')" placeholder="0" @input="setStyle('flexGrow',$event.target.value)" /></div>
          <div class="row"><label>Shrink</label><input :value="current('flexShrink')" placeholder="1" @input="setStyle('flexShrink',$event.target.value)" /></div>
          <div class="row"><label>Basis</label><input :value="current('flexBasis')" placeholder="auto" @input="setStyle('flexBasis',$event.target.value)" /></div>
        </div>
      </section>

      <section class="card" v-if="isGrid || node.type === 'section'">
        <button class="head" type="button" @click="toggle('grid')"><b>Grid</b><span>{{ open.grid ? '⌃' : '⌄' }}</span></button>
        <div v-if="open.grid" class="content">
          <div class="row"><label>Columns</label><input :value="current('gridTemplateColumns')" placeholder="1fr 1fr" @input="setStyle('gridTemplateColumns',$event.target.value)" /></div>
          <div class="row"><label>Rows</label><input :value="current('gridTemplateRows')" placeholder="auto" @input="setStyle('gridTemplateRows',$event.target.value)" /></div>
          <div class="row"><label>Auto columns</label><input :value="current('gridAutoColumns')" placeholder="auto" @input="setStyle('gridAutoColumns',$event.target.value)" /></div>
          <div class="row"><label>Auto rows</label><input :value="current('gridAutoRows')" placeholder="auto" @input="setStyle('gridAutoRows',$event.target.value)" /></div>
          <div class="row"><label>Justify items</label><select :value="current('justifyItems')" @change="setStyle('justifyItems',$event.target.value)"><option value="stretch">Stretch</option><option value="start">Start</option><option value="center">Center</option><option value="end">End</option></select></div>
          <div class="row"><label>Align items</label><select :value="current('alignItems')" @change="setStyle('alignItems',$event.target.value)"><option value="stretch">Stretch</option><option value="start">Start</option><option value="center">Center</option><option value="end">End</option></select></div>
        </div>
      </section>

      <section class="card">
        <button class="head" type="button" @click="toggle('typography')"><b>Typography</b><span>{{ open.typography ? '⌃' : '⌄' }}</span></button>
        <div v-if="open.typography" class="content">
          <div class="row"><label>Family</label><input :value="current('fontFamily')" placeholder="System" @input="setStyle('fontFamily',$event.target.value)" /></div>
          <div class="row"><label>Size</label><input :value="current('fontSize')" placeholder="16px" @input="setStyle('fontSize',$event.target.value)" /></div>
          <div class="row"><label>Weight</label><select :value="current('fontWeight')" @change="setStyle('fontWeight',$event.target.value)"><option value="">Default</option><option v-for="w in [100,200,300,400,500,600,700,800,900]" :key="w" :value="w">{{ w }}</option></select></div>
          <div class="row"><label>Line height</label><input :value="current('lineHeight')" placeholder="1.5" @input="setStyle('lineHeight',$event.target.value)" /></div>
          <div class="row"><label>Letter spacing</label><input :value="current('letterSpacing')" placeholder="0px" @input="setStyle('letterSpacing',$event.target.value)" /></div>
          <div class="row"><label>Align</label><select :value="current('textAlign')" @change="setStyle('textAlign',$event.target.value)"><option value="">Default</option><option>left</option><option>center</option><option>right</option><option>justify</option></select></div>
          <div class="row"><label>Transform</label><select :value="current('textTransform')" @change="setStyle('textTransform',$event.target.value)"><option value="">None</option><option>uppercase</option><option>lowercase</option><option>capitalize</option><option>none</option></select></div>
          <div class="row"><label>Decoration</label><select :value="current('textDecoration')" @change="setStyle('textDecoration',$event.target.value)"><option value="">Default</option><option>none</option><option>underline</option><option>line-through</option></select></div>
          <div class="color-row"><label>Text color</label><input type="color" :value="current('color') || '#111827'" @input="setStyle('color',$event.target.value)" /><input :value="current('color')" placeholder="#111827" @input="setStyle('color',$event.target.value)" /></div>
        </div>
      </section>

      <section class="card">
        <button class="head" type="button" @click="toggle('appearance')"><b>Appearance</b><span>{{ open.appearance ? '⌃' : '⌄' }}</span></button>
        <div v-if="open.appearance" class="content">
          <div class="color-row"><label>Background</label><input type="color" :value="current('backgroundColor') || '#ffffff'" @input="setStyle('backgroundColor',$event.target.value)" /><input :value="current('backgroundColor')" placeholder="transparent" @input="setStyle('backgroundColor',$event.target.value)" /></div>
          <div class="row"><label>Border width</label><input :value="current('borderWidth')" placeholder="0px" @input="setStyle('borderWidth',$event.target.value)" /></div>
          <div class="row"><label>Border style</label><select :value="current('borderStyle')" @change="setStyle('borderStyle',$event.target.value)"><option value="none">None</option><option value="solid">Solid</option><option value="dashed">Dashed</option><option value="dotted">Dotted</option><option value="double">Double</option></select></div>
          <div class="color-row"><label>Border color</label><input type="color" :value="current('borderColor') || '#e5e7eb'" @input="setStyle('borderColor',$event.target.value)" /><input :value="current('borderColor')" placeholder="#e5e7eb" @input="setStyle('borderColor',$event.target.value)" /></div>
          <div class="row"><label>Radius</label><input :value="current('borderRadius')" placeholder="0px" @input="setStyle('borderRadius',$event.target.value)" /></div>
          <div class="row"><label>Opacity</label><input type="range" min="0" max="1" step=".01" :value="current('opacity') || 1" @input="setStyle('opacity',$event.target.value)" /></div>
          <div class="row"><label>Overflow</label><select :value="current('overflow')" @change="setStyle('overflow',$event.target.value)"><option value="">Visible</option><option>hidden</option><option>auto</option><option>scroll</option></select></div>
          <div class="row"><label>Shadow</label><input :value="current('boxShadow')" placeholder="none" @input="setStyle('boxShadow',$event.target.value)" /></div>
        </div>
      </section>
    </div>
  </aside>
</template>

<style scoped>
.node-panel{width:100%;height:100%;display:flex;flex-direction:column;background:#f6f7f9;color:#0f172a;font:12px Inter,system-ui,sans-serif}
.panel-header{height:58px;flex:0 0 58px;display:flex;align-items:center;gap:10px;padding:0 14px;background:#fff;border-bottom:1px solid #e5e7eb}
.node-icon{width:34px;height:34px;display:grid;place-items:center;border-radius:10px;background:#3b82f6;color:#fff;font-size:14px}
.panel-header div:nth-child(2){display:flex;flex-direction:column;gap:2px}.panel-header span{font-size:9px;letter-spacing:.12em;font-weight:800;color:#94a3b8}.panel-header strong{font-size:13px}.panel-header code{margin-left:auto;max-width:110px;padding:4px 6px;border-radius:6px;background:#f1f5f9;color:#64748b;font-size:9px;overflow:hidden;text-overflow:ellipsis}
.body{flex:1;min-height:0;overflow:auto;padding:10px;display:flex;flex-direction:column;gap:8px}
.card{background:#fff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden}.head{width:100%;height:40px;padding:0 11px;border:0;background:#fff;display:flex;align-items:center;justify-content:space-between;color:#334155;cursor:pointer}.head:hover{background:#f8fafc}.content{padding:2px 10px 10px;display:flex;flex-direction:column;gap:7px}
.row{display:grid;grid-template-columns:86px minmax(0,1fr);align-items:center;gap:7px}.row label,.color-row label{font-size:10px;color:#64748b}.row input,.row select,.content input:not([type=file]):not([type=color]),.content textarea,.content select{width:100%;height:28px;box-sizing:border-box;border:1px solid #e2e8f0;border-radius:7px;background:#fff;padding:0 8px;color:#0f172a;font:11px Inter,system-ui,sans-serif;outline:0}.content textarea{height:auto;padding-top:7px;resize:vertical}.row input:focus,.row select:focus,.content input:focus,.content textarea:focus,.content select:focus{border-color:#60a5fa;box-shadow:0 0 0 3px rgba(59,130,246,.1)}
.spacing{padding-top:4px}.subhead{display:grid;grid-template-columns:1fr 90px 22px;gap:5px;align-items:center;margin-bottom:5px}.subhead b{font-size:10px;color:#475569}.subhead input{height:26px!important}.subhead button{height:24px;border:0;background:#f1f5f9;border-radius:5px;color:#64748b;cursor:pointer}.sides{display:grid;grid-template-columns:repeat(4,1fr);gap:5px}.sides input{text-align:center;padding:0 3px!important}.color-row{display:grid;grid-template-columns:86px 30px minmax(0,1fr);gap:6px;align-items:center}.color-row input[type=color]{width:30px;height:28px;padding:2px;border:1px solid #e2e8f0;border-radius:7px;background:#fff}.upload{display:flex;align-items:center;justify-content:center;gap:8px;height:32px;border:1px dashed #bfdbfe;border-radius:7px;background:#eff6ff;color:#2563eb;font-weight:700;font-size:10px;cursor:pointer}.upload input{display:none}.image-preview{display:block;width:100%;max-height:160px;object-fit:contain;border-radius:7px;border:1px solid #e2e8f0;background:#f8fafc}
</style>