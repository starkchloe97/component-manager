<script setup>
import { Plus } from "@lucide/vue";
defineProps({ label: { type: String, default: "Add" }, compact: { type: Boolean, default: false }, visible: { type: Boolean, default: false } });
const emit = defineEmits(["activate"]);
</script>

<template>
  <div class="insertion-point" :class="{ 'insertion-point--visible': visible, 'insertion-point--compact': compact }">
    <span class="insertion-line" aria-hidden="true" />
    <button type="button" :aria-label="label" @click="emit('activate', $event.currentTarget)">
      <Plus :size="14" /><span>{{ label }}</span>
    </button>
  </div>
</template>

<style scoped>
.insertion-point {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  opacity: 0;
  transition: opacity .18s ease
}

.insertion-line {
  position: absolute;
  right: 0;
  left: 0;
  height: 1px;
  background: #e7e9ed
}

.insertion-point button {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 28px;
  padding: 0 10px;
  border: 1px solid #dfc1e7;
  border-radius: 14px;
  background: #fff;
  color: #8f0070;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(15, 23, 42, .08)
}

.insertion-point button:hover,
.insertion-point button:focus-visible {
  outline: 0;
  border-color: #b9159d;
  background: #fff4fe
}

.insertion-point--visible,
.insertion-point:hover,
.insertion-point:focus-within {
  opacity: 1
}

.insertion-point--compact button {
  width: 26px;
  padding: 0;
  justify-content: center
}

.insertion-point--compact button span {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap
}

@media (prefers-reduced-motion:reduce) {
  .insertion-point {
    transition: none
  }
}
</style>
