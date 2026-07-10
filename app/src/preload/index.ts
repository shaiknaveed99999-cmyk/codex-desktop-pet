import { contextBridge, ipcRenderer } from 'electron'
import { appInfoSchema } from '../shared/contracts/appInfo'
import type { AppInfo } from '../shared/contracts/appInfo'
import { appInfoChannel } from '../shared/contracts/ipc'

const petsApi = Object.freeze({
  version: 1 as const,
  async getAppInfo(): Promise<AppInfo> {
    return appInfoSchema.parse(await ipcRenderer.invoke(appInfoChannel))
  },
})

contextBridge.exposeInMainWorld('pets', petsApi)
