<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import { Clock3, Search, X } from "@lucide/vue";
import { loadIconNames, popularIconNames, readableIconName, resolveIcon, searchIcons } from "@/config/iconLibrary";

const props = defineProps({ open: { type: Boolean, default: false }, selected: { type: String, default: "Heart" } });
const emit = defineEmits(["close", "select"]);
const searchInput = ref(null);
const query = ref("");
const picker = ref(null);
const recentKey = "component-manager:recent-icons";
const recent = ref([]);
const availableIcons = ref([]);
const loadingIcons = ref(false);
const PAGE_SIZE = 180;

function readRecent() {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(recentKey) || "[]");
    return Array.isArray(value) ? value.slice(0, 12) : [];
  } catch { return []; }
}
function saveRecent(name) {
  recent.value = [name, ...recent.value.filter((item) => item !== name)].slice(0, 12);
  if (typeof window !== "undefined") window.localStorage.setItem(recentKey, JSON.stringify(recent.value));
}
const searchedIcons = computed(() => searchIcons(availableIcons.value, query.value));
const matchingIcons = computed(() => searchedIcons.value.slice(0, PAGE_SIZE));
const showingSearch = computed(() => Boolean(query.value.trim()));
const activeHeading = computed(() => showingSearch.value ? `Search results (${matchingIcons.value.length}${searchedIcons.value.length > PAGE_SIZE ? "+" : ""})` : "All icons");

function choose(name) { saveRecent(name); emit("select", name); }
function close() { emit("close"); }
function onKeydown(event) {
  if (event.key === "Escape") { event.preventDefault(); close(); }
}
function onPointerDown(event) {
  if (!picker.value?.contains(event.target)) close();
}
watch(() => props.open, async (isOpen) => {
  if (!isOpen) {
    window.removeEventListener("pointerdown", onPointerDown, true);
    window.removeEventListener("keydown", onKeydown, true);
    return;
  }
  recent.value = readRecent();
  query.value = "";
  loadingIcons.value = true;
  try { availableIcons.value = await loadIconNames(); } finally { loadingIcons.value = false; }
  if (!props.open) return;
  await nextTick();
  searchInput.value?.focus();
  window.addEventListener("pointerdown", onPointerDown, true);
  window.addEventListener("keydown", onKeydown, true);
});
onBeforeUnmount(() => {
  window.removeEventListener("pointerdown", onPointerDown, true);
  window.removeEventListener("keydown", onKeydown, true);
});
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="icon-picker-backdrop" role="presentation">
      <section ref="picker" class="icon-picker" role="dialog" aria-modal="true" aria-label="Choose an icon">
        <header class="picker-header">
          <div><small>ICON LIBRARY</small><strong>Choose an icon</strong></div>
          <button type="button" aria-label="Close icon picker" @click="close"><X :size="18" /></button>
        </header>
        <label class="icon-search"><Search :size="16" /><input ref="searchInput" v-model="query" type="search"
          placeholder="Search 1,800+ icons" aria-label="Search icons" /><kbd>Esc</kbd></label>
        <div class="picker-scroll">
          <section v-if="!showingSearch && recent.length" class="picker-section">
            <h3><Clock3 :size="14" />Recently used</h3>
            <div class="icon-grid icon-grid--compact"><button v-for="name in recent" :key="name" type="button"
              :class="{ selected: selected === name }" :title="readableIconName(name)" :aria-label="readableIconName(name)"
              @click="choose(name)"><component :is="resolveIcon(name)" :size="22" /></button></div>
          </section>
          <section v-if="!showingSearch" class="picker-section">
            <h3>Popular</h3>
            <div class="icon-grid icon-grid--compact"><button v-for="name in popularIconNames" :key="name" type="button"
              :class="{ selected: selected === name }" :title="readableIconName(name)" :aria-label="readableIconName(name)"
              @click="choose(name)"><component :is="resolveIcon(name)" :size="22" /></button></div>
          </section>
          <section class="picker-section"><h3>{{ activeHeading }}</h3>
            <p v-if="loadingIcons" class="no-icons">Loading icon library…</p>
            <div v-if="matchingIcons.length" class="icon-grid"><button v-for="name in matchingIcons" :key="name" type="button"
              :class="{ selected: selected === name }" :title="readableIconName(name)" :aria-label="readableIconName(name)"
              @click="choose(name)"><component :is="resolveIcon(name)" :size="22" /><span>{{ readableIconName(name) }}</span></button></div>
            <p v-else class="no-icons">No icons match “{{ query }}”. Try a shorter search.</p>
          </section>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.icon-picker-backdrop { position: fixed; inset: 0; z-index: 2000; display: grid; place-items: center; padding: 16px; background: rgba(15, 23, 42, .22) }
.icon-picker { width: min(700px, 100%); max-height: min(700px, calc(100vh - 32px)); display: flex; flex-direction: column; overflow: hidden; border: 1px solid #dfe3e7; border-radius: 10px; background: #fff; box-shadow: 0 24px 70px rgba(15, 23, 42, .25); color: #32373c }
.picker-header { display: flex; align-items: center; justify-content: space-between; padding: 17px 20px 13px; border-bottom: 1px solid #eef0f2 }
.picker-header div { display: grid; gap: 2px }.picker-header small { color: #a4afb7; font-size: 9px; font-weight: 700; letter-spacing: .08em }.picker-header strong { font-size: 15px }
.picker-header button { display: grid; place-items: center; width: 30px; height: 30px; border: 0; border-radius: 4px; background: transparent; color: #6d7882; cursor: pointer }.picker-header button:hover,.picker-header button:focus-visible { outline: 0; background: rgba(147,0,63,.08); color: #93003f }
.icon-search { display: flex; align-items: center; gap: 8px; margin: 14px 20px; padding: 0 10px; border: 1px solid #d5dadf; border-radius: 5px; color: #75808a }.icon-search:focus-within { border-color: #93003f; box-shadow: 0 0 0 1px #93003f }.icon-search input { width: 100%; height: 36px; min-width: 0; border: 0; outline: 0; color: #32373c; font: 13px/1.4 inherit }.icon-search kbd { border: 1px solid #dfe3e7; border-radius: 3px; padding: 1px 4px; color: #a4afb7; font-size: 10px }
.picker-scroll { overflow: auto; padding: 0 20px 20px }.picker-section { margin-top: 17px }.picker-section h3 { display: flex; align-items: center; gap: 5px; margin: 0 0 8px; color: #6d7882; font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase }
.icon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)); gap: 6px }.icon-grid button { min-width: 0; min-height: 64px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; padding: 6px 4px; border: 1px solid #e6e9ec; border-radius: 5px; background: #fff; color: #4b5563; cursor: pointer }.icon-grid button span { width: 100%; overflow: hidden; font-size: 9px; line-height: 1.15; text-align: center; text-overflow: ellipsis; white-space: nowrap }.icon-grid button:hover,.icon-grid button:focus-visible { outline: 0; border-color: #bd4daa; background: #fff4fe; color: #93003f }.icon-grid button.selected { border-color: #93003f; background: rgba(147,0,63,.08); color: #93003f; box-shadow: inset 0 0 0 1px #93003f }.icon-grid--compact { grid-template-columns: repeat(auto-fill, minmax(43px, 1fr)) }.icon-grid--compact button { min-height: 42px; padding: 4px }.icon-grid--compact span { display: none }.no-icons { margin: 22px 0; color: #6d7882; font-size: 12px; text-align: center }
@media (max-width: 520px) { .icon-picker-backdrop { padding: 8px }.icon-picker { max-height: calc(100vh - 16px) }.picker-header,.icon-search,.picker-scroll { margin-left: 12px; margin-right: 12px }.picker-header { padding-left: 0; padding-right: 0 }.icon-grid { grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)) } }
</style>
