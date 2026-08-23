import { useState } from 'react'

interface SectionNameModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (title: string) => void
}

export function SectionNameModal({ open, onClose, onConfirm }: SectionNameModalProps) {
  const [title, setTitle] = useState('')

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onConfirm(title.trim().toUpperCase())
    setTitle('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add New Section</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. SCHOLASTIC ACHIEVEMENTS"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              autoFocus
            />
          </div>
          <div className="flex gap-2 justify-end">
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
              Add Section
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
