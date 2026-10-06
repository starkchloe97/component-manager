<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { Box, Check, Copy, Eye, EyeOff, Menu, Redo2, RotateCcw, Undo2, X } from "@lucide/vue";
import ComponentCanvas from "./ComponentCanvas.vue";
import ElementorInspector from "./ElementorInspector.vue";
import NavigatorPanel from "./NavigatorPanel.vue";
import { componentRegistry } from "@/config/componentRegistry";
import { useComponentEditor } from "@/composables/useComponentEditor";
import { useComponentManager } from "@/composables/useComponentManager";
import { useComponentCopy } from "@/composables/useComponentCopy";
import { useEditor } from "@/composables/useEditor";
import { useEditorHistory } from "@/composables/useEditorHistory";

defineOptions({ name: "ComponentEditor" });

const props = defineProps({ initialComponentId: { type: String, default: null } });
const emit = defineEmits(["close"]);
const registry = Object.values(componentRegistry);
const activeId = ref(props.initialComponentId || registry[0]?.id || null);
const preview = ref(false);
const inspectorOpen = ref(true);
const navigatorOpen = ref(false);
const copyState = ref("idle");
const { clearElement, getComponentState, restoreComponentState, resetComponentState } = useComponentEditor();
const { registerComponent } = useComponentManager();
const { copySelectedComponent } = useComponentCopy();
const { document, activeComponentId, setActiveComponent, resetActiveComponent, clearActiveComponent, getDocumentSnapshot, restoreDocumentSnapshot } = useEditor();

registry.forEach((entry) => {
  const config = { name: entry.name, component: entry.component, source: entry.source, styles: {} };
  registerComponent(entry.id, config);
});
setActiveComponent(activeId.value);

const history = useEditorHistory();
const activeComponent = computed(() => componentRegistry[activeId.value] || null);

function createSnapshot() {
  const componentId = activeComponentId.value || activeId.value;
  return {
    componentId,
    document: getDocumentSnapshot(),
    component: getComponentState(componentId),
  };
}

async function restoreHistorySnapshot(snapshot) {
  if (!snapshot || snapshot.componentId !== activeComponentId.value) return;

  clearElement();
  restoreDocumentSnapshot(snapshot.document);
  await nextTick();
  restoreComponentState(snapshot.componentId, snapshot.component);
  await nextTick();
}

function configureHistory() {
  history.configure({
    componentId: activeComponentId.value || activeId.value,
    snapshot: createSnapshot,
    restore: restoreHistorySnapshot,
  });
  history.reset();
}

async function resetComponent() {
  if (history.busy.value) return;

  const componentId = activeComponentId.value;
  if (!componentId) return;

  await history.runHistoryOperation(async () => {
    clearElement();
    resetComponentState(componentId);
    resetActiveComponent();
    await nextTick();
  });

  history.recordReset({
    componentId,
    document: { children: [], componentChildren: [] },
    component: { styles: {}, content: {}, images: {} },
  });
}

watch(activeComponentId, configureHistory, { flush: "post" });
configureHistory();

function closeEditor() { clearElement(); history.clear(); clearActiveComponent(); emit("close"); }
function togglePreview() { preview.value = !preview.value; if (preview.value) clearElement(); }
function handleElementSelected() { /* Selection must not change inspector visibility. */ }
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
    <section class="editor-shell" role="dialog" aria-modal="true"
      :aria-label="`Edit ${activeComponent?.name || 'component'}`">
      <div v-if="!preview" class="editor-inspector" :class="{ closed: !inspectorOpen }">
        <ElementorInspector />
      </div>
      <main class="editor-workspace">
        <header class="workspace-bar">
          <button class="brand-button" type="button" title="Close editor" aria-label="Close editor"
            @click="closeEditor">
            <X :size="21" />
          </button>
          <div class="workspace-name">
            <Box :size="17" /><span>{{ activeComponent?.name || 'Component' }}</span>
          </div>
          <div class="workspace-actions">
            <button class="inspector-toggle" :class="{ active: inspectorOpen }" type="button"
              :title="inspectorOpen ? 'Close settings' : 'Open settings'"
              :aria-label="inspectorOpen ? 'Close settings' : 'Open settings'"
              @click="inspectorOpen = !inspectorOpen"><span class="toggle-icon">
                <Menu class="toggle-menu-icon" :size="18" />
                <X class="toggle-close-icon" :size="18" />
              </span></button>
            <button class="navigator-toggle" :class="{ active: navigatorOpen }" type="button"
              :title="navigatorOpen ? 'Close Structure' : 'Open Structure'"
              :aria-label="navigatorOpen ? 'Close Structure' : 'Open Structure'"
              :aria-pressed="navigatorOpen"
              @click="navigatorOpen = !navigatorOpen">
              <Menu :size="17" />
            </button>
            <button type="button" title="Undo" aria-label="Undo" :disabled="preview || !history.canUndo.value" @click="history.undo">
              <Undo2 :size="18" />
            </button>
            <button type="button" title="Redo" aria-label="Redo" :disabled="preview || !history.canRedo.value" @click="history.redo">
              <Redo2 :size="18" />
            </button>
            <button type="button" title="Reset component" aria-label="Reset component" :disabled="preview"
              @click="resetComponent">
              <RotateCcw :size="18" />
            </button>
            <button type="button" :title="copyState === 'copied' ? 'Copied' : 'Copy Vue'" aria-label="Copy Vue"
              @click="copyComponent">
              <Check v-if="copyState === 'copied'" :size="18" />
              <Copy v-else :size="18" />
            </button>
            <button type="button" :title="preview ? 'Exit preview' : 'Preview'"
              :aria-label="preview ? 'Exit preview' : 'Preview'" @click="togglePreview">
              <EyeOff v-if="preview" :size="18" />
              <Eye v-else :size="18" />
            </button>
          </div>
        </header>
        <NavigatorPanel v-if="navigatorOpen && !preview" :inspector-open="inspectorOpen"
          @close="navigatorOpen = false" />
        <ComponentCanvas v-if="activeComponent" :component="activeComponent" :preview="preview"
          @element-selected="handleElementSelected" />
      </main>
    </section>
  </div>
</template>

<style scoped>
.editor {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: #eef1f5;
  color: #20252b;
  font-family: Arial, Helvetica, sans-serif
}

.editor-shell {
  position: absolute;
  inset: 0;
  display: flex;
  min-width: 0;
  overflow: hidden;
  background: #fff
}

.editor-inspector {
  position: relative;
  z-index: 20;
  width: 300px;
  flex: 0 0 300px;
  overflow: hidden;
  transition: width .32s cubic-bezier(.4, 0, .2, 1), flex-basis .32s cubic-bezier(.4, 0, .2, 1)
}

.editor-inspector.closed {
  width: 0;
  flex-basis: 0
}

.inspector-toggle .toggle-icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px
}

.inspector-toggle .toggle-menu-icon,
.inspector-toggle .toggle-close-icon {
  grid-area: 1/1;
  transition: opacity .2s ease, transform .25s cubic-bezier(.4, 0, .2, 1)
}

.inspector-toggle .toggle-menu-icon {
  opacity: 0;
  transform: scale(.65) rotate(-45deg)
}

.inspector-toggle .toggle-close-icon {
  opacity: 1;
  transform: scale(1) rotate(0)
}

.inspector-toggle:not(.active) .toggle-menu-icon {
  opacity: 1;
  transform: scale(1) rotate(0)
}

.inspector-toggle:not(.active) .toggle-close-icon {
  opacity: 0;
  transform: scale(.65) rotate(45deg)
}

.editor-workspace {
  position: relative;
  display: flex;
  flex: 1;
  margin-bottom: 16px;
  min-width: 0;
  flex-direction: column;
  background: #f7f7f7;
  overflow: hidden
}

.workspace-bar {
  height: 54px;
  flex: 0 0 54px;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 0 17px;
  border-bottom: 1px solid #e4e6e9;
  background: #fff
}

.brand-button,
.workspace-actions button {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 3px;
  background: transparent;
  color: #30343a;
  cursor: pointer
}

.brand-button:hover,
.workspace-actions button:hover:not(:disabled) {
  background: #f2f3f5;
  color: #93003f
}

.inspector-toggle {
  position: relative;
  overflow: hidden
}

.workspace-actions button:disabled {
  cursor: default;
  opacity: .35
}

.workspace-name {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  font-size: 13px;
  font-weight: 700
}

.workspace-name svg {
  color: #93003f
}

.workspace-actions {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-left: auto
}

.toolbar-divider {
  width: 1px;
  height: 24px;
  margin: 0 5px;
  background: #e1e3e6
}

@media(max-width:900px) {
  .editor-inspector {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    width: min(375px, 92vw);
    flex-basis: min(375px, 92vw);
    box-shadow: 12px 0 28px rgba(0, 0, 0, .14);
    transition: transform .32s cubic-bezier(.4, 0, .2, 1);
    transform: translate3d(0, 0, 0)
  }

  .editor-inspector.closed {
    width: min(375px, 92vw);
    flex-basis: min(375px, 92vw);
    transform: translate3d(-100%, 0, 0)
  }

  .workspace-actions button:nth-child(2),
  .workspace-actions .toolbar-divider {
    display: none
  }
}

@media(max-width:560px) {
  .workspace-actions {
    gap: 0
  }

  .workspace-actions button:nth-child(6) {
    display: none
  }

  .workspace-name span {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }
}
</style>
