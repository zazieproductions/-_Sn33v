# Contributing to SNEEV

Thank you for considering contributing to SNEEV! This project is maintained by Zazie Productions as a creative technology exploration.

## Lightweight Workflow

Since this is an experimental art repository, the contribution workflow is intentionally lightweight:

### 1. Fork the repository and create a feature branch
```bash
git checkout -b feature/your-feature-name arena/01a0656f-sn33v
```

### 2. Make your changes
- Preserve the SNEEV aesthetic and conceptual framework
- Maintain the TypeScript type definitions
- Keep the glitch-text and corn/agricultural symbolism coherent
- Honor the existing command set and data structures

### 3. Test your changes locally
```bash
npm ci
npm run build
npm run preview
```

### 4. Commit your changes
```bash
git commit -m "feat: descriptive commit message
```

### 5. Push to your branch
```bash
git push origin arena/01a0656f-sn33v
```

### 6. Open a Pull Request
- Use the PR template at `.github/pull_request_template.md`
- Reference any related issues
- Ensure the PR title follows the format: `type: description`
  - `feat:` new feature
  - `fix:` bug fix
  - `doc:` documentation update
  - `style:` aesthetic/refactoring change
  - `chore:` structural change

## Development Guidelines

### Conceptual Coherence
All contributions should cohere with the SNEEV universe:
- The corn (Zea mays) metaphor should remain central
- The Ω-CLEARANCE / integrity system should be consistent
- Glitch aesthetics are intentional, not accidental
- Dossier redactions and classifications follow established patterns

### Technical Standards
- TypeScript: `npx tsc --noEmit` must pass with no errors
- Lint: `npm run lint` must pass
- Build: `npm run build` must produce a successful production build
- No breaking changes to the 11-terminal command set
- New sigils/dossiers/maps must follow existing data schemas in `src/data/archive.ts`

### Aesthetic Guidelines
- Color palette: void, blood, acid, uv, parchment (extend if needed, following the system)
- Typography: Share Tech Mono, IBM Plex Mono, Cinzel (font-family stack in index.html)
- Motion: framer-motion variants with staggered delays; respect prefers-reduced-motion
- Background effects: scanlines, crt-vignette, noise-overlay are part of the established aesthetic

### Zazie Productions Attribution
Contributions should include a comment in the source indicating the contributor's interest, but all conceptual territory belongs to Zazie Productions. The project maintainer reserves the right to reject changes that do not cohere with the SNEEV conceptual framework.

## Report Issues
Use the issue templates at `.github/ISSUE_TEMPLATE/`:
- `bug_report.md` for functional bugs
- `feature_request.md` for new ideas

## License Contribution
By contributing, you agree that your contributions are released under the MIT License (see LICENSE).