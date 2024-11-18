import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],

  build: {
    target: 'modules',
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react';
            }
            if (id.includes('react-dom')) {
              return 'react-dom';
            }
            if (id.includes('react-router-dom')) {
              return 'react-router-dom';
            }
            if (id.includes('styled-components')) {
              return 'styled-components';
            }
            if (id.includes('axios')) {
              return 'axios';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'react-query';
            }
            return 'vendor';
          }
        },
      },
    },
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'styled-components',
      'axios',
      '@tanstack/react-query',
    ],
  },
});
