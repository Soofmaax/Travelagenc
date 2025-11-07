# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | ✅                  |

## Reporting a Vulnerability

DO NOT open public issues for security vulnerabilities.

Please report security vulnerabilities to: security@your-domain.example

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

Response timeline:
- Initial response: 48 hours
- Status update: 7 days
- Fix timeline: 30 days for CRITICAL, 90 days for others

## Security Measures

This project implements:
- Automated dependency scanning (Dependabot)
- npm audit in CI/CD
- Secret scanning (Gitleaks)
- Security headers (CSP, HSTS, X-Frame-Options)
- No secrets in environment variables exposed to client

## Environment Variables

CRITICAL: Never put secrets in `VITE_*` variables as they are exposed in the client bundle.

Safe for VITE_:
- Public API URLs
- Feature flags
- Public analytics IDs

Never in VITE_:
- API keys/secrets
- Database credentials
- Private tokens
- Encryption keys

Use a backend/edge function for sensitive operations.