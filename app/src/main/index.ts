import { app, BrowserWindow, ipcMain, session } from 'electron'
import { registerIpcHandlers } from './ipc/registerIpcHandlers'
import { logInfo } from './diagnostics/logger'
import { PermissionService } from './permissions/permissionService'
import { resolveRuntimePaths } from './runtime/paths'
import { configureSessionSecurity } from './security/configureSession'
import { configureWebContentsSecurity } from './security/configureWebContents'

const runtimePaths = resolveRuntimePaths(import.meta.url)

function createWindow(): BrowserWindow {
  const window = new BrowserWindow({
    width: 1100,
    height: 720,
    minWidth: 900,
    minHeight: 600,
    show: false,
    backgroundColor: '#101622',
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

  void app.whenReady().then(() => {
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
    createWindow()
    logInfo('application.ready', { isPackaged: app.isPackaged })
  })

  app.on('window-all-closed', () => app.quit())
}
