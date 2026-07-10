import path from 'node:path'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: { entry: 'src/main/index.ts' },
      preload: { input: path.join(__dirname, 'src/preload/index.ts') },
      renderer: process.env.NODE_ENV === 'test' ? undefined : {},
    }),
  ],
})
