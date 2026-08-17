import { motion } from 'framer-motion';

interface AnimatedSigilProps {
  size?: number;
  className?: string;
  variant?: 'primary' | 'witness' | 'ouroboros' | 'blade';
}

export function AnimatedSigil({ size = 120, className = '', variant = 'primary' }: AnimatedSigilProps) {
  const center = size / 2;
  const r = size * 0.42;

  if (variant === 'witness') {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={`sigil-spin ${className}`}>
        <circle cx={center} cy={center} r={r} fill="none" stroke="#9d4edd" strokeWidth="1" opacity="0.6" />
        <circle cx={center} cy={center} r={r * 0.7} fill="none" stroke="#39ff14" strokeWidth="1" opacity="0.5" />
        <circle cx={center} cy={center} r={r * 0.4} fill="none" stroke="#c41e3a" strokeWidth="1.5" />
        <circle cx={center} cy={center} r={r * 0.15} fill="#050008" stroke="#39ff14" strokeWidth="2" />
        <circle cx={center} cy={center} r={r * 0.06} fill="#39ff14" className="flicker" />
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = center + r * 0.4 * Math.cos(rad);
          const y1 = center + r * 0.4 * Math.sin(rad);
          const x2 = center + r * 0.95 * Math.cos(rad);
          const y2 = center + r * 0.95 * Math.sin(rad);
          return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9d4edd" strokeWidth="0.8" opacity="0.7" />;
        })}
      </svg>
    );
  }

  if (variant === 'blade') {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={`sigil-spin-reverse ${className}`}>
        <polygon
          points={`${center},${center - r} ${center + r * 0.3},${center} ${center},${center + r} ${center - r * 0.3},${center}`}
          fill="none"
          stroke="#c41e3a"
          strokeWidth="1.5"
        />
        <circle cx={center} cy={center} r={r * 0.5} fill="none" stroke="#39ff14" strokeWidth="1" strokeDasharray="4 2" />
        <path
          d={`M ${center - r * 0.6} ${center} Q ${center} ${center - r * 0.4} ${center + r * 0.6} ${center} Q ${center} ${center + r * 0.4} ${center - r * 0.6} ${center}`}
          fill="none"
          stroke="#9d4edd"
          strokeWidth="1"
        />
        {[0, 90, 180, 270].map((a) => {
          const rad = (a * Math.PI) / 180;
          return (
            <circle
              key={a}
              cx={center + r * 0.75 * Math.cos(rad)}
              cy={center + r * 0.75 * Math.sin(rad)}
              r={3}
              fill="#c41e3a"
            />
          );
        })}
      </svg>
    );
  }

  if (variant === 'ouroboros') {
    return (
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={className}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx={center} cy={center} r={r} fill="none" stroke="#c41e3a" strokeWidth="2" strokeDasharray="8 4" />
        <circle cx={center} cy={center} r={r * 0.6} fill="none" stroke="#39ff14" strokeWidth="1" />
        <text
          x={center}
          y={center + 4}
          textAnchor="middle"
          fill="#9d4edd"
          fontSize={size * 0.12}
          fontFamily="Cinzel, serif"
        >
          SNEEV
        </text>
        {[0, 51.4, 102.8, 154.2, 205.6, 257, 308.4].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <ellipse
              key={i}
              cx={center + r * Math.cos(rad)}
              cy={center + r * Math.sin(rad)}
              rx={4}
              ry={6}
              fill="#39ff14"
              opacity="0.8"
              transform={`rotate(${angle} ${center + r * Math.cos(rad)} ${center + r * Math.sin(rad)})`}
            />
          );
        })}
      </motion.svg>
    );
  }

  // Primary heptagram
  const points = Array.from({ length: 7 }, (_, i) => {
    const angle = ((i * 360) / 7 - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });

  const starPath = [0, 2, 4, 6, 1, 3, 5, 0]
    .map((i, idx) => `${idx === 0 ? 'M' : 'L'} ${points[i].x} ${points[i].y}`)
    .join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={`sigil-spin ${className}`}>
      <circle cx={center} cy={center} r={r + 4} fill="none" stroke="#9d4edd" strokeWidth="0.5" opacity="0.4" />
      <circle cx={center} cy={center} r={r} fill="none" stroke="#c41e3a" strokeWidth="1.2" />
      <path d={starPath} fill="none" stroke="#39ff14" strokeWidth="1" opacity="0.9" />
      {points.map((p, i) => (
        <g key={i}>
          <ellipse
            cx={p.x}
            cy={p.y}
            rx={5}
            ry={8}
            fill="none"
            stroke="#c41e3a"
            strokeWidth="0.8"
            transform={`rotate(${(i * 360) / 7} ${p.x} ${p.y})`}
          />
          <circle cx={p.x} cy={p.y} r={2} fill="#39ff14" />
        </g>
      ))}
      <circle cx={center} cy={center} r={r * 0.2} fill="none" stroke="#9d4edd" strokeWidth="1" />
      <circle cx={center} cy={center} r={3} fill="#c41e3a" className="flicker" />
    </svg>
  );
}
