# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Security policies (SECURITY.md)
- Contributing guidelines (CONTRIBUTING.md)
- Code of conduct (Contributor Covenant 2.1)
- Automated security scanning (Dependabot, npm audit, Gitleaks)
- Architecture overview (ARCHITECTURE.md)
- Security headers for deployment (`public/_headers`)

### Changed
- Logger integrates with monitoring providers (Sentry opt-in via env)
- ErrorBoundary uses centralized logger and avoids detailed stacks in production
- CI pipeline includes security scans and artifacts

### Security
- Added CSP, HSTS, X-Frame-Options and other headers via `public/_headers`
- Implemented secret scanning in CI
- Added Dependabot for automated dependency updates

## [1.0.0] - 2025-01-01

### Added
- Initial release
- React 18 + Vite 5
- Internationalization (FR/EN)
- Dark mode
- Trip catalog with search and filters
- Responsive design with Tailwind CSS