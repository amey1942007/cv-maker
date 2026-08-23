interface CVFooterProps {
  disclaimer?: string
  pageNumber: number
  totalPages: number
}

export function CVFooter({ disclaimer, pageNumber, totalPages }: CVFooterProps) {
  return (
    <div className="cv-footer">
      <span>{disclaimer ?? 'Disclaimer: All the information on this page is entered by student.'}</span>
      <span>
        Page {pageNumber} of {totalPages}
      </span>
    </div>
  )
}
