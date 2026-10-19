<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import Editor from "./Editor.vue";
import { componentRegistry } from "@/config/componentRegistry";
import { useComponentEditor } from "@/composables/useComponentEditor";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: "Browse every component on one page. Open the editor for the component you want to customize." },
  prefix: { type: String, default: "" },
  prefixes: { type: Array, default: () => [] },
});

const prefixes = computed(() => Array.isArray(props.prefixes) && props.prefixes.length ? props.prefixes : [props.prefix]);
const matchesComponent = (id) => prefixes.value.some((prefix) => prefix && id.startsWith(prefix));
const components = computed(() => Object.values(componentRegistry).filter((item) => matchesComponent(item.id)));
const EDITING_KEY = "component-manager:editing-component";
const initialEditingId = typeof window !== "undefined" ? window.localStorage.getItem(EDITING_KEY) : null;
const editingId = ref(initialEditingId && componentRegistry[initialEditingId] && matchesComponent(componentRegistry[initialEditingId].id) ? initialEditingId : null);
const editingComponent = computed(() => editingId.value ? componentRegistry[editingId.value] : null);

const { overrides, contentOverrides, imageOverrides, applyOverrides } = useComponentEditor();
const previewRoots = new Map();
const lastFocusedButton = ref(null);

const selectableTags = "section, div, main, header, footer, nav, aside, article, figure, figcaption, h1, h2, h3, h4, h5, h6, p, span, strong, em, small, mark, del, ins, code, pre, blockquote, time, address, a, button, img, ul, ol, li, dl, dt, dd, table, thead, tbody, tfoot, tr, th, td, caption, form, input, textarea, select, label";

function elementPath(element, boundary) {
  const parts = [];
  let current = element;
  while (current && current !== boundary) {
    const parent = current.parentElement;
    if (!parent) break;
    parts.unshift(Array.from(parent.children).indexOf(current));
    current = parent;
  }
  return parts.join("-");
}

function assignEditorKeys(root) {
  if (!root) return;
  root.querySelectorAll(selectableTags).forEach((element) => {
    if (!element.getAttribute("data-editor-element")) {
      element.setAttribute("data-editor-element", elementPath(element, root));
    }
  });
}

function prepareAndApply(id, root) {
  if (!root || !id) return;
  nextTick(() => {
    assignEditorKeys(root);
    applyOverrides(root, id);
  });
}

function registerPreviewRoot(id, el) {
  if (el) {
    previewRoots.set(id, el);
    prepareAndApply(id, el);
  } else {
    previewRoots.delete(id);
  }
}

function syncAllPreviews() {
  previewRoots.forEach((el, id) => {
    prepareAndApply(id, el);
  });
}

// Keep previews synchronized with any override changes
watch([overrides, contentOverrides, imageOverrides], syncAllPreviews, { deep: true });

function startEditing(id, event) {
  lastFocusedButton.value = event?.currentTarget || null;
  editingId.value = id;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(EDITING_KEY, id);
    document.body.style.overflow = "hidden";
  }
}

function closeEditor() {
  editingId.value = null;
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(EDITING_KEY);
    document.body.style.overflow = "";
  }
  nextTick(() => {
    syncAllPreviews();
    lastFocusedButton.value?.focus?.();
  });
}

function handleGlobalKeydown(event) {
  if (event.key === "Escape" && editingComponent.value) {
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag !== "input" && tag !== "textarea" && !document.activeElement?.isContentEditable) {
      closeEditor();
    }
  }
}

function focusDrawer() {
  if (!drawerPanel.value) return;
  const first = drawerPanel.value.querySelector(FOCUSABLE);
  first?.focus();
}

const drawerPanel = ref(null);
const FOCUSABLE = 'a[href], button:not(:disabled), input, textarea, select, [tabindex]:not([tabindex="-1"])';

function trapFocus(event) {
  if (!drawerPanel.value || !editingComponent.value) return;
  const focusable = Array.from(drawerPanel.value.querySelectorAll(FOCUSABLE)).filter((el) => el.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.key === 'Tab') {
    if (event.shiftKey) {
      if (document.activeElement === first) { event.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }
}

onMounted(() => {
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", handleGlobalKeydown);
    window.addEventListener("keydown", trapFocus);
    if (editingComponent.value) {
      document.body.style.overflow = "hidden";
    }
  }
  syncAllPreviews();
});

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("keydown", handleGlobalKeydown);
    window.removeEventListener("keydown", trapFocus);
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <main class="component-library-page">
    <header class="page-header">
      <div>
        <p class="eyebrow">COMPONENT MANAGER</p>
        <h1>{{ title }}</h1>
        <p class="page-description">{{ description }}</p>
      </div>
      <span class="component-count">
        {{ components.length }} {{ components.length === 1 ? 'component' : 'components' }}
      </span>
    </header>

    <!-- Empty State -->
    <section v-if="components.length === 0" class="empty-library">
      <div class="empty-library__icon" aria-hidden="true">📦</div>
      <h2 class="empty-library__title">No components found</h2>
      <p class="empty-library__text">No components match this section prefix.</p>
      <RouterLink to="/" class="empty-library__link">Browse all sections</RouterLink>
    </section>

    <!-- Component List: Always kept mounted so drawer slide doesn't destroy scroll or layout -->
    <section v-else class="component-list" :aria-label="title">
      <article v-for="(item, index) in components" :key="item.id" class="component-card">
        <div class="component-card__header">
          <div>
            <span class="component-index">{{ String(index + 1).padStart(2, "0") }}</span>
            <h2>{{ item.name }}</h2>
          </div>
          <button type="button" class="edit-button" @click="startEditing(item.id, $event)">
            Edit component
          </button>
        </div>
        <div
          :ref="(el) => registerPreviewRoot(item.id, el)"
          class="component-preview"
          :data-editor-component-id="item.id"
        >
          <component :is="item.component" />
        </div>
      </article>
    </section>

    <!-- Drawer Teleport with Transition -->
    <Teleport to="body">
      <Transition name="drawer" @after-enter="focusDrawer">
        <div
          v-if="editingComponent"
          class="drawer-backdrop"
          role="presentation"
          @click.self="closeEditor"
        >
          <aside
            ref="drawerPanel"
            class="drawer-panel"
            role="dialog"
            aria-modal="true"
            :aria-label="`Edit ${editingComponent?.name || 'Component'}`"
          >
            <Editor :initial-component-id="editingComponent.id" @close="closeEditor" />
          </aside>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<style scoped>
.component-library-page {
  min-height: 100vh;
  padding: 40px clamp(20px, 4vw, 64px) 80px;
  box-sizing: border-box;
  background: #f5f7fa;
}

.page-header {
  max-width: 1400px;
  margin: 0 auto 28px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.eyebrow {
  margin: 0 0 6px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .14em;
  color: #64748b;
}

.page-header h1 {
  margin: 0;
  color: #111827;
  font-size: clamp(26px, 3vw, 38px);
  line-height: 1.1;
}

.page-description {
  max-width: 650px;
  margin: 10px 0 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
}

.component-count {
  flex: 0 0 auto;
  padding: 7px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  background: #fff;
  color: #475569;
  font-size: 11px;
  font-weight: 600;
}

.component-list {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.component-card {
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 3px 14px rgba(15, 23, 42, .04);
}

.component-card__header {
  min-height: 62px;
  padding: 10px 14px 10px 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid #edf1f5;
}

.component-card__header > div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.component-index {
  color: #94a3b8;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
}

.component-card h2 {
  margin: 0;
  color: #1e293b;
  font-size: 14px;
}

.edit-button {
  border: 1px solid #dbe3ee;
  border-radius: 7px;
  padding: 8px 12px;
  background: #fff;
  color: #1d4ed8;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.edit-button:hover {
  border-color: #93c5fd;
  background: #eff6ff;
}

.component-preview {
  overflow: hidden;
  background: #fff;
}

/* Empty State */
.empty-library {
  max-width: 500px;
  margin: 60px auto;
  padding: 40px 24px;
  text-align: center;
  background: #fff;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
}

.empty-library__icon {
  font-size: 38px;
  margin-bottom: 12px;
}

.empty-library__title {
  margin: 0 0 8px;
  font-size: 18px;
  color: #1e293b;
}

.empty-library__text {
  margin: 0 0 20px;
  font-size: 14px;
  color: #64748b;
}

.empty-library__link {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background: #8f0070;
  color: #fff;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s ease;
}

.empty-library__link:hover {
  background: #72005a;
}

/* Drawer Transitions */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
}

.drawer-panel {
  position: relative;
  width: 100vw;
  height: 100%;
  max-width: 100vw;
  background: #fff;
  box-shadow: -10px 0 35px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.3s ease;
}

.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel {
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-enter-from {
  opacity: 0;
}

.drawer-enter-from .drawer-panel {
  transform: translateX(100%);
}

.drawer-leave-to {
  opacity: 0;
}

.drawer-leave-to .drawer-panel {
  transform: translateX(100%);
}

@media (max-width: 640px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .component-card__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .edit-button {
    width: 100%;
  }
}
</style>
