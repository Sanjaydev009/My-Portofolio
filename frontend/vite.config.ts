import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Clean base path for static hosting
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
    // Optimize asset handling for static deployment
    assetsInlineLimit: 0, // Don't inline any assets - serve all as separate files
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'terser',
    // Ensure proper static asset copying
    copyPublicDir: true,
    outDir: 'dist',
    emptyOutDir: true, // Clean dist folder before build
  },
  server: {
    host: true,
    open: true,
    port: 3000,
  },
  // Handle different file types properly - force external serving
  assetsInclude: ['**/*.pdf', '**/*.jpg', '**/*.png', '**/*.svg', '**/*.ico'],
})
