import { describe, expect, it } from 'vitest'
import { snapBoundsToWorkArea } from '../../src/main/window/snap'

describe('snapBoundsToWorkArea', () => {
  const workArea = { x: 0, y: 0, width: 1920, height: 1040 }

  it('snaps near the top-left and bottom-right edges', () => {
    expect(snapBoundsToWorkArea({ x: 8, y: 7, width: 480, height: 360 }, workArea)).toMatchObject({ x: 0, y: 0 })
    expect(snapBoundsToWorkArea({ x: 1430, y: 680, width: 480, height: 360 }, workArea)).toMatchObject({ x: 1440, y: 680 })
  })
})
