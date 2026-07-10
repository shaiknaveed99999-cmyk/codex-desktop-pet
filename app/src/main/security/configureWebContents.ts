import type { WebContents } from 'electron'

export function configureWebContentsSecurity(webContents: WebContents): void {
  webContents.setWindowOpenHandler(() => ({ action: 'deny' }))
  webContents.on('will-navigate', (event) => event.preventDefault())
  webContents.on('will-attach-webview', (event) => event.preventDefault())
}
