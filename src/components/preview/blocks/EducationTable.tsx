import type { EducationTableBlock } from '../../../types/cv'
import { FormattedText } from '../../../lib/formatCvText'
import { SectionHeaderBar } from './SectionHeaderBar'

interface EducationTableProps {
  block: EducationTableBlock
}

export function EducationTable({ block }: EducationTableProps) {
  return (
    <div className="cv-block">
      <SectionHeaderBar title={block.title} />
      <div className="cv-education">
        <div className="cv-education-header">
          <span className="cv-edu-year">Year</span>
          <span className="cv-edu-degree">Degree / Board</span>
          <span className="cv-edu-institute">Institute</span>
          <span className="cv-edu-gpa">GPA / Marks(%)</span>
        </div>
        {block.rows.map((row) => (
          <div key={row.id} className="cv-education-row">
            <span className="cv-edu-year">
              <FormattedText text={row.year} />
            </span>
            <span className="cv-edu-degree">
              <FormattedText text={row.degreeBoard} />
            </span>
            <span className="cv-edu-institute">
              <FormattedText text={row.institute} />
            </span>
            <span className="cv-edu-gpa">
              <FormattedText text={row.gpaOrMarks} />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
