# GitHub Pages setup

The workflow deploys the built app to the **`gh-pages`** branch automatically.

## One-time repo setting

1. Open **https://github.com/amey1942007/cv-maker/settings/pages**
2. **Build and deployment → Source:** Deploy from a branch
3. **Branch:** `gh-pages` / **Folder:** `/ (root)`
4. Save

## Live URL

**https://amey1942007.github.io/cv-maker/**

## If a previous deploy failed

Older workflow versions used **GitHub Actions** as the Pages source, which fails until that option is enabled in Settings. The current workflow uses the **`gh-pages`** branch instead — switch the Pages source as described above, then re-run **Actions → Deploy to GitHub Pages → Run workflow**.
