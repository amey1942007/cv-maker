export type SocialType = 'email' | 'linkedin' | 'github' | 'website' | 'custom'

export interface SocialLink {
  id: string
  type: SocialType
  label?: string
  value: string
}

export interface EducationRow {
  id: string
  year: string
  degreeBoard: string
  institute: string
  gpaOrMarks: string
}

export interface IITCourseRow {
  id: string
  degree: string
  institute: string
  cgpa: string
  deptRank: string
}

export type BulletStyle = 'dot' | 'dash' | 'circle'

export interface EducationTableBlock {
  id: string
  type: 'education-table'
  title: string
  rows: EducationRow[]
}

export interface IITCourseTableBlock {
  id: string
  type: 'iit-course-table'
  title: string
  rows: IITCourseRow[]
}

export interface SectionBlock {
  id: string
  type: 'section'
  title: string
  bulletStyle: BulletStyle
  points: string[]
}

export interface ProjectBlock {
  id: string
  type: 'project'
  title: string
  subtitle?: string
  dateRange?: string
  points: string[]
  dividerAfter?: boolean
}

export interface DividerBlock {
  id: string
  type: 'divider'
}

export interface PageBreakBlock {
  id: string
  type: 'page-break'
}

export type Block =
  | EducationTableBlock
  | IITCourseTableBlock
  | SectionBlock
  | ProjectBlock
  | DividerBlock
  | PageBreakBlock

export interface CVPage {
  id: string
  blocks: Block[]
  disclaimer?: string
}

export interface CVDocument {
  name: string
  photoBase64?: string
  showIITLogo: boolean
  socials: SocialLink[]
  pages: CVPage[]
}

export function generateId(): string {
  return crypto.randomUUID()
}
