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
const iconLoadError = ref("");
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
  try {
    if (typeof window !== "undefined") window.localStorage.setItem(recentKey, JSON.stringify(recent.value));
  } catch {
    // Icon selection should still work when storage is unavailable.
  }
}
const iconCategories = [
  { id: "all", label: "All" },
  { id: "arrows", label: "Arrows", test: /^(arrow|chevron|chevrons|move|corner|undo|redo|rotate|refresh|repeat|shuffle|turn|merge|split|expand|collapse|move|switch|reply|forward|rewind|fastforward|signpost|route|navigation)/i },
  { id: "media", label: "Media", test: /^(play|pause|stop|skip|volume|music|audio|video|film|camera|image|mic|microphone|headphones|speaker|radio|disc|clapperboard|podcast|cast|tv|monitor-play|screen-share|subtitles|captions)/i },
  { id: "communication", label: "Communication", test: /^(mail|message|messages|send|inbox|phone|contact|at-sign|reply|forward|chat|speech|megaphone|bell|voicemail|mailbox|mail-open|share|rss|webhook|message-circle|message-square)/i },
  { id: "people", label: "People", test: /^(user|users|contact|person-standing|baby|accessibility|hand|heart-handshake|smile|frown|meh|laugh|thumbs|fingerprint|id-card|badge-check|person)/i },
  { id: "files", label: "Files", test: /^(file|folder|clipboard|notebook|book|book-open|archive|paperclip|files|file-text|file-check|file-plus|file-x|file-search|file-pen|file-edit|download|upload|save|database|hard-drive|cloud)/i },
  { id: "design", label: "Design", test: /^(palette|paint|brush|pen|pencil|eraser|ruler|crop|layers|frame|shapes|type|text|baseline|contrast|pipette|swatch|wand|sparkles|scan|focus|layout|grid|sliders)/i },
  { id: "development", label: "Development", test: /^(code|terminal|bug|git|github|gitlab|braces|brackets|binary|command|variable|webhook|server|workflow|blocks|component|package|cpu|database|regex|file-code|bot|laptop|monitor|keyboard)/i },
  { id: "business", label: "Business", test: /^(briefcase|building|chart|trending|bank|wallet|credit-card|receipt|calculator|coins|dollar|euro|pound|currency|badge-dollar|shopping|store|truck|package|calendar|clock|timer|target|trophy|award|medal|flag|presentation|chart-no-axes)/i },
  { id: "nature", label: "Nature", test: /^(sun|moon|cloud|snow|rain|wind|thermometer|leaf|flower|trees|tree|sprout|mountain|waves|droplet|flame|bird|bug|fish|cat|dog|paw|earth|globe|sunrise|sunset|cloud-rain|cloud-sun|cactus|recycle)/i },
  { id: "shapes", label: "Shapes", test: /^(circle|square|triangle|hexagon|pentagon|octagon|diamond|heart|star|asterisk|plus|minus|x$|check|slash|equal|infinity|cross|circle-check|circle-x|badge|loader|dot|grip|ellipsis)/i },
  { id: "navigation", label: "Navigation", test: /^(house|home|map|map-pin|compass|navigation|locate|map-pinned|signpost|milestone|plane|car|bus|train|bike|ship|anchor|rocket|parking|footprints|route|earth|globe|building)/i },
  { id: "security", label: "Security", test: /^(lock|unlock|shield|key|eye|scan-eye|fingerprint|badge-check|user-check|user-round-check|shield-check|shield-alert|shield-x|shield-question|circle-check|verified|check-check|scan)/i },
  { id: "ui", label: "Interface", test: /^(menu|panel|sidebar|settings|sliders|filter|search|plus|minus|x$|check|more|ellipsis|grip|maximize|minimize|external-link|link|unlink|toggle|switch|square|circle|list|table|columns|rows|align|sort|command|keyboard|mouse|pointer|cursor|bell|calendar|clock)/i },
];
const activeCategory = ref("all");
const pageSize = ref(PAGE_SIZE);
const showingSearch = computed(() => Boolean(query.value.trim()));
const categorizedIcons = computed(() => {
  const names = searchIcons(availableIcons.value, query.value);
  if (activeCategory.value === "all") return names;
  const category = iconCategories.find((item) => item.id === activeCategory.value);
  return category ? names.filter((name) => category.test?.test(name)) : names;
});
const matchingIcons = computed(() => categorizedIcons.value.slice(0, pageSize.value));
const hasMoreIcons = computed(() => matchingIcons.value.length < categorizedIcons.value.length);
const activeHeading = computed(() => {
  const category = iconCategories.find((item) => item.id === activeCategory.value);
  return `${showingSearch.value ? "Search results" : category?.label || "All icons"} (${categorizedIcons.value.length})`;
});
function selectCategory(category) {
  activeCategory.value = category;
  pageSize.value = PAGE_SIZE;
}

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
  activeCategory.value = "all";
  pageSize.value = PAGE_SIZE;
  loadingIcons.value = true;
  iconLoadError.value = "";
  try {
    const names = await loadIconNames();
    availableIcons.value = names;
    if (!names.length) iconLoadError.value = "The Lucide package did not return any icon components.";
  } catch (error) {
    console.error("Unable to load the Lucide icon library:", error);
    iconLoadError.value = "Could not load the Lucide icon library. Check the browser console for the import error.";
  } finally {
    loadingIcons.value = false;
  }
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
        <nav class="icon-category-tabs" aria-label="Icon categories">
          <button v-for="category in iconCategories" :key="category.id" type="button"
            :class="{ active: activeCategory === category.id }" @click="selectCategory(category.id)">
            {{ category.label }}
          </button>
        </nav>
        <div class="picker-scroll">
          <section v-if="!showingSearch && activeCategory === 'all' && recent.length" class="picker-section">
            <h3><Clock3 :size="14" />Recently used</h3>
            <div class="icon-grid icon-grid--compact"><button v-for="name in recent" :key="name" type="button"
              :class="{ selected: selected === name }" :title="readableIconName(name)" :aria-label="readableIconName(name)"
              @click="choose(name)"><component :is="resolveIcon(name)" :size="22" /></button></div>
          </section>
          <section v-if="!showingSearch && activeCategory === 'all'" class="picker-section">
            <h3>Popular</h3>
            <div class="icon-grid icon-grid--compact"><button v-for="name in popularIconNames" :key="name" type="button"
              :class="{ selected: selected === name }" :title="readableIconName(name)" :aria-label="readableIconName(name)"
              @click="choose(name)"><component :is="resolveIcon(name)" :size="22" /></button></div>
          </section>
          <section class="picker-section"><h3>{{ activeHeading }}</h3>
            <p v-if="loadingIcons" class="no-icons">Loading icon library…</p>
            <p v-else-if="iconLoadError" class="no-icons">{{ iconLoadError }}</p>
            <div v-else-if="matchingIcons.length" class="icon-grid"><button v-for="name in matchingIcons" :key="name" type="button"
              :class="{ selected: selected === name }" :title="readableIconName(name)" :aria-label="readableIconName(name)"
              @click="choose(name)"><component :is="resolveIcon(name)" :size="22" /><span>{{ readableIconName(name) }}</span></button></div>
            <p v-else-if="!loadingIcons && !iconLoadError" class="no-icons">No icons match this category and search. Try another category or search term.</p>
            <button v-if="!loadingIcons && !iconLoadError && hasMoreIcons" type="button" class="load-more-icons"
              @click="pageSize += PAGE_SIZE">Load more icons ({{ matchingIcons.length }} of {{ categorizedIcons.length }})</button>
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
.icon-category-tabs { display: flex; gap: 6px; overflow-x: auto; padding: 0 20px 12px; border-bottom: 1px solid #eef0f2; scrollbar-width: thin; }
.icon-category-tabs button { flex: 0 0 auto; padding: 7px 11px; border: 1px solid #e2e6e9; border-radius: 5px; background: #fff; color: #5f6b75; font-size: 11px; cursor: pointer; }
.icon-category-tabs button:hover { border-color: #bd4daa; color: #93003f; }
.icon-category-tabs button.active { border-color: #93003f; background: rgba(147,0,63,.08); color: #93003f; font-weight: 700; }
.load-more-icons { display: block; width: 100%; margin-top: 12px; padding: 10px; border: 1px solid #e2e6e9; border-radius: 5px; background: #fff; color: #93003f; font-size: 12px; font-weight: 600; cursor: pointer; }
.load-more-icons:hover { border-color: #93003f; background: #fff4fe; }
.picker-scroll { overflow: auto; padding: 0 20px 20px }.picker-section { margin-top: 17px }.picker-section h3 { display: flex; align-items: center; gap: 5px; margin: 0 0 8px; color: #6d7882; font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase }
.icon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)); gap: 6px }.icon-grid button { min-width: 0; min-height: 64px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; padding: 6px 4px; border: 1px solid #e6e9ec; border-radius: 5px; background: #fff; color: #4b5563; cursor: pointer }.icon-grid button span { width: 100%; overflow: hidden; font-size: 9px; line-height: 1.15; text-align: center; text-overflow: ellipsis; white-space: nowrap }.icon-grid button:hover,.icon-grid button:focus-visible { outline: 0; border-color: #bd4daa; background: #fff4fe; color: #93003f }.icon-grid button.selected { border-color: #93003f; background: rgba(147,0,63,.08); color: #93003f; box-shadow: inset 0 0 0 1px #93003f }.icon-grid--compact { grid-template-columns: repeat(auto-fill, minmax(43px, 1fr)) }.icon-grid--compact button { min-height: 42px; padding: 4px }.icon-grid--compact span { display: none }.no-icons { margin: 22px 0; color: #6d7882; font-size: 12px; text-align: center }
@media (max-width: 520px) { .icon-picker-backdrop { padding: 8px }.icon-picker { max-height: calc(100vh - 16px) }.picker-header,.icon-search,.picker-scroll { margin-left: 12px; margin-right: 12px }.icon-category-tabs { padding-left: 0; padding-right: 0 }.picker-header { padding-left: 0; padding-right: 0 }.icon-grid { grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)) } }
</style>
