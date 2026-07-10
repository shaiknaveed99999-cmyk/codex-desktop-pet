import { useEffect, useState } from 'react'
import type { WindowEngineState } from '../shared/contracts/windowEngine'
import './styles/app.css'

export function App(): JSX.Element {
  const [state, setState] = useState<WindowEngineState | null>(null)
  const [fps, setFps] = useState(0)
  const [view, setView] = useState<'window' | 'settings'>('window')
  useEffect(() => { void window.pets.getWindowState().then((result) => { if (result.ok) setState(result.data) }); return window.pets.onWindowStateChanged(setState) }, [])
  useEffect(() => { if (!state?.debugOverlay) return; let frames = 0; let started = performance.now(); let id = 0; const tick = (now: number) => { frames++; if (now - started >= 1000) { setFps(frames); frames = 0; started = now } id = requestAnimationFrame(tick) }; id = requestAnimationFrame(tick); return () => cancelAnimationFrame(id) }, [state?.debugOverlay])
  const action = (name: 'toggleAlwaysOnTop' | 'toggleClickThrough' | 'snapToEdge' | 'toggleDebugOverlay' | 'hide') => void window.pets.performWindowAction({ action: name }).then((result) => { if (result.ok) setState(result.data) })
  return <main className="window-shell"><header className="drag header"><strong>Pets</strong><span>Desktop window engine</span><div className="no-drag"><button type="button" onClick={() => action('hide')}>Hide</button></div></header><nav className="tabs no-drag" aria-label="Primary navigation"><button type="button" aria-current={view === 'window' ? 'page' : undefined} onClick={() => setView('window')}>Window</button><button type="button" aria-current={view === 'settings' ? 'page' : undefined} onClick={() => setView('settings')}>Settings</button></nav>{view === 'window' ? <WindowPanel state={state} fps={fps} action={action} /> : <SettingsPanel state={state} action={action} /> }<footer className="drag">Settings are local. Window bounds persist per user.</footer></main>
}

type WindowAction = (name: 'toggleAlwaysOnTop' | 'toggleClickThrough' | 'snapToEdge' | 'toggleDebugOverlay' | 'hide') => void

function WindowPanel({ state, fps, action }: Readonly<{ state: WindowEngineState | null; fps: number; action: WindowAction }>): JSX.Element {
  return <section className="content"><h1>Window controls</h1><p>Transparent, frameless, DPI-aware desktop surface.</p><WindowControls state={state} action={action} />{state?.debugOverlay ? <aside className="debug no-drag"><b>Debug</b><div>FPS: {fps}</div><div>Monitor: {state.display.id} · {state.display.scaleFactor}x DPI</div><div>{state.bounds.x}, {state.bounds.y} · {state.bounds.width}×{state.bounds.height}</div></aside> : null}</section>
}

function SettingsPanel({ state, action }: Readonly<{ state: WindowEngineState | null; action: WindowAction }>): JSX.Element {
  return <section className="content"><h1>Settings</h1><p>Configure the desktop surface. Changes apply immediately and window bounds are saved locally.</p><WindowControls state={state} action={action} /></section>
}

function WindowControls({ state, action }: Readonly<{ state: WindowEngineState | null; action: WindowAction }>): JSX.Element {
  return <div className="controls no-drag"><button type="button" onClick={() => action('toggleAlwaysOnTop')}>Always on top: {state?.alwaysOnTop ? 'On' : 'Off'}</button><button type="button" onClick={() => action('toggleClickThrough')}>Click-through: {state?.clickThrough ? 'On' : 'Off'}</button><button type="button" onClick={() => action('snapToEdge')}>Snap to edge</button><button type="button" onClick={() => action('toggleDebugOverlay')}>Debug overlay: {state?.debugOverlay ? 'On' : 'Off'}</button></div>
}
