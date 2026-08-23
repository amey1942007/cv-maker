import {
  FilePlus,
  GraduationCap,
  Minus,
  FolderPlus,
  ListPlus,
  ListMinus,
  FileText,
  Trash2,
} from 'lucide-react'

interface ToolbarProps {
  onAddSection: () => void
  onAddEducation: () => void
  onAddIITCourse: () => void
  onAddProject: () => void
  onAddDivider: () => void
  onAddPage: () => void
  onAddPoint: () => void
  onRemovePoint: () => void
  onRemoveBlock: () => void
  canRemovePoint: boolean
  canRemoveBlock: boolean
}

export function Toolbar({
  onAddSection,
  onAddEducation,
  onAddIITCourse,
  onAddProject,
  onAddDivider,
  onAddPage,
  onAddPoint,
  onRemovePoint,
  onRemoveBlock,
  canRemovePoint,
  canRemoveBlock,
}: ToolbarProps) {
  const btnClass =
    'flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed'
  const removeClass =
    'flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white border border-red-200 text-red-600 rounded hover:bg-red-50 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed'

  return (
    <div className="flex flex-wrap gap-1.5 p-3 bg-gray-50 border-b border-gray-200">
      <button type="button" onClick={onAddSection} className={btnClass}>
        <FilePlus size={14} /> Add Section
      </button>
      <button type="button" onClick={onAddEducation} className={btnClass}>
        <GraduationCap size={14} /> Add Education
      </button>
      <button type="button" onClick={onAddIITCourse} className={btnClass}>
        <GraduationCap size={14} /> Add IIT Course
      </button>
      <button type="button" onClick={onAddProject} className={btnClass}>
        <FolderPlus size={14} /> Add Project
      </button>
      <button type="button" onClick={onAddPoint} className={btnClass}>
        <ListPlus size={14} /> Add Point
      </button>
      <button
        type="button"
        onClick={onRemovePoint}
        disabled={!canRemovePoint}
        className={removeClass}
        title="Remove last point from selected section/project"
      >
        <ListMinus size={14} /> Remove Point
      </button>
      <button type="button" onClick={onAddDivider} className={btnClass}>
        <Minus size={14} /> Add Divider
      </button>
      <button type="button" onClick={onAddPage} className={btnClass}>
        <FileText size={14} /> Add Page
      </button>
      <button
        type="button"
        onClick={onRemoveBlock}
        disabled={!canRemoveBlock}
        className={removeClass}
        title="Remove selected block (or last block on page)"
      >
        <Trash2 size={14} /> Remove Block
      </button>
    </div>
  )
}
