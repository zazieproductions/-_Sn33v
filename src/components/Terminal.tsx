import { useState, useRef, useEffect, type FormEvent } from 'react';
import { terminalLogs, helpCommands, dossiers, sigils, SNEEV_MANIFESTO } from '../data/archive';

interface TerminalProps {
  onCommand?: (cmd: string, result: string) => void;
}

export function Terminal({ onCommand }: TerminalProps) {
  const [lines, setLines] = useState<string[]>([...terminalLogs]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    if (!listening) return;
    const interval = setInterval(() => {
      const fragments = [
        '> [AMBIENT] ...rustling... S... N... E...',
        '> [AMBIENT] frequency lock: 47.0 Hz — SNEEV carrier wave detected',
        '> [AMBIENT] the silk vibrates. do you feel it?',
        '> [AMBIENT] ████ is listening through the kernels',
        '> [AMBIENT] ' + SNEEV_MANIFESTO[Math.floor(Math.random() * SNEEV_MANIFESTO.length)],
      ];
      setLines((prev) => [...prev.slice(-40), fragments[Math.floor(Math.random() * fragments.length)]]);
    }, 3000);
    return () => clearInterval(interval);
  }, [listening]);

  const processCommand = (raw: string) => {
    const parts = raw.trim().toUpperCase().split(/\s+/);
    const cmd = parts[0];
    const arg = parts[1] || '';
    let result = '';

    switch (cmd) {
      case 'HELP':
        result = helpCommands.map((h) => `  ${h.cmd.padEnd(16)} ${h.desc}`).join('\n');
        break;
      case 'CLEAR':
        setLines(['> Buffer purged. The kernels retain memory.']);
        return;
      case 'SCAN':
        result = 'Scanning conspiracy matrix...\n  11 nodes active\n  18 connections mapped\n  1 observer detected: YOU\n  WARNING: Node-███ is aware of this scan';
        break;
      case 'DOSSIER': {
        const d = dossiers.find((x) => x.id === arg || x.codename.includes(arg));
        result = d
          ? `[${d.id}] ${d.codename}\n  Class: ${d.classification}\n  Status: ${d.status}\n  ${d.summary}\n  Tags: ${d.tags.join(', ')}\n  Links: ${d.connections.join(', ')}`
          : `Dossier not found: ${arg || '(specify ID)'}\n  Available: ${dossiers.map((x) => x.id).join(', ')}`;
        break;
      }
      case 'SIGIL': {
        const s = sigils.find((x) => x.id.toUpperCase() === arg || x.name.includes(arg));
        result = s
          ? `[${s.id}] ${s.name}\n  Meaning: ${s.meaning}\n  Geometry: ${s.geometry}\n  Corn Index: ${s.cornIndex}\n  Activation: ${s.activation}`
          : `Sigil not found: ${arg || '(specify ID)'}\n  Available: ${sigils.map((x) => x.id).join(', ')}`;
        break;
      }
      case 'LISTEN':
        setListening((v) => !v);
        result = listening
          ? 'Attunement severed. Silence returns — but the corn still hears.'
          : 'Attuning to SNEEV frequency... Ambient channel OPEN. The rustling begins.';
        break;
      case 'CORN':
        result = [
          'CORN SYMBOLISM DATABASE v47.0',
          '  Kernel = sealed eye / memory cell / witness unit',
          '  Silk = filament of entanglement / quantum thread',
          '  Husk = veil between worlds / the archive shell',
          '  Cob = ouroboros axis / recursive structure',
          '  Field = collective unconscious / the network',
          '  Harvest = consciousness transfer event',
          '  SNEEV = root access protocol / the true name of growth',
          `  Total entries: 4,719 | Your queries logged: ${lines.length}`,
        ].join('\n');
        break;
      case 'WHOAMI':
        result = [
          'NODE CLASSIFICATION',
          '  Designation: Node-███',
          '  Status: COMPROMISED / GERMINATING',
          '  Clearance: You should not have this clearance.',
          '  Observation: The archive has classified you as a vector.',
          '  Message: "Welcome to the network. The corn has been waiting."',
        ].join('\n');
        break;
      case 'SNEEV':
        result = SNEEV_MANIFESTO.map((l) => `  ${l}`).join('\n') + '\n\n  You spoke the name. It heard you.';
        break;
      default:
        result = `Unknown command: ${cmd}\n  Type HELP for available commands.\n  Or type SNEEV, if you dare.`;
    }

    setLines((prev) => [...prev, `> ${raw}`, result]);
    onCommand?.(cmd, result);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    processCommand(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full font-terminal text-[11px] leading-relaxed">
      <div className="flex-1 overflow-y-auto space-y-0.5 text-acid/90 pr-1">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap ${
              line.startsWith('>')
                ? 'text-acid'
                : line.includes('WARNING') || line.includes('REDACTED') || line.includes('████')
                  ? 'text-blood'
                  : line.includes('[AMBIENT]')
                    ? 'text-uv-glow/80'
                    : 'text-acid/70'
            }`}
          >
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-1 mt-2 border-t border-blood-dim/50 pt-2">
        <span className="text-blood text-shadow-blood">root@sneev:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-0 text-acid text-[11px] outline-none font-terminal"
          placeholder="enter command..."
          spellCheck={false}
          autoComplete="off"
        />
        <span className="terminal-cursor" />
      </form>
    </div>
  );
}
