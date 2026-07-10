import { describe, expect, it } from 'vitest'
import { registerIpcHandlers } from '../../src/main/ipc/registerIpcHandlers'
import { PermissionService } from '../../src/main/permissions/permissionService'
import { appInfoChannel } from '../../src/shared/contracts/ipc'
import type { AppInfoResult } from '../../src/shared/contracts/appInfo'
import type { IpcMain } from 'electron'

describe('registerIpcHandlers', () => {
  it('registers a validated, read-only app information handler', () => {
    let handler: ((event: unknown, request: unknown) => AppInfoResult) | undefined
    const ipcMain = {
      handle: (channel: string, nextHandler: unknown) => {
        if (channel === appInfoChannel) handler = nextHandler as (event: unknown, request: unknown) => AppInfoResult
      },
    } as unknown as IpcMain
    const expected = { name: 'Pets', version: '0.1.0', platform: 'win32', isPackaged: false } as const

    registerIpcHandlers({ ipcMain, permissionService: new PermissionService(), getAppInfo: () => expected })

    expect(handler).toBeDefined()
    expect(handler?.({}, undefined)).toEqual({ ok: true, data: expected })
    expect(handler?.({}, { unexpected: true })).toEqual({ ok: false, error: { code: 'INVALID_REQUEST', message: 'The app information request must not contain a payload.' } })
  })

  it('normalizes provider failures', () => {
    let handler: ((event: unknown, request: unknown) => AppInfoResult) | undefined
    const ipcMain = {
      handle: (_channel: string, nextHandler: unknown) => { handler = nextHandler as (event: unknown, request: unknown) => AppInfoResult },
    } as unknown as IpcMain

    registerIpcHandlers({ ipcMain, permissionService: new PermissionService(), getAppInfo: () => { throw new Error('unavailable') } })

    expect(handler?.({}, undefined)).toEqual({ ok: false, error: { code: 'INTERNAL_ERROR', message: 'Application information is unavailable.' } })
  })
})
