import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for better deployment compatibility
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
    assetsInlineLimit: 2048, // 2kb - smaller files will be inlined (reduced to avoid inlining PDFs)
    chunkSizeWarningLimit: 1000, // Increase warning limit for larger chunks
    sourcemap: false, // Disable sourcemaps in production for better performance
    // Enable additional optimizations
    minify: 'terser',
    // Copy static assets properly
    copyPublicDir: true,
    outDir: 'dist',
  },
  // Ensure proper asset serving
  publicDir: 'public',
  server: {
    open: true,
    port: 3000,
  },
  // Handle different file types properly
  assetsInclude: ['**/*.pdf', '**/*.jpg', '**/*.png', '**/*.svg', '**/*.ico'],
})
