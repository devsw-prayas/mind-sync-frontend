import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Tailwind is loaded via the Play CDN in index.html (matches the Stitch canonical
// designs 1:1), so no build-time Tailwind plugin here.
export default defineConfig({
  plugins: [react()],
})
