// ─────────────────────────────────────────────────────────────
// ARCHETYPE DEFINITIONS — Founder Archetype Quiz 2026
//
// 8 archetypes keyed by their 3-bit binary code:
//   Bit 0 (Q1) — Growth:    0=Deliberate, 1=Speed-first
//   Bit 1 (Q4) — Decisions: 0=Conviction-led, 1=Principle-driven
//   Bit 2 (Q7) — Scale:     0=Lean, 1=Global
//
// Example: "101" = Speed-first + Conviction-led + Global
// ─────────────────────────────────────────────────────────────

export type BinaryCode = '000' | '001' | '010' | '011' | '100' | '101' | '110' | '111';

export type DnaProfile = {
  growth: 'deliberate' | 'speed';
  decisions: 'conviction' | 'principle';
  scale: 'lean' | 'global';
};

export type Peer = {
  name: string;
  company: string;
};

export type AspireProduct = {
  name: string;
  description: string;
  url: string;
};

export type Archetype = {
  code: BinaryCode;
  slug: string;
  name: string;
  tagline: string;
  badge: string;
  dominantArchetype: string;
  secondaryArchetypes: string[];
  dna: DnaProfile;
  description: string;
  peers: Peer[];
  productReasoning: string; // Why these specific products fit this archetype
  products: AspireProduct[];
  ctaLabel: string;
  ctaUrl: string;
};

const BASE_UTM = 'utm_source=quiz&utm_medium=results&utm_campaign=founder-archetype';

export const archetypes: Record<BinaryCode, Archetype> = {

  // ── 000: The Stealth Architect ────────────────────────────────
  // Deliberate + Conviction-led + Lean
  '000': {
    code: '000',
    slug: 'stealth-architect',
    name: 'The stealth architect',
    tagline: 'You build in silence. Durability is the strategy.',
    badge: 'The stealth architect',
    dominantArchetype: 'Pragmatic expander',
    secondaryArchetypes: ['Steward of the future', 'Principle-led builder'],
    dna: { growth: 'deliberate', decisions: 'conviction', scale: 'lean' },
    description:
      'You build in silence and optimize for durability. You aren\'t interested in the hype cycle — you\'re interested in building a foundation that is statistically impossible to break.',
    peers: [
      { name: 'Melanie Perkins', company: 'Canva' },
      { name: 'Anthony Tan', company: 'Early stage - Grab' },
    ],
    productReasoning:
      'You build lean and deliberate — unnecessary overhead is a liability, not a feature. A clean business account with full visibility keeps your foundation airtight, while automated expense management ensures your lean operations never spring a leak.',
    products: [
      {
        name: 'Aspire Business Account',
        description: 'No minimum balance, no hidden fees. Full real-time visibility on every transaction — built for founders who demand total control.',
        url: `https://aspireapp.com/business-account?${BASE_UTM}&utm_content=stealth-architect`,
      },
      {
        name: 'Aspire Expense Management',
        description: 'Automated receipt capture, approval workflows, and accounting integrations. Keep your lean operations airtight.',
        url: `https://aspireapp.com/expense-management?${BASE_UTM}&utm_content=stealth-architect`,
      },
    ],
    ctaLabel: 'Open your free business account',
    ctaUrl: `https://aspireapp.com/register?${BASE_UTM}&utm_content=stealth-architect`,
  },

  // ── 001: The Visionary Cartographer ──────────────────────────
  // Deliberate + Conviction-led + Global
  '001': {
    code: '001',
    slug: 'visionary-pathfinder',
    name: 'The visionary pathfinder',
    tagline: 'A global vision. The patience to map it market by market.',
    badge: 'The visionary pathfinder',
    dominantArchetype: 'Pragmatic expander',
    secondaryArchetypes: ['Steward of the future', 'Global-first'],
    dna: { growth: 'deliberate', decisions: 'conviction', scale: 'global' },
    description:
      'You have a massive global vision but the patience to map it out market by market. You scale through surgical precision rather than raw force.',
    peers: [
      { name: 'Patrick Collison', company: 'Stripe' },
      { name: 'Anthony Tan', company: 'Grab' },
    ],
    productReasoning:
      'Your growth is deliberate, but your map is unambiguously global. As each new market opens, the ability to hold and move money across borders cleanly — without surprise FX fees or payment delays — is what makes surgical expansion actually surgical.',
    products: [
      {
        name: 'Aspire Multi-Currency Account',
        description: 'Hold, send, and receive in 30+ currencies. Lock in FX rates and avoid surprise fees as you expand market by market.',
        url: `https://aspireapp.com/multi-currency?${BASE_UTM}&utm_content=visionary-pathfinder`,
      },
      {
        name: 'Aspire International Transfers',
        description: 'Send money to 130+ countries at transparent rates. Your financial rails should match the ambition of your map.',
        url: `https://aspireapp.com/transfers?${BASE_UTM}&utm_content=visionary-pathfinder`,
      },
    ],
    ctaLabel: 'Open your multi-currency account',
    ctaUrl: `https://aspireapp.com/register?${BASE_UTM}&utm_content=visionary-pathfinder`,
  },

  // ── 010: The Product Perfectionist ───────────────────────────
  // Deliberate + Principle-driven + Lean
  '010': {
    code: '010',
    slug: 'product-purist',
    name: 'The product purist',
    tagline: 'Small team. High standards. The right thing, built right.',
    badge: 'The product purist',
    dominantArchetype: 'Principle-led builder',
    secondaryArchetypes: ['Pragmatic expander', 'Lean-operator'],
    dna: { growth: 'deliberate', decisions: 'principle', scale: 'lean' },
    description:
      'You are guided by taste and principles. You would rather have a small, elite team building the right thing than a massive organization building the noisy thing.',
    peers: [
      { name: 'Dylan Field', company: 'Figma' },
    ],
    productReasoning:
      'You run a tight, principled ship where every decision — including financial ones — has to meet a high bar. A business account with zero noise and corporate cards with per-person limits mean your elite team can spend without asking permission every time, while you maintain full oversight.',
    products: [
      {
        name: 'Aspire Business Account',
        description: 'A business account built for founders who hate unnecessary overhead. Clean, transparent, and totally in your control.',
        url: `https://aspireapp.com/business-account?${BASE_UTM}&utm_content=product-purist`,
      },
      {
        name: 'Aspire Corporate Cards',
        description: 'Issue cards for your elite team with precise spending limits. Every transaction is visible in real time.',
        url: `https://aspireapp.com/corporate-cards?${BASE_UTM}&utm_content=product-purist`,
      },
    ],
    ctaLabel: 'Take control of team spending',
    ctaUrl: `https://aspireapp.com/register?${BASE_UTM}&utm_content=product-purist`,
  },

  // ── 011: The Global Guardian ──────────────────────────────────
  // Deliberate + Principle-driven + Global
  '011': {
    code: '011',
    slug: 'anchored-scaler',
    name: 'The anchored scaler',
    tagline: 'Durable systems. Global trust. Built to last everywhere.',
    badge: 'The anchored scaler',
    dominantArchetype: 'Pragmatic expander',
    secondaryArchetypes: ['Principle-led builder', 'Global-first'],
    dna: { growth: 'deliberate', decisions: 'principle', scale: 'global' },
    description:
      'You build durable, global systems and stay true to your vision. You prioritize long-term stakeholder trust and operational rigor over short-term market wins.',
    peers: [
      { name: 'Sebastian Siemiatkowski', company: 'Klarna' },
      { name: 'Melanie Perkins', company: 'Canva' },
    ],
    productReasoning:
      'You are building global systems that need to hold under scrutiny. Multi-currency accounts give you the financial visibility to operate across markets with confidence, while corporate cards enforce spend discipline across every entity — so your principles scale as fast as your headcount does.',
    products: [
      {
        name: 'Aspire Multi-Currency Account',
        description: 'Operate in 30+ currencies with institutional-grade visibility. The financial backbone for compliant global expansion.',
        url: `https://aspireapp.com/multi-currency?${BASE_UTM}&utm_content=anchored-scaler`,
      },
      {
        name: 'Aspire OS',
        description: 'Automate business expense management across every global entity without losing control.',
        url: `https://aspireapp.com/expense-management?${BASE_UTM}&utm_content=anchored-scaler`,
      },
    ],
    ctaLabel: 'Build your global financial stack',
    ctaUrl: `https://aspireapp.com/register?${BASE_UTM}&utm_content=anchored-scaler`,
  },

  // ── 100: The Chaos Pilot ──────────────────────────────────────
  // Speed-first + Conviction-led + Lean
  '100': {
    code: '100',
    slug: 'hustler',
    name: 'The hustler',
    tagline: 'Move fast. Trust your gut. Figure it out on the way up.',
    badge: 'The hustler',
    dominantArchetype: 'Speed-first operator',
    secondaryArchetypes: ['Steward of the future', 'Lean-operator'],
    dna: { growth: 'speed', decisions: 'conviction', scale: 'lean' },
    description:
      'You move fast and trust your gut. You\'re comfortable with ambiguity and prioritise momentum.',
    peers: [
      { name: 'Alex Bouaziz', company: 'Deel' },
      { name: 'Markus Villig', company: 'Early stage - Bolt' },
    ],
    productReasoning:
      'You move at a pace where reimbursement cycles and approval bottlenecks are a real drag on momentum. A business account that is operational from day one and corporate cards for the team mean your people can spend when they need to — without waiting for a finance process to catch up with your speed.',
    products: [
      {
        name: 'Aspire Business Account',
        description: 'Open in minutes, operational from day one. No waiting, no paperwork purgatory — a business account that moves as fast as you do.',
        url: `https://aspireapp.com/business-account?${BASE_UTM}&utm_content=hustler`,
      },
      {
        name: 'Aspire Corporate Cards',
        description: 'Give the team spend access without the reimbursement drag. Limits per card, real-time visibility, zero delays.',
        url: `https://aspireapp.com/corporate-cards?${BASE_UTM}&utm_content=hustler`,
      },
    ],
    ctaLabel: 'Open your business account',
    ctaUrl: `https://aspireapp.com/register?${BASE_UTM}&utm_content=hustler`,
  },

  // ── 101: The AI Monster ───────────────────────────────────────
  // Speed-first + Conviction-led + Global
  '101': {
    code: '101',
    slug: 'solo-visionary',
    name: 'The solo visionary',
    tagline: 'Building a future that doesn\'t exist yet — and getting there first.',
    badge: 'The solo visionary',
    dominantArchetype: 'Steward of the future',
    secondaryArchetypes: ['Speed-first operator', 'Global-first'],
    dna: { growth: 'speed', decisions: 'conviction', scale: 'global' },
    description:
      'You are building for a future that doesn\'t exist yet, and you\'re using every technological lever to get there first. You prioritize aggressive scale and unshakeable belief.',
    peers: [
      { name: 'Sam Altman', company: 'OpenAI' },
      { name: 'Vlad Tenev', company: 'Robinhood' },
    ],
    productReasoning:
      'You are global from day one and moving faster than any traditional financial setup can handle. Multi-currency accounts remove the FX friction as you push into new markets, and corporate cards give your fast-growing team the spend access they need to keep pace — without the admin that kills momentum.',
    products: [
      {
        name: 'Aspire Multi-Currency Account',
        description: 'Hold and move money in 30+ currencies from day one. Your company was always global — your banking should be too.',
        url: `https://aspireapp.com/multi-currency?${BASE_UTM}&utm_content=solo-visionary`,
      },
      {
        name: 'Aspire Corporate Cards',
        description: 'Spend access for a fast-growing global team. Per-card limits and real-time visibility so speed never comes at the cost of control.',
        url: `https://aspireapp.com/corporate-cards?${BASE_UTM}&utm_content=solo-visionary`,
      },
    ],
    ctaLabel: 'Build your global financial stack',
    ctaUrl: `https://aspireapp.com/register?${BASE_UTM}&utm_content=solo-visionary`,
  },

  // ── 110: The High-Velocity Tinkerer ──────────────────────────
  // Speed-first + Principle-driven + Lean
  '110': {
    code: '110',
    slug: 'tinkerer',
    name: 'The tinkerer',
    tagline: 'Iterate constantly. Let principles keep the speed in check.',
    badge: 'The tinkerer',
    dominantArchetype: 'Speed-first operator',
    secondaryArchetypes: ['Principle-led builder', 'Lean-operator'],
    dna: { growth: 'speed', decisions: 'principle', scale: 'lean' },
    description:
      'You iterate constantly. You use clear principles to keep your speed in check, ensuring that every sprint moves in the right direction.',
    peers: [
      { name: 'Tom Brown', company: 'Anthropic' },
      { name: 'Dylan Field', company: 'Expansion stage - Figma' },
    ],
    productReasoning:
      'Every sprint counts, and admin between sprints is a tax on your output. Corporate cards with per-person limits keep the lean team moving without you approving every purchase, while automated expense management means receipts and reconciliation happen in the background — not on your desk.',
    products: [
      {
        name: 'Aspire OS',
        description: 'Automate business expense management between every sprint without losing control of where the money goes.',
        url: `https://aspireapp.com/expense-management?${BASE_UTM}&utm_content=tinkerer`,
      },
      {
        name: 'Aspire Expense Management',
        description: 'Automate the admin between sprints. Real-time receipt capture and approval flows so your team never slows down to file expenses.',
        url: `https://aspireapp.com/expense-management?${BASE_UTM}&utm_content=tinkerer`,
      },
    ],
    ctaLabel: 'Give your team controlled spend access',
    ctaUrl: `https://aspireapp.com/register?${BASE_UTM}&utm_content=tinkerer`,
  },

  // ── 111: The Global Juggernaut ────────────────────────────────
  // Speed-first + Principle-driven + Global
  '111': {
    code: '111',
    slug: 'global-trailblazer',
    name: 'The global trailblazer',
    tagline: 'Blitzscaling with principles. Capturing markets while others are still planning.',
    badge: 'The global trailblazer',
    dominantArchetype: 'Speed-first operator',
    secondaryArchetypes: ['Principle-led builder', 'Global-first'],
    dna: { growth: 'speed', decisions: 'principle', scale: 'global' },
    description:
      'You are the ultimate blitzscaler. You use principles to scale judgment across massive, global teams, allowing you to capture entire markets while others are still planning.',
    peers: [
      { name: 'Alex Bouaziz', company: 'Deel' },
      { name: 'Markus Villig', company: 'Bolt' },
    ],
    productReasoning:
      'Blitzscaling across markets with a distributed team demands financial infrastructure that scales as fast as your ambition. Multi-currency accounts remove the friction of operating in multiple currencies simultaneously, while corporate cards give every global team member controlled spend access from day one — with the real-time visibility your principles require.',
    products: [
      {
        name: 'Aspire Multi-Currency Account',
        description: 'Operate in 30+ currencies with zero friction. The global financial backbone for a company that treats borders as logistics, not limits.',
        url: `https://aspireapp.com/multi-currency?${BASE_UTM}&utm_content=global-trailblazer`,
      },
      {
        name: 'Aspire OS',
        description: 'Automate business expense management across markets without losing control as your headcount scales.',
        url: `https://aspireapp.com/expense-management?${BASE_UTM}&utm_content=global-trailblazer`,
      },
    ],
    ctaLabel: 'Build your global financial stack',
    ctaUrl: `https://aspireapp.com/register?${BASE_UTM}&utm_content=global-trailblazer`,
  },
};

// ── Helpers ───────────────────────────────────────────────────

export function getArchetypeByCode(code: string): Archetype | undefined {
  return archetypes[code as BinaryCode];
}

export function getArchetypeBySlug(slug: string): Archetype | undefined {
  return Object.values(archetypes).find((a) => a.slug === slug);
}

export const allArchetypeSlugs = Object.values(archetypes).map((a) => a.slug);

export const allBinaryCodes = Object.keys(archetypes) as BinaryCode[];
