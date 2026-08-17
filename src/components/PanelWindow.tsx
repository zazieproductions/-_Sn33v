import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import type { ReactNode } from 'react';

interface PanelWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  status?: string;
  delay?: number;
  glow?: 'blood' | 'acid' | 'uv';
}

export function PanelWindow({
  title,
  children,
  className = '',
  style,
  onClose,
  status,
  delay = 0,
  glow,
}: PanelWindowProps) {
  const glowClass =
    glow === 'blood'
      ? 'shadow-[0_0_30px_rgba(196,30,58,0.25)]'
      : glow === 'acid'
        ? 'shadow-[0_0_30px_rgba(57,255,20,0.15)]'
        : glow === 'uv'
          ? 'shadow-[0_0_30px_rgba(157,78,221,0.2)]'
          : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={`panel-window ${glowClass} ${className}`}
      style={style}
    >
      <div className="panel-header">
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blood animate-pulse" />
          {title}
        </span>
        <div className="flex items-center gap-2">
          {status && (
            <span className="text-[9px] text-acid/60 tracking-widest">{status}</span>
          )}
          <Minus size={10} className="text-blood/50 hover:text-blood" />
          <Square size={8} className="text-blood/50 hover:text-blood" />
          {onClose && (
            <button onClick={onClose} className="text-blood/50 hover:text-blood bg-transparent border-0 p-0">
              <X size={12} />
            </button>
          )}
        </div>
      </div>
      <div className="p-3 overflow-auto max-h-full">{children}</div>
    </motion.div>
  );
}
