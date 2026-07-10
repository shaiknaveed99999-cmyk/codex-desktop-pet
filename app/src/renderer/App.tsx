import { useEffect, useState } from 'react'
import type { WindowEngineState } from '../shared/contracts/windowEngine'
import './styles/app.css'

export function App(): JSX.Element {
  const [state, setState] = useState<WindowEngineState | null>(null)
  const [fps, setFps] = useState(0)
  useEffect(() => { void window.pets.getWindowState().then((result) => { if (result.ok) setState(result.data) }); return window.pets.onWindowStateChanged(setState) }, [])
  useEffect(() => { if (!state?.debugOverlay) return; let frames = 0; let started = performance.now(); let id = 0; const tick = (now: number) => { frames++; if (now - started >= 1000) { setFps(frames); frames = 0; started = now } id = requestAnimationFrame(tick) }; id = requestAnimationFrame(tick); return () => cancelAnimationFrame(id) }, [state?.debugOverlay])
  const action = (name: 'toggleAlwaysOnTop' | 'toggleClickThrough' | 'snapToEdge' | 'toggleDebugOverlay' | 'hide') => void window.pets.performWindowAction({ action: name }).then((result) => { if (result.ok) setState(result.data) })
  return <main className="window-shell"><header className="drag header"><strong>Pets</strong><span>Desktop window engine</span><div className="no-drag"><button onClick={() => action('hide')}>Hide</button></div></header><section className="content"><h1>Window controls</h1><p>Transparent, frameless, DPI-aware desktop surface.</p><div className="controls no-drag"><button onClick={() => action('toggleAlwaysOnTop')}>Always on top: {state?.alwaysOnTop ? 'On' : 'Off'}</button><button onClick={() => action('toggleClickThrough')}>Click-through: {state?.clickThrough ? 'On' : 'Off'}</button><button onClick={() => action('snapToEdge')}>Snap to edge</button><button onClick={() => action('toggleDebugOverlay')}>Debug overlay</button></div>{state?.debugOverlay ? <aside className="debug no-drag"><b>Debug</b><div>FPS: {fps}</div><div>Monitor: {state.display.id} · {state.display.scaleFactor}x DPI</div><div>{state.bounds.x}, {state.bounds.y} · {state.bounds.width}×{state.bounds.height}</div></aside> : null}</section><footer className="drag">Settings are local. Window bounds persist per user.</footer></main>
}
