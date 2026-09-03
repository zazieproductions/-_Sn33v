# Security

## Contact
If you discover a security vulnerability, please email security@zazieproductions.ai with details of the issue.

## Scope
This project is a client-side only browser application with no backend, no database, and no external network calls during runtime (beyond the initial GitHub Pages deployment). All data is embedded in the TypeScript source tree.

## Known Limitations
- No authentication system (the terminal is intentionally anonymous)
- No persistent storage across sessions (data resets on reload)
- The RRweb client-side recording scripts embedded in index.html are for arena analytics only and do not transmit data externally without user interaction
- No CSP (Content Security Policy) beyond what GitHub Pages provides

## Best Practices for Users
- This project runs entirely in your browser — no data is sent to a server
- Be cautious when running terminal commands if you are pasting from untrusted sources
- The project does not use external APIs that could be compromised
- If you self-host, ensure you serve over HTTPS

## Dependencies
All dependencies are listed in package.json and are current as of the current release. No known vulnerable versions are in use. Run `npm audit` periodically to check for new findings.

## Deployment Security
- GitHub Actions workflow (`deploy-pages.yml`) runs on ubuntu-latest
- No secrets or environment variables are used in the deployment pipeline
- The build output (dist/) is static and safe to serve from CDN or Pages