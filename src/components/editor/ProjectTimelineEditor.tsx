import type { ProjectTimeline } from '../../types/cv'
import { MONTH_OPTIONS } from '../../lib/projectTimeline'

interface ProjectTimelineEditorProps {
  timeline: ProjectTimeline
  onChange: (timeline: ProjectTimeline) => void
}

export function ProjectTimelineEditor({ timeline, onChange }: ProjectTimelineEditorProps) {
  const update = (patch: Partial<ProjectTimeline>) => onChange({ ...timeline, ...patch })

  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Timeline</p>
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <select
          value={timeline.startMonth}
          onChange={(e) => update({ startMonth: e.target.value })}
          className="border border-gray-300 dark:border-gray-600 rounded px-1.5 py-1 bg-white dark:bg-gray-800"
        >
          {MONTH_OPTIONS.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={timeline.startYear}
          onChange={(e) => update({ startYear: e.target.value.replace(/\D/g, '').slice(0, 4) })}
          placeholder="26"
          className="w-12 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-1 bg-white dark:bg-gray-800"
        />
        <span className="text-gray-500">to</span>
        <select
          value={timeline.endMonth}
          onChange={(e) => update({ endMonth: e.target.value })}
          disabled={timeline.isPresent}
          className="border border-gray-300 dark:border-gray-600 rounded px-1.5 py-1 bg-white dark:bg-gray-800 disabled:opacity-50"
        >
          {MONTH_OPTIONS.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={timeline.endYear}
          onChange={(e) => update({ endYear: e.target.value.replace(/\D/g, '').slice(0, 4) })}
          placeholder="27"
          disabled={timeline.isPresent}
          className="w-12 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-1 bg-white dark:bg-gray-800 disabled:opacity-50"
        />
        <label className="flex items-center gap-1 text-gray-600 dark:text-gray-400 ml-1">
          <input
            type="checkbox"
            checked={timeline.isPresent}
            onChange={(e) => update({ isPresent: e.target.checked })}
          />
          Present
        </label>
      </div>
      <p className="text-[11px] text-gray-500">Preview: (May,2026 - PRESENT) or (May,2026 - June,2027)</p>
    </div>
  )
}
