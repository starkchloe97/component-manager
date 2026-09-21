<script setup>
import { computed, ref } from "vue";
import { useComponentEditor } from "@/composables/useComponentEditor";

const { selectedElement, getStyles, setStyle, getContent, setContent, resetContent } = useComponentEditor();
const element = computed(() => selectedElement.value);
const open = ref({ content:true, layout:true, spacing:true, flex:false, grid:false, typography:true, appearance:false });

const unitKeys = new Set(["width","maxWidth","minWidth","height","minHeight","gap","columnGap","rowGap","flexBasis","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","margin","marginTop","marginRight","marginBottom","marginLeft","fontSize","letterSpacing","borderWidth","borderRadius"]);
const numericKeys = new Set(["zIndex","flexGrow","flexShrink"]);
function current(key){ return element.value ? getStyles(element.value.componentId, element.value.selector)[key] ?? "" : ""; }
function currentContent(){
  if (!element.value?.editableText) return "";
  return getContent(element.value.componentId, element.value.contentSelector) ?? element.value.textValue ?? "";
}
function updateContent(value){
  if (!element.value?.editableText) return;
  setContent(
    element.value.componentId,
    element.value.contentSelector,
    value,
    {
      originalText: element.value.textValue,
      occurrence: element.value.textOccurrence,
      tag: element.value.tag,
      className: element.value.className,
    },
  );
}
function resetTextContent(){
  if (!element.value?.editableText) return;
  resetContent(element.value.componentId, element.value.contentSelector);
}
function normalize(key, raw){
  let v=String(raw ?? "").trim();
  if(!v) return "";
  if(unitKeys.has(key) && /^-?\d+(\.\d+)?$/.test(v)) return v+"px";
  if(numericKeys.has(key) && !/^-?\d+(\.\d+)?$/.test(v)) return "";
  return v;
}
function update(key,value){ if(element.value) setStyle(element.value.componentId,element.value.selector,key,normalize(key,value)); }
function reset(key){ update(key,""); }
function toggle(key){open.value[key]=!open.value[key];}
const display=computed(()=>current("display"));
const isFlex=computed(()=>display.value==="flex");
const isGrid=computed(()=>display.value==="grid");
</script>

<template>
<aside v-if="element" class="panel">
<header><div class="icon">✦</div><div><span>EDITING</span><strong>{{ element.label }}</strong></div><code>{{ element.selector }}</code></header>
<div class="body"><section v-if="element.editableText" class="card content-card">
<button class="head" type="button" @click="toggle('content')">
<b>Content</b>
<span>{{open.content?'⌃':'⌄'}}</span>
</button>
<div v-if="open.content" class="content content-editor">
<textarea
  :value="currentContent()"
  rows="5"
  :placeholder="element.tag === 'a' || element.tag === 'button' ? 'Enter text…' : 'Edit text content…'"
  @input="updateContent($event.target.value)"
></textarea>
<div class="content-actions">
  <span>Changes are saved automatically.</span>
  <button
    v-if="currentContent() !== element.textValue"
    type="button"
    @click="resetTextContent"
  >Reset</button>
</div>
</div>
</section>


<section class="card">
<button class="head" @click="toggle('layout')"><b>Layout</b><span>{{open.layout?'⌃':'⌄'}}</span></button>
<div v-if="open.layout" class="content">
<div class="row"><label>Width</label><input :value="current('width')" placeholder="Auto" @input="update('width',$event.target.value)"></div>
<div class="row"><label>Max width</label><input :value="current('maxWidth')" placeholder="None" @input="update('maxWidth',$event.target.value)"></div>
<div class="row"><label>Height</label><input :value="current('height')" placeholder="Auto" @input="update('height',$event.target.value)"></div>
<div class="row"><label>Min height</label><input :value="current('minHeight')" placeholder="Auto" @input="update('minHeight',$event.target.value)"></div>
<div class="row"><label>Display</label><select :value="current('display')" @change="update('display',$event.target.value)"><option value="">Default</option><option>block</option><option>inline-block</option><option>flex</option><option>grid</option><option>none</option></select></div>
<div class="row"><label>Position</label><select :value="current('position')" @change="update('position',$event.target.value)"><option value="">Static</option><option>relative</option><option>absolute</option><option>sticky</option><option>fixed</option></select></div>
<div class="row"><label>Z-index</label><input :value="current('zIndex')" placeholder="Auto" @input="update('zIndex',$event.target.value)"></div>
</div></section>

<section class="card">
<button class="head" @click="toggle('spacing')"><b>Spacing</b><span>{{open.spacing?'⌃':'⌄'}}</span></button>
<div v-if="open.spacing" class="content">
<div v-for="box in [['padding','Padding'],['margin','Margin']]" :key="box[0]" class="spacing">
<div class="subhead"><b>{{box[1]}}</b><input :value="current(box[0])" placeholder="All" @input="update(box[0],$event.target.value)"></div>
<div class="sides"><input v-for="side in ['Top','Right','Bottom','Left']" :key="side" :value="current(box[0]+side)" :placeholder="side[0]" @input="update(box[0]+side,$event.target.value)"></div>
</div>
</div></section>

<section v-if="isFlex" class="card">
<button class="head" @click="toggle('flex')"><b>Flexbox</b><span>{{open.flex?'⌃':'⌄'}}</span></button>
<div v-if="open.flex" class="content">
<div class="row"><label>Direction</label><select :value="current('flexDirection')" @change="update('flexDirection',$event.target.value)"><option>row</option><option>row-reverse</option><option>column</option><option>column-reverse</option></select></div>
<div class="row"><label>Wrap</label><select :value="current('flexWrap')" @change="update('flexWrap',$event.target.value)"><option>nowrap</option><option>wrap</option><option>wrap-reverse</option></select></div>
<div class="row"><label>Justify</label><select :value="current('justifyContent')" @change="update('justifyContent',$event.target.value)"><option>flex-start</option><option>center</option><option>flex-end</option><option>space-between</option><option>space-around</option><option>space-evenly</option></select></div>
<div class="row"><label>Align</label><select :value="current('alignItems')" @change="update('alignItems',$event.target.value)"><option>stretch</option><option>flex-start</option><option>center</option><option>flex-end</option><option>baseline</option></select></div>
<div class="row"><label>Align content</label><select :value="current('alignContent')" @change="update('alignContent',$event.target.value)"><option>normal</option><option>stretch</option><option>flex-start</option><option>center</option><option>flex-end</option><option>space-between</option></select></div>
<div class="row"><label>Gap</label><input :value="current('gap')" placeholder="0px" @input="update('gap',$event.target.value)"></div>
<div class="row"><label>Column gap</label><input :value="current('columnGap')" placeholder="0px" @input="update('columnGap',$event.target.value)"></div>
<div class="row"><label>Row gap</label><input :value="current('rowGap')" placeholder="0px" @input="update('rowGap',$event.target.value)"></div>
<div class="row"><label>Grow</label><input :value="current('flexGrow')" placeholder="0" @input="update('flexGrow',$event.target.value)"></div>
<div class="row"><label>Shrink</label><input :value="current('flexShrink')" placeholder="1" @input="update('flexShrink',$event.target.value)"></div>
<div class="row"><label>Basis</label><input :value="current('flexBasis')" placeholder="auto" @input="update('flexBasis',$event.target.value)"></div>
</div></section>

<section v-if="isGrid" class="card">
<button class="head" @click="toggle('grid')"><b>Grid</b><span>{{open.grid?'⌃':'⌄'}}</span></button>
<div v-if="open.grid" class="content">
<div class="row"><label>Columns</label><input :value="current('gridTemplateColumns')" placeholder="1fr 1fr" @input="update('gridTemplateColumns',$event.target.value)"></div>
<div class="row"><label>Rows</label><input :value="current('gridTemplateRows')" placeholder="auto" @input="update('gridTemplateRows',$event.target.value)"></div>
<div class="row"><label>Auto columns</label><input :value="current('gridAutoColumns')" placeholder="auto" @input="update('gridAutoColumns',$event.target.value)"></div>
<div class="row"><label>Auto rows</label><input :value="current('gridAutoRows')" placeholder="auto" @input="update('gridAutoRows',$event.target.value)"></div>
<div class="row"><label>Justify items</label><select :value="current('justifyItems')" @change="update('justifyItems',$event.target.value)"><option>stretch</option><option>start</option><option>center</option><option>end</option></select></div>
<div class="row"><label>Align items</label><select :value="current('alignItems')" @change="update('alignItems',$event.target.value)"><option>stretch</option><option>start</option><option>center</option><option>end</option></select></div>
<div class="row"><label>Justify content</label><select :value="current('justifyContent')" @change="update('justifyContent',$event.target.value)"><option>normal</option><option>start</option><option>center</option><option>end</option><option>space-between</option><option>space-around</option><option>space-evenly</option></select></div>
<div class="row"><label>Align content</label><select :value="current('alignContent')" @change="update('alignContent',$event.target.value)"><option>normal</option><option>start</option><option>center</option><option>end</option><option>space-between</option></select></div>
</div></section>

<section class="card">
<button class="head" @click="toggle('typography')"><b>Typography</b><span>{{open.typography?'⌃':'⌄'}}</span></button>
<div v-if="open.typography" class="content">
<div class="row"><label>Family</label><input :value="current('fontFamily')" placeholder="System" @input="update('fontFamily',$event.target.value)"></div>
<div class="row"><label>Size</label><input :value="current('fontSize')" placeholder="16px" @input="update('fontSize',$event.target.value)"></div>
<div class="row"><label>Weight</label><select :value="current('fontWeight')" @change="update('fontWeight',$event.target.value)"><option value="">Default</option><option v-for="w in [100,200,300,400,500,600,700,800,900]" :key="w">{{w}}</option></select></div>
<div class="row"><label>Line height</label><input :value="current('lineHeight')" placeholder="1.5" @input="update('lineHeight',$event.target.value)"></div>
<div class="row"><label>Letter spacing</label><input :value="current('letterSpacing')" placeholder="0px" @input="update('letterSpacing',$event.target.value)"></div>
<div class="row"><label>Align</label><select :value="current('textAlign')" @change="update('textAlign',$event.target.value)"><option value="">Default</option><option>left</option><option>center</option><option>right</option><option>justify</option></select></div>
<div class="row"><label>Transform</label><select :value="current('textTransform')" @change="update('textTransform',$event.target.value)"><option value="">None</option><option>uppercase</option><option>lowercase</option><option>capitalize</option><option>none</option></select></div>
<div class="row"><label>Decoration</label><select :value="current('textDecoration')" @change="update('textDecoration',$event.target.value)"><option value="">Default</option><option>none</option><option>underline</option><option>overline</option><option>line-through</option></select></div>
<div class="color"><label>Text</label><input type="color" :value="current('color')||'#111827'" @input="update('color',$event.target.value)"><input :value="current('color')" placeholder="#111827" @input="update('color',$event.target.value)"></div>
</div></section>

<section class="card">
<button class="head" @click="toggle('appearance')"><b>Appearance</b><span>{{open.appearance?'⌃':'⌄'}}</span></button>
<div v-if="open.appearance" class="content">
<div class="color"><label>Background</label><input type="color" :value="current('backgroundColor')||'#ffffff'" @input="update('backgroundColor',$event.target.value)"><input :value="current('backgroundColor')" placeholder="transparent" @input="update('backgroundColor',$event.target.value)"></div>
<div class="row"><label>Border width</label><input :value="current('borderWidth')" placeholder="0px" @input="update('borderWidth',$event.target.value)"></div>
<div class="row"><label>Border style</label><select :value="current('borderStyle')" @change="update('borderStyle',$event.target.value)"><option>none</option><option>solid</option><option>dashed</option><option>dotted</option><option>double</option></select></div>
<div class="color"><label>Border color</label><input type="color" :value="current('borderColor')||'#e5e7eb'" @input="update('borderColor',$event.target.value)"><input :value="current('borderColor')" placeholder="#e5e7eb" @input="update('borderColor',$event.target.value)"></div>
<div class="row"><label>Radius</label><input :value="current('borderRadius')" placeholder="0px" @input="update('borderRadius',$event.target.value)"></div>
<div class="row"><label>Opacity</label><input type="range" min="0" max="1" step=".01" :value="current('opacity')||1" @input="update('opacity',$event.target.value)"></div>
<div class="row"><label>Overflow</label><select :value="current('overflow')" @change="update('overflow',$event.target.value)"><option value="">Visible</option><option>hidden</option><option>auto</option><option>scroll</option></select></div>
<div class="row"><label>Shadow</label><input :value="current('boxShadow')" placeholder="none" @input="update('boxShadow',$event.target.value)"></div>
</div></section>
</div></aside>
</template>

<style scoped>
.panel{width:100%;height:100%;display:flex;flex-direction:column;background:#f6f7f9;color:#0f172a;font:12px Inter,system-ui,sans-serif}.panel header{height:58px;flex:0 0 58px;display:flex;align-items:center;gap:10px;padding:0 14px;background:#fff;border-bottom:1px solid #e5e7eb}.icon{width:34px;height:34px;display:grid;place-items:center;border-radius:10px;background:#3b82f6;color:#fff}.panel header div:nth-child(2){display:flex;flex-direction:column;gap:2px}.panel header span{font-size:9px;font-weight:800;letter-spacing:.12em;color:#94a3b8}.panel header strong{font-size:13px}.panel header code{margin-left:auto;max-width:110px;padding:4px 6px;border-radius:6px;background:#f1f5f9;color:#64748b;font-size:9px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.body{flex:1;min-height:0;overflow:auto;padding:10px;display:flex;flex-direction:column;gap:8px}.card{background:#fff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden}.head{width:100%;height:40px;border:0;background:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 11px;color:#334155;cursor:pointer}.head:hover{background:#f8fafc}.content{padding:2px 10px 10px;display:flex;flex-direction:column;gap:7px}
.content-editor textarea{
  width:100%;
  min-height:92px;
  resize:vertical;
  box-sizing:border-box;
  padding:9px 10px;
  border:1px solid #e2e8f0;
  border-radius:7px;
  background:#fff;
  color:#0f172a;
  font:11px/1.5 Inter,system-ui,sans-serif;
  outline:0;
}
.content-editor textarea:hover{border-color:#cbd5e1}
.content-editor textarea:focus{border-color:#60a5fa;box-shadow:0 0 0 3px rgba(59,130,246,.1)}
.content-actions{display:flex;align-items:center;justify-content:space-between;gap:8px;color:#94a3b8;font-size:9px}
.content-actions button{border:0;background:transparent;color:#2563eb;font:600 10px Inter,system-ui,sans-serif;cursor:pointer;padding:2px 0}
.content-actions button:hover{text-decoration:underline}.row{display:grid;grid-template-columns:86px minmax(0,1fr);align-items:center;gap:7px}.row label,.color label{font-size:10px;color:#64748b}.row input,.row select,.content input:not([type=color]),.content select{width:100%;height:28px;box-sizing:border-box;border:1px solid #e2e8f0;border-radius:7px;background:#fff;padding:0 8px;color:#0f172a;font:11px Inter,system-ui,sans-serif;outline:0}.row input:focus,.row select:focus,.content input:focus,.content select:focus{border-color:#60a5fa;box-shadow:0 0 0 3px rgba(59,130,246,.1)}.spacing{padding-top:3px}.subhead{display:grid;grid-template-columns:1fr 90px;gap:5px;align-items:center;margin-bottom:5px}.subhead b{font-size:10px;color:#475569}.sides{display:grid;grid-template-columns:repeat(4,1fr);gap:5px}.sides input{text-align:center}.color{display:grid;grid-template-columns:86px 30px minmax(0,1fr);gap:6px;align-items:center}.color input[type=color]{width:30px;height:28px;padding:2px;border:1px solid #e2e8f0;border-radius:7px}
</style>