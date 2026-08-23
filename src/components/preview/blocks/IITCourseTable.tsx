import type { IITCourseTableBlock } from '../../../types/cv'
import { FormattedText } from '../../../lib/formatCvText'
import { SectionHeaderBar } from './SectionHeaderBar'

interface IITCourseTableProps {
  block: IITCourseTableBlock
}

export function IITCourseTable({ block }: IITCourseTableProps) {
  return (
    <div className="cv-block">
      <SectionHeaderBar title={block.title} />
      <div className="cv-education cv-iit-course">
        <div className="cv-education-header">
          <span className="cv-iit-degree">Degree</span>
          <span className="cv-iit-institute">Institute</span>
          <span className="cv-iit-cgpa">CGPA</span>
          <span className="cv-iit-rank">Dept. Rank</span>
        </div>
        {block.rows.map((row) => (
          <div key={row.id} className="cv-education-row">
            <span className="cv-iit-degree">
              <FormattedText text={row.degree} />
            </span>
            <span className="cv-iit-institute">
              <FormattedText text={row.institute} />
            </span>
            <span className="cv-iit-cgpa">
              <FormattedText text={row.cgpa} />
            </span>
            <span className="cv-iit-rank">
              <FormattedText text={row.deptRank} />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
