// ─────────────────────────────────────────────────────────────
// QUESTION ILLUSTRATIONS
// Each question has two contrasting SVG compositions (A and B).
// A options → structured, grounded, singular
// B options → dynamic, expansive, energetic
// viewBox: 0 0 120 120 (square, scales to fill card)
// ─────────────────────────────────────────────────────────────

const W = 'rgba(255,255,255,'; // white helper
const M = '#00D395';           // mint

// ── Shared wrapper ────────────────────────────────────────────
function Illo({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[120px]">
      {children}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════
// Q1 — Competitor launches: Foundation vs Speed
// ═══════════════════════════════════════════════════════════

// A: The Foundation — tiered pyramid / fortress
export function Q1A() {
  return (
    <Illo>
      {/* Grid lines */}
      {[30,45,60,75,90].map(y => (
        <line key={y} x1="10" y1={y} x2="110" y2={y} stroke={W+'0.06)'} strokeWidth="1"/>
      ))}
      {/* Pyramid tiers */}
      <rect x="25" y="90" width="70" height="13" rx="2" fill={W+'0.12)'} stroke={W+'0.25)'} strokeWidth="1"/>
      <rect x="35" y="73" width="50" height="13" rx="2" fill={W+'0.16)'} stroke={W+'0.3)'} strokeWidth="1"/>
      <rect x="45" y="56" width="30" height="13" rx="2" fill={W+'0.22)'} stroke={W+'0.35)'} strokeWidth="1"/>
      {/* Apex gem */}
      <rect x="55" y="38" width="10" height="10" transform="rotate(45 60 43)" fill={M} opacity="0.9"/>
    </Illo>
  );
}

// B: The Arrow — upward counter-strike
export function Q1B() {
  return (
    <Illo>
      {/* Speed lines */}
      {[-20,-10,0,10,20].map((offset, i) => (
        <line key={i} x1={60+offset} y1={95} x2={60+offset*0.3} y2={70} stroke={W+'0.1)'} strokeWidth="1.5" strokeLinecap="round"/>
      ))}
      {/* Arrow shaft */}
      <line x1="60" y1="95" x2="60" y2="35" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Arrow head */}
      <path d="M44 52 L60 28 L76 52" fill={M} stroke={M} strokeWidth="1" strokeLinejoin="round"/>
      {/* Motion circles */}
      <circle cx="60" cy="80" r="3" fill={W+'0.1)'} />
      <circle cx="60" cy="65" r="2" fill={W+'0.15)'} />
    </Illo>
  );
}

// ═══════════════════════════════════════════════════════════
// Q2 — Team divide: Gut call vs Consensus
// ═══════════════════════════════════════════════════════════

// A: The Flame — singular gut instinct
export function Q2A() {
  return (
    <Illo>
      {/* Outer glow rings */}
      <circle cx="60" cy="75" r="28" stroke={M} strokeWidth="0.5" opacity="0.15"/>
      <circle cx="60" cy="75" r="18" stroke={M} strokeWidth="0.5" opacity="0.2"/>
      {/* Flame body */}
      <path
        d="M60 30 C60 30 75 50 72 65 C70 75 65 78 60 90 C55 78 50 75 48 65 C45 50 60 30 60 30Z"
        fill={M} opacity="0.85"
      />
      {/* Inner flame highlight */}
      <path
        d="M60 45 C60 45 68 58 66 68 C64 75 62 77 60 83 C58 77 56 75 54 68 C52 58 60 45 60 45Z"
        fill="white" opacity="0.3"
      />
    </Illo>
  );
}

// B: The Triad — three nodes aligned
export function Q2B() {
  return (
    <Illo>
      {/* Connecting lines */}
      <line x1="60" y1="28" x2="30" y2="85" stroke={W+'0.3)'} strokeWidth="1.5"/>
      <line x1="60" y1="28" x2="90" y2="85" stroke={W+'0.3)'} strokeWidth="1.5"/>
      <line x1="30" y1="85" x2="90" y2="85" stroke={W+'0.3)'} strokeWidth="1.5"/>
      {/* Center convergence ring */}
      <circle cx="60" cy="66" r="6" stroke={M} strokeWidth="1" fill={M} fillOpacity="0.1"/>
      {/* Three nodes */}
      <circle cx="60" cy="28" r="7" fill={M} opacity="0.9"/>
      <circle cx="30" cy="85" r="7" fill="white" opacity="0.6"/>
      <circle cx="90" cy="85" r="7" fill="white" opacity="0.6"/>
      {/* Node inner dots */}
      <circle cx="30" cy="85" r="2.5" fill={M}/>
      <circle cx="90" cy="85" r="2.5" fill={M}/>
    </Illo>
  );
}

// ═══════════════════════════════════════════════════════════
// Q3 — Fresh funding: Shore up vs Deploy
// ═══════════════════════════════════════════════════════════

// A: The Vault — protect and preserve
export function Q3A() {
  return (
    <Illo>
      {/* Vault body */}
      <rect x="28" y="35" width="64" height="64" rx="8" fill={W+'0.06)'} stroke={W+'0.25)'} strokeWidth="1.5"/>
      {/* Vault door circle */}
      <circle cx="60" cy="67" r="22" stroke={W+'0.3)'} strokeWidth="1.5" fill={W+'0.04)'}/>
      {/* Handle */}
      <circle cx="60" cy="67" r="8" stroke={M} strokeWidth="1.5" fill={M} fillOpacity="0.15"/>
      {/* Locking spokes */}
      <line x1="60" y1="45" x2="60" y2="51" stroke={W+'0.4)'} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="60" y1="83" x2="60" y2="89" stroke={W+'0.4)'} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="38" y1="67" x2="44" y2="67" stroke={W+'0.4)'} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="76" y1="67" x2="82" y2="67" stroke={W+'0.4)'} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Keyhole */}
      <circle cx="60" cy="64" r="3" fill={M}/>
      <rect x="58" y="66" width="4" height="5" rx="1" fill={M}/>
    </Illo>
  );
}

// B: The Scatter — seeds radiating outward
export function Q3B() {
  return (
    <Illo>
      {/* Radiating lines */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 60 + 12 * Math.cos(rad);
        const y1 = 60 + 12 * Math.sin(rad);
        const x2 = 60 + 40 * Math.cos(rad);
        const y2 = 60 + 40 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={W+'0.2)'} strokeWidth="1.5" strokeLinecap="round"/>;
      })}
      {/* Center burst */}
      <circle cx="60" cy="60" r="10" fill={M} opacity="0.9"/>
      <circle cx="60" cy="60" r="5" fill="white" opacity="0.4"/>
      {/* Outer dots */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 60 + 43 * Math.cos(rad);
        const cy = 60 + 43 * Math.sin(rad);
        return <circle key={i} cx={cx} cy={cy} r="3.5" fill={M} opacity={0.5 + (i % 3) * 0.2}/>;
      })}
    </Illo>
  );
}

// ═══════════════════════════════════════════════════════════
// Q4 — High-stakes decisions: Conviction vs Principle
// ═══════════════════════════════════════════════════════════

// A: The Eye — singular vision, conviction
export function Q4A() {
  return (
    <Illo>
      {/* Outer radiating lines */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const r1 = 32, r2 = 42;
        return <line key={i} x1={60+r1*Math.cos(rad)} y1={60+r1*Math.sin(rad)} x2={60+r2*Math.cos(rad)} y2={60+r2*Math.sin(rad)} stroke={W+'0.18)'} strokeWidth="1" strokeLinecap="round"/>;
      })}
      {/* Eye outline */}
      <path d="M20 60 Q60 25 100 60 Q60 95 20 60Z" stroke={W+'0.35)'} strokeWidth="1.5" fill={W+'0.04)'}/>
      {/* Iris */}
      <circle cx="60" cy="60" r="16" stroke={M} strokeWidth="1.5" fill={M} fillOpacity="0.1"/>
      {/* Pupil */}
      <circle cx="60" cy="60" r="7" fill={M} opacity="0.9"/>
      <circle cx="57" cy="57" r="2.5" fill="white" opacity="0.5"/>
    </Illo>
  );
}

// B: The Pillars — structured principles and framework
export function Q4B() {
  return (
    <Illo>
      {/* Arch */}
      <path d="M28 55 Q28 25 60 25 Q92 25 92 55" stroke={W+'0.4)'} strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Left pillar */}
      <rect x="24" y="54" width="12" height="44" rx="1" fill={W+'0.12)'} stroke={W+'0.25)'} strokeWidth="1"/>
      {/* Right pillar */}
      <rect x="84" y="54" width="12" height="44" rx="1" fill={W+'0.12)'} stroke={W+'0.25)'} strokeWidth="1"/>
      {/* Pillar caps */}
      <rect x="21" y="50" width="18" height="5" rx="1" fill={W+'0.2)'} stroke={W+'0.3)'} strokeWidth="1"/>
      <rect x="81" y="50" width="18" height="5" rx="1" fill={W+'0.2)'} stroke={W+'0.3)'} strokeWidth="1"/>
      {/* Center keystone */}
      <path d="M52 25 L60 18 L68 25Z" fill={M} opacity="0.8"/>
      {/* Ground line */}
      <line x1="18" y1="98" x2="102" y2="98" stroke={W+'0.2)'} strokeWidth="1"/>
    </Illo>
  );
}

// ═══════════════════════════════════════════════════════════
// Q5 — Hiring: Believers vs Operators
// ═══════════════════════════════════════════════════════════

// A: The Torch — mission and belief
export function Q5A() {
  return (
    <Illo>
      {/* Torch handle */}
      <rect x="56" y="68" width="8" height="35" rx="4" fill={W+'0.25)'} stroke={W+'0.3)'} strokeWidth="1"/>
      {/* Torch cup */}
      <path d="M48 68 Q48 55 60 53 Q72 55 72 68Z" fill={W+'0.15)'} stroke={W+'0.3)'} strokeWidth="1"/>
      {/* Flame layers */}
      <path d="M60 20 C60 20 73 38 70 53 C68 62 64 65 60 70 C56 65 52 62 50 53 C47 38 60 20 60 20Z" fill={M} opacity="0.8"/>
      <path d="M60 32 C60 32 69 46 67 55 C65 62 62 64 60 68 C58 64 55 62 53 55 C51 46 60 32 60 32Z" fill="white" opacity="0.25"/>
    </Illo>
  );
}

// B: The Gear — systems and operators
export function Q5B() {
  return (
    <Illo>
      {/* Outer gear teeth */}
      {Array.from({length: 10}).map((_, i) => {
        const angle = (i * 36 * Math.PI) / 180;
        const cx = 60 + 36 * Math.cos(angle);
        const cy = 60 + 36 * Math.sin(angle);
        return (
          <rect
            key={i}
            x={cx - 4}
            y={cy - 4}
            width="8"
            height="8"
            rx="1.5"
            transform={`rotate(${i * 36} ${cx} ${cy})`}
            fill={W+'0.2)'}
            stroke={W+'0.3)'}
            strokeWidth="1"
          />
        );
      })}
      {/* Gear body */}
      <circle cx="60" cy="60" r="28" fill={W+'0.06)'} stroke={W+'0.2)'} strokeWidth="1.5"/>
      {/* Inner ring */}
      <circle cx="60" cy="60" r="16" fill={W+'0.04)'} stroke={M} strokeWidth="1.5"/>
      {/* Center axle */}
      <circle cx="60" cy="60" r="6" fill={M} opacity="0.8"/>
      {/* Cross spokes */}
      <line x1="60" y1="44" x2="60" y2="76" stroke={W+'0.3)'} strokeWidth="1.5"/>
      <line x1="44" y1="60" x2="76" y2="60" stroke={W+'0.3)'} strokeWidth="1.5"/>
    </Illo>
  );
}

// ═══════════════════════════════════════════════════════════
// Q6 — Roadmap behind: Perfect craft vs Ship MVP
// ═══════════════════════════════════════════════════════════

// A: The Gem — perfectionism and craft
export function Q6A() {
  return (
    <Illo>
      {/* Facet lines from center */}
      <line x1="60" y1="22" x2="60" y2="98" stroke={W+'0.1)'} strokeWidth="1"/>
      <line x1="20" y1="55" x2="100" y2="65" stroke={W+'0.1)'} strokeWidth="1"/>
      <line x1="22" y1="70" x2="98" y2="50" stroke={W+'0.1)'} strokeWidth="1"/>
      {/* Gem outline */}
      <path d="M60 22 L90 50 L80 98 L40 98 L30 50 Z" fill={W+'0.05)'} stroke={W+'0.35)'} strokeWidth="1.5"/>
      {/* Crown facets */}
      <path d="M60 22 L90 50 L60 42 Z" fill={M} opacity="0.25"/>
      <path d="M60 22 L30 50 L60 42 Z" fill={M} opacity="0.15"/>
      {/* Girdle line */}
      <line x1="30" y1="50" x2="90" y2="50" stroke={M} strokeWidth="1" opacity="0.6"/>
      {/* Culet point highlight */}
      <circle cx="60" cy="96" r="3" fill={M} opacity="0.7"/>
      {/* Table highlight */}
      <circle cx="60" cy="40" r="4" fill="white" opacity="0.4"/>
    </Illo>
  );
}

// B: The Paper Plane — ship it, go now
export function Q6B() {
  return (
    <Illo>
      {/* Dotted trail */}
      {[0,1,2,3,4].map(i => (
        <circle key={i} cx={95 - i*12} cy={62 + i*8} r="2" fill={M} opacity={0.5 - i*0.08}/>
      ))}
      {/* Plane body */}
      <path d="M22 88 L92 38 L72 98 L55 72 Z" fill={W+'0.12)'} stroke={W+'0.35)'} strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Wing crease */}
      <line x1="22" y1="88" x2="72" y2="98" stroke={W+'0.4)'} strokeWidth="1" strokeLinecap="round"/>
      {/* Nose tip highlight */}
      <circle cx="92" cy="38" r="3" fill={M} opacity="0.8"/>
    </Illo>
  );
}

// ═══════════════════════════════════════════════════════════
// Q7 — Scale: Lean team vs Global markets
// ═══════════════════════════════════════════════════════════

// A: The Crystal — concentrated excellence
export function Q7A() {
  return (
    <Illo>
      {/* Crystal / octahedron */}
      <path d="M60 18 L92 60 L60 102 L28 60 Z" fill={W+'0.06)'} stroke={W+'0.3)'} strokeWidth="1.5"/>
      {/* Vertical center line */}
      <line x1="60" y1="18" x2="60" y2="102" stroke={W+'0.2)'} strokeWidth="1"/>
      {/* Horizontal equator */}
      <line x1="28" y1="60" x2="92" y2="60" stroke={M} strokeWidth="1" opacity="0.7"/>
      {/* Upper face fills */}
      <path d="M60 18 L92 60 L60 60 Z" fill={M} opacity="0.12"/>
      <path d="M60 18 L28 60 L60 60 Z" fill={W+'0.06)'}/>
      {/* Inner glow point */}
      <circle cx="60" cy="60" r="5" fill={M} opacity="0.6"/>
      <circle cx="60" cy="60" r="2" fill="white" opacity="0.5"/>
    </Illo>
  );
}

// B: The Globe — global expansion
export function Q7B() {
  return (
    <Illo>
      {/* Globe circle */}
      <circle cx="60" cy="60" r="38" fill={W+'0.04)'} stroke={W+'0.25)'} strokeWidth="1.5"/>
      {/* Latitude lines */}
      {[-20, 0, 20].map((offset, i) => (
        <ellipse key={i} cx="60" cy={60+offset} rx="38" ry={Math.abs(offset) === 20 ? 14 : 38} fill="none" stroke={W+'0.12)'} strokeWidth="1"/>
      ))}
      {/* Longitude lines */}
      {[-1, 0, 1].map((offset, i) => (
        <ellipse key={i} cx="60" cy="60" rx={Math.abs(offset) === 1 ? 20 : 38} ry="38" fill="none" stroke={W+'0.12)'} strokeWidth="1"/>
      ))}
      {/* Equator highlight */}
      <ellipse cx="60" cy="60" rx="38" ry="38" fill="none" stroke={M} strokeWidth="1" opacity="0.4"/>
      {/* Pole dots */}
      <circle cx="60" cy="22" r="3" fill={M} opacity="0.7"/>
      <circle cx="60" cy="98" r="3" fill={M} opacity="0.4"/>
    </Illo>
  );
}

// ═══════════════════════════════════════════════════════════
// Q8 — AI role: Human creativity vs Automate everything
// ═══════════════════════════════════════════════════════════

// A: The Feather — human judgment
export function Q8A() {
  return (
    <Illo>
      {/* Feather spine */}
      <path d="M60 100 Q55 70 45 28" stroke={W+'0.5)'} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Feather barbs right */}
      {[28,38,48,58,68,78,88].map((y, i) => {
        const x = 45 + i * 2.5;
        return <path key={i} d={`M${x} ${y} Q${x+20} ${y-4} ${x+30} ${y+8}`} stroke={W+(0.15+i*0.04)+')'} strokeWidth="1.2" fill="none" strokeLinecap="round"/>;
      })}
      {/* Feather barbs left */}
      {[32,42,52,62,72,82].map((y, i) => {
        const x = 46 + i * 2.5;
        return <path key={i} d={`M${x} ${y} Q${x-18} ${y-2} ${x-25} ${y+9}`} stroke={W+(0.1+i*0.03)+')'} strokeWidth="1.2" fill="none" strokeLinecap="round"/>;
      })}
      {/* Quill tip glow */}
      <circle cx="45" cy="28" r="3" fill={M} opacity="0.7"/>
    </Illo>
  );
}

// B: The Circuit — automate everything
export function Q8B() {
  return (
    <Illo>
      {/* Circuit traces */}
      <path d="M20 60 L40 60 L40 40 L60 40 L60 30" stroke={W+'0.25)'} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 60 L20 80 L40 80 L40 90 L80 90 L80 80 L100 80" stroke={W+'0.25)'} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M60 60 L80 60 L80 40 L100 40" stroke={W+'0.25)'} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M40 60 L60 60" stroke={M} strokeWidth="1.5" fill="none"/>
      <path d="M60 60 L60 80" stroke={M} strokeWidth="1.5" fill="none"/>
      {/* Nodes */}
      {[[40,60],[60,40],[60,60],[80,60],[60,80],[40,80]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill={i===2 ? M : W+'0.2)'} stroke={i===2 ? 'white' : W+'0.3)'} strokeWidth="1"/>
      ))}
      {/* Terminal dots */}
      <circle cx="20" cy="60" r="3" fill={M} opacity="0.6"/>
      <circle cx="60" cy="30" r="3" fill={M} opacity="0.6"/>
      <circle cx="100" cy="40" r="3" fill={M} opacity="0.6"/>
      <circle cx="100" cy="80" r="3" fill={M} opacity="0.6"/>
    </Illo>
  );
}

// ═══════════════════════════════════════════════════════════
// Q9 — Investor move: Brand vs Growth
// ═══════════════════════════════════════════════════════════

// A: The Shield — brand integrity
export function Q9A() {
  return (
    <Illo>
      {/* Shield outline */}
      <path d="M60 18 L92 32 L92 70 Q92 95 60 105 Q28 95 28 70 L28 32 Z" fill={W+'0.05)'} stroke={W+'0.3)'} strokeWidth="1.5"/>
      {/* Shield inner */}
      <path d="M60 28 L82 39 L82 68 Q82 87 60 96 Q38 87 38 68 L38 39 Z" fill={W+'0.04)'} stroke={W+'0.15)'} strokeWidth="1"/>
      {/* Center mark */}
      <circle cx="60" cy="62" r="12" stroke={M} strokeWidth="1.5" fill={M} fillOpacity="0.1"/>
      {/* Checkmark */}
      <path d="M53 62 L58 68 L68 54" stroke={M} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </Illo>
  );
}

// B: The Chart — growth validation
export function Q9B() {
  return (
    <Illo>
      {/* Grid */}
      {[40,60,80].map(y => (
        <line key={y} x1="22" y1={y} x2="100" y2={y} stroke={W+'0.08)'} strokeWidth="1"/>
      ))}
      {/* Bars */}
      <rect x="28" y="78" width="14" height="22" rx="2" fill={W+'0.15)'} stroke={W+'0.2)'} strokeWidth="1"/>
      <rect x="48" y="62" width="14" height="38" rx="2" fill={W+'0.2)'} stroke={W+'0.25)'} strokeWidth="1"/>
      <rect x="68" y="44" width="14" height="56" rx="2" fill={W+'0.28)'} stroke={W+'0.3)'} strokeWidth="1"/>
      <rect x="88" y="28" width="14" height="72" rx="2" fill={M} opacity="0.7" stroke={M} strokeWidth="1" strokeOpacity="0.8"/>
      {/* Trend arrow */}
      <path d="M32 82 L52 66 L72 48 L94 30" stroke={M} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" fill="none"/>
      {/* Arrow tip */}
      <path d="M88 26 L100 28 L94 40" fill={M} opacity="0.8"/>
      {/* X axis */}
      <line x1="22" y1="100" x2="108" y2="100" stroke={W+'0.2)'} strokeWidth="1"/>
    </Illo>
  );
}

// ═══════════════════════════════════════════════════════════
// Q10 — Leadership style: Visionary vs Disciplined
// ═══════════════════════════════════════════════════════════

// A: The Star — unshakeable, visionary
export function Q10A() {
  return (
    <Illo>
      {/* Long rays */}
      {[0,72,144,216,288].map((angle, i) => {
        const rad = ((angle - 90) * Math.PI) / 180;
        const innerR = 14, outerR = 45;
        const innerRad2 = ((angle + 36 - 90) * Math.PI) / 180;
        return (
          <g key={i}>
            <line x1={60+innerR*Math.cos(rad)} y1={60+innerR*Math.sin(rad)} x2={60+outerR*Math.cos(rad)} y2={60+outerR*Math.sin(rad)} stroke={W+'0.3)'} strokeWidth="1" strokeLinecap="round"/>
          </g>
        );
      })}
      {/* Star polygon */}
      <polygon
        points={[0,72,144,216,288].map(angle => {
          const outer = ((angle - 90) * Math.PI) / 180;
          const inner = ((angle + 36 - 90) * Math.PI) / 180;
          return `${60+42*Math.cos(outer)},${60+42*Math.sin(outer)} ${60+18*Math.cos(inner)},${60+18*Math.sin(inner)}`;
        }).join(' ')}
        fill={M} opacity="0.2" stroke={M} strokeWidth="1" strokeOpacity="0.8"
      />
      {/* Center */}
      <circle cx="60" cy="60" r="10" fill={M} opacity="0.9"/>
      <circle cx="57" cy="57" r="3" fill="white" opacity="0.5"/>
    </Illo>
  );
}

// B: The Clock — disciplined, reliable
export function Q10B() {
  return (
    <Illo>
      {/* Clock face */}
      <circle cx="60" cy="60" r="38" fill={W+'0.04)'} stroke={W+'0.3)'} strokeWidth="1.5"/>
      <circle cx="60" cy="60" r="32" fill={W+'0.02)'} stroke={W+'0.12)'} strokeWidth="1"/>
      {/* Hour markers */}
      {Array.from({length:12}).map((_,i) => {
        const rad = ((i * 30 - 90) * Math.PI) / 180;
        const r1 = i % 3 === 0 ? 24 : 27, r2 = 30;
        return <line key={i} x1={60+r1*Math.cos(rad)} y1={60+r1*Math.sin(rad)} x2={60+r2*Math.cos(rad)} y2={60+r2*Math.sin(rad)} stroke={W+(i%3===0?'0.5':'0.25)+')} strokeWidth={i%3===0?2:1} strokeLinecap="round"/>;
      })}
      {/* Minute hand */}
      <line x1="60" y1="60" x2="60" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
      {/* Hour hand */}
      <line x1="60" y1="60" x2="78" y2="60" stroke={M} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Center pin */}
      <circle cx="60" cy="60" r="4" fill={M}/>
      <circle cx="60" cy="60" r="2" fill="white" opacity="0.6"/>
    </Illo>
  );
}

// ═══════════════════════════════════════════════════════════
// LOOKUP MAP — question ID → [A illustration, B illustration]
// ═══════════════════════════════════════════════════════════
export const QUESTION_ILLOS: Record<string, [React.FC, React.FC]> = {
  q1:  [Q1A,  Q1B],
  q2:  [Q2A,  Q2B],
  q3:  [Q3A,  Q3B],
  q4:  [Q4A,  Q4B],
  q5:  [Q5A,  Q5B],
  q6:  [Q6A,  Q6B],
  q7:  [Q7A,  Q7B],
  q8:  [Q8A,  Q8B],
  q9:  [Q9A,  Q9B],
  q10: [Q10A, Q10B],
};
