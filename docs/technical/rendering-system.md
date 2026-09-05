# Rendering System Documentation

**SNEEV v0.0.1** — Zazie Productions

## Overview

The rendering pipeline is composed of React 19 with StrictMode, CSS-styled components, and framer-motion 12 animations. The system renders to a single `div#root` element, with all visual output derived from the component tree and CSS custom properties.

## Rendering Architecture

### Root Component Tree

```
<App>
  ├─ <BootSequence> (unmounts after completion)
  ├─ <Header> (fixed, always visible)
  │   ├─ <AnimatedSigil size=28 variant="primary" />
  │   ├─ <h1>SNEEV</h1>
  │   ├─ <p>Forbidden Research Terminal // Archive Integrity: 12%</p>
  │   └─ <div>LIVE FEED NODE-███ Ω-CLEARANCE</div>
  │
  └─ <Main> (grid layout, fills remaining viewport)
       ├─ <PanelWindow> (x12 grid, staggered entry)
       │   ├─ <Terminal />
       │   ├─ <ConspiracyMap />
       │   ├─ <SigilRegistry />
       │   ├─ <DossierPanel />
       │   ├─ <Archive Index>
       │   ├─ <Evidence Board />
       │   └─ <Celestial / Corn Overlay>
       └─ <Footer> (fixed, always visible)
```

### CSS Architecture

All styling is authored in `src/index.css` with TailwindCSS 4 JIT framework. The CSS custom properties (CSS variables) are defined in an `@theme` block:

```css
@theme {
  --color-void: #050008;
  --color-blood: #c41e3a;
  --color-blood-dim: #7a0f22;
  --color-acid: #39ff14;
  --color-acid-dim: #1a8a0a;
  --color-uv: #9d4edd;
  --color-uv-glow: #c77dff;
  --color-ash: #1a1218;
  --color-parchment: #d4c4a8;
  --font-mono: "IBM Plex Mono", "Share Tech Mono", ui-monospace, monospace;
  --font-ritual: "Cinzel", serif;
  --font-terminal: "Share Tech Mono", monospace;
}
```

The `html, body, #root` block sets the foundation:

```css
html, body, #root {
  margin: 0;
  padding: 0;
  min-height: 100%;
  background: var(--color-void);
  color: var(--color-acid);
  font-family: var(--font-mono);
  overflow-x: hidden;
}
```

### Layered Visual Effects

The application composits multiple fixed-position layers:

| Layer | z-index | Description |
|-------|---------|-------------|
| `scanlines` | 9998 | Repeating gradient overlay simulating CRT scanlines |
| `crt-vignette` | 9997 | Radial gradient darkening at screen edges |
| `noise-overlay` | 9996 | SVG-based fractal noise with animation |
| `App` content | 9999-10000 | Main application UI (panels, terminal, map) |
| `glitch-text` | N/A | Text distortion effect ( toggled class) |

### Key CSS Classes and Their Functions

#### `.glitch-text`

Applied to the header `<h1>` when `glitchActive` state is true in `App.tsx`.

```css
.glitch-text {
  animation: glitch-flash 4s infinite, glitch-skew 8s infinite;
}
```

Two keyframe animations:

- `glitch-flash`: 4s infinite alternation of opacity and text-shadow combinations across acid/blood/uv colors
- `glitch-skew`: 8s infinite skew animation alternating between -2deg and +2deg

#### `.scanlines`

Fixed-position overlay with repeating linear gradient:

```css
.scanlines::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.12) 2px,
    rgba(0, 0, 0, 0.12) 4px
  );
}
```

No animation keyframe by default — the gradient is static. If a animated scanline effect is desired, the `static-noise` keyframe could be applied.

#### `.crt-vignette`

Fixed-position radial gradient darkening at edges:

```css
.crt-vignette::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9997;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.7) 100%);
}
```

#### `.noise-overlay`

Fixed-position fractal noise SVG pattern:

```css
.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9996;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,..."); /* filtured fractal noise */
  animation: static-noise 0.2s steps(4) infinite;
}
```

#### `.panel-window`

The base panel style:

```css
.panel-window {
  background: rgba(5, 0, 8, 0.92);
  border: 1px solid var(--color-blood-dim);
  box-shadow:
    0 0 0 1px rgba(157, 78, 221, 0.2),
    0 8px 32px rgba(0, 0, 0, 0.8),
    inset 0 0 40px rgba(196, 30, 58, 0.05);
  backdrop-filter: blur(4px);
}
```

Additional styles on hover:

```css
.panel-window:hover {
  border-color: var(--color-blood);
  animation: bleed 2s ease-in-out infinite;
}
```

#### `.terminal-cursor`

Blinking cursor in the terminal input:

```css
.terminal-cursor::after {
  content: "█";
  animation: type-cursor 1s step-end infinite;
  color: var(--color-acid);
  margin-left: 2px;
}
```

Keyframe:

```css
@keyframes type-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

#### `.sigil-spin`

Applied to the primary sigil SVG:

```css
.sigil-spin {
  animation: rotate-sigil 40s linear infinite, pulse-glow 3s ease-in-out infinite;
}
```

Keyframes:

```css
@keyframes rotate-sigil {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-glow {
  0%, 100% { filter: drop-shadow(0 0 4px var(--color-acid)); }
  50% { filter: drop-shadow(0 0 16px var(--color-acid)) drop-shadow(0 0 32px var(--color-uv)); }
}
```

#### `.float-drift`

Applied to evidence board notes:

```css
.float-drift {
  animation: float-drift 6s ease-in-out infinite;
}
```

Keyframe:

```css
@keyframes float-drift {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(4px, -6px); }
  50% { transform: translate(-3px, 3px); }
  75% { transform: translate(5px, 4px); }
}
```

## Component Rendering Pattern

### PanelWindow

Each `<PanelWindow>` renders as:

```html
<div class="panel-window">
  <div class="panel-header">
    <span>
      <span class="inline-block w-2 h-2 rounded-full bg-blood animate-pulse" />
      {title}
    </span>
    {/* status + close/minimize buttons */}
  </div>
  <div class="p-3 overflow-auto max-h-full">{children}</div>
</div>
```

Animation (framer-motion):

```jsx
<motion-div
  initial={{ opacity: 0, y: 20, scale: 0.96 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.5, delay, ease: 'easeOut' }}
  className="panel-window {glowClass} {className}"
>
```

The `AnimatePresence` wrapper from framer-motion coordinates entry/exit ordering.

### Terminal

The `<Terminal>` component renders a monospaced font div with color-coded lines:

```html
<div class="font-terminal text-[11px] leading-relaxed">
  <div class="text-acid/90">> LOG ENTRY</div>
  <div class="text-blood">> WARNING: Archive integrity at 12%</div>
  <div class="text-uv-glow/80">[AMBIENT] frequency lock: 47.0 Hz</div>
  <!-- ... -->
</div>
```

Input form at bottom:

```html
<form class="flex items-center gap-1 mt-2">
  <span class="text-blood text-shadow-blood">root@sneev:~$</span>
  <input type="text" class="flex-1 bg-transparent border-0 text-acid" ... />
  <span class="terminal-cursor" />
</form>
```

Color coding per line type:

| Line Prefix | CSS Class | Color |
|-------------|-----------|-------|
| `>` (command) | `text-acid` | Acid (primary interactive) |
| `>` starting with `WARNING`/`REDACTED`/`████` | `text-blood` | Blood (critical) |
| `[AMBIENT]` prefix | `text-uv-glow/80` | UV (informational) |
| Default | `text-acid/70` | Acid, dimmed |

### ConspiracyMap

The `<ConspiracyMap>` renders an SVG graph:

```html
<svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
  {/* Link lines */}
  <motion-line key={key} x1={from.x} y1={from.y} x2={to.x} y2={to.y} ... />
  
  {/* Node dots */}
  <motion-button key={node.id} class="conspiracy-node" style={{ left: `${node.x}%`, top: `${node.y}%` }}>
    <div class="w-3 h-3 rounded-full border-2" style={{ backgroundColor: typeColors[node.type] }} />
    <span>{node.label}</span>
  </motion-button>
</svg>
```

Node colors by type:

| Type | Color | CSS Custom Property |
|------|-------|---------------------|
| site | `#c41e3a` (blood) | `--color-blood` |
| entity | `#9d4edd` (uv) | `--color-uv` |
| event | `#39ff14` (acid) | `--color-acid` |
| artifact | `#c77dff` (uv-glow) | `--color-uv-glow` |
| corn | `#d4a017` (parchment/amber) | custom amber value |

### AnimatedSigil

Five variants, each with distinct SVG markup and CSS animation:

| Variant | Animation | Key Features |
|---------|-----------|--------------|
| `primary` | `rotate-sigil` (40s) + `pulse-glow` (3s) | Heptagram, 7 orbiting ellipses, SNEEV text center |
| `witness` | `rotate` (continuous) + `flicker` (5s) | 3 concentric circles, flickering center dot |
| `blade` | `rotate-sigil-reverse` (60s) | Polygon blade, 4 corner circles |
| `ouroboros` | `rotate` (30s) + `pulse-glow` (3s) | Circle with SNEEV text, 6 small orbiting ellipses |
| `primary` (registry) | Same as above | Displayed in SigilRegistry detail panel |

### CornField

Mouse-responsive generative background:

```html
<div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
  <motion-div className="absolute inset-[-5%]" style={{ x: bgX, y: bgY }} />
  <motion-div className="absolute inset-0 bg-gradient-to-b from-void via-void/60 to-void" style={{ x: midX, y: midY }} />
  {/* 8 floating corn glyphs 🌽 */}
  {/* 3 ambient orbs (blur-colored circles) */}
</div>
```

Mouse mapping:

```javascript
const bgX = useTransform(mouseX, [0, 1], ['2%', '-2%']); // mouseX → horizontal shift
const bgY = useTransform(mouseY, [0, 1], ['1%', '-1%']); // mouseY → vertical shift
```

The mouse position is normalized (`e.clientX / window.innerWidth`) and transformed to background gradient offsets, creating a subtle parallax effect.

### BootSequence

11-line animation that plays on initial mount:

```jsx
<motion-div
  exit={{ opacity: 0 }}
  transition={{ duration: 0.6 }}
  className="fixed inset-0 z-[10000] bg-void flex flex-col items-center justify-center gap-8"
>
  <AnimatedSigil size={100} variant="ouroboros" />
  <div className="font-terminal text-[12px] text-acid space-y-1 max-w-lg w-full px-6">
    {bootLines.slice(0, visibleLines).map((line, i) => (
      <motion-div
        key={i}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={line.includes('WARNING') ? 'text-blood text-shadow-blood' : ''}
      >
        {line}
        {i === visibleLines - 1 && visibleLines < bootLines.length && (
          <span className="terminal-cursor" />
        )}
      </motion-div>
    ))}
  </div>
</motion-div>
```

### Footer

Fixed bottom bar:

```html
<footer class="fixed bottom-0 inset-x-0 z-50 border-t border-blood-dim/60 bg-void/95 backdrop-blur-sm">
  <span>SNEEV://archive/threshing-floor</span>
  <span className="hidden sm:inline text-blood/50">The corn remembers what you forget</span>
  <span className="flex items-center gap-2">
    <span className="w-1 h-1 rounded-full bg-acid animate-pulse" />
    SESSION ACTIVE
  </span>
</footer>
```

The footer text uses very small type (`text-[8px]`), tracking `[0.2em]` uppercase. The middle span is hidden at `sm` breakpoint and above.

## Production Build Rendering

The `npm run build` command executes:

```bash
tsc -b && vite build
```

### tsc -b Phase

- Type-checks `src/` tree per `tsconfig.app.json` and `tsconfig.node.json`
- Emits `.js` and `.d.ts` files to a temporary `.tsx` output
- No code minification at this stage

### vite build Phase

- esbuild-powered JS minification
- TailwindCSS 4 JIT generates only used classes (purge)
- Asset hashing: `app.[hash].js`, `style.[hash].css`
- Index HTML modified to reference hashed assets
- Output to `dist/`

### Production Rendering Differences

| Feature | Development | Production |
|---------|-------------|------------|
| **Boot sequence** | Auto-plays on mount | Same |
| **Glitch state** | Manual toggle (`triggerGlitch()`) | Same |
| **Ambient logs** | Rotating every 3s in Terminal | Disabled (deterministic log only) |
| **Panel animations** | Staggered framer-motion | Same, minified class names |
| **SVG animations** | framer-motion `animate` props | Same, motion values inlined |
| **CSS** | Full `@theme` block + Tailwind JIT | Purified CSS (only used classes) |
| **Font loading** | Google Fonts preconnected | Same |
| **RWweb scripts** | Present in index.html (arena attrs) | Removed or conditional |

## Browser API Dependencies

| API | Usage |
|-----|-------|
| `document.getElementById` | Root element selection (`main.tsx`) |
| `window.innerWidth` / `window.innerHeight` | Corn field mouse normalization |
| `document.querySelector` / `.addEventListener` | Event handling across components |
| `window.matchMedia` | Not currently used (reduced-motion guard missing — known compromise) |
| `CSS.supports` | Not used |
| `requestAnimationFrame` | Not used directly; framer-motion internal |

## Accessibility Rendering Notes

- **Glitch text**: Decorative only — `glitch-text` class animates text-shadow and opacity, not meaningful content. Screen readers will read the underlying text content, but the glitch effect is visual-noise.
- **Scanlines/Vignette**: Purely decorative overlays with no impact on content perception.
- **Color coding in terminal**: Relies on color contrast (acid on void, blood on void). Users with color vision deficiency may struggle to differentiate line types based on color alone.
- **SVG icons**: All from lucide-react with accessible `aria-label` inheritance.
- **Focus outlines**: Removed in many components; re-added on `input:focus` for terminal input field.
- **Redacted text (████)**: Intentionally opaque; screen readers will read the █ characters if they announce punctuation, which is the intended behavior (redaction as content).

## Performance Rendering Model

| Metric | Target | Strategy |
|--------|--------|----------|
| **Frame rate** | > 45 FPS (animated) | framer-motion hardware-accelerated (transform opacity) |
| **Paint time** | < 10ms per frame | CSS custom properties; no canvas redraw |
| **Font repaint** | None after initial | System fonts; no web font swap after load |
| **SVG render time** | < 5ms | Static paths; no dynamic point calculation per frame |
| **Boot time** | < 4s total | 11 lines × 280ms + randomness + 800ms final delay |
| **Panel entry** | Staggered 0.1s delays | `AnimatePresence` queue; no simultaneous animations |

## Rendering Pipeline Summary

```
Component Tree (React 19)
        │
        ▼
CSS Custom Properties (var(--...))
        │
        ▼
Tailwind JIT Compilation (dev: full; prod: used-classes only)
        │
        ▼
framer-motion Animated Nodes
        │
        ▼
Layered Compositing (scanlines → noise → app → vignette)
        │
        ▼
Canvas: div#root with layered visual output
```

## Design-to-Implementation Gaps

| Design Spec | Implemented | Gap | Mitigation |
|-------------|-------------|-----|------------|
| Color palette | Yes (CSS vars) | None | Tokens documented in design system |
| Typography | Yes (font stacks) | None | Sizes documented per utility class |
| Motion system | Yes (framer-motion) | Reduced-motion guard | Known compromise; future fix |
| Glitch aesthetics | Yes (CSS class) | None | Intentional, not error |
| Responsive layout | Yes (12-grid) | None | Breakpoints documented |
| Audio integration | No (conceptual only) | Web Audio API not mounted | Planned research direction |
| Persistence | No (embedded data) | Backend/storage layer | Out of scope for v0.0.1 |

## Rendering Roadmap (Near-term)

- [ ] Add `prefers-reduced-motion` media query guard to framer-motion animations
- [ ] Implement CSS-only scanline animation (keyframe + animation property)
- [ ] Add focus-visible outlines to interactive elements (currently outline-none on inputs)
- [ ] Add `color-contrast()` function usage where Tailwind v4 supports it
- [ ] Add optional theme toggle (void/parchment color scheme switch)