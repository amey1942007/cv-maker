import type { ProjectBlock } from '../../../types/cv'
import { FormattedText } from '../../../lib/formatCvText'
import { CvDivider } from './CvDivider'

interface ProjectPreviewProps {
  block: ProjectBlock
}

export function ProjectPreview({ block }: ProjectPreviewProps) {
  const points = block.points.filter((p) => p.trim())
  const titleParts = [block.title]
  if (block.subtitle) titleParts.push(` ${block.subtitle}`)
  if (block.dateRange) titleParts.push(` ${block.dateRange}`)

  return (
    <div className="cv-block">
      <div className="cv-project-title">
        <FormattedText text={titleParts.join('')} />
      </div>
      {points.length > 0 && (
        <ul className="cv-bullet-list">
          {points.map((point, i) => (
            <li key={i}>
              <FormattedText text={point} />
            </li>
          ))}
        </ul>
      )}
      {block.dividerAfter && <CvDivider />}
    </div>
  )
}
