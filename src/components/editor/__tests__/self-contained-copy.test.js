import { describe, it, expect, vi } from 'vitest'
import { useComponentCopy } from '@/composables/useComponentCopy'
import { useEditor } from '@/composables/useEditor'

describe('useComponentCopy & Self-Contained Output', () => {
  it('makes copied component code self-contained by removing manager imports', async () => {
    const { copySelectedComponent } = useComponentCopy()

    // Mock clipboard API
    let clipboardText = ''
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn(async (text) => {
          clipboardText = text
        }),
      },
    })

    const result = await copySelectedComponent('TextImage1')
    expect(result.ok).toBe(true)
    expect(result.source).toBeDefined()
    expect(clipboardText).toBe(result.source)

    // 1. Must NOT depend on internal manager composables or config
    expect(result.source).not.toContain('@/composables/useComponentStyles')
    expect(result.source).not.toContain('@/config/siteInfo')
    expect(result.source).not.toContain('@/config/iconLibrary')

    // 2. Must import reactive from vue
    expect(result.source).toContain('reactive')

    // 3. Must inline SITE_NAME
    expect(result.source).toContain('const SITE_NAME =')
  })

  it('serializes icons directly from @lucide/vue without iconLibrary', async () => {
    const { copySelectedComponent } = useComponentCopy()
    const { addNode, addContainer, setActiveComponent } = useEditor()

    setActiveComponent('playground-test-copy')
    const container = addContainer('column')
    addNode('icon', container.id, {
      props: { icon: 'Heart', decorative: true },
    })

    const result = await copySelectedComponent('playground-test-copy')
    expect(result.ok).toBe(true)

    // Verify self-contained @lucide/vue import
    expect(result.source).toContain('import { Heart } from "@lucide/vue"')
    expect(result.source).toContain('<Heart :size="\'100%\'"')
    expect(result.source).not.toContain('resolveIcon')
    expect(result.source).not.toContain('@/config/iconLibrary')
  })
})
