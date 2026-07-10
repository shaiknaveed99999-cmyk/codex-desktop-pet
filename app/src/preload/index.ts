import { contextBridge, ipcRenderer } from 'electron'
import { appInfoResultSchema } from '../shared/contracts/appInfo'
import type { AppInfoResult } from '../shared/contracts/appInfo'
import { appInfoChannel } from '../shared/contracts/ipc'

const petsApi = Object.freeze({
  version: 1 as const,
  async getAppInfo(): Promise<AppInfoResult> {
    return appInfoResultSchema.parse(await ipcRenderer.invoke(appInfoChannel))
  },
})

contextBridge.exposeInMainWorld('pets', petsApi)
