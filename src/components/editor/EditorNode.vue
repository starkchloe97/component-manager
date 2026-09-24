<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { ArrowUp, Copy, GripVertical, Plus, Trash2 } from "@lucide/vue";
import { useEditor } from "@/composables/useEditor";
import { componentRegistry } from "@/config/componentRegistry";
import { editorRegistry } from "@/config/editorRegistry";
import AddMenu from "./AddMenu.vue";
import InsertionPoint from "./InsertionPoint.vue";
import SectionLayoutPicker from "./SectionLayoutPicker.vue";

const props = defineProps({ node: { type: Object, required: true }, parentId: { type: String, default: null }, parentType: { type: String, default: null }, rootNode: { type: Boolean, default: false } });
const { document, selectedNodeId, selectNode, addNode, addNodeAfter, addSectionToNode, addStandaloneSectionAfter, addContainer, addContainerAfter, duplicateNode, deleteNode, updateNode } = useEditor();
const addTrigger = ref(null), showAdd = ref(false), addMode = ref("inside"), showSectionPicker = ref(false), showContainerPicker = ref(false), leafElement = ref(null), leafToolbarStyle = ref({});
const isSelected = computed(() => selectedNodeId.value === props.node.id);
const isLastRootNode = computed(() => props.rootNode && document.children.at(-1)?.id === props.node.id);
const componentEntry = computed(() => componentRegistry[props.node.props?.componentId] || null);
const componentLabel = computed(() => componentEntry.value?.name || props.node.props?.componentId || "Component");
const nodeLabel = computed(() => props.node.type === "component" ? componentLabel.value : (editorRegistry[props.node.type]?.label || props.node.type));
const parentLabel = computed(() => editorRegistry[props.parentType]?.label || props.parentType || "parent");
const addTitle = computed(() => addMode.value === "inside" ? `Add inside ${nodeLabel.value}` : `Add after ${nodeLabel.value}`);
const isLeaf = computed(() => ["heading", "text", "button", "image"].includes(props.node.type));
const isEmptyHost = computed(() => ["container", "column"].includes(props.node.type) && !props.node.children.length);
watch(selectedNodeId, id => { if (id !== props.node.id) closeMenus(); });
function closeMenus() { showAdd.value = false; showSectionPicker.value = false; showContainerPicker.value = false; }
function select(event) { event?.stopPropagation(); if (isSelected.value && props.parentId) selectNode(props.parentId); else selectNode(props.node.id); closeMenus(); }
function selectParent() { if (props.parentId) { selectNode(props.parentId); closeMenus(); } }
function openAdd(event, mode = "inside") { event?.stopPropagation?.(); addTrigger.value = event?.currentTarget || event || addTrigger.value; addMode.value = mode; selectNode(props.node.id); showAdd.value = !showAdd.value; }
function openInsertion(event) { openAdd(event, "after"); }
function handleAdd(type) { showAdd.value = false; if (type === "section") { showSectionPicker.value = true; return; } if (type === "container") { showContainerPicker.value = true; return; } if (addMode.value === "inside") addNode(type, props.node.id); else addNodeAfter(type, props.node.id); }
function addSectionWithLayout(layout) { if (addMode.value === "inside") addSectionToNode(props.node.id, layout); else addStandaloneSectionAfter(props.node.id, layout); showSectionPicker.value = false; }
function addContainerWithLayout(layout) { if (addMode.value === "inside") addContainer(layout, props.node.id); else addContainerAfter(props.node.id, layout); showContainerPicker.value = false; }
function removeNode() { deleteNode(props.node.id); }
function updateLeafToolbarPosition() { if (!isSelected.value || !leafElement.value) return; const rect = leafElement.value.getBoundingClientRect(); leafToolbarStyle.value = { top: `${Math.max(4, rect.top - 36)}px`, left: `${Math.max(4, rect.right - 190)}px` }; }
function beginInlineEdit(event) { if (!["heading", "text", "button"].includes(props.node.type)) return; event.preventDefault(); event.stopPropagation(); selectNode(props.node.id); const element = event.currentTarget; if (!(element instanceof HTMLElement)) return; element.setAttribute("contenteditable", "true"); element.setAttribute("spellcheck", "true"); element.focus(); }
function syncInlineText(event) { const element = event.currentTarget; if (element instanceof HTMLElement) updateNode(props.node.id, { props: { text: element.textContent || "" } }); }
function finishInlineEdit(event) { const element = event.currentTarget; if (element instanceof HTMLElement) { updateNode(props.node.id, { props: { text: element.textContent || "" } }); element.removeAttribute("contenteditable"); element.removeAttribute("spellcheck"); } }
function cancelInlineEdit(event) { const element = event.currentTarget; if (element instanceof HTMLElement) { element.textContent = props.node.props.text || ""; element.removeAttribute("contenteditable"); element.removeAttribute("spellcheck"); } }
function updateOnViewportChange() { nextTick(updateLeafToolbarPosition); }
onMounted(() => { window.addEventListener("resize", updateOnViewportChange); window.addEventListener("scroll", updateOnViewportChange, true); });
onBeforeUnmount(() => { window.removeEventListener("resize", updateOnViewportChange); window.removeEventListener("scroll", updateOnViewportChange, true); });
</script>

<template>
  <div v-if="node.type === 'section'" class="editor-node editor-node--section" :class="{ 'editor-node--selected': isSelected }" @click="select">
    <section class="editor-section" :style="node.styles"><EditorNode v-for="child in node.children" :key="child.id" :node="child" :parent-id="node.id" :parent-type="node.type" /></section>
    <InsertionPoint v-if="rootNode && !isLastRootNode" label="Add after" :visible="isSelected" @activate="openInsertion" />
    <div v-if="isSelected" class="node-toolbar" @click.stop><span class="node-toolbar-label">{{ nodeLabel }}</span><GripVertical :size="16" class="drag-grip" /><button ref="addTrigger" type="button" class="toolbar-icon-button" title="Add after section" aria-label="Add after section" @click="openAdd($event, 'after')"><Plus :size="15" /></button><button type="button" class="toolbar-icon-button" title="Duplicate section" aria-label="Duplicate section" @click="duplicateNode(node.id)"><Copy :size="15" /></button><button type="button" class="toolbar-icon-button toolbar-icon-danger" title="Delete section" aria-label="Delete section" @click="removeNode"><Trash2 :size="15" /></button></div>
  </div>

  <div v-else-if="node.type === 'column' || node.type === 'container'" class="editor-node" :class="{ 'editor-node--selected': isSelected }" @click="select">
    <div :class="node.type === 'container' ? 'editor-container' : 'editor-column'" :style="node.styles">
      <div v-if="isEmptyHost" class="empty-host"><small>Drop an element here</small><button ref="addTrigger" type="button" @click.stop="openAdd($event, 'inside')"><Plus :size="14" />Add</button></div>
      <EditorNode v-for="child in node.children" :key="child.id" :node="child" :parent-id="node.id" :parent-type="node.type" />
      <button v-if="isSelected && !isEmptyHost" ref="addTrigger" type="button" class="inside-add" @click.stop="openAdd($event, 'inside')"><Plus :size="14" />Add inside</button>
    </div>
    <InsertionPoint v-if="rootNode && !isLastRootNode" label="Add after" :visible="isSelected" @activate="openInsertion" />
    <div v-if="isSelected" class="node-toolbar" @click.stop><span class="node-toolbar-label">{{ nodeLabel }}</span><GripVertical :size="16" class="drag-grip" /><button v-if="parentId" type="button" class="toolbar-icon-button" :aria-label="`Select ${parentLabel}`" @click="selectParent"><ArrowUp :size="15" /></button><button type="button" class="toolbar-icon-button" title="Add inside" aria-label="Add inside" @click="openAdd($event, 'inside')"><Plus :size="15" /></button><button type="button" class="toolbar-icon-button" title="Duplicate" aria-label="Duplicate" @click="duplicateNode(node.id)"><Copy :size="15" /></button><button type="button" class="toolbar-icon-button toolbar-icon-danger" title="Delete" aria-label="Delete" @click="removeNode"><Trash2 :size="15" /></button></div>
  </div>

  <div v-else-if="node.type === 'component'" class="editor-node" :class="{ 'editor-node--selected': isSelected }" @click="select"><div class="component-node" :style="node.styles"><div class="component-node-label">{{ componentLabel }}</div><component v-if="componentEntry" :is="componentEntry.component" /><div v-else class="component-missing">Component unavailable</div></div><div v-if="isSelected" class="node-toolbar" @click.stop><span class="node-toolbar-label">{{ nodeLabel }}</span><GripVertical :size="16" class="drag-grip" /><button ref="addTrigger" type="button" class="toolbar-icon-button" aria-label="Add after component" @click="openAdd($event, 'after')"><Plus :size="15" /></button><button type="button" class="toolbar-icon-button" aria-label="Duplicate component" @click="duplicateNode(node.id)"><Copy :size="15" /></button><button type="button" class="toolbar-icon-button toolbar-icon-danger" aria-label="Delete component" @click="removeNode"><Trash2 :size="15" /></button></div></div>

  <component v-else-if="node.type === 'heading'" :is="node.props.tag || 'h2'" ref="leafElement" class="builder-element" :class="{ 'builder-element--selected': isSelected }" :style="node.styles" @click.stop="select" @dblclick="beginInlineEdit" @input="syncInlineText" @blur="finishInlineEdit" @keydown.esc.prevent="cancelInlineEdit">{{ node.props.text }}</component>
  <p v-else-if="node.type === 'text'" ref="leafElement" class="builder-element" :class="{ 'builder-element--selected': isSelected }" :style="node.styles" @click.stop="select" @dblclick="beginInlineEdit" @input="syncInlineText" @blur="finishInlineEdit" @keydown.esc.prevent="cancelInlineEdit">{{ node.props.text }}</p>
  <a v-else-if="node.type === 'button'" ref="leafElement" class="builder-element" :class="{ 'builder-element--selected': isSelected }" :href="node.props.href || '#'" :style="node.styles" @click.prevent.stop="select" @dblclick="beginInlineEdit" @input="syncInlineText" @blur="finishInlineEdit" @keydown.esc.prevent="cancelInlineEdit">{{ node.props.text }}</a>
  <img v-else-if="node.type === 'image'" ref="leafElement" class="builder-element builder-image" :class="{ 'builder-element--selected': isSelected }" :src="node.props.src" :alt="node.props.alt" :style="node.styles" @click.stop="select" />
  <div v-else class="editor-node" :class="{ 'editor-node--selected': isSelected }" @click="select"><div class="builder-element" :style="node.styles">{{ nodeLabel }}</div></div>
  <div v-if="isSelected && isLeaf" class="node-toolbar node-toolbar--leaf" :style="leafToolbarStyle" @click.stop><span>{{ nodeLabel }}</span><GripVertical :size="16" class="drag-grip" /><button ref="addTrigger" type="button" class="toolbar-icon-button" aria-label="Add after element" @click="openAdd($event, 'after')"><Plus :size="15" /></button><button type="button" class="toolbar-icon-button" aria-label="Duplicate" @click="duplicateNode(node.id)"><Copy :size="15" /></button><button type="button" class="toolbar-icon-button toolbar-icon-danger" aria-label="Delete" @click="removeNode"><Trash2 :size="15" /></button></div>
  <AddMenu :open="showAdd" :anchor="addTrigger" :title="addTitle" @select="handleAdd" @close="showAdd = false" />
  <SectionLayoutPicker v-if="showSectionPicker" :title="addMode === 'inside' ? 'Add section inside' : 'Add section after'" :description="addMode === 'inside' ? 'Choose a layout for the section inside this container.' : 'Choose a layout for the next page section.'" @select="addSectionWithLayout" @close="showSectionPicker = false" />
  <SectionLayoutPicker v-if="showContainerPicker" :title="addMode === 'inside' ? 'Add container inside' : 'Add container after'" :description="addMode === 'inside' ? 'Choose a layout for the nested container.' : 'Choose a layout for the sibling container.'" :allow-empty-container="true" @select="addContainerWithLayout" @close="showContainerPicker = false" />
</template>

<style scoped>
.editor-node{position:relative;min-width:0}.editor-node--section{margin-bottom:34px}.editor-node--selected{outline:1px solid #e6a4f4;outline-offset:-2px}.editor-section,.editor-column,.editor-container{position:relative;box-sizing:border-box;width:100%;min-width:0;border:1px solid transparent;background:rgba(255,255,255,.3);transition:border-color .18s ease,background .18s ease}.editor-section{display:grid}.editor-column{min-height:72px;padding:6px}.editor-container{padding:10px}.editor-node:hover>.editor-section,.editor-node:hover>.editor-column,.editor-node:hover>.editor-container{border-color:rgba(230,164,244,.7);background:rgba(255,246,255,.45)}.empty-host{min-height:112px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#68717c;font-size:12px;text-align:center}.empty-host small{font-style:italic}.empty-host button,.inside-add{display:inline-flex;align-items:center;gap:5px;min-height:28px;padding:0 10px;border:1px dashed #d1d6dd;border-radius:14px;background:#fff;color:#59616d;font-size:11px;font-weight:700;cursor:pointer}.empty-host button:hover,.empty-host button:focus-visible,.inside-add:hover,.inside-add:focus-visible{outline:0;border-color:#b9159d;background:#fff4fe;color:#8f0070}.inside-add{display:flex;margin:8px auto 2px}.builder-element{box-sizing:border-box;min-width:0}.builder-element--selected{outline:1px solid #c028b3!important;outline-offset:2px}.builder-image{max-width:100%}.component-node{position:relative;width:100%;min-width:0;box-sizing:border-box}.component-node-label{position:absolute;top:6px;right:6px;z-index:5;padding:3px 6px;border-radius:4px;background:rgba(15,23,42,.78);color:#fff;font-size:8px;pointer-events:none}.component-missing{min-height:100px;display:grid;place-items:center;color:#94a3b8;background:#f8fafc}.node-toolbar{position:absolute;top:-30px;left:50%;z-index:150;display:flex;align-items:center;gap:3px;padding:3px 7px;transform:translateX(-50%);background:#e8aff4;color:#2a1830}.node-toolbar--leaf{position:fixed;z-index:1000;transform:none}.node-toolbar-label{max-width:82px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:10px;font-weight:700}.drag-grip{cursor:grab}.toolbar-icon-button{display:grid;place-items:center;width:23px;height:23px;padding:0;border:0;background:transparent;color:#2a1830;cursor:pointer}.toolbar-icon-button:hover,.toolbar-icon-button:focus-visible{outline:0;background:rgba(255,255,255,.5)}.toolbar-icon-danger:hover{background:#b9159d;color:#fff}@media (prefers-reduced-motion:reduce){.editor-section,.editor-column,.editor-container{transition:none}}
</style>
