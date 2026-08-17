import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export function CornField() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const bgX = useTransform(mouseX, [0, 1], ['2%', '-2%']);
  const bgY = useTransform(mouseY, [0, 1], ['1%', '-1%']);
  const midX = useTransform(mouseX, [0, 1], ['4%', '-4%']);
  const midY = useTransform(mouseY, [0, 1], ['2%', '-2%']);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div className="absolute inset-[-5%]" style={{ x: bgX, y: bgY }}>
        <img
          src="/images/corn-field-ritual.jpg"
          alt=""
          className="w-full h-full object-cover opacity-25"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-void via-void/60 to-void"
        style={{ x: midX, y: midY }}
      />
      {/* Floating corn glyphs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-acid/10 text-2xl select-none"
          style={{
            left: `${10 + i * 11}%`,
            top: `${15 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [-5, 5, -5],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          🌽
        </motion.div>
      ))}
      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-uv/5 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-blood/5 blur-3xl" />
      <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-acid/5 blur-2xl" />
    </div>
  );
}
