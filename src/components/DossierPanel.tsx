import { motion, AnimatePresence } from 'framer-motion';
import type { Dossier } from '../data/archive';

interface DossierPanelProps {
  dossier: Dossier | null;
  onSelectConnection?: (id: string) => void;
}

const statusColor: Record<Dossier['status'], string> = {
  ACTIVE: 'text-acid',
  REDACTED: 'text-blood',
  BURNED: 'text-blood-dim',
  CORRUPTED: 'text-uv-glow',
  SEALED: 'text-uv',
};

export function DossierPanel({ dossier, onSelectConnection }: DossierPanelProps) {
  if (!dossier) {
    return (
      <div className="flex items-center justify-center h-full text-acid/30 text-xs tracking-widest uppercase">
        Select a dossier from the archive index
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={dossier.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        className="relative text-[11px] leading-relaxed space-y-3"
      >
        {/* Stamp */}
        <div className="absolute top-0 right-2 clip-stamp text-[10px] z-10">
          {dossier.status}
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-3">
            <span className="text-blood font-bold tracking-widest text-shadow-blood">{dossier.id}</span>
            <span className="text-acid text-shadow-acid font-ritual text-sm tracking-wide">
              {dossier.codename}
            </span>
          </div>
          <div className="text-uv/80 tracking-wider text-[10px]">{dossier.classification}</div>
          <div className="flex gap-4 text-[10px] text-acid/50">
            <span>DATE: {dossier.date}</span>
            <span>LOC: {dossier.location}</span>
            <span className={statusColor[dossier.status]}>STATUS: {dossier.status}</span>
          </div>
        </div>

        <div className="border-l-2 border-blood-dim pl-3 text-parchment/80 italic">
          {dossier.summary}
        </div>

        <div className="space-y-2 text-acid/80">
          {dossier.body.map((para, i) => (
            <p key={i} className={para.includes('████') ? 'text-blood/70' : ''}>
              {para.split(/(████+)/).map((part, j) =>
                part.startsWith('█') ? (
                  <span key={j} className="redacted inline-block min-w-[4em]">
                    {part}
                  </span>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-blood-dim/30">
          {dossier.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 border border-uv/40 text-uv-glow/80 text-[9px] tracking-widest uppercase"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="pt-1">
          <span className="text-[9px] text-acid/40 tracking-widest uppercase">Cross-references: </span>
          {dossier.connections.map((c) => (
            <button
              key={c}
              onClick={() => onSelectConnection?.(c)}
              className="text-blood hover:text-acid underline underline-offset-2 mx-1 text-[10px] bg-transparent border-0 p-0 tracking-wider"
            >
              {c}
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
