# Travelagenc — Application React (Vite + TypeScript + Tailwind)
[![CI](https://github.com/Soofmaax/Travelagenc/actions/workflows/ci.yml/badge.svg)](https://github.com/Soofmaax/Travelagenc/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/Soofmaax/Travelagenc/branch/main/graph/badge.svg)](https://codecov.io/gh/Soofmaax/Travelagenc)
[![ESLint](https://img.shields.io/badge/ESLint-enabled-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-enabled-F7B93E?logo=prettier&logoColor=000)](https://prettier.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Tests-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node](https://img.shields.io/badge/Node-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

Une application moderne d’agence de voyage mettant en avant:
- Une page d’accueil soignée avec Hero, sections de mise en avant et témoignages
- Un catalogue de voyages avec recherche et filtres (destination, durée, prix)
- Internationalisation (FR/EN) avec détection automatique de langue
- Mode sombre avec persistance et respect des préférences système
- Qualité de code (ESLint, Prettier, TypeScript strict) et tests (Vitest)
- Intégration continue (GitHub Actions) qui exécute les vérifications avant le build

## Sommaire
- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation et démarrage](#installation-et-démarrage)
- [Scripts disponibles](#scripts-disponibles)
- [Variables d’environnement](#variables-denvironnement)
- [Structure du projet](#structure-du-projet)
- [Qualité & conventions](#qualité--conventions)
- [Hooks pre-commit (Husky + lint-staged)](#hooks-pre-commit-husky--lint-staged)
- [Tests](#tests)
- [Internationalisation (i18n)](#internationalisation-i18n)
- [Mode sombre](#mode-sombre)
- [API utilitaire](#api-utilitaire)
- [Journalisation (logger)](#journalisation-logger)
- [CI / Intégration Continue](#ci--intégration-continue)
- [Contribution](#contribution)

---

## Stack technique
- React 18 + TypeScript 5
- Vite 5 (dev server + build)
- React Router DOM 6 (routage)
- Tailwind CSS 3 (styles utilitaires + composants via `@layer components`)
- i18next + react-i18next + i18next-browser-languagedetector (i18n)
- Fuse.js (suggestions de recherche)
- Vitest + @testing-library/react + jsdom (tests)
- ESLint 9 + typescript-eslint + Prettier 3 (qualité de code)

## Prérequis
- Node.js 20.x (recommandé, aligné avec la CI)
- npm 9/10

Vérifier les versions:
- `node -v`
- `npm -v`

## Installation et démarrage
1) Installer les dépendances
- `npm ci`

2) (Optionnel) Configurer les variables d’environnement (voir plus bas)
- Créer un fichier `.env` à la racine si nécessaire

3) Démarrer le serveur de dev
- `npm run dev`
- Ouvrir http://localhost:5173 (par défaut)

4) Build de production
- `npm run build`
- `npm run preview` pour prévisualiser le build

## Scripts disponibles
- `npm run dev` — lance l’environnement de développement Vite
- `npm run build` — génère le build de production
- `npm run preview` — prévisualise le build de production
- `npm run lint` — exécute ESLint sur tout le projet
- `npm run typecheck` — vérifie les types TypeScript (`tsc --noEmit`)
- `npm run test` — lance les tests (Vitest)
- `npm run test:coverage` — lance les tests avec couverture
- `npm run format` — formate le code via Prettier

## Variables d’environnement
Le client HTTP utilise une base d’URL configurable:
- `VITE_API_URL` — base URL des appels API côté client (ex: `https://api.example.com`)

Remarques:
- En l’absence de `VITE_API_URL`, l’utilitaire se replie vers `window.location.origin` (en navigateur) ou `http://localhost` (fallback pour tests).
- Créez un fichier `.env` à la racine si vous devez surcharger la valeur par défaut:
  ```
  VITE_API_URL=https://api.example.com
  ```

## Structure du projet
Principaux dossiers/fichiers:
- `src/`
  - `components/` — composants UI (FeatureCard, HeroSection, FilterSidebar, etc.)
  - `pages/` — pages principales (HomePage, TripsPage, TripDetailPage, etc.)
  - `hooks/` — hooks personnalisés (`useDarkMode`, `useTripsFilter`)
  - `data/` — données statiques (ex: `trips.ts`, `features.ts`)
  - `i18n/` — config i18n et fichiers de langues (`locales/en.json`, `locales/fr.json`)
  - `utils/` — utilitaires (API, logger, ErrorBoundary)
  - `index.css` — Tailwind + styles communs via `@layer components`
  - `setupTests.ts` — bootstrap tests
- `eslint.config.js` — configuration ESLint
- `tailwind.config.js` — configuration Tailwind
- `vite.config.ts` / `vitest.config.ts` — configuration Vite/Vitest
- `.github/workflows/ci.yml` — pipeline d’intégration continue

## Qualité & conventions
- TypeScript strict (aucun `any` ou `as any` laissé dans le code)
- Linting ESLint (typescript-eslint) — règle `no-explicit-any` activée
- Formatage Prettier (config: quotes simples, trailing commas es5, largeur 100, etc.)
- Composants stylistiques Tailwind via `@layer components` dans `src/index.css`:
  - Exemples: `.btn-primary`, `.btn-secondary`, `.container-custom`, `.section`, `.card`, `.input-field`
- Nommage clair et dossiers organisés par rôle (components/pages/hooks/utils)

## Hooks pre-commit (Husky + lint-staged)
- Dépendances: `husky` et `lint-staged` (devDependencies)
- Activation des hooks (une seule fois) :
  - `npm run prepare`
- Ce qui s’exécute avant chaque commit (fichiers stagés uniquement) :
  - `src/**/*.{ts,tsx}` → `eslint --fix` puis `prettier --write`
  - `src/**/*.{css,json,md}` → `prettier --write`
- Config accessible dans `package.json` (clé `lint-staged`).
- Hook défini dans `.husky/pre-commit`.
- Pour ignorer temporairement les hooks : `git commit -n`

## Tests
- Framework: Vitest
- Environnement: jsdom
- Librairie: @testing-library/react
- Lancer les tests:
  - `npm run test`
  - `npm run test:coverage` pour la couverture
- Emplacement des tests:
  - Exemple: `src/components/__tests__/ScrollToTop.test.tsx`
  - Exemple: `src/utils/__tests__/api.test.ts`
  - Exemple: `src/hooks/__tests__/useTripsFilter.test.ts`

Notes:
- Utiliser `vi.fn` / `vi.spyOn` (Vitest) plutôt que `jest.fn` / `jest.spyOn`.
- Les tests de hooks utilisent `@testing-library/react` (`renderHook`, `act`, etc.).

## Internationalisation (i18n)
- Config: `src/i18n/config.ts`
- Langues: `src/i18n/locales/en.json`, `src/i18n/locales/fr.json`
- Détection automatique de la langue via `i18next-browser-languagedetector`
- Composant `LanguageSwitcher` pour basculer entre FR/EN

## Mode sombre
- Hook: `useDarkMode` (détection préférence système, persistance localStorage)
- Classe racine `dark` appliquée sur `<html>`
- Palette via CSS variables + Tailwind (`src/index.css`)

## API utilitaire
- Fichier: `src/utils/api.ts`
- Construction d’URL robuste:
  - Utilise `VITE_API_URL` si défini
  - Sinon `window.location.origin` (navigateur)
  - Sinon `http://localhost` (fallback pour tests)
- Méthodes: `get`, `post`, `put`, `delete`
- Exemple:
  ```ts
  import Api from '@/utils/api';
  const data = await Api.get('/trips');
  ```

## Journalisation (logger)
- Fichier: `src/utils/logger.ts`
- Niveaux: `debug`, `info`, `warn`, `error` (type `LogLevel` fort typé)
- `debug` n’affiche qu’en développement

## CI / Intégration Continue
- Workflow: `.github/workflows/ci.yml`
- Déclenchement: sur `push` et `pull_request`
- Étapes:
  1. Install (`npm ci`)
  2. Lint (`npm run lint`)
  3. Type-check (`npm run typecheck`)
  4. Tests avec couverture (`npm run test:coverage`)
  5. Upload du rapport de couverture comme artefact (coverage-report)
  6. Upload de la couverture vers Codecov (badge dynamique)
  7. Prettier check (`npx prettier --check "src/**/*.{ts,tsx,css,json,md}"`)
  8. Build (`npm run build`) — seulement si tout passe

## Contribution
- Créez une branche depuis `main`
- Ajoutez des tests si nécessaire
- Assurez-vous que `lint`, `typecheck`, `test` et `prettier check` passent
- Ouvrez une Pull Request en décrivant clairement les changements

---

Pour toute question ou amélioration souhaitée (déploiement, hooks de pre-commit, règles ESLint supplémentaires, tests d’accessibilité), n’hésitez pas à ouvrir une issue ou une PR.
<!-- ci: retrigger run to validate currency.ts symbol fix -->
