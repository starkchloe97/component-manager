import { defineAsyncComponent } from "vue";
import { Heart } from "@lucide/vue";

// The full catalog stays behind a lazy import. The document stores only a
// stable name; this adapter is the single place that resolves it to Vue.
let iconLibraryPromise;
const componentCache = new Map();

function loadLibrary() {
  if (!iconLibraryPromise) iconLibraryPromise = import("@lucide/vue/dist/esm/icons/index.mjs");
  return iconLibraryPromise;
}

export async function loadIconNames() {
  const library = await loadLibrary();
  return Object.keys(library).sort((left, right) => left.localeCompare(right));
}

export const popularIconNames = [
  "Heart", "Star", "CircleCheck", "ArrowRight", "ArrowUpRight", "Calendar",
  "Camera", "Check", "Clock", "Mail", "MapPin", "Menu", "Phone", "Search",
  "ShieldCheck", "Sparkles", "User", "X",
];

export function resolveIcon(name) {
  const iconName = String(name || "Heart");
  if (!componentCache.has(iconName)) {
    componentCache.set(iconName, defineAsyncComponent({
      loader: async () => {
        const library = await loadLibrary();
        return library[iconName] || library.Heart || Heart;
      },
      delay: 0,
    }));
  }
  return componentCache.get(iconName);
}

export function readableIconName(name) {
  return String(name || "Icon").replace(/([a-z])([A-Z0-9])/g, "$1 $2");
}

export function searchIcons(names, query) {
  const terms = String(query || "").trim().toLowerCase().split(/[\s_-]+/).filter(Boolean);
  if (!terms.length) return names;
  return names.filter((name) => terms.every((term) => readableIconName(name).toLowerCase().includes(term)));
}
