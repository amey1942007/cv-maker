import type { SectionBlock } from '../../../types/cv'
import { FormattedText } from '../../../lib/formatCvText'
import { SectionHeaderBar } from './SectionHeaderBar'

interface SectionPreviewProps {
  block: SectionBlock
}

export function SectionPreview({ block }: SectionPreviewProps) {
  const points = block.points.filter((p) => p.trim())

  return (
    <div className="cv-block">
      <SectionHeaderBar title={block.title} />
      {points.length > 0 && (
        <ul className="cv-bullet-list">
          {points.map((point, i) => (
            <li key={i}>
              <FormattedText text={point} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
