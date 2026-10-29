# Aniket Bamotra — Portfolio

Personal portfolio site built with React and Vite. Live at [aneeek.com](https://aneeek.com).

## Development

```sh
npm install
npm run dev      # start the dev server
npm run lint     # run ESLint
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Structure

- `src/components/` — page sections (`TopMenu`, `Bio`, `Projects`, `Contact`, `Copy`) and shared pieces
- `src/components/projects/projectsData.js` — add or edit projects in the `projects` array
- `src/components/case-study/` — case study building blocks; each case study is its own HTML entry (e.g. `compliance-platform/index.html`, registered in `vite.config.js`)
- `src/assets/case-studies/<slug>/` — case study frames, imported by the page that shows them
- `src/assets/images/` — images (WebP, ~1600px wide for project screenshots)
- `src/assets/fonts/hagrid/` — Hagrid font (WOFF2) and its license

## Font license

Hagrid is used under the license in `src/assets/fonts/hagrid/Hagrid-Family-CC-BY-NCLicensepdf.pdf` (CC BY-NC, trial files).
