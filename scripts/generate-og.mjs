// scripts/generate-og.mjs
// Run with: node scripts/generate-og.mjs
// Generates 1200×630 OG images for each archetype into public/og/

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../public/og');
fs.mkdirSync(OUT, { recursive: true });

const M = '#00D395';
const W = (op) => `rgba(255,255,255,${op})`;

// ── Illustration inner SVG (120×120 viewBox) ──────────────────

function illo000() {
  let s = '';
  [20,40,60,80,100].forEach(x => s += `<line x1="${x}" y1="10" x2="${x}" y2="110" stroke="${W(0.07)}" stroke-width="0.5"/>`);
  [20,40,60,80,100].forEach(y => s += `<line x1="10" y1="${y}" x2="110" y2="${y}" stroke="${W(0.07)}" stroke-width="0.5"/>`);
  s += `<rect x="42" y="80" width="36" height="22" fill="${W(0.06)}" stroke="${W(0.18)}" stroke-width="0.8"/>`;
  s += `<rect x="48" y="57" width="24" height="26" fill="${W(0.08)}" stroke="${W(0.22)}" stroke-width="0.8"/>`;
  s += `<rect x="53" y="38" width="14" height="22" fill="${W(0.10)}" stroke="${W(0.28)}" stroke-width="0.8"/>`;
  s += `<line x1="36" y1="80" x2="36" y2="102" stroke="${W(0.20)}" stroke-width="0.6" stroke-dasharray="2 2"/>`;
  s += `<line x1="84" y1="80" x2="84" y2="102" stroke="${W(0.20)}" stroke-width="0.6" stroke-dasharray="2 2"/>`;
  s += `<line x1="36" y1="91" x2="42" y2="91" stroke="${W(0.20)}" stroke-width="0.6"/>`;
  s += `<line x1="78" y1="91" x2="84" y2="91" stroke="${W(0.20)}" stroke-width="0.6"/>`;
  s += `<polygon points="60,20 65,32 60,38 55,32" fill="${M}" opacity="0.9"/>`;
  s += `<polygon points="60,20 65,32 60,28" fill="white" opacity="0.15"/>`;
  s += `<circle cx="42" cy="80" r="1.5" fill="${M}" opacity="0.5"/>`;
  s += `<circle cx="78" cy="80" r="1.5" fill="${M}" opacity="0.5"/>`;
  s += `<circle cx="48" cy="57" r="1.5" fill="${M}" opacity="0.5"/>`;
  s += `<circle cx="72" cy="57" r="1.5" fill="${M}" opacity="0.5"/>`;
  return s;
}

function illo001() {
  const stars = [[60,28],[78,42],[85,65],[72,84],[48,84],[35,65],[42,42],[60,60]];
  const edges = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0],[0,7],[7,2],[7,4],[7,6]];
  let s = '';
  s += `<circle cx="60" cy="60" r="45" stroke="${W(0.06)}" stroke-width="0.5"/>`;
  s += `<circle cx="60" cy="60" r="30" stroke="${W(0.08)}" stroke-width="0.5"/>`;
  [0,90,180,270].forEach(deg => {
    const rad = (deg * Math.PI) / 180;
    s += `<line x1="${60+30*Math.cos(rad)}" y1="${60+30*Math.sin(rad)}" x2="${60+45*Math.cos(rad)}" y2="${60+45*Math.sin(rad)}" stroke="${W(0.20)}" stroke-width="0.7"/>`;
  });
  edges.forEach(([a,b]) => s += `<line x1="${stars[a][0]}" y1="${stars[a][1]}" x2="${stars[b][0]}" y2="${stars[b][1]}" stroke="${W(0.18)}" stroke-width="0.6"/>`);
  stars.forEach(([cx,cy],i) => s += `<circle cx="${cx}" cy="${cy}" r="${i===7?3.5:2}" fill="${i===7?M:W(0.45)}"/>`);
  s += `<polygon points="60,15 62.5,60 60,65 57.5,60" fill="${M}" opacity="0.9"/>`;
  s += `<polygon points="60,105 62.5,60 60,65 57.5,60" fill="${W(0.20)}"/>`;
  s += `<circle cx="60" cy="60" r="3.5" fill="${W(0.12)}" stroke="${M}" stroke-width="1"/>`;
  return s;
}

function illo010() {
  const hex = (cx, cy, r) => Array.from({length:6},(_,i)=>{
    const a=(Math.PI/180)*(60*i-30);
    return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;
  }).join(' ');
  let s = '';
  s += `<polygon points="${hex(60,60,44)}" stroke="${W(0.10)}" stroke-width="0.6" fill="none"/>`;
  s += `<polygon points="${hex(60,60,30)}" fill="${W(0.04)}" stroke="${W(0.18)}" stroke-width="0.8"/>`;
  s += `<polygon points="${hex(60,60,18)}" fill="${W(0.08)}" stroke="${W(0.28)}" stroke-width="0.8"/>`;
  Array.from({length:6},(_,i)=>{
    const a=(Math.PI/180)*(60*i-30);
    s += `<line x1="60" y1="60" x2="${60+30*Math.cos(a)}" y2="${60+30*Math.sin(a)}" stroke="${W(0.12)}" stroke-width="0.5"/>`;
  });
  s += `<polygon points="${hex(60,60,18)}" fill="${M}" opacity="0.12"/>`;
  s += `<polygon points="${hex(60,60,18)}" stroke="${M}" stroke-width="1" opacity="0.6" fill="none"/>`;
  s += `<circle cx="60" cy="60" r="5" fill="${M}" opacity="0.85"/>`;
  s += `<circle cx="58" cy="58" r="2" fill="white" opacity="0.25"/>`;
  return s;
}

function illo011() {
  let s = '';
  s += `<circle cx="60" cy="58" r="35" fill="${W(0.04)}" stroke="${W(0.12)}" stroke-width="0.7"/>`;
  [-18,0,18].forEach(dy => {
    const rx = Math.sqrt(35*35-dy*dy);
    s += `<ellipse cx="60" cy="${58+dy}" rx="${rx}" ry="${Math.abs(dy)<2?8:5}" stroke="${W(0.12)}" stroke-width="0.5" fill="none"/>`;
  });
  [-18,0,18].forEach(dx => {
    s += `<ellipse cx="${60+dx}" cy="58" rx="${Math.abs(dx)<2?8:5}" ry="35" stroke="${W(0.12)}" stroke-width="0.5" fill="none"/>`;
  });
  s += `<ellipse cx="60" cy="58" rx="35" ry="8" stroke="${M}" stroke-width="0.7" fill="none" opacity="0.5"/>`;
  s += `<path d="M60 18 L85 30 L85 58 Q85 80 60 92 Q35 80 35 58 L35 30 Z" fill="${W(0.08)}" stroke="${W(0.30)}" stroke-width="1.2"/>`;
  s += `<path d="M60 25 L79 35 L79 58 Q79 75 60 85 Q41 75 41 58 L41 35 Z" fill="none" stroke="${M}" stroke-width="0.8" opacity="0.4"/>`;
  s += `<polyline points="48,57 56,66 72,46" stroke="${M}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  return s;
}

function illo100() {
  const rays = 12;
  let s = '';
  Array.from({length:rays},(_,i)=>{
    const a=(i*Math.PI*2)/rays;
    const inner=i%2===0?28:20;
    const outer=i%2===0?50:42;
    s += `<line x1="${60+inner*Math.cos(a)}" y1="${60+inner*Math.sin(a)}" x2="${60+outer*Math.cos(a)}" y2="${60+outer*Math.sin(a)}" stroke="${W(i%2===0?0.30:0.15)}" stroke-width="${i%2===0?1:0.5}" stroke-linecap="round"/>`;
  });
  const pts = Array.from({length:rays},(_,i)=>{
    const a=(i*Math.PI*2)/rays-Math.PI/2;
    const r=i%2===0?28:14;
    return `${60+r*Math.cos(a)},${60+r*Math.sin(a)}`;
  }).join(' ');
  s += `<polygon points="${pts}" fill="${W(0.08)}" stroke="${W(0.25)}" stroke-width="0.7"/>`;
  [[20,30,28,25],[95,45,100,38],[15,80,10,88],[98,85,104,90],[60,10,60,4]].forEach(([x1,y1,x2,y2]) => {
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${W(0.20)}" stroke-width="0.8" stroke-linecap="round"/>`;
  });
  s += `<circle cx="60" cy="60" r="14" fill="${M}" opacity="0.15"/>`;
  s += `<circle cx="60" cy="60" r="9" fill="${M}" opacity="0.85"/>`;
  s += `<circle cx="57" cy="57" r="3" fill="white" opacity="0.25"/>`;
  return s;
}

function illo101() {
  const nodes = [[60,60],[60,28],[85,45],[85,75],[60,92],[35,75],[35,45],[60,12],[98,35],[98,85],[60,108],[22,85],[22,35]];
  const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,7],[2,8],[3,9],[4,10],[5,11],[6,12],[1,2],[2,3],[3,4],[4,5],[5,6],[6,1]];
  let s = '';
  edges.forEach(([a,b]) => s += `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}" stroke="${W(0.12)}" stroke-width="0.5"/>`);
  nodes.slice(7).forEach(([cx,cy]) => s += `<circle cx="${cx}" cy="${cy}" r="2" fill="${W(0.25)}"/>`);
  nodes.slice(1,7).forEach(([cx,cy]) => s += `<circle cx="${cx}" cy="${cy}" r="2.5" fill="${W(0.35)}"/>`);
  s += `<circle cx="60" cy="60" r="18" fill="${M}" opacity="0.08"/>`;
  s += `<path d="M28,60 Q44,38 60,38 Q76,38 92,60 Q76,82 60,82 Q44,82 28,60 Z" fill="${W(0.06)}" stroke="${W(0.25)}" stroke-width="0.8"/>`;
  s += `<circle cx="60" cy="60" r="12" fill="${W(0.06)}" stroke="${M}" stroke-width="1" opacity="0.8"/>`;
  s += `<circle cx="60" cy="60" r="6" fill="${M}" opacity="0.90"/>`;
  s += `<circle cx="57" cy="57" r="2.5" fill="white" opacity="0.30"/>`;
  s += `<line x1="28" y1="60" x2="92" y2="60" stroke="${M}" stroke-width="0.4" opacity="0.25"/>`;
  s += `<line x1="60" y1="38" x2="60" y2="82" stroke="${M}" stroke-width="0.4" opacity="0.25"/>`;
  return s;
}

function illo110() {
  const teeth = 10;
  const gearPts = Array.from({length:teeth*4},(_,i)=>{
    const seg=Math.floor(i/4);
    const phase=i%4;
    const baseAngle=(seg*Math.PI*2)/teeth;
    const stepAngle=(Math.PI*2)/(teeth*4);
    const angle=baseAngle+phase*stepAngle;
    const r=phase===1||phase===2?40:32;
    return `${60+r*Math.cos(angle)},${60+r*Math.sin(angle)}`;
  }).join(' ');
  let s = '';
  s += `<polygon points="${gearPts}" fill="${W(0.06)}" stroke="${W(0.22)}" stroke-width="0.8"/>`;
  s += `<circle cx="60" cy="60" r="18" fill="${W(0.08)}" stroke="${W(0.28)}" stroke-width="0.8"/>`;
  s += `<line x1="60" y1="42" x2="60" y2="78" stroke="${W(0.15)}" stroke-width="0.6"/>`;
  s += `<line x1="42" y1="60" x2="78" y2="60" stroke="${W(0.15)}" stroke-width="0.6"/>`;
  s += `<line x1="47" y1="47" x2="73" y2="73" stroke="${W(0.10)}" stroke-width="0.6"/>`;
  s += `<line x1="73" y1="47" x2="47" y2="73" stroke="${W(0.10)}" stroke-width="0.6"/>`;
  s += `<circle cx="60" cy="60" r="7" fill="${M}" opacity="0.15" stroke="${M}" stroke-width="0.8"/>`;
  s += `<path d="M66,22 L52,58 L61,58 L54,98 L74,52 L64,52 Z" fill="${M}" opacity="0.90"/>`;
  s += `<path d="M66,22 L64,52 L74,52 Z" fill="white" opacity="0.15"/>`;
  return s;
}

function illo111() {
  let s = '';
  s += `<circle cx="60" cy="68" r="36" fill="${W(0.04)}" stroke="${W(0.14)}" stroke-width="0.8"/>`;
  [-14,0,14].forEach(dy => {
    const rx = Math.sqrt(36*36-dy*dy);
    s += `<ellipse cx="60" cy="${68+dy}" rx="${rx}" ry="${Math.abs(dy)<2?9:5.5}" stroke="${W(0.12)}" stroke-width="0.5" fill="none"/>`;
  });
  [-14,0,14].forEach(dx => {
    s += `<ellipse cx="${60+dx}" cy="68" rx="${Math.abs(dx)<2?9:5.5}" ry="36" stroke="${W(0.12)}" stroke-width="0.5" fill="none"/>`;
  });
  s += `<ellipse cx="60" cy="68" rx="36" ry="9" stroke="${M}" stroke-width="0.8" fill="none" opacity="0.55"/>`;
  s += `<rect x="36" y="44" width="48" height="10" rx="1" fill="${W(0.10)}" stroke="${W(0.28)}" stroke-width="0.8"/>`;
  s += `<path d="M36,44 L36,28 L48,38 L60,22 L72,38 L84,28 L84,44 Z" fill="${W(0.08)}" stroke="${W(0.30)}" stroke-width="0.8"/>`;
  s += `<polygon points="60,22 64,30 60,34 56,30" fill="${M}" opacity="0.95"/>`;
  s += `<polygon points="60,22 64,30 60,28" fill="white" opacity="0.20"/>`;
  s += `<circle cx="36" cy="28" r="3" fill="${M}" opacity="0.55"/>`;
  s += `<circle cx="84" cy="28" r="3" fill="${M}" opacity="0.55"/>`;
  [42,52,60,68,78].forEach(x => s += `<circle cx="${x}" cy="49" r="1.2" fill="${M}" opacity="0.50"/>`);
  return s;
}

// ── Archetype data ────────────────────────────────────────────
const archetypes = [
  { slug: 'stealth-architect',      name: 'The Stealth Architect',      tagline: 'You build in silence. Durability is the strategy.',                      code: '000', illo: illo000 },
  { slug: 'visionary-cartographer', name: 'The Visionary Cartographer',  tagline: 'A global vision. The patience to map it market by market.',             code: '001', illo: illo001 },
  { slug: 'product-perfectionist',  name: 'The Product Perfectionist',   tagline: 'Small team. High standards. The right thing, built right.',             code: '010', illo: illo010 },
  { slug: 'global-guardian',        name: 'The Global Guardian',         tagline: 'Durable systems. Global trust. Built to last everywhere.',              code: '011', illo: illo011 },
  { slug: 'chaos-pilot',            name: 'The Chaos Pilot',             tagline: 'Move fast. Trust your gut. Figure it out on the way up.',               code: '100', illo: illo100 },
  { slug: 'ai-monster',             name: 'The AI Monster',              tagline: "Building a future that doesn't exist yet — and getting there first.",   code: '101', illo: illo101 },
  { slug: 'high-velocity-tinkerer', name: 'The High-Velocity Tinkerer',  tagline: 'Iterate constantly. Let principles keep the speed in check.',           code: '110', illo: illo110 },
  { slug: 'global-juggernaut',      name: 'The Global Juggernaut',       tagline: 'Blitzscaling with principles. Capturing markets while others plan.',    code: '111', illo: illo111 },
];

// ── OG image builder ─────────────────────────────────────────
function buildOgSvg({ name, tagline, code, illo }) {
  const illoInner = illo();

  // Subtle horizontal grid lines across the background
  const gridLines = Array.from({length:8}, (_,i) => {
    const y = 80 * (i+1);
    return `<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>`;
  }).join('');

  // Binary code digits spaced out
  const digits = code.split('').map((d, i) =>
    `<text x="${64 + i * 56}" y="295" font-family="monospace" font-size="68" font-weight="800" fill="${M}" opacity="0.95" letter-spacing="-2">${d}</text>`
  ).join('');

  // Illustration: SVG nested at right side, scaled up
  const illoSvg = `
    <svg x="820" y="115" width="300" height="300" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      ${illoInner}
    </svg>
  `;

  // Subtle card behind illustration
  const illoCard = `<rect x="800" y="95" width="340" height="340" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>`;

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1200" height="630" fill="#141414"/>
  ${gridLines}

  <!-- Right card + illustration -->
  ${illoCard}
  ${illoSvg}

  <!-- Top: Aspire logo -->
  <text x="64" y="86" font-family="sans-serif" font-size="26" font-weight="700" fill="white" letter-spacing="-0.5">aspire</text>
  <text x="152" y="86" font-family="sans-serif" font-size="26" font-weight="700" fill="${M}">.</text>
  <text x="176" y="83" font-family="sans-serif" font-size="12" font-weight="500" fill="rgba(255,255,255,0.25)" letter-spacing="2">FOUNDER ARCHETYPES 2026</text>

  <!-- Archetype badge -->
  <rect x="64" y="148" width="142" height="28" rx="14" fill="rgba(0,211,149,0.12)" stroke="rgba(0,211,149,0.25)" stroke-width="1"/>
  <text x="135" y="167" font-family="sans-serif" font-size="11" font-weight="600" fill="${M}" letter-spacing="2" text-anchor="middle">YOUR ARCHETYPE</text>

  <!-- Binary code -->
  ${digits}

  <!-- Archetype name -->
  <text x="64" y="380" font-family="sans-serif" font-size="52" font-weight="800" fill="white" letter-spacing="-1">${name}</text>

  <!-- Tagline -->
  <text x="64" y="434" font-family="sans-serif" font-size="20" font-weight="400" fill="${M}">${tagline}</text>

  <!-- Bottom: URL -->
  <text x="64" y="580" font-family="sans-serif" font-size="15" fill="rgba(255,255,255,0.25)">aspireapp.com/founder-archetype-quiz</text>
  <rect x="1010" y="552" width="140" height="42" rx="10" fill="${M}"/>
  <text x="1080" y="579" font-family="sans-serif" font-size="15" font-weight="700" fill="#141414" text-anchor="middle">Take the quiz →</text>
</svg>`;
}

// ── Generate all images ───────────────────────────────────────
for (const archetype of archetypes) {
  const svg = buildOgSvg(archetype);
  const outPath = path.join(OUT, `${archetype.slug}.png`);
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  console.log(`✓ ${archetype.slug}.png`);
}

// Also generate a default (no archetype) OG for the quiz landing page
const defaultSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#141414"/>
  ${Array.from({length:8}, (_,i) => `<line x1="0" y1="${80*(i+1)}" x2="1200" y2="${80*(i+1)}" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>`).join('')}
  <text x="64" y="86" font-family="sans-serif" font-size="26" font-weight="700" fill="white" letter-spacing="-0.5">aspire</text>
  <text x="152" y="86" font-family="sans-serif" font-size="26" font-weight="700" fill="${M}">.</text>
  <text x="64" y="300" font-family="sans-serif" font-size="64" font-weight="800" fill="white" letter-spacing="-1">What kind of</text>
  <text x="64" y="378" font-family="sans-serif" font-size="64" font-weight="800" fill="white" letter-spacing="-1">founder are you?</text>
  <text x="64" y="444" font-family="sans-serif" font-size="22" font-weight="400" fill="rgba(255,255,255,0.50)">Take the Aspire Founder Archetype Quiz — 5 minutes, 8 possible results.</text>
  <text x="64" y="580" font-family="sans-serif" font-size="15" fill="rgba(255,255,255,0.25)">aspireapp.com/founder-archetype-quiz</text>
  <rect x="1010" y="552" width="140" height="42" rx="10" fill="${M}"/>
  <text x="1080" y="579" font-family="sans-serif" font-size="15" font-weight="700" fill="#141414" text-anchor="middle">Take the quiz →</text>
</svg>`;

await sharp(Buffer.from(defaultSvg)).png().toFile(path.join(OUT, 'default.png'));
console.log('✓ default.png');
console.log('\nDone! All OG images saved to public/og/');
