import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/my-expensetracker/',
  build:{
    chunkSizeWarningLimit:1000,
    outDir:'dist'
  }
})
