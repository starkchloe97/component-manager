<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import { Box, Columns3, Image, Minus, MousePointer2, Pilcrow, Type } from "@lucide/vue";
import { editorRegistry } from "@/config/editorRegistry";

const props = defineProps({
  open: { type: Boolean, default: false },
  anchor: { type: Object, default: null },
  title: { type: String, default: "Add" },
});
const emit = defineEmits(["close", "select"]);
const menu = ref(null);
const position = ref({ top: "8px", left: "8px" });
const elementTypes = computed(() => Object.entries(editorRegistry)
  .filter(([, definition]) => definition.category === "Basic")
  .map(([type, definition]) => ({ type, label: definition.label })));
const iconFor = { heading: Type, text: Pilcrow, image: Image, button: MousePointer2, divider: Minus };

function updatePosition() {
  const anchor = props.anchor;
  if (!anchor || !menu.value) return;
  const rect = anchor.getBoundingClientRect();
  const menuRect = menu.value.getBoundingClientRect();
  const gutter = 8;
  const left = Math.min(Math.max(gutter, rect.left + (rect.width / 2) - (menuRect.width / 2)), window.innerWidth - menuRect.width - gutter);
  const preferredTop = rect.bottom + gutter;
  const top = preferredTop + menuRect.height <= window.innerHeight - gutter
    ? preferredTop
    : Math.max(gutter, rect.top - menuRect.height - gutter);
  position.value = { top: `${top}px`, left: `${left}px` };
}
function close() { emit("close"); }
function select(type) { emit("select", type); }
function handleKeydown(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    close();
    props.anchor?.focus?.();
  }
}
function handlePointerDown(event) {
  if (!menu.value?.contains(event.target) && !props.anchor?.contains?.(event.target)) close();
}

watch(() => props.open, async (isOpen) => {
  if (isOpen) {
    await nextTick();
    updatePosition();
    window.addEventListener("pointerdown", handlePointerDown, true);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    menu.value?.querySelector("button")?.focus();
  } else {
    window.removeEventListener("pointerdown", handlePointerDown, true);
    window.removeEventListener("resize", updatePosition);
    window.removeEventListener("scroll", updatePosition, true);
  }
});
onBeforeUnmount(() => {
  window.removeEventListener("pointerdown", handlePointerDown, true);
  window.removeEventListener("resize", updatePosition);
  window.removeEventListener("scroll", updatePosition, true);
});
</script>

<template>
  <Teleport to="body">
    <section v-if="open" ref="menu" class="add-menu" :style="position" role="menu" :aria-label="title" @keydown="handleKeydown">
      <p class="add-menu-title">{{ title }}</p>
      <p class="add-menu-group">Elements</p>
      <button v-for="item in elementTypes" :key="item.type" type="button" role="menuitem" @click="select(item.type)">
        <component :is="iconFor[item.type] || Type" :size="15" />{{ item.label }}
      </button>
      <p class="add-menu-group">Layout</p>
      <button type="button" role="menuitem" @click="select('container')"><Box :size="15" />Container</button>
      <button type="button" role="menuitem" @click="select('section')"><Columns3 :size="15" />Section</button>
    </section>
  </Teleport>
</template>

<style scoped>
.add-menu{position:fixed;z-index:1600;width:min(244px,calc(100vw - 16px));max-height:calc(100vh - 16px);overflow:auto;padding:6px;border:1px solid #e1e4e8;border-radius:9px;background:#fff;box-shadow:0 14px 34px rgba(15,23,42,.16);color:#313841}
.add-menu-title{margin:3px 6px 8px;font-size:12px;font-weight:700;color:#20252b}.add-menu-group{margin:9px 6px 3px;color:#8a939f;font-size:9px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
.add-menu button{display:flex;align-items:center;gap:8px;width:100%;min-height:34px;padding:0 8px;border:0;border-radius:6px;background:transparent;color:#3e4650;font:inherit;font-size:12px;text-align:left;cursor:pointer}.add-menu button:hover,.add-menu button:focus-visible{outline:0;background:#fff0fb;color:#8f0070}.add-menu button svg{color:#737d89}
@media (prefers-reduced-motion:no-preference){.add-menu{animation:add-menu-in .18s ease-out}@keyframes add-menu-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}}
</style>
