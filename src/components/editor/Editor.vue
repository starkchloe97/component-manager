<script setup>
import { computed, nextTick, ref, watch } from "vue";
import ComponentCanvas from "./ComponentCanvas.vue";
import SectionLayoutPicker from "./SectionLayoutPicker.vue";
import SettingsPanel from "./SettingsPanel.vue";
import NodeSettingsPanel from "./NodeSettingsPanel.vue";
import ElementSettingsPanel from "./ElementSettingsPanel.vue";
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
const drawerOpen = ref(false);
const showAddSection = ref(false);
const { selectedElement, overrides, contentOverrides, clearElement, getComponentState, restoreComponentState } = useComponentEditor();
const { registerComponent } = useComponentManager();
const { registerComponent: registerStyleComponent, selectComponent } = useStyleManager();
const { copySelectedComponent } = useComponentCopy();
const copyState = ref("idle");
const { document, selectedNodeId, selectedNode, activeComponentId, setActiveComponent, clearActiveComponent, addSection, selectNode, getDocumentSnapshot, restoreDocumentSnapshot } = useEditor();

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
const historyBaseline = ref(null);
const historyTimer = ref(null);
const historyRestoring = ref(false);

function cloneHistory(value) { return JSON.parse(JSON.stringify(value)); }

function createSnapshot() {
  const componentId = activeComponentId.value || activeId.value;
  return { componentId, document: getDocumentSnapshot(), component: getComponentState(componentId) };
}

function snapshotKey(snapshot) { return JSON.stringify(snapshot); }

function pristineSnapshot(componentId) {
  return { componentId, document: { children: [], componentChildren: [] }, component: { styles: {}, content: {} } };
}

function clearHistoryTimer() {
  if (historyTimer.value !== null && typeof window !== "undefined") window.clearTimeout(historyTimer.value);
  historyTimer.value = null;
}

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

function scheduleHistorySnapshot() {
  clearHistoryTimer();
  if (typeof window === "undefined") return;
  historyTimer.value = window.setTimeout(() => { historyTimer.value = null; commitHistorySnapshot(); }, 300);
}

function resetHistoryForComponent(componentId) {
  clearHistoryTimer();
  historyPast.value = [];
  historyFuture.value = [];
  historyBaseline.value = pristineSnapshot(componentId);
  historyCurrent.value = createSnapshot();
}

async function restoreHistorySnapshot(snapshot) {
  if (!snapshot || snapshot.componentId !== activeComponentId.value) return;
  historyRestoring.value = true;
  clearElement();
  restoreDocumentSnapshot(snapshot.document);
  await nextTick();
  restoreComponentState(snapshot.componentId, snapshot.component);
  historyCurrent.value = cloneHistory(snapshot);
  await nextTick();
  historyRestoring.value = false;
}

function flushPendingHistory() { if (historyTimer.value !== null) commitHistorySnapshot(); }

async function undo() {
  flushPendingHistory();
  const previous = historyPast.value.pop();
  if (!previous || !historyCurrent.value) return;
  historyFuture.value.unshift(historyCurrent.value);
  await restoreHistorySnapshot(previous);
}

async function redo() {
  flushPendingHistory();
  const next = historyFuture.value.shift();
  if (!next || !historyCurrent.value) return;
  historyPast.value.push(historyCurrent.value);
  await restoreHistorySnapshot(next);
}

async function resetComponent() {
  flushPendingHistory();
  if (!historyCurrent.value || !historyBaseline.value) return;
  if (snapshotKey(historyCurrent.value) === snapshotKey(historyBaseline.value)) return;
  historyPast.value.push(historyCurrent.value);
  if (historyPast.value.length > HISTORY_LIMIT) historyPast.value.shift();
  historyFuture.value = [];
  await restoreHistorySnapshot(historyBaseline.value);
}

const canUndo = computed(() => historyPast.value.length > 0);
const canRedo = computed(() => historyFuture.value.length > 0);
const hasComponentChanges = computed(() => historyCurrent.value && historyBaseline.value && snapshotKey(historyCurrent.value) !== snapshotKey(historyBaseline.value));
const activeComponent = computed(() => componentRegistry[activeId.value] || null);
const hasSelectedElement = computed(() => !!selectedElement.value || !!selectedNode.value);

watch([document, overrides, contentOverrides], () => {
  if (!historyRestoring.value && activeComponentId.value) scheduleHistorySnapshot();
}, { deep: true });

watch(activeComponentId, (componentId) => {
  if (componentId) resetHistoryForComponent(componentId);
}, { flush: "post" });
function selectComponentById(id) {
  activeId.value = id;
  setActiveComponent(id);
  selectComponent(id);
  clearElement();
  drawerOpen.value = false;
}
function openDrawer() { if (!preview.value) drawerOpen.value = true; }
function closeDrawer() { drawerOpen.value = false; }
function closeEditor() { drawerOpen.value = false; showAddSection.value = false; clearElement(); clearActiveComponent(); emit("close"); }
function handleElementSelected() { if (!preview.value) drawerOpen.value = true; }
function togglePreview() { preview.value = !preview.value; drawerOpen.value = false; if (preview.value) clearElement(); }
async function copyComponent() {
  if (copyState.value === "copying") return;
  copyState.value = "copying";
  const result = await copySelectedComponent();
  copyState.value = result.ok ? "copied" : "error";
  if (!result.ok) console.error(result.error);
  window.setTimeout(() => { copyState.value = "idle"; }, 1800);
}
function openAddSection() { if (!preview.value) showAddSection.value = true; }
function addSectionToPage(layout) { addSection(layout); showAddSection.value = false; }
</script>

<template>
  <div class="editor" :class="{ 'editor--preview': preview, 'drawer-open': drawerOpen }">
    <div class="editor-backdrop" aria-hidden="true" @click="closeEditor"></div>
    <section class="editor-shell" role="dialog" aria-modal="true"
      :aria-label="`Edit ${activeComponent?.name || 'component'}`">
      <header class="editor-toolbar">
        <div class="toolbar-brand">
          <button type="button" class="close-button" aria-label="Close editor" @click="closeEditor">×</button>
          <div class="toolbar-title"><strong>Edit component</strong><span class="active-name">{{ activeComponent?.name
              }}</span></div>
        </div>
        <div class="toolbar-actions">
          <button type="button" class="toolbar-button add-section-button" @click="openAddSection">Add section</button>
          <button type="button" class="toolbar-button" :disabled="preview || !canUndo" @click="undo">Undo</button>
          <button type="button" class="toolbar-button" :disabled="preview || !canRedo" @click="redo">Redo</button>
          <button type="button" class="toolbar-button reset-component-button" :disabled="preview || !hasComponentChanges" @click="resetComponent">Reset</button>\n          <button type="button" class="toolbar-button copy-button" :disabled="copyState === 'copying'" @click="copyComponent">{{ copyState === "copying" ? "Copying…" : copyState === "copied" ? "Copied!" : copyState === "error" ? "Copy failed" : "Copy Vue" }}</button>
        </div>
      </header>

      <div class="editor-body">
        <div class="editor-workspace">
          <ComponentCanvas v-if="activeComponent" :component="activeComponent" :drawer-open="drawerOpen"
            :preview="preview" @element-selected="handleElementSelected" />

        </div>

        <button v-if="!preview && !drawerOpen" type="button" class="drawer-tab drawer-tab--closed"
          aria-label="Open element settings" @click="openDrawer"><span
            class="drawer-tab-icon">‹</span><span>Settings</span></button>
        <aside v-if="!preview" class="settings-drawer" :class="{ 'settings-drawer--open': drawerOpen }">
          <button v-if="drawerOpen" type="button" class="drawer-tab drawer-tab--open"
            aria-label="Close element settings" @click="closeDrawer"><span>›</span></button>
          <div class="drawer-topbar">
            <div class="drawer-heading"><span>Element settings</span><small v-if="selectedElement">{{
                selectedElement.label }}</small><small v-else-if="selectedNode">{{ selectedNode.type }}</small><small
                v-else>Select an element</small></div>
            <button type="button" class="drawer-close" aria-label="Close settings" @click="closeDrawer">×</button>
          </div>
          <NodeSettingsPanel v-if="selectedNodeId" />
          <ElementSettingsPanel v-else-if="selectedElement" />
          <SettingsPanel v-else />
        </aside>
      </div>

      <SectionLayoutPicker v-if="showAddSection" @select="addSectionToPage" @close="showAddSection = false" />
    </section>
  </div>
</template>

<style scoped>
.editor {
  position: fixed;
  inset: 0;
  z-index: 10000;
  overflow: hidden;
  background: rgba(15, 23, 42, .48)
}

.editor-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, .42);
  backdrop-filter: blur(2px)
}

.editor-shell {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: #eef1f5;
  box-shadow: 0 24px 80px rgba(15, 23, 42, .24)
}

.editor-toolbar {
  position: relative;
  z-index: 1000;
  min-height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 14px;
  box-sizing: border-box;
  background: #111827;
  color: #fff;
  border-bottom: 1px solid #273244
}

.toolbar-brand,
.toolbar-actions {
  display: flex;
  align-items: center
}

.toolbar-brand {
  gap: 10px;
  min-width: 0
}

.toolbar-actions {
  gap: 5px
}

.close-button {
  width: 31px;
  height: 31px;
  flex: 0 0 31px;
  border: 0;
  border-radius: 7px;
  background: #374151;
  color: #fff;
  font-size: 21px;
  line-height: 1;
  cursor: pointer
}

.close-button:hover {
  background: #4b5563
}

.toolbar-title {
  display: flex;
  align-items: baseline;
  gap: 9px;
  min-width: 0
}

.toolbar-title strong {
  font-size: 12px;
  white-space: nowrap
}

.active-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #94a3b8;
  font-size: 11px
}

.toolbar-button {
  min-height: 30px;
  border: 0;
  border-radius: 6px;
  padding: 6px 10px;
  background: #1f2937;
  color: #cbd5e1;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap
}

.toolbar-button:hover:not(:disabled) {
  background: #2b3648;
  color: #fff
}

.toolbar-button:disabled {
  opacity: .45;
  cursor: default
}

.add-section-button {
  background: #334155;
  color: #fff
}

.copy-button {
  background: #2563eb;
  color: #fff
}

.editor-body {
  position: relative;
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow: hidden
}

.editor-workspace {
  position: absolute;
  inset: 0;
  overflow: auto;
  background: #eef1f5;
  transition: padding-right .22s ease;
}
.editor.drawer-open .editor-workspace {
  padding-right: 320px;
  box-sizing: border-box;
}

.settings-drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 900;
  width: 320px;
  max-width: min(320px, 92vw);
  transform: translateX(100%);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #fff;
  border-left: 1px solid #dbe3ee;
  box-shadow: -16px 0 40px rgba(15, 23, 42, .16);
  overflow: visible;
  transition: transform .28s cubic-bezier(.22, .61, .36, 1)
}

.settings-drawer--open {
  transform: translateX(0)
}

.settings-drawer :deep(.settings-panel) {
  width: 100%;
  flex: 1;
  min-height: 0;
  border: 0;
  box-shadow: none;
  overflow: auto
}

.drawer-topbar {
  height: 48px;
  flex: 0 0 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 15px;
  box-sizing: border-box;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
  color: #334155
}

.drawer-heading {
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-width: 0
}

.drawer-heading span {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase
}

.drawer-heading small {
  color: #2563eb;
  font-size: 10px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}

.drawer-close {
  width: 26px;
  height: 26px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #64748b;
  font-size: 19px;
  cursor: pointer
}

.drawer-close:hover {
  background: #e2e8f0
}

.drawer-tab {
  position: absolute;
  z-index: 950;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dbe3ee;
  background: #fff;
  color: #475569;
  box-shadow: -6px 8px 22px rgba(15, 23, 42, .12);
  cursor: pointer
}

.drawer-tab--closed {
  top: 50%;
  right: 0;
  width: 34px;
  height: 88px;
  transform: translateY(-50%);
  flex-direction: column;
  gap: 3px;
  border-right: 0;
  border-radius: 9px 0 0 9px
}

.drawer-tab--closed .drawer-tab-icon {
  font-size: 20px;
  line-height: 12px
}

.drawer-tab--closed span:last-child {
  font-size: 9px;
  font-weight: 700;
  writing-mode: vertical-rl;
  text-transform: uppercase;
  letter-spacing: .08em
}

.drawer-tab--open {
  left: -30px;
  top: 50%;
  width: 30px;
  height: 64px;
  transform: translateY(-50%);
  border-right: 0;
  border-radius: 8px 0 0 8px;
  font-size: 20px
}

.node-settings-note {
  margin: 12px;
  padding: 10px;
  border-radius: 7px;
  background: #f8fafc;
  color: #64748b;
  font-size: 10px;
  line-height: 1.5;
  border: 1px solid #e2e8f0
}

@media(max-width:760px) {
  .editor.drawer-open .editor-workspace { padding-right: 0; }
  .toolbar-actions .toolbar-button:not(.copy-button):not(.add-section-button):not(.reset-component-button) {
    display: none
  }

  .toolbar-title {
    flex-direction: column;
    gap: 1px
  }

}
</style>
