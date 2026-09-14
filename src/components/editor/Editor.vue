<script setup>
import EditorCanvas from "./EditorCanvas.vue";
import ElementPanel from "./ElementPanel.vue";
import SettingsPanel from "./SettingsPanel.vue";
// import selectedComponent from "@/"
</script>

<template>
  <div class="editor">
    <header class="editor-toolbar">
      <strong>Component Manager</strong>

      <div class="toolbar-actions">
        <button type="button">
          Undo
        </button>

        <button type="button">
          Redo
        </button>

        <button type="button">
          Preview
        </button>
      </div>
      <!-- <Editor
  :component="selectedComponent"
/> -->
    </header>

    <div class="editor-body">
      <ElementPanel />

      <EditorCanvas />

      <SettingsPanel />
    </div>
  </div>
</template>

<style scoped>
.editor {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.editor-toolbar {
  height: 56px;
  flex: 0 0 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #111827;
  color: white;
}

.toolbar-actions {
  display: flex;
  gap: 8px;
}

.toolbar-actions button {
  border: 0;
  border-radius: 6px;
  padding: 7px 12px;
  cursor: pointer;
}

.editor-body {
  flex: 1;
  display: flex;
  min-height: 0;
}
</style>
