# Project configuration guide

Centralized settings and how to customize this template.

## Branding

- File: `src/config/site.ts`
- Keys:
  - `brandName`: displayed in Navbar, Footer
  - `contact`: `phone`, `email`, `address`
  - `socials`: `facebook`, `twitter`, `instagram`

Update these values to tailor the template to your organization.

## Environment variables (Vite)

Client-exposed variables must be prefixed with `VITE_`:

- `VITE_API_URL`: base URL for API client (`src/utils/api.ts`)
- `VITE_SENTRY_DSN`: optional DSN for Sentry reporting

Important: variables prefixed `VITE_` are embedded into the client bundle — do not put secrets here. See `SECURITY.md`.

## Security headers (CSP)

- File: `public/_headers`
- Contains hardened Content Security Policy and security headers (HSTS, X-Frame-Options, Permissions-Policy, etc.).
- If you use Google Fonts, the CSP includes `fonts.gstatic.com` and `fonts.googleapis.com`. Prefer self-hosting fonts if possible to simplify CSP.

## i18n

- Directory: `src/i18n/`
- Libraries: `i18next`, `react-i18next`, with browser language detector.
- Extend locales and translations here as needed.

## Testing

- Unit tests: Vitest + Testing Library under `src/**/__tests__`.
- E2E tests: Playwright in `tests/e2e/`, configured via `playwright.config.ts`.
- Coverage thresholds are enforced in `vitest.config.ts`.

## CI

- Workflow: `.github/workflows/ci.yml` (Quality & Security CI)
- Jobs:
  - `checks`: Prettier auto-fix (PR only), lint, types, unit tests (+coverage), Codecov on push
  - `security`: gitleaks, trufflehog, npm audit, madge (circular deps), jscpd (duplication), cloc
  - `codeql`: static code analysis
  - `build`: bundle size reporting + gate + visualizer
  - `e2e`: Playwright tests on preview server

Adjust thresholds and job steps as needed.