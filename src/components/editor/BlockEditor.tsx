import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
} from 'lucide-react'
import { useCVStore } from '../../store/cvStore'
import type { Block } from '../../types/cv'
import { createDefaultTimeline } from '../../lib/projectTimeline'
import { ProjectTimelineEditor } from './ProjectTimelineEditor'

interface BlockEditorProps {
  pageId: string
  block: Block
  index: number
  total: number
}

export function BlockEditor({ pageId, block, index, total }: BlockEditorProps) {
  const {
    selectedBlockId,
    setSelectedBlock,
    updateBlock,
    removeBlock,
    moveBlock,
    addPointToBlock,
    updatePoint,
    removePoint,
  } = useCVStore()

  const isSelected = selectedBlockId === block.id

  const renderContent = () => {
    switch (block.type) {
      case 'education-table':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.title}
              onChange={(e) => updateBlock(pageId, block.id, { title: e.target.value })}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm font-semibold uppercase"
            />
            {block.rows.map((row) => (
              <div key={row.id} className="grid grid-cols-4 gap-1 text-xs bg-gray-50 p-2 rounded">
                <input
                  value={row.year}
                  onChange={(e) =>
                    updateBlock(pageId, block.id, {
                      rows: block.rows.map((r) =>
                        r.id === row.id ? { ...r, year: e.target.value } : r
                      ),
                    })
                  }
                  placeholder="Year"
                  className="border rounded px-1 py-0.5"
                />
                <input
                  value={row.degreeBoard}
                  onChange={(e) =>
                    updateBlock(pageId, block.id, {
                      rows: block.rows.map((r) =>
                        r.id === row.id ? { ...r, degreeBoard: e.target.value } : r
                      ),
                    })
                  }
                  placeholder="Degree/Board"
                  className="border rounded px-1 py-0.5"
                />
                <textarea
                  value={row.institute}
                  onChange={(e) =>
                    updateBlock(pageId, block.id, {
                      rows: block.rows.map((r) =>
                        r.id === row.id ? { ...r, institute: e.target.value } : r
                      ),
                    })
                  }
                  placeholder="Institute"
                  className="border rounded px-1 py-0.5"
                  rows={2}
                />
                <div className="flex gap-1">
                  <input
                    value={row.gpaOrMarks}
                    onChange={(e) =>
                      updateBlock(pageId, block.id, {
                        rows: block.rows.map((r) =>
                          r.id === row.id ? { ...r, gpaOrMarks: e.target.value } : r
                        ),
                      })
                    }
                    placeholder="GPA/%"
                    className="border rounded px-1 py-0.5 flex-1"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateBlock(pageId, block.id, {
                        rows: block.rows.filter((r) => r.id !== row.id),
                      })
                    }
                    className="text-red-500 p-0.5"
                    title="Remove education row"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )

      case 'iit-course-table':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.title}
              onChange={(e) => updateBlock(pageId, block.id, { title: e.target.value })}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm font-semibold uppercase"
            />
            {block.rows.map((row) => (
              <div key={row.id} className="grid grid-cols-4 gap-1 text-xs bg-gray-50 p-2 rounded">
                <input
                  value={row.degree}
                  onChange={(e) =>
                    updateBlock(pageId, block.id, {
                      rows: block.rows.map((r) =>
                        r.id === row.id ? { ...r, degree: e.target.value } : r
                      ),
                    })
                  }
                  className="border rounded px-1 py-0.5"
                />
                <input
                  value={row.institute}
                  onChange={(e) =>
                    updateBlock(pageId, block.id, {
                      rows: block.rows.map((r) =>
                        r.id === row.id ? { ...r, institute: e.target.value } : r
                      ),
                    })
                  }
                  className="border rounded px-1 py-0.5"
                />
                <input
                  value={row.cgpa}
                  onChange={(e) =>
                    updateBlock(pageId, block.id, {
                      rows: block.rows.map((r) =>
                        r.id === row.id ? { ...r, cgpa: e.target.value } : r
                      ),
                    })
                  }
                  className="border rounded px-1 py-0.5"
                />
                <div className="flex gap-1">
                  <input
                    value={row.deptRank}
                    onChange={(e) =>
                      updateBlock(pageId, block.id, {
                        rows: block.rows.map((r) =>
                          r.id === row.id ? { ...r, deptRank: e.target.value } : r
                        ),
                      })
                    }
                    className="border rounded px-1 py-0.5 flex-1"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateBlock(pageId, block.id, {
                        rows: block.rows.filter((r) => r.id !== row.id),
                      })
                    }
                    className="text-red-500 p-0.5"
                    title="Remove education row"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )

      case 'section':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.title}
              onChange={(e) => updateBlock(pageId, block.id, { title: e.target.value })}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm font-semibold uppercase"
            />
            <p className="text-xs text-gray-500">Use *bold* and _underline_ in points</p>
            {block.points.map((point, i) => (
              <div key={i} className="flex gap-1">
                <textarea
                  value={point}
                  onChange={(e) => updatePoint(pageId, block.id, i, e.target.value)}
                  className="flex-1 border rounded px-2 py-1 text-xs"
                  rows={2}
                  placeholder="Start with - or • yourself. Use *bold* and _underline_"
                />
                <button
                  type="button"
                  onClick={() => removePoint(pageId, block.id, i)}
                  className="text-red-500 p-1"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => addPointToBlock(pageId, block.id)}
                className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
              >
                <Plus size={12} /> Add point
              </button>
              {block.points.length > 0 && (
                <button
                  type="button"
                  onClick={() => removePoint(pageId, block.id, block.points.length - 1)}
                  className="flex items-center gap-1 text-xs text-red-600 hover:underline"
                >
                  <Trash2 size={12} /> Remove point
                </button>
              )}
            </div>
          </div>
        )

      case 'project':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.title}
              onChange={(e) => updateBlock(pageId, block.id, { title: e.target.value })}
              placeholder="Project / internship title"
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm font-semibold"
            />
            <input
              type="text"
              value={block.subtitle ?? ''}
              onChange={(e) => updateBlock(pageId, block.id, { subtitle: e.target.value })}
              placeholder="Optional subtitle (e.g. company). Put mentor name in bullet points."
              className="w-full border rounded px-2 py-1 text-xs"
            />
            <ProjectTimelineEditor
              timeline={block.timeline ?? createDefaultTimeline(true)}
              onChange={(timeline) => updateBlock(pageId, block.id, { timeline })}
            />
            {block.points.map((point, i) => (
              <div key={i} className="flex gap-1">
                <textarea
                  value={point}
                  onChange={(e) => updatePoint(pageId, block.id, i, e.target.value)}
                  className="flex-1 border rounded px-2 py-1 text-xs"
                  rows={2}
                  placeholder="Start with - or • yourself. Use *bold* and _underline_"
                />
                <button
                  type="button"
                  onClick={() => removePoint(pageId, block.id, i)}
                  className="text-red-500 p-1"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => addPointToBlock(pageId, block.id)}
                className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
              >
                <Plus size={12} /> Add point
              </button>
              {block.points.length > 0 && (
                <button
                  type="button"
                  onClick={() => removePoint(pageId, block.id, block.points.length - 1)}
                  className="flex items-center gap-1 text-xs text-red-600 hover:underline"
                >
                  <Trash2 size={12} /> Remove point
                </button>
              )}
              <label className="flex items-center gap-1 text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={block.dividerAfter ?? false}
                  onChange={(e) =>
                    updateBlock(pageId, block.id, { dividerAfter: e.target.checked })
                  }
                />
                Divider after
              </label>
            </div>
          </div>
        )

      case 'divider':
        return (
          <div className="py-2 text-center text-xs text-gray-500 border-y border-dashed border-gray-300">
            — Divider (black line) —
          </div>
        )

      default:
        return null
    }
  }

  const blockLabel =
    block.type === 'education-table'
      ? 'Education Table'
      : block.type === 'iit-course-table'
        ? 'IIT Course Table'
        : block.type === 'section'
          ? `Section: ${block.title}`
          : block.type === 'project'
            ? `Project: ${block.title}`
            : block.type === 'divider'
              ? 'Divider'
              : 'Block'

  return (
    <div
      className={`border rounded-lg mb-2 transition-colors ${
        isSelected
          ? 'border-blue-400 dark:border-blue-500 bg-blue-50/30 dark:bg-blue-950/30'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
      }`}
      onClick={() => setSelectedBlock(block.id)}
    >
      <div className="flex items-center gap-1 px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
        <GripVertical size={14} className="text-gray-400" />
        <span className="text-xs font-medium text-gray-700 dark:text-gray-200 flex-1 truncate">{blockLabel}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            moveBlock(pageId, block.id, 'up')
          }}
          disabled={index === 0}
          className="p-0.5 text-gray-500 hover:text-gray-800 disabled:opacity-30"
        >
          <ChevronUp size={14} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            moveBlock(pageId, block.id, 'down')
          }}
          disabled={index === total - 1}
          className="p-0.5 text-gray-500 hover:text-gray-800 disabled:opacity-30"
        >
          <ChevronDown size={14} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            removeBlock(pageId, block.id)
          }}
          className="p-0.5 text-red-500 hover:text-red-700"
          title="Remove block"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div className="p-3">{renderContent()}</div>
    </div>
  )
}
