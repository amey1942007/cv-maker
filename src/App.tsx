import { useRef, useState } from 'react'
import { Download, FileJson, Upload, RotateCcw } from 'lucide-react'
import { EditorPanel } from './components/editor/EditorPanel'
import { CVPreview } from './components/preview/CVPreview'
import { useCVStore } from './store/cvStore'
import { exportToPDF } from './lib/export/pdf'
import { exportToDOCX } from './lib/export/docx'
import { exportToTeX, exportToJSON, importFromJSON } from './lib/export/tex'

function ExportBar() {
  const previewRef = useRef<HTMLDivElement>(null)
  const cv = useCVStore((s) => s.cv)
  const loadCV = useCVStore((s) => s.loadCV)
  const resetCV = useCVStore((s) => s.resetCV)
  const [exporting, setExporting] = useState(false)

  const filename = cv.name.replace(/\s+/g, '_').toLowerCase() || 'cv'

  const handleExportPDF = async () => {
    const container = previewRef.current?.querySelector('.cv-document') as HTMLElement
    if (!container) return
    setExporting(true)
    try {
      await exportToPDF(container, filename)
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
    'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border hover:bg-gray-50 disabled:opacity-50'

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-sm font-bold text-gray-900">IIT Delhi CV Maker</h1>
          <p className="text-xs text-gray-500">Professional CV editor with live preview</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <button
            type="button"
            onClick={handleExportPDF}
            disabled={exporting}
            className={`${btnClass} bg-red-50 border-red-200 text-red-700 hover:bg-red-100`}
          >
            <Download size={14} /> Export PDF
          </button>
          <button
            type="button"
            onClick={() => exportToTeX(cv, filename)}
            className={`${btnClass} border-gray-300`}
          >
            <Download size={14} /> Export TeX
          </button>
          <button
            type="button"
            onClick={() => exportToDOCX(cv, filename)}
            className={`${btnClass} border-gray-300`}
          >
            <Download size={14} /> Export DOCX
          </button>
          <button
            type="button"
            onClick={() => exportToJSON(cv, filename)}
            className={`${btnClass} border-gray-300`}
          >
            <FileJson size={14} /> Save JSON
          </button>
          <label className={`${btnClass} border-gray-300 cursor-pointer`}>
            <Upload size={14} /> Load JSON
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset CV to default template?')) resetCV()
            }}
            className={`${btnClass} border-gray-300 text-gray-600`}
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[420px] min-w-[360px] border-r border-gray-200 overflow-hidden shrink-0">
          <EditorPanel />
        </div>
        <div className="flex-1 overflow-hidden" ref={previewRef}>
          <CVPreview />
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ExportBar />
    </div>
  )
}
