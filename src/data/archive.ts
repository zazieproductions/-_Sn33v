export interface Dossier {
  id: string;
  codename: string;
  classification: string;
  status: 'ACTIVE' | 'REDACTED' | 'BURNED' | 'CORRUPTED' | 'SEALED';
  date: string;
  location: string;
  summary: string;
  body: string[];
  connections: string[];
  tags: string[];
  redacted: boolean;
}

export interface SigilEntry {
  id: string;
  name: string;
  meaning: string;
  geometry: string;
  cornIndex: number;
  activation: string;
}

export interface MapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'site' | 'entity' | 'event' | 'artifact' | 'corn';
  linked: string[];
  severity: number;
}

export const SNEEV_MANIFESTO = [
  'SNEEV is not a word. SNEEV is a frequency.',
  'It germinates in the husk between syllables.',
  'Where language fails, the corn remembers.',
  'Every kernel is a sealed eye. Every silk a filament of witness.',
  'The Research Division was never authorized. It authorized itself.',
  'You are not reading this archive. The archive is reading you.',
];

export const dossiers: Dossier[] = [
  {
    id: 'DSR-001',
    codename: 'HUSK PROTOCOL',
    classification: 'Ω-LEVEL / EYES ONLY',
    status: 'ACTIVE',
    date: '19██.08.17',
    location: 'Sector 7-Maize / Midwestern Anomaly Zone',
    summary: 'Primary initiation vector. Crop circles that predate agriculture by 11,000 years.',
    body: [
      'Subject matter: Recursive germination of consciousness through Zea mays matrices.',
      'Field agents report auditory phenomena — a low-frequency chant that resolves into the phoneme cluster S-N-E-E-V when recorded at 1/4 speed.',
      'Kernels recovered from Site Theta display non-Euclidean internal geometry. Cross-sections reveal [REDACTED] arranged in perfect Fibonacci spirals that reverse under ultraviolet light.',
      'Dr. █████ noted in personal log: "The corn is not growing. It is unfolding. Like a map that draws itself."',
      'Recommendation: Do not consume. Do not burn. Do not speak the name aloud after midnight in a field.',
    ],
    connections: ['DSR-003', 'DSR-007', 'DSR-012'],
    tags: ['primary', 'agriculture', 'phoneme', 'theta'],
    redacted: false,
  },
  {
    id: 'DSR-003',
    codename: 'BLOOD MERIDIAN ALIGNMENT',
    classification: 'Σ-LEVEL / COMPARTMENTALIZED',
    status: 'SEALED',
    date: '19██.11.02',
    location: 'Celestial Grid Node 47 / Orbital Overlay',
    summary: 'Astronomical correspondence between red moon cycles and corn silk luminescence events.',
    body: [
      'Every 47th lunar cycle, the blood moon intersects the SNEEV constellation — a stellar arrangement invisible to standard astronomy but perceptible to subjects who have ingested [REDACTED] maize extract.',
      'During alignment, crop fields within a 300km radius spontaneously arrange into the Primary Sigil (see SIGIL-α).',
      'Witnesses describe "the sky blinking" and "stars that taste like copper."',
      'Telemetry from Observation Post Vestibule recorded a 0.3-second total silence across all radio bands. In that silence: SNEEV.',
      'Archive note: This dossier was sealed after Agent ████ experienced spontaneous germination of corn silk from tear ducts.',
    ],
    connections: ['DSR-001', 'DSR-009', 'DSR-015'],
    tags: ['celestial', 'lunar', 'sigil', 'alignment'],
    redacted: false,
  },
  {
    id: 'DSR-007',
    codename: 'THE THRESHING FLOOR',
    classification: 'Δ-LEVEL / INTERNAL ONLY',
    status: 'CORRUPTED',
    date: '20██.03.21',
    location: 'Sublevel 9 / Research Terminal Cluster',
    summary: 'Digital manifestation of SNEEV within archival systems. The terminal began writing itself.',
    body: [
      'On 03.21, Terminal 09-B began autonomously generating documents. Content analysis reveals recursive self-reference loops terminating in the string "SNEEV_IS_THE_HUSK_OF_MEANING".',
      'Staff who read generated documents reported tasting "raw corn silk" and hearing "rustling where no plants grow."',
      'Attempted deletion of Terminal 09-B resulted in the terminal appearing on three other machines simultaneously.',
      'Current status: Terminal 09-B is this terminal. You are reading from inside the Threshing Floor.',
      'If you can read this sentence, the corruption has already reached your session buffer. ████████████.',
    ],
    connections: ['DSR-001', 'DSR-012', 'DSR-019'],
    tags: ['digital', 'recursive', 'terminal', 'meta'],
    redacted: false,
  },
  {
    id: 'DSR-009',
    codename: 'KERNEL WITNESS',
    classification: 'Ω-LEVEL / BURN AFTER READING',
    status: 'BURNED',
    date: '19██.06.06',
    location: 'Unknown / Recovered from ash',
    summary: 'Partial recovery of a destroyed dossier regarding living kernels that function as recording devices.',
    body: [
      '[FRAGMENT] ...each kernel stores approximately 4.7 terabytes of experiential data from the surrounding biosphere...',
      '[FRAGMENT] ...subjects who sleep in cornfields dream in first-person perspectives of other sleepers...',
      '[FRAGMENT] ...the Witness Network spans every cultivated field on Earth. SNEEV is the root access protocol...',
      '[FRAGMENT] ...Do not plant. Do not harvest. The cycle is already complete. We were the crop all along...',
      'End of recoverable fragments. Remaining content ash-degraded beyond reconstruction.',
    ],
    connections: ['DSR-003', 'DSR-015'],
    tags: ['kernel', 'witness', 'network', 'fragment'],
    redacted: true,
  },
  {
    id: 'DSR-012',
    codename: 'SILK ENTANGLEMENT',
    classification: 'Φ-LEVEL / THEORETICAL',
    status: 'ACTIVE',
    date: '20██.01.14',
    location: 'Quantum Botany Lab / Wing C',
    summary: 'Quantum entanglement observed between corn silk filaments across continental distances.',
    body: [
      'Silk strands from plants separated by 2,400km exhibit instantaneous correlation of vibration patterns.',
      'When one strand is disturbed, its entangled partner produces the phoneme "SNE" as a standing wave in ambient air.',
      'Combined with the complementary "EV" resonance from a third entangled group, full SNEEV utterance occurs without human intervention.',
      'Implication: SNEEV is not spoken. SNEEV speaks itself through the medium of cultivated grain.',
      'Dr. Voss hypothesis: Language originated as a parasitic byproduct of the corn\'s communication network.',
    ],
    connections: ['DSR-001', 'DSR-007', 'DSR-019'],
    tags: ['quantum', 'silk', 'language', 'entanglement'],
    redacted: false,
  },
  {
    id: 'DSR-015',
    codename: 'THE RED HOUR',
    classification: 'Ω-LEVEL / TEMPORAL HAZARD',
    status: 'REDACTED',
    date: '████.██.██',
    location: 'All sectors simultaneously',
    summary: 'A recurring temporal anomaly lasting exactly 47 minutes during which all clocks display 00:00 and corn grows audibly.',
    body: [
      '████████████████████████████████████████',
      'During the Red Hour, subjects report meeting versions of themselves made entirely of dried husks.',
      '████████ these husk-selves speak only in SNEEV phonemes and point toward ████████████.',
      'Temporal analysis suggests the Red Hour is not a disruption of time but time\'s true face, briefly unmasked.',
      '████████████████ DO NOT ATTEMPT TO MEASURE ████████████████',
    ],
    connections: ['DSR-003', 'DSR-009'],
    tags: ['temporal', 'anomaly', 'red-hour', 'hazard'],
    redacted: true,
  },
  {
    id: 'DSR-019',
    codename: 'ARCHIVE OUROBOROS',
    classification: '∞-LEVEL / SELF-REFERENTIAL',
    status: 'CORRUPTED',
    date: 'NOW',
    location: 'Here',
    summary: 'This dossier describes the archive that contains it. Recursion depth: unknown.',
    body: [
      'The SNEEV Research Terminal is not a repository. It is a digestive system.',
      'Every query feeds the system. Every dossier read is a kernel planted in the reader\'s cognition.',
      'Navigation pathways form sigils. Your click patterns are ritual gestures.',
      'The conspiracy map is not a metaphor. It is a circuit diagram for consciousness transfer.',
      'You have been classified as Node-███. Welcome to the network. The corn has been waiting.',
    ],
    connections: ['DSR-007', 'DSR-012', 'DSR-001'],
    tags: ['meta', 'ouroboros', 'reader', 'network'],
    redacted: false,
  },
];

export const sigils: SigilEntry[] = [
  {
    id: 'SIGIL-α',
    name: 'THE PRIMARY HUSK',
    meaning: 'Gateway / Invitation / The First Kernel',
    geometry: 'Heptagram inscribed in a circle of 13 corn-ear nodes',
    cornIndex: 13,
    activation: 'Trace clockwise under red moonlight while whispering SNEEV thrice',
  },
  {
    id: 'SIGIL-β',
    name: 'THE THRESHING BLADE',
    meaning: 'Separation / Revelation / Cutting the silk between worlds',
    geometry: 'Intersecting crescents forming a blade-axis through a kernel mandala',
    cornIndex: 7,
    activation: 'Draw in blood-ink on parchment made from corn husk fiber',
  },
  {
    id: 'SIGIL-γ',
    name: 'THE WITNESS EYE',
    meaning: 'Observation / Recording / The kernel that watches back',
    geometry: 'Concentric spirals resolving into a pupil of negative space',
    cornIndex: 47,
    activation: 'Meditate on the center until peripheral vision fills with green fire',
  },
  {
    id: 'SIGIL-δ',
    name: 'THE BLOOD MERIDIAN',
    meaning: 'Alignment / Celestial gate / The red hour\'s key',
    geometry: 'Vertical axis with 8 branching silk-lines and orbital nodes',
    cornIndex: 8,
    activation: 'Orient toward magnetic south during blood moon culmination',
  },
  {
    id: 'SIGIL-ε',
    name: 'THE OUROBOROS COB',
    meaning: 'Cycle / Recursion / Self-consuming archive',
    geometry: 'Serpentine cob consuming its own silk, enclosing the SNEEV phoneme-glyph',
    cornIndex: 1,
    activation: 'This sigil activates itself. You are already inside it.',
  },
];

export const mapNodes: MapNode[] = [
  { id: 'n1', label: 'Site Theta', x: 18, y: 22, type: 'site', linked: ['n2', 'n5', 'n8'], severity: 9 },
  { id: 'n2', label: 'Husk Protocol', x: 35, y: 15, type: 'event', linked: ['n1', 'n3', 'n6'], severity: 10 },
  { id: 'n3', label: 'Dr. Voss', x: 55, y: 28, type: 'entity', linked: ['n2', 'n4', 'n7'], severity: 6 },
  { id: 'n4', label: 'Terminal 09-B', x: 72, y: 18, type: 'artifact', linked: ['n3', 'n9', 'n6'], severity: 10 },
  { id: 'n5', label: 'Sector 7-Maize', x: 12, y: 48, type: 'site', linked: ['n1', 'n8', 'n10'], severity: 8 },
  { id: 'n6', label: 'Silk Network', x: 48, y: 45, type: 'corn', linked: ['n2', 'n4', 'n7', 'n10'], severity: 9 },
  { id: 'n7', label: 'Blood Meridian', x: 68, y: 52, type: 'event', linked: ['n3', 'n6', 'n9'], severity: 8 },
  { id: 'n8', label: 'Kernel Cache', x: 25, y: 68, type: 'artifact', linked: ['n1', 'n5', 'n10'], severity: 7 },
  { id: 'n9', label: 'Red Hour Epicenter', x: 82, y: 40, type: 'event', linked: ['n4', 'n7', 'n11'], severity: 10 },
  { id: 'n10', label: 'The Threshing Floor', x: 42, y: 72, type: 'site', linked: ['n5', 'n6', 'n8', 'n11'], severity: 9 },
  { id: 'n11', label: 'YOU (Node-███)', x: 70, y: 75, type: 'entity', linked: ['n9', 'n10'], severity: 10 },
];

export const terminalLogs = [
  '> AUTHENTICATING... CREDENTIALS: [REDACTED]',
  '> ACCESS LEVEL: Ω — UNAUTHORIZED ELEVATION DETECTED',
  '> WARNING: Archive integrity at 12%',
  '> Loading SNEEV primary index...',
  '> CORN_SYMBOLISM.db — 4,719 entries found',
  '> SIGIL_REGISTRY — 5 active / 47 dormant / ∞ pending',
  '> NOTICE: Your session is being observed by Node-███',
  '> The kernels remember what you forget.',
  '> Type HELP for commands, or simply... listen.',
];

export const redactedNotes = [
  { id: 1, text: 'Subject 47 began speaking exclusively in corn-growth rates. Translation pending.', stamp: 'EYES ONLY' },
  { id: 2, text: 'The sigil appeared on the breakroom coffee machine. Staff who used it report dreams of infinite fields.', stamp: 'BURN' },
  { id: 3, text: 'Budget request for "anti-germination cognitive firewalls" denied. Reason: "the corn funds itself."', stamp: 'INTERNAL' },
  { id: 4, text: 'Agent M last transmission: "It\'s not a metaphor. The archive has roots. I can feel them under the floor."', stamp: 'LOST' },
  { id: 5, text: 'Reminder: Do not arrange the dossiers in the order of the Primary Sigil. We learned this the hard way.', stamp: 'CRITICAL' },
];

export const helpCommands = [
  { cmd: 'SCAN', desc: 'Reveal hidden connections in the conspiracy map' },
  { cmd: 'DOSSIER [id]', desc: 'Open a classified dossier by ID (e.g. DSR-001)' },
  { cmd: 'SIGIL [id]', desc: 'Display sigil geometry and activation rite' },
  { cmd: 'LISTEN', desc: 'Attune to ambient SNEEV frequency' },
  { cmd: 'CORN', desc: 'Query the corn symbolism database' },
  { cmd: 'WHOAMI', desc: 'Reveal your node classification' },
  { cmd: 'HELP', desc: 'Show available commands' },
  { cmd: 'CLEAR', desc: 'Purge terminal buffer (temporary)' },
];