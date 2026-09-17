export const editorRegistry = {
  section: {
    label: "Section",
    category: "Layout",
    canHaveChildren: true,
    defaults: {
      styles: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "stretch",
        justifyContent: "flex-start",
        gap: "0px",
        paddingTop: "60px",
        paddingRight: "20px",
        paddingBottom: "60px",
        paddingLeft: "20px",
        boxSizing: "border-box",
      },
    },
  },
  container: {
    label: "Container",
    category: "Layout",
    canHaveChildren: true,
    defaults: {
      styles: { width: "100%", maxWidth: "1200px", marginLeft: "auto", marginRight: "auto", boxSizing: "border-box" },
    },
  },
  column: {
    label: "Column",
    category: "Layout",
    canHaveChildren: true,
    defaults: {
      styles: {
        width: "100%",
        minWidth: "0",
        minHeight: "100px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
      },
    },
  },
  component: {
    label: "Component",
    category: "Components",
    canHaveChildren: false,
    defaults: { props: { componentId: null }, styles: { width: "100%", boxSizing: "border-box" } },
  },
  heading: {
    label: "Heading",
    category: "Basic",
    defaults: {
      props: { text: "Your Heading", tag: "h2" },
      styles: { fontSize: "48px", fontWeight: "700", lineHeight: "1.2", color: "#111827", marginTop: "0", marginBottom: "20px" },
    },
  },
  text: {
    label: "Text",
    category: "Basic",
    defaults: { props: { text: "Lorem ipsum dolor sit amet." }, styles: { fontSize: "16px", lineHeight: "1.7", color: "#4b5563" } },
  },
  button: {
    label: "Button",
    category: "Basic",
    defaults: {
      props: { text: "Get Started", href: "#" },
      styles: {
        display: "inline-block",
        paddingTop: "12px",
        paddingRight: "24px",
        paddingBottom: "12px",
        paddingLeft: "24px",
        background: "#111827",
        color: "#ffffff",
        borderRadius: "8px",
        textDecoration: "none",
      },
    },
  },
  image: {
    label: "Image",
    category: "Basic",
    defaults: {
      props: { src: "https://placehold.co/800x500", alt: "Image" },
      styles: { width: "100%", height: "auto", display: "block" },
    },
  },
};