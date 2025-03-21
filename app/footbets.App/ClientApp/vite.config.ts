import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';
import stylelint from 'vite-plugin-stylelint';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({
      typescript: true,
    }),
    eslintPlugin({
      formatter: 'stylish',
      eslintOptions: {
        cache: false,
      },
    }),
    stylelint({
      include: ['src/**/*.{css,scss,sass}'],
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 50001,
    open: true,
  },
  resolve: {
    alias: {
      '~assets': '/src/assets',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/main.scss";`,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
