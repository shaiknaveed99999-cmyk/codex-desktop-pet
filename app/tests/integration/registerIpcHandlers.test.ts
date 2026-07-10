import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { registerIpcHandlers } from '../../src/main/ipc/registerIpcHandlers'
import { PermissionService } from '../../src/main/permissions/permissionService'
import { appInfoChannel } from '../../src/shared/contracts/ipc'
import type { AppInfo } from '../../src/shared/contracts/appInfo'
import type { IpcMain } from 'electron'

describe('registerIpcHandlers', () => {
  it('registers a validated, read-only app information handler', () => {
    let handler: ((event: unknown, request: unknown) => AppInfo) | undefined
    const ipcMain = {
      handle: (channel: string, nextHandler: unknown) => {
        if (channel === appInfoChannel) handler = nextHandler as (event: unknown, request: unknown) => AppInfo
      },
    } as IpcMain
    const expected = { name: 'Pets', version: '0.1.0', platform: 'win32', isPackaged: false } as const

    registerIpcHandlers({ ipcMain, permissionService: new PermissionService(), getAppInfo: () => expected })

    expect(handler).toBeDefined()
    expect(handler?.({}, undefined)).toEqual(expected)
    expect(() => handler?.({}, { unexpected: true })).toThrow('must not contain a payload')
  })

  it('does not grant arbitrary capabilities', () => {
    const service = new PermissionService()
    expect(service.isAllowed({ capability: 'app.readInfo', subject: 'renderer', scope: 'application', reason: 'status', correlationId: randomUUID() })).toBe(true)
  })
})
