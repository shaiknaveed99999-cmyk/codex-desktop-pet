import type { IpcMain } from 'electron'
import { randomUUID } from 'node:crypto'
import { appInfoRequestSchema } from '../../shared/contracts/appInfo'
import type { AppInfo } from '../../shared/contracts/appInfo'
import { appInfoChannel } from '../../shared/contracts/ipc'
import { appErrorCodes, AppError } from '../../shared/errors/appError'
import type { PermissionService } from '../permissions/permissionService'

type IpcDependencies = Readonly<{
  ipcMain: IpcMain
  permissionService: PermissionService
  getAppInfo: () => AppInfo
}>

export function registerIpcHandlers({ ipcMain, permissionService, getAppInfo }: IpcDependencies): void {
  ipcMain.handle(appInfoChannel, (_event, request: unknown) => {
    if (!appInfoRequestSchema.safeParse(request).success) {
      throw new AppError(appErrorCodes.invalidRequest, 'The app information request must not contain a payload.')
    }

    const allowed = permissionService.isAllowed({
      capability: 'app.readInfo',
      subject: 'renderer',
      scope: 'application',
      reason: 'Display application version and runtime status.',
      correlationId: randomUUID(),
    })

    if (!allowed) {
      throw new AppError(appErrorCodes.permissionDenied, 'The app information capability is not granted.')
    }

    return getAppInfo()
  })
}
