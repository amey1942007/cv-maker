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
      <table className="cv-table cv-iit-course-table">
        <thead>
          <tr>
            <th className="cv-iit-degree">Degree</th>
            <th className="cv-iit-institute">Institute</th>
            <th className="cv-iit-cgpa">CGPA</th>
            <th className="cv-iit-rank">Dept. Rank</th>
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={row.id}>
              <td className="cv-iit-degree">
                <FormattedText text={row.degree} />
              </td>
              <td className="cv-iit-institute">
                <FormattedText text={row.institute} />
              </td>
              <td className="cv-iit-cgpa">
                <FormattedText text={row.cgpa} />
              </td>
              <td className="cv-iit-rank">
                <FormattedText text={row.deptRank} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
