<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { Box, Check, Copy, Eye, EyeOff, PanelRight, Plus, Redo2, RotateCcw, Undo2, X } from "@lucide/vue";
import ComponentCanvas from "./ComponentCanvas.vue";
import ElementorInspector from "./ElementorInspector.vue";
import SectionLayoutPicker from "./SectionLayoutPicker.vue";
import { componentRegistry } from "@/config/componentRegistry";
import { useComponentEditor } from "@/composables/useComponentEditor";
import { useComponentManager } from "@/composables/useComponentManager";
import { useStyleManager } from "@/composables/useStyleManager";
import { useComponentCopy } from "@/composables/useComponentCopy";
import { useEditor } from "@/composables/useEditor";

const props = defineProps({ initialComponentId: { type: String, default: null } });
const emit = defineEmits(["close"]);
const registry = Object.values(componentRegistry);
const activeId = ref(props.initialComponentId || registry[0]?.id || null);
const preview = ref(false);
const inspectorOpen = ref(true);
const showAddSection = ref(false);
const showAddContainer = ref(false);
const copyState = ref("idle");
const { selectedElement, overrides, contentOverrides, clearElement, getComponentState, restoreComponentState, resetComponentState } = useComponentEditor();
const { registerComponent } = useComponentManager();
const { registerComponent: registerStyleComponent, selectComponent } = useStyleManager();
const { copySelectedComponent } = useComponentCopy();
const { document, selectedNodeId, activeComponentId, setActiveComponent, resetActiveComponent, clearActiveComponent, addSection, addContainer, getDocumentSnapshot, restoreDocumentSnapshot } = useEditor();

registry.forEach((entry) => {
  const config = { name: entry.name, component: entry.component, source: entry.source, styles: {} };
  registerComponent(entry.id, config);
  registerStyleComponent(entry.id, config);
});
selectComponent(activeId.value);
setActiveComponent(activeId.value);

const HISTORY_LIMIT = 50;
const historyPast = ref([]);
const historyFuture = ref([]);
const historyCurrent = ref(null);
const historyTimer = ref(null);
const historyRestoring = ref(false);
const activeComponent = computed(() => componentRegistry[activeId.value] || null);
const canUndo = computed(() => historyPast.value.length > 0);
const canRedo = computed(() => historyFuture.value.length > 0);
function clone(value) { return JSON.parse(JSON.stringify(value)); }
function createSnapshot() { const componentId = activeComponentId.value || activeId.value; return { componentId, document: getDocumentSnapshot(), component: getComponentState(componentId) }; }
function snapshotKey(snapshot) { return JSON.stringify(snapshot); }
function clearHistoryTimer() { if (historyTimer.value !== null && typeof window !== "undefined") window.clearTimeout(historyTimer.value); historyTimer.value = null; }
function commitHistorySnapshot() {
  clearHistoryTimer();
  if (historyRestoring.value || !activeComponentId.value) return;
  const next = createSnapshot();
  if (!historyCurrent.value) { historyCurrent.value = next; return; }
  if (snapshotKey(next) === snapshotKey(historyCurrent.value)) return;
  historyPast.value.push(historyCurrent.value);
  if (historyPast.value.length > HISTORY_LIMIT) historyPast.value.shift();
  historyCurrent.value = next;
  historyFuture.value = [];
}
function scheduleHistorySnapshot() { clearHistoryTimer(); if (typeof window !== "undefined") historyTimer.value = window.setTimeout(commitHistorySnapshot, 300); }
function resetHistoryForComponent() { clearHistoryTimer(); historyPast.value = []; historyFuture.value = []; historyCurrent.value = createSnapshot(); }
async function restoreHistorySnapshot(snapshot) {
  if (!snapshot || snapshot.componentId !== activeComponentId.value) return;
  historyRestoring.value = true;
  clearElement();
  restoreDocumentSnapshot(snapshot.document);
  await nextTick();
  restoreComponentState(snapshot.componentId, snapshot.component);
  historyCurrent.value = clone(snapshot);
  await nextTick();
  historyRestoring.value = false;
}
function flushPendingHistory() { if (historyTimer.value !== null) commitHistorySnapshot(); }
async function undo() { flushPendingHistory(); const previous = historyPast.value.pop(); if (!previous || !historyCurrent.value) return; historyFuture.value.unshift(historyCurrent.value); await restoreHistorySnapshot(previous); }
async function redo() { flushPendingHistory(); const next = historyFuture.value.shift(); if (!next || !historyCurrent.value) return; historyPast.value.push(historyCurrent.value); await restoreHistorySnapshot(next); }
async function resetComponent() {
  flushPendingHistory();
  const componentId = activeComponentId.value;
  if (!componentId) return;
  historyPast.value.push(createSnapshot());
  if (historyPast.value.length > HISTORY_LIMIT) historyPast.value.shift();
  historyFuture.value = [];
  historyRestoring.value = true;
  clearElement();
  resetComponentState(componentId);
  resetActiveComponent();
  historyCurrent.value = { componentId, document: { children: [], componentChildren: [] }, component: { styles: {}, content: {} } };
  await nextTick();
  historyRestoring.value = false;
}
watch([() => document, () => overrides[activeComponentId.value] || null, () => contentOverrides[activeComponentId.value] || null], () => { if (!historyRestoring.value && activeComponentId.value) scheduleHistorySnapshot(); }, { deep: true });
watch(activeComponentId, () => resetHistoryForComponent(), { flush: "post" });
resetHistoryForComponent();

function closeEditor() { clearHistoryTimer(); showAddSection.value = false; showAddContainer.value = false; clearElement(); clearActiveComponent(); emit("close"); }
function togglePreview() { preview.value = !preview.value; if (preview.value) clearElement(); }
function handleElementSelected() { if (!preview.value) inspectorOpen.value = true; }
function openAddSection() { if (!preview.value) { showAddSection.value = true; showAddContainer.value = false; } }
function openAddContainer() { if (!preview.value) { showAddContainer.value = true; showAddSection.value = false; } }
function addSectionToPage(layout) { addSection(layout); showAddSection.value = false; }
function addContainerToPage(layout) { addContainer(layout); showAddContainer.value = false; }
async function copyComponent() {
  if (copyState.value === "copying") return;
  copyState.value = "copying";
  const result = await copySelectedComponent();
  copyState.value = result.ok ? "copied" : "error";
  window.setTimeout(() => { copyState.value = "idle"; }, 1800);
}
</script>

<template>
  <div class="editor" :class="{ 'editor--preview': preview, 'inspector-open': inspectorOpen }">
    <section class="editor-shell" role="dialog" aria-modal="true" :aria-label="`Edit ${activeComponent?.name || 'component'}`">
      <ElementorInspector v-if="!preview" class="editor-inspector" />
      <main class="editor-workspace">
        <header class="workspace-bar">
          <button class="brand-button" type="button" title="Close editor" aria-label="Close editor" @click="closeEditor"><X :size="21" /></button>
          <div class="workspace-name"><Box :size="17" /><span>{{ activeComponent?.name || 'Component' }}</span></div>
          <div class="workspace-actions">
            <button type="button" :title="inspectorOpen ? 'Hide settings' : 'Show settings'" :aria-label="inspectorOpen ? 'Hide settings' : 'Show settings'" @click="inspectorOpen = !inspectorOpen"><PanelRight :size="18" /></button>
            <button type="button" title="Add section" aria-label="Add section" :disabled="preview" @click="openAddSection"><Plus :size="19" /></button>
            <button type="button" title="Add container" aria-label="Add container" :disabled="preview" @click="openAddContainer"><Box :size="18" /></button>
            <span class="toolbar-divider" />
            <button type="button" title="Undo" aria-label="Undo" :disabled="preview || !canUndo" @click="undo"><Undo2 :size="18" /></button>
            <button type="button" title="Redo" aria-label="Redo" :disabled="preview || !canRedo" @click="redo"><Redo2 :size="18" /></button>
            <button type="button" title="Reset component" aria-label="Reset component" :disabled="preview" @click="resetComponent"><RotateCcw :size="18" /></button>
            <button type="button" :title="copyState === 'copied' ? 'Copied' : 'Copy Vue'" aria-label="Copy Vue" @click="copyComponent"><Check v-if="copyState === 'copied'" :size="18" /><Copy v-else :size="18" /></button>
            <button type="button" :title="preview ? 'Exit preview' : 'Preview'" :aria-label="preview ? 'Exit preview' : 'Preview'" @click="togglePreview"><EyeOff v-if="preview" :size="18" /><Eye v-else :size="18" /></button>
          </div>
        </header>
        <ComponentCanvas v-if="activeComponent" :component="activeComponent" :preview="preview" @element-selected="handleElementSelected" />
      </main>
      <SectionLayoutPicker v-if="showAddSection" @select="addSectionToPage" @close="showAddSection = false" />
      <SectionLayoutPicker v-if="showAddContainer" title="Add container" description="Choose a layout, or start with an empty container." :allow-empty-container="true" @select="addContainerToPage" @close="showAddContainer = false" />
    </section>
  </div>
</template>

<style scoped>
.editor{position:fixed;inset:0;z-index:10000;background:#fff;color:#20252b;font-family:Arial,Helvetica,sans-serif}.editor-shell{position:absolute;inset:0;display:flex;min-width:0;overflow:hidden;background:#fff}.editor-inspector{position:relative;z-index:20;transition:width .2s ease,flex-basis .2s ease}.editor:not(.inspector-open) .editor-inspector{width:0;flex-basis:0;overflow:hidden;border-right:0}.editor-workspace{position:relative;display:flex;flex:1;min-width:0;flex-direction:column;background:#f7f7f7;overflow:hidden}.workspace-bar{height:54px;flex:0 0 54px;display:flex;align-items:center;gap:13px;padding:0 17px;border-bottom:1px solid #e4e6e9;background:#fff}.brand-button,.workspace-actions button{display:grid;place-items:center;width:32px;height:32px;padding:0;border:0;border-radius:3px;background:transparent;color:#30343a;cursor:pointer}.brand-button:hover,.workspace-actions button:hover:not(:disabled){background:#f2f3f5;color:#93003f}.workspace-actions button:disabled{cursor:default;opacity:.35}.workspace-name{display:flex;align-items:center;gap:7px;min-width:0;font-size:13px;font-weight:700}.workspace-name svg{color:#93003f}.workspace-actions{display:flex;align-items:center;gap:3px;margin-left:auto}.toolbar-divider{width:1px;height:24px;margin:0 5px;background:#e1e3e6}
@media(max-width:900px){.editor-inspector{position:absolute;top:0;bottom:0;left:0;z-index:50;box-shadow:12px 0 28px rgba(0,0,0,.14);transform:translateX(-100%);transition:transform .2s ease}.editor.inspector-open .editor-inspector{transform:translateX(0)}.mobile-inspector-toggle{position:absolute;z-index:55;top:64px;left:10px;display:grid;place-items:center;width:36px;height:36px;border:1px solid #ddd;border-radius:3px;background:#fff;color:#30343a;box-shadow:0 2px 8px rgba(0,0,0,.12);cursor:pointer}.workspace-bar{padding-left:55px}.workspace-actions button:nth-child(2),.workspace-actions .toolbar-divider{display:none}}
@media(max-width:560px){.editor-inspector{width:min(375px,92vw);flex-basis:min(375px,92vw)}.workspace-actions{gap:0}.workspace-actions button:nth-child(5){display:none}.workspace-name span{max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}
</style>
