import type { AppInfo } from '../shared/contracts/appInfo'

declare global {
  interface Window {
    pets: Readonly<{
      version: 1
      getAppInfo: () => Promise<AppInfo>
    }>
  }
}

export {}
