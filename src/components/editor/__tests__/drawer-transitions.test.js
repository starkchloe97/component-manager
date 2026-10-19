import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ComponentLibraryPage from '@/components/editor/ComponentLibraryPage.vue'

describe('ComponentLibraryPage Drawer & Transitions', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  it('renders the component list and does not unmount it when drawer opens', async () => {
    const wrapper = mount(ComponentLibraryPage, {
      props: {
        title: 'Text Image Components',
        prefix: 'TextImage',
      },
      global: {
        stubs: {
          Editor: { template: '<div class="stub-editor"><button class="close-btn" @click="$emit(\'close\')">Close</button></div>' },
          RouterLink: { template: '<a><slot /></a>' },
          Teleport: true,
        },
      },
    })

    // Initially, list is visible and drawer is closed
    const list = wrapper.find('.component-list')
    expect(list.exists()).toBe(true)
    const cards = wrapper.findAll('.component-card')
    expect(cards.length).toBeGreaterThan(0)
    expect(wrapper.find('.drawer-panel').exists()).toBe(false)

    // Click "Edit component"
    const editBtn = wrapper.find('.edit-button')
    await editBtn.trigger('click')

    // List must REMAIN mounted (no v-if=!editingComponent)
    expect(wrapper.find('.component-list').exists()).toBe(true)

    // Drawer must now be open
    const drawer = wrapper.find('.drawer-panel')
    expect(drawer.exists()).toBe(true)
    expect(document.body.style.overflow).toBe('hidden')

    // Close drawer via close event
    const closeBtn = wrapper.find('.close-btn')
    await closeBtn.trigger('click')

    // Drawer is closed, list is still mounted, body scroll restored
    expect(wrapper.find('.drawer-panel').exists()).toBe(false)
    expect(wrapper.find('.component-list').exists()).toBe(true)
    expect(document.body.style.overflow).toBe('')
  })

  it('shows empty state when no components match the prefix', () => {
    const wrapper = mount(ComponentLibraryPage, {
      props: {
        title: 'Nonexistent Category',
        prefix: 'NonexistentPrefixXYZ',
      },
      global: {
        stubs: {
          RouterLink: { template: '<a><slot /></a>' },
          Teleport: true,
        },
      },
    })

    expect(wrapper.find('.empty-library').exists()).toBe(true)
    expect(wrapper.text()).toContain('No components found')
    expect(wrapper.text()).toContain('0 components')
  })

  it('closes drawer on Escape key press', async () => {
    const wrapper = mount(ComponentLibraryPage, {
      props: {
        title: 'Text Image Components',
        prefix: 'TextImage',
      },
      global: {
        stubs: {
          Editor: { template: '<div class="stub-editor"></div>' },
          RouterLink: { template: '<a><slot /></a>' },
          Teleport: true,
        },
      },
      attachTo: document.body,
    })

    const editBtn = wrapper.find('.edit-button')
    await editBtn.trigger('click')
    expect(wrapper.find('.drawer-panel').exists()).toBe(true)

    // Dispatch Escape keydown
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.drawer-panel').exists()).toBe(false)
    wrapper.unmount()
  })
})
