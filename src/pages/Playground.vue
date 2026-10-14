<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronDown, ChevronRight, Copy, GripVertical, PanelLeftClose, PanelLeftOpen, RotateCcw, X } from '@lucide/vue'
import EditorNode from '@/components/editor/EditorNode.vue'
import AddMenu from '@/components/editor/AddMenu.vue'
import { useEditor } from '@/composables/useEditor'

const route = useRoute()
const router = useRouter()
const componentId = computed(() => String(route.params.componentId || 'playground-default'))
const componentName = computed(() => String(route.query.name || 'Untitled component'))
const {
  document, selectedNodeId, selectedNode, setActiveComponent, selectNode,
  duplicateNode, resetActiveComponent, moveNode, getNodeParentId,
  addNode, addContainer, beginFillDraft,
} = useEditor()

const drawerOpen = ref(true)
const addOpen = ref(false)
const addAnchor = ref(null)
const draggingId = ref(null)
const expandedIds = ref(new Set())
const showResetConfirm = ref(false)

watch(componentId, (id) => setActiveComponent(id), { immediate: true })

const structure = computed(() => {
  const rows = []
  const walk = (nodes, parentId = null, depth = 0) => {
    for (let index = 0; index < nodes.length; index += 1) {
      const node = nodes[index]
      rows.push({ node, parentId, depth, index })
      if (node.children?.length && expandedIds.value.has(node.id)) walk(node.children, node.id, depth + 1)
    }
  }
  walk(document.children)
  return rows
})
function labelFor(node) {
  const labels = { section: 'Section', container: 'Container', column: 'Column', heading: 'Heading', text: 'Text', button: 'Button', image: 'Image', icon: 'Icon', divider: 'Divider' }
  return labels[node.type] || node.type
}
function openAdd(event) {
  addAnchor.value = event.currentTarget
  addOpen.value = !addOpen.value
}
function handleAdd(type) {
  addOpen.value = false
  if (type === 'container') beginFillDraft(addContainer('column'))
  else addNode(type)
}
function copySelected() {
  if (selectedNodeId.value) duplicateNode(selectedNodeId.value)
}
function requestReset() { showResetConfirm.value = true }
function resetCanvas() {
  resetActiveComponent()
  showResetConfirm.value = false
}
function toggleExpanded(id) {
  const next = new Set(expandedIds.value)
  next.has(id) ? next.delete(id) : next.add(id)
  expandedIds.value = next
}
function handleDragStart(row, event) {
  draggingId.value = row.node.id
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('application/x-editor-node-id', row.node.id)
}
function handleDrop(row, event) {
  event.preventDefault()
  const id = draggingId.value || event.dataTransfer.getData('application/x-editor-node-id')
  if (!id || id === row.node.id) return
  const targetParentId = row.parentId
  const siblings = targetParentId
    ? (document.children.find(n => n.id === targetParentId)?.children || findNode(targetParentId)?.children || [])
    : document.children
  const targetIndex = siblings.findIndex(n => n.id === row.node.id)
  if (targetIndex >= 0) moveNode(id, targetParentId, targetIndex)
  draggingId.value = null
}
function findNode(id, nodes = document.children) {
  for (const node of nodes) {
    if (node.id === id) return node
    const nested = findNode(id, node.children || [])
    if (nested) return nested
  }
  return null
}
function handleDragEnd() { draggingId.value = null }
onMounted(() => window.addEventListener('dragend', handleDragEnd))
onBeforeUnmount(() => window.removeEventListener('dragend', handleDragEnd))
</script>

<template>
  <main class="playground">
    <header class="playground__topbar">
      <div class="playground__brand">
        <button class="icon-button" type="button" aria-label="Back to home" title="Back to home" @click="router.push('/')">
          <ChevronRight class="back-icon" :size="17" />
        </button>
        <div class="playground__heading">
          <span class="playground__eyebrow">COMPONENT PLAYGROUND</span>
          <h1>{{ componentName }}</h1>
        </div>
      </div>
      <div class="playground__actions">
        <button class="toolbar-button" type="button" :disabled="!selectedNodeId" @click="copySelected"><Copy :size="15" /> Copy</button>
        <button class="toolbar-button toolbar-button--reset" type="button" @click="requestReset"><RotateCcw :size="15" /> Reset</button>
        <button class="icon-button" type="button" :aria-label="drawerOpen ? 'Close structure drawer' : 'Open structure drawer'" :title="drawerOpen ? 'Close structure drawer' : 'Open structure drawer'" @click="drawerOpen = !drawerOpen">
          <PanelLeftClose v-if="drawerOpen" :size="17" />
          <PanelLeftOpen v-else :size="17" />
        </button>
      </div>
    </header>

    <div class="playground__workspace" :class="{ 'playground__workspace--drawer-closed': !drawerOpen }">
      <aside v-if="drawerOpen" class="structure-drawer">
        <div class="structure-drawer__heading">
          <div><span class="drawer-eyebrow">LAYERS</span><h2>Structure</h2></div>
          <button class="icon-button icon-button--small" type="button" aria-label="Close structure drawer" @click="drawerOpen = false"><X :size="15" /></button>
        </div>
        <button ref="addAnchor" class="drawer-add" type="button" @click="openAdd"><span>+</span> Add element</button>
        <div class="structure-list" @dragover.prevent>
          <div v-if="!document.children.length" class="structure-empty">Your canvas is empty. Add an element to get started.</div>
          <div
            v-for="row in structure" :key="row.node.id"
            class="structure-row" :class="{ 'structure-row--selected': selectedNodeId === row.node.id, 'structure-row--dragging': draggingId === row.node.id }"
            :style="{ '--depth': row.depth }"
            draggable="true"
            @dragstart="handleDragStart(row, $event)"
            @dragover.prevent
            @drop.stop="handleDrop(row, $event)"
            @click="selectNode(row.node.id)"
          >
            <button v-if="row.node.children?.length" class="structure-row__expand" type="button" @click.stop="toggleExpanded(row.node.id)">
              <ChevronDown v-if="expandedIds.has(row.node.id)" :size="13" />
              <ChevronRight v-else :size="13" />
            </button>
            <span v-else class="structure-row__spacer"></span>
            <GripVertical class="structure-row__grip" :size="14" />
            <span class="structure-row__label">{{ labelFor(row.node) }}</span>
            <span class="structure-row__type">{{ row.node.type }}</span>
          </div>
        </div>
        <p class="structure-hint">Drag layers to reorder siblings. Select a layer to edit it on the canvas.</p>
      </aside>

      <section class="playground__stage-wrap">
        <div class="playground__stage-header"><span>CANVAS</span><span>{{ document.children.length }} top-level {{ document.children.length === 1 ? 'element' : 'elements' }}</span></div>
        <div class="playground__stage">
          <div class="playground__canvas">
            <div v-if="!document.children.length" class="playground__empty">
              <div class="playground__empty-mark">+</div>
              <h2>Your canvas is ready</h2>
              <p>Add a section, container, or element and build anything you want.</p>
              <button class="primary-button" type="button" @click="openAdd">Add your first element</button>
            </div>
            <EditorNode v-for="node in document.children" :key="node.id" :node="node" :root-node="true" />
          </div>
        </div>
      </section>
    </div>

    <AddMenu :open="addOpen" :anchor="addAnchor" title="Add to canvas" @select="handleAdd" @close="addOpen = false" />

    <div v-if="showResetConfirm" class="reset-overlay" role="presentation" @click.self="showResetConfirm = false">
      <section class="reset-dialog" role="dialog" aria-modal="true" aria-labelledby="reset-title">
        <h2 id="reset-title">Reset this canvas?</h2>
        <p>This removes all elements from this component's playground and clears its saved canvas.</p>
        <div class="reset-dialog__actions">
          <button class="toolbar-button" type="button" @click="showResetConfirm = false">Cancel</button>
          <button class="toolbar-button toolbar-button--danger" type="button" @click="resetCanvas">Reset canvas</button>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.playground { min-height: calc(100vh - 64px); background: #f5f6f8; color: #20242b; }
.playground__topbar { position: sticky; top: 0; z-index: 40; display:flex; align-items:center; justify-content:space-between; gap:18px; padding:14px 22px; border-bottom:1px solid #e4e7ec; background:#fff; }
.playground__brand,.playground__actions { display:flex; align-items:center; gap:12px; }
.playground__heading h1 { margin:2px 0 0; font-size:17px; font-weight:700; }
.playground__eyebrow,.drawer-eyebrow { color:#8f0070; font-size:9px; font-weight:800; letter-spacing:.13em; }
.playground__workspace { display:grid; grid-template-columns:260px minmax(0,1fr); min-height:calc(100vh - 126px); }
.playground__workspace--drawer-closed { grid-template-columns:minmax(0,1fr); }
.structure-drawer { display:flex; flex-direction:column; min-width:0; border-right:1px solid #e1e5eb; background:#fff; }
.structure-drawer__heading { display:flex; align-items:center; justify-content:space-between; padding:20px 16px 14px; }
.structure-drawer__heading h2 { margin:4px 0 0; font-size:15px; }
.drawer-add { display:flex; align-items:center; gap:8px; margin:0 12px 12px; padding:10px 12px; border:1px solid #ead0e6; border-radius:7px; background:#fff7fd; color:#8f0070; font-size:12px; font-weight:700; text-align:left; cursor:pointer; }
.drawer-add span { font-size:18px; line-height:12px; }
.structure-list { padding:0 8px; overflow:auto; }
.structure-empty { padding:16px 10px; color:#8a929e; font-size:11px; line-height:1.6; }
.structure-row { display:flex; align-items:center; gap:6px; min-height:34px; margin:2px 0; padding:0 8px 0 calc(8px + var(--depth) * 15px); border:1px solid transparent; border-radius:6px; color:#505967; font-size:11px; cursor:pointer; user-select:none; }
.structure-row:hover { background:#f7f8fa; }
.structure-row--selected { border-color:#e7c5df; background:#fff1fb; color:#8f0070; }
.structure-row--dragging { opacity:.4; }
.structure-row__expand,.structure-row__spacer { display:flex; align-items:center; justify-content:center; width:13px; flex:0 0 13px; padding:0; border:0; background:transparent; color:inherit; }
.structure-row__grip { flex:0 0 auto; color:#9aa2ad; }
.structure-row__label { overflow:hidden; flex:1; text-overflow:ellipsis; white-space:nowrap; }
.structure-row__type { color:#9aa2ad; font-size:9px; }
.structure-hint { margin:auto 14px 0; padding:16px 0; color:#9299a4; font-size:10px; line-height:1.5; }
.playground__stage-wrap { min-width:0; padding:20px; }
.playground__stage-header { display:flex; justify-content:space-between; margin:0 auto 10px; max-width:1200px; color:#858d99; font-size:9px; font-weight:800; letter-spacing:.1em; }
.playground__stage { min-height:calc(100vh - 180px); padding:28px; border:1px solid #e2e6eb; border-radius:9px; background-color:#fff; background-image:radial-gradient(#e2e5e9 .8px, transparent .8px); background-size:16px 16px; }
.playground__canvas { min-height:calc(100vh - 240px); background:#fff; box-shadow:0 2px 12px rgba(15,23,42,.04); }
.playground__empty { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:calc(100vh - 260px); padding:28px; color:#858d99; text-align:center; }
.playground__empty-mark { display:grid; place-items:center; width:42px; height:42px; border:1px dashed #d4a5ca; border-radius:12px; color:#8f0070; font-size:25px; }
.playground__empty h2 { margin:16px 0 7px; color:#343943; font-size:18px; }
.playground__empty p { max-width:340px; margin:0 0 18px; font-size:12px; line-height:1.7; }
.primary-button { min-height:38px; padding:0 15px; border:0; border-radius:7px; background:#8f0070; color:#fff; font-size:12px; font-weight:700; cursor:pointer; }
.primary-button:hover { background:#72005a; }
.toolbar-button,.icon-button { display:inline-flex; align-items:center; justify-content:center; gap:7px; min-height:34px; padding:0 11px; border:1px solid #dfe3e8; border-radius:7px; background:#fff; color:#424a56; font-size:11px; font-weight:600; cursor:pointer; }
.toolbar-button:disabled { opacity:.4; cursor:not-allowed; }
.toolbar-button--reset:hover { border-color:#d7a7ca; color:#8f0070; }
.icon-button { width:34px; padding:0; }
.icon-button--small { width:28px; min-height:28px; }
.back-icon { transform:rotate(180deg); }
.reset-overlay { position:fixed; inset:0; z-index:2000; display:grid; place-items:center; padding:20px; background:rgba(17,24,39,.35); }
.reset-dialog { width:min(420px,100%); padding:22px; border:1px solid #e1e4e8; border-radius:12px; background:#fff; box-shadow:0 20px 70px rgba(15,23,42,.2); }
.reset-dialog h2 { margin:0 0 8px; font-size:17px; }
.reset-dialog p { margin:0; color:#687180; font-size:12px; line-height:1.7; }
.reset-dialog__actions { display:flex; justify-content:flex-end; gap:8px; margin-top:22px; }
.toolbar-button--danger { border-color:#efc3c3; background:#fff4f4; color:#b42318; }
@media(max-width:760px) {
  .playground__topbar { align-items:flex-start; padding:12px; }
  .playground__brand { gap:8px; }
  .playground__actions { gap:5px; }
  .toolbar-button { padding:0 8px; font-size:10px; }
  .playground__workspace { grid-template-columns:220px minmax(0,1fr); }
  .playground__stage-wrap { padding:10px; }
  .playground__stage { padding:12px; }
}
@media(max-width:560px) {
  .playground__workspace { grid-template-columns:minmax(0,1fr); }
  .structure-drawer { max-height:35vh; border-right:0; border-bottom:1px solid #e1e5eb; }
  .structure-hint { display:none; }
  .playground__topbar { flex-wrap:wrap; }
  .playground__actions { margin-left:auto; }
}
</style>
