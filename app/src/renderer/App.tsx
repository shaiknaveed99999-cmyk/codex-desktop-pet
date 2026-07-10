import { useEffect, useState } from 'react'
import type { AppInfo } from '../shared/contracts/appInfo'
import './styles/app.css'

type Route = 'home' | 'settings'

export function App(): JSX.Element {
  const [route, setRoute] = useState<Route>('home')
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null)

  useEffect(() => {
    void window.pets.getAppInfo().then(setAppInfo)
  }, [])

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Pets desktop companion</p>
          <h1>Foundation ready</h1>
        </div>
        <span className="status" aria-label="Application status: ready">Ready</span>
      </header>
      <nav className="navigation" aria-label="Primary navigation">
        <button type="button" aria-current={route === 'home' ? 'page' : undefined} onClick={() => setRoute('home')}>Home</button>
        <button type="button" aria-current={route === 'settings' ? 'page' : undefined} onClick={() => setRoute('settings')}>Settings</button>
      </nav>
      {route === 'home' ? <Home appInfo={appInfo} /> : <Settings />}
    </main>
  )
}

function Home({ appInfo }: Readonly<{ appInfo: AppInfo | null }>): JSX.Element {
  return (
    <section className="panel" aria-labelledby="home-title">
      <h2 id="home-title">Welcome to Pets</h2>
      <p>The secure application foundation is active. Companion, AI, voice, plugin, and integration features are intentionally deferred.</p>
      <dl className="details">
        <div><dt>Application version</dt><dd>{appInfo?.version ?? 'Loading…'}</dd></div>
        <div><dt>Runtime</dt><dd>{appInfo?.isPackaged ? 'Packaged' : 'Development'}</dd></div>
      </dl>
    </section>
  )
}

function Settings(): JSX.Element {
  return (
    <section className="panel" aria-labelledby="settings-title">
      <h2 id="settings-title">Settings</h2>
      <p>Settings controls will be introduced with the features they govern. No personal data or cloud connection is configured in this foundation release.</p>
    </section>
  )
}
