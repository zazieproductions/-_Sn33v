# Development Setup

**SNEEV v0.0.1** — Zazie Productions

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | `^22` | Used by `nvm` or `n` version manager; verified with `node -v` |
| npm | `^10` | Comes with Node.js; `npm --version` verifies |
| Git | `^2.40` | For cloning and branch operations |
| GitHub CLI (optional) | `^2.60` | For `gh` commands (deploy, issue creation) |

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/zazieproductions/-_Sn33v.git

# 2. Change directory
cd -_Sn33v

# 3. Install exact dependencies
npm ci

# 4. Start development server
npm run dev
```

The application should open at `http://localhost:5173`. The boot sequence will play automatically on first load.

## Environment Variables

The project uses Vite with environment prefix `VITE_` and `NEXT_PUBLIC_`. No environment variables are currently required for runtime.

However, the following are defined in `index.html` and may be referenced:

| Variable | Source | Usage |
|----------|--------|-------|
| (none currently) | — | No `VITE_` or `NEXT_PUBLIC_` env vars are used in the current codebase |

### Creating an Environment File (if needed)

If future features require environment variables (e.g., API keys, feature flags), create `.env` in the root:

```env
VITE_YOUR_VARIABLE=value
```

Then access in code via `import.meta.env.VITE_YOUR_VARIABLE`.

**Do not commit `.env` files containing secrets** — add to `.gitignore` if necessary.

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start development server with HMR at `localhost:5173` |
| `build` | `tsc -b && vite build` | Type-check + produce production build in `dist/` |
| `lint` | `eslint .` | Lint all `.ts` and `.tsx` files |
| `preview` | `vite preview` | Preview production build locally (port 4173 by default) |
| `typecheck` | `npx tsc --noEmit` | Type-check without building |

## Local Development Workflow

### 1. Start the server

```bash
npm run dev
```

The dev server starts Vite with the React plugin and TailwindCSS JIT. Hot Module Replacement (HMR) is enabled — changes to `.tsx` or `.css` files are reflected in the browser without full reload.

### 2. Make changes

- Edit `.tsx` files to modify components
- Edit `.ts` data files to add/modify archive data
- Edit `index.css` to update design tokens (CSS custom properties)
- Edit `App.tsx` to modify UI structure or state variables

### 3. Verify changes

```bash
# Type-check
npx tsc --noEmit

# Lint
npm run lint

# Build
npm run build

# Preview production build
npm run preview
```

### 4. Commit changes

```bash
git add .
git commit -m "feat: descriptive commit message"
git push origin arena/01a0656f-sn33v
```

## Project Structure (Development-Focused)

```
src/
├── App.tsx              # Main composition component
├── main.tsx             # Entry point (createRoot render)
├── index.css            # Design tokens + base styles (Tailwind @theme)
├── components/          # UI components
│   ├── boot/            # BootSequence.tsx
│   ├── terminal/        # Terminal.tsx
│   ├── map/             # ConspiracyMap.tsx
│   ├── panel/           # PanelWindow.tsx
│   ├── registry/        # SigilRegistry.tsx
│   ├── evidence/        # EvidenceBoard.tsx
│   └── animsigil/       # AnimatedSigil.tsx
├── data/                # Embedded archive (archive.ts)
│   ├── Dossier interface
│   ├── SigilEntry interface
│   ├── MapNode interface
│   ├── dossiers[] (7 records)
│   ├── sigils[] (5 entries)
│   ├── mapNodes[] (11 entries)
│   ├── SNEEV_MANIFESTO (6 lines)
│   ├── terminalLogs (8 lines)
│   ├── helpCommands (11 entries)
│   └── redactedNotes (5 entries)
└── types/               # TypeScript type definitions (may be merged into archive.ts)

docs/
├── architecture/        # ARCHITECTURE.md
├── design/              # Design system documentation
├── technical/           # Subsystem docs (audio, rendering, data-flow)
└── development/         # This directory — setup, debugging, deployment

public/
├── images/              # Screenshots and social preview (to be created)
└── favicon.svg (if needed)

.github/
├── workflows/           # GitHub Actions (deploy-pages.yml)
├── ISSUE_TEMPLATE/      # bug_report.md, feature_request.md
└── pull_request_template.md

package.json             # Scripts + dependencies
package-lock.json        # Exact dependency hashes
tsconfig.app.json        # TypeScript config for app build
tsconfig.json            # Root TypeScript config
tsconfig.node.json       # TypeScript config for Node deps
vite.config.ts           # Vite configuration
```

## Debugging

### Common Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| Boot sequence doesn't complete | `setBooted` not triggered | Check that `onComplete={handleBoot}` is passed to `<BootSequence>` |
| Terminal commands produce 'Unknown command' | Typo or unrecognized cmd | Type `HELP` to see available commands; check `processCommand` switch in App.tsx |
| Conspiracy map doesn't render | Missing `mapNodes` prop | Ensure `src/data/archive.ts` exports `mapNodes` |
| Sigil registry shows no detail | `active` state not changing | Check `setActive(i)` on button onClick in SigilRegistry |
| Glitch state doesn't activate | `triggerGlitch` not called | Check `INVOKE` button onClick or `n11` map node click |
| Color appears wrong | CSS custom property not defined | Verify `--color-acid`, `--color-blood`, `--color-void` in `src/index.css` |
| Corn field not responsive | Window resize not handled | The corn field recalculates on `window.innerWidth` change via `useEffect` |

### Enabling Debug Mode

No debug flag is currently exposed. To inspect the React tree:

```bash
# Open browser dev tools
# React DevTools extension recommended
# Check the components panel for:
# - bootActive state
# - glitchActive state
# - activeDossier value
# - manifestoIdx value
```

### Lint Errors

Run `npm run lint` to check for ESLint issues. Common fixes:

- Missing `useCallback` dependencies
- JSX props not matching expected types
- Tailwind class ordering (project-specific convention)

### Production vs Development Differences

| Feature | Development (`npm run dev`) | Production (`npm run build`) |
|---------|---------------------------|------------------------------|
| Boot sequence | Auto-plays on every mount | Same |
| Ambient terminal logs | Rotating every 3s (random fragments) | Disabled — only command/result pairs |
| Panel animations | framer-motion with full styles | Same (minified class names) |
| SVG animations | framer-motion `animate` props | Same (inline motion values) |
| CSS | Full `@theme` block + all utility classes | Purified (only used classes) |
| Font loading | Google Fonts with preconnect | Same |
| Source maps | Enabled (`vite sourceMap: true`) | Disabled for production |
| Bundle analyzer | Not enabled | `vite-bundle-analyzer` optional |

## Code Conventions

### TypeScript

- All `.tsx` files use strict TypeScript
- Interface definitions live in `src/data/archive.ts` (shared across components)
- Component props are fully typed; no untyped `any` types unless absolutely necessary
- `React.Node` used for children props where appropriate

### Component Style

- Functional components only (no class components)
- All components named with PascalCase (e.g., `Terminal`, not `terminal`)
- `export function` syntax, not `const Terminal = () => {}`
- Early returns preferred over nested if/else

### CSS / Tailwind

- Design tokens referenced via `var(--color-name)` CSS custom properties
- Tailwind v4 utility-first styling
- No custom CSS beyond the `index.css` `@theme` block and keyframe animations
- Component-specific styles kept in `index.css` (global by nature of CSS); no CSS-in-JS

### Commit Messages

Follow the conventional commit format:

```
<type>: <subject>

<body>?

<footer>?

Types:
- feat: new feature
- fix: bug fix
- doc: documentation update
- style: aesthetic/refactoring change (no functional impact)
- chore: structural change (build, config, directory)
- refactor: internal reorganization without behavior change
- test: test addition or correction
```

Example:
```
feat: add UNLOCK command to increase archive integrity

The UNLOCK [key] command allows users to attempt to increase the archive
integrity display in the header. Currently a placeholder — always returns
integrity +1% message regardless of key value.

See ROADMAP.md for planned improvements.
```

## Testing

### Manual Verification Checklist

- [ ] `npm ci` installs dependencies without errors
- [ ] `npx tsc --noEmit` passes with no type errors
- [ ] `npm run lint` passes with no lint errors
- [ ] `npm run build` completes successfully (produces `dist/`)
- [ ] `npm run preview` serves the production build at `localhost:4173`
- [ ] Boot sequence plays on first load (11 lines, ~3.5s total)
- [ ] Terminal accepts commands: HELP, CLEAR, SCAN, DOSSIER, SIGIL, LISTEN, CORN, WHOAMI, SNEEV
- [ ] Glitch state toggles when INVOKE button clicked or map node n11 clicked
- [ ] Conspiracy map node hover/highlight works
- [ ] Dossier selection from archive index works
- [ ] Sigil registry selection changes displayed variant
- [ ] Corn field responds to mouse movement
- [ ] Footer text displays correctly at mobile/desktop breakpoints
- [ ] `prefers-reduced-motion` — animations may still play (known compromise)

### Automated Checks (planned)

- [ ] Add Playwright smoke tests for critical UI interactions
- [ ] Add type-check step to CI pipeline
- [ ] Add lint step to CI pipeline
- [ ] Add build verification step to CI pipeline

## Deployment

### GitHub Pages Deployment

The project is configured for GitHub Pages deployment at:

```
https://zazieproductions.github.io/-_Sn33v/
```

Deployment is triggered by pushing to the `main` branch. See `.github/workflows/deploy-pages.yml` for the full workflow.

### Local Preview of Production Build

```bash
npm run build    # produces dist/
npm run preview  # serves dist/ at localhost:4173
```

Verify that:
- All assets load correctly
- The boot sequence plays
- Terminal commands work
- The live project URL is correct in the header

### Manual Deployment Steps

```bash
# 1. Ensure local build is clean
npm run build

# 2. Deploy to gh-pages branch
npx gh-pages -d dist

# 3. Or use GitHub Actions (automatic on push to main)
#    See .github/workflows/deploy-pages.yml
```

### Post-Deployment Verification

After deployment:

- [ ] Open `https://zazieproductions.github.io/-_Sn33v/`
- [ ] Verify README screenshot is clickable and opens the app
- [ ] Verify terminal commands work in production
- [ ] Verify glitch state triggers correctly
- [ ] Verify conspiracy map renders
- [ ] Verify dossier selection works
- [ ] Verify sigil registry renders correctly
- [ ] Check that favicon/icon appears in browser tab
- [ ] Confirm no console errors in dev tools

## Git Branch Information

- **Current branch**: `arena/01a0656f-sn33v` (this session's working branch)
- **Base branch**: `main`
- **Deployment branch**: `main` (GitHub Actions deploys from `main`)
- **Never push to `main` directly from a feature branch** — use pull requests

To deploy a new version:

```bash
# Ensure you're on arena/01a0656f-sn33v
git checkout arena/01a0656f-sn33v

# Make and commit changes

# Push the branch
git push origin arena/01a0656f-sn33v

# Open a pull request from arena/01a0656f-sn33v to main
# The GitHub Actions workflow will auto-deploy on merge to main
```

## Package Scripts Reference

Full list from `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

All scripts are defined at the root level — no per-package scripts in subdirectories.

## Known Developer Experiences

| Issue | Workaround |
|-------|------------|
| No reduced-motion guard | Acceptable for v0.0.1; add in future |
| No persistent session data | Archive resets on reload — intentional |
| Glitch text not screen-reader friendly | Decorative by design; not intended for SA contexts |
| Map node label click search is substring-only | No fuzzy matching — type full codename or partial match |
| Terminal auto-scroll may jump on ambient log rotation | Known behavior; `bottomRef` scrolls to latest line |
| Google Fonts may require network access | Offline development may show fallback monospace |