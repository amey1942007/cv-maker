import type { ProjectBlock } from '../../../types/cv'
import { FormattedText } from '../../../lib/formatCvText'
import { getProjectDateDisplay } from '../../../lib/projectTimeline'
import { CvDivider } from './CvDivider'

interface ProjectPreviewProps {
  block: ProjectBlock
}

export function ProjectPreview({ block }: ProjectPreviewProps) {
  const points = block.points.filter((p) => p.trim())
  const titleParts = [block.title]
  if (block.subtitle?.trim()) titleParts.push(` ${block.subtitle.trim()}`)
  const dateDisplay = getProjectDateDisplay(block)

  return (
    <div className="cv-block">
      <div className="cv-project-title-row">
        <span className="cv-project-title-text">
          <FormattedText text={titleParts.join('')} />
        </span>
        {dateDisplay && <span className="cv-project-title-date">{dateDisplay}</span>}
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
