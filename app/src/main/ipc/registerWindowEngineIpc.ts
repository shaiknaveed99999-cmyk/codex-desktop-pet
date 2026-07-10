import type { IpcMain } from 'electron'
import { windowActionChannel, windowStateChannel } from '../../shared/contracts/ipc'
import { windowActionSchema, windowEngineResultSchema } from '../../shared/contracts/windowEngine'
import type { WindowEngine } from '../window/windowEngine'
import { appErrorCodes } from '../../shared/errors/appError'

export function registerWindowEngineIpc(ipcMain: IpcMain, engine: WindowEngine): void {
  ipcMain.handle(windowStateChannel, (_event, request: unknown) => request === undefined ? { ok: true, data: engine.state() } : { ok: false, error: { code: appErrorCodes.invalidRequest, message: 'Window state does not accept a payload.' } })
  ipcMain.handle(windowActionChannel, (_event, request: unknown) => { const parsed = windowActionSchema.safeParse(request); if (!parsed.success) return { ok: false, error: { code: appErrorCodes.invalidRequest, message: 'Invalid window action.' } }; const { action, enabled } = parsed.data; const state = action === 'toggleAlwaysOnTop' ? engine.toggleAlwaysOnTop() : action === 'toggleClickThrough' ? engine.toggleClickThrough() : action === 'toggleDebugOverlay' ? engine.toggleDebugOverlay(enabled) : action === 'snapToEdge' ? engine.snap() : engine.hide(); return windowEngineResultSchema.parse({ ok: true, data: state }) })
}
