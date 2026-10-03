<script setup>
import { ref, watch } from "vue";
import { ChevronLeft, X } from "@lucide/vue";

const props = defineProps({
  open: { type: Boolean, default: true },
  embedded: { type: Boolean, default: true },
});

const emit = defineEmits(["select", "close"]);
const step = ref("type");
const layoutType = ref("flex");

watch(() => props.open, (open) => {
  if (open) {
    step.value = "type";
    layoutType.value = "flex";
  }
});

function chooseType(type) {
  layoutType.value = type;
  step.value = "structure";
}

function chooseStructure(structure) {
  emit("select", {
    display: layoutType.value === "grid" ? "grid" : "flex",
    structure,
  });
}

function goBack() {
  if (step.value === "structure") {
    step.value = "type";
    return;
  }
  emit("close");
}
</script>

<template>
  <div
    v-if="open"
    class="structure-picker"
    :class="{ 'structure-picker--embedded': embedded }"
    data-editor-chrome="true"
    @click.stop
  >
    <header class="structure-picker__header">
      <button type="button" class="structure-picker__icon" aria-label="Back" @click="goBack">
        <ChevronLeft :size="16" />
      </button>
      <strong>{{ step === "type" ? "Which layout would you like to use?" : "Select your structure" }}</strong>
      <button type="button" class="structure-picker__icon" aria-label="Close" @click="emit('close')">
        <X :size="16" />
      </button>
    </header>

    <div v-if="step === 'type'" class="structure-picker__types">
      <button type="button" class="layout-type" @click="chooseType('flex')">
        <span class="layout-type__preview layout-type__preview--flex" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span>Flexbox</span>
      </button>
      <button type="button" class="layout-type" @click="chooseType('grid')">
        <span class="layout-type__preview layout-type__preview--grid" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
        <span>Grid</span>
      </button>
    </div>

    <div v-else class="structure-picker__structures">
      <button type="button" class="structure" title="Two columns" aria-label="Two columns" @click="chooseStructure('row-2')">
        <span><i /><i /></span>
      </button>
      <button type="button" class="structure structure--stack" title="Two rows" aria-label="Two rows" @click="chooseStructure('col-2')">
        <span><i /><i /></span>
      </button>
      <button type="button" class="structure" title="Three columns" aria-label="Three columns" @click="chooseStructure('row-3')">
        <span><i /><i /><i /></span>
      </button>
      <button type="button" class="structure structure--stack" title="Three rows" aria-label="Three rows" @click="chooseStructure('col-3')">
        <span><i /><i /><i /></span>
      </button>
      <button type="button" class="structure structure--two-one" title="Two plus one" aria-label="Two plus one" @click="chooseStructure('two-one')">
        <span class="two-one"><b /><b /><b /></span>
      </button>
      <button type="button" class="structure structure--quad" title="Four cells" aria-label="Four cells" @click="chooseStructure('quad')">
        <span class="quad"><b /><b /><b /><b /></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.structure-picker {
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed #c5ccd4;
  background: #fff;
  color: #5b6570;
}

.structure-picker--embedded {
  min-height: 148px;
  margin: 8px 0;
}

.structure-picker__header {
  display: grid;
  grid-template-columns: 32px 1fr 32px;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 4px;
}

.structure-picker__header strong {
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  color: #5f6a75;
}

.structure-picker__icon {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: #6d7782;
  cursor: pointer;
}

.structure-picker__icon:hover,
.structure-picker__icon:focus-visible {
  outline: 0;
  background: #f3f4f6;
  color: #1f2933;
}

.structure-picker__types {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 48px;
  padding: 18px 24px 28px;
}

.layout-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #5b6570;
  font-size: 13px;
  cursor: pointer;
}

.layout-type__preview {
  display: grid;
  width: 72px;
  height: 72px;
  padding: 8px;
  box-sizing: border-box;
  border: 1px dashed #c5ccd4;
  border-radius: 2px;
  gap: 4px;
}

.layout-type__preview i {
  display: block;
  background: #d6dbe1;
}

.layout-type__preview--flex {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.layout-type__preview--flex i:first-child {
  grid-row: 1 / 3;
  background: #c3c9d1;
}

.layout-type__preview--grid {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.layout-type:hover .layout-type__preview,
.layout-type:focus-visible .layout-type__preview {
  border-color: #d86ce9;
  background: #fff8fd;
}

.structure-picker__structures {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 22px 16px 28px;
}

.structure {
  width: 56px;
  height: 40px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.structure span,
.structure .two-one,
.structure .quad {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 4px;
}

.structure i,
.structure b {
  display: block;
  flex: 1;
  border: 1px dashed #b7c0c9;
  border-radius: 2px;
  box-sizing: border-box;
}

.structure--stack span {
  flex-direction: column;
}

.structure--two-one .two-one,
.structure--quad .quad {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4px;
}

.structure--two-one .two-one b:last-child {
  grid-column: 1 / -1;
}

.structure:hover i,
.structure:hover b,
.structure:focus-visible i,
.structure:focus-visible b {
  border-color: #d86ce9;
  background: #fff4fc;
}
</style>
