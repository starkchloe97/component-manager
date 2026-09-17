<script setup>
import { computed } from "vue";

const props = defineProps({
  sections: { type: Array, required: true },
});
const emit = defineEmits(["select", "remove"]);

const hasSections = computed(() => props.sections.length > 0);
</script>

<template>
  <div class="sections-stack" data-editor-added-sections>
    <section
      v-for="section in sections"
      :key="section.id"
      class="added-section"
      :data-editor-element="section.selector"
      @click="emit('select', section)"
    >
      <button
        type="button"
        class="section-remove"
        aria-label="Remove section"
        @click.stop="emit('remove', section.id)"
      >
        ×
      </button>

      <div class="section-columns">
        <div
          v-for="(column, index) in section.columns"
          :key="`${section.id}-${index}`"
          class="section-column"
          :style="{ flexBasis: `${column}%` }"
        >
          <span>Column {{ index + 1 }}</span>
        </div>
      </div>
    </section>

    <div v-if="!hasSections" class="sections-hint">
      New sections will appear here underneath the component.
    </div>
  </div>
</template>

<style scoped>
.sections-stack{width:min(1400px,calc(100% - 48px));margin:0 auto 60px;box-sizing:border-box}.added-section{position:relative;min-height:150px;margin-top:24px;padding:28px 20px;box-sizing:border-box;border:1px dashed #cbd5e1;border-radius:2px;background:#fff;box-shadow:0 8px 30px rgba(15,23,42,.06);cursor:pointer}.added-section:hover{border-color:#93c5fd}.section-remove{position:absolute;top:8px;right:8px;width:25px;height:25px;border:0;border-radius:6px;background:#f1f5f9;color:#64748b;font-size:17px;line-height:1;cursor:pointer;z-index:2}.section-remove:hover{background:#fee2e2;color:#dc2626}.section-columns{display:flex;gap:12px;width:100%;min-height:94px}.section-column{display:flex;align-items:center;justify-content:center;min-width:0;padding:12px;box-sizing:border-box;border:1px dashed #dbe3ee;border-radius:7px;background:#f8fafc;color:#94a3b8;font-size:10px;font-weight:700}.sections-hint{margin-top:16px;padding:12px;text-align:center;color:#94a3b8;font-size:10px;border:1px dashed #dbe3ee;border-radius:8px;background:rgba(255,255,255,.6)}
@media(max-width:760px){.sections-stack{width:calc(100% - 24px)}.section-columns{gap:6px}.added-section{padding:24px 10px}}
</style>
