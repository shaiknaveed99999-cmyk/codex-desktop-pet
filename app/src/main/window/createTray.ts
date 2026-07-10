import { Menu, nativeImage, Tray } from 'electron'
import type { WindowEngine } from './windowEngine'

const icon = nativeImage.createFromDataURL(`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="14" fill="#5ea9ff"/><circle cx="11" cy="13" r="2"/><circle cx="21" cy="13" r="2"/><path d="M10 21c4 3 8 3 12 0" stroke="white" stroke-width="2" fill="none"/></svg>')}`)
export function createTray(engine: WindowEngine, quit: () => void): Tray { const tray = new Tray(icon); const menu = () => Menu.buildFromTemplate([{ label: 'Show Pets', click: () => engine.show() }, { label: 'Toggle click-through', click: () => engine.toggleClickThrough() }, { type: 'separator' }, { label: 'Exit', click: quit }]); tray.setToolTip('Pets'); tray.on('click', () => engine.show()); tray.on('right-click', () => tray.popUpContextMenu(menu())); return tray }
