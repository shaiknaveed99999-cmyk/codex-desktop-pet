import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { resolveRuntimePaths } from '../../src/main/runtime/paths'

describe('resolveRuntimePaths', () => {
  it('resolves emitted preload and renderer locations from the main entry', () => {
    const paths = resolveRuntimePaths('file:///C:/Pets/dist-electron/index.js', undefined)
    expect(paths.preloadPath).toBe(path.join('C:', 'Pets', 'dist-electron', 'index.mjs'))
    expect(paths.rendererIndexPath).toBe(path.join('C:', 'Pets', 'dist', 'index.html'))
  })
})
