import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyTheme, initTheme, useThemeStore } from './store/themeStore'

initTheme()

useThemeStore.persist.onFinishHydration(() => {
  applyTheme(useThemeStore.getState().mode)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
