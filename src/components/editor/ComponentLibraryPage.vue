<script setup>
import { computed, ref } from "vue";
import Editor from "./Editor.vue";
import { componentRegistry } from "@/config/componentRegistry";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: "Browse every component on one page. Open the editor for the component you want to customize." },
  prefix: { type: String, default: "" },
  prefixes: { type: Array, default: () => [] },
});

const prefixes = computed(() => props.prefixes.length ? props.prefixes : [props.prefix]);
const components = computed(() => Object.values(componentRegistry).filter((item) =>
  prefixes.value.some((prefix) => prefix && item.id.startsWith(prefix))
));
const EDITING_KEY = "component-manager:editing-component";
const initialEditingId = typeof window !== "undefined" ? window.localStorage.getItem(EDITING_KEY) : null;
const editingId = ref(initialEditingId && componentRegistry[initialEditingId]?.id?.startsWith(props.prefix) ? initialEditingId : null);
const editingComponent = computed(() => editingId.value ? componentRegistry[editingId.value] : null);

function startEditing(id) { editingId.value = id; if (typeof window !== "undefined") window.localStorage.setItem(EDITING_KEY, id); }
function closeEditor() { editingId.value = null; if (typeof window !== "undefined") window.localStorage.removeItem(EDITING_KEY); }
</script>

<template>
  <main class="component-library-page">
    <header class="page-header">
      <div>
        <p class="eyebrow">COMPONENT MANAGER</p>
        <h1>{{ title }}</h1>
        <p class="page-description">{{ description }}</p>
      </div>
      <span class="component-count">{{ components.length }} components</span>
    </header>

    <section v-if="!editingComponent" class="component-list" :aria-label="title">
      <article v-for="(item, index) in components" :key="item.id" class="component-card">
        <div class="component-card__header">
          <div>
            <span class="component-index">{{ String(index + 1).padStart(2, "0") }}</span>
            <h2>{{ item.name }}</h2>
          </div>
          <button type="button" class="edit-button" @click="startEditing(item.id)">Edit component</button>
        </div>
        <div class="component-preview">
          <component :is="item.component" />
        </div>
      </article>
    </section>

    <Teleport to="body">
      <div v-if="editingComponent" class="editor-overlay">
        <Editor :initial-component-id="editingComponent.id" @close="closeEditor" />
      </div>
    </Teleport>
  </main>
</template>

<style scoped>
.component-library-page{min-height:100vh;padding:40px clamp(20px,4vw,64px) 80px;box-sizing:border-box;background:#f5f7fa}.page-header{max-width:1400px;margin:0 auto 28px;display:flex;align-items:flex-end;justify-content:space-between;gap:24px}.eyebrow{margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:.14em;color:#64748b}.page-header h1{margin:0;color:#111827;font-size:clamp(26px,3vw,38px);line-height:1.1}.page-description{max-width:650px;margin:10px 0 0;color:#64748b;font-size:14px;line-height:1.6}.component-count{flex:0 0 auto;padding:7px 10px;border:1px solid #e2e8f0;border-radius:999px;background:#fff;color:#475569;font-size:11px;font-weight:600}.component-list{max-width:1400px;margin:0 auto;display:flex;flex-direction:column;gap:24px}.component-card{overflow:hidden;border:1px solid #e2e8f0;border-radius:12px;background:#fff;box-shadow:0 3px 14px rgba(15,23,42,.04)}.component-card__header{min-height:62px;padding:10px 14px 10px 18px;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:16px;border-bottom:1px solid #edf1f5}.component-card__header>div{display:flex;align-items:center;gap:10px}.component-index{color:#94a3b8;font-size:10px;font-weight:700;letter-spacing:.08em}.component-card h2{margin:0;color:#1e293b;font-size:14px}.edit-button{border:1px solid #dbe3ee;border-radius:7px;padding:8px 12px;background:#fff;color:#1d4ed8;font-size:11px;font-weight:600;cursor:pointer}.edit-button:hover{border-color:#93c5fd;background:#eff6ff}.component-preview{overflow:hidden;background:#fff}.editor-overlay{position:fixed;inset:0;z-index:1000;background:#eef1f5}@media(max-width:640px){.page-header{align-items:flex-start;flex-direction:column}.component-card__header{align-items:flex-start;flex-direction:column}.edit-button{width:100%}}
</style>
