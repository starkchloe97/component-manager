<script setup>
import { computed } from "vue";
import { componentRegistry } from "@/config/componentRegistry";

const components = computed(() => Object.values(componentRegistry));
const emit = defineEmits(["select"]);
</script>

<template>
  <aside class="element-panel">
    <div class="panel-title">
      <small>LIBRARY</small>
      <h3>Components</h3>
    </div>

    <div class="component-list">
      <button v-for="item in components" :key="item.id" type="button" class="component-item"
        @click="emit('select', item.id)">
        <span class="component-icon">V</span>
        <span>{{ item.name }}</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.element-panel {
  width: 220px;
  flex: 0 0 220px;
  padding: 14px;
  box-sizing: border-box;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  overflow-y: auto
}

.panel-title small {
  font-size: 9px;
  letter-spacing: .12em;
  color: #9ca3af
}

.panel-title h3 {
  margin: 3px 0 14px;
  font-size: 15px
}

.component-list {
  display: flex;
  flex-direction: column;
  gap: 6px
}

.component-item {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 9px;
  border: 1px solid #e5e7eb;
  border-radius: 7px;
  background: #fff;
  text-align: left;
  cursor: pointer;
  font-size: 11px
}

.component-item:hover {
  border-color: #3b82f6;
  background: #f8fbff
}

.component-icon {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 5px;
  background: #eef2ff;
  color: #4f46e5;
  font-weight: 700
}
</style>
