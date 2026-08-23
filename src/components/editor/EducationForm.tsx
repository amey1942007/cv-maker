import { useState } from 'react'
import { useCVStore } from '../../store/cvStore'

interface EducationFormProps {
  pageId: string
  onClose: () => void
}

export function EducationForm({ pageId, onClose }: EducationFormProps) {
  const addEducationRow = useCVStore((s) => s.addEducationRow)
  const [year, setYear] = useState('')
  const [degreeBoard, setDegreeBoard] = useState('')
  const [institute, setInstitute] = useState('')
  const [gpaOrMarks, setGpaOrMarks] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!degreeBoard.trim() || !institute.trim() || !gpaOrMarks.trim()) return

    addEducationRow(pageId, {
      year: year.trim() || '---',
      degreeBoard: degreeBoard.trim(),
      institute: institute.trim(),
      gpaOrMarks: gpaOrMarks.trim(),
    })

    setYear('')
    setDegreeBoard('')
    setInstitute('')
    setGpaOrMarks('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add Education Row</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Year (leave blank or use --- for current degree)
            </label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2025 or ---"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Degree / Board
            </label>
            <input
              type="text"
              value={degreeBoard}
              onChange={(e) => setDegreeBoard(e.target.value)}
              placeholder="B.Tech in ... or CBSE"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Institute / School Name
            </label>
            <textarea
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
              placeholder="School name (use new line for city)"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 text-sm"
              rows={2}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              GPA / Marks (%)
            </label>
            <input
              type="text"
              value={gpaOrMarks}
              onChange={(e) => setGpaOrMarks(e.target.value)}
              placeholder="9.06 or 95"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 text-sm"
              required
            />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Row
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
