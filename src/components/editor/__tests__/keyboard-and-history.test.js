import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Editor from '@/components/editor/Editor.vue'
import { useEditorHistory } from '@/composables/useEditorHistory'

describe('Keyboard Shortcuts & Editor History', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('manages undo and redo history states correctly', async () => {
    const history = useEditorHistory()
    let mockState = { count: 0 }

    history.configure({
      componentId: 'test-comp',
      snapshot: () => ({ ...mockState }),
      restore: (s) => { mockState = { ...s } },
    })
    history.reset()

    expect(history.canUndo.value).toBe(false)
    expect(history.canRedo.value).toBe(false)

    // Mutation 1
    mockState.count = 1
    history.markDirty()
    history.flush()

    expect(history.canUndo.value).toBe(true)
    expect(history.canRedo.value).toBe(false)

    // Undo
    await history.undo()
    expect(mockState.count).toBe(0)
    expect(history.canUndo.value).toBe(false)
    expect(history.canRedo.value).toBe(true)

    // Redo
    await history.redo()
    expect(mockState.count).toBe(1)
    expect(history.canUndo.value).toBe(true)
    expect(history.canRedo.value).toBe(false)
  })

  it('renders component-not-found state when invalid component ID is supplied', () => {
    const wrapper = mount(Editor, {
      props: {
        initialComponentId: 'nonexistent-id-999999',
      },
      global: {
        stubs: {
          ElementorInspector: true,
          ComponentCanvas: true,
          NavigatorPanel: true,
        },
      },
    })

    expect(wrapper.find('.editor-not-found').exists()).toBe(true)
    expect(wrapper.text()).toContain('Component not found')
  })

  it('updates copy button feedback on copy action', async () => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })

    const wrapper = mount(Editor, {
      props: {
        initialComponentId: 'TextImage1',
      },
      global: {
        stubs: {
          ElementorInspector: true,
          ComponentCanvas: true,
          NavigatorPanel: true,
        },
      },
    })

    const copyBtn = wrapper.find('button[aria-label="Copy Vue"]')
    expect(copyBtn.exists()).toBe(true)

    await copyBtn.trigger('click')
    await nextTick()

    // Button should now show copied state
    expect(wrapper.find('.btn--copied').exists()).toBe(true)
  })

  it('deletes selected node on Delete or Backspace keydown', async () => {
    const wrapper = mount(Editor, {
      props: { initialComponentId: 'playground-test-kbd', enableBuilder: true },
      global: { stubs: { ElementorInspector: true, ComponentCanvas: true, NavigatorPanel: true } },
    })

    const { addNode, addContainer, selectNode, selectedNodeId } = (await import('@/composables/useEditor')).useEditor()
    const container = addContainer('column')
    const button = addNode('button', container.id)
    selectNode(button.id)
    expect(selectedNodeId.value).toBe(button.id)
    expect(container.children.length).toBe(1)

    // Dispatch Delete key
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Delete' }))
    await nextTick()

    expect(container.children.length).toBe(0)

    // Add another node and test Backspace
    const heading = addNode('heading', container.id)
    selectNode(heading.id)
    expect(container.children.length).toBe(1)

    // Dispatch Backspace key
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }))
    await nextTick()

    expect(container.children.length).toBe(0)
    wrapper.unmount()
  })

  it('duplicates selected node on Ctrl+D keydown', async () => {
    const wrapper = mount(Editor, {
      props: { initialComponentId: 'playground-test-kbd', enableBuilder: true },
      global: { stubs: { ElementorInspector: true, ComponentCanvas: true, NavigatorPanel: true } },
    })

    const { addNode, addContainer, selectNode } = (await import('@/composables/useEditor')).useEditor()
    const container = addContainer('column')
    const button = addNode('button', container.id)
    selectNode(button.id)
    expect(container.children.length).toBe(1)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'd', ctrlKey: true }))
    await nextTick()

    expect(container.children.length).toBe(2)
    wrapper.unmount()
  })
})
