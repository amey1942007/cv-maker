import { useRef, useState } from 'react'
import { Download, FileJson, Upload, RotateCcw } from 'lucide-react'
import { EditorPanel } from './components/editor/EditorPanel'
import { CVPreview } from './components/preview/CVPreview'
import { AppDisclaimer } from './components/AppDisclaimer'
import { ThemeToggle } from './components/ThemeToggle'
import { useCVStore } from './store/cvStore'
import { exportToPDF } from './lib/export/pdf'
import { exportToDOCX } from './lib/export/docx'
import { exportToTeX, exportToJSON, importFromJSON } from './lib/export/tex'

export default function App() {
  const previewRef = useRef<HTMLDivElement>(null)
  const cv = useCVStore((s) => s.cv)
  const loadCV = useCVStore((s) => s.loadCV)
  const resetCV = useCVStore((s) => s.resetCV)
  const [exporting, setExporting] = useState(false)

  const filename = cv.name.replace(/\s+/g, '_').toLowerCase() || 'cv'

  const handleExportPDF = async () => {
    const container = previewRef.current?.querySelector('.cv-document') as HTMLElement | null
    if (!container) return
    setExporting(true)
    try {
      await exportToPDF(container, filename)
    } catch (error) {
      console.error('PDF export failed:', error)
      alert('PDF export failed. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const data = await importFromJSON(file)
      loadCV(data)
    } catch {
      alert('Failed to load JSON file.')
    }
    e.target.value = ''
  }

  const btnClass =
    'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50'

  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-950">
      <header className="z-40 shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white">CV Maker</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Professional CV editor with live preview</p>
          </div>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <button
            type="button"
            onClick={handleExportPDF}
            disabled={exporting}
            className={`${btnClass} bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900`}
          >
            <Download size={14} /> Export PDF
          </button>
          <button type="button" onClick={() => exportToTeX(cv, filename)} className={btnClass}>
            <Download size={14} /> Export TeX
          </button>
          <button type="button" onClick={() => exportToDOCX(cv, filename)} className={btnClass}>
            <Download size={14} /> Export DOCX
          </button>
          <button type="button" onClick={() => exportToJSON(cv, filename)} className={btnClass}>
            <FileJson size={14} /> Save JSON
          </button>
          <label className={`${btnClass} cursor-pointer`}>
            <Upload size={14} /> Load JSON
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset CV to default template?')) resetCV()
            }}
            className={`${btnClass} text-gray-600 dark:text-gray-300`}
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 h-0 overflow-hidden">
        <div className="w-[420px] min-w-[360px] h-full min-h-0 shrink-0 border-r border-gray-200 dark:border-gray-700 overflow-hidden">
          <EditorPanel />
        </div>
        <div
          className="flex-1 h-full min-h-0 overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-gray-950"
          ref={previewRef}
        >
          <CVPreview />
        </div>
      </div>

      <AppDisclaimer />
    </div>
  )
}
