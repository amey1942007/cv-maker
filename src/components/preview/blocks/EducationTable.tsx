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
      <table className="cv-table cv-education-table">
        <thead>
          <tr>
            <th className="cv-edu-year">Year</th>
            <th className="cv-edu-degree">Degree / Board</th>
            <th className="cv-edu-institute">Institute</th>
            <th className="cv-edu-gpa">GPA / Marks(%)</th>
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={row.id}>
              <td className="cv-edu-year">
                <FormattedText text={row.year} />
              </td>
              <td className="cv-edu-degree">
                <FormattedText text={row.degreeBoard} />
              </td>
              <td className="cv-edu-institute">
                <FormattedText text={row.institute} />
              </td>
              <td className="cv-edu-gpa">
                <FormattedText text={row.gpaOrMarks} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
