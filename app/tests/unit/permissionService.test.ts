import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { PermissionService } from '../../src/main/permissions/permissionService'

describe('PermissionService', () => {
  it('allows the explicit read-only app information capability', () => {
    const service = new PermissionService()
    expect(service.isAllowed({ capability: 'app.readInfo', subject: 'renderer', scope: 'application', reason: 'status', correlationId: randomUUID() })).toBe(true)
  })

  it('denies malformed requests', () => {
    const service = new PermissionService()
    expect(service.isAllowed({ capability: 'not.real', subject: 'renderer', scope: 'application', reason: 'status', correlationId: randomUUID() } as never)).toBe(false)
  })
})
