# Interface System Documentation

**SNEEV — Zazie Productions** — Version 0.0.1

## Color System

All colors reference CSS custom properties defined in `src/index.css`. The palette is organized around five core hues, each with multiple roles.

### Primary Colors

| Token | Value | Hex | Usage |
|-------|-------|-----|-------|
| `--color-void` | `#050008` | `#050008` | Background, base dark |
| `--color-blood` | `#c41e3a` | `#c41e3a` | Headers, error states, accent |
| `--color-acid` | `#39ff14` | `#39ff14` | Active states, terminals, alerts |
| `--color-uv` | `#9d4edd` | `#9d4edd` | Informational, secondary accent |
| `--color-parchment` | `#d4c4a8` | `#d4c4a8` | Dossier backgrounds, stamps |

### Derived Colors

| Token | Value | Hex | Usage |
|-------|-------|-----|-------|
| `--color-blood-dim` | `#7a0f22` | `#7a0f22` | Subtle borders, disabled states |
| `--color-acid-dim` | `#1a8a0a` | `#1a8a0a` | Muted acid, disabled acid |
| `--color-uv-glow` | `#c77dff` | `#c77dff` | Glow effects, highlights |
| `--color-ash` | `#1a1218` | `#1a1218` | Secondary background, panels |

### Semantic Usage

- **`void`**: Page background, card bases. Never used for text on its own.
- **`blood`**: Critical signals, header borders, error text, interactive states on hover. Represents the "critical" or "restricted" designation.
- **`acid`**: Active commands, terminal output, success/warning states, sigil geometry. The "primary interactive" color.
- **`uv`**: Informational secondary accents, hover states for non-critical elements. Represents the "mystical/observational" layer.
- **`parchment`**: Dossier panel backgrounds, stamp textures, redaction overlays. Evokes the feel of aged document paper.

## Typography

Two font families are defined as CSS custom properties in `src/index.css`:

### `--font-mono: "IBM Plex Mono", "Share Tech Mono", ui-monospace, monospace`

Used for:
- Terminal output and input
- Map node labels
- Dossier IDs and status tags
- Sigil IDs in the registry
- Help command text
- All monospaced contexts

### `--font-ritual: "Cinzel", serif`

Used for:
- Page headers (`<h1>`)
- Sigil names and meanings
- Dossier codenames
- Clip stamp labels (rotated -12deg)
- Section headers in the design system

### Font Sizes (Tailwind utility classes)

| Class | Approx. Size | Context |
|-------|-------------|---------|
| `text-xs` / `text-[8px]` | 8px | Status tags, small labels |
| `text-sm` / `text-[10px]` | 10px | Dossier metadata, sidebar info |
| `text-base` / `text-[11px]` | 11px | Terminal log lines |
| `text-[12px]` | 12px | Boot sequence lines |
| `text-[9px]` | 9px | Corn field glyphs, legend text |
| `text-[10px]` | 10px | Sigil registry descriptions |
| `text-[11px]` | 11px | Panel window body text |
| `text-xs` | Extra small | Metadata timestamps |

### Text Shadow Effects

Three text shadow presets are used throughout:

- **`text-shadow-acid`**: `0 0 8px #39ff14, 0 0 20px rgba(57, 255, 20, 0.3)` — acid glow, sigil labels
- **`text-shadow-blood`**: `0 0 8px #c41e3a, 0 0 20px rgba(196, 30, 58, 0.4)` — blood glow, critical headers
- **`text-shadow-uv`**: `0 0 8px #9d4edd, 0 0 20px rgba(157, 78, 221, 0.4)` — uv glow, informational highlights

## Spacing and Grid

The spacing scale is based on 8px increments, consistent with the Tailwind CSS framework default.

### Margin / Padding Utilities

| Utility | Value | Usage |
|---------|-------|-------|
| `px-2` | 8px | Inline button padding |
| `px-3` | 12px | Panel header horizontal padding |
| `py-1` | 4px | Vertical padding for inline elements |
| `py-2` | 8px | Panel header vertical padding |
| `py-3` | 12px | Panel body padding |
| `py-4` | 16px | Section padding |
| `px-2 py-1.5` | 8px × 6px | Dossier connection buttons |
| `px-1.5 py-0.5` | 6px × 4px | Sigil activation rite text |

### Grid System

The main application layout uses a 12-column grid (Tailwind's default):

- `col-span-12` → full width
- `col-span-7` → 7/12 width
- `col-span-5` → 5/12 width
- `col-span-4` → 4/12 width (one-third)
- `col-span-3` → 3/12 width (one-quarter)
- `row-span-2` → height spanning 2 grid rows

Example from `App.tsx`:
- Terminal: `col-span-12 md:col-span-5 lg:col-span-4` (full on mobile, 5/12 at md, 4/12 at lg)
- Conspiracy Map: `col-span-12 md:col-span-7 lg:col-span-5`
- Sigil Registry: `col-span-12 sm:col-span-6 lg:col-span-3`

### Offsets and Offsets

- `md:ml-2` → negative margin-left at medium breakpoint
- `lg:-ml-2` → negative margin-left at large breakpoint (used to shift sigil registry right)

## Interface Hierarchy

The UI follows a nested panel hierarchy, each panel being independently animated and styled.

### PanelWindow (Top Level)

- Background: `rgba(5, 0, 8, 0.92)` with blur
- Border: 1px solid `--color-blood-dim`
- Box shadow: multiple layers (inset glow, offset blur, primary glow)
- Header: Gradient overlay, title, close/minimax buttons
- Body: Padding, auto-scrolling content area

### States and Glows

Each `<PanelWindow>` can receive a `glow` prop: `'blood'` | `'acid'` | `'uv'`

| Glow Token | Box Shadow | Usage |
|------------|------------|-------|
| `blood` | `0 0 30px rgba(196, 30, 58, 0.25)` | Critical / error panels |
| `acid` | `0 0 30px rgba(57, 255, 20, 0.15)` | Active / primary panels |
| `uv` | `0 0 30px rgba(157, 78, 221, 0.2)` | Informational / secondary |

### Panel Window States

- **Default**: Solid border, subtle shadow
- **Hover**: Border changes to `--color-blood`, subtle animation (`bleed` keyframe)
- **Active/Selected**: Glow prop applied, border color matches glow type

### Sub-Components within Panels

- **Terminal**: Monospaced font, color-coded lines (acid for output, blood for warnings, uv for ambient)
- **Conspiracy Map**: SVG graph with node colors by type (site: blood, entity: uv, event: acid, artifact: purple, corn: amber)
- **DossierPanel**: Status stamp, redaction markers (████), connection cross-references
- **Evidence Board**: Cork texture, string connections, pinned notes with rotated positions
- **SigilRegistry**: Grid of sigil buttons, detail panel with geometry and activation rite

## Motion System

All motion is handled by `framer-motion` 12. The project uses three animation categories:

### 1. Boot Sequence Stagger

- 11 lines animate sequentially
- Each line: `initial={{ opacity: 0, x: -10 }}` → `animate={{ opacity: 1, x: 0 }}`
- Transition: `duration: 0.6`, with `setTimeout` delays of `280 + Math.random() * 200ms`
- Final: `setTimeout(onComplete, 800)` after all lines visible

### 2. Panel Window Entry

- Each panel has `delay={0.1 + i * 0.1}` (i = index, 0.1s increment)
- Entry: `initial={{ opacity: 0, y: 20, scale: 0.96 }}` → `animate={{ opacity: 1, y: 0, scale: 1 }}`
- Transition: `duration: 0.5, ease: 'easeOut'`
- `AnimatePresence mode="wait"` prevents race conditions

### 3. Sigil Rotation

- **Primary** (`sigil-spin`): `rotate: 360` over 30s, `repeat: Infinity, ease: 'linear'`
- **Blade** (`sigil-spin-reverse`): Continuous rotation, 60s period
- **Witness**: Individual circle flicker with `flicker` keyframe (5s infinite)
- **Ouroboros**: Text `SNEEV` rotates 360deg; 5 small ellipses orbit with offset angles

### 4. Glitch Animation

- `glitch-text` class applies two infinite animations:
  - `glitch-flash`: 4s keyframe alternating opacity and text-shadow combinations
  - `glitch-skew`: 8s keyframe alternately skewing text -2deg → 2deg
- Triggered when `glitchActive` state is true in `App.tsx`

### 5. String Connections (Evidence Board)

- Lines animate with `flicker` keyframe (3s infinite)
- Dots have `float-drift` animation (6s ease-in-out infinite)
- Notes rotate by individual angles: `[-3, 2, -1, 4, -2]` degrees

### 6. Scanlines

- `scanlines` class: `repeating-linear-gradient` fixed overlay with 4px black stripes on transparent
- Continuous animation via `static-noise` keyframe (0.2s steps(4) infinite)

### Accessibility: prefers-reduced-motion

All framer-motion animations should respect the `prefers-reduced-motion` media query. Currently, no explicit media query guard is in place — this is a known technical compromise for the aesthetic animation style. If a user enables reduced motion, the animations may still play. A future improvement would wrap all `motion` components with a reduced-motion fallback.

## Iconography

All icons are from `lucide-react` 0.577:

| Icon | Package | Usage |
|------|---------|-------|
| `X` | lucide-react | Panel window close button |
| `Minus` | lucide-react | Panel window minimize |
| `Square` | lucide-react | Panel window context menu |
| `Terminal` | lucide-react | Terminal command input hint |
| `Corn` | lucide-react (implied) | Not yet used — corn symbolism is expressed through imagery |
| `Monitor` | lucide-react | Not yet used |

The project does not use a custom icon set; all SVG icons come from lucide-react for consistency and accessibility.

## Responsive Behavior

| Breakpoint | Class Prefix | Layout Changes |
|------------|-------------|----------------|
| `sm` | `sm:` | Minimum width 640px; sigil registry changes from full-width to `md:flex-row`; grid columns adjust |
| `md` | `md:` | Minimum width 768px; terminal shifts from `col-span-12` to `col-span-12 md:col-span-5`; map shifts to `col-span-7`; panels reflow |
| `lg` | `lg:` | Minimum width 1024px; terminal to `col-span-4`; map to `col-span-5`; sigil registry to `col-span-3`; offsets apply (`lg:-ml-2`) |

The corn field background and sigil registry adapt their layout between mobile and desktop, but the core terminal, map, and dossier components reflow responsively through the 12-column grid system.

## State Colors

| State | Color Token | Usage |
|-------|-------------|-------|
| ACTIVE | `text-acid` | Dossier status, active button state |
| CORRUPTED | `text-uv-glow` | Corrupted dossier status, corrupted map links |
| REDACTED | `text-blood-dim` | Redacted dossier body text |
| BURNED | `text-blood` | Burned dossier status |
| SEALED | `text-uv` | Sealed dossier status |
| INACTIVE | `text-acid/60` / `text-acid/50` | Hover states, disabled buttons |

## Control Conventions

### Terminal Input

- Prefix: `root@sneev:~$` (blood-colored)
- Cursor: Acid-blinking `_` (`.terminal-cursor`)
- Input background: `rgba(0, 0, 0, 0.6)` with blood-dim border
- On focus: Border changes to `--color-acid`, subtle glow shadow

### Button Interactions

- Hover: Scale 1.05 (framer-motion `group-hover:scale-150`), border color change
- Active: No disabled state by default; buttons are always interactive
- Focus: Outline removed, border-color change via `--color-acid` or `--color-blood`

### Checkbox/Radio (none used currently)

- No form controls beyond terminal input and buttons
- If added, would follow the `--color-acid` on `--color-void` contrast pattern

## Visual Language Summary

| Aspect | Description |
|--------|-------------|
| **Overall Aesthetic** | Occult hacker / forbidden archive / digestive system of knowledge |
| **Color Philosophy** | Dark void as canvas; acid as the "life" / active principle; blood as warning/critical; uv as mystical/observational; parchment as the medium (paper) |
| **Typography Philosophy** | Monospace for the "interface" (terminal, data); serif for the "narrative" (headings, codenames, stamps) |
| **Motion Philosophy** | Staggered reveals (archive is revealed gradually); looped rotations (the never-ending archive); glitch as ontology (the system's true state) |
| **Imagery Philosophy** | Corn (Zea mays) as central metaphor — each kernel a sealed eye; agricultural imagery as computational substrate; archive as field / farm / harvest |
| **Interaction Philosophy** | Terminal commands as "nutrients"; user attention as the driving force; the archive "digests" the user |

## Design Tokens (CSS Custom Properties)

Defined in `src/index.css` under the `@theme` block:

```css
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
```

These tokens are referenced throughout the Tailwind CSS configuration and component class names. New components should reference these tokens rather than hardcoding hex values.