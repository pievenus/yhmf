import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub repo name (D15)
export default defineConfig({
  plugins: [react()],
  base: '/yhmf/',
})
