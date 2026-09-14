<script setup>
import { useEditor } from "@/composables/useEditor";

const { addSection } = useEditor();

const layouts = [
  {
    label: "Full Width",
    value: "100",
  },
  {
    label: "50 / 50",
    value: "50-50",
  },
  {
    label: "33 / 67",
    value: "33-67",
  },
  {
    label: "67 / 33",
    value: "67-33",
  },
  {
    label: "25 / 75",
    value: "25-75",
  },
  {
    label: "75 / 25",
    value: "75-25",
  },
  {
    label: "33 / 33 / 33",
    value: "33-33-33",
  },
  {
    label: "25 / 50 / 25",
    value: "25-50-25",
  },
];
</script>

<template>
  <div class="add-section">
    <h3>Choose a layout</h3>

    <div class="layouts">
      <button
        v-for="layout in layouts"
        :key="layout.value"
        type="button"
        @click="addSection(layout.value)"
      >
        <div class="preview">
          <span
            v-for="width in layout.value.split('-')"
            :key="width"
            :style="{ width: `${width}%` }"
          />
        </div>

        <small>{{ layout.label }}</small>
      </button>
    </div>
  </div>
</template>

<style scoped>
.add-section {
  padding: 20px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

.add-section h3 {
  margin: 0 0 16px;
  font-size: 15px;
}

.layouts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.layouts button {
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
}

.layouts button:hover {
  border-color: #3b82f6;
}

.preview {
  display: flex;
  gap: 2px;
  height: 35px;
  margin-bottom: 8px;
}

.preview span {
  display: block;
  min-width: 0;
  background: #d1d5db;
}

.layouts small {
  font-size: 10px;
}
</style>
