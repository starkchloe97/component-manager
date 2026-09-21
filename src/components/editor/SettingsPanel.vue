<script setup>
import { computed, ref } from "vue";
import { useComponentEditor } from "@/composables/useComponentEditor";

const { selectedElement, getStyles, setStyle } = useComponentEditor();
const element = computed(() => selectedElement.value);
const open = ref({ layout: true, spacing: true, typography: false, appearance: false });

const groups = [
  { key: "layout", title: "Layout", keys: ["width", "maxWidth", "height", "display", "gap"] },
  { key: "spacing", title: "Spacing", keys: ["padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft"] },
  { key: "typography", title: "Typography", keys: ["fontSize", "fontWeight", "lineHeight", "textAlign", "color"] },
  { key: "appearance", title: "Appearance", keys: ["backgroundColor", "borderRadius", "opacity"] },
];

const labels = { width:"Width", maxWidth:"Max width", height:"Height", display:"Display", gap:"Gap", padding:"Padding", paddingTop:"Top", paddingRight:"Right", paddingBottom:"Bottom", paddingLeft:"Left", margin:"Margin", marginTop:"Top", marginRight:"Right", marginBottom:"Bottom", marginLeft:"Left", fontSize:"Size", fontWeight:"Weight", lineHeight:"Line height", textAlign:"Align", color:"Text", backgroundColor:"Background", borderRadius:"Radius", opacity:"Opacity" };
const unitKeys = new Set(["width","maxWidth","height","gap","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","margin","marginTop","marginRight","marginBottom","marginLeft","borderRadius","fontSize"]);

const groupRows = {
  layout: [
    { key: "width", type: "unit" },
    { key: "maxWidth", type: "unit" },
    { key: "height", type: "unit" },
    { key: "display", type: "select", options: [
      { v: "", l: "Default" }, { v: "block", l: "Block" }, { v: "flex", l: "Flex" },
      { v: "grid", l: "Grid" }, { v: "inline-block", l: "Inline" }, { v: "none", l: "None" },
    ]},
    { key: "gap", type: "unit" },
  ],
  typography: [
    { key: "fontSize", type: "unit" },
    { key: "fontWeight", type: "select", options: [
      { v: "", l: "Default" }, { v: "100", l: "Thin · 100" }, { v: "200", l: "ExtraLight · 200" },
      { v: "300", l: "Light · 300" }, { v: "400", l: "Regular · 400" }, { v: "500", l: "Medium · 500" },
      { v: "600", l: "Semibold · 600" }, { v: "700", l: "Bold · 700" }, { v: "800", l: "ExtraBold · 800" },
      { v: "900", l: "Black · 900" },
    ]},
    { key: "lineHeight", type: "text", placeholder: "1.5" },
    { key: "textAlign", type: "align" },
    { key: "color", type: "color" },
  ],
  appearance: [
    { key: "backgroundColor", type: "color" },
    { key: "borderRadius", type: "radius" },
    { key: "opacity", type: "opacity" },
  ],
};

const spacingBoxes = [
  { base: "padding", label: "Padding", sides: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"] },
  { base: "margin", label: "Margin", sides: ["marginTop", "marginRight", "marginBottom", "marginLeft"] },
];
const sideAbbr = ["T", "R", "B", "L"];

const aligns = [
  { v: "left", label: "Align left" },
  { v: "center", label: "Align center" },
  { v: "right", label: "Align right" },
  { v: "justify", label: "Justify" },
];

const icons = {
  layout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>`,
  spacing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 8 22 12 18 16"/><polyline points="6 8 2 12 6 16"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`,
  typography: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
  appearance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" stroke="none"/></svg>`,
};

/* ---- core logic (unchanged behavior) ---- */
function current(key) { return element.value ? getStyles(element.value.componentId, element.value.selector)[key] ?? "" : ""; }
function update(key, raw) {
  if (!element.value) return;
  let next = String(raw ?? "").trim();
  if (unitKeys.has(key) && next && !/^(auto|initial|inherit|unset|none)$/i.test(next) && !/[a-z%]+$/i.test(next) && /^-?\d+(\.\d+)?$/.test(next)) next += "px";
  setStyle(element.value.componentId, element.value.selector, key, next);
}
function reset(key) { update(key, ""); }
function resetGroup(group) { if (!element.value) return; group.keys.forEach(k => setStyle(element.value.componentId, element.value.selector, k, "")); }
function toggle(key) { open.value[key] = !open.value[key]; }
function isSet(key) { return !!current(key); }
function countSet(group) { return group.keys.filter(isSet).length; }
function hasPx(key) { const v = current(key); return unitKeys.has(key) && /^-?\d+(\.\d+)?$/.test(v); }

/* ---- derived values for sliders / swatches ---- */
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
function firstNum(key, fallback) { const v = parseFloat(current(key)); return Number.isFinite(v) ? v : fallback; }
const opacityPct = computed(() => Math.round(clamp(firstNum("opacity", 1), 0, 1) * 100));
const radiusPx = computed(() => clamp(firstNum("borderRadius", 0), 0, 64));

function setOpacityPercent(e) {
  const raw = String(e.target.value ?? "").replace(/%/g, "").trim();
  if (!raw) return reset("opacity");
  const n = parseFloat(raw);
  if (Number.isFinite(n)) update("opacity", String(clamp(n, 0, 100) / 100));
}
function swatchColor(key) { const v = current(key); return /^#[0-9a-f]{3,8}$/i.test(v) ? v : "transparent"; }
function colorInputValue(key) { const v = current(key); return /^#[0-9a-f]{6}$/i.test(v) ? v : "#000000"; }
</script>

<template>
  <aside class="settings-panel">
    <template v-if="element">
      <header class="panel-header">
        <div class="element-icon">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
            <path d="M12 3c.62 4.1 2.28 5.76 6.38 6.38v1.24C14.28 11.24 12.62 12.9 12 17c-.62-4.1-2.28-5.76-6.38-6.38V9.38C9.72 8.76 11.38 7.1 12 3z"/>
          </svg>
        </div>
        <div class="element-meta">
          <span class="eyebrow">Editing</span>
          <strong class="element-name">{{ element.label }}</strong>
        </div>
        <code class="selector-chip" :title="`.${element.selector}`">.{{ element.selector }}</code>
      </header>

      <div class="settings-body">
        <section v-for="group in groups" :key="group.key" class="group-card">
          <button class="group-head" type="button" :aria-expanded="open[group.key]" @click="toggle(group.key)">
            <span class="group-icon" v-html="icons[group.key]" />
            <span class="group-title">{{ group.title }}</span>
            <Transition name="pop">
              <span v-if="countSet(group)" class="group-count">{{ countSet(group) }}</span>
            </Transition>
            <span class="head-spacer" />
            <span
              v-if="countSet(group)"
              class="icon-btn group-reset"
              title="Reset section"
              @click.stop="resetGroup(group)"
            ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg></span>
            <span class="chevron" :class="{ closed: !open[group.key] }">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </span>
          </button>

          <div class="acc" :class="{ open: open[group.key] }">
            <div class="acc-inner" :inert="!open[group.key]">
              <div class="group-content">
                <!-- Spacing: compact "all + 4 sides" boxes -->
                <template v-if="group.key === 'spacing'">
                  <div v-for="box in spacingBoxes" :key="box.base" class="spacing-box">
                    <div class="box-head">
                      <span class="control-label">{{ box.label }}</span>
                      <div class="box-tools">
                        <div class="input-wrap all-input" :class="{ set: isSet(box.base) }">
                          <input :value="current(box.base)" placeholder="All" @input="update(box.base, $event.target.value)" />
                          <em v-if="hasPx(box.base)">px</em>
                        </div>
                        <button v-if="isSet(box.base)" class="icon-btn" type="button" title="Reset" @click="reset(box.base)">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                      </div>
                    </div>
                    <div class="side-grid">
                      <label v-for="(side, i) in box.sides" :key="side" class="side" :title="labels[side]">
                        <input :value="current(side)" :placeholder="sideAbbr[i]" :class="{ set: isSet(side) }" @input="update(side, $event.target.value)" />
                      </label>
                    </div>
                  </div>
                </template>

                <!-- All other groups -->
                <template v-else>
                  <div v-for="row in groupRows[group.key]" :key="row.key" class="control">
                    <span class="control-label">{{ row.label || labels[row.key] }}</span>
                    <div class="field" :class="{ column: row.type === 'radius' }">

                      <template v-if="row.type === 'unit' || row.type === 'text'">
                        <div class="input-wrap">
                          <input :value="current(row.key)" :placeholder="row.placeholder || (row.type === 'unit' ? 'Auto' : 'Default')" @input="update(row.key, $event.target.value)" />
                          <em v-if="hasPx(row.key)">px</em>
                        </div>
                        <button v-if="isSet(row.key)" class="icon-btn" type="button" title="Reset" @click="reset(row.key)">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                      </template>

                      <template v-else-if="row.type === 'select'">
                        <select class="select" :value="current(row.key)" @change="update(row.key, $event.target.value)">
                          <option v-for="opt in row.options" :key="opt.v" :value="opt.v">{{ opt.l }}</option>
                        </select>
                        <button v-if="isSet(row.key)" class="icon-btn" type="button" title="Reset" @click="reset(row.key)">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                      </template>

                      <template v-else-if="row.type === 'align'">
                        <div class="segmented">
                          <button
                            v-for="a in aligns" :key="a.v" type="button"
                            :class="{ active: current(row.key) === a.v }"
                            :title="a.label"
                            @click="update(row.key, a.v)"
                          >
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                              <path d="M4 6h16M4 18h16" />
                              <path v-if="a.v === 'left'" d="M4 12h9" />
                              <path v-else-if="a.v === 'center'" d="M7.5 12h9" />
                              <path v-else-if="a.v === 'right'" d="M11 12h9" />
                              <path v-else d="M4 12h16" />
                            </svg>
                          </button>
                        </div>
                        <button v-if="isSet(row.key)" class="icon-btn" type="button" title="Reset" @click="reset(row.key)">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                      </template>

                      <template v-else-if="row.type === 'color'">
                        <label class="swatch" :style="{ backgroundColor: swatchColor(row.key) }" title="Pick color">
                          <input type="color" :value="colorInputValue(row.key)" @input="update(row.key, $event.target.value)" />
                        </label>
                        <div class="input-wrap">
                          <input :value="current(row.key)" placeholder="#000000" spellcheck="false" @input="update(row.key, $event.target.value)" />
                        </div>
                        <button v-if="isSet(row.key)" class="icon-btn" type="button" title="Reset" @click="reset(row.key)">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                      </template>

                      <template v-else-if="row.type === 'radius'">
                        <div class="stack">
                          <div class="stack-row">
                            <div class="input-wrap">
                              <input :value="current(row.key)" placeholder="0" @input="update(row.key, $event.target.value)" />
                              <em v-if="hasPx(row.key)">px</em>
                            </div>
                            <button v-if="isSet(row.key)" class="icon-btn" type="button" title="Reset" @click="reset(row.key)">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                          </div>
                          <input
                            type="range" class="slider" min="0" max="64" step="1"
                            :value="radiusPx"
                            :style="{ '--fill': (radiusPx / 64) * 100 + '%' }"
                            @input="update(row.key, $event.target.value + 'px')"
                          />
                        </div>
                      </template>

                      <template v-else-if="row.type === 'opacity'">
                        <div class="opacity-row">
                          <input
                            type="range" class="slider" min="0" max="100" step="1"
                            :value="opacityPct"
                            :style="{ '--fill': opacityPct + '%' }"
                            @input="update('opacity', $event.target.value / 100)"
                          />
                          <div class="opacity-val">
                            <input :value="opacityPct" @change="setOpacityPercent($event)" />
                            <span>%</span>
                          </div>
                          <button v-if="isSet('opacity')" class="icon-btn" type="button" title="Reset" @click="reset('opacity')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                          </button>
                        </div>
                      </template>

                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </section>
      </div>
    </template>

    <div v-else class="empty">
      <div class="empty-art">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
          <path d="M5 4l6.8 15 2.2-6.2 6-2.6z" />
        </svg>
      </div>
      <strong>Select an element</strong>
      <span>Click any element in the preview<br />to start editing its styles.</span>
    </div>
  </aside>
</template>

<style scoped>
.settings-panel {
  --panel-w: 288px;
  --bg: #f6f7f9;
  --surface: #ffffff;
  --border: #e7eaf0;
  --border-strong: #d9dee7;
  --text: #0f172a;
  --text-2: #5c6675;
  --text-3: #9aa3b2;
  --accent: #3b82f6;
  --accent-soft: #eef4ff;
  --accent-ring: rgba(59, 130, 246, 0.15);

  width: var(--panel-w);
  flex: 0 0 var(--panel-w);
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  border-left: 1px solid var(--border);
  color: var(--text);
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}
.settings-panel *, .settings-panel *::before, .settings-panel *::after { box-sizing: border-box; }
.settings-panel button { font: inherit; color: inherit; }

/* ---------- Header ---------- */
.panel-header {
  flex: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}
.element-icon {
  flex: none;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  color: #fff;
  background: linear-gradient(135deg, #60a5fa, #2563eb);
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.35);
}
.element-meta { min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.eyebrow { font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-3); }
.element-name { font-size: 13px; font-weight: 650; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.selector-chip {
  flex: none;
  max-width: 84px;
  margin-left: auto;
  padding: 3px 7px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  color: var(--text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ---------- Body / cards ---------- */
.settings-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: thin;
  scrollbar-color: #d5dbe5 transparent;
}
.settings-body::-webkit-scrollbar { width: 10px; }
.settings-body::-webkit-scrollbar-thumb { background: #d5dbe5; border-radius: 99px; border: 3px solid var(--bg); }
.settings-body::-webkit-scrollbar-thumb:hover { background: #c2cad6; }

.group-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.group-card:hover { border-color: var(--border-strong); box-shadow: 0 2px 6px rgba(16, 24, 40, 0.06); }

/* ---------- Accordion ---------- */
.group-head {
  width: 100%;
  height: 42px;
  padding: 0 10px;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s;
}
.group-head:hover { background: #fafbfd; }
.group-head:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; border-radius: 10px; }
.group-icon {
  flex: none;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text-2);
}
.group-icon :deep(svg) { width: 12px; height: 12px; }
.group-title { font-size: 12px; font-weight: 600; letter-spacing: 0.01em; }
.head-spacer { flex: 1; }
.group-count {
  min-width: 17px;
  height: 17px;
  padding: 0 5px;
  display: grid;
  place-items: center;
  border-radius: 99px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 9px;
  font-weight: 700;
  line-height: 1;
}
.pop-enter-active, .pop-leave-active { transition: transform 0.18s, opacity 0.18s; }
.pop-enter-from, .pop-leave-to { transform: scale(0.5); opacity: 0; }
.chevron { flex: none; display: grid; place-items: center; color: var(--text-3); transition: transform 0.25s; }
.chevron svg { width: 13px; height: 13px; }
.chevron.closed { transform: rotate(-90deg); }

.acc { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.acc.open { grid-template-rows: 1fr; }
.acc-inner { overflow: hidden; min-height: 0; }
.group-content { padding: 2px 10px 10px; }

/* ---------- Controls ---------- */
.control {
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  min-height: 32px;
}
.control-label { font-size: 11px; color: var(--text-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.field { display: flex; align-items: center; gap: 5px; min-width: 0; flex: 1; }
.field.column { flex-direction: column; align-items: stretch; gap: 5px; }
.stack { display: flex; flex-direction: column; gap: 5px; width: 100%; }
.stack-row { display: flex; align-items: center; gap: 5px; }

.input-wrap {
  flex: 1;
  min-width: 0;
  height: 28px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.input-wrap:hover { border-color: var(--border-strong); }
.input-wrap:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-ring); }
.input-wrap input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  padding: 0;
  font: inherit;
  font-size: 12px;
  color: var(--text);
}
.input-wrap input::placeholder, .side input::placeholder { color: #bcc4d1; }
.input-wrap em { flex: none; font-style: normal; font-size: 10px; color: var(--text-3); user-select: none; }
.input-wrap.set { border-color: #bcd3fa; background: var(--accent-soft); }

.select {
  flex: 1;
  min-width: 0;
  height: 28px;
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface) url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239aa3b2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 7px center / 12px;
  padding: 0 26px 0 9px;
  font: inherit;
  font-size: 12px;
  color: var(--text);
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.select:hover { border-color: var(--border-strong); }
.select:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-ring); }

.icon-btn {
  flex: none;
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #b7c0cd;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, transform 0.1s;
}
.icon-btn:hover { background: #eef1f6; color: var(--text-2); }
.icon-btn:active { transform: scale(0.88); }
.icon-btn svg { width: 11px; height: 11px; }
.group-reset { margin-right: 2px; }

/* Color */
.swatch {
  position: relative;
  flex: none;
  width: 30px;
  height: 28px;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  background-image:
    linear-gradient(45deg, #eceff4 25%, transparent 25%),
    linear-gradient(-45deg, #eceff4 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #eceff4 75%),
    linear-gradient(-45deg, transparent 75%, #eceff4 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.swatch:hover { border-color: var(--border-strong); }
.swatch:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-ring); }
.swatch input[type="color"] { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; border: 0; padding: 0; margin: 0; cursor: pointer; }

/* Segmented */
.segmented {
  flex: 1;
  min-width: 0;
  height: 28px;
  display: flex;
  align-items: stretch;
  gap: 2px;
  padding: 2px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
}
.segmented button {
  flex: 1;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--text-3);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, box-shadow 0.15s;
}
.segmented button:hover { color: var(--text-2); background: var(--surface); }
.segmented button.active { background: var(--surface); color: var(--accent); box-shadow: 0 1px 2px rgba(16, 24, 40, 0.1), 0 0 0 1px var(--border); }

/* Sliders */
.slider { -webkit-appearance: none; appearance: none; width: 100%; height: 16px; background: transparent; cursor: pointer; --fill: 0%; }
.slider::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 99px;
  background: linear-gradient(var(--accent), var(--accent)) 0 / var(--fill) 100% no-repeat, #e6eaf1;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  margin-top: -4px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #ccd4e0;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.2);
  transition: transform 0.12s;
}
.slider:active::-webkit-slider-thumb { transform: scale(1.15); border-color: var(--accent); }
.slider::-moz-range-track { height: 4px; border-radius: 99px; background: #e6eaf1; }
.slider::-moz-range-progress { height: 4px; border-radius: 99px; background: var(--accent); }
.slider::-moz-range-thumb { width: 12px; height: 12px; border-radius: 50%; background: #fff; border: 1px solid #ccd4e0; box-shadow: 0 1px 3px rgba(16, 24, 40, 0.2); }

/* Opacity row */
.opacity-row { display: flex; align-items: center; gap: 6px; flex: 1; min-width: 0; }
.opacity-row .slider { flex: 1; min-width: 0; }
.opacity-val {
  flex: none;
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 6px 0 4px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.opacity-val:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-ring); }
.opacity-val input { width: 26px; border: 0; outline: 0; background: none; padding: 0; font: inherit; font-size: 11px; text-align: right; color: var(--text); }
.opacity-val span { font-size: 10px; color: var(--text-3); margin-left: 1px; }

/* Spacing boxes */
.spacing-box + .spacing-box { margin-top: 4px; padding-top: 10px; border-top: 1px dashed #e8ecf2; }
.box-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 28px; margin-bottom: 6px; }
.box-tools { display: flex; align-items: center; gap: 5px; min-width: 0; }
.all-input { flex: none; width: 96px; }
.side-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; }
.side { display: block; min-width: 0; }
.side input {
  width: 100%;
  height: 26px;
  padding: 0 2px;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: var(--surface);
  text-align: center;
  font: inherit;
  font-size: 11px;
  color: var(--text);
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
}
.side input:hover { border-color: var(--border-strong); }
.side input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-ring); }
.side input.set { border-color: #bcd3fa; background: var(--accent-soft); }

/* ---------- Empty state ---------- */
.empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  text-align: center;
}
.empty-art {
  width: 76px;
  height: 76px;
  display: grid;
  place-items: center;
  border: 1.5px dashed #d3dae4;
  border-radius: 20px;
  color: #b6bfcc;
  background: linear-gradient(180deg, #fbfcfe, #f3f5f8);
  animation: float 4s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.empty strong { font-size: 13px; color: var(--text); }
.empty span { font-size: 11px; line-height: 1.6; color: var(--text-3); }
</style>
