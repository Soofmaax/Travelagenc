# Project health metrics

Track these indicators to monitor the health, quality and performance of the repository.

## CI

- Workflow success rate
- Average run duration
- Failed job categories (checks, security, build, e2e)

## Quality

- Test coverage (statements / lines / functions / branches)
- ESLint errors/warnings (from eslint-report.json artifact)
- Code duplication (jscpd)
- Circular dependencies (madge)

## Security

- Vulnerabilities (npm audit)
- Secret scanning alerts (Gitleaks, TruffleHog)
- CodeQL (public repos) / Semgrep (private)

## Performance

- Bundle size (dist size, gate threshold)
- Large modules (visualizer stats.html)
- Images and assets optimizations

## Process

- Time to merge (PR cycle time)
- Lead time to change
- Issues opened vs closed
- Releases per period
- Dependabot PRs merged

## Where to find them

- GitHub Actions artifacts:
  - coverage-report
  - eslint-report
  - cloc-by-file
  - bundle-stats (stats.html)
- Security tab (CodeQL) for public repositories
- CI logs for madge / jscpd / npm audit

## Thresholds (suggested)

- Coverage: statements >= 80%, lines >= 80%, functions >= 75%, branches >= 70%
- Bundle size: < 5 MB initial (adjust per project)
- ESLint errors: 0 blocking errors on main
- Vulnerabilities: high/critical = 0 on main

Adjust per project as needed.