// scripts/generate-og.mjs
// Run with: node scripts/generate-og.mjs
// Generates 1200×630 OG images for each archetype into public/og/
// The right-hand illustration is now the real tarot card artwork
// (public/cards/{slug}.png) instead of a code-drawn abstract icon.

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../public/og');
const CARDS_DIR = path.join(__dirname, '../public/cards');
fs.mkdirSync(OUT, { recursive: true });

const M = '#BEFFCF';
const BG = '#181818';

// ── Archetype data ────────────────────────────────────────────
const archetypes = [
  { slug: 'stealth-architect',      name: 'The stealth architect',      tagline: 'You build in silence. Durability is the strategy.' },
  { slug: 'visionary-pathfinder',   name: 'The visionary pathfinder',   tagline: 'A global vision. The patience to map it market by market.' },
  { slug: 'product-purist',         name: 'The product purist',         tagline: 'Small team. High standards. The right thing, built right.' },
  { slug: 'anchored-scaler',        name: 'The anchored scaler',        tagline: 'Durable systems. Global trust. Built to last everywhere.' },
  { slug: 'hustler',                name: 'The hustler',                tagline: 'Move fast. Trust your gut. Figure it out on the way up.' },
  { slug: 'solo-visionary',         name: 'The solo visionary',         tagline: "Building a future that doesn't exist yet — and getting there first." },
  { slug: 'tinkerer',               name: 'The tinkerer',               tagline: 'Iterate constantly. Let principles keep the speed in check.' },
  { slug: 'global-trailblazer',     name: 'The global trailblazer',     tagline: 'Blitzscaling with principles. Capturing markets while others are still planning.' },
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

// Background + logo + headline text only (no card — that's composited separately)
function buildOgBackgroundSvg({ name }) {
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
  const bgSvg = buildOgBackgroundSvg(archetype);
  const base = sharp(Buffer.from(bgSvg));

  // Real tarot card art — fit inside the CARD_W x CONTENT_H box, centred
  const cardPath = path.join(CARDS_DIR, `${archetype.slug}.png`);
  const cardBuffer = await sharp(cardPath)
    .resize({ height: CONTENT_H, fit: 'inside' })
    .toBuffer();
  const cardMeta = await sharp(cardBuffer).metadata();
  const cardLeft = Math.round(CARD_X + (CARD_W - cardMeta.width) / 2);
  const cardTop = PAD;

  const outPath = path.join(OUT, `${archetype.slug}.png`);
  await base
    .composite([{ input: cardBuffer, left: cardLeft, top: cardTop }])
    .png()
    .toFile(outPath);
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
