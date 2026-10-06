// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import NavigatorPanel from "../src/components/editor/NavigatorPanel.vue";
import { useEditor } from "../src/composables/useEditor.js";
import { useEditorHistory } from "../src/composables/useEditorHistory.js";

const editor = useEditor();
const history = useEditorHistory();

function createNode(id, type, children = []) {
  return { id, type, children, props: {}, styles: {} };
}

function createDocument() {
  const heading = createNode("heading", "heading");
  const container = createNode("container", "container", [heading]);
  const column = createNode("column", "column", [container]);
  const firstSection = createNode("first-section", "section", [column]);
  const secondSection = createNode("second-section", "section");
  return { firstSection, secondSection, heading, container, column };
}

function createDataTransfer(sourceId) {
  const values = new Map([["application/x-editor-node-id", sourceId]]);
  return {
    effectAllowed: "",
    dropEffect: "",
    setData: (type, value) => values.set(type, value),
    getData: (type) => values.get(type) || "",
  };
}

let wrapper;

beforeEach(() => {
  history.clear();
  editor.clearActiveComponent();
  editor.selectNode(null);
  const tree = createDocument();
  editor.document.children.push(tree.firstSection, tree.secondSection);
  editor.document.componentChildren.push(createNode("component-root", "component", [
    createNode("component-element", "text"),
  ]));
});

afterEach(() => {
  wrapper?.unmount();
  wrapper = null;
});

describe("Navigator panel", () => {
  it("renders and expands arbitrarily deep paths selected on the canvas", async () => {
    wrapper = mount(NavigatorPanel);

    editor.selectNode("heading");
    await nextTick();

    expect(wrapper.find('[role="treeitem"][aria-level="4"]').exists()).toBe(true);
    expect(wrapper.find('[role="treeitem"][aria-selected="true"]').text()).toContain("Heading");
    expect(wrapper.find('[role="treeitem"][aria-level="2"]').exists()).toBe(true);
  });

  it("re-expands a collapsed path when the canvas reselects the active node", async () => {
    wrapper = mount(NavigatorPanel);
    editor.selectNode("heading");
    await nextTick();
    await wrapper.find('[aria-label="Collapse Section"]').trigger("click");
    expect(wrapper.find('[role="treeitem"][aria-level="2"]').exists()).toBe(false);

    editor.selectNode("heading");
    await nextTick();
    expect(wrapper.find('[role="treeitem"][aria-level="4"]').exists()).toBe(true);
  });

  it("selects the exact editor node and supports expanding and collapsing children", async () => {
    wrapper = mount(NavigatorPanel);
    const firstSection = wrapper.findAll('[role="treeitem"][aria-level="1"]')
      .find((row) => row.text().includes("Section"));

    await firstSection.find("button").trigger("click");
    await nextTick();
    expect(wrapper.find('[role="treeitem"][aria-level="2"]').exists()).toBe(true);
    await wrapper.find('[role="treeitem"][aria-level="2"] button').trigger("click");
    await nextTick();
    await wrapper.find('[role="treeitem"][aria-level="3"] button').trigger("click");
    await nextTick();

    const headingRow = wrapper.findAll('[role="treeitem"]').find((row) => row.text().includes("Heading"));
    await headingRow.trigger("click");
    expect(editor.selectedNodeId.value).toBe("heading");
    expect(editor.selectedNode.value).toBe(editor.getNodeById("heading"));

    await wrapper.find('[aria-label="Collapse Section"]').trigger("click");
    await nextTick();
    expect(wrapper.find('[role="treeitem"][aria-level="2"]').exists()).toBe(false);
  });

  it("reorders siblings using the editor move operation", async () => {
    wrapper = mount(NavigatorPanel);
    const source = wrapper.find('[data-node-id="first-section"]');
    const target = wrapper.find('[data-node-id="second-section"]');
    const dataTransfer = createDataTransfer("first-section");
    source.element.getBoundingClientRect = () => ({ top: 0, height: 100 });
    target.element.getBoundingClientRect = () => ({ top: 0, height: 100 });

    await source.trigger("dragstart", { dataTransfer });
    await target.trigger("dragover", { dataTransfer, clientY: 90 });
    await target.trigger("drop", { dataTransfer, clientY: 90 });

    expect(editor.document.children.map((node) => node.id)).toEqual(["second-section", "first-section"]);
    expect(editor.selectedNodeId.value).toBe("first-section");
  });

  it("rejects dropping a node into itself or its descendant", async () => {
    wrapper = mount(NavigatorPanel);
    const section = wrapper.findAll('[role="treeitem"][aria-level="1"]')[0];
    await section.find("button").trigger("click");
    await nextTick();
    await wrapper.find('[role="treeitem"][aria-level="2"] button').trigger("click");
    await nextTick();

    const descendant = wrapper.find('[role="treeitem"][aria-level="3"]');
    const dataTransfer = createDataTransfer("first-section");
    section.element.getBoundingClientRect = () => ({ top: 0, height: 100 });
    descendant.element.getBoundingClientRect = () => ({ top: 0, height: 100 });
    await section.trigger("dragstart", { dataTransfer });
    await descendant.trigger("dragover", { dataTransfer, clientY: 50 });
    await descendant.trigger("drop", { dataTransfer, clientY: 50 });

    expect(editor.getNodeParentId("first-section")).toBeNull();
    expect(editor.getNodeParentId("container")).toBe("column");
  });

  it("selects nodes in componentChildren as well as page structure", async () => {
    wrapper = mount(NavigatorPanel);
    const componentRoot = wrapper.findAll('[role="treeitem"][aria-level="1"]')
      .find((row) => row.text().includes("Component"));
    await componentRoot.find("button").trigger("click");
    await nextTick();
    await wrapper.findAll('[role="treeitem"]').find((row) => row.text().includes("Text")).trigger("click");
    expect(editor.selectedNodeId.value).toBe("component-element");
    expect(editor.selectedNode.value).toBe(editor.getNodeById("component-element"));
  });
});

describe("editor tree selection and history", () => {
  it("keeps selection valid through delete, undo, and redo", async () => {
    editor.selectNode("heading");
    history.configure({
      componentId: "navigator-test",
      snapshot: editor.getDocumentSnapshot,
      restore: editor.restoreDocumentSnapshot,
    });
    history.reset();

    expect(editor.deleteNode("heading")).toBe(true);
    expect(editor.selectedNodeId.value).toBe("container");
    history.flush();
    expect(await history.undo()).toBe(true);
    expect(editor.getNodeById("heading")).not.toBeNull();
    expect(editor.selectedNodeId.value).toBe("container");
    expect(await history.redo()).toBe(true);
    expect(editor.getNodeById("heading")).toBeNull();
    expect(editor.selectedNodeId.value).toBe("container");
  });

  it("keeps selection stable when moving, duplicating, and restoring trees", () => {
    editor.document.children.push(createNode("source", "section"), createNode("target", "section"));
    editor.selectNode("source");
    expect(editor.moveNode("source", null, 1)).toBe(true);
    expect(editor.selectedNodeId.value).toBe("source");

    const duplicate = editor.duplicateNode("source");
    expect(editor.selectedNodeId.value).toBe(duplicate.id);
    editor.selectNode("source");
    editor.restoreDocumentSnapshot({
      children: [createNode("source", "section"), createNode("target", "section")],
      componentChildren: [],
    });
    expect(editor.selectedNodeId.value).toBe("source");

    editor.selectNode("target");
    editor.restoreDocumentSnapshot({
      children: [createNode("source", "section")],
      componentChildren: [],
    });
    expect(editor.selectedNodeId.value).toBeNull();
  });

  it("supports arbitrary ancestry depth and blocks invalid editor moves", () => {
    expect(editor.getNodeAncestors("heading").map((node) => node.id))
      .toEqual(["first-section", "column", "container"]);
    expect(editor.getNodeDepth("heading")).toBe(3);
    expect(editor.moveNode("first-section", "heading", 0)).toBe(false);
    expect(editor.moveNode("container", "container", 0)).toBe(false);
  });
});
