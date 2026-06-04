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

const M = '#BEFFCF';
const BG = '#181818';
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
  { slug: 'stealth-architect',      name: 'The stealth architect',      tagline: 'You build in silence. Durability is the strategy.',                             code: '000', illo: illo000 },
  { slug: 'visionary-pathfinder',   name: 'The visionary pathfinder',   tagline: 'A global vision. The patience to map it market by market.',                    code: '001', illo: illo001 },
  { slug: 'product-purist',         name: 'The product purist',         tagline: 'Small team. High standards. The right thing, built right.',                    code: '010', illo: illo010 },
  { slug: 'anchored-scaler',        name: 'The anchored scaler',        tagline: 'Durable systems. Global trust. Built to last everywhere.',                     code: '011', illo: illo011 },
  { slug: 'hustler',                name: 'The hustler',                tagline: 'Move fast. Trust your gut. Figure it out on the way up.',                      code: '100', illo: illo100 },
  { slug: 'solo-visionary',         name: 'The solo visionary',         tagline: "Building a future that doesn't exist yet — and getting there first.",          code: '101', illo: illo101 },
  { slug: 'tinkerer',               name: 'The tinkerer',               tagline: 'Iterate constantly. Let principles keep the speed in check.',                  code: '110', illo: illo110 },
  { slug: 'global-trailblazer',     name: 'The global trailblazer',     tagline: 'Blitzscaling with principles. Capturing markets while others are still planning.', code: '111', illo: illo111 },
];

// ── Aspire logo paths (inline from aspire-logo.svg) ──────────
const LOGO_PATHS = `<path d="M75.2354 83.3262C67.2463 90.5792 56.6392 95 44.999 95C33.3586 95 22.7508 90.5794 14.7617 83.3262L44.998 53.0879L75.2354 83.3262Z" fill="#BEFFCF"/><path d="M44.999 5C69.8512 5 89.998 25.1473 89.998 50C89.998 54.8836 89.216 59.5843 87.7773 63.9873L44.999 21.207L2.21973 63.9873C0.781099 59.5843 0 54.8835 0 50C9.99932e-06 25.1473 20.1468 5 44.999 5Z" fill="#BEFFCF"/><path fill-rule="evenodd" clip-rule="evenodd" d="M319.887 23.0772H333.008V84.6154H319.887V23.0772ZM301.897 31.6453C296.749 26.0351 289.644 23.0772 281.361 23.0772C272.421 23.0772 265.364 26.6548 260.906 33.4382V23.0772H247.727V100H260.906V74.1387C265.364 80.9139 272.494 84.4998 281.572 84.4998C298.43 84.4998 309.758 72.2466 309.758 54.0116C309.758 44.9808 307.037 37.2472 301.889 31.637L301.897 31.6453ZM280.322 73.0151C269.846 73.0151 262.53 65.0171 262.53 53.5654C262.53 42.1137 269.846 34.3388 280.322 34.3388C290.797 34.3388 298.113 42.4277 298.113 53.5654C298.113 64.7031 290.797 73.0151 280.322 73.0151ZM206.125 39.6763C206.125 44.1298 211.54 45.774 217.811 47.6743L217.815 47.6664C226.642 50.3419 237.62 53.6783 237.555 66.5539C237.555 79.8894 225.192 84.6154 214.598 84.6154C205.457 84.6154 196.258 81.3849 190.598 76.1961L190.484 76.0887L195.247 66.4465L195.442 66.6282C200.27 70.9825 208.384 74.0313 215.161 74.0313C221.196 74.0313 224.661 71.7592 224.661 67.8015C224.661 62.6733 219.042 60.9676 212.528 58.9901L212.473 58.9734C203.571 56.2726 193.485 53.2125 193.55 40.6843C193.55 34.9668 195.891 30.3233 200.303 27.2332C204.152 24.5479 209.583 23.0772 215.618 23.0772C223.202 23.0772 231.202 25.4403 236.478 29.2244L236.617 29.3236L236.543 29.4806L231.764 39.288L231.577 39.1723C226.366 35.917 219.875 33.8927 214.623 33.8927C210.741 33.8927 206.125 34.9007 206.125 39.6763ZM217.815 47.6664L217.787 47.6578H217.819L217.815 47.6664ZM436.951 30.915C432.188 25.7171 425.151 23.0768 416.033 23.0768C407.299 23.1348 399.781 26.1144 394.284 31.6847C388.755 37.2964 385.827 45.0022 385.827 53.9577C385.827 72.2991 398.101 84.6151 416.368 84.6151C426.488 84.6151 435.018 81.0643 441.053 74.3601L441.183 74.2194L434.105 66.5633L433.958 66.7206C429.652 71.2066 423.756 73.6731 417.379 73.6731C408.221 73.6731 401.297 68.0697 399.226 59.0314H443.997L444.013 58.841C444.91 46.3927 442.537 36.9985 436.967 30.915H436.951ZM432.425 49.1157H398.981C400.49 39.7298 407.047 33.9112 416.139 33.9112C425.689 33.9112 431.903 39.7381 432.425 49.1157ZM360.712 34.8676C364.83 27.1506 371.835 23.0772 381.034 23.0772L381.026 23.0855H381.23V35.9417L381.018 35.9252C369.715 35.2807 361.748 41.7667 360.712 52.4582V84.6154H347.477V23.0772H360.712V34.8676ZM167.299 77.0632V84.6151H180.298L180.192 44.4103C180.078 30.8517 171.271 23.0768 156.013 23.0768C144.938 23.0768 138.92 25.5308 130.374 30.6782L130.202 30.7856L135.658 40.1882L135.837 40.0643C141.693 36.0405 147.54 33.9914 153.232 33.9914C162.235 33.9914 167.193 38.2053 167.193 45.8728V47.4757H149.44C135.283 47.5913 126.818 54.4243 126.818 65.7603C126.818 77.0963 135.47 84.6068 147.874 84.6068C156.404 84.6068 163.099 81.9959 167.299 77.0632ZM150.549 73.9235C143.593 73.9235 139.271 70.5773 139.271 65.2067C139.271 59.8362 142.883 57.3905 151.332 57.3905H167.185V62.7032C166.516 69.2057 159.519 73.9235 150.549 73.9235ZM326.444 0C322.179 0 319.08 3.29417 319.08 7.8164C319.08 12.3386 322.244 15.5249 326.444 15.5249C330.643 15.5249 333.808 12.2059 333.808 7.8164C333.808 3.42694 330.709 0 326.444 0Z" fill="#BEFFCF"/>`;

// ── OG image builder ─────────────────────────────────────────
// Layout constants
const PAD = 64;
const IMG_W = 1200;
const IMG_H = 630;
const CONTENT_H = IMG_H - PAD * 2; // 502px
const CARD_W = 430;
const CARD_X = IMG_W - PAD - CARD_W; // 706
const MAX_TEXT_W = CARD_X - PAD - 80; // left column max width with margin ~562px
// Logo: original viewBox 0 0 445 100, render at width=168, height=38
const LOGO_W = 168;
const LOGO_H = 38;

// Word-wrap: split text into lines that fit within maxWidth at given fontSize
function wrapText(text, maxWidth, fontSize) {
  const avgCharW = fontSize * 0.52; // conservative average char width for bold sans-serif
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length * avgCharW > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function buildOgSvg({ name, tagline, illo }) {
  const illoInner = illo();

  // Right card — fills exactly from PAD to IMG_H-PAD
  const illoCard = `<rect x="${CARD_X}" y="${PAD}" width="${CARD_W}" height="${CONTENT_H}" rx="16" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;

  // Illustration — centred inside the card
  const ILLO_SIZE = 280;
  const illoX = CARD_X + (CARD_W - ILLO_SIZE) / 2;
  const illoY = PAD + (CONTENT_H - ILLO_SIZE) / 2;
  const illoSvg = `<svg x="${illoX}" y="${illoY}" width="${ILLO_SIZE}" height="${ILLO_SIZE}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">${illoInner}</svg>`;

  const FS      = 68;   // match default.png headline size
  const SUB     = 28;   // subheader size
  const LINE_H  = Math.round(FS * 1.18); // ~80px line height
  const logoY   = PAD;  // logo pinned to top

  // Wrap H1 within left column
  const nameLower = name.charAt(0).toLowerCase() + name.slice(1);
  const h1Text    = `I am ${nameLower}`;
  const h1Lines   = wrapText(h1Text, MAX_TEXT_W, FS);
  const H1_H      = FS + (h1Lines.length - 1) * LINE_H;
  const subText   = 'What kind of founder are you? Take the quiz with me';
  const subLines  = wrapText(subText, MAX_TEXT_W, SUB);
  const SUB_LINE_H = Math.round(SUB * 1.4);
  const SUB_H     = SUB + (subLines.length - 1) * SUB_LINE_H;
  const GAP_SUB   = 28;
  const TEXT_H    = H1_H + GAP_SUB + SUB_H;

  // Centre text block in CONTENT_H
  const textStartY = PAD + (CONTENT_H - TEXT_H) / 2;
  const h1BaseY    = textStartY + FS;
  const subBaseY   = textStartY + H1_H + GAP_SUB + SUB;

  const logo = `<svg x="${PAD}" y="${logoY}" width="${LOGO_W}" height="${LOGO_H}" viewBox="0 0 445 100" xmlns="http://www.w3.org/2000/svg">${LOGO_PATHS}</svg>`;

  // First line: "I am " white + archetype name in mint; subsequent lines all mint
  const h1Svg = h1Lines.map((line, i) => {
    const y = h1BaseY + i * LINE_H;
    if (i === 0) {
      const PREFIX = 'I am ';
      const rest = line.startsWith(PREFIX) ? line.slice(PREFIX.length) : line;
      return `<text x="${PAD}" y="${y}" font-family="sans-serif" font-size="${FS}" font-weight="800" letter-spacing="-1" xml:space="preserve"><tspan fill="white">I am </tspan><tspan fill="${M}">${rest}</tspan></text>`;
    }
    return `<text x="${PAD}" y="${y}" font-family="sans-serif" font-size="${FS}" font-weight="800" fill="${M}" letter-spacing="-1">${line}</text>`;
  }).join('\n  ');

  return `<svg width="${IMG_W}" height="${IMG_H}" viewBox="0 0 ${IMG_W} ${IMG_H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${IMG_W}" height="${IMG_H}" fill="${BG}"/>

  <!-- Right card + illustration -->
  ${illoCard}
  ${illoSvg}

  <!-- Logo -->
  ${logo}

  <!-- H1 (word-wrapped, sentence case) -->
  ${h1Svg}

  <!-- Subheader (wrapped) -->
  ${subLines.map((line, i) => `<text x="${PAD}" y="${subBaseY + i * SUB_LINE_H}" font-family="sans-serif" font-size="${SUB}" font-weight="400" fill="rgba(255,255,255,0.50)">${line}</text>`).join('\n  ')}
</svg>`;
}

// ── Generate all images ───────────────────────────────────────
for (const archetype of archetypes) {
  const svg = buildOgSvg(archetype);
  const outPath = path.join(OUT, `${archetype.slug}.png`);
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  console.log(`✓ ${archetype.slug}.png`);
}

// ── Default OG (quiz landing page) ───────────────────────────
// Manual 2-line headline; logo pinned top; text block centred
const DEF_FS     = 68;
const DEF_LINE_H = Math.round(DEF_FS * 1.18); // ~80px
const DEF_TEXT_H = DEF_FS + DEF_LINE_H + 32 + 22; // 2 H1 lines + gap + sub
const defLogoY   = PAD;
const defTextY   = PAD + (CONTENT_H - DEF_TEXT_H) / 2;
const defH1aY    = defTextY + DEF_FS;
const defH1bY    = defH1aY + DEF_LINE_H;
const defSubY    = defH1bY + 32 + 22;

const defaultSvg = `<svg width="${IMG_W}" height="${IMG_H}" viewBox="0 0 ${IMG_W} ${IMG_H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${IMG_W}" height="${IMG_H}" fill="${BG}"/>
  <svg x="${PAD}" y="${defLogoY}" width="${LOGO_W}" height="${LOGO_H}" viewBox="0 0 445 100" xmlns="http://www.w3.org/2000/svg">${LOGO_PATHS}</svg>
  <text x="${PAD}" y="${defH1aY}" font-family="sans-serif" font-size="${DEF_FS}" font-weight="800" fill="white" letter-spacing="-2">What kind of</text>
  <text x="${PAD}" y="${defH1bY}" font-family="sans-serif" font-size="${DEF_FS}" font-weight="800" fill="white" letter-spacing="-2">founder are you?</text>
  <text x="${PAD}" y="${defSubY}" font-family="sans-serif" font-size="22" font-weight="400" fill="rgba(255,255,255,0.50)">Take the Aspire Founder Archetype Quiz</text>
</svg>`;

await sharp(Buffer.from(defaultSvg)).png().toFile(path.join(OUT, 'default.png'));
console.log('✓ default.png');
console.log('\nDone! All OG images saved to public/og/');
