import { describe, it, expect, beforeEach } from 'vitest'
import { useComponentEditor } from '@/composables/useComponentEditor'

describe('useComponentEditor & State Synchronization', () => {
  let editor

  beforeEach(() => {
    localStorage.clear()
    editor = useComponentEditor()
  })

  it('matches root element when applying overrides with matchingElements', () => {
    const { matchingElements, setStyle, applyOverrides, overrides } = editor

    // Create a mock root element that has class "overview"
    const root = document.createElement('section')
    root.className = 'overview'
    const child = document.createElement('h2')
    child.className = 'section-title'
    child.textContent = 'Original Title'
    root.appendChild(child)

    // Verify matchingElements matches both root and child
    expect(matchingElements(root, '.overview')).toContain(root)
    expect(matchingElements(root, '.section-title')).toContain(child)

    // Set styles on the root
    setStyle('test-comp', '.overview', 'background', '#123456')
    expect(overrides['test-comp']['.overview'].background).toBe('#123456')

    // Apply overrides to root
    applyOverrides(root, 'test-comp')
    expect(root.style.background).toBe('rgb(18, 52, 86)') // #123456 in rgb
  })

  it('updates text content and preserves original baseline', () => {
    const { setContent, getContent, getContentEntry, resetContent } = editor

    const root = document.createElement('div')
    const heading = document.createElement('h1')
    heading.textContent = 'Hello World'
    heading.setAttribute('data-editor-element', '0-0')
    root.appendChild(heading)

    setContent('comp-1', '[data-editor-element="0-0"]', 'Updated Headline', {
      originalText: 'Hello World',
      tag: 'h1',
    })

    expect(getContent('comp-1', '[data-editor-element="0-0"]')).toBe('Updated Headline')
    const entry = getContentEntry('comp-1', '[data-editor-element="0-0"]')
    expect(entry.originalText).toBe('Hello World')

    // Calling setContent again should not overwrite originalText baseline
    setContent('comp-1', '[data-editor-element="0-0"]', 'Second Update', {
      originalText: 'Updated Headline',
    })
    expect(getContentEntry('comp-1', '[data-editor-element="0-0"]').originalText).toBe('Hello World')

    // Resetting content should revert to original text
    resetContent('comp-1', '[data-editor-element="0-0"]')
    expect(getContent('comp-1', '[data-editor-element="0-0"]')).toBeNull()
  })

  it('sets and restores image overrides', () => {
    const { setImage, getImage } = editor

    const root = document.createElement('div')
    root.setAttribute('data-editor-component-id', 'comp-img')
    document.body.appendChild(root)

    const img = document.createElement('img')
    img.setAttribute('src', 'original.jpg')
    img.className = 'feature-img'
    root.appendChild(img)

    setImage('comp-img', '.feature-img', 'new-image.webp')
    expect(getImage('comp-img', '.feature-img')).toBe('new-image.webp')
    expect(img.getAttribute('src')).toBe('new-image.webp')

    document.body.removeChild(root)
  })

  it('resets component state cleanly from both canvas and list preview roots', () => {
    const { setStyle, setContent, resetComponentState, overrides, contentOverrides } = editor

    const canvasRoot = document.createElement('div')
    canvasRoot.setAttribute('data-editor-component-id', 'comp-sync')
    const listRoot = document.createElement('div')
    listRoot.setAttribute('data-editor-component-id', 'comp-sync')

    const p1 = document.createElement('p')
    p1.className = 'desc'
    p1.textContent = 'Original'
    canvasRoot.appendChild(p1)

    const p2 = document.createElement('p')
    p2.className = 'desc'
    p2.textContent = 'Original'
    listRoot.appendChild(p2)

    document.body.appendChild(canvasRoot)
    document.body.appendChild(listRoot)

    setStyle('comp-sync', '.desc', 'color', '#ff0000')
    setContent('comp-sync', '.desc', 'Modified Text', { originalText: 'Original' })

    expect(overrides['comp-sync']).toBeDefined()
    expect(contentOverrides['comp-sync']).toBeDefined()

    resetComponentState('comp-sync')

    expect(overrides['comp-sync']).toBeUndefined()
    expect(contentOverrides['comp-sync']).toBeUndefined()
    expect(p1.textContent).toBe('Original')
    expect(p2.textContent).toBe('Original')
    expect(p1.style.color).toBe('')
    expect(p2.style.color).toBe('')

    document.body.removeChild(canvasRoot)
    document.body.removeChild(listRoot)
  })
})
