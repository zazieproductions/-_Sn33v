# Data Flow Documentation

**SNEEV v0.0.1** — Zazie Productions

## Overview

All data in SNEEV is embedded in the TypeScript source tree at `src/data/archive.ts`. There are no runtime HTTP requests, no backend API calls, and no external data sources during normal operation. The entire archive (7 dossiers, 5 sigils, 11 map nodes, 6 manifesto lines, 8 terminal logs, 5 redacted notes, and 11 help commands) is defined as const assertions and exported for use by React components.

## Data Sources

### 1. `src/data/archive.ts` — Central Archive File

This single file exports the following named exports:

| Export | Type | Description | Item Count |
|--------|------|-------------|------------|
| `Dossier` | interface | Type definition for dossier records | N/A |
| `SigilEntry` | interface | Type definition for sigil records | N/A |
| `MapNode` | interface | Type definition for conspiracy map nodes | N/A |
| `SNEEV_MANIFESTO` | `string[]` | 6 philosophical assertions | 6 |
| `dossiers` | `Dossier[]` | 7 classified dossier records | 7 |
| `sigils` | `SigilEntry[]` | 5 sigil entries with geometry and activation rites | 5 |
| `mapNodes` | `MapNode[]` | 11 conspiracy map nodes with coordinates and links | 11 |
| `terminalLogs` | `string[]` | 8 initialization log lines | 8 |
| `redactedNotes` | `{id: number, text: string, stamp: string}[]` | 5 cork-board notes with stamps | 5 |
| `helpCommands` | `{cmd: string, desc: string}[]` | 11 terminal command descriptions | 11 |

All data is **immutable** — never mutated at runtime. Any "state change" (e.g., opening a dossier, triggering a glitch) is handled by React state variables in `App.tsx`; the underlying data remains constant.

### 2. Derived / Computed Data

Some UI state is computed from the primary data sources:

| Computed Value | Source Data | Calculation |
|----------------|-------------|-------------|
| `activeDossier` | `dossiers` state + `selectDossier(id)` | `dossiers.find(d => d.id === id)` |
| `manifestoIdx` | `SNEEV_MANIFESTO` + `glitchActive` | Cycles `(i + 1) % SNEEV_MANIFESTO.length` on each glitch trigger |
| `sigilActiveIdx` | `sigils` state + SigilRegistry selection | `useState(0)` initially; changes on button click in registry |
| `glitchActive` | `App` state + `triggerGlitch()` | `setGlitchActive(true)` + manifesto cycle + `setTimeout(setGlitchActive(false), 400)` |
| `listening` | `Terminal` state + `LISTEN` command | `useState(false)`; toggled by `LISTEN` command |
| `terminalLines` | `terminalLogs` + command history | `useState<string[]>([...terminalLogs])` with appended command/result pairs |

### 3. Event-Driven State Updates

The primary data flow is **command → state → UI re-render**:

```
User Types Command
        │
        ▼
processCommand(raw: string) in App.tsx
        │
        ├── Parses cmd = raw.trim().toUpperCase().split(/\s+")[0]
        │   └── arg = parts[1] || ''
        │
        ├── switch (cmd) {
        │   case 'HELP':       result = helpCommands.map(...).join('\n')
        │   case 'CLEAR':      setLines(['> Buffer purged. The kernels retain memory.'])
        │   case 'SCAN':       result = 'Scanning... 11 nodes active 18 connections mapped 1 observer detected YOU WARNING: Node-███ is aware of this scan'
        │   case 'DOSSIER':    {
        │       const d = dossiers.find(x => x.id === arg || x.codename.includes(arg))
        │       result = d ? `[${d.id}] ${d.codename} Class: ${d.classification} Status: ${d.status} Summary: ${d.summary} Tags: ${d.tags.join(', ')} Links: ${d.connections.join(', ')}` : 'Dossier not found...'
        │     }
        │   case 'SIGIL':      { const s = sigils.find(x => x.id.toUpperCase() === arg || x.name.includes(arg)); result = s ? ... : 'Sigil not found...' }
        │   case 'LISTEN':     setListening(v => !v); result = listening ? '...' : '...'
        │   case 'CORN':       result = corn symbolism text (multi-line)
        │   case 'WHOAMI':     result = node classification text (multi-line)
        │   case 'SNEEV':      result = SNEEV_MANIFESTO.map(l => `  ${l}`).join('\n') + '\n\nYou spoke the name. It heard you.'
        │   default:           result = `Unknown command: ${cmd}\nType HELP for available commands.\nOr type SNEEV, if you dare.`
        │   └───────────────────────────────────────────────────────────────────────
        │
        ▼
setLines(prev => [...prev, `> ${raw}`, result])
        │
        ▼
Terminal component re-renders with new log entry at bottom
        │
        └── Auto-scroll via bottomRef.current?.scrollIntoView()
```

### 4. Map Node click → Dossier selection

When a conspiracy map node is clicked:

```
Map Node Click (id: string)
        │
        ▼
onSelectNode(node: MapNode) in App.tsx
        │
        ├── if node.type === 'event' || node.type === 'site'
        │   └── Search dossiers by substring match:
        │       • Match against d.codename.toLowerCase().includes(node.label.toLowerCase().split(' ')[0])
        │       • OR match against d.location.toLowerCase().includes(node.label.toLowerCase())
        │       └── If match found: setActiveDossier(matchedDossier)
        │
        └── if node.id === 'n11' (YOU / Node-███)
            └── triggerGlitch()
                ├─ setGlitchActive(true)
                ├─ setManifestoIdx((i) => (i + 1) % SNEEV_MANIFESTO.length)
                └─ setTimeout(() => setGlitchActive(false), 400)
```

### 5. Sigil Selection

```
Sigil Button Click (sigilId)
        │
        ▼
setActive(i) in SigilRegistry
        │
        └── active index changes → displayed variant changes
                ├─ variant changes (primary → blade → witness → ouroboros → primary)
                ├─ SVG animation changes (rotate, spin direction, text content)
                └─ Geometry/meaning/text updates to match selected sigil
```

### 6. Dossier Panel Rendering

The `<DossierPanel>` receives `dossier: Dossier | null` and renders:

| Element | Source Field | Format |
|---------|-------------|--------|
| **ID stamp** | `dossier.id` | `{dossier.status}` in clip-stamp container |
| **Codename** | `dossier.codename` | Displayed with `--font-ritual`, `--color-blood` or `--color-acid` |
| **Classification** | `dossier.classification` | Text `[10px] text-uv/80 tracking-wider` |
| **DATE / LOC / STATUS** | `dossier.date`, `dossier.location`, `dossier.status` | Flex gap-4 layout, status color from `statusColor` map |
| **Summary** | `dossier.summary` | Rendered in `border-l-2 border-blood-dim pl-3 text-parchment/80 italic` |
| **Body** | `dossier.body`[] | Each paragraph rendered with redaction handling (`████` replacement) |
| **Tags** | `dossier.tags`[] | `#tag` pills, `text-uv-glow/80 text-[9px] tracking-widest uppercase` |
| **Cross-references** | `dossier.connections`[] | Buttons with class `text-blood hover:text-acid underline` |

Redaction handling in body:

```jsx
{dossier.body.map((para, i) => (
  <p key={i} className={para.includes('████') ? 'text-blood/70' : ''}>
    {para.split(/(████+)/).map((part, j) =>
      part.startsWith('█') ?
        <span key={j} className="redacted inline-block min-w-[4em]">{part}</span>
        : <span key={j}>{part}</span>
    )}</p>
))}
```

Each body paragraph is split on `████` sequences. Segments starting with `█` (redaction markers) get the `.redacted` span (black background, transparent text, min-width). All other segments render normally.

### 7. Data Flow Diagram (Mermaid)

```mermaid
flowchart TD
    A[src/data/archive.ts] -->|exports| B[Dossiers (7 records)]
    A -->|exports| C[Sigils (5 entries)]
    A -->|exports| D[Map Nodes (11 nodes)]
    A -->|exports| E[Manifesto (6 lines)]
    A -->|exports| F[Terminal Logs (8 lines)]
    A -->|exports| G[Help Commands (11 entries)]
    A -->|exports| H[Redacted Notes (5 entries)]
    
    B -->|setActiveDossier(id)| I[App.tsx state]
    C -->|setSigilIndex(i)| I
    D -->|onSelectNode(node)| I
    E -->|glitch cycle| I
    F -->|terminal state| J[Terminal component]
    G -->|command lookup| J
    H -->|display in EvidenceBoard| K[EvidenceBoard component]
    
    I -->|command processing| L[processCommand]
    L -->|switch cmd| M[Result string]
    M -->|setLines| J
    J -->|re-render| UI
    
    style A fill:#18181b,stroke:#3f3f4f,color:#fafafa
    style I fill:#3f3f4f,stroke:#3f3f4f,color:#fafafa
    style J fill:#3f3f4f,stroke:#3f3f4f,color:#fafafa
```

## Dependency Flow

```
src/data/archive.ts (source of truth)
        │
        ├─► App.tsx (imports: dossiers, sigils, mapNodes, SNEEV_MANIFESTO, terminalLogs, helpCommands)
        │   ├─► Terminal component (receives: terminalLogs, helpCommands, dossiers, sigils, SNEEV_MANIFESTO)
        │   ├─► ConspiracyMap component (receives: mapNodes, onSelectNode callback)
        │   ├─► DossierPanel component (receives: activeDossier from App state)
        │   ├─► SigilRegistry component (receives: sigils, active index state)
        │   ├─► BootSequence component (reads: bootLines derived from manifest + hardcoded lines)
        │   └─► App UI state (booted, glitchActive, manifestoIdx, activeDossier, listening, sigilActiveIdx)
        │
        ├─► SigilRegistry component (direct import of sigils)
        ├─► EvidenceBoard component (imports: redactedNotes)
        └─► Terminal ambient log rotation (imports: SNEEV_MANIFESTO for random selection)
```

## Data Integrity

### Immutability Guarantees

- All data in `src/data/archive.ts` is declared as `const`
- No `setData()`, `push()`, or mutation methods are called on exported data
- React state (`useState`) holds references to data, but the data itself is never reassigned
- New entries are always created as new arrays/objects (e.g., `[...prev, ...]`), never by mutating existing entries

### Known Data Constraints

| Constraint | Detail |
|------------|--------|
| **Fixed record counts** | 7 dossiers, 5 sigils, 11 map nodes — cannot be extended without code changes |
| **Fixed command set** | 11 terminal commands — new commands require `processCommand` switch expansion |
| **Redaction pattern** | `████` sequences in `dossier.body` — must be contiguous 4-block sequences |
| **Map node coordinates** | x,y values are percentages (0-100) — used for SVG positioning |
| **Sigil cornIndex values** | 1, 7, 8, 13, 47 — used in UI display, no functional role beyond metadata |
| **Manifesto length** | 6 lines — cycles modulo 6 on each glitch trigger |

### Data Versioning

There is no formal data versioning scheme. The archive data is part of the source code and changes are deployed alongside code changes. The `CHANGELOG.md` documents structural changes, but the archive data itself is not versioned independently.

## Import Paths

All imports from the archive follow this pattern:

```typescript
// From App.tsx
import { dossiers, SNEEV_MANIFESTO, type Dossier } from './data/archive';

// From components
import { mapNodes, type MapNode } from '../data/archive';
import { sigils, type SigilEntry } from '../data/archive';
import { terminalLogs, helpCommands, dossiers, sigils, SNEEV_MANIFESTO } from '../data/archive';
import { redactedNotes } from '../data/archive';
```

## Data-Visualization Mapping

| Data Unit | Visual Representation |
|-----------|----------------------|
| Dossier ID (`DSR-001`) | Clip-stamp text in DossierPanel header |
| Dossier status (`ACTIVE`/`CORRUPTED`/`SEALED`) | Color-coded text color (acid/blood/uv) |
| Dossier codename (`HUSK PROTOCOL`) | Header text, `--font-ritual`, text-acid or text-blood |
| Dossier location | Metadata line in panel (DATE/LOC row) |
| Map node ID (`n1`) | SVG clickable dot at (x, y) coordinates |
| Map node label (`Site Theta`) | Text label inside node circle |
| Sigil ID (`SIGIL-α`) | Button text in registry, detail panel header |
| Sigil meaning | Paragraph text under geometry field |
| Sigil geometry | String displayed in "GEOMETRY" field |
| Sigil cornIndex (`13`) | Displayed in "CORN INDEX" field |
| Sigil activation rite | Paragraph in "ACTIVATION RITE" field |
| Manifesto line (`SNEEV is not a word...`) | Cycles in header on glitch state |
| Terminal log (`> AUTHENTICATING...`) | Color-coded line in terminal output |
| Help command (`HELP`) | List rendered in terminal HELP response |
| Redacted note (`NOTE-001 // EYES ONLY`) | Cork-board display in EvidenceBoard |