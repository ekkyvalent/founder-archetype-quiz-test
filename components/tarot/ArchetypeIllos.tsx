'use client';

// Colour shorthands
const W = 'rgba(255,255,255,';
const M = '#00D395';

// ── Illo wrapper ─────────────────────────────────────────────────
function Illo({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-h-[140px]"
    >
      {children}
    </svg>
  );
}

// ── 000 · Stealth Architect — Blueprint Monolith ──────────────────
export function Illo000() {
  return (
    <Illo>
      {/* Grid lines — blueprint feel */}
      {[20, 40, 60, 80, 100].map(x => (
        <line key={`vg${x}`} x1={x} y1="10" x2={x} y2="110" stroke={`${W}0.07)`} strokeWidth="0.5" />
      ))}
      {[20, 40, 60, 80, 100].map(y => (
        <line key={`hg${y}`} x1="10" y1={y} x2="110" y2={y} stroke={`${W}0.07)`} strokeWidth="0.5" />
      ))}

      {/* Monolith — 3 stepped tiers */}
      <rect x="42" y="80" width="36" height="22" fill={`${W}0.06)`} stroke={`${W}0.18)`} strokeWidth="0.8" />
      <rect x="48" y="57" width="24" height="26" fill={`${W}0.08)`} stroke={`${W}0.22)`} strokeWidth="0.8" />
      <rect x="53" y="38" width="14" height="22" fill={`${W}0.10)`} stroke={`${W}0.28)`} strokeWidth="0.8" />

      {/* Blueprint measurement lines */}
      <line x1="36" y1="80" x2="36" y2="102" stroke={`${W}0.20)`} strokeWidth="0.6" strokeDasharray="2 2" />
      <line x1="84" y1="80" x2="84" y2="102" stroke={`${W}0.20)`} strokeWidth="0.6" strokeDasharray="2 2" />
      <line x1="36" y1="91" x2="42" y2="91" stroke={`${W}0.20)`} strokeWidth="0.6" />
      <line x1="78" y1="91" x2="84" y2="91" stroke={`${W}0.20)`} strokeWidth="0.6" />

      {/* Mint apex gem */}
      <polygon points="60,20 65,32 60,38 55,32" fill={M} opacity="0.9" />
      <polygon points="60,20 65,32 60,28" fill="white" opacity="0.15" />

      {/* Accent dots on grid corners */}
      <circle cx="42" cy="80" r="1.5" fill={M} opacity="0.5" />
      <circle cx="78" cy="80" r="1.5" fill={M} opacity="0.5" />
      <circle cx="48" cy="57" r="1.5" fill={M} opacity="0.5" />
      <circle cx="72" cy="57" r="1.5" fill={M} opacity="0.5" />
    </Illo>
  );
}

// ── 001 · Visionary Cartographer — Constellation Compass ──────────
export function Illo001() {
  const stars = [
    [60, 28], [78, 42], [85, 65], [72, 84], [48, 84],
    [35, 65], [42, 42], [60, 60],
  ] as [number, number][];

  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], [0, 7], [7, 2], [7, 4], [7, 6],
  ];

  return (
    <Illo>
      {/* Compass rose rings */}
      <circle cx="60" cy="60" r="45" stroke={`${W}0.06)`} strokeWidth="0.5" />
      <circle cx="60" cy="60" r="30" stroke={`${W}0.08)`} strokeWidth="0.5" />

      {/* Cardinal tick marks */}
      {[0, 90, 180, 270].map(deg => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={60 + 30 * Math.cos(rad)}
            y1={60 + 30 * Math.sin(rad)}
            x2={60 + 45 * Math.cos(rad)}
            y2={60 + 45 * Math.sin(rad)}
            stroke={`${W}0.20)`}
            strokeWidth="0.7"
          />
        );
      })}

      {/* Constellation edges */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={stars[a][0]} y1={stars[a][1]}
          x2={stars[b][0]} y2={stars[b][1]}
          stroke={`${W}0.18)`}
          strokeWidth="0.6"
        />
      ))}

      {/* Star nodes */}
      {stars.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx} cy={cy}
          r={i === 7 ? 3.5 : 2}
          fill={i === 7 ? M : `${W}0.45)`}
        />
      ))}

      {/* Compass needle — north pointing mint */}
      <polygon points="60,15 62.5,60 60,65 57.5,60" fill={M} opacity="0.9" />
      <polygon points="60,105 62.5,60 60,65 57.5,60" fill={`${W}0.20)`} />
      <circle cx="60" cy="60" r="3.5" fill={`${W}0.12)`} stroke={M} strokeWidth="1" />
    </Illo>
  );
}

// ── 010 · Product Perfectionist — Hexagonal Gem ──────────────────
export function Illo010() {
  // Regular hexagon centred at 60,60 r=40
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i - 30);
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(' ');

  return (
    <Illo>
      {/* Outer hex ring */}
      <polygon points={hex(60, 60, 44)} stroke={`${W}0.10)`} strokeWidth="0.6" />

      {/* Mid hex */}
      <polygon points={hex(60, 60, 30)} fill={`${W}0.04)`} stroke={`${W}0.18)`} strokeWidth="0.8" />

      {/* Inner gem faces */}
      <polygon points={hex(60, 60, 18)} fill={`${W}0.08)`} stroke={`${W}0.28)`} strokeWidth="0.8" />

      {/* Facet lines from centre to mid hex vertices */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 180) * (60 * i - 30);
        return (
          <line
            key={i}
            x1="60" y1="60"
            x2={60 + 30 * Math.cos(a)}
            y2={60 + 30 * Math.sin(a)}
            stroke={`${W}0.12)`}
            strokeWidth="0.5"
          />
        );
      })}

      {/* Mint inner hex glow */}
      <polygon points={hex(60, 60, 18)} fill={M} opacity="0.12" />
      <polygon points={hex(60, 60, 18)} stroke={M} strokeWidth="1" opacity="0.6" />

      {/* Centre highlight */}
      <circle cx="60" cy="60" r="5" fill={M} opacity="0.85" />
      <circle cx="58" cy="58" r="2" fill="white" opacity="0.25" />

      {/* Corner facet highlights (top-left faces) */}
      {[0, 1].map(i => {
        const a = (Math.PI / 180) * (60 * i - 30);
        const bx = 60 + 30 * Math.cos(a);
        const by = 60 + 30 * Math.sin(a);
        const a2 = (Math.PI / 180) * (60 * (i + 1) - 30);
        const cx2 = 60 + 30 * Math.cos(a2);
        const cy2 = 60 + 30 * Math.sin(a2);
        return (
          <polygon
            key={i}
            points={`60,60 ${bx},${by} ${cx2},${cy2}`}
            fill="white"
            opacity="0.05"
          />
        );
      })}
    </Illo>
  );
}

// ── 011 · Global Guardian — Shield + Globe ────────────────────────
export function Illo011() {
  return (
    <Illo>
      {/* Globe behind shield */}
      <circle cx="60" cy="58" r="35" fill={`${W}0.04)`} stroke={`${W}0.12)`} strokeWidth="0.7" />
      {/* Latitude lines */}
      {[-18, 0, 18].map(dy => (
        <ellipse
          key={dy}
          cx="60" cy={58 + dy}
          rx={Math.sqrt(35 * 35 - dy * dy)}
          ry={Math.abs(dy) < 2 ? 8 : 5}
          stroke={`${W}0.12)`}
          strokeWidth="0.5"
          fill="none"
        />
      ))}
      {/* Longitude lines */}
      {[-18, 0, 18].map(dx => (
        <ellipse
          key={dx}
          cx={60 + dx}
          cy="58"
          rx={Math.abs(dx) < 2 ? 8 : 5}
          ry="35"
          stroke={`${W}0.12)`}
          strokeWidth="0.5"
          fill="none"
        />
      ))}
      {/* Equator highlight */}
      <ellipse cx="60" cy="58" rx="35" ry="8" stroke={M} strokeWidth="0.7" fill="none" opacity="0.5" />

      {/* Shield */}
      <path
        d="M60 18 L85 30 L85 58 Q85 80 60 92 Q35 80 35 58 L35 30 Z"
        fill={`${W}0.08)`}
        stroke={`${W}0.30)`}
        strokeWidth="1.2"
      />
      {/* Shield inner border */}
      <path
        d="M60 25 L79 35 L79 58 Q79 75 60 85 Q41 75 41 58 L41 35 Z"
        fill="none"
        stroke={M}
        strokeWidth="0.8"
        opacity="0.4"
      />
      {/* Mint checkmark on shield */}
      <polyline
        points="48,57 56,66 72,46"
        stroke={M}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Illo>
  );
}

// ── 100 · Chaos Pilot — Exploding Star ───────────────────────────
export function Illo100() {
  const rays = 12;
  return (
    <Illo>
      {/* Outer burst rays */}
      {Array.from({ length: rays }, (_, i) => {
        const a = (i * Math.PI * 2) / rays;
        const inner = i % 2 === 0 ? 28 : 20;
        const outer = i % 2 === 0 ? 50 : 42;
        return (
          <line
            key={i}
            x1={60 + inner * Math.cos(a)}
            y1={60 + inner * Math.sin(a)}
            x2={60 + outer * Math.cos(a)}
            y2={60 + outer * Math.sin(a)}
            stroke={`${W}${i % 2 === 0 ? '0.30' : '0.15'})`}
            strokeWidth={i % 2 === 0 ? '1' : '0.5'}
            strokeLinecap="round"
          />
        );
      })}

      {/* Irregular star polygon */}
      {(() => {
        const pts = Array.from({ length: rays }, (_, i) => {
          const a = (i * Math.PI * 2) / rays - Math.PI / 2;
          const r = i % 2 === 0 ? 28 : 14;
          return `${60 + r * Math.cos(a)},${60 + r * Math.sin(a)}`;
        }).join(' ');
        return <polygon points={pts} fill={`${W}0.08)`} stroke={`${W}0.25)`} strokeWidth="0.7" />;
      })()}

      {/* Speed scatter fragments */}
      {[
        [20, 30, 28, 25],
        [95, 45, 100, 38],
        [15, 80, 10, 88],
        [98, 85, 104, 90],
        [60, 10, 60, 4],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={`${W}0.20)`}
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      ))}

      {/* Mint core burst */}
      <circle cx="60" cy="60" r="14" fill={M} opacity="0.15" />
      <circle cx="60" cy="60" r="9" fill={M} opacity="0.85" />
      <circle cx="57" cy="57" r="3" fill="white" opacity="0.25" />
    </Illo>
  );
}

// ── 101 · AI Monster — Neural Eye ────────────────────────────────
export function Illo101() {
  const nodes = [
    [60, 60], // centre
    [60, 28], [85, 45], [85, 75], [60, 92], [35, 75], [35, 45], // ring 1
    [60, 12], [98, 35], [98, 85], [60, 108], [22, 85], [22, 35], // ring 2
  ] as [number, number][];

  const edges: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 7], [2, 8], [3, 9], [4, 10], [5, 11], [6, 12],
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1],
  ];

  return (
    <Illo>
      {/* Neural network edges */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={`${W}0.12)`}
          strokeWidth="0.5"
        />
      ))}

      {/* Outer ring nodes */}
      {nodes.slice(7).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2" fill={`${W}0.25)`} />
      ))}

      {/* Mid ring nodes */}
      {nodes.slice(1, 7).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill={`${W}0.35)`} />
      ))}

      {/* Eye at centre */}
      {/* Iris glow */}
      <circle cx="60" cy="60" r="18" fill={M} opacity="0.08" />
      {/* Eye outline */}
      <path
        d="M28,60 Q44,38 60,38 Q76,38 92,60 Q76,82 60,82 Q44,82 28,60 Z"
        fill={`${W}0.06)`}
        stroke={`${W}0.25)`}
        strokeWidth="0.8"
      />
      {/* Iris */}
      <circle cx="60" cy="60" r="12" fill={`${W}0.06)`} stroke={M} strokeWidth="1" opacity="0.8" />
      {/* Pupil */}
      <circle cx="60" cy="60" r="6" fill={M} opacity="0.90" />
      {/* Specular */}
      <circle cx="57" cy="57" r="2.5" fill="white" opacity="0.30" />

      {/* Scan lines through eye */}
      <line x1="28" y1="60" x2="92" y2="60" stroke={M} strokeWidth="0.4" opacity="0.25" />
      <line x1="60" y1="38" x2="60" y2="82" stroke={M} strokeWidth="0.4" opacity="0.25" />
    </Illo>
  );
}

// ── 110 · High-Velocity Tinkerer — Gear + Lightning ──────────────
export function Illo110() {
  const teeth = 10;
  const gearPts = Array.from({ length: teeth * 4 }, (_, i) => {
    const seg = Math.floor(i / 4);
    const phase = i % 4;
    const baseAngle = (seg * Math.PI * 2) / teeth;
    const stepAngle = (Math.PI * 2) / (teeth * 4);
    const angle = baseAngle + phase * stepAngle;
    const r = phase === 1 || phase === 2 ? 40 : 32;
    return `${60 + r * Math.cos(angle)},${60 + r * Math.sin(angle)}`;
  }).join(' ');

  return (
    <Illo>
      {/* Gear body */}
      <polygon points={gearPts} fill={`${W}0.06)`} stroke={`${W}0.22)`} strokeWidth="0.8" />

      {/* Inner ring */}
      <circle cx="60" cy="60" r="18" fill={`${W}0.08)`} stroke={`${W}0.28)`} strokeWidth="0.8" />

      {/* Cross spokes */}
      <line x1="60" y1="42" x2="60" y2="78" stroke={`${W}0.15)`} strokeWidth="0.6" />
      <line x1="42" y1="60" x2="78" y2="60" stroke={`${W}0.15)`} strokeWidth="0.6" />
      <line x1="47" y1="47" x2="73" y2="73" stroke={`${W}0.10)`} strokeWidth="0.6" />
      <line x1="73" y1="47" x2="47" y2="73" stroke={`${W}0.10)`} strokeWidth="0.6" />

      {/* Centre hub */}
      <circle cx="60" cy="60" r="7" fill={M} opacity="0.15" stroke={M} strokeWidth="0.8" />

      {/* Lightning bolt overlay */}
      <path
        d="M66,22 L52,58 L61,58 L54,98 L74,52 L64,52 Z"
        fill={M}
        opacity="0.90"
        strokeLinejoin="round"
      />
      {/* Highlight facet */}
      <path
        d="M66,22 L64,52 L74,52 Z"
        fill="white"
        opacity="0.15"
      />
    </Illo>
  );
}

// ── 111 · Global Juggernaut — Crown + Globe ───────────────────────
export function Illo111() {
  return (
    <Illo>
      {/* Globe */}
      <circle cx="60" cy="68" r="36" fill={`${W}0.04)`} stroke={`${W}0.14)`} strokeWidth="0.8" />
      {/* Latitude lines */}
      {[-14, 0, 14].map(dy => (
        <ellipse
          key={dy}
          cx="60" cy={68 + dy}
          rx={Math.sqrt(36 * 36 - dy * dy)}
          ry={Math.abs(dy) < 2 ? 9 : 5.5}
          stroke={`${W}0.12)`}
          strokeWidth="0.5"
          fill="none"
        />
      ))}
      {/* Longitude lines */}
      {[-14, 0, 14].map(dx => (
        <ellipse
          key={dx}
          cx={60 + dx}
          cy="68"
          rx={Math.abs(dx) < 2 ? 9 : 5.5}
          ry="36"
          stroke={`${W}0.12)`}
          strokeWidth="0.5"
          fill="none"
        />
      ))}
      {/* Mint equator */}
      <ellipse cx="60" cy="68" rx="36" ry="9" stroke={M} strokeWidth="0.8" fill="none" opacity="0.55" />

      {/* Crown — sits atop globe */}
      {/* Crown base band */}
      <rect x="36" y="44" width="48" height="10" rx="1" fill={`${W}0.10)`} stroke={`${W}0.28)`} strokeWidth="0.8" />
      {/* Crown points — 3 peaks */}
      <path
        d="M36,44 L36,28 L48,38 L60,22 L72,38 L84,28 L84,44 Z"
        fill={`${W}0.08)`}
        stroke={`${W}0.30)`}
        strokeWidth="0.8"
      />
      {/* Mint gem at tip */}
      <polygon points="60,22 64,30 60,34 56,30" fill={M} opacity="0.95" />
      <polygon points="60,22 64,30 60,28" fill="white" opacity="0.20" />
      {/* Side gems */}
      <circle cx="36" cy="28" r="3" fill={M} opacity="0.55" />
      <circle cx="84" cy="28" r="3" fill={M} opacity="0.55" />
      {/* Crown band dots */}
      {[42, 52, 60, 68, 78].map(x => (
        <circle key={x} cx={x} cy="49" r="1.2" fill={M} opacity="0.50" />
      ))}
    </Illo>
  );
}

// ── Lookup map ────────────────────────────────────────────────────
export const ARCHETYPE_ILLOS: Record<string, React.FC> = {
  '000': Illo000,
  '001': Illo001,
  '010': Illo010,
  '011': Illo011,
  '100': Illo100,
  '101': Illo101,
  '110': Illo110,
  '111': Illo111,
};

// Also expose by slug for convenience
export const ARCHETYPE_ILLOS_BY_SLUG: Record<string, React.FC> = {
  'stealth-architect':       Illo000,
  'visionary-cartographer':  Illo001,
  'product-perfectionist':   Illo010,
  'global-guardian':         Illo011,
  'chaos-pilot':             Illo100,
  'ai-monster':              Illo101,
  'high-velocity-tinkerer':  Illo110,
  'global-juggernaut':       Illo111,
};
