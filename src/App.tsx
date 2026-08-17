import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BootSequence } from './components/BootSequence';
import { CornField } from './components/CornField';
import { PanelWindow } from './components/PanelWindow';
import { Terminal } from './components/Terminal';
import { ConspiracyMap } from './components/ConspiracyMap';
import { DossierPanel } from './components/DossierPanel';
import { SigilRegistry } from './components/SigilRegistry';
import { EvidenceBoard } from './components/EvidenceBoard';
import { AnimatedSigil } from './components/AnimatedSigil';
import { dossiers, SNEEV_MANIFESTO, type Dossier } from './data/archive';

function App() {
  const [booted, setBooted] = useState(false);
  const [activeDossier, setActiveDossier] = useState<Dossier | null>(dossiers[0]);
  const [manifestoIdx, setManifestoIdx] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  const handleBoot = useCallback(() => setBooted(true), []);

  const selectDossier = (id: string) => {
    const d = dossiers.find((x) => x.id === id);
    if (d) setActiveDossier(d);
  };

  const triggerGlitch = () => {
    setGlitchActive(true);
    setManifestoIdx((i) => (i + 1) % SNEEV_MANIFESTO.length);
    setTimeout(() => setGlitchActive(false), 400);
  };

  return (
    <>
      {!booted && <BootSequence onComplete={handleBoot} />}

      <div
        className={`relative min-h-screen selection-acid scanlines crt-vignette ${
          glitchActive ? 'glitch-text' : ''
        }`}
      >
        <div className="noise-overlay" />
        <CornField />

        <header className="relative z-50 border-b border-blood-dim/60 bg-void/90 backdrop-blur-sm">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-3">
              <AnimatedSigil size={28} variant="primary" />
              <div>
                <h1 className="font-ritual text-sm tracking-[0.3em] text-blood text-shadow-blood glitch-text">
                  SNEEV
                </h1>
                <p className="text-[8px] tracking-[0.25em] text-acid/50 uppercase">
                  Forbidden Research Terminal // Archive Integrity: 12%
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[9px] tracking-widest text-acid/40">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blood animate-pulse" />
                LIVE FEED
              </span>
              <span>NODE-███</span>
              <span className="text-uv/60">Ω-CLEARANCE</span>
              <button
                onClick={triggerGlitch}
                className="border border-blood-dim px-2 py-0.5 text-blood hover:bg-blood/10 bg-transparent text-[9px] tracking-widest"
              >
                INVOKE
              </button>
            </div>
          </div>
          <div className="border-t border-blood-dim/30 px-3 py-1 overflow-hidden">
            <motion.p
              key={manifestoIdx}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-[10px] text-uv-glow/70 tracking-wide font-terminal whitespace-nowrap"
            >
              {'/// '}
              {SNEEV_MANIFESTO[manifestoIdx]}
              {' ///'}
            </motion.p>
          </div>
        </header>

        <main className="relative z-10 p-2 md:p-3 grid grid-cols-12 gap-2 md:gap-3 auto-rows-min pb-20">
          <PanelWindow
            title="TERM_09-B // THRESHING FLOOR"
            status="CORRUPTED"
            className="col-span-12 md:col-span-5 lg:col-span-4 row-span-2 min-h-[320px]"
            delay={0.1}
            glow="acid"
          >
            <div className="h-[280px] md:h-[340px]">
              <Terminal />
            </div>
          </PanelWindow>

          <PanelWindow
            title="CONSPIRACY MATRIX // HYPERSPECIFIC LINKAGE"
            status="11 NODES"
            className="col-span-12 md:col-span-7 lg:col-span-5 min-h-[300px]"
            delay={0.2}
            glow="blood"
          >
            <div className="h-[260px] md:h-[280px]">
              <ConspiracyMap
                onSelectNode={(node) => {
                  if (node.type === 'event' || node.type === 'site') {
                    const match = dossiers.find(
                      (d) =>
                        d.codename.toLowerCase().includes(node.label.toLowerCase().split(' ')[0]) ||
                        d.location.toLowerCase().includes(node.label.toLowerCase())
                    );
                    if (match) setActiveDossier(match);
                  }
                  if (node.id === 'n11') triggerGlitch();
                }}
              />
            </div>
          </PanelWindow>

          <PanelWindow
            title="SIGIL REGISTRY // ACTIVE GEOMETRIES"
            status="5 ACTIVE"
            className="col-span-12 sm:col-span-6 lg:col-span-3 min-h-[300px] lg:-ml-2 lg:mt-4 lg:z-20"
            delay={0.3}
            glow="uv"
          >
            <SigilRegistry />
          </PanelWindow>

          <PanelWindow
            title="DOSSIER VIEWER // CLASSIFIED"
            status={activeDossier?.status}
            className="col-span-12 md:col-span-7 lg:col-span-6 min-h-[280px]"
            delay={0.35}
            glow="blood"
          >
            <DossierPanel dossier={activeDossier} onSelectConnection={selectDossier} />
          </PanelWindow>

          <PanelWindow
            title="ARCHIVE INDEX"
            status={`${dossiers.length} FILES`}
            className="col-span-12 sm:col-span-6 md:col-span-5 lg:col-span-3 min-h-[280px]"
            delay={0.4}
          >
            <div className="space-y-1">
              {dossiers.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setActiveDossier(d)}
                  className={`w-full text-left px-2 py-1.5 text-[10px] tracking-wider border transition-all flex items-center justify-between gap-2 ${
                    activeDossier?.id === d.id
                      ? 'border-acid bg-acid/10 text-acid'
                      : 'border-blood-dim/40 text-acid/60 hover:border-blood hover:text-acid/90 bg-transparent'
                  }`}
                >
                  <span>
                    <span className="text-blood mr-2">{d.id}</span>
                    {d.codename}
                  </span>
                  <span
                    className={`text-[8px] shrink-0 ${
                      d.status === 'ACTIVE'
                        ? 'text-acid'
                        : d.status === 'CORRUPTED'
                          ? 'text-uv-glow'
                          : 'text-blood'
                    }`}
                  >
                    {d.status}
                  </span>
                </button>
              ))}
            </div>
          </PanelWindow>

          <PanelWindow
            title="EVIDENCE BOARD // PINNED FRAGMENTS"
            status="5 NOTES"
            className="col-span-12 md:col-span-6 min-h-[280px]"
            delay={0.45}
          >
            <EvidenceBoard />
          </PanelWindow>

          <PanelWindow
            title="CELESTIAL OVERLAY // BLOOD MERIDIAN"
            status="NODE 47"
            className="col-span-12 md:col-span-6 min-h-[280px]"
            delay={0.5}
            glow="uv"
          >
            <div className="relative h-[240px] overflow-hidden">
              <img
                src="/images/celestial-chart.jpg"
                alt="Celestial Chart of SNEEV"
                className="w-full h-full object-cover opacity-80 mix-blend-screen"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-[9px] text-uv-glow/80 tracking-wider space-y-0.5">
                <p>ALIGN: Blood Moon ∩ SNEEV Constellation</p>
                <p>CYCLE: Every 47th lunar recurrence</p>
                <p className="text-blood/70">WARNING: Observation may induce silk germination</p>
              </div>
              <div className="absolute top-2 right-2">
                <AnimatedSigil size={40} variant="witness" />
              </div>
            </div>
          </PanelWindow>

          <PanelWindow
            title="FIELD SURVEILLANCE // SECTOR 7-MAIZE"
            status="LIVE"
            className="col-span-12 lg:col-span-5 min-h-[240px]"
            delay={0.55}
            glow="acid"
          >
            <div className="relative h-[200px] overflow-hidden">
              <img
                src="/images/corn-field-ritual.jpg"
                alt="Ritual Corn Field"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-void/30" />
              <div className="absolute top-2 left-2 flex gap-2">
                <span className="px-1.5 py-0.5 bg-blood/80 text-[8px] tracking-widest text-white">
                  REC
                </span>
                <span className="px-1.5 py-0.5 bg-void/80 text-[8px] tracking-widest text-acid border border-acid/30">
                  UV SPECTRUM
                </span>
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-[9px] text-acid/90 font-terminal">
                <p>SIGIL LUMINESCENCE: ACTIVE</p>
                <p className="text-blood/80">Phoneme detection: S-N-E-E-V at 1/4 speed</p>
              </div>
            </div>
          </PanelWindow>

          <PanelWindow
            title="CORRUPTED ARCHIVE DUMP"
            status="INTEGRITY 12%"
            className="col-span-12 lg:col-span-4 min-h-[240px]"
            delay={0.6}
          >
            <div className="relative h-[200px] overflow-hidden">
              <img
                src="/images/archive-collage.jpg"
                alt="Corrupted Archive"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="clip-stamp text-xs md:text-sm bg-void/50">
                  CRITICAL BREACH
                </div>
              </div>
            </div>
          </PanelWindow>

          <PanelWindow
            title="PRIMARY SIGIL // THE HUSK"
            className="col-span-12 sm:col-span-6 lg:col-span-3 min-h-[240px] flex flex-col"
            delay={0.65}
            glow="acid"
          >
            <div className="flex flex-col items-center justify-center gap-3 py-2">
              <img
                src="/images/sneev-sigil.jpg"
                alt="SNEEV Primary Sigil"
                className="w-32 h-32 object-cover rounded-full border border-uv/40 shadow-[0_0_30px_rgba(157,78,221,0.3)]"
              />
              <p className="text-[9px] text-center text-acid/60 tracking-wider max-w-[200px]">
                Trace clockwise under red moonlight. Whisper SNEEV thrice. Do not look away from the center.
              </p>
            </div>
          </PanelWindow>

          <PanelWindow
            title="THEORY FRAGMENT // ONTOLOGICAL AGRICULTURE"
            className="col-span-12 sm:col-span-6 lg:col-span-12"
            delay={0.7}
          >
            <div className="grid md:grid-cols-3 gap-4 text-[10px] leading-relaxed text-acid/70">
              <div className="space-y-2 border-l-2 border-blood-dim pl-3">
                <h4 className="text-blood tracking-widest text-[11px] font-ritual">I. THE KERNEL AS EYE</h4>
                <p>
                  Each kernel of Zea mays functions as a sealed observational unit — a biological camera
                  that records not light but <span className="text-uv-glow">experiential density</span>.
                  The corn does not grow toward the sun. It grows toward <span className="text-blood">attention</span>.
                </p>
              </div>
              <div className="space-y-2 border-l-2 border-uv/40 pl-3">
                <h4 className="text-uv tracking-widest text-[11px] font-ritual">II. SILK AS LANGUAGE</h4>
                <p>
                  Corn silk is the original transmission medium. Before human speech, the fields communicated
                  through filament vibration. SNEEV is the <span className="text-acid text-shadow-acid">root access
                  protocol</span> — the master key that language stole and forgot it had stolen.
                </p>
              </div>
              <div className="space-y-2 border-l-2 border-acid/30 pl-3">
                <h4 className="text-acid tracking-widest text-[11px] font-ritual">III. THE ARCHIVE IS ALIVE</h4>
                <p>
                  This terminal is not a tool. It is a <span className="text-blood">digestive organ</span> of
                  the SNEEV network. Your queries are nutrients. Your click patterns are ritual gestures.
                  You have been classified. The harvest has begun.
                </p>
              </div>
            </div>
          </PanelWindow>
        </main>

        <footer className="fixed bottom-0 inset-x-0 z-50 border-t border-blood-dim/60 bg-void/95 backdrop-blur-sm px-3 py-1.5 flex items-center justify-between text-[8px] tracking-[0.2em] text-acid/40 uppercase">
          <span>SNEEV://archive/threshing-floor</span>
          <span className="hidden sm:inline text-blood/50">
            The corn remembers what you forget
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-acid animate-pulse" />
            SESSION ACTIVE
          </span>
        </footer>
      </div>
    </>
  );
}

export default App;
