import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Each case study is its own HTML entry so it gets static meta tags and a
// real URL without a router.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        compliancePlatform: fileURLToPath(
          new URL('./compliance-platform/index.html', import.meta.url)
        ),
      },
    },
  },
})
