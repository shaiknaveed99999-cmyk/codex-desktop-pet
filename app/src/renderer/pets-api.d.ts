import type { AppInfoResult } from '../shared/contracts/appInfo'
import type { WindowAction, WindowEngineResult, WindowEngineState } from '../shared/contracts/windowEngine'

declare global {
  interface Window {
    pets: Readonly<{
      version: 1
      getAppInfo: () => Promise<AppInfoResult>
      getWindowState: () => Promise<WindowEngineResult>
      performWindowAction: (action: WindowAction) => Promise<WindowEngineResult>
      onWindowStateChanged: (listener: (state: WindowEngineState) => void) => () => void
    }>
  }
}

export {}
