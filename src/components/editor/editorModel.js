// src/editor/editorModel.js

export function createEditorDocument() {
  return {
    version: 1,
    children: [],
  };
}

export function createNode(type, options = {}) {
  return {
    id: options.id || createId(type),
    type,
    props: options.props || {},
    styles: options.styles || {},
    children: options.children || [],
  };
}

function createId(type) {
  return `${type}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}
