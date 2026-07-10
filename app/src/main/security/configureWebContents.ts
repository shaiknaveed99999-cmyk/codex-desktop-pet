import type { WebContents } from 'electron'

export function configureWebContentsSecurity(webContents: WebContents): void {
  webContents.setWindowOpenHandler(() => ({ action: 'deny' }))
  webContents.on('will-navigate', (event) => event.preventDefault())
}
