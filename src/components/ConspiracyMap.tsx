import { useState } from 'react';
import { motion } from 'framer-motion';
import { mapNodes, type MapNode } from '../data/archive';

const typeColors: Record<MapNode['type'], string> = {
  site: '#c41e3a',
  entity: '#9d4edd',
  event: '#39ff14',
  artifact: '#c77dff',
  corn: '#d4a017',
};

interface ConspiracyMapProps {
  onSelectNode?: (node: MapNode) => void;
  highlighted?: string[];
}

export function ConspiracyMap({ onSelectNode, highlighted = [] }: ConspiracyMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const activeLinks = new Set<string>();
  if (hovered) {
    const node = mapNodes.find((n) => n.id === hovered);
    node?.linked.forEach((l) => activeLinks.add(`${[hovered, l].sort().join('-')}`));
  }

  const allLinks: { from: MapNode; to: MapNode; key: string }[] = [];
  const seen = new Set<string>();
  mapNodes.forEach((node) => {
    node.linked.forEach((lid) => {
      const key = [node.id, lid].sort().join('-');
      if (!seen.has(key)) {
        seen.add(key);
        const target = mapNodes.find((n) => n.id === lid);
        if (target) allLinks.push({ from: node, to: target, key });
      }
    });
  });

  return (
    <div className="relative w-full h-full min-h-[280px] bg-void/80 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <img
        src="/images/archive-collage.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-screen"
      />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {allLinks.map(({ from, to, key }) => {
          const isActive = activeLinks.has(key) || highlighted.includes(from.id) || highlighted.includes(to.id);
          return (
            <motion.line
              key={key}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={isActive ? '#39ff14' : '#c41e3a'}
              strokeWidth={isActive ? 0.4 : 0.2}
              strokeDasharray={isActive ? '0' : '1 0.8'}
              opacity={isActive ? 0.9 : 0.35}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
          );
        })}
      </svg>

      {mapNodes.map((node, i) => (
        <motion.button
          key={node.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.08 }}
          className="absolute conspiracy-node bg-transparent border-0 p-0 -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          onMouseEnter={() => setHovered(node.id)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onSelectNode?.(node)}
        >
          <div
            className="w-3 h-3 rounded-full border-2 transition-all duration-300 group-hover:scale-150"
            style={{
              backgroundColor: typeColors[node.type],
              borderColor: hovered === node.id ? '#fff' : typeColors[node.type],
              boxShadow: `0 0 ${node.severity}px ${typeColors[node.type]}`,
            }}
          />
          <span
            className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] tracking-wider uppercase opacity-70 group-hover:opacity-100 transition-opacity"
            style={{ color: typeColors[node.type] }}
          >
            {node.label}
          </span>
        </motion.button>
      ))}

      {/* Legend */}
      <div className="absolute bottom-2 left-2 flex flex-wrap gap-2 text-[8px] tracking-wider opacity-60">
        {Object.entries(typeColors).map(([type, color]) => (
          <span key={type} className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            {type.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}
