// ─────────────────────────────────────────────────────────────
// QUIZ DATA — Founder Archetype Quiz 2026
//
// Binary logic: each question has exactly 2 options (A and B).
// Three "Anchor" questions determine the final archetype:
//   Q1  → Digit 1 (Growth:    Deliberate=0 / Speed=1)
//   Q4  → Digit 2 (Decisions: Conviction=0 / Principle=1)
//   Q7  → Digit 3 (Scale:     Lean=0 / Global=1)
//
// The remaining 7 questions are engagement scaffolding only.
// The anchor flag is internal — never expose it in the UI.
// ─────────────────────────────────────────────────────────────

export type OptionValue = 0 | 1; // Only meaningful for anchor questions

export type Option = {
  id: string;
  label: string;
  subtext?: string;
  value: OptionValue; // A=0, B=1
};

export type AnchorMeta = {
  digitIndex: 0 | 1 | 2; // Position in the 3-bit binary code
  dimension: 'Growth' | 'Decisions' | 'Scale';
  zeroLabel: string; // Human label for value=0
  oneLabel: string;  // Human label for value=1
};

export type Question = {
  id: string;
  text: string;
  subtext?: string;
  options: [Option, Option]; // Always exactly two options: A and B
  anchor?: AnchorMeta;       // Present only on Q1, Q4, Q7
};

export const questions: Question[] = [
  // ── Q1 — ANCHOR 1: Growth ────────────────────────────────────
  {
    id: 'q1',
    text: 'A competitor launches a similar product in your core market. How do you respond?',
    anchor: {
      digitIndex: 0,
      dimension: 'Growth',
      zeroLabel: 'Deliberate',
      oneLabel: 'Speed-first',
    },
    options: [
      {
        id: 'q1-a',
        label: 'Review internal systems and unit economics to ensure your foundation is break-proof.',
        value: 0,
      },
      {
        id: 'q1-b',
        label: 'Ship an immediate update or counter-feature to reclaim the market narrative.',
        value: 1,
      },
    ],
  },

  // ── Q2 — Modifier ────────────────────────────────────────────
  {
    id: 'q2',
    text: 'Your team is divided on a major product pivot. How do you find the answer?',
    options: [
      {
        id: 'q2-a',
        label: 'Trust your gut and make the final call, even if it\'s unpopular.',
        value: 0,
      },
      {
        id: 'q2-b',
        label: 'Look for a consensus that aligns with your core company values.',
        value: 1,
      },
    ],
  },

  // ── Q3 — Modifier ────────────────────────────────────────────
  {
    id: 'q3',
    text: 'You\'ve just secured a fresh round of funding. What is your first move?',
    options: [
      {
        id: 'q3-a',
        label: 'Shore up your balance sheet to maximise long-term control.',
        value: 0,
      },
      {
        id: 'q3-b',
        label: 'Deploy it immediately into aggressive customer acquisition.',
        value: 1,
      },
    ],
  },

  // ── Q4 — ANCHOR 2: Decisions ─────────────────────────────────
  {
    id: 'q4',
    text: 'How do you handle high-stakes decisions where the data is unclear?',
    anchor: {
      digitIndex: 1,
      dimension: 'Decisions',
      zeroLabel: 'Conviction-led',
      oneLabel: 'Principle-driven',
    },
    options: [
      {
        id: 'q4-a',
        label: 'Rely on your personal conviction and vision for the future.',
        value: 0,
      },
      {
        id: 'q4-b',
        label: 'Lean on established principles and safety frameworks to guide the path.',
        value: 1,
      },
    ],
  },

  // ── Q5 — Modifier ────────────────────────────────────────────
  {
    id: 'q5',
    text: 'When it comes to hiring, what is your non-negotiable trait?',
    options: [
      {
        id: 'q5-a',
        label: 'Finding "believers" who will work toward an impossible future.',
        value: 0,
      },
      {
        id: 'q5-b',
        label: 'Finding "operators" who prioritise efficiency and repeatable systems.',
        value: 1,
      },
    ],
  },

  // ── Q6 — Modifier ────────────────────────────────────────────
  {
    id: 'q6',
    text: 'Your roadmap is falling behind schedule. What do you do?',
    options: [
      {
        id: 'q6-a',
        label: 'Delay the launch to ensure the product meets your internal standards of craft.',
        value: 0,
      },
      {
        id: 'q6-b',
        label: 'Cut the scope and ship the minimum viable version today.',
        value: 1,
      },
    ],
  },

  // ── Q7 — ANCHOR 3: Scale ─────────────────────────────────────
  {
    id: 'q7',
    text: 'What does scale look like to you in the next 12 months?',
    anchor: {
      digitIndex: 2,
      dimension: 'Scale',
      zeroLabel: 'Lean',
      oneLabel: 'Global',
    },
    options: [
      {
        id: 'q7-a',
        label: 'Staying lean and maintaining extreme talent density with a small team.',
        value: 0,
      },
      {
        id: 'q7-b',
        label: 'Expanding your footprint rapidly across multiple global markets.',
        value: 1,
      },
    ],
  },

  // ── Q8 — Modifier ────────────────────────────────────────────
  {
    id: 'q8',
    text: 'How do you view the role of AI in your current business?',
    options: [
      {
        id: 'q8-a',
        label: 'A tool to expand human exploration and creative judgment.',
        value: 0,
      },
      {
        id: 'q8-b',
        label: 'A way to automate every friction point and shock the organisation into higher output.',
        value: 1,
      },
    ],
  },

  // ── Q9 — Modifier ────────────────────────────────────────────
  {
    id: 'q9',
    text: 'A top-tier investor suggests a move that doubles revenue but dilutes your brand taste. Do you take it?',
    options: [
      {
        id: 'q9-a',
        label: 'No — consistency and brand integrity are your primary moats.',
        value: 0,
      },
      {
        id: 'q9-b',
        label: 'Yes — growth is the ultimate validation of your business model.',
        value: 1,
      },
    ],
  },

  // ── Q10 — Modifier ───────────────────────────────────────────
  {
    id: 'q10',
    text: 'How do you want your peers to describe your leadership style?',
    options: [
      {
        id: 'q10-a',
        label: 'Unshakeable and visionary, even in total uncertainty.',
        value: 0,
      },
      {
        id: 'q10-b',
        label: 'Disciplined and reliable, with a focus on sustainable growth.',
        value: 1,
      },
    ],
  },
];

// Anchor question IDs — used by the scoring engine
export const ANCHOR_QUESTION_IDS = ['q1', 'q4', 'q7'] as const;
export type AnchorQuestionId = typeof ANCHOR_QUESTION_IDS[number];
