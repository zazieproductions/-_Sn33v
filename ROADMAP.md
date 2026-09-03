# ROADMAP

## Near-term

- [x] Initial boot sequence (v0.0.1)
- [x] Terminal command set (11 commands)
- [x] Conspiracy Map visualization
- [x] Sigil Registry display
- [x] Dossier Archive with redactions
- [ ] Add `UNLOCK [key]` command to increase archive integrity
- [ ] Implement persistent session storage (localStorage or IndexedDB)
- [ ] Add Web Audio API SNEEV frequency synthesis when LISTEN is active
- [ ] Refactor command parser into modular extensible architecture
- [ ] Add unit tests for command processing logic
- [ ] Optimize production bundle size (target < 1 MB gzipped)
- [ ] Add TypeScript strict mode compliance
- [ ] Implement CSS prefers-reduced-motion respect

## Experimental

- [ ] WebMIDI integration — map MIDI keyboard inputs to terminal commands
- [ ] OSC (Open Sound Control) support — route external control surfaces to SNEEV
- [ ] Shader-based glitch effects (fragment shader instead of CSS class toggling)
- [ ] Generative sequencing — sigil patterns evolve based on command history
- [ ] Downloadable archive output — save current dossier state as text file
- [ ] User presets — save/load terminal state as JSON
- [ ] Offline rendering — headless generation of terminal screenshots
- [ ] Spatial audio — panning SNEEV frequency based on map node positions
- [ ] Shader-based sigil animation (GPU-accelerated vs. framer-motion)

## Research Directions

- [ ] MIDI-driven archive navigation — control the terminal via MIDI hardware
- [ ] OSC message pipeline — receive SNEEV frequency data from external software
- [ ] WebAssembly-computed sigil geometry — procedural generation via WASM
- [ ] Procedural state systems — archive growth/shrinkage based on abstract rules
- [ ] Sensor integration — ambient data (light, motion) influencing terminal state
- [ ] Live performance modes — real-time control surface for projection environments
- [ ] Downloadable output — render user session as text/PDF keepsake
- [ ] Patch systems — modular connection of terminal components (terminal + map + sigils + dossiers)
- [ ] Persistence across sessions — indexedDB-based archive state retention
- [ ] Dream logic — state persistence that activates during "sleep" (background tab) periods