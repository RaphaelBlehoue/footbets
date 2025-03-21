import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  resolve: {
    mainFields: ['module', 'main', 'jsnext:main', 'jsnext'],
  },
  test: {
    globals: true,
    include: ['**/*.{test}.?(c|m)[jt]s?(x)', '**/*.steps.ts'],
    watch: false,
    reporters: ['default'],
    outputFile: 'test-report.xml',
    browser: {
      instances: [
        {
          browser: 'chrome',
        },
      ],
    },
    api: {
      port: 3000,
    },
    coverage: {
      reporter: ['lcov', 'clover'],
      exclude: [
        'src/**/*.types.ts',
        'src/index.jsx',
        'src/**/index.js',
        'src/**/*.stories.js',
        'src/**/testsUtils.jsx',
        'src/setupTests.js',
        'src/**/shared-steps.js',
        'src/**/environment.js',
        'src/**/*.specs.ts',
        'src/**/*.steps.ts',
        'src/**/*.d.ts',
        'src/__mocks__/**/*',
        'src/features/**/*',
        'src/__tests__/**/*',
        'src/**/__tests__/**/*',
        'src/e2e/**/*',
      ],
    },
    environment: 'jsdom',
    testTimeout: 10000,
  },
});
