<script setup>
import { computed, ref } from "vue";
import ComponentCanvas from "./ComponentCanvas.vue";
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
  clearElement();
  emit("close");
}

function handleElementSelected() {
  drawerOpen.value = true;
}

async function copyComponent() {
  await copySelectedComponent();
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
          <button type="button" class="toolbar-button">Undo</button>
          <button type="button" class="toolbar-button">Redo</button>
          <button type="button" class="toolbar-button preview-button" @click="preview = !preview; if (preview) closeDrawer()">
            {{ preview ? "Edit" : "Preview" }}
          </button>
          <button type="button" class="toolbar-button copy-button" @click="copyComponent">Copy Vue</button>
        </div>
      </header>

      <div class="editor-body">
        <ComponentCanvas
          v-if="activeComponent"
          :component="activeComponent"
          @element-selected="handleElementSelected"
        />

        <button
          v-if="!preview && !drawerOpen"
          type="button"
          class="drawer-launcher"
          aria-label="Open element settings"
          @click="openDrawer"
        >
          <span class="launcher-arrow">‹</span>
          <span>Settings</span>
        </button>

        <aside v-if="!preview" class="settings-drawer" :class="{ 'settings-drawer--open': drawerOpen }">
          <div class="drawer-edge" @click="closeDrawer">
            <span>{{ drawerOpen ? '›' : '‹' }}</span>
          </div>
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
    </section>
  </div>
</template>

<style scoped>
.editor { position: fixed; inset: 0; z-index: 10000; overflow: hidden; background: rgba(15,23,42,.48); }
.editor-backdrop { position:absolute; inset:0; background:rgba(15,23,42,.42); backdrop-filter:blur(2px); }
.editor-shell { position:absolute; inset:0; display:flex; flex-direction:column; min-width:0; background:#eef1f5; box-shadow:0 24px 80px rgba(15,23,42,.24); }
.editor-toolbar { position:relative; z-index:100; min-height:54px; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:0 14px; box-sizing:border-box; background:#111827; color:#fff; border-bottom:1px solid #273244; }
.toolbar-brand,.toolbar-actions { display:flex; align-items:center; }
.toolbar-brand { gap:10px; min-width:0; }
.toolbar-actions { gap:5px; }
.close-button { width:31px; height:31px; flex:0 0 31px; border:0; border-radius:7px; background:#374151; color:#fff; font-size:21px; line-height:1; cursor:pointer; }
.close-button:hover { background:#4b5563; }
.toolbar-title { display:flex; align-items:baseline; gap:9px; min-width:0; }
.toolbar-title strong { font-size:12px; white-space:nowrap; }
.active-name { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:#94a3b8; font-size:11px; }
.toolbar-button { min-height:30px; border:0; border-radius:6px; padding:6px 10px; background:#1f2937; color:#cbd5e1; font-size:11px; cursor:pointer; white-space:nowrap; }
.toolbar-button:hover { background:#2b3648; color:#fff; }
.toolbar-button.copy-button { background:#2563eb; color:#fff; }
.toolbar-button.copy-button:hover { background:#1d4ed8; }
.editor-body { position:relative; flex:1; display:flex; min-height:0; min-width:0; overflow:hidden; }
.editor-body > :deep(.component-canvas) { flex:1 1 auto; width:100%; min-width:0; transition:margin-right .28s ease, width .28s ease; }

.settings-drawer { position:absolute; top:0; right:0; bottom:0; z-index:80; width:360px; transform:translateX(100%); display:flex; flex-direction:column; box-sizing:border-box; background:#fff; border-left:1px solid #dbe3ee; box-shadow:-12px 0 32px rgba(15,23,42,.16); overflow:visible; transition:transform .28s cubic-bezier(.22,.61,.36,1), box-shadow .28s ease; }
.settings-drawer--open { transform:translateX(0); box-shadow:-18px 0 44px rgba(15,23,42,.18); }
.settings-drawer :deep(.settings-panel) { width:100%; flex:1; min-height:0; border:0; box-shadow:none; overflow:auto; }
.drawer-topbar { height:48px; flex:0 0 48px; display:flex; align-items:center; justify-content:space-between; padding:0 10px 0 15px; box-sizing:border-box; background:#f8fafc; border-bottom:1px solid #e5e7eb; color:#334155; }
.drawer-heading { display:flex; align-items:baseline; gap:8px; min-width:0; }
.drawer-heading span { font-size:10px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
.drawer-heading small { color:#2563eb; font-size:10px; font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.drawer-close { width:26px; height:26px; border:0; border-radius:6px; background:transparent; color:#64748b; font-size:19px; cursor:pointer; }
.drawer-close:hover { background:#e2e8f0; color:#1e293b; }
.drawer-edge { position:absolute; left:-28px; top:50%; width:28px; height:64px; transform:translateY(-50%); display:flex; align-items:center; justify-content:center; border:1px solid #dbe3ee; border-right:0; border-radius:8px 0 0 8px; background:#fff; color:#475569; box-shadow:-6px 8px 18px rgba(15,23,42,.1); cursor:pointer; transition:width .18s ease, left .18s ease, background .18s ease, color .18s ease; }
.drawer-edge:hover { left:-31px; width:31px; background:#eff6ff; color:#2563eb; }
.drawer-launcher { position:absolute; right:0; top:50%; z-index:70; width:34px; height:86px; transform:translateY(-50%); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; border:1px solid #dbe3ee; border-right:0; border-radius:9px 0 0 9px; background:#fff; color:#475569; box-shadow:-5px 8px 20px rgba(15,23,42,.12); cursor:pointer; transition:width .18s ease, background .18s ease, color .18s ease; }
.drawer-launcher:hover { width:40px; background:#eff6ff; color:#2563eb; }
.launcher-arrow { font-size:20px; line-height:12px; }
.drawer-launcher span:last-child { font-size:9px; font-weight:700; writing-mode:vertical-rl; text-transform:uppercase; letter-spacing:.08em; }

@media (max-width:760px) {
  .toolbar-actions .toolbar-button:not(.preview-button):not(.copy-button) { display:none; }
  .toolbar-title { flex-direction:column; gap:1px; }
  .settings-drawer { width:min(360px,92vw); }
}
</style>
