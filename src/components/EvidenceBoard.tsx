import { motion } from 'framer-motion';
import { redactedNotes } from '../data/archive';

const rotations = [-3, 2, -1, 4, -2];
const positions = [
  { top: '5%', left: '3%' },
  { top: '8%', left: '52%' },
  { top: '48%', left: '8%' },
  { top: '45%', left: '48%' },
  { top: '72%', left: '28%' },
];

export function EvidenceBoard() {
  return (
    <div className="relative w-full h-full min-h-[260px] bg-[#0d080c]">
      {/* Cork texture simulation */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #3a2010 1px, transparent 1px),
            radial-gradient(circle at 70% 60%, #2a1808 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, #3a2010 1px, transparent 1px)`,
          backgroundSize: '12px 12px, 18px 18px, 15px 15px',
          backgroundColor: '#1a1008',
        }}
      />

      {/* String connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="15" y1="20" x2="60" y2="18" className="string-line" />
        <line x1="60" y1="18" x2="20" y2="58" className="string-line" />
        <line x1="20" y1="58" x2="60" y2="55" className="string-line" />
        <line x1="60" y1="55" x2="40" y2="82" className="string-line" />
        <line x1="15" y1="20" x2="40" y2="82" className="string-line" />
        <circle cx="15" cy="20" r="1" className="pin-dot" />
        <circle cx="60" cy="18" r="1" className="pin-dot" />
        <circle cx="20" cy="58" r="1" className="pin-dot" />
        <circle cx="60" cy="55" r="1" className="pin-dot" />
        <circle cx="40" cy="82" r="1" className="pin-dot" />
      </svg>

      {redactedNotes.map((note, i) => (
        <motion.div
          key={note.id}
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: rotations[i] }}
          transition={{ delay: 0.3 + i * 0.15 }}
          className="absolute w-[44%] p-2 bg-[#d4c4a8] text-[#1a1008] text-[9px] leading-snug shadow-lg float-drift"
          style={{
            ...positions[i],
            animationDelay: `${i * 0.7}s`,
          }}
        >
          {/* Pin */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blood shadow-[0_0_6px_#c41e3a] z-10" />
          <div className="font-bold text-[8px] tracking-widest text-blood mb-1 border-b border-[#1a1008]/30 pb-0.5">
            NOTE-{String(note.id).padStart(3, '0')} // {note.stamp}
          </div>
          <p>{note.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
