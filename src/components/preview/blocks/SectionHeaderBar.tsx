interface SectionHeaderBarProps {
  title: string
}

export function SectionHeaderBar({ title }: SectionHeaderBarProps) {
  return (
    <div className="cv-section-header">
      <div className="cv-section-header-line" aria-hidden="true" />
      <div className="cv-section-header-bar">{title}</div>
      <div className="cv-section-header-line" aria-hidden="true" />
    </div>
  )
}
