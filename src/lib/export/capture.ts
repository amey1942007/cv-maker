import html2canvas from 'html2canvas'
import cvPrintCss from '../../styles/cv-print.css?inline'

export const EXPORT_SCALE = 2

const EXPORT_CSS = `
${cvPrintCss}
html, body {
  margin: 0;
  padding: 0;
  background: #ffffff;
  color: #000000;
}
a {
  color: #000000;
  text-decoration: none;
}
* {
  box-shadow: none !important;
}
`

function sanitizeCloneDocument(clonedDoc: Document) {
  clonedDoc.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
    node.remove()
  })

  const style = clonedDoc.createElement('style')
  style.textContent = EXPORT_CSS
  clonedDoc.head.appendChild(style)

  if (clonedDoc.body) {
    clonedDoc.body.style.backgroundColor = '#ffffff'
    clonedDoc.body.style.color = '#000000'
  }
}

function prepareCloneForExport(clonedDoc: Document) {
  sanitizeCloneDocument(clonedDoc)

  clonedDoc.querySelectorAll('.cv-divider').forEach((el) => {
    el.textContent = ''
  })
}

function waitForLayout(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
}

export function sanitizeFilename(name: string): string {
  return name.replace(/[^\w.-]+/g, '_') || 'cv'
}

export function getCvPages(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll('.cv-page')) as HTMLElement[]
}

function scrollPageIntoView(page: HTMLElement, scrollParent?: HTMLElement | null) {
  if (scrollParent) {
    const pageTop = page.offsetTop - scrollParent.offsetTop
    scrollParent.scrollTop = Math.max(0, pageTop - 4)
    return
  }
  page.scrollIntoView({ block: 'start', behavior: 'instant' })
}

export async function captureCvPage(
  page: HTMLElement,
  scrollParent?: HTMLElement | null
): Promise<HTMLCanvasElement> {
  scrollPageIntoView(page, scrollParent)
  await waitForLayout()
  await new Promise((resolve) => setTimeout(resolve, 250))

  const width = page.offsetWidth
  const height = page.offsetHeight

  return html2canvas(page, {
    scale: EXPORT_SCALE,
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: '#ffffff',
    width,
    height,
    scrollX: 0,
    scrollY: 0,
    windowWidth: width,
    windowHeight: height,
    onclone: (clonedDoc) => {
      prepareCloneForExport(clonedDoc)
    },
  })
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function downloadCanvasPng(canvas: HTMLCanvasElement, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to create PNG image.'))
          return
        }
        downloadBlob(blob, filename)
        resolve()
      },
      'image/png',
      1
    )
  })
}
