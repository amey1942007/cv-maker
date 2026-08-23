import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useCVStore } from '../../store/cvStore'
import { HeaderFields } from './HeaderFields'
import { Toolbar } from './Toolbar'
import { BlockEditor } from './BlockEditor'
import { SectionNameModal } from './SectionNameModal'
import { EducationForm } from './EducationForm'
import { IITCourseForm } from './IITCourseForm'

export function EditorPanel() {
  const {
    cv,
    selectedBlockId,
    addPage,
    removePage,
    removeBlock,
    removePoint,
    addSection,
    addDivider,
    addProject,
    addPointToBlock,
  } = useCVStore()

  const [activePageId, setActivePageId] = useState(cv.pages[0]?.id ?? '')
  const [showSectionModal, setShowSectionModal] = useState(false)
  const [showEducationForm, setShowEducationForm] = useState(false)
  const [showIITCourseForm, setShowIITCourseForm] = useState(false)

  const activePage = cv.pages.find((p) => p.id === activePageId) ?? cv.pages[0]
  const pageId = activePage?.id ?? cv.pages[0]?.id

  const selectedBlock = activePage?.blocks.find((b) => b.id === selectedBlockId)

  const canRemovePoint =
    !!selectedBlock &&
    (selectedBlock.type === 'section' || selectedBlock.type === 'project') &&
    selectedBlock.points.length > 0

  const canRemoveBlock = (activePage?.blocks.length ?? 0) > 0

  const handleAddPoint = () => {
    if (selectedBlockId && pageId) {
      const block = activePage?.blocks.find((b) => b.id === selectedBlockId)
      if (block && (block.type === 'section' || block.type === 'project')) {
        addPointToBlock(pageId, selectedBlockId)
        return
      }
    }
    const lastSection = [...(activePage?.blocks ?? [])]
      .reverse()
      .find((b) => b.type === 'section' || b.type === 'project')
    if (lastSection && pageId) {
      addPointToBlock(pageId, lastSection.id)
    }
  }

  const handleRemovePoint = () => {
    if (!pageId || !canRemovePoint || !selectedBlock) return
    if (selectedBlock.type === 'section' || selectedBlock.type === 'project') {
      removePoint(pageId, selectedBlock.id, selectedBlock.points.length - 1)
    }
  }

  const handleRemoveBlock = () => {
    if (!pageId || !canRemoveBlock) return
    const blockToRemove =
      selectedBlockId ?? activePage?.blocks[activePage.blocks.length - 1]?.id
    if (blockToRemove) {
      removeBlock(pageId, blockToRemove)
    }
  }

  const handleRemovePage = () => {
    if (!pageId || cv.pages.length <= 1) return
    const pageIndex = cv.pages.findIndex((p) => p.id === pageId)
    removePage(pageId)
    const remaining = cv.pages.filter((p) => p.id !== pageId)
    const nextPage = remaining[Math.max(0, pageIndex - 1)]
    if (nextPage) setActivePageId(nextPage.id)
  }

  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-950 overflow-hidden">
      <HeaderFields />

      <div className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 overflow-x-auto shrink-0">
        {cv.pages.map((page, i) => (
          <button
            key={page.id}
            type="button"
            onClick={() => setActivePageId(page.id)}
            className={`px-3 py-1 text-xs rounded ${
              pageId === page.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Page {i + 1}
          </button>
        ))}
        {cv.pages.length > 1 && pageId && (
          <button
            type="button"
            onClick={handleRemovePage}
            className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded ml-1"
            title="Remove current page"
          >
            <Trash2 size={12} /> Remove Page
          </button>
        )}
      </div>

      <Toolbar
        onAddSection={() => setShowSectionModal(true)}
        onAddEducation={() => setShowEducationForm(true)}
        onAddIITCourse={() => setShowIITCourseForm(true)}
        onAddProject={() => pageId && addProject(pageId)}
        onAddDivider={() => pageId && addDivider(pageId)}
        onAddPage={() => {
          addPage()
          const newPage = useCVStore.getState().cv.pages.at(-1)
          if (newPage) setActivePageId(newPage.id)
        }}
        onAddPoint={handleAddPoint}
        onRemovePoint={handleRemovePoint}
        onRemoveBlock={handleRemoveBlock}
        canRemovePoint={canRemovePoint}
        canRemoveBlock={canRemoveBlock}
      />

      <div className="flex-1 overflow-y-auto p-3 min-h-0">
        {activePage?.blocks.map((block, index) => (
          <BlockEditor
            key={block.id}
            pageId={pageId}
            block={block}
            index={index}
            total={activePage.blocks.length}
          />
        ))}
        {activePage?.blocks.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
            No blocks on this page. Use the toolbar to add sections, education, projects, etc.
          </p>
        )}
      </div>

      <SectionNameModal
        open={showSectionModal}
        onClose={() => setShowSectionModal(false)}
        onConfirm={(title) => {
          if (pageId) addSection(pageId, title, 'dash')
        }}
      />

      {showEducationForm && pageId && (
        <EducationForm pageId={pageId} onClose={() => setShowEducationForm(false)} />
      )}

      {showIITCourseForm && pageId && (
        <IITCourseForm pageId={pageId} onClose={() => setShowIITCourseForm(false)} />
      )}
    </div>
  )
}
