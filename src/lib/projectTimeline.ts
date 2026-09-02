import type { ProjectBlock, ProjectTimeline } from '../types/cv'

export const MONTH_OPTIONS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

export function createDefaultTimeline(present = true): ProjectTimeline {
  return {
    startMonth: 'Jan',
    startYear: '26',
    endMonth: 'Jun',
    endYear: '27',
    isPresent: present,
  }
}

function formatYear(year: string): string {
  const digits = year.replace(/\D/g, '')
  if (!digits) return ''
  return digits.slice(-2).padStart(2, '0')
}

export function formatProjectTimeline(timeline: ProjectTimeline): string | null {
  const startYear = formatYear(timeline.startYear)
  if (!timeline.startMonth || !startYear) return null

  const start = `${timeline.startMonth},${startYear}`
  if (timeline.isPresent) return `${start}-Present`

  const endYear = formatYear(timeline.endYear)
  if (timeline.endMonth && endYear) {
    return `${start}-${timeline.endMonth},${endYear}`
  }

  return start
}

export function getProjectDateDisplay(block: ProjectBlock): string | null {
  if (block.timeline) {
    const formatted = formatProjectTimeline(block.timeline)
    if (formatted) return formatted
  }

  const legacy = block.dateRange?.trim()
  return legacy || null
}
