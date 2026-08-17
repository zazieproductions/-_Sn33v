import { useState } from 'react';
import { motion } from 'framer-motion';
import { sigils } from '../data/archive';
import { AnimatedSigil } from './AnimatedSigil';

const variants = ['primary', 'blade', 'witness', 'ouroboros', 'primary'] as const;

export function SigilRegistry() {
  const [active, setActive] = useState(0);
  const s = sigils[active];

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      <div className="flex md:flex-col gap-1 shrink-0">
        {sigils.map((sig, i) => (
          <button
            key={sig.id}
            onClick={() => setActive(i)}
            className={`text-left px-2 py-1.5 text-[10px] tracking-wider border transition-all ${
              active === i
                ? 'border-acid text-acid bg-acid/10 text-shadow-acid'
                : 'border-blood-dim/50 text-acid/50 hover:border-blood hover:text-acid/80 bg-transparent'
            }`}
          >
            {sig.id}
          </button>
        ))}
      </div>

      <motion.div
        key={s.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex flex-col items-center gap-3"
      >
        <div className="relative">
          <img
            src="/images/sneev-sigil.jpg"
            alt="SNEEV Sigil"
            className={`w-28 h-28 object-cover rounded-full opacity-40 absolute inset-0 m-auto mix-blend-screen ${active === 0 ? 'block' : 'hidden'}`}
          />
          <AnimatedSigil size={110} variant={variants[active]} />
        </div>

        <div className="text-center space-y-1 w-full">
          <h3 className="font-ritual text-sm text-blood text-shadow-blood tracking-widest">
            {s.name}
          </h3>
          <p className="text-[10px] text-uv-glow/80 tracking-wide">{s.meaning}</p>
        </div>

        <div className="w-full space-y-2 text-[10px] text-acid/70">
          <div className="flex justify-between border-b border-blood-dim/30 pb-1">
            <span className="text-acid/40">GEOMETRY</span>
            <span className="text-right max-w-[60%]">{s.geometry}</span>
          </div>
          <div className="flex justify-between border-b border-blood-dim/30 pb-1">
            <span className="text-acid/40">CORN INDEX</span>
            <span className="text-acid text-shadow-acid font-bold">{s.cornIndex}</span>
          </div>
          <div className="border-b border-blood-dim/30 pb-1">
            <span className="text-acid/40 block mb-1">ACTIVATION RITE</span>
            <span className="text-parchment/70 italic">{s.activation}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
