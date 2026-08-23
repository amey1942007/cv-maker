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
      return <strong key={i}>{formatCvText(part.slice(1, -1))}</strong>
    }
    if (part.startsWith('_') && part.endsWith('_') && part.length > 2) {
      return <u key={i}>{formatCvText(part.slice(1, -1))}</u>
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

export function FormattedText({ text }: { text: string }) {
  return <>{formatCvText(text)}</>
}
