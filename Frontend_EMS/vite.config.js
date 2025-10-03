import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy:{
    "/api" : "http://localhost:8000"}
  },
  plugins: [react(), tailwindcss(), viteStaticCopy({
      targets: [
        {
          src: 'public/_redirects',
          dest: '.'   // copy into dist/ root
        }
      ]
    })],
})
