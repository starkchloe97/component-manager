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
        paddingTop: "40px",
        paddingRight: "0px",
        paddingBottom: "40px",
        paddingLeft: "0px",
        boxSizing: "border-box",
      },
    },
  },
  container: {
    label: "Container",
    category: "Layout",
    defaultStyles: {
      width: "100%",
      maxWidth: "100%",
      marginLeft: "0",
      marginRight: "0",
      padding: "0",
      boxSizing: "border-box",
      minWidth: "0",
      flexShrink: "1"
    }
  },
  column: {
    label: "Column",
    category: "Layout",
    canHaveChildren: true,
    defaults: {
      styles: {
        width: "100%",
        minWidth: "0",
        minHeight: "72px",
        padding: "0",
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
  icon: {
    label: "Icon",
    category: "Basic",
    defaults: {
      props: { icon: "Heart", ariaLabel: "", title: "", href: "", newTab: false, decorative: true, strokeWidth: 2 },
      styles: {
        width: "40px", height: "40px", display: "inline-flex", color: "#111827",
        backgroundColor: "", borderWidth: "0px", borderStyle: "solid", borderColor: "#111827",
        borderRadius: "0px", padding: "0px", opacity: "1", boxSizing: "border-box",
      },
    },
  },
};
