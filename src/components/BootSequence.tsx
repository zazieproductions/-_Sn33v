import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSigil } from './AnimatedSigil';

const bootLines = [
  'SNEEV RESEARCH DIVISION — FORBIDDEN ARCHIVE v47.0',
  'Initializing quantum-botanical substrate...',
  'Loading corn symbolism matrices... OK',
  'Mounting sigil registry... OK',
  'Decrypting dossier cluster... WARNING: 12% integrity',
  'Establishing silk entanglement uplink... OK',
  'WARNING: Unauthorized consciousness detected',
  'Elevating clearance to Ω-LEVEL...',
  'The kernels acknowledge your presence.',
  'Welcome to the Threshing Floor.',
];

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (visibleLines < bootLines.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 280 + Math.random() * 200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone(true), 800);
    return () => clearTimeout(t);
  }, [visibleLines]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[10000] bg-void flex flex-col items-center justify-center gap-8"
        >
          <AnimatedSigil size={100} variant="ouroboros" />
          <div className="font-terminal text-[12px] text-acid space-y-1 max-w-lg w-full px-6">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={
                  line.includes('WARNING')
                    ? 'text-blood text-shadow-blood'
                    : line.includes('Welcome') || line.includes('kernels')
                      ? 'text-uv-glow text-shadow-uv'
                      : ''
                }
              >
                {line}
                {i === visibleLines - 1 && visibleLines < bootLines.length && (
                  <span className="terminal-cursor" />
                )}
              </motion.div>
            ))}
          </div>
          <div className="text-[9px] text-blood/40 tracking-[0.4em] uppercase font-ritual">
            Unauthorized Access In Progress
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
