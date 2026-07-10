import { contextBridge, ipcRenderer } from 'electron'
import { appInfoResultSchema } from '../shared/contracts/appInfo'
import type { AppInfoResult } from '../shared/contracts/appInfo'
import { appInfoChannel } from '../shared/contracts/ipc'
import { windowActionChannel, windowStateChannel, windowStateChangedChannel } from '../shared/contracts/ipc'
import { windowEngineResultSchema, windowEngineStateSchema } from '../shared/contracts/windowEngine'
import type { WindowAction, WindowEngineResult, WindowEngineState } from '../shared/contracts/windowEngine'

const petsApi = Object.freeze({
  version: 1 as const,
  async getAppInfo(): Promise<AppInfoResult> {
    return appInfoResultSchema.parse(await ipcRenderer.invoke(appInfoChannel))
  },
  async getWindowState(): Promise<WindowEngineResult> { return windowEngineResultSchema.parse(await ipcRenderer.invoke(windowStateChannel)) },
  async performWindowAction(action: WindowAction): Promise<WindowEngineResult> { return windowEngineResultSchema.parse(await ipcRenderer.invoke(windowActionChannel, action)) },
  onWindowStateChanged(listener: (state: WindowEngineState) => void): () => void { const handler = (_event: Electron.IpcRendererEvent, state: unknown) => listener(windowEngineStateSchema.parse(state)); ipcRenderer.on(windowStateChangedChannel, handler); return () => ipcRenderer.off(windowStateChangedChannel, handler) },
})

contextBridge.exposeInMainWorld('pets', petsApi)
