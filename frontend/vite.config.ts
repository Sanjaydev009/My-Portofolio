import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor modules (libraries) into their own chunks
          vendor: ['react', 'react-dom', 'react-router-dom'],
          materialUI: [
            '@mui/material', 
            '@mui/icons-material'
          ],
          utils: ['framer-motion', 'react-toastify', '@tanstack/react-query'],
        },
      },
    },
    // Optimize asset handling
    assetsInlineLimit: 4096, // 4kb - smaller files will be inlined
    chunkSizeWarningLimit: 1000, // Increase warning limit for larger chunks
    sourcemap: false, // Disable sourcemaps in production for better performance
    // Enable additional optimizations
    minify: 'terser',
  },
  server: {
    open: true,
    port: 3000,
  },
})
