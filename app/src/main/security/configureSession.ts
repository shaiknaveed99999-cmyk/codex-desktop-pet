import type { Session } from 'electron'

function developmentConnectSource(devServerUrl: string | undefined): string {
  if (!devServerUrl) return "connect-src 'self'"

  const url = new URL(devServerUrl)
  const websocketProtocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
  const websocketOrigin = `${websocketProtocol}//${url.host}`

  return `connect-src 'self' ${url.origin} ${websocketOrigin}`
}

export function createContentSecurityPolicy(devServerUrl: string | undefined): string {
  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    developmentConnectSource(devServerUrl),
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
    "frame-src 'none'",
  ].join('; ')
}

export function configureSessionSecurity(session: Session, devServerUrl: string | undefined): void {
  const contentSecurityPolicy = createContentSecurityPolicy(devServerUrl)

  session.setPermissionCheckHandler(() => false)
  session.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false))
  session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [contentSecurityPolicy],
      },
    })
  })
}
