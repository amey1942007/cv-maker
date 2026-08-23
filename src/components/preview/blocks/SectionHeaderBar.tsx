interface SectionHeaderBarProps {
  title: string
}

export function SectionHeaderBar({ title }: SectionHeaderBarProps) {
  return (
    <div className="cv-section-header">
      <div className="cv-section-header-bar">{title}</div>
    </div>
  )
}
