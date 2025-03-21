// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import vitestPlugin from 'eslint-plugin-vitest';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // ✅ 1. Bloc global – Fichiers ignorés (flat config)
  {
    ignores: [
      'dist',
      'node_modules',
      '**/*.json',
      '**/*.scss',
      'assets',
      '**/*.feature',
      '**/*.css',
      '**/*.spec.ts',
      '**/*.{test}.?(c|m)[jt]s?(x)',
      '**/e2e/**'
    ]
  },
  // ✅ 2. Bloc applicatif
  {
    files: ['**/*.{ts,tsx}'], // uniquement TS/TSX
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        projectService: true
      },
      globals: {
        ...globals.browser,
        vi: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': reactPlugin,
      'react-x': reactX,
      'react-dom': reactDom,
      'prettier': prettierPlugin,
      'vitest': vitestPlugin
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json']
        },
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    },
    // ✅ Extensions
    extends: [
      js.configs.recommended,
      reactPlugin.configs.flat.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked
    ],
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactX.configs['recommended-typescript'].rules,
      ...reactDom.configs.recommended.rules,
      ...vitestPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/array-type': 'error',
      'prettier/prettier': 'error',
      'arrow-parens': [1, 'as-needed'],
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'no-trailing-spaces': 'error',
      'no-console': 'warn',
      'semi': [1, 'always'],
      'max-len': ['error', { code: 180, tabWidth: 2 }],
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 0,
      'react/no-multi-comp': [2, { ignoreStateless: false }],
      'import/no-unresolved': 'off',
      'import/extensions': 'off'
    }
  }
);
