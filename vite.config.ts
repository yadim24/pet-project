/* eslint-disable import/no-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3050,
    proxy: {
      '/api': {
        target: 'http://localhost:3055',
        changeOrigin: true,
      },
    },
    watch: {
      usePolling: true,
    },
  },
});
