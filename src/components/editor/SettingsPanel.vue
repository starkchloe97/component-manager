<script setup>
import { computed, ref } from "vue";
import { useComponentEditor } from "@/composables/useComponentEditor";

const { selectedElement, getStyles, setStyle } = useComponentEditor();
const element = computed(() => selectedElement.value);
const open = ref({ layout: true, spacing: true, typography: false, appearance: false });

const groups = [
  { key: "layout", title: "Layout", icon: "▦", keys: ["width", "maxWidth", "height", "display", "gap"] },
  { key: "spacing", title: "Spacing", icon: "↔", keys: ["padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft"] },
  { key: "typography", title: "Typography", icon: "T", keys: ["fontSize", "fontWeight", "lineHeight", "textAlign", "color"] },
  { key: "appearance", title: "Appearance", icon: "◐", keys: ["backgroundColor", "borderRadius", "opacity"] },
];
const labels = { width:"Width", maxWidth:"Max width", height:"Height", display:"Display", gap:"Gap", padding:"Padding", paddingTop:"Top", paddingRight:"Right", paddingBottom:"Bottom", paddingLeft:"Left", margin:"Margin", marginTop:"Top", marginRight:"Right", marginBottom:"Bottom", marginLeft:"Left", fontSize:"Size", fontWeight:"Weight", lineHeight:"Line height", textAlign:"Align", color:"Text", backgroundColor:"Background", borderRadius:"Radius", opacity:"Opacity" };
const unitKeys = new Set(["width","maxWidth","height","gap","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","margin","marginTop","marginRight","marginBottom","marginLeft","borderRadius","fontSize"]);
const colorKeys = new Set(["color","backgroundColor"]);

function current(key) { return element.value ? getStyles(element.value.componentId, element.value.selector)[key] ?? "" : ""; }
function update(key, raw) {
  if (!element.value) return;
  let next = String(raw ?? "").trim();
  if (unitKeys.has(key) && next && !/^(auto|initial|inherit|unset|none)$/i.test(next) && !/[a-z%]+$/i.test(next) && /^-?\d+(\.\d+)?$/.test(next)) next += "px";
  setStyle(element.value.componentId, element.value.selector, key, next);
}
function reset(key) { update(key, ""); }
function toggle(key) { open.value[key] = !open.value[key]; }
function isSet(key) { return !!current(key); }
</script>

<template>
  <aside class="settings-panel">
    <template v-if="element">
      <header class="settings-header">
        <div class="element-icon">✦</div>
        <div class="element-meta"><span>EDITING</span><strong>{{ element.label }}</strong></div>
        <code>.{{ element.selector }}</code>
      </header>

      <div class="settings-body">
        <section v-for="group in groups" :key="group.key" class="settings-group">
          <button class="group-head" type="button" @click="toggle(group.key)">
            <span class="group-icon">{{ group.icon }}</span><span>{{ group.title }}</span><span class="group-count">{{ group.keys.filter(isSet).length || "" }}</span><span class="chevron" :class="{ closed: !open[group.key] }">⌄</span>
          </button>
          <div v-show="open[group.key]" class="group-content">
            <div v-for="key in group.keys" :key="key" class="control">
              <span class="control-label">{{ labels[key] }}</span>
              <div v-if="colorKeys.has(key)" class="color-control">
                <input type="color" :value="/^#[0-9a-f]{6}$/i.test(current(key)) ? current(key) : '#000000'" @input="update(key, $event.target.value)" />
                <input :value="current(key)" placeholder="#000000" @input="update(key, $event.target.value)" />
              </div>
              <select v-else-if="key === 'display'" :value="current(key)" @change="update(key, $event.target.value)"><option value="">Default</option><option value="block">Block</option><option value="flex">Flex</option><option value="grid">Grid</option><option value="inline-block">Inline</option><option value="none">None</option></select>
              <select v-else-if="key === 'textAlign'" :value="current(key)" @change="update(key, $event.target.value)"><option value="">Default</option><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option><option value="justify">Justify</option></select>
              <div v-else class="input-wrap"><input :value="current(key)" :placeholder="unitKeys.has(key) ? 'Auto' : 'Default'" @input="update(key, $event.target.value)" /><button v-if="isSet(key)" type="button" title="Reset" @click="reset(key)">×</button><em v-if="unitKeys.has(key) && current(key) && /^-?\d/.test(current(key))">px</em></div>
            </div>
          </div>
        </section>
      </div>
    </template>
    <div v-else class="empty"><div class="empty-icon">⌖</div><strong>Select an element</strong><span>Click an element in the preview to edit its styles.</span></div>
  </aside>
</template>

<style scoped>
.settings-panel{width:268px;flex:0 0 268px;height:100%;display:flex;flex-direction:column;background:#fff;border-left:1px solid #e5e7eb;color:#334155;font-family:Inter,system-ui,sans-serif;overflow:hidden}.settings-header{height:58px;box-sizing:border-box;display:flex;align-items:center;gap:9px;padding:9px 11px;border-bottom:1px solid #edf0f3}.element-icon{width:25px;height:25px;display:grid;place-items:center;border-radius:6px;background:#eff6ff;color:#2563eb;font-size:11px}.element-meta{min-width:0;display:flex;flex-direction:column;line-height:1.15}.element-meta span{font-size:7px;font-weight:800;letter-spacing:.13em;color:#9aa3af}.element-meta strong{margin-top:2px;font-size:12px;color:#1f2937;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.settings-header code{max-width:75px;margin-left:auto;font-size:8px;color:#a1a8b2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.settings-body{overflow:auto;scrollbar-width:thin}.settings-group{border-bottom:1px solid #edf0f3}.group-head{width:100%;height:37px;padding:0 11px;border:0;background:#fff;display:flex;align-items:center;gap:8px;text-align:left;color:#374151;cursor:pointer}.group-head:hover{background:#fafbfc}.group-icon{width:16px;text-align:center;color:#64748b;font-size:10px}.group-head>span:nth-child(2){font-size:10px;font-weight:750}.group-count{margin-left:auto;min-width:15px;height:15px;padding:0 4px;box-sizing:border-box;border-radius:8px;background:#eff6ff;color:#2563eb;font-size:8px;text-align:center;line-height:15px}.chevron{margin-left:2px;color:#9ca3af;font-size:11px;transition:transform .15s}.chevron.closed{transform:rotate(-90deg)}.group-content{padding:3px 11px 8px}.control{min-height:29px;display:grid;grid-template-columns:78px minmax(0,1fr);align-items:center;gap:7px}.control-label{font-size:9px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.input-wrap,.color-control{height:24px;min-width:0;display:flex;align-items:center;border:1px solid #dfe3e8;border-radius:5px;background:#fff;box-sizing:border-box}.input-wrap:focus-within,.color-control:focus-within{border-color:#9db8e8;box-shadow:0 0 0 2px rgba(59,130,246,.06)}.settings-panel input,.settings-panel select{height:22px;min-width:0;width:100%;border:0;outline:0;background:transparent;padding:0 6px;color:#374151;font:inherit;font-size:9px;box-sizing:border-box}.input-wrap button{width:17px;height:20px;border:0;background:transparent;color:#a0a7b0;padding:0;cursor:pointer;font-size:12px}.input-wrap em{padding-right:5px;color:#a0a7b0;font-size:8px;font-style:normal}.color-control{gap:2px;padding:2px}.color-control input[type=color]{width:25px;height:18px;padding:0;cursor:pointer}.empty{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:20px;text-align:center;color:#9ca3af}.empty-icon{font-size:23px;color:#c4cbd4}.empty strong{font-size:11px;color:#64748b}.empty span{font-size:9px;line-height:1.5}
</style>
