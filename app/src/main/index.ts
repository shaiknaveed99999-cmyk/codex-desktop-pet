import { app, BrowserWindow, ipcMain, screen, session } from 'electron'
import path from 'node:path'
import { registerIpcHandlers } from './ipc/registerIpcHandlers'
import { logInfo } from './diagnostics/logger'
import { PermissionService } from './permissions/permissionService'
import { resolveRuntimePaths } from './runtime/paths'
import { configureSessionSecurity } from './security/configureSession'
import { configureWebContentsSecurity } from './security/configureWebContents'
import { WindowEngine } from './window/windowEngine'
import { WindowStateStore } from './window/windowStateStore'
import { createTray } from './window/createTray'
import { registerWindowEngineIpc } from './ipc/registerWindowEngineIpc'
import { windowStateChangedChannel } from '../shared/contracts/ipc'

const runtimePaths = resolveRuntimePaths(import.meta.url)

app.commandLine.appendSwitch('force_high_dpi_support')

async function createWindow(engine: WindowEngine): Promise<BrowserWindow> {
  const window = new BrowserWindow({
    width: 1100,
    height: 720,
    minWidth: 900,
    minHeight: 600,
    show: false,
    frame: false, transparent: true, alwaysOnTop: true, hasShadow: true, backgroundColor: '#00000000',
    webPreferences: {
      preload: runtimePaths.preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      spellcheck: false,
    },
  })

  configureWebContentsSecurity(window.webContents)
  await engine.attach(window)
  window.once('ready-to-show', () => window.show())

  if (runtimePaths.devServerUrl) {
    void window.loadURL(runtimePaths.devServerUrl)
  } else {
    void window.loadFile(runtimePaths.rendererIndexPath)
  }

  return window
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.on('second-instance', () => {
    const window = BrowserWindow.getAllWindows()[0]
    if (window) {
      if (window.isMinimized()) window.restore()
      window.focus()
    }
  })

  void app.whenReady().then(async () => {
    app.setAppUserModelId('com.pets.desktop')
    configureSessionSecurity(session.defaultSession, runtimePaths.devServerUrl)
    registerIpcHandlers({
      ipcMain,
      permissionService: new PermissionService(),
      getAppInfo: () => ({
        name: 'Pets',
        version: app.getVersion(),
        platform: 'win32',
        isPackaged: app.isPackaged,
      }),
    })
    const store = new WindowStateStore(path.join(app.getPath('userData'), 'window-state.json'))
    const engine = new WindowEngine(screen, store, (state) => BrowserWindow.getAllWindows()[0]?.webContents.send(windowStateChangedChannel, state))
    registerWindowEngineIpc(ipcMain, engine)
    const window = await createWindow(engine)
    let quitting = false
    app.on('before-quit', () => { quitting = true })
    window.on('close', (event) => { if (!quitting) { event.preventDefault(); window.hide() } })
    createTray(engine, () => app.quit())
    logInfo('application.ready', { isPackaged: app.isPackaged })
  })

  app.on('window-all-closed', () => app.quit())
}
