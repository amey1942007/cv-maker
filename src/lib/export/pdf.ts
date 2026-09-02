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
}

function waitForLayout(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
}

export async function exportToPDF(container: HTMLElement, filename: string): Promise<void> {
  const pages = Array.from(container.querySelectorAll('.cv-page')) as HTMLElement[]
  if (pages.length === 0) return

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

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        width: clone.offsetWidth,
        height: clone.offsetHeight,
        windowWidth: clone.scrollWidth,
        windowHeight: clone.scrollHeight,
        onclone: (_doc, clonedPage) => {
          prepareCloneForExport(clonedPage)
        },
      })

      const imgData = canvas.toDataURL('image/png')
      const imgWidth = a4Width
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      let heightLeft = imgHeight
      let yOffset = 0

      while (heightLeft > 0) {
        if (!isFirstPdfPage) pdf.addPage()
        isFirstPdfPage = false

        pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight)
        heightLeft -= a4Height
        yOffset -= a4Height
      }
    }

    pdf.save(`${filename}.pdf`)
  } finally {
    exportRoot.remove()
  }
}
