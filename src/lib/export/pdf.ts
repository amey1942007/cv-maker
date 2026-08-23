import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportToPDF(container: HTMLElement, filename: string): Promise<void> {
  const pages = container.querySelectorAll('.cv-page')
  if (pages.length === 0) return

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i] as HTMLElement
    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    })

    const imgData = canvas.toDataURL('image/png')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    if (i > 0) pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  }

  pdf.save(`${filename}.pdf`)
}
