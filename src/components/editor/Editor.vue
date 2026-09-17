<script setup>
import { computed, ref } from "vue";
import ComponentCanvas from "./ComponentCanvas.vue";
import AddedSections from "./AddedSections.vue";
import SectionLayoutPicker from "./SectionLayoutPicker.vue";
import SettingsPanel from "./SettingsPanel.vue";
import { componentRegistry } from "@/config/componentRegistry";
import { useComponentEditor } from "@/composables/useComponentEditor";
import { useComponentManager } from "@/composables/useComponentManager";
import { useStyleManager } from "@/composables/useStyleManager";
import { useComponentCopy } from "@/composables/useComponentCopy";

const props = defineProps({ initialComponentId: { type: String, default: null } });
const emit = defineEmits(["close"]);
const registry = Object.values(componentRegistry);
const activeId = ref(props.initialComponentId || registry[0]?.id || null);
const preview = ref(false);
const drawerOpen = ref(false);
const showAddSection = ref(false);
const addedSections = ref([]);
const { selectedElement, clearElement } = useComponentEditor();
const { registerComponent } = useComponentManager();
const { registerComponent: registerStyleComponent, selectComponent } = useStyleManager();
const { copySelectedComponent } = useComponentCopy();

registry.forEach((entry) => {
  const config = { name: entry.name, component: entry.component, source: entry.source, styles: {} };
  registerComponent(entry.id, config);
  registerStyleComponent(entry.id, config);
});
selectComponent(activeId.value);

const activeComponent = computed(() => componentRegistry[activeId.value] || null);
const hasSelectedElement = computed(() => !!selectedElement.value);

function selectComponentById(id) {
  activeId.value = id;
  selectComponent(id);
  clearElement();
  addedSections.value = [];
  showAddSection.value = false;
  drawerOpen.value = false;
}

function openDrawer() {
  if (!preview.value) drawerOpen.value = true;
}

function closeDrawer() {
  drawerOpen.value = false;
}

function closeEditor() {
  drawerOpen.value = false;
  showAddSection.value = false;
  clearElement();
  emit("close");
}

function handleElementSelected() {
  if (!preview.value) drawerOpen.value = true;
}

function togglePreview() {
  preview.value = !preview.value;
  drawerOpen.value = false;
  if (preview.value) clearElement();
}

async function copyComponent() {
  await copySelectedComponent();
}

function openAddSection() {
  if (!preview.value) showAddSection.value = true;
}

function addSection(layout) {
  const columns = layout.split("-").map(Number);
  addedSections.value.push({
    id: `added-section-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    columns,
    selector: `added-section-${addedSections.value.length + 1}`,
  });
  showAddSection.value = false;
}

function removeSection(id) {
  addedSections.value = addedSections.value.filter((section) => section.id !== id);
}
</script>

<template>
  <div class="editor" :class="{ 'editor--preview': preview, 'drawer-open': drawerOpen }">
    <div class="editor-backdrop" aria-hidden="true" @click="closeEditor"></div>

    <section class="editor-shell" role="dialog" aria-modal="true" :aria-label="`Edit ${activeComponent?.name || 'component'}`">
      <header class="editor-toolbar">
        <div class="toolbar-brand">
          <button type="button" class="close-button" aria-label="Close editor" @click="closeEditor">×</button>
          <div class="toolbar-title">
            <strong>Edit component</strong>
            <span class="active-name">{{ activeComponent?.name }}</span>
          </div>
        </div>

        <div class="toolbar-actions">
          <button type="button" class="toolbar-button add-section-button" @click="openAddSection">Add section</button>
          <button type="button" class="toolbar-button">Undo</button>
          <button type="button" class="toolbar-button">Redo</button>
          <button type="button" class="toolbar-button copy-button" @click="copyComponent">Copy Vue</button>
        </div>
      </header>

      <div class="editor-body">
        <div class="editor-workspace">
          <ComponentCanvas
            v-if="activeComponent"
            :component="activeComponent"
            :drawer-open="drawerOpen"
            :preview="preview"
            @element-selected="handleElementSelected"
          />

          <AddedSections
            v-if="!preview"
            :sections="addedSections"
            @remove="removeSection"
          />

          <button
            v-if="!preview"
            type="button"
            class="add-section-bottom"
            @click="openAddSection"
          >
            <span>+</span>
            <strong>Add section</strong>
            <small>Add a new section underneath</small>
          </button>
        </div>

        <button
          v-if="!preview && !drawerOpen"
          type="button"
          class="drawer-tab drawer-tab--closed"
          aria-label="Open element settings"
          @click="openDrawer"
        >
          <span class="drawer-tab-icon">‹</span>
          <span>Settings</span>
        </button>

        <aside v-if="!preview" class="settings-drawer" :class="{ 'settings-drawer--open': drawerOpen }">
          <button
            v-if="drawerOpen"
            type="button"
            class="drawer-tab drawer-tab--open"
            aria-label="Close element settings"
            @click="closeDrawer"
          >
            <span>›</span>
          </button>

          <div class="drawer-topbar">
            <div class="drawer-heading">
              <span>Element settings</span>
              <small v-if="hasSelectedElement">{{ selectedElement.label }}</small>
              <small v-else>Select an element</small>
            </div>
            <button type="button" class="drawer-close" aria-label="Close settings" @click="closeDrawer">×</button>
          </div>
          <SettingsPanel />
        </aside>
      </div>

      <SectionLayoutPicker
        v-if="showAddSection"
        @select="addSection"
        @close="showAddSection = false"
      />
    </section>
  </div>
</template>

<style scoped>
.editor { position:fixed; inset:0; z-index:10000; overflow:hidden; background:rgba(15,23,42,.48); }
.editor-backdrop { position:absolute; inset:0; background:rgba(15,23,42,.42); backdrop-filter:blur(2px); }
.editor-shell { position:absolute; inset:0; display:flex; flex-direction:column; min-width:0; background:#eef1f5; box-shadow:0 24px 80px rgba(15,23,42,.24); }
.editor-toolbar { position:relative; z-index:1000; min-height:54px; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:0 14px; box-sizing:border-box; background:#111827; color:#fff; border-bottom:1px solid #273244; }
.toolbar-brand,.toolbar-actions { display:flex; align-items:center; }
.toolbar-brand { gap:10px; min-width:0; }
.toolbar-actions { gap:5px; }
.close-button { width:31px; height:31px; flex:0 0 31px; border:0; border-radius:7px; background:#374151; color:#fff; font-size:21px; line-height:1; cursor:pointer; }
.close-button:hover { background:#4b5563; }
.toolbar-title { display:flex; align-items:baseline; gap:9px; min-width:0; }
.toolbar-title strong { font-size:12px; white-space:nowrap; }
.active-name { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:#94a3b8; font-size:11px; }
.toolbar-button { min-height:30px; border:0; border-radius:6px; padding:6px 10px; background:#1f2937; color:#cbd5e1; font-size:11px; cursor:pointer; white-space:nowrap; }
.toolbar-button:hover,.toolbar-button.active { background:#2b3648; color:#fff; }
.toolbar-button.add-section-button { background:#334155; color:#fff; }
.toolbar-button.add-section-button:hover { background:#475569; }
.toolbar-button.copy-button { background:#2563eb; color:#fff; }
.toolbar-button.copy-button:hover { background:#1d4ed8; }
.editor-body { position:relative; flex:1; min-height:0; min-width:0; overflow:hidden; }
.editor-workspace { position:absolute; inset:0; overflow:auto; background:#eef1f5; }
.editor-workspace > :deep(.component-canvas) { position:relative !important; inset:auto !important; width:100% !important; height:auto !important; min-height:560px; overflow:visible !important; }
.add-section-bottom { width:min(1400px,calc(100% - 48px)); margin:0 auto 48px; min-height:70px; display:flex; align-items:center; justify-content:center; gap:7px; flex-wrap:wrap; box-sizing:border-box; border:1px dashed #cbd5e1; border-radius:8px; background:rgba(255,255,255,.65); color:#64748b; cursor:pointer; }
.add-section-bottom:hover { border-color:#93c5fd; background:#f8fbff; color:#2563eb; }
.add-section-bottom span { font-size:20px; line-height:1; }.add-section-bottom strong{font-size:11px}.add-section-bottom small{font-size:10px;color:#94a3b8}.add-section-bottom:hover small{color:#60a5fa}
.settings-drawer { position:absolute; top:0; right:0; bottom:0; z-index:900; width:360px; max-width:min(360px,92vw); transform:translateX(100%); display:flex; flex-direction:column; box-sizing:border-box; background:#fff; border-left:1px solid #dbe3ee; box-shadow:-16px 0 40px rgba(15,23,42,.16); overflow:visible; transition:transform .28s cubic-bezier(.22,.61,.36,1), box-shadow .28s ease; }
.settings-drawer--open { transform:translateX(0); box-shadow:-18px 0 44px rgba(15,23,42,.18); }
.settings-drawer :deep(.settings-panel) { width:100%; flex:1; min-height:0; border:0; box-shadow:none; overflow:auto; }
.drawer-topbar { height:48px; flex:0 0 48px; display:flex; align-items:center; justify-content:space-between; padding:0 10px 0 15px; box-sizing:border-box; background:#f8fafc; border-bottom:1px solid #e5e7eb; color:#334155; }
.drawer-heading { display:flex; align-items:baseline; gap:8px; min-width:0; }
.drawer-heading span { font-size:10px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
.drawer-heading small { color:#2563eb; font-size:10px; font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.drawer-close { width:26px; height:26px; border:0; border-radius:6px; background:transparent; color:#64748b; font-size:19px; cursor:pointer; }
.drawer-close:hover { background:#e2e8f0; color:#1e293b; }
.drawer-tab { position:absolute; z-index:950; display:flex; align-items:center; justify-content:center; border:1px solid #dbe3ee; background:#fff; color:#475569; box-shadow:-6px 8px 22px rgba(15,23,42,.12); cursor:pointer; transition:width .18s ease, height .18s ease, background .18s ease, color .18s ease, box-shadow .18s ease; }
.drawer-tab:hover { background:#eff6ff; color:#2563eb; box-shadow:-8px 10px 26px rgba(37,99,235,.15); }
.drawer-tab--closed { top:50%; right:0; width:34px; height:88px; transform:translateY(-50%); flex-direction:column; gap:3px; border-right:0; border-radius:9px 0 0 9px; }
.drawer-tab--closed:hover { width:40px; }
.drawer-tab--closed .drawer-tab-icon { font-size:20px; line-height:12px; }
.drawer-tab--closed span:last-child { font-size:9px; font-weight:700; writing-mode:vertical-rl; text-transform:uppercase; letter-spacing:.08em; }
.drawer-tab--open { left:-30px; top:50%; width:30px; height:64px; transform:translateY(-50%); border-right:0; border-radius:8px 0 0 8px; font-size:20px; }
.drawer-tab--open:hover { left:-34px; width:34px; }
.editor--preview .editor-body > :deep(.component-canvas) { filter:none; }
@media (max-width:760px) {
  .toolbar-actions .toolbar-button:not(.copy-button):not(.add-section-button) { display:none; }
  .toolbar-title { flex-direction:column; gap:1px; }
  .add-section-bottom { width:calc(100% - 24px); }
}
</style>
