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
const { selectedNodeId, selectNode, addNode, addComponent, addSectionAfter, addContainer, addContainerAfter, duplicateNode, deleteNode } = useEditor();
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
function addContainerAfterCurrent(layout) {
  addContainerAfter(props.node.id, layout);
  showContainerPicker.value = false;
  showAdd.value = false;
}
function openContainerPicker() {
  showContainerPicker.value = true;
  showSectionPicker.value = false;
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
    <div class="section-insert-control container-insert-control" @click.stop>
      <button type="button" class="section-insert-button" aria-label="Add section below container" @click="openSectionPicker">+</button>
    </div>
    <div v-if="isSelected" class="node-toolbar container-toolbar" @click.stop>
      <span>{{ nodeLabel }}</span>
      <button type="button" @click="openSectionPicker">Add section</button>
      <button type="button" @click="openContainerPicker">Add container</button>
      <button type="button" @click="duplicateNode(node.id)">Duplicate</button>
      <button type="button" @click="removeNode">Delete</button>
    </div>
    <SectionLayoutPicker
      v-if="showSectionPicker"
      @select="addSectionBelow"
      @close="showSectionPicker = false"
    />
    <SectionLayoutPicker
      v-if="showContainerPicker"
      title="Add container"
      description="Choose a layout for the new container."
      :allow-empty-container="true"
      @select="addContainerAfterCurrent"
      @close="showContainerPicker = false"
    />
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

<style scoped>
.editor-node{position:relative;min-width:0}
.editor-node--section{margin-bottom:34px}
.editor-node--selected{outline:2px solid #2563eb;outline-offset:-2px}
.editor-node--selected > .editor-section,
.editor-node--selected > .editor-column,
.editor-node--selected > .editor-container,
.editor-node--selected > .component-node{outline:none}

.editor-section{
  position:relative;
  width:100%;
  min-width:0;
  display:grid;
  box-sizing:border-box;
  background:rgba(239,246,255,.28);
  border:1px solid rgba(147,197,253,.38);
  border-radius:3px;
  transition:background .12s ease,border-color .12s ease;
}
.editor-section:hover{background:rgba(239,246,255,.4);border-color:rgba(96,165,250,.52)}
.editor-section > .editor-node{min-width:0;width:100%}

.section-insert-control{
  position:absolute;
  left:0;
  right:0;
  bottom:-34px;
  height:34px;
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:80;
  opacity:0;
  pointer-events:none;
  transition:opacity .12s ease;
}
 .editor-node--root-section:hover > .section-insert-control,
.editor-node--root-section.editor-node--selected > .section-insert-control,
.editor-node--root-section > .section-insert-control:focus-within{
  opacity:1;
  pointer-events:auto;
}
.container-insert-control{
  opacity:0;
  pointer-events:none;
}
.editor-node--selected > .container-insert-control,
.editor-node:hover > .container-insert-control,
.container-insert-control:focus-within{
  opacity:1;
  pointer-events:auto;
}

.section-insert-button{
  width:24px;
  height:24px;
  padding:0;
  border:1px solid #bfdbfe;
  border-radius:50%;
  background:#fff;
  color:#2563eb;
  font-size:16px;
  font-weight:600;
  line-height:21px;
  cursor:pointer;
  box-shadow:0 2px 7px rgba(15,23,42,.10);
  transition:transform .12s ease,background .12s ease,border-color .12s ease,box-shadow .12s ease;
}
.section-insert-button:hover{
  background:#eff6ff;
  border-color:#60a5fa;
  transform:scale(1.08);
  box-shadow:0 3px 10px rgba(37,99,235,.14);
}

.editor-column{
  position:relative;
  width:100%;
  min-width:0;
  min-height:72px;
  padding:6px;
  box-sizing:border-box;
  border:1px solid rgba(148,163,184,.3);
  border-radius:3px;
  background:rgba(248,250,252,.58);
  overflow:visible;
  transition:background .12s ease,border-color .12s ease;
}
.editor-column > .editor-node{min-width:0}
.editor-column:hover{border-color:rgba(96,165,250,.55);background:rgba(239,246,255,.48)}

.editor-container{
  position:relative;
  width:100%;
  min-width:0;
  min-height:0;
  box-sizing:border-box;
  margin:0;
  padding:6px;
  border:1px solid rgba(167,139,250,.24);
  border-radius:3px;
  background:rgba(245,243,255,.24);
  overflow:visible;
}
.editor-container:hover{border-color:rgba(139,92,246,.42);background:rgba(245,243,255,.4)}

.container-empty,.column-empty{
  min-height:72px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:4px;
  color:#94a3b8;
  font-size:11px;
  pointer-events:none;
  text-align:center;
}
.container-empty span,.column-empty-plus{
  width:22px;
  height:22px;
  border:1px dashed #94a3b8;
  border-radius:50%;
  display:grid;
  place-items:center;
  font-size:15px;
  line-height:1;
  color:#64748b;
}
.container-empty small,.column-empty small{font-size:10px;color:#94a3b8}

.column-add,.container-add,.component-add{
  position:relative;
  display:flex;
  justify-content:center;
  padding:8px 0 4px;
  z-index:20;
}
.container-add-trigger{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:5px;
  min-width:92px;
  height:28px;
  padding:0 10px;
  border:1px dashed #cbd5e1;
  border-radius:6px;
  background:#fff;
  color:#64748b;
  font-size:10px;
  font-weight:600;
  cursor:pointer;
  box-shadow:0 1px 4px rgba(15,23,42,.06);
}
.container-add-trigger:hover,.container-add-trigger.is-open{
  border-color:#2563eb;
  color:#2563eb;
  background:#eff6ff;
}
.container-add-icon{
  font-size:15px;
  line-height:1;
}
.add-element-button{
  width:24px;
  height:24px;
  padding:0;
  border:1px solid #cbd5e1;
  border-radius:50%;
  background:#fff;
  color:#64748b;
  font-size:15px;
  line-height:21px;
  cursor:pointer;
  box-shadow:0 1px 4px rgba(15,23,42,.08);
}
.add-element-button:hover,.add-element-button.is-open{border-color:#2563eb;color:#2563eb;background:#eff6ff}
.add-element-button.is-open{transform:rotate(45deg)}

.element-menu{
  position:absolute;
  bottom:34px;
  left:50%;
  transform:translateX(-50%);
  width:220px;
  max-height:280px;
  overflow:auto;
  padding:5px;
  border:1px solid #dbe3ee;
  border-radius:8px;
  background:#fff;
  box-shadow:0 12px 28px rgba(15,23,42,.14);
  z-index:300;
}
.element-menu:after{
  content:"";
  position:absolute;
  bottom:-5px;
  left:calc(50% - 5px);
  width:9px;
  height:9px;
  background:#fff;
  border-right:1px solid #dbe3ee;
  border-bottom:1px solid #dbe3ee;
  transform:rotate(45deg);
}
.element-menu button{position:relative;z-index:1;display:block;width:100%;padding:7px 8px;border:0;border-radius:5px;background:transparent;text-align:left;color:#334155;font-size:10px;cursor:pointer}
.element-menu button:hover{background:#eff6ff;color:#2563eb}
.menu-title{padding:7px;color:#94a3b8;font-size:8px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}

.builder-element{box-sizing:border-box;min-width:0}
.builder-element--selected{outline:2px solid #2563eb!important;outline-offset:2px}
.builder-image{max-width:100%}

.component-node{position:relative;width:100%;min-width:0;box-sizing:border-box;overflow:visible}
.component-node-label{position:absolute;top:6px;right:6px;z-index:5;padding:3px 6px;border-radius:4px;background:rgba(15,23,42,.78);color:#fff;font-size:8px;pointer-events:none}
.component-missing{min-height:100px;display:grid;place-items:center;color:#94a3b8;background:#f8fafc}

.node-toolbar--leaf{position:fixed;z-index:1000}

.node-toolbar{
  position:absolute;
  top:-32px;
  right:0;
  z-index:150;
  display:flex;
  align-items:center;
  gap:4px;
  padding:4px;
  background:#111827;
  color:#fff;
  border-radius:6px;
  font-size:10px;
}
.section-toolbar{top:-4px;right:6px}
.column-toolbar{top:2px;right:6px}\n.container-toolbar{top:2px;right:6px}
.node-toolbar span{padding:0 4px;font-weight:700}
.node-toolbar button:disabled{opacity:.45;cursor:default}
.node-toolbar button{border:0;background:transparent;color:#fff;cursor:pointer;font-size:10px;padding:3px 5px}
.node-toolbar button:hover{background:#273244;border-radius:4px}
</style>
