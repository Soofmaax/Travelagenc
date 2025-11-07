# Contributing Guide

## Development Setup

1. Fork and clone
2. Install dependencies: `npm install`
3. Copy environment: `cp .env.example .env`
4. Run dev server: `npm run dev`

## Code Standards

- Style: Prettier (runs on commit via Husky)
- Linting: ESLint (must pass in CI)
- Types: TypeScript strict mode
- Tests: Required for new features (min 80% coverage statements, 70% branches)

## Commit Convention

We use Conventional Commits:
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation only
- `style:` formatting, missing semi-colons, etc.
- `refactor:` code change that neither fixes a bug nor adds a feature
- `test:` adding tests
- `chore:` updating build tasks, package manager configs, etc.

## Pull Request Process

1. Create a feature branch: `git checkout -b feat/my-feature`
2. Make changes with tests
3. Ensure CI passes: `npm run lint && npm run typecheck && npm run test:coverage`
4. Update documentation if needed
5. Submit PR with clear description
6. Wait for review (48h response time)

## Testing

```bash
npm run test              # Run tests
npm run test:coverage     # With coverage
```

Minimum coverage: 80% statements, 70% branches

## Code Review Checklist

- [ ] Tests pass locally and in CI
- [ ] Coverage meets threshold
- [ ] No ESLint/TypeScript errors
- [ ] Documentation updated
- [ ] Commit messages follow convention
- [ ] No secrets or sensitive data