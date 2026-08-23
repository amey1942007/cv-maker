import { useState } from 'react'
import { useCVStore } from '../../store/cvStore'

interface IITCourseFormProps {
  pageId: string
  onClose: () => void
}

export function IITCourseForm({ pageId, onClose }: IITCourseFormProps) {
  const addIITCourseRow = useCVStore((s) => s.addIITCourseRow)
  const [degree, setDegree] = useState('')
  const [institute, setInstitute] = useState('Indian Institute of Technology Delhi')
  const [cgpa, setCgpa] = useState('')
  const [deptRank, setDeptRank] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!degree.trim() || !institute.trim() || !cgpa.trim()) return

    addIITCourseRow(pageId, {
      degree: degree.trim(),
      institute: institute.trim(),
      cgpa: cgpa.trim(),
      deptRank: deptRank.trim(),
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-4">Add IIT Course Row</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Institute</label>
            <input
              type="text"
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
              <input
                type="text"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dept. Rank</label>
              <input
                type="text"
                value={deptRank}
                onChange={(e) => setDeptRank(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
              Add Row
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
