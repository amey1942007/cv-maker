import {
  captureCvPage,
  downloadCanvasPng,
  getCvPages,
  sanitizeFilename,
} from './capture'

export async function exportToPNG(
  container: HTMLElement,
  filename: string,
  scrollParent?: HTMLElement | null
): Promise<number> {
  const pages = getCvPages(container)
  if (pages.length === 0) {
    throw new Error('No CV pages found to export.')
  }

  const safeName = sanitizeFilename(filename)

  for (let i = 0; i < pages.length; i++) {
    const canvas = await captureCvPage(pages[i], scrollParent)
    await downloadCanvasPng(canvas, `${safeName}-page-${i + 1}.png`)

    if (i < pages.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  return pages.length
}
