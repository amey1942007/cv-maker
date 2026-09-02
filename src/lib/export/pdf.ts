import jsPDF from 'jspdf'
import { captureCvPage, getCvPages, sanitizeFilename } from './capture'

export async function exportToPDF(
  container: HTMLElement,
  filename: string,
  scrollParent?: HTMLElement | null
): Promise<void> {
  const pages = getCvPages(container)
  if (pages.length === 0) return

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const a4Width = pdf.internal.pageSize.getWidth()
  const a4Height = pdf.internal.pageSize.getHeight()
  const safeName = sanitizeFilename(filename)

  for (let i = 0; i < pages.length; i++) {
    const canvas = await captureCvPage(pages[i], scrollParent)
    const imgData = canvas.toDataURL('image/png')

    let imgWidth = a4Width
    let imgHeight = (canvas.height * imgWidth) / canvas.width
    if (imgHeight > a4Height) {
      imgHeight = a4Height
      imgWidth = (canvas.width * imgHeight) / canvas.height
    }

    const x = (a4Width - imgWidth) / 2

    if (i > 0) pdf.addPage()
    pdf.addImage(imgData, 'PNG', x, 0, imgWidth, imgHeight)
  }

  pdf.save(`${safeName}.pdf`)
}
