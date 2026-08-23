import type { Block } from '../../types/cv'
import { EducationTable } from './blocks/EducationTable'
import { IITCourseTable } from './blocks/IITCourseTable'
import { SectionPreview } from './blocks/SectionPreview'
import { ProjectPreview } from './blocks/ProjectPreview'
import { DividerPreview } from './blocks/DividerPreview'

interface BlockRendererProps {
  block: Block
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case 'education-table':
      return <EducationTable block={block} />
    case 'iit-course-table':
      return <IITCourseTable block={block} />
    case 'section':
      return <SectionPreview block={block} />
    case 'project':
      return <ProjectPreview block={block} />
    case 'divider':
      return <DividerPreview />
    case 'page-break':
      return null
    default:
      return null
  }
}
