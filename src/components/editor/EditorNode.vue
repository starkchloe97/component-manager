<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useEditor } from "@/composables/useEditor";
import { componentRegistry } from "@/config/componentRegistry";
import SectionLayoutPicker from "./SectionLayoutPicker.vue";
import { editorRegistry } from "@/config/editorRegistry";
import { useComponentCopy } from "@/composables/useComponentCopy";

const props = defineProps({
  node: { type: Object, required: true },
  parentId: { type: String, default: null },
  parentType: { type: String, default: null },
  rootSection: { type: Boolean, default: false },
});
const { selectedNodeId, selectNode, addNode, addComponent, addSectionAfter, addContainer, duplicateNode, deleteNode } = useEditor();
const { copySection, copySelectedComponent } = useComponentCopy();
const sectionCopyState = ref("idle");
const componentCopyState = ref("idle");
const showAdd = ref(false);
const showSectionPicker = ref(false);
const showContainerPicker = ref(false);
const leafElement = ref(null);
const leafToolbarStyle = ref({});

const isSelected = computed(() => selectedNodeId.value === props.node.id);
const componentEntry = computed(() => componentRegistry[props.node.props?.componentId] || null);
const componentLabel = computed(() => componentEntry.value?.name || props.node.props?.componentId || "Component");
const basicElements = computed(() => Object.entries(editorRegistry)
  .filter(([, definition]) => definition.category === "Basic")
  .map(([type, definition]) => ({ type, ...definition })));
const layoutElements = computed(() => Object.entries(editorRegistry)
  .filter(([type]) => type === "container")
  .map(([type, definition]) => ({ type, ...definition })));
const registeredComponents = computed(() => Object.values(componentRegistry));
const nodeLabel = computed(() => props.node.type === "component" ? componentLabel.value : (editorRegistry[props.node.type]?.label || props.node.type));
const parentLabel = computed(() => editorRegistry[props.parentType]?.label || props.parentType || "parent");
const layoutStyleKeys = new Set([
  "display", "flexDirection", "flexWrap", "justifyContent", "alignItems", "alignContent",
  "justifyItems", "gridTemplateColumns", "gridTemplateRows", "gridAutoColumns", "gridAutoRows",
  "gap", "columnGap", "rowGap",
]);
const isLeafNode = computed(() => ["heading", "text", "button", "image"].includes(props.node.type));
const usesLayoutHost = computed(() => isLeafNode.value && ["flex", "grid"].includes(props.node.styles?.display));
const layoutHostStyles = computed(() => {
  if (!usesLayoutHost.value) return undefined;
  const styles = { width: "100%" };
  Object.entries(props.node.styles || {}).forEach(([key, value]) => {
    if (layoutStyleKeys.has(key)) styles[key] = value;
  });
  return styles;
});
const elementStyles = computed(() => {
  if (!usesLayoutHost.value) return props.node.styles;
  return Object.fromEntries(
    Object.entries(props.node.styles || {}).filter(([key]) => !layoutStyleKeys.has(key)),
  );
});
const rootStyles = computed(() => {
  if (props.node.type === "image") return props.node.styles;
  return layoutHostStyles.value;
});
const imageStyles = computed(() => {
  if (props.node.type !== "image") return elementStyles.value;
  const contentStyles = { ...(props.node.styles || {}) };
  delete contentStyles.width;
  delete contentStyles.maxWidth;
  delete contentStyles.display;
  return {
    ...contentStyles,
    width: "100%",
    maxWidth: "100%",
    display: "block",
  };
});

function updateLeafToolbarPosition() {
  if (!isSelected.value || !leafElement.value) return;
  const rect = leafElement.value.getBoundingClientRect();
  leafToolbarStyle.value = {
    top: Math.max(4, rect.top - 36) + "px",
    left: Math.max(4, rect.right - 180) + "px",
  };
}
function handleLeafViewportChange() {
  updateLeafToolbarPosition();
}
function select(event) {
  event.stopPropagation();
  if (isSelected.value && props.parentId) {
    selectNode(props.parentId);
    showAdd.value = false;
    showSectionPicker.value = false;
    showContainerPicker.value = false;
    return;
  }
  selectNode(props.node.id);
  showAdd.value = false;
  showSectionPicker.value = false;
  showContainerPicker.value = false;
}
function selectParent() {
  if (!props.parentId) return;
  selectNode(props.parentId);
  showAdd.value = false;
  showSectionPicker.value = false;
  showContainerPicker.value = false;
}
function toggleAdd() {
  showAdd.value = !showAdd.value;
  if (showAdd.value) selectNode(props.node.id);
}
function addBasic(type) {
  addNode(type, props.node.id);
  showAdd.value = false;
}
function addLayout(type) {
  if (type === "container") {
    showContainerPicker.value = true;
    return;
  }
  addNode(type, props.node.id);
  showAdd.value = false;
}
function addContainerBelow(layout) {
  addContainer(layout, props.node.id);
  showContainerPicker.value = false;
  showAdd.value = false;
}
function openSectionPicker() {
  showSectionPicker.value = true;
  showContainerPicker.value = false;
}
function addSectionBelow(layout) {
  addSectionAfter(props.node.id, layout);
  showSectionPicker.value = false;
}
function addRegistered(id) {
  addComponent(id, props.node.id);
  showAdd.value = false;
}
function removeNode() {
  deleteNode(props.node.id);
}
async function copyCurrentSection() {
  if (sectionCopyState.value === "copying") return;
  sectionCopyState.value = "copying";
  const result = await copySection(props.node.id);
  sectionCopyState.value = result.ok ? "copied" : "error";
  if (!result.ok) console.error(result.error);
  window.setTimeout(() => { sectionCopyState.value = "idle"; }, 1800);
}
async function copyCurrentComponent() {
  if (componentCopyState.value === "copying") return;
  selectNode(props.node.id);
  componentCopyState.value = "copying";
  const result = await copySelectedComponent();
  componentCopyState.value = result.ok ? "copied" : "error";
  if (!result.ok) console.error(result.error);
  window.setTimeout(() => { componentCopyState.value = "idle"; }, 1800);
}
onMounted(() => {
  window.addEventListener("resize", handleLeafViewportChange);
  window.addEventListener("scroll", handleLeafViewportChange, true);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleLeafViewportChange);
  window.removeEventListener("scroll", handleLeafViewportChange, true);
});
watch(isSelected, (selected) => {
  if (selected) requestAnimationFrame(updateLeafToolbarPosition);
});
</script>

<template>
  <!-- Structural editor nodes keep their wrapper because they own children and editor controls. -->
  <div
    v-if="node.type === 'section'"
    class="editor-node"
    :class="{ 'editor-node--selected': isSelected, 'editor-node--section': true, 'editor-node--root-section': props.rootSection }"
    :style="rootStyles"
    @click="select"
  >
    <section class="editor-section" :style="node.styles">
      <EditorNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :parent-id="node.id"
        :parent-type="node.type"
      />
    </section>

    <div class="section-insert-control" @click.stop>
      <button type="button" class="section-insert-button" aria-label="Add section below" @click="openSectionPicker">+</button>
    </div>

    <SectionLayoutPicker
      v-if="showSectionPicker"
      @select="addSectionBelow"
      @close="showSectionPicker = false"
    />

    <SectionLayoutPicker
      v-if="showContainerPicker"
      title="Add container"
      description="Choose a layout for this container."
      :allow-empty-container="true"
      @select="addContainerBelow"
      @close="showContainerPicker = false"
    />

    <div v-if="isSelected" class="node-toolbar section-toolbar" @click.stop>
      <span>{{ nodeLabel }}</span>
      <button
        type="button"
        :disabled="sectionCopyState === 'copying'"
        @click="copyCurrentSection"
      >{{ sectionCopyState === "copying" ? "Copying…" : sectionCopyState === "copied" ? "Copied!" : sectionCopyState === "error" ? "Copy failed" : "Copy" }}</button>
      <button type="button" @click="duplicateNode(node.id)">Duplicate</button>
      <button type="button" @click="removeNode">Delete</button>
    </div>
  </div>

  <div v-else-if="node.type === 'column'" class="editor-node" :class="{ 'editor-node--selected': isSelected }" @click="select">
    <div class="editor-column" :style="node.styles">
      <div v-if="!node.children.length" class="column-empty">
        <small>Drop an element here</small>
      </div>
      <EditorNode v-for="child in node.children" :key="child.id" :node="child" :parent-id="node.id" :parent-type="node.type" />

      <div class="column-add" @click.stop>
        <button type="button" class="add-element-button" :class="{ 'is-open': showAdd }" @click="toggleAdd" aria-label="Add element">+</button>
        <div v-if="showAdd" class="element-menu">
          <div class="menu-title">Basic elements</div>
          <button v-for="item in basicElements" :key="item.type" type="button" @click="addBasic(item.type)">{{ item.label }}</button>
          <div class="menu-title">Layout</div>
          <button v-for="item in layoutElements" :key="item.type" type="button" @click="addLayout(item.type)">{{ item.label }}</button>
          <div class="menu-title">Registered components</div>
          <button v-for="item in registeredComponents" :key="item.id" type="button" @click="addRegistered(item.id)">{{ item.name }}</button>
        </div>
      </div>

      <SectionLayoutPicker
        v-if="showContainerPicker"
        title="Add container"
        description="Choose a layout for this container."
        :allow-empty-container="true"
        @select="addContainerBelow"
        @close="showContainerPicker = false"
      />
    </div>
    <div v-if="isSelected" class="node-toolbar column-toolbar" @click.stop>
      <span>{{ nodeLabel }}</span>
      <button type="button" @click="selectParent">Section</button>
      <button type="button" @click="showAdd = !showAdd">Add element</button>
      <button type="button" @click="duplicateNode(node.id)">Duplicate</button>
      <button type="button" @click="removeNode">Delete</button>
    </div>
  </div>

  <div v-else-if="node.type === 'container'" class="editor-node" :class="{ 'editor-node--selected': isSelected }" @click="select">
    <div class="editor-container" :style="node.styles">
      <div v-if="!node.children.length" class="container-empty"><span>+</span><small>Empty container</small></div>
      <EditorNode v-for="child in node.children" :key="child.id" :node="child" :parent-id="node.id" :parent-type="node.type" />
      <div class="container-add" @click.stop>
        <button
          type="button"
          class="container-add-trigger"
          :class="{ 'is-open': showAdd }"
          @click="toggleAdd"
          aria-label="Add element to container"
        >
          <span class="container-add-icon">+</span>
          <span>Add element</span>
        </button>
        <div v-if="showAdd" class="element-menu">
          <div class="menu-title">Basic elements</div>
          <button v-for="item in basicElements" :key="item.type" type="button" @click="addBasic(item.type)">{{ item.label }}</button>
          <div class="menu-title">Layout</div>
          <button v-for="item in layoutElements" :key="item.type" type="button" @click="addLayout(item.type)">{{ item.label }}</button>
          <div class="menu-title">Registered components</div>
          <button v-for="item in registeredComponents" :key="item.id" type="button" @click="addRegistered(item.id)">{{ item.name }}</button>
        </div>
      </div>
      <SectionLayoutPicker
        v-if="showContainerPicker"
        title="Add container"
        description="Choose the column layout for the new container."
        :allow-empty-container="true"
        @select="addContainerBelow"
        @close="showContainerPicker = false"
      />
    </div>
  </div>

  <div v-else-if="node.type === 'component'" class="editor-node" :class="{ 'editor-node--selected': isSelected }" @click="select">
    <div class="component-node" :style="node.styles">
      <div class="component-node-label">{{ componentLabel }}</div>
      <component v-if="componentEntry" :is="componentEntry.component" />
      <div v-else class="component-missing">Component unavailable</div>

      <EditorNode v-for="child in node.children" :key="child.id" :node="child" :parent-id="node.id" :parent-type="node.type" />

      <div class="component-add" @click.stop>
        <button type="button" class="add-element-button" :class="{ 'is-open': showAdd }" @click="toggleAdd" aria-label="Add element">+</button>
        <div v-if="showAdd" class="element-menu">
          <div class="menu-title">Basic elements</div>
          <button v-for="item in basicElements" :key="item.type" type="button" @click="addBasic(item.type)">{{ item.label }}</button>
          <div class="menu-title">Layout</div>
          <button v-for="item in layoutElements" :key="item.type" type="button" @click="addLayout(item.type)">{{ item.label }}</button>
        </div>
      </div>

      <SectionLayoutPicker
        v-if="showContainerPicker"
        title="Add container"
        description="Choose the column layout for the new container under this component."
        :allow-empty-container="true"
        @select="addContainerBelow"
        @close="showContainerPicker = false"
      />
    </div>
    <div v-if="isSelected" class="node-toolbar" @click.stop>
      <span>{{ nodeLabel }}</span>
      <button v-if="parentId" type="button" :title="`Select ${parentLabel}`" @click="selectParent">{{ parentLabel }}</button>
      <button v-if="node.type === 'component'" type="button" :disabled="componentCopyState === 'copying'" @click="copyCurrentComponent">{{ componentCopyState === "copying" ? "Copying…" : componentCopyState === "copied" ? "Copied!" : componentCopyState === "error" ? "Copy failed" : "Copy" }}</button>
      <button type="button" @click="duplicateNode(node.id)">Duplicate</button>
      <button type="button" @click="removeNode">Delete</button>
    </div>
  </div>

  <!-- Leaf nodes are rendered directly: no editor-node wrapper is introduced around the actual HTML element. -->
  <component
    v-else-if="node.type === 'heading'"
    :is="node.props.tag || 'h2'"
    class="builder-element"
    :class="{ 'builder-element--selected': isSelected }"
    :style="elementStyles"
    @click.stop="select"
    ref="leafElement"
  >{{ node.props.text }}</component>

  <p
    v-else-if="node.type === 'text'"
    class="builder-element"
    :class="{ 'builder-element--selected': isSelected }"
    :style="elementStyles"
    @click.stop="select"
    ref="leafElement"
  >{{ node.props.text }}</p>

  <a
    v-else-if="node.type === 'button'"
    class="builder-element"
    :class="{ 'builder-element--selected': isSelected }"
    :href="node.props.href || '#'"
    :style="elementStyles"
    @click.prevent.stop="select"
    ref="leafElement"
  >{{ node.props.text }}</a>

  <img
    v-else-if="node.type === 'image'"
    class="builder-element builder-image"
    :class="{ 'builder-element--selected': isSelected }"
    :src="node.props.src"
    :alt="node.props.alt"
    :style="imageStyles"
    @click.stop="select"
    ref="leafElement"
  />

  <div
    v-else
    class="editor-node"
    :class="{ 'editor-node--selected': isSelected }"
    :style="rootStyles"
    @click="select"
  >
    <div class="builder-element" :style="node.styles">{{ nodeLabel }}</div>
  </div>

  <!-- Leaf-node toolbar stays separate from the element so the element itself remains a clean p/h/a/img node. -->
  <div
    v-if="isSelected && ['heading', 'text', 'button', 'image'].includes(node.type)"
    class="node-toolbar node-toolbar--leaf"
    :style="leafToolbarStyle"
    @click.stop
  >
    <span>{{ nodeLabel }}</span>
    <button v-if="parentId" type="button" :title="`Select ${parentLabel}`" @click="selectParent">{{ parentLabel }}</button>
    <button type="button" @click="duplicateNode(node.id)">Duplicate</button>
    <button type="button" @click="removeNode">Delete</button>
  </div>
</template>