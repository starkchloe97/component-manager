import { computed, ref } from "vue";

const viewportWidth = ref(typeof window === "undefined" ? 1440 : window.innerWidth);

if (typeof window !== "undefined") {
  window.addEventListener("resize", () => { viewportWidth.value = window.innerWidth; }, { passive: true });
}

export function resolveResponsiveNodeStyles(node) {
  return computed(() => {
    const baseStyles = node.styles || {};
    const responsiveStyles = node.responsiveStyles || {};
    const overrides = viewportWidth.value <= 767
      ? responsiveStyles.mobile
      : viewportWidth.value <= 1024
        ? responsiveStyles.tablet
        : null;
    const styles = { ...baseStyles, ...(overrides || {}) };

    if (overrides && Object.prototype.hasOwnProperty.call(overrides, "width")) {
      styles.flexBasis = String(styles.width ?? "").trim() || "auto";
      styles.flexGrow = "0";
      styles.flexShrink = styles.flexShrink ?? "1";
      delete styles.flex;
    }

    return styles;
  });
}
