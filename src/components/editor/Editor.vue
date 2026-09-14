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

const registry = Object.values(componentRegistry);
const activeId = ref(registry[0]?.id || null);
const preview = ref(false);
const { clearElement } = useComponentEditor();
const { registerComponent } = useComponentManager();
const { selectComponent } = useStyleManager();
const { copySelectedComponent } = useComponentCopy();

registry.forEach((entry) => registerComponent(entry.id, { name: entry.name, component: entry.component, source: entry.source }));
selectComponent(activeId.value);

const activeComponent = computed(() => componentRegistry[activeId.value] || null);
function selectComponentById(id) { activeId.value = id; selectComponent(id); clearElement(); }
async function copyComponent() { await copySelectedComponent(); }
</script>

<template>
  <div class="editor" :class="{ 'editor--preview': preview }">
    <header class="editor-toolbar">
      <strong>Component Manager</strong>
      <div class="component-tabs">
        <button v-for="item in registry" :key="item.id" type="button" :class="{ active: activeId === item.id }" @click="selectComponentById(item.id)">{{ item.name }}</button>
      </div>
      <div class="toolbar-actions">
        <button type="button">Undo</button>
        <button type="button">Redo</button>
        <button type="button" @click="preview = !preview">{{ preview ? "Edit" : "Preview" }}</button>
        <button type="button" class="copy-button" @click="copyComponent">Copy Vue Component</button>
      </div>
    </header>
    <div class="editor-body">
      <ElementPanel v-if="!preview" @select="selectComponentById" />
      <ComponentCanvas v-if="activeComponent" :component="activeComponent" />
      <SettingsPanel v-if="!preview" />
    </div>
  </div>
</template>

<style scoped>
.editor{min-height:100vh;display:flex;flex-direction:column;background:#eef1f5}.editor-toolbar{min-height:56px;display:flex;align-items:center;gap:16px;padding:0 14px;box-sizing:border-box;background:#111827;color:#fff}.component-tabs{display:flex;align-items:center;gap:4px;flex:1;min-width:0;overflow-x:auto}.component-tabs button,.toolbar-actions button{border:0;border-radius:6px;padding:7px 10px;background:transparent;color:#cbd5e1;cursor:pointer;white-space:nowrap}.component-tabs button.active,.component-tabs button:hover{background:#374151;color:#fff}.toolbar-actions{display:flex;gap:4px}.toolbar-actions button{background:#1f2937}.toolbar-actions .copy-button{background:#2563eb;color:#fff}.editor-body{flex:1;display:flex;min-height:0}.editor--preview :deep(.component-stage){margin-top:0}
</style>
