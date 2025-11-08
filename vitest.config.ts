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
      // Réactivation de la couverture sur tous les composants
      include: [
        'src/utils/**',
        'src/hooks/**',
        'src/components/**',
      ],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        'src/pages/**',
        'src/i18n/**',
        'src/data/**',
        'src/App.tsx',
        'src/main.tsx',
        'src/index.css',
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
        functions: 75,
        lines: 80,
      },
    },
  },
});