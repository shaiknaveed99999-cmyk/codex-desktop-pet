import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { savedWindowStateSchema } from '../../shared/contracts/windowEngine'
import type { SavedWindowState, WindowBounds } from '../../shared/contracts/windowEngine'

export function normalizeWindowBounds(bounds: WindowBounds, workArea: WindowBounds): WindowBounds {
  return { width: Math.min(bounds.width, workArea.width), height: Math.min(bounds.height, workArea.height), x: Math.max(workArea.x, Math.min(bounds.x, workArea.x + workArea.width - Math.min(bounds.width, workArea.width))), y: Math.max(workArea.y, Math.min(bounds.y, workArea.y + workArea.height - Math.min(bounds.height, workArea.height))) }
}

export class WindowStateStore {
  public constructor(private readonly filePath: string) {}
  public async load(): Promise<SavedWindowState | undefined> { try { return savedWindowStateSchema.safeParse(JSON.parse(await readFile(this.filePath, 'utf8'))).data } catch { return undefined } }
  public async save(state: SavedWindowState): Promise<void> { await mkdir(path.dirname(this.filePath), { recursive: true }); await writeFile(this.filePath, JSON.stringify(state), 'utf8') }
}
