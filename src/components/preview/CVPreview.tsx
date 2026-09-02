import { forwardRef } from 'react'
import { useCVStore } from '../../store/cvStore'
import { CVHeader } from './CVHeader'
import { CVFooter } from './CVFooter'
import { BlockRenderer } from './BlockRenderer'
import '../../styles/cv-print.css'

export const CVPreview = forwardRef<HTMLDivElement>(function CVPreview(_, ref) {
  const cv = useCVStore((s) => s.cv)

  return (
    <div ref={ref} className="cv-document bg-gray-100 dark:bg-gray-900 py-6 px-4">
      {cv.pages.map((page, pageIndex) => (
        <div
          key={page.id}
          className="cv-page"
          data-page-index={pageIndex}
          id={`cv-page-${pageIndex}`}
        >
          <div className="cv-page-content">
            <CVHeader
              name={cv.name}
              photoBase64={cv.photoBase64}
              socials={cv.socials}
              showIITLogo={cv.showIITLogo ?? true}
              showHeader={pageIndex === 0}
            />
            {page.blocks.map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
          </div>

          <CVFooter
            disclaimer={page.disclaimer}
            pageNumber={pageIndex + 1}
            totalPages={cv.pages.length}
          />
        </div>
      ))}
    </div>
  )
})
