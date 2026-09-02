import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function prepareCloneForExport(root: HTMLElement) {
  root.classList.add('cv-pdf-export-page')
  root.querySelectorAll<HTMLElement>('.cv-fmt-bold').forEach((el) => {
    el.style.fontWeight = '700'
    el.style.webkitTextStroke = '0'
    el.style.paintOrder = 'normal'
  })
  root.querySelectorAll<HTMLElement>('.cv-fmt-underline').forEach((el) => {
    el.style.textDecoration = 'underline'
    el.style.textUnderlineOffset = '1px'
    el.style.boxShadow = 'none'
  })
  root.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
    if (!img.src.startsWith('data:')) {
      img.crossOrigin = 'anonymous'
    }
  })
}

function waitForLayout(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
}

function measurePage(sourcePage: HTMLElement, clone: HTMLElement) {
  const width = clone.offsetWidth || sourcePage.offsetWidth || clone.scrollWidth || sourcePage.scrollWidth
  const height = clone.offsetHeight || sourcePage.offsetHeight || clone.scrollHeight || sourcePage.scrollHeight
  return { width, height }
}

export async function exportToPDF(container: HTMLElement, filename: string): Promise<void> {
  const pages = Array.from(container.querySelectorAll('.cv-page')) as HTMLElement[]
  if (pages.length === 0) {
    throw new Error('No CV pages found to export.')
  }

  const exportRoot = document.createElement('div')
  exportRoot.setAttribute('aria-hidden', 'true')
  exportRoot.className = 'cv-pdf-export-root'
  document.body.appendChild(exportRoot)

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const a4Width = pdf.internal.pageSize.getWidth()
  const a4Height = pdf.internal.pageSize.getHeight()
  let isFirstPdfPage = true

  try {
    for (const sourcePage of pages) {
      exportRoot.replaceChildren(sourcePage.cloneNode(true))
      const clone = exportRoot.firstElementChild as HTMLElement
      await waitForLayout()

      const { width, height } = measurePage(sourcePage, clone)
      if (!width || !height) {
        throw new Error('Could not measure CV page size for export.')
      }

      const scale = Math.min(2, 4096 / Math.max(width, height))

      const canvas = await html2canvas(clone, {
        scale,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        width,
        height,
        onclone: (_doc, clonedPage) => {
          prepareCloneForExport(clonedPage)
        },
      })

      if (!canvas.width || !canvas.height) {
        throw new Error('Failed to render CV page.')
      }

      let imgData: string
      try {
        imgData = canvas.toDataURL('image/jpeg', 0.92)
      } catch {
        throw new Error('Rendered page is too large to export. Try removing a page or shortening content.')
      }

      const imgWidth = a4Width
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      let heightLeft = imgHeight
      let yOffset = 0
      let slices = 0
      const maxSlices = Math.ceil(imgHeight / a4Height) + 2

      while (heightLeft > 0.5 && slices < maxSlices) {
        if (!isFirstPdfPage) pdf.addPage()
        isFirstPdfPage = false
        slices++

        pdf.addImage(imgData, 'JPEG', 0, yOffset, imgWidth, imgHeight)
        heightLeft -= a4Height
        yOffset -= a4Height
      }
    }

    if (isFirstPdfPage) {
      throw new Error('Nothing was rendered into the PDF.')
    }

    const safeName = filename.replace(/[^\w.-]+/g, '_') || 'cv'
    pdf.save(`${safeName}.pdf`)
  } finally {
    exportRoot.remove()
  }
}
