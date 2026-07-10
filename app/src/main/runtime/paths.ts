import { fileURLToPath } from 'node:url'
import path from 'node:path'

export type RuntimePaths = Readonly<{
  devServerUrl: string | undefined
  isDevelopment: boolean
  preloadPath: string
  rendererIndexPath: string
}>

export function resolveRuntimePaths(entryUrl: string, devServerUrl = process.env.VITE_DEV_SERVER_URL): RuntimePaths {
  const outputDirectory = path.dirname(fileURLToPath(entryUrl))
  const applicationDirectory = path.dirname(outputDirectory)

  return {
    devServerUrl,
    isDevelopment: Boolean(devServerUrl),
    preloadPath: path.join(outputDirectory, 'index.mjs'),
    rendererIndexPath: path.join(applicationDirectory, 'dist', 'index.html'),
  }
}
