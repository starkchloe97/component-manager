import * as lucideLibrary from "@lucide/vue";

// Built once at module init from a STATIC namespace import — the same
// mechanism the inspector already uses for named icon imports. No runtime
// dynamic import of the package, so there is no giant chunk for the dev
// server to fail on and no async failure mode in the picker.
const isIconComponent = ([name, value]) =>
  /^[A-Z]/.test(name) &&
  value != null &&
  (typeof value === "object" || typeof value === "function");

const iconNames = Object.freeze(
  Object.entries(lucideLibrary)
    .filter(isIconComponent)
    .map(([name]) => name)
    .sort((left, right) => left.localeCompare(right)),
);

export async function loadIconNames() {
  // Kept async so IconPicker.vue's await still works — but it can't fail now.
  return iconNames;
}

export const popularIconNames = [
  "Heart", "Star", "CircleCheck", "ArrowRight", "ArrowUpRight", "Calendar",
  "Camera", "Check", "Clock", "Mail", "MapPin", "Menu", "Phone", "Search",
  "ShieldCheck", "Sparkles", "User", "X",
];

export function resolveIcon(name) {
  const iconName = String(name || "Heart");
  return lucideLibrary[iconName] || lucideLibrary.Heart;
}

export function readableIconName(name) {
  return String(name || "Icon").replace(/([a-z])([A-Z0-9])/g, "$1 $2");
}

export function searchIcons(names, query) {
  const terms = String(query || "").trim().toLowerCase().split(/[\s_-]+/).filter(Boolean);
  if (!terms.length) return names;
  return names.filter((name) => terms.every((term) => readableIconName(name).toLowerCase().includes(term)));
}
