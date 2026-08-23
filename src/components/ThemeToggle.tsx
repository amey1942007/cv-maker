import { Monitor, Moon, Sun } from 'lucide-react'
import { resolveTheme, useThemeStore } from '../store/themeStore'

export function ThemeToggle() {
  const { mode, setMode, toggleDark } = useThemeStore()
  const isDark = resolveTheme(mode) === 'dark'

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleDark}
        className="flex items-center gap-1.5 px-2 py-1.5 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <Sun size={14} /> : <Moon size={14} />}
        {isDark ? 'Light' : 'Dark'}
      </button>
      <button
        type="button"
        onClick={() => setMode('system')}
        className={`flex items-center gap-1 px-2 py-1.5 text-xs rounded border ${
          mode === 'system'
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
        title="Match browser theme"
      >
        <Monitor size={12} /> Auto
      </button>
    </div>
  )
}
