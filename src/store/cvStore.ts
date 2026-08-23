import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Block,
  BulletStyle,
  CVDocument,
  CVPage,
  EducationRow,
  IITCourseRow,
  SocialLink,
  SocialType,
} from '../types/cv'
import { generateId } from '../types/cv'
import { createDefaultCV } from '../lib/defaultTemplate'

interface CVStore {
  cv: CVDocument
  selectedBlockId: string | null
  setName: (name: string) => void
  setPhoto: (photoBase64: string | undefined) => void
  setShowIITLogo: (show: boolean) => void
  updateSocial: (id: string, value: string, label?: string) => void
  addSocial: (type: SocialType, label?: string) => void
  removeSocial: (id: string) => void
  setSelectedBlock: (id: string | null) => void
  addPage: () => void
  removePage: (pageId: string) => void
  addBlock: (pageId: string, block: Block, afterBlockId?: string) => void
  updateBlock: (pageId: string, blockId: string, updates: Partial<Block>) => void
  removeBlock: (pageId: string, blockId: string) => void
  moveBlock: (pageId: string, blockId: string, direction: 'up' | 'down') => void
  addSection: (pageId: string, title: string, bulletStyle: BulletStyle) => void
  addDivider: (pageId: string) => void
  addProject: (pageId: string) => void
  addEducationRow: (pageId: string, row: Omit<EducationRow, 'id'>) => void
  addIITCourseRow: (pageId: string, row: Omit<IITCourseRow, 'id'>) => void
  addPointToBlock: (pageId: string, blockId: string) => void
  updatePoint: (pageId: string, blockId: string, pointIndex: number, value: string) => void
  removePoint: (pageId: string, blockId: string, pointIndex: number) => void
  loadCV: (cv: CVDocument) => void
  resetCV: () => void
}

function findPageIndex(pages: CVPage[], pageId: string): number {
  return pages.findIndex((p) => p.id === pageId)
}

export const useCVStore = create<CVStore>()(
  persist(
    (set, get) => ({
      cv: createDefaultCV(),
      selectedBlockId: null,

      setName: (name) =>
        set((state) => ({ cv: { ...state.cv, name } })),

      setPhoto: (photoBase64) =>
        set((state) => ({ cv: { ...state.cv, photoBase64 } })),

      setShowIITLogo: (show) =>
        set((state) => ({ cv: { ...state.cv, showIITLogo: show } })),

      updateSocial: (id, value, label) =>
        set((state) => ({
          cv: {
            ...state.cv,
            socials: state.cv.socials.map((s) =>
              s.id === id ? { ...s, value, ...(label !== undefined ? { label } : {}) } : s
            ),
          },
        })),

      addSocial: (type, label) =>
        set((state) => ({
          cv: {
            ...state.cv,
            socials: [
              ...state.cv.socials,
              { id: generateId(), type, label, value: '' } as SocialLink,
            ],
          },
        })),

      removeSocial: (id) =>
        set((state) => ({
          cv: {
            ...state.cv,
            socials: state.cv.socials.filter((s) => s.id !== id),
          },
        })),

      setSelectedBlock: (id) => set({ selectedBlockId: id }),

      addPage: () =>
        set((state) => ({
          cv: {
            ...state.cv,
            pages: [
              ...state.cv.pages,
              {
                id: generateId(),
                blocks: [],
                disclaimer: 'Disclaimer: All the information on this page is entered by student.',
              },
            ],
          },
        })),

      removePage: (pageId) =>
        set((state) => ({
          cv: {
            ...state.cv,
            pages: state.cv.pages.filter((p) => p.id !== pageId),
          },
        })),

      addBlock: (pageId, block, afterBlockId) =>
        set((state) => {
          const pages = [...state.cv.pages]
          const pageIndex = findPageIndex(pages, pageId)
          if (pageIndex === -1) return state

          const blocks = [...pages[pageIndex].blocks]
          if (afterBlockId) {
            const idx = blocks.findIndex((b) => b.id === afterBlockId)
            blocks.splice(idx + 1, 0, block)
          } else {
            blocks.push(block)
          }
          pages[pageIndex] = { ...pages[pageIndex], blocks }
          return { cv: { ...state.cv, pages }, selectedBlockId: block.id }
        }),

      updateBlock: (pageId, blockId, updates) =>
        set((state) => {
          const pages = state.cv.pages.map((page) => {
            if (page.id !== pageId) return page
            return {
              ...page,
              blocks: page.blocks.map((block) =>
                block.id === blockId ? ({ ...block, ...updates } as Block) : block
              ),
            }
          })
          return { cv: { ...state.cv, pages } }
        }),

      removeBlock: (pageId, blockId) =>
        set((state) => ({
          cv: {
            ...state.cv,
            pages: state.cv.pages.map((page) =>
              page.id === pageId
                ? { ...page, blocks: page.blocks.filter((b) => b.id !== blockId) }
                : page
            ),
          },
          selectedBlockId: state.selectedBlockId === blockId ? null : state.selectedBlockId,
        })),

      moveBlock: (pageId, blockId, direction) =>
        set((state) => {
          const pages = [...state.cv.pages]
          const pageIndex = findPageIndex(pages, pageId)
          if (pageIndex === -1) return state

          const blocks = [...pages[pageIndex].blocks]
          const idx = blocks.findIndex((b) => b.id === blockId)
          if (idx === -1) return state

          const newIdx = direction === 'up' ? idx - 1 : idx + 1
          if (newIdx < 0 || newIdx >= blocks.length) return state

          ;[blocks[idx], blocks[newIdx]] = [blocks[newIdx], blocks[idx]]
          pages[pageIndex] = { ...pages[pageIndex], blocks }
          return { cv: { ...state.cv, pages } }
        }),

      addSection: (pageId, title, bulletStyle) => {
        const block: Block = {
          id: generateId(),
          type: 'section',
          title,
          bulletStyle,
          points: [''],
        }
        get().addBlock(pageId, block)
      },

      addDivider: (pageId) => {
        get().addBlock(pageId, { id: generateId(), type: 'divider' })
      },

      addProject: (pageId) => {
        get().addBlock(pageId, {
          id: generateId(),
          type: 'project',
          title: 'Project Title',
          subtitle: '',
          dateRange: '',
          points: [''],
          dividerAfter: true,
        })
      },

      addEducationRow: (pageId, row) =>
        set((state) => {
          const pages = state.cv.pages.map((page) => {
            if (page.id !== pageId) return page

            const existing = page.blocks.find((b) => b.type === 'education-table')
            if (existing && existing.type === 'education-table') {
              return {
                ...page,
                blocks: page.blocks.map((b) => {
                  if (b.id === existing.id && b.type === 'education-table') {
                    return {
                      ...b,
                      rows: [...b.rows, { ...row, id: generateId() }],
                    }
                  }
                  return b
                }),
              }
            }

            return {
              ...page,
              blocks: [
                ...page.blocks,
                {
                  id: generateId(),
                  type: 'education-table' as const,
                  title: 'ACADEMIC DETAILS',
                  rows: [{ ...row, id: generateId() }],
                },
              ],
            }
          })
          return { cv: { ...state.cv, pages } }
        }),

      addIITCourseRow: (pageId, row) =>
        set((state) => {
          const pages = state.cv.pages.map((page) => {
            if (page.id !== pageId) return page

            const existing = page.blocks.find((b) => b.type === 'iit-course-table')
            if (existing && existing.type === 'iit-course-table') {
              return {
                ...page,
                blocks: page.blocks.map((b) => {
                  if (b.id === existing.id && b.type === 'iit-course-table') {
                    return {
                      ...b,
                      rows: [...b.rows, { ...row, id: generateId() }],
                    }
                  }
                  return b
                }),
              }
            }

            return {
              ...page,
              blocks: [
                ...page.blocks,
                {
                  id: generateId(),
                  type: 'iit-course-table' as const,
                  title: 'IIT COURSE',
                  rows: [{ ...row, id: generateId() }],
                },
              ],
            }
          })
          return { cv: { ...state.cv, pages } }
        }),

      addPointToBlock: (pageId, blockId) =>
        set((state) => ({
          cv: {
            ...state.cv,
            pages: state.cv.pages.map((page) => {
              if (page.id !== pageId) return page
              return {
                ...page,
                blocks: page.blocks.map((block) => {
                  if (block.id !== blockId) return block
                  if (block.type === 'section' || block.type === 'project') {
                    return { ...block, points: [...block.points, ''] }
                  }
                  return block
                }),
              }
            }),
          },
        })),

      updatePoint: (pageId, blockId, pointIndex, value) =>
        set((state) => ({
          cv: {
            ...state.cv,
            pages: state.cv.pages.map((page) => {
              if (page.id !== pageId) return page
              return {
                ...page,
                blocks: page.blocks.map((block) => {
                  if (block.id !== blockId) return block
                  if (block.type === 'section' || block.type === 'project') {
                    const points = [...block.points]
                    points[pointIndex] = value
                    return { ...block, points }
                  }
                  return block
                }),
              }
            }),
          },
        })),

      removePoint: (pageId, blockId, pointIndex) =>
        set((state) => ({
          cv: {
            ...state.cv,
            pages: state.cv.pages.map((page) => {
              if (page.id !== pageId) return page
              return {
                ...page,
                blocks: page.blocks.map((block) => {
                  if (block.id !== blockId) return block
                  if (block.type === 'section' || block.type === 'project') {
                    return {
                      ...block,
                      points: block.points.filter((_, i) => i !== pointIndex),
                    }
                  }
                  return block
                }),
              }
            }),
          },
        })),

      loadCV: (cv) => set({ cv, selectedBlockId: null }),

      resetCV: () => set({ cv: createDefaultCV(), selectedBlockId: null }),
    }),
    {
      name: 'iit-cv-maker',
      partialize: (state) => ({ cv: state.cv }),
    }
  )
)
