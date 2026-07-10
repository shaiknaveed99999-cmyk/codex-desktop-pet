import type { WindowBounds } from '../../shared/contracts/windowEngine'

export function snapBoundsToWorkArea(bounds: WindowBounds, workArea: WindowBounds, threshold = 20): WindowBounds {
  const right = workArea.x + workArea.width - bounds.width
  const bottom = workArea.y + workArea.height - bounds.height
  return { ...bounds, x: Math.abs(bounds.x - workArea.x) <= threshold ? workArea.x : Math.abs(bounds.x - right) <= threshold ? right : bounds.x, y: Math.abs(bounds.y - workArea.y) <= threshold ? workArea.y : Math.abs(bounds.y - bottom) <= threshold ? bottom : bounds.y }
}
