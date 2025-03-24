import { defineConfig } from 'vite';
import chalk from 'chalk';
import react from '@vitejs/plugin-react';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';
import stylelint from 'vite-plugin-stylelint';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  console.log(
    chalk.greenBright(`${new Date().toLocaleTimeString()}`),
    chalk.cyan('[vite]'),
    chalk.yellow(`Environnement utilisé : "${process.env.NODE_ENV}" (mode = ${mode})`),
  );
  //TODO: Add different port to mock and development mode
  return {
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
    define: {
      __MODE__: JSON.stringify(mode),
    },
  };
});
