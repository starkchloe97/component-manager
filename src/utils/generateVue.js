export function generateVue(document) {
  const template = document.children
    .map(renderNode)
    .join("\n");

  const css = collectCss(document);

  return `<template>
${template}
</template>

<style scoped>
${css}
</style>`;
}

function renderNode(node, depth = 1) {
  const indent = "  ".repeat(depth);

  switch (node.type) {
    case "section":
      return `${indent}<section class="${node.id}">
${node.children
  .map((child) => renderNode(child, depth + 1))
  .join("\n")}
${indent}</section>`;

    case "container":
      return `${indent}<div class="${node.id}">
${node.children
  .map((child) => renderNode(child, depth + 1))
  .join("\n")}
${indent}</div>`;

    case "column":
      return `${indent}<div class="${node.id}">
${node.children
  .map((child) => renderNode(child, depth + 1))
  .join("\n")}
${indent}</div>`;

    case "heading":
      return `${indent}<h2 class="${node.id}">${escapeHtml(
        node.props.text
      )}</h2>`;

    case "text":
      return `${indent}<p class="${node.id}">${escapeHtml(
        node.props.text
      )}</p>`;

    case "button":
      return `${indent}<a
${indent}  class="${node.id}"
${indent}  href="${escapeAttribute(node.props.href)}"
${indent}>
${indent}  ${escapeHtml(node.props.text)}
${indent}</a>`;

    case "image":
      return `${indent}<img
${indent}  class="${node.id}"
${indent}  src="${escapeAttribute(node.props.src)}"
${indent}  alt="${escapeAttribute(node.props.alt)}"
${indent}/>`;

    default:
      return "";
  }
}

function collectCss(document) {
  const nodes = flatten(document.children);

  return nodes
    .map((node) => {
      const rules = Object.entries(node.styles)
        .map(([property, value]) => {
          return `  ${toKebabCase(property)}: ${value};`;
        })
        .join("\n");

      return `.${node.id} {\n${rules}\n}`;
    })
    .join("\n\n");
}

function flatten(nodes) {
  return nodes.flatMap((node) => [
    node,
    ...flatten(node.children),
  ]);
}

function toKebabCase(value) {
  return value.replace(
    /[A-Z]/g,
    (letter) => `-${letter.toLowerCase()}`
  );
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
