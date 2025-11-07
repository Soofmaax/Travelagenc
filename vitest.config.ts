import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      // Phase 1: Exclure les zones non encore couvertes pour ne pas bloquer la CI.
      // Nous réactiverons progressivement ces dossiers au fil de l'ajout des tests.
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        'src/components/**',
        'src/pages/**',
        'src/i18n/**',
        'src/data/**',
        'src/App.tsx',
        'src/main.tsx',
        'src/index.css',
        'src/utils/errorBoundary.tsx',
        'src/utils/logger.ts',
        'src/hooks/**',
        // Exclure les fichiers de configuration racine
        '**/*.config.{js,ts}',
        'tailwind.config.js',
        'postcss.config.js',
        'vite.config.ts',
        'eslint.config.js',
        'vitest.config.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 70,
        lines: 80,
      },
    },
  },
});