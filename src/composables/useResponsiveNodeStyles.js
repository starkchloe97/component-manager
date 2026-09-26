import { computed, ref } from "vue";

const viewportWidth = ref(typeof window === "undefined" ? 1440 : window.innerWidth);

if (typeof window !== "undefined") {
  window.addEventListener("resize", () => { viewportWidth.value = window.innerWidth; }, { passive: true });
}

export function resolveResponsiveNodeStyles(node) {
  return computed(() => {
    const baseStyles = node.styles || {};
    const responsiveStyles = node.responsiveStyles || {};
    if (viewportWidth.value <= 767) return { ...baseStyles, ...(responsiveStyles.mobile || {}) };
    if (viewportWidth.value <= 1024) return { ...baseStyles, ...(responsiveStyles.tablet || {}) };
    return baseStyles;
  });
}
