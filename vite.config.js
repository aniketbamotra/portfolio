import { Buffer } from 'node:buffer'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { drafts } from './src/case-studies/drafts.js'

const SITE = 'https://aneeek.com'

// Share images live in src/assets, so their built names are hashed and the
// share tags must be absolute. In the build, swap any share tag pointing at a
// source file for the full URL of its built copy.
const shareImages = () => ({
  name: 'share-images',
  transformIndexHtml: {
    order: 'post',
    handler(html, { bundle }) {
      if (!bundle) return html
      return html.replace(
        /(property="og:image"|name="twitter:image") content="\/(src\/[^"]+)"/g,
        (match, attr, source) => {
          // Built assets don't keep their source path, so match on content.
          const bytes = readFileSync(new URL(`./${source}`, import.meta.url))
          const asset = Object.values(bundle).find(
            (file) =>
              file.type === 'asset' && Buffer.from(file.source).equals(bytes)
          )
          if (!asset) throw new Error(`Share image not in the build: ${source}`)
          return `${attr} content="${SITE}/${asset.fileName}"`
        }
      )
    },
  },
})

// Case study HTML entries, by Rollup input name. Drafts stay out of the build.
const caseStudies = {
  compliancePlatform: 'compliance-platform',
  psymatch: 'psymatch',
  immersiveBionic: 'immersive-bionic',
}
const page = (path) => fileURLToPath(new URL(path, import.meta.url))

// https://vitejs.dev/config/
// Each case study is its own HTML entry so it gets static meta tags and a
// real URL without a router.
export default defineConfig({
  plugins: [react(), shareImages()],
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        ...Object.fromEntries(
          Object.entries(caseStudies)
            .filter(([, slug]) => !drafts.includes(slug))
            .map(([name, slug]) => [name, page(`./${slug}/index.html`)])
        ),
      },
    },
  },
})
