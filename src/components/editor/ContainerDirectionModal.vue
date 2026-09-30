<script setup>
import { X } from "@lucide/vue";

defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(["select", "close"]);

function select(direction) {
  emit("select", direction);
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="container-direction-backdrop" @click.self="emit('close')">
      <section
        class="container-direction-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="container-direction-title"
      >
        <header class="container-direction-header">
          <div>
            <h2 id="container-direction-title">Add Flexbox container to page</h2>
            <p>Choose a container direction.</p>
          </div>
          <button
            type="button"
            class="container-direction-close"
            aria-label="Close"
            @click="emit('close')"
          >
            <X :size="18" />
          </button>
        </header>

        <div class="container-direction-options">
          <button type="button" class="direction-card" @click="select('column')">
            <span class="direction-preview direction-preview--column" aria-hidden="true">
              <i /><i /><i />
            </span>
            <span class="direction-title">Flexbox - Column</span>
            <span class="direction-description">Stack children vertically.</span>
          </button>

          <button type="button" class="direction-card" @click="select('row')">
            <span class="direction-preview direction-preview--row" aria-hidden="true">
              <i /><i /><i />
            </span>
            <span class="direction-title">Flexbox - Row</span>
            <span class="direction-description">Arrange children horizontally.</span>
          </button>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.container-direction-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1800;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(15, 23, 42, .26);
  backdrop-filter: blur(2px);
}

.container-direction-modal {
  width: min(520px, calc(100vw - 32px));
  overflow: hidden;
  border: 1px solid #e1e5ea;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 24px 70px rgba(15, 23, 42, .2);
}

.container-direction-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding: 22px 24px 18px;
  border-bottom: 1px solid #eceff2;
}

.container-direction-header h2 {
  margin: 0;
  color: #252b33;
  font-size: 16px;
  font-weight: 700;
}

.container-direction-header p {
  margin: 6px 0 0;
  color: #7a8490;
  font-size: 12px;
}

.container-direction-close {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #68727d;
  cursor: pointer;
}

.container-direction-close:hover,
.container-direction-close:focus-visible {
  outline: 0;
  background: #f1f3f5;
  color: #252b33;
}

.container-direction-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  padding: 20px 24px 24px;
}

.direction-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 176px;
  padding: 18px 14px 16px;
  border: 1px solid #dfe4e9;
  border-radius: 10px;
  background: #fff;
  color: #303741;
  cursor: pointer;
  transition: border-color .16s ease, box-shadow .16s ease, transform .16s ease, background .16s ease;
}

.direction-card:hover,
.direction-card:focus-visible {
  outline: 0;
  border-color: #d88be7;
  background: #fff9fe;
  box-shadow: 0 8px 24px rgba(173, 36, 164, .1);
  transform: translateY(-1px);
}

.direction-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 116px;
  height: 86px;
  gap: 6px;
  margin-bottom: 16px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px dashed #aeb7c2;
  border-radius: 5px;
}

.direction-preview i {
  display: block;
  width: 26px;
  height: 18px;
  border-radius: 3px;
  background: #d2d7dc;
}

.direction-preview--column {
  flex-direction: column;
}

.direction-preview--column i {
  width: 46px;
  height: 14px;
}

.direction-preview--row {
  flex-direction: row;
}

.direction-preview--row i {
  width: 24px;
  height: 34px;
}

.direction-title {
  font-size: 13px;
  font-weight: 700;
}

.direction-description {
  margin-top: 5px;
  color: #89929c;
  font-size: 10px;
}

@media (max-width: 560px) {
  .container-direction-options {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .direction-card {
    transition: none;
  }
}
</style>
