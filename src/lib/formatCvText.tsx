import { Fragment, type ReactNode } from 'react'

/**
 * Renders CV text with inline formatting:
 * *text* → bold
 * _text_ → underline
 */
export function formatCvText(text: string): ReactNode {
  const parts = text.split(/(\*[^*]+\*|_[^_]+_)/g)

  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <span key={i} className="cv-fmt-bold">
          {formatCvText(part.slice(1, -1))}
        </span>
      )
    }
    if (part.startsWith('_') && part.endsWith('_') && part.length > 2) {
      return (
        <span key={i} className="cv-fmt-underline">
          {formatCvText(part.slice(1, -1))}
        </span>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

export function FormattedText({ text }: { text: string }) {
  return <span className="cv-formatted-text">{formatCvText(text)}</span>
}
