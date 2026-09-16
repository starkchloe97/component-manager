<script setup>
import { computed, ref } from "vue";
import ComponentCanvas from "./ComponentCanvas.vue";
import ElementPanel from "./ElementPanel.vue";
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
const { clearElement } = useComponentEditor();
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
function selectComponentById(id) { activeId.value = id; selectComponent(id); clearElement(); }
async function copyComponent() { await copySelectedComponent(); }
</script>

<template>
  <div class="editor" :class="{ 'editor--preview': preview }">
    <header class="editor-toolbar">
      <button type="button" class="close-button" aria-label="Close editor" @click="emit('close')">×</button>
      <strong>Edit component</strong>
      <span class="active-name">{{ activeComponent?.name }}</span>
      <div class="toolbar-spacer" />
      <div class="toolbar-actions">
        <button type="button">Undo</button>
        <button type="button">Redo</button>
        <button type="button" @click="preview = !preview">{{ preview ? "Edit" : "Preview" }}</button>
        <button type="button" class="copy-button" @click="copyComponent">Copy Vue Component</button>
      </div>
    </header>
    <div class="editor-body">
      <!-- <ElementPanel v-if="!preview" @select="selectComponentById" /> -->
      <ComponentCanvas v-if="activeComponent" :component="activeComponent" />
      <SettingsPanel v-if="!preview" />
    </div>
  </div>
</template>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #eef1f5
}

.editor-toolbar {
  min-height: 56px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 14px;
  box-sizing: border-box;
  background: #111827;
  color: #fff
}

.close-button {
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 6px;
  background: #374151;
  color: #fff;
  font-size: 22px;
  line-height: 1;
  cursor: pointer
}

.active-name {
  font-size: 11px;
  color: #94a3b8
}

.toolbar-spacer {
  flex: 1
}

.toolbar-actions {
  display: flex;
  gap: 4px
}

.toolbar-actions button {
  border: 0;
  border-radius: 6px;
  padding: 7px 10px;
  background: #1f2937;
  color: #cbd5e1;
  cursor: pointer;
  white-space: nowrap
}

.toolbar-actions .copy-button {
  background: #2563eb;
  color: #fff
}

.editor-body {
  flex: 1;
  display: flex;
  min-height: 0;
  overflow: hidden
}

.editor--preview :deep(.component-stage) {
  margin-top: 0
}
</style>
