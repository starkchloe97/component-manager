<script setup>
import { computed } from "vue";
import { useEditor } from "@/composables/useEditor";

const {
  selectedNode,
  selectedNodeId,
  deleteNode,
  duplicateNode,
} = useEditor();

const node = computed(() => selectedNode.value);

function updateProp(key, value) {
  if (!node.value) return;

  node.value.props[key] = value;
}

function updateStyle(key, value) {
  if (!node.value) return;

  node.value.styles[key] = value;
}
</script>

<template>
  <aside class="settings-panel">
    <template v-if="node">
      <div class="settings-header">
        <div>
          <small>Selected</small>
          <h3>{{ node.type }}</h3>
        </div>

        <div class="actions">
          <button
            type="button"
            @click="duplicateNode(selectedNodeId)"
          >
            Duplicate
          </button>

          <button
            type="button"
            @click="deleteNode(selectedNodeId)"
          >
            Delete
          </button>
        </div>
      </div>

      <!-- CONTENT -->
      <section class="settings-section">
        <h4>Content</h4>

        <label
          v-if="node.props.text !== undefined"
        >
          Text

          <textarea
            :value="node.props.text"
            @input="
              updateProp(
                'text',
                $event.target.value
              )
            "
          />
        </label>

        <label
          v-if="node.props.href !== undefined"
        >
          Link

          <input
            type="text"
            :value="node.props.href"
            @input="
              updateProp(
                'href',
                $event.target.value
              )
            "
          />
        </label>

        <label
          v-if="node.props.src !== undefined"
        >
          Image URL

          <input
            type="text"
            :value="node.props.src"
            @input="
              updateProp(
                'src',
                $event.target.value
              )
            "
          />
        </label>
      </section>

      <!-- STYLE -->
      <section class="settings-section">
        <h4>Style</h4>

        <label
          v-for="(value, key) in node.styles"
          :key="key"
        >
          {{ formatLabel(key) }}

          <div
            v-if="isColor(value)"
            class="color-control"
          >
            <input
              type="color"
              :value="value"
              @input="
                updateStyle(
                  key,
                  $event.target.value
                )
              "
            />

            <input
              type="text"
              :value="value"
              @input="
                updateStyle(
                  key,
                  $event.target.value
                )
              "
            />
          </div>

          <input
            v-else
            type="text"
            :value="value"
            @input="
              updateStyle(
                key,
                $event.target.value
              )
            "
          />
        </label>
      </section>
    </template>

    <div
      v-else
      class="empty"
    >
      Select an element to edit it.
    </div>
  </aside>
</template>

<script>
export default {
  methods: {
    isColor(value) {
      return (
        typeof value === "string" &&
        /^#[0-9a-f]{3,8}$/i.test(value)
      );
    },

    formatLabel(name) {
      return name
        .replace(/([A-Z])/g, " $1")
        .replace(/[-_]/g, " ")
        .replace(/^./, (char) =>
          char.toUpperCase()
        );
    },
  },
};
</script>

<style scoped>
.settings-panel {
  width: 320px;
  flex: 0 0 320px;
  background: white;
  border-left: 1px solid #e5e7eb;
  overflow-y: auto;
}

.settings-header {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.settings-header small {
  color: #9ca3af;
}

.settings-header h3 {
  margin: 3px 0 12px;
}

.actions {
  display: flex;
  gap: 6px;
}

.actions button {
  flex: 1;
  height: 32px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  cursor: pointer;
}

.settings-section {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.settings-section h4 {
  margin: 0 0 14px;
}

.settings-section label {
  display: block;
  margin-bottom: 14px;
  font-size: 12px;
  font-weight: 600;
}

.settings-section input,
.settings-section textarea {
  width: 100%;
  margin-top: 6px;
  box-sizing: border-box;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}

.settings-section textarea {
  min-height: 80px;
  resize: vertical;
}

.color-control {
  display: flex;
  gap: 6px;
}

.color-control input[type="color"] {
  width: 42px;
  padding: 2px;
}

.empty {
  padding: 20px;
  color: #6b7280;
}
</style>
