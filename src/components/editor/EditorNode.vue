<script setup>
import { computed, ref } from "vue";
import { useEditor } from "@/composables/useEditor";
import { editorRegistry } from "@/config/editorRegistry";
import { componentRegistry } from "@/config/componentRegistry";

const props = defineProps({ node: { type: Object, required: true } });
const { selectedNodeId, selectNode, addNode, addComponent, duplicateNode, deleteNode } = useEditor();
const showAdd = ref(false);
const isSelected = computed(() => selectedNodeId.value === props.node.id);
const componentEntry = computed(() => componentRegistry[props.node.props?.componentId] || null);
const componentLabel = computed(() => componentEntry.value?.name || props.node.props?.componentId || "Component");
const basicElements = computed(() => Object.entries(editorRegistry).filter(([type, definition]) => definition.category === "Basic").map(([type, definition]) => ({ type, ...definition })));
const registeredComponents = computed(() => Object.values(componentRegistry));

function select(event) { event.stopPropagation(); selectNode(props.node.id); }
function addBasic(type) { addNode(type, props.node.id); showAdd.value = false; }
function addRegistered(id) { addComponent(id, props.node.id); showAdd.value = false; }
</script>

<template>
  <div class="editor-node" :class="{ 'editor-node--selected': isSelected }" @click="select">
    <section v-if="node.type === 'section'" class="editor-section" :style="node.styles">
      <EditorNode v-for="child in node.children" :key="child.id" :node="child" />
    </section>

    <div v-else-if="node.type === 'container'" class="editor-container" :style="node.styles">
      <EditorNode v-for="child in node.children" :key="child.id" :node="child" />
    </div>

    <div v-else-if="node.type === 'column'" class="editor-column" :style="node.styles" @click.stop="select">
      <div v-if="!node.children.length" class="column-empty">Drop or add an element</div>
      <EditorNode v-for="child in node.children" :key="child.id" :node="child" />
      <div class="column-add" @click.stop>
        <button type="button" class="add-element-button" @click="showAdd = !showAdd">+ Add element</button>
        <div v-if="showAdd" class="element-menu">
          <div class="menu-title">Basic</div>
          <button v-for="item in basicElements" :key="item.type" type="button" @click="addBasic(item.type)">{{ item.label }}</button>
          <div class="menu-title">Components</div>
          <button v-for="item in registeredComponents" :key="item.id" type="button" @click="addRegistered(item.id)">{{ item.name }}</button>
        </div>
      </div>
    </div>

    <h2 v-else-if="node.type === 'heading'" :style="node.styles">{{ node.props.text }}</h2>
    <p v-else-if="node.type === 'text'" :style="node.styles">{{ node.props.text }}</p>
    <a v-else-if="node.type === 'button'" :href="node.props.href" :style="node.styles" @click.prevent>{{ node.props.text }}</a>
    <img v-else-if="node.type === 'image'" :src="node.props.src" :alt="node.props.alt" :style="node.styles" />
    <div v-else-if="node.type === 'component'" class="component-node" :style="node.styles" @click.stop="select">
      <div class="component-node-label">{{ componentLabel }}</div>
      <component v-if="componentEntry" :is="componentEntry.component" />
      <div v-else class="component-missing">Component unavailable</div>
    </div>

    <div v-if="isSelected" class="selection-label">{{ node.type === 'component' ? componentLabel : (editorRegistry[node.type]?.label || node.type) }}</div>
    <div v-if="isSelected" class="node-toolbar" @click.stop>
      <span>{{ node.type === 'component' ? componentLabel : (editorRegistry[node.type]?.label || node.type) }}</span>
      <button type="button" @click="duplicateNode(node.id)">Duplicate</button>
      <button type="button" @click="deleteNode(node.id)">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.editor-node { position:relative; }
.editor-node--selected { outline:2px solid #3b82f6; outline-offset:-2px; }
.selection-label { position:absolute; top:0; left:0; transform:translateY(-100%); padding:3px 7px; background:#3b82f6; color:#fff; font-size:10px; font-weight:600; z-index:20; }
.editor-section { width:100%; box-sizing:border-box; }
.editor-container { width:100%; box-sizing:border-box; }
.editor-column { position:relative; min-height:120px; box-sizing:border-box; padding:10px; border:1px dashed #d5dce7; background:rgba(248,250,252,.65); }
.column-empty { min-height:70px; display:grid; place-items:center; color:#94a3b8; font-size:11px; pointer-events:none; }
.column-add { position:relative; display:flex; justify-content:center; padding:8px 0 2px; }
.add-element-button { border:1px solid #cbd5e1; border-radius:6px; background:#fff; color:#475569; padding:6px 10px; font-size:10px; cursor:pointer; }
.add-element-button:hover { border-color:#60a5fa; color:#2563eb; }
.element-menu { position:absolute; bottom:36px; left:50%; transform:translateX(-50%); width:230px; max-height:300px; overflow:auto; padding:7px; border:1px solid #dbe3ee; border-radius:8px; background:#fff; box-shadow:0 14px 35px rgba(15,23,42,.16); z-index:80; }
.element-menu button { display:block; width:100%; padding:7px 8px; border:0; border-radius:5px; background:transparent; text-align:left; color:#334155; font-size:10px; cursor:pointer; }
.element-menu button:hover { background:#eff6ff; color:#2563eb; }
.menu-title { padding:6px 7px 4px; color:#94a3b8; font-size:8px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
.component-node { position:relative; width:100%; box-sizing:border-box; overflow:hidden; }
.component-node-label { position:absolute; top:5px; right:5px; z-index:5; padding:3px 6px; border-radius:4px; background:rgba(17,24,39,.78); color:#fff; font-size:8px; pointer-events:none; }
.component-missing { min-height:100px; display:grid; place-items:center; color:#94a3b8; background:#f8fafc; }
.node-toolbar { position:absolute; top:-32px; right:0; z-index:50; display:flex; align-items:center; gap:4px; padding:4px; background:#111827; color:#fff; border-radius:6px; font-size:10px; }
.node-toolbar button { border:0; background:transparent; color:#fff; cursor:pointer; font-size:10px; }
</style>
