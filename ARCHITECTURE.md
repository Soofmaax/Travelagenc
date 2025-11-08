# Architecture Overview

## Tech Stack

- Framework: React 18.3
- Build Tool: Vite 5.4
- Language: TypeScript
- Styling: Tailwind CSS 3.4
- Routing: React Router 6.22
- i18n: i18next 23.x
- Testing: Vitest + React Testing Library
- Linting: ESLint 9.x + Prettier 3.x

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Route-level components
├── hooks/            # Custom React hooks
├── utils/            # Helper functions & API client
├── data/             # Static data & i18n translations
├── i18n/             # Localization setup
├── index.css         # Tailwind layers and styles
└── App.tsx           # Root component
```

## Data Flow

1. User interaction → Component
2. Component → Hook (useTripsFilter, useCurrency)
3. Hook → API client (utils/api.ts)
4. API response → State update
5. State → Component re-render

## Key Patterns

- Composition: Small, focused components
- Custom Hooks: Business logic separation
- Context API: Currency provider, dark mode
- Error Boundaries: Graceful error handling
- Lazy Loading: Code splitting on routes (ready to add with React.lazy)

## Performance Strategies

- Vite for fast HMR and efficient builds
- Tree-shaking by default
- Tailwind purge for minimal CSS
- Image lazy loading (as needed)
- Debounced search (Fuse.js)

## Security Measures

- CSP, HSTS, X-Frame-Options, and related headers (`public/_headers`)
- No secrets in VITE_ variables
- Sanitized error handling in production
- Dependency scanning (Dependabot + npm audit)
- Secret scanning (Gitleaks action)

## Testing Strategy

- Unit tests: Utils, hooks, isolated components
- Integration tests: User flows, API interactions
- Coverage target: 80% statements, 70% branches
- CI uploads coverage artifacts and (optionally) lcov to Codecov

## Deployment

- Static build: `npm run build`
- Output: `dist/`
- Host: Netlify/Vercel/Cloudflare Pages
- Security headers: See `public/_headers`