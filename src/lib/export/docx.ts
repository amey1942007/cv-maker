import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
} from 'docx'
import type { CVDocument, Block } from '../../types/cv'

function sectionTitle(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        font: 'Times New Roman',
        size: 22,
      }),
    ],
  })
}

function textParagraph(text: string): Paragraph {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({
        text,
        font: 'Times New Roman',
        size: 21,
      }),
    ],
  })
}

function borderedCell(text: string, bold = false): TableCell {
  return new TableCell({
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1 },
      bottom: { style: BorderStyle.SINGLE, size: 1 },
      left: { style: BorderStyle.SINGLE, size: 1 },
      right: { style: BorderStyle.SINGLE, size: 1 },
    },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold,
            font: 'Times New Roman',
            size: 20,
          }),
        ],
      }),
    ],
  })
}

function renderBlock(block: Block): (Paragraph | Table)[] {
  switch (block.type) {
    case 'education-table':
      return [
        sectionTitle(block.title),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                borderedCell('Year', true),
                borderedCell('Degree / Board', true),
                borderedCell('Institute', true),
                borderedCell('GPA / Marks(%)', true),
              ],
            }),
            ...block.rows.map(
              (row) =>
                new TableRow({
                  children: [
                    borderedCell(row.year),
                    borderedCell(row.degreeBoard),
                    borderedCell(row.institute.replace(/\n/g, ', ')),
                    borderedCell(row.gpaOrMarks),
                  ],
                })
            ),
          ],
        }),
      ]

    case 'iit-course-table':
      return [
        sectionTitle(block.title),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                borderedCell('Degree', true),
                borderedCell('Institute', true),
                borderedCell('CGPA', true),
                borderedCell('Dept. Rank', true),
              ],
            }),
            ...block.rows.map(
              (row) =>
                new TableRow({
                  children: [
                    borderedCell(row.degree),
                    borderedCell(row.institute),
                    borderedCell(row.cgpa),
                    borderedCell(row.deptRank),
                  ],
                })
            ),
          ],
        }),
      ]

    case 'section': {
      return [
        sectionTitle(block.title),
        ...block.points
          .filter((p) => p.trim())
          .map((p) => textParagraph(p)),
      ]
    }

    case 'project': {
      const titleParts = [block.title]
      if (block.subtitle) titleParts.push(` ${block.subtitle}`)
      if (block.dateRange) titleParts.push(` ${block.dateRange}`)
      const items: (Paragraph | Table)[] = [
        new Paragraph({
          spacing: { before: 120, after: 60 },
          children: [
            new TextRun({
              text: titleParts.join(''),
              bold: true,
              font: 'Times New Roman',
              size: 21,
            }),
          ],
        }),
        ...block.points
          .filter((p) => p.trim())
          .map((p) => textParagraph(p)),
      ]
      if (block.dividerAfter) {
        items.push(
          new Paragraph({
            spacing: { before: 100, after: 100 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 1 } },
            children: [],
          })
        )
      }
      return items
    }

    case 'divider':
      return [
        new Paragraph({
          spacing: { before: 100, after: 100 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 2 } },
          children: [],
        }),
      ]

    default:
      return []
  }
}

function formatSocials(cv: CVDocument): string {
  return cv.socials
    .filter((s) => s.value.trim())
    .map((s) => {
      if (s.type === 'custom' && s.label) return `${s.label}: ${s.value}`
      if (s.type === 'email') return s.value
      return s.value
    })
    .join(' | ')
}

export async function exportToDOCX(cv: CVDocument, filename: string): Promise<void> {
  const children: (Paragraph | Table)[] = []

  cv.pages.forEach((page, pageIndex) => {
    if (pageIndex > 0) {
      children.push(
        new Paragraph({
          pageBreakBefore: true,
          children: [],
        })
      )
    }

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: cv.name.toUpperCase(),
            bold: true,
            font: 'Times New Roman',
            size: 28,
          }),
        ],
      })
    )

    if (pageIndex === 0) {
      const socialText = formatSocials(cv)
      if (socialText) {
        children.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: socialText,
                font: 'Times New Roman',
                size: 19,
              }),
            ],
          })
        )
      }
    }

    page.blocks.forEach((block) => {
      children.push(...renderBlock(block))
    })

    children.push(
      new Paragraph({
        spacing: { before: 400 },
        children: [
          new TextRun({
            text: page.disclaimer ?? '',
            font: 'Times New Roman',
            size: 17,
            italics: true,
            color: '666666',
          }),
        ],
      })
    )
  })

  const doc = new Document({
    sections: [{ children }],
  })

  const blob = await Packer.toBlob(doc)
  downloadBlob(blob, `${filename}.docx`)
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
