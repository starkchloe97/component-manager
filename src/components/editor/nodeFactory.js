import { createNode } from "./editorModel";
import { editorRegistry } from "@/config/editorRegistry";

export function createEditorNode(type, overrides = {}) {
  const definition = editorRegistry[type];

  if (!definition) {
    throw new Error(`Unknown editor node type: ${type}`);
  }

  const defaults = definition.defaults || {};

  return createNode(type, {
    props: {
      ...defaults.props,
      ...overrides.props,
    },

    styles: {
      ...defaults.styles,
      ...overrides.styles,
    },

    children: overrides.children || [],
  });
}
