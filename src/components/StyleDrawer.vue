<template>
  <>
    <button class="style-trigger" type="button" @click="openDrawer()">
      Customize
    </button>

    <div v-if="drawerOpen" class="drawer-backdrop" @click="closeDrawer" />

    <aside class="style-drawer" :class="{ 'style-drawer--open': drawerOpen }">
      <div class="drawer-header">
        <div>
          <h3>{{ selectedComponent?.name || "Component Styles" }}</h3>
          <p>Edit the selected component</p>
        </div>

        <button class="drawer-close" type="button" @click="closeDrawer">
          ×
        </button>
      </div>

      <div v-if="selectedComponent" class="drawer-content">
        <div v-for="(value, name) in selectedComponent.styles" :key="name" class="control">
          <label :for="`${selectedComponent.id}-${name}`">{{ formatLabel(name) }}</label>

          <div v-if="isColor(value)" class="color-control">
            <input
              :id="`${selectedComponent.id}-${name}-color`"
              v-model="selectedComponent.styles[name]"
              type="color"
            />
            <input
              :id="`${selectedComponent.id}-${name}`"
              v-model="selectedComponent.styles[name]"
              type="text"
            />
          </div>

          <input
            v-else
            :id="`${selectedComponent.id}-${name}`"
            v-model="selectedComponent.styles[name]"
            type="text"
          />
        </div>
      </div>

      <div v-else class="empty-state">
        Select a component to edit its styles.
      </div>

      <div class="drawer-footer">
        <button
          class="copy-button"
          type="button"
          :disabled="!selectedComponent"
          @click="copySelectedComponent"
        >
          {{ copied ? "Copied!" : "Copy component" }}
        </button>
      </div>
    </aside>
  </>
</template>

<script setup>
import { ref } from "vue";
import { useStyleManager } from "@/composables/useStyleManager";
import { useComponentCopy } from "@/composables/useComponentCopy";

const {
  selectedComponent,
  drawerOpen,
  openDrawer,
  closeDrawer,
} = useStyleManager();

const { copySelectedComponent } = useComponentCopy();
const copied = ref(false);

const isColor = (value) => {
  return typeof value === "string" && /^#[0-9a-f]{3,8}$/i.test(value.trim());
};

const formatLabel = (name) => {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/^./, (char) => char.toUpperCase());
};

const copySelected = async () => {
  const success = await copySelectedComponent();

  if (success) {
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  }
};

const copySelectedComponentWithFeedback = copySelected;
</script>

<style scoped>
.style-trigger { position: fixed; right: 24px; bottom: 24px; z-index: 1000; border: 0; border-radius: 10px; padding: 12px 18px; background: #111827; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 8px 30px rgba(0,0,0,.18); }
.style-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 360px; max-width: 90vw; z-index: 1100; background: #fff; box-shadow: -10px 0 40px rgba(0,0,0,.15); transform: translateX(100%); transition: transform .25s ease; display: flex; flex-direction: column; }
.style-drawer--open { transform: translateX(0); }
.drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 20px; border-bottom: 1px solid #e5e7eb; }
.drawer-header h3 { margin: 0; font-size: 18px; font-weight: 700; }
.drawer-header p { margin: 4px 0 0; font-size: 12px; color: #6b7280; }
.drawer-close { width: 34px; height: 34px; border: 0; border-radius: 8px; background: #f3f4f6; font-size: 22px; line-height: 1; cursor: pointer; }
.drawer-content { flex: 1; overflow-y: auto; padding: 20px; }
.control { margin-bottom: 16px; }
.control label { display: block; margin-bottom: 7px; font-size: 12px; font-weight: 600; color: #374151; }
.control > input[type="text"], .color-control input[type="text"] { width: 100%; height: 38px; box-sizing: border-box; padding: 0 10px; border: 1px solid #d1d5db; border-radius: 7px; font-size: 13px; outline: none; }
.color-control { display: flex; gap: 8px; }
.color-control input[type="color"] { width: 42px; height: 38px; padding: 2px; border: 1px solid #d1d5db; border-radius: 7px; background: #fff; cursor: pointer; }
.color-control input[type="text"] { flex: 1; min-width: 0; }
.empty-state { flex: 1; padding: 24px 20px; color: #6b7280; font-size: 13px; }
.drawer-footer { padding: 16px 20px; border-top: 1px solid #e5e7eb; }
.copy-button { width: 100%; height: 42px; border: 0; border-radius: 8px; background: #111827; color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; }
.copy-button:disabled { opacity: .45; cursor: not-allowed; }
.drawer-backdrop { position: fixed; inset: 0; z-index: 1050; background: rgba(0,0,0,.35); }
</style>
