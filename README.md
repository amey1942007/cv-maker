# IIT Delhi CV Maker

A free, browser-based CV editor that mirrors the **IIT Delhi academic CV format** — gray section bars, floating education columns, live A4 preview, and export to PDF, DOCX, TeX, and JSON.

**Live app:** [https://amey1942007.github.io/cv-maker/](https://amey1942007.github.io/cv-maker/)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-222?logo=github)

## Use Online (no install)

Open the hosted webapp in any modern browser:

**[https://amey1942007.github.io/cv-maker/](https://amey1942007.github.io/cv-maker/)**

No account or signup required. Your CV is saved automatically in your browser (localStorage). Use **Save JSON** to back up or move your data to another device.

## Features

- **IIT Delhi layout** — Logo (top-left), name (center), photo (top-right), gray section headers with black borders
- **Live preview** — Split-pane editor with real-time A4 preview
- **Collapsible header panel** — Auto-folds when filled to maximize editing space
- **Structured blocks** — Sections, education rows, IIT course rows, projects, dividers, multi-page support
- **Education auto-format** — Enter year, degree, institute, GPA/%; renders in the demo CV column layout
- **Inline formatting** — Use `*bold*` and `_underline_` in any text field
- **Export** — PDF, DOCX, LaTeX (`.tex`), and JSON save/load
- **Auto-save** — CV data persists in browser localStorage

## Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ (LTS recommended)
- npm 10+

### Install & Run

```bash
git clone https://github.com/amey1942007/cv-maker.git
cd cv-maker

npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

### Production Build

```bash
npm run build
npm run preview
```

The static build output is in the `dist/` folder.

## Usage Guide

### 1. Header (name, photo, socials)

| Field | Description |
|-------|-------------|
| **Full Name** | Displayed in ALL CAPS, centered |
| **CV Photo** | Upload a portrait; appears top-right on page 1 |
| **Social Links** | Email, LinkedIn, GitHub, Website, and custom links below your name |

The header panel **collapses automatically** once filled. Click **Header** to expand or collapse it.

- **Add** links via `+ Email`, `+ LinkedIn`, etc.
- **Remove** any link or photo with the trash icon

### 2. Toolbar actions

| Button | Action |
|--------|--------|
| **Add Section** | Prompts for a section name (e.g. `SCHOLASTIC ACHIEVEMENTS`) |
| **Add Education** | Adds a row to the Academic Details block |
| **Add IIT Course** | Adds a row to the IIT Course table (page 2) |
| **Add Project** | Adds a project with title, professor, dates, and bullet points |
| **Add Point** | Adds a bullet to the selected section or project |
| **Remove Point** | Removes the last bullet from the selected section/project |
| **Add Divider** | Inserts an em-dash line between projects |
| **Add Page** | Adds a new CV page |
| **Remove Block** | Deletes the selected block (or last block on the page) |

### 3. Education rows

When adding education, fill in:

| Field | Example |
|-------|---------|
| Year | `2025` or `---` for current degree |
| Degree / Board | `B.Tech in Mathematics & Computing` or `CBSE` |
| Institute | School name (use a new line for city) |
| GPA / Marks | `9.06` (CGPA) or `95` (percentage) |

### 4. Bullet points and text formatting

Bullet points are **plain text** — no hyphen or bullet is added automatically. Type your own prefix at the start of each line:

```
- NSEP 2024 Center Top 10% : Secured rank in top 10%
• Programming Skills : Python, JavaScript, ...
```

Inline formatting inside any field:

```
*text*   → bold
_text_   → underline
```

Example:

```
- Secured *top 10%* in _NSEP 2024_ at center level
```

### 5. Pages

- Use **Page 1**, **Page 2** tabs to switch between pages
- **Remove Page** appears when you have more than one page
- Each page has its own disclaimer footer and page number

### 6. Export

Use the top bar:

| Export | Format | Notes |
|--------|--------|-------|
| **Export PDF** | `.pdf` | Rendered from live preview (best visual match) |
| **Export TeX** | `.tex` | Compile with LaTeX for fine-tuned output |
| **Export DOCX** | `.docx` | Opens in Microsoft Word / Google Docs |
| **Save JSON** | `.json` | Backup or transfer your CV data |
| **Load JSON** | — | Restore a previously saved CV |

### 7. IIT Delhi logo

Toggle **IIT Delhi Logo** in the Header panel to show or hide the official logo on page 1 (top-left). The logo is included in the app at `public/iit-delhi-logo.png`.

## GitHub Pages Deployment

The app auto-deploys to GitHub Pages on every push to `main` via [GitHub Actions](.github/workflows/deploy-pages.yml).

**Live URL:** `https://amey1942007.github.io/cv-maker/`

### First-time setup (repo owner)

1. Go to **Settings → Pages** in the GitHub repo
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Push to `main` — the workflow builds and publishes automatically

### Manual deploy trigger

In GitHub: **Actions → Deploy to GitHub Pages → Run workflow**

## Project Structure

```
src/
├── components/
│   ├── editor/          # Editor panel, toolbar, forms
│   └── preview/         # Live CV preview components
├── lib/
│   ├── defaultTemplate.ts
│   ├── formatCvText.tsx # *bold* and _underline_ parser
│   └── export/          # PDF, DOCX, TeX generators
├── store/cvStore.ts     # Zustand state + localStorage
├── styles/cv-print.css  # CV preview/print styles
└── types/cv.ts          # Data model
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 + custom CV print CSS |
| State | Zustand (persisted) |
| PDF | html2canvas + jsPDF |
| DOCX | docx |
| Icons | lucide-react |
| Hosting | GitHub Pages + GitHub Actions |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run oxlint |

## Data Storage

All CV data is stored **locally in your browser** via localStorage (`iit-cv-maker` key). Nothing is sent to a server. Use **Save JSON** to back up your work.

## License

MIT
