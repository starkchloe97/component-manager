export const PAGE_BUILDER_WIDGETS = [
  { type: "heading", label: "Heading", category: "Basic" },
  { type: "text", label: "Text", category: "Basic" },
  { type: "image", label: "Image", category: "Basic" },
  { type: "button", label: "Button", category: "Basic" },
  { type: "divider", label: "Divider", category: "Basic" },
  { type: "spacer", label: "Spacer", category: "Layout" },
];

export const SECTION_LAYOUTS = [
  { id: "100", label: "Full width", columns: [100] },
  { id: "50-50", label: "50 / 50", columns: [50, 50] },
  { id: "33-67", label: "33 / 67", columns: [33, 67] },
  { id: "67-33", label: "67 / 33", columns: [67, 33] },
  { id: "25-75", label: "25 / 75", columns: [25, 75] },
  { id: "75-25", label: "75 / 25", columns: [75, 25] },
  { id: "33-33-33", label: "33 / 33 / 33", columns: [33, 33, 33] },
  { id: "25-50-25", label: "25 / 50 / 25", columns: [25, 50, 25] },
];

export function createPageNode(type, overrides = {}) {
  const defaults = {
    heading: { props: { text: "Your Heading", tag: "h2" }, styles: { fontSize: "36px", fontWeight: "700", color: "#111827", margin: "0 0 16px" } },
    text: { props: { text: "Lorem ipsum dolor sit amet." }, styles: { fontSize: "16px", lineHeight: "1.7", color: "#4b5563", margin: "0" } },
    image: { props: { src: "https://placehold.co/800x500", alt: "Image" }, styles: { width: "100%", height: "auto", display: "block" } },
    button: { props: { text: "Get Started", href: "#" }, styles: { display: "inline-block", padding: "12px 24px", background: "#111827", color: "#fff", borderRadius: "8px", textDecoration: "none" } },
    divider: { props: {}, styles: { borderTop: "1px solid #e5e7eb", margin: "16px 0" } },
    spacer: { props: {}, styles: { height: "40px" } },
  }[type] || {};
  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    props: { ...(defaults.props || {}), ...(overrides.props || {}) },
    styles: { ...(defaults.styles || {}), ...(overrides.styles || {}) },
    children: overrides.children ? [...overrides.children] : [],
  };
}

export function createSection(layoutId = "100") {
  const layout = SECTION_LAYOUTS.find((item) => item.id === layoutId) || SECTION_LAYOUTS[0];
  const stamp = Date.now();
  return {
    id: `section-${stamp}-${Math.random().toString(36).slice(2, 8)}`,
    type: "section",
    layout: layout.id,
    columns: layout.columns.map((width, index) => ({
      id: `column-${stamp}-${index}-${Math.random().toString(36).slice(2, 6)}`,
      width,
      children: [],
    })),
    styles: { padding: "48px 24px", background: "#fff" },
  };
}
