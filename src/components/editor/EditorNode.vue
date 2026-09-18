<script setup>
import { computed, ref } from "vue";
import { useEditor } from "@/composables/useEditor";
import { componentRegistry } from "@/config/componentRegistry";
import SectionLayoutPicker from "./SectionLayoutPicker.vue";
import { editorRegistry } from "@/config/editorRegistry";

const props = defineProps({ node: { type: Object, required: true } });
const { selectedNodeId, selectedNode, selectNode, addNode, addComponent, addSectionAfter, duplicateNode, deleteNode } = useEditor();
const showAdd = ref(false);
const showSectionPicker = ref(false);

const isSelected = computed(() => selectedNodeId.value === props.node.id);
const componentEntry = computed(() => componentRegistry[props.node.props?.componentId] || null);
const componentLabel = computed(() => componentEntry.value?.name || props.node.props?.componentId || "Component");
const basicElements = computed(() => Object.entries(editorRegistry)
  .filter(([type, definition]) => definition.category === "Basic")
  .map(([type, definition]) => ({ type, ...definition })));
const layoutElements = computed(() => Object.entries(editorRegistry)
  .filter(([type, definition]) => type === "container")
  .map(([type, definition]) => ({ type, ...definition })));
const registeredComponents = computed(() => Object.values(componentRegistry));
const nodeLabel = computed(() => props.node.type === "component" ? componentLabel.value : (editorRegistry[props.node.type]?.label || props.node.type));

function select(event) {
  event.stopPropagation();
  selectNode(props.node.id);
}
function addBasic(type) {
  addNode(type, props.node.id);
  showAdd.value = false;
}
function addLayout(type) {
  addNode(type, props.node.id);
  showAdd.value = false;
}
function openSectionPicker() {
  showSectionPicker.value = true;
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
</script>

<template>
  <div class="editor-node" :class="{ 'editor-node--selected': isSelected }" @click="select">
    <section v-if="node.type === 'section'" class="editor-section" :style="node.styles">
      <EditorNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
      />
      <div class="section-actions" @click.stop>
        <button type="button" class="add-section-under" @click="openSectionPicker">+ Add section</button>
      </div>
      <SectionLayoutPicker
        v-if="showSectionPicker"
        @select="addSectionBelow"
        @close="showSectionPicker = false"
      />
    </section>

    <div v-else-if="node.type === 'column'" class="editor-column" :style="node.styles">
      <div v-if="!node.children.length" class="column-empty">Drop an element here or use + Add element</div>
      <EditorNode v-for="child in node.children" :key="child.id" :node="child" />
      <div class="column-add" @click.stop>
        <button type="button" class="add-element-button" @click="showAdd = !showAdd">+ Add element</button>
        <div v-if="showAdd" class="element-menu">
          <div class="menu-title">Basic elements</div>
          <button v-for="item in basicElements" :key="item.type" type="button" @click="addBasic(item.type)">{{ item.label }}</button>
          <div class="menu-title">Layout</div>
          <button v-for="item in layoutElements" :key="item.type" type="button" @click="addLayout(item.type)">{{ item.label }}</button>
          <div class="menu-title">Registered components</div>
          <button v-for="item in registeredComponents" :key="item.id" type="button" @click="addRegistered(item.id)">{{ item.name }}</button>
        </div>
      </div>
    </div>

    <div v-else-if="node.type === 'container'" class="editor-container" :style="node.styles">
      <div v-if="!node.children.length" class="container-empty">Drop an element here or use + Add element</div>
      <EditorNode v-for="child in node.children" :key="child.id" :node="child" />
      <div class="container-add" @click.stop>
        <button type="button" class="add-element-button" @click="showAdd = !showAdd">+ Add element</button>
        <div v-if="showAdd" class="element-menu">
          <div class="menu-title">Basic elements</div>
          <button v-for="item in basicElements" :key="item.type" type="button" @click="addBasic(item.type)">{{ item.label }}</button>
          <div class="menu-title">Layout</div>
          <button v-for="item in layoutElements" :key="item.type" type="button" @click="addLayout(item.type)">{{ item.label }}</button>
          <div class="menu-title">Registered components</div>
          <button v-for="item in registeredComponents" :key="item.id" type="button" @click="addRegistered(item.id)">{{ item.name }}</button>
        </div>
      </div>
    </div>

    <div v-else-if="node.type === 'component'" class="component-node" :style="node.styles">
      <div class="component-node-label">{{ componentLabel }}</div>
      <component v-if="componentEntry" :is="componentEntry.component" />
      <div v-else class="component-missing">Component unavailable</div>
    </div>

    <component
      v-else-if="node.type === 'heading'"
      :is="node.props.tag || 'h2'"
      class="builder-element"
      :class="{ 'builder-element--selected': isSelected }"
      :style="node.styles"
      @click.stop="select"
    >{{ node.props.text }}</component>

    <p
      v-else-if="node.type === 'text'"
      class="builder-element"
      :class="{ 'builder-element--selected': isSelected }"
      :style="node.styles"
      @click.stop="select"
    >{{ node.props.text }}</p>

    <a
      v-else-if="node.type === 'button'"
      class="builder-element"
      :class="{ 'builder-element--selected': isSelected }"
      :href="node.props.href || '#'"
      :style="node.styles"
      @click.prevent.stop="select"
    >{{ node.props.text }}</a>

    <img
      v-else-if="node.type === 'image'"
      class="builder-element builder-image"
      :class="{ 'builder-element--selected': isSelected }"
      :src="node.props.src"
      :alt="node.props.alt"
      :style="node.styles"
      @click.stop="select"
    />

    <div v-else class="builder-element" :class="{ 'builder-element--selected': isSelected }" :style="node.styles" @click.stop="select">
      {{ nodeLabel }}
    </div>

    <div v-if="isSelected && node.type !== 'column' && node.type !== 'section'" class="node-toolbar" @click.stop>
      <span>{{ nodeLabel }}</span>
      <button type="button" @click="duplicateNode(node.id)">Duplicate</button>
      <button type="button" @click="removeNode">Delete</button>
    </div>
    <div v-if="isSelected && (node.type === 'section' || node.type === 'column')" class="node-toolbar" @click.stop>
      <span>{{ nodeLabel }}</span>
      <button v-if="node.type === 'column'" type="button" @click="showAdd = !showAdd">Add element</button>
      <button type="button" @click="duplicateNode(node.id)">Duplicate</button>
      <button type="button" @click="removeNode">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.editor-node{position:relative;min-width:0}
.editor-node--selected{outline:2px solid #3b82f6;outline-offset:-2px}
.editor-section{position:relative;width:100%;min-width:0}
.section-actions{display:flex;justify-content:center;padding:12px 0 16px;min-height:12px;box-sizing:border-box}
.add-section-under{border:1px solid #bfdbfe;border-radius:6px;padding:6px 10px;background:#eff6ff;color:#2563eb;font-size:10px;font-weight:700;cursor:pointer}
.add-section-under:hover{background:#dbeafe;border-color:#93c5fd}
.editor-column{position:relative;min-width:0;min-height:120px;padding:14px;box-sizing:border-box;border:1px dashed #d5dce7;background:rgba(248,250,252,.72)}
.editor-column:hover,.editor-container:hover{border-color:#93c5fd}
.editor-container{position:relative;width:100%;min-width:0;box-sizing:border-box;margin-left:auto;margin-right:auto;padding:14px;border:1px dashed #d5dce7;background:rgba(255,255,255,.72)}
.container-empty{min-height:72px;display:grid;place-items:center;color:#94a3b8;font-size:11px;pointer-events:none;text-align:center}
.container-add{position:relative;display:flex;justify-content:center;padding:9px 0 2px}
.column-empty{min-height:72px;display:grid;place-items:center;color:#94a3b8;font-size:11px;pointer-events:none;text-align:center}
.column-add{position:relative;display:flex;justify-content:center;padding:9px 0 2px}
.add-element-button{border:1px solid #cbd5e1;border-radius:6px;background:#fff;color:#475569;padding:6px 10px;font-size:10px;cursor:pointer}
.add-element-button:hover{border-color:#60a5fa;color:#2563eb}
.element-menu{position:absolute;bottom:36px;left:50%;transform:translateX(-50%);width:240px;max-height:320px;overflow:auto;padding:7px;border:1px solid #dbe3ee;border-radius:9px;background:#fff;box-shadow:0 14px 35px rgba(15,23,42,.16);z-index:100}
.element-menu button{display:block;width:100%;padding:7px 8px;border:0;border-radius:5px;background:transparent;text-align:left;color:#334155;font-size:10px;cursor:pointer}
.element-menu button:hover{background:#eff6ff;color:#2563eb}
.menu-title{padding:7px;color:#94a3b8;font-size:8px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
.builder-element{box-sizing:border-box;min-width:0}
.builder-element--selected{outline:2px solid #2563eb!important;outline-offset:2px}
.builder-image{max-width:100%}
.component-node{position:relative;width:100%;min-width:0;box-sizing:border-box;overflow:visible}
.component-node-label{position:absolute;top:5px;right:5px;z-index:5;padding:3px 6px;border-radius:4px;background:rgba(17,24,39,.78);color:#fff;font-size:8px;pointer-events:none}
.component-missing{min-height:100px;display:grid;place-items:center;color:#94a3b8;background:#f8fafc}
.node-toolbar{position:absolute;top:-32px;right:0;z-index:150;display:flex;align-items:center;gap:4px;padding:4px;background:#111827;color:#fff;border-radius:6px;font-size:10px}
.node-toolbar span{padding:0 4px;font-weight:700}
.editor-container > .editor-node{width:100%;min-width:0}
.node-toolbar button{border:0;background:transparent;color:#fff;cursor:pointer;font-size:10px;padding:3px 5px}
.node-toolbar button:hover{background:#273244;border-radius:4px}
</style>