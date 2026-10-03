export const CONTAINER_STRUCTURE_IDS = [
  "row-2",
  "col-2",
  "row-3",
  "col-3",
  "two-one",
  "quad",
];

const CHILD_BASE = {
  minWidth: "0",
  minHeight: "80px",
  boxSizing: "border-box",
  width: "100%",
  maxWidth: "100%",
};

function rowChild() {
  return {
    ...CHILD_BASE,
    width: "auto",
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "0",
  };
}

function colChild() {
  return {
    ...CHILD_BASE,
    flexGrow: "0",
    flexShrink: "1",
    flexBasis: "auto",
  };
}

function gridChild(extra = {}) {
  return {
    ...CHILD_BASE,
    width: "auto",
    ...extra,
  };
}

const FLEX_PARENT = {
  display: "flex",
  flexWrap: "nowrap",
  alignItems: "stretch",
  justifyContent: "flex-start",
  alignContent: "stretch",
  gap: "0px",
  columnGap: "0px",
  rowGap: "0px",
};

const GRID_PARENT = {
  display: "grid",
  gap: "0px",
  columnGap: "0px",
  rowGap: "0px",
  alignItems: "stretch",
  justifyItems: "stretch",
};

export function getContainerStructureSpec(display, structureId) {
  const isGrid = display === "grid";
  const id = CONTAINER_STRUCTURE_IDS.includes(structureId) ? structureId : "row-2";

  if (id === "row-2") {
    return isGrid
      ? { parent: { ...GRID_PARENT, gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto" }, children: [gridChild(), gridChild()] }
      : { parent: { ...FLEX_PARENT, flexDirection: "row" }, children: [rowChild(), rowChild()] };
  }
  if (id === "col-2") {
    return isGrid
      ? { parent: { ...GRID_PARENT, gridTemplateColumns: "1fr", gridTemplateRows: "auto auto" }, children: [gridChild(), gridChild()] }
      : { parent: { ...FLEX_PARENT, flexDirection: "column" }, children: [colChild(), colChild()] };
  }
  if (id === "row-3") {
    return isGrid
      ? { parent: { ...GRID_PARENT, gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto" }, children: [gridChild(), gridChild(), gridChild()] }
      : { parent: { ...FLEX_PARENT, flexDirection: "row" }, children: [rowChild(), rowChild(), rowChild()] };
  }
  if (id === "col-3") {
    return isGrid
      ? { parent: { ...GRID_PARENT, gridTemplateColumns: "1fr", gridTemplateRows: "auto auto auto" }, children: [gridChild(), gridChild(), gridChild()] }
      : { parent: { ...FLEX_PARENT, flexDirection: "column" }, children: [colChild(), colChild(), colChild()] };
  }
  if (id === "two-one") {
    return isGrid
      ? {
        parent: { ...GRID_PARENT, gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto" },
        children: [gridChild(), gridChild(), gridChild({ gridColumn: "1 / -1" })],
      }
      : {
        parent: { ...FLEX_PARENT, flexDirection: "row", flexWrap: "wrap" },
        children: [
          { ...rowChild(), flexBasis: "50%", width: "50%", maxWidth: "50%" },
          { ...rowChild(), flexBasis: "50%", width: "50%", maxWidth: "50%" },
          { ...rowChild(), flexBasis: "100%", width: "100%", maxWidth: "100%" },
        ],
      };
  }
  return isGrid
    ? {
      parent: { ...GRID_PARENT, gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto" },
      children: [gridChild(), gridChild(), gridChild(), gridChild()],
    }
    : {
      parent: { ...FLEX_PARENT, flexDirection: "row", flexWrap: "wrap" },
      children: [
        { ...rowChild(), flexBasis: "50%", width: "50%", maxWidth: "50%" },
        { ...rowChild(), flexBasis: "50%", width: "50%", maxWidth: "50%" },
        { ...rowChild(), flexBasis: "50%", width: "50%", maxWidth: "50%" },
        { ...rowChild(), flexBasis: "50%", width: "50%", maxWidth: "50%" },
      ],
    };
}

export function resolveEditorNodeId(target) {
  if (!(target instanceof Element)) return null;
  const node = target.closest("[data-editor-node-id]");
  return node?.getAttribute("data-editor-node-id") || null;
}

export function isEditorChrome(target) {
  return target instanceof Element && !!target.closest("[data-editor-chrome]");
}
