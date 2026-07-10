import type { BrowserWindow, Screen } from 'electron'
import type { WindowEngineState } from '../../shared/contracts/windowEngine'
import { snapBoundsToWorkArea } from './snap'
import { normalizeWindowBounds } from './windowStateStore'
import type { WindowStateStore } from './windowStateStore'

export class WindowEngine {
  private window: BrowserWindow | undefined
  private clickThrough = false
  private debugOverlay = false
  private persistTimer: ReturnType<typeof setTimeout> | undefined
  public constructor(private readonly screen: Screen, private readonly store: WindowStateStore, private readonly onChange: (state: WindowEngineState) => void) {}
  public async attach(window: BrowserWindow): Promise<void> { this.window = window; const saved = await this.store.load(); if (saved) window.setBounds(normalizeWindowBounds(saved.bounds, this.workArea())); window.on('move', () => { this.snap(); this.schedulePersist() }); window.on('resize', () => this.schedulePersist()); this.screen.on('display-added', () => this.ensureVisible()); this.screen.on('display-removed', () => this.ensureVisible()); this.publish() }
  public state(): WindowEngineState { const window = this.requireWindow(); const bounds = window.getBounds(); const display = this.screen.getDisplayMatching(bounds); return { bounds, alwaysOnTop: window.isAlwaysOnTop(), clickThrough: this.clickThrough, debugOverlay: this.debugOverlay, display: { id: display.id, scaleFactor: display.scaleFactor, workArea: display.workArea } } }
  public toggleAlwaysOnTop(): WindowEngineState { const window = this.requireWindow(); window.setAlwaysOnTop(!window.isAlwaysOnTop(), 'floating'); return this.publish() }
  public toggleClickThrough(): WindowEngineState { const window = this.requireWindow(); this.clickThrough = !this.clickThrough; window.setIgnoreMouseEvents(this.clickThrough, { forward: true }); return this.publish() }
  public toggleDebugOverlay(enabled?: boolean): WindowEngineState { this.debugOverlay = enabled ?? !this.debugOverlay; return this.publish() }
  public snap(): WindowEngineState { const window = this.requireWindow(); window.setBounds(snapBoundsToWorkArea(window.getBounds(), this.workArea())); return this.publish() }
  public hide(): WindowEngineState { this.requireWindow().hide(); return this.state() }
  public show(): void { const window = this.requireWindow(); window.show(); window.focus(); this.publish() }
  private workArea() { return this.screen.getDisplayMatching(this.requireWindow().getBounds()).workArea }
  private ensureVisible(): void { const window = this.requireWindow(); window.setBounds(normalizeWindowBounds(window.getBounds(), this.workArea())); this.publish() }
  private schedulePersist(): void { clearTimeout(this.persistTimer); this.persistTimer = setTimeout(() => { void this.store.save({ bounds: this.requireWindow().getBounds() }).catch(() => undefined) }, 250) }
  private publish(): WindowEngineState { const state = this.state(); this.onChange(state); return state }
  private requireWindow(): BrowserWindow { if (!this.window) throw new Error('Window engine is not attached.') ; return this.window }
}
