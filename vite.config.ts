import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves project sites at https://<user>.github.io/<repo>/
const base = process.env.GITHUB_ACTIONS === 'true' ? '/cv-maker/' : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
