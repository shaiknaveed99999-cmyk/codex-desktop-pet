import { describe, expect, it } from 'vitest'
import { normalizeWindowBounds } from '../../src/main/window/windowStateStore'

describe('normalizeWindowBounds', () => {
  it('keeps persisted bounds visible and within the work area', () => {
    expect(normalizeWindowBounds({ x: -900, y: -900, width: 2400, height: 1600 }, { x: 0, y: 0, width: 1920, height: 1040 })).toEqual({ x: 0, y: 0, width: 1920, height: 1040 })
  })
})
