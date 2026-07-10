import type { IpcMain } from 'electron'
import { randomUUID } from 'node:crypto'
import { appInfoRequestSchema, appInfoResultSchema, appInfoSchema } from '../../shared/contracts/appInfo'
import type { AppInfo, AppInfoResult } from '../../shared/contracts/appInfo'
import { appInfoChannel } from '../../shared/contracts/ipc'
import { appErrorCodes } from '../../shared/errors/appError'
import type { PermissionService } from '../permissions/permissionService'

type IpcDependencies = Readonly<{
  ipcMain: IpcMain
  permissionService: PermissionService
  getAppInfo: () => AppInfo
}>

export function registerIpcHandlers({ ipcMain, permissionService, getAppInfo }: IpcDependencies): void {
  ipcMain.handle(appInfoChannel, (_event, request: unknown): AppInfoResult => {
    if (!appInfoRequestSchema.safeParse(request).success) {
      return { ok: false, error: { code: appErrorCodes.invalidRequest, message: 'The app information request must not contain a payload.' } }
    }

    const allowed = permissionService.isAllowed({
      capability: 'app.readInfo',
      subject: 'renderer',
      scope: 'application',
      reason: 'Display application version and runtime status.',
      correlationId: randomUUID(),
    })

    if (!allowed) {
      return { ok: false, error: { code: appErrorCodes.permissionDenied, message: 'The app information capability is not granted.' } }
    }

    let appInfo: AppInfo
    try {
      appInfo = getAppInfo()
    } catch {
      return { ok: false, error: { code: appErrorCodes.internal, message: 'Application information is unavailable.' } }
    }

    const parsedInfo = appInfoSchema.safeParse(appInfo)
    if (!parsedInfo.success) {
      return { ok: false, error: { code: appErrorCodes.internal, message: 'Application information is unavailable.' } }
    }

    return appInfoResultSchema.parse({ ok: true, data: parsedInfo.data })
  })
}
