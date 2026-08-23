import type { CVDocument, Block } from '../../types/cv'

function escapeLatex(text: string): string {
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/[&%$#_{}]/g, (m) => `\\${m}`)
    .replace(/\^/g, '\\textasciicircum{}')
    .replace(/~/g, '\\textasciitilde{}')
}

function renderBlock(block: Block): string {
  switch (block.type) {
    case 'education-table':
      return `
\\subsection*{${escapeLatex(block.title)}}
\\begin{tabular}{|p{1.5cm}|p{4cm}|p{5.5cm}|p{2.5cm}|}
\\hline
\\textbf{Year} & \\textbf{Degree / Board} & \\textbf{Institute} & \\textbf{GPA / Marks(\\%)} \\\\
\\hline
${block.rows
  .map(
    (r) =>
      `${escapeLatex(r.year)} & ${escapeLatex(r.degreeBoard)} & ${escapeLatex(r.institute.replace(/\n/g, ' '))} & ${escapeLatex(r.gpaOrMarks)} \\\\`
  )
  .join('\n')}
\\hline
\\end{tabular}
`

    case 'iit-course-table':
      return `
\\subsection*{${escapeLatex(block.title)}}
\\begin{tabular}{|p{4cm}|p{5cm}|p{2cm}|p{2.5cm}|}
\\hline
\\textbf{Degree} & \\textbf{Institute} & \\textbf{CGPA} & \\textbf{Dept. Rank} \\\\
\\hline
${block.rows
  .map(
    (r) =>
      `${escapeLatex(r.degree)} & ${escapeLatex(r.institute)} & ${escapeLatex(r.cgpa)} & ${escapeLatex(r.deptRank)} \\\\`
  )
  .join('\n')}
\\hline
\\end{tabular}
`

    case 'section': {
      const points = block.points
        .filter((p) => p.trim())
        .map((p) => escapeLatex(p))
        .join('\n\n')
      return `
\\subsection*{${escapeLatex(block.title)}}
${points}
`
    }

    case 'project': {
      const titleParts = [block.title]
      if (block.subtitle) titleParts.push(` ${block.subtitle}`)
      if (block.dateRange) titleParts.push(` ${block.dateRange}`)
      const points = block.points
        .filter((p) => p.trim())
        .map((p) => escapeLatex(p))
        .join('\n\n')
      const divider = block.dividerAfter ? '\n\\hdashrule{\\textwidth}{0.4pt}{2pt 2pt}\n' : ''
      return `
\\textbf{${escapeLatex(titleParts.join(''))}}
${points}
${divider}
`
    }

    case 'divider':
      return '\\hdashrule{\\textwidth}{0.4pt}{2pt 2pt}\n'

    default:
      return ''
  }
}

function formatSocials(cv: CVDocument): string {
  return cv.socials
    .filter((s) => s.value.trim())
    .map((s) => {
      if (s.type === 'custom' && s.label) return `${s.label}: ${s.value}`
      return s.value
    })
    .join(' \\textbar{} ')
}

export function exportToTeX(cv: CVDocument, filename: string): void {
  const pages = cv.pages
    .map((page, pageIndex) => {
      const header =
        pageIndex === 0
          ? `
\\begin{center}
{\\LARGE \\textbf{${escapeLatex(cv.name.toUpperCase())}}}\\\\[4pt]
${formatSocials(cv) ? `{\\small ${escapeLatex(formatSocials(cv))}}\\\\[8pt]` : ''}
\\end{center}
`
          : `
\\begin{center}
{\\LARGE \\textbf{${escapeLatex(cv.name.toUpperCase())}}}\\\\[8pt]
\\end{center}
`

      const blocks = page.blocks.map(renderBlock).join('\n')
      const footer = `
\\vfill
{\\small \\textit{${escapeLatex(page.disclaimer ?? '')}} \\hfill Page ${pageIndex + 1} of ${cv.pages.length}}
`
      const pageBreak = pageIndex < cv.pages.length - 1 ? '\\newpage\n' : ''

      return `${pageIndex > 0 ? '\\newpage\n' : ''}${header}\n${blocks}\n${footer}\n${pageBreak}`
    })
    .join('\n')

  const tex = `\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=14mm]{geometry}
\\usepackage{times}
\\usepackage{array}
\\usepackage{enumitem}
\\usepackage{nccrules}
\\pagestyle{empty}

\\begin{document}
${pages}
\\end{document}
`

  const blob = new Blob([tex], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.tex`
  a.click()
  URL.revokeObjectURL(url)
}

export function exportToJSON(cv: CVDocument, filename: string): void {
  const blob = new Blob([JSON.stringify(cv, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importFromJSON(file: File): Promise<CVDocument> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        resolve(JSON.parse(reader.result as string) as CVDocument)
      } catch {
        reject(new Error('Invalid JSON file'))
      }
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}
