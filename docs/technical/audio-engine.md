# Audio Engine Documentation

**SNEEV v0.0.1** — Zazie Productions

## Conceptual Overview

The SNEEV project conceptualizes an audio engine without implementing real-time audio synthesis in the browser runtime. The "SNEEV frequency" is a design principle — a conceptual carrier wave that informs UI state, rather than an audible signal.

If audio were to be implemented, the architecture would follow this design:

## Planned Audio Architecture

### SNEEV Carrier Wave (47.0 Hz)

The SNEEV frequency is referenced throughout the terminal logs at 47.0 Hz:

> "> [AMBIENT] frequency lock: 47.0 Hz — SNEEV carrier wave detected"

This would be the fundamental oscillator parameter:

```
const SNEEV_FREQUENCY = 47.0; // Hz

const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();
const biquad = audioContext.createBiquadFilter();

oscillator.type = 'sine';
oscillator.frequency.value = SNEEV_FREQUENCY;

oscillator.connect(biquad);
biquad.type = 'bandpass';
biquad.frequency.value = SNEEV_FREQUENCY;
biquad.Q.value = 2.5; // Narrow resonance, "focused" perception

biquad.connect(gainNode);
gainNode.gain.value = 0.0; // Initially muted — enabled via LISTEN command
gainNode.connect(audioContext.destination);

oscillator.start();
```

### LISTEN Command Integration

The existing `LISTEN` command in `Terminal.tsx` toggles a `listening` state that rotates ambient fragments in the terminal log. If audio were implemented, the LISTEN command would:

1. Toggle the oscillator on/off
2. Fade the gain in/out over 500ms
3. Update the terminal log:
   - Opening: 'Attuning to SNEEV frequency... Ambient channel OPEN. The rustling begins.'
   - Closing: 'Attunement severed. Silence returns — but the corn still hears.'

### Web Audio API Node Graph

```
Oscillator (47.0 Hz, sine)
    ↓
Biquad Filter (bandpass, Q=2.5)
    ↓
Gain Node (0.0 → 0.3 fade)
    ↓
Destination (speakers)
```

### Frequency Modulation (Conceptual)

The SNEEV frequency could be modulated by:

- **Map node interactions**: Each conspiracy node clicked could slightly shift the carrier frequency, audibly reflecting the "network state"
- **Dossier access**: Reading a dossier could produce a subtle pitch shift, indicating "information download"
- **Glitch state**: When `glitchActive` is true, the frequency could modulate randomly, producing audible "corruption"

These are **research directions**, not implemented features.

## Technical Constraints (Current)

The current project does not implement the Web Audio API for the following reasons:

1. **Browser Permission Requirements**: `getUserMedia()` would be needed for full audio, creating a permissions barrier at startup
2. **Context Resumption**: Web Audio API requires user gesture before audio context can resume (Autoplay Policy)
3. **Bundle Size**: The real-time synthesis graph adds ~15-20 KB minified — acceptable but unnecessary for the current scope
4. **Conceptual Fit**: The "frequency" is intentionally mystical/abstract; making it audible shifts the genre from "creative technology" to "web audio demo"

## Future Implementation Path

If audio were to be added in a future version, the recommended path:

### Phase 1: Conceptual Only (Current)
- `LISTEN` command toggles text fragments only
- No Web Audio API initialization
- Terminal log reflects state conceptually

### Phase 2: Minimal Audio
- Initialize Web Audio API on first user gesture (click/tap)
- Oscillator at 47.0 Hz, initially silent
- `LISTEN` command fades gain from 0.0 to 0.3
- Visualizer: canvas line reacts to audio stream

### Phase 3: Full Integration
- Multiple oscillator voices (polyphony)
- Reverb/delay sends for "spatial" feeling
- Frequency modulation by dossier state or map node activity
- User-configurable carrier wave (different waveforms, detuning)
- Spatial audio panning based on conspiracy map node positions

## Integration Points

### Terminal Command: LISTEN

Current behavior (no audio):
```javascript
case 'LISTEN':
  setListening((v) => !v);
  result = listening
    ? 'Attunement severed. Silence returns — but the corn still hears.'
    : 'Attuning to SNEEV frequency... Ambient channel OPEN. The rustling begins.';
```

Future behavior (with audio):
```javascript
case 'LISTEN':
  setListening((v) => !v);
  if (listening) {
    gainNode.gain.fadeTo(0.0, 0.5);
    result = 'Attunement severed. Silence returns — but the corn still hears.';
  } else {
    gainNode.gain.fadeTo(0.3, 0.5);
    // Start oscillator if not running
    result = 'Attuning to SNEEV frequency... Ambient channel OPEN. The rustling begins.';
  }
```

### Glitch State

When `glitchActive` is true in `App.tsx`, the UI applies `glitch-text` class and cycles the manifesto. If audio were implemented, the glitch state could also:

- Frequency-modulate the carrier wave
- Introduce noise bursts into the output
- Alter the oscillator type randomly

### Dossier Access

Reading dossiers could optionally trigger a low-volume "download" sound effect, reinforcing the metaphor of knowledge transfer. This would be a subtle UI enhancement, not a core functionality.

## Performance Considerations

- **CPU**: Web Audio API is lightweight; a single oscillator + gain node has negligible CPU impact (< 1% of main thread)
- **Memory**: Oscillator nodes are singleton; no audio buffers stored in memory
- **Bundle Impact**: +~15 KB gzipped for the audio initialization code
- **Browser Compatibility**: Web Audio API is supported in all modern browsers (Chrome 14+, Firefox 23+, Safari 6+)

## Accessibility

- Audio should be **optional** — not required for any functionality
- `LISTEN` command should have a "silent" mode equivalent (text-only attunement)
- Users should be able to disable the audio via a toggle, with persistent preference
- The `prefers-reduced-motion` media query should also extend to audio output (optional silence)

## Current Status

**Audio engine: Conceptual only.** No Web Audio API nodes are instantiated at runtime. The SNEEV frequency is a design principle encoded in the terminal logs, CSS variable names, and conceptual architecture — not an audible signal.

If audio implementation becomes a priority, the architectural foundation above provides a clear upgrade path that preserves the project's aesthetic and conceptual integrity.