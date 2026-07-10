import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { registerIpcHandlers } from './ipc/registerIpcHandlers'
import { logInfo } from './diagnostics/logger'
import { PermissionService } from './permissions/permissionService'
import { configureWebContentsSecurity } from './security/configureWebContents'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const appRoot = path.join(currentDirectory, '..')
const devServerUrl = process.env.VITE_DEV_SERVER_URL
const rendererDist = path.join(appRoot, 'dist')

function createWindow(): BrowserWindow {
  const window = new BrowserWindow({
    width: 1100,
    height: 720,
    minWidth: 900,
    minHeight: 600,
    show: false,
    backgroundColor: '#101622',
    webPreferences: {
      preload: path.join(currentDirectory, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      spellcheck: false,
    },
  })

  configureWebContentsSecurity(window.webContents)
  window.once('ready-to-show', () => window.show())

  if (devServerUrl) {
    void window.loadURL(devServerUrl)
  } else {
    void window.loadFile(path.join(rendererDist, 'index.html'))
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
