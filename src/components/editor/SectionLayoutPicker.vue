<script setup>
const emit = defineEmits(["select", "close"]);

const layouts = [
  { label: "Full Width", value: "100" },
  { label: "50 / 50", value: "50-50" },
  { label: "33 / 67", value: "33-67" },
  { label: "67 / 33", value: "67-33" },
  { label: "25 / 75", value: "25-75" },
  { label: "75 / 25", value: "75-25" },
  { label: "33 / 33 / 33", value: "33-33-33" },
  { label: "25 / 50 / 25", value: "25-50-25" },
];
</script>

<template>
  <div class="picker-backdrop" @click.self="emit('close')">
    <section class="picker" role="dialog" aria-modal="true" aria-label="Add section">
      <header class="picker-header">
        <div>
          <strong>Add section</strong>
          <span>Choose the column layout for the new section.</span>
        </div>
        <button type="button" class="close" aria-label="Close" @click="emit('close')">×</button>
      </header>

      <div class="layouts">
        <button
          v-for="layout in layouts"
          :key="layout.value"
          type="button"
          class="layout"
          @click="emit('select', layout.value)"
        >
          <span class="preview">
            <i
              v-for="width in layout.value.split('-')"
              :key="width"
              :style="{ flex: `0 0 ${width}%` }"
            />
          </span>
          <span>{{ layout.label }}</span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.picker-backdrop{position:fixed;inset:0;z-index:1200;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(15,23,42,.38);backdrop-filter:blur(2px)}
.picker{width:min(560px,100%);box-sizing:border-box;border:1px solid #dbe3ee;border-radius:12px;background:#fff;box-shadow:0 24px 70px rgba(15,23,42,.22);overflow:hidden}
.picker-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:16px 18px;border-bottom:1px solid #e5e7eb;background:#f8fafc}
.picker-header div{display:flex;flex-direction:column;gap:4px}.picker-header strong{font-size:13px;color:#1e293b}.picker-header span{font-size:11px;color:#64748b}.close{width:28px;height:28px;border:0;border-radius:6px;background:transparent;color:#64748b;font-size:19px;cursor:pointer}.close:hover{background:#e2e8f0;color:#1e293b}
.layouts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:14px}
.layout{min-width:0;padding:11px;border:1px solid #e2e8f0;border-radius:8px;background:#fff;color:#334155;text-align:left;cursor:pointer}.layout:hover{border-color:#93c5fd;background:#eff6ff}.layout>span:last-child{display:block;margin-top:8px;font-size:10px;font-weight:700}
.preview{display:flex;gap:3px;width:100%;height:34px}.preview i{display:block;min-width:0;border-radius:3px;background:#cbd5e1}.layout:hover .preview i{background:#93c5fd}
@media(max-width:520px){.layouts{grid-template-columns:1fr}}
</style>
