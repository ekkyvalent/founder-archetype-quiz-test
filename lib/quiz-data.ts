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
        label: 'Ignore the noise and stay the course on your original, long-horizon roadmap',
        value: 0,
      },
      {
        id: 'q1-b',
        label: 'Ship an immediate update or counter-feature to reclaim the market narrative',
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
        label: 'Trust your gut and make the final call, even if it\'s unpopular',
        value: 0,
      },
      {
        id: 'q2-b',
        label: 'Look for a consensus within the leadership team to ensure alignment with your core company values',
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
        label: 'Spend sustainably to extend runway and focus on profitability',
        value: 0,
      },
      {
        id: 'q3-b',
        label: 'Double down on growth to win the market quickly',
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
        label: 'Wait for more clarity or reduce risk before committing',
        value: 0,
      },
      {
        id: 'q4-b',
        label: 'Commit early and course-correct if needed',
        value: 1,
      },
    ],
  },

  // ── Q5 — Modifier ────────────────────────────────────────────
  {
    id: 'q5',
    text: 'When it comes to hiring, what are you looking for?',
    options: [
      {
        id: 'q5-a',
        label: 'Proven operators who can execute immediately and drive results',
        value: 0,
      },
      {
        id: 'q5-b',
        label: 'People who believe in the vision and will grow with it',
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
        label: 'Rally the team, reset priorities, and push through a focused release',
        value: 0,
      },
      {
        id: 'q6-b',
        label: 'Ship lean and iterate as you go',
        value: 1,
      },
    ],
  },

  // ── Q7 — ANCHOR 3: Scale ─────────────────────────────────────
  {
    id: 'q7',
    text: 'What does success look like to you in the next 12 months?',
    anchor: {
      digitIndex: 2,
      dimension: 'Scale',
      zeroLabel: 'Lean',
      oneLabel: 'Global',
    },
    options: [
      {
        id: 'q7-a',
        label: 'We\'ve built a more resilient business with strong foundations for long-term growth',
        value: 0,
      },
      {
        id: 'q7-b',
        label: 'We\'ve moved faster than competitors and captured meaningful market share',
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
        label: 'A tool we adopt selectively with clear guidelines for tangible outcomes',
        value: 0,
      },
      {
        id: 'q8-b',
        label: 'A strategic lever we push aggressively to move faster and stay ahead',
        value: 1,
      },
    ],
  },

  // ── Q9 — Modifier ────────────────────────────────────────────
  {
    id: 'q9',
    text: 'A top-tier investor suggests a move that increases revenue but may conflict with your long-term vision. How do you respond?',
    options: [
      {
        id: 'q9-a',
        label: 'Explore it selectively. Test the upside while protecting your long-term direction',
        value: 0,
      },
      {
        id: 'q9-b',
        label: 'Hold the line while finding ways to adapt and align it with your long-term goals',
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
        label: 'Structured and intentional, setting clear direction, priorities, and standards for the team',
        value: 0,
      },
      {
        id: 'q10-b',
        label: 'Bold and decisive, making calls quickly and rallying the team around them',
        value: 1,
      },
    ],
  },
];

// Anchor question IDs — used by the scoring engine
export const ANCHOR_QUESTION_IDS = ['q1', 'q4', 'q7'] as const;
export type AnchorQuestionId = typeof ANCHOR_QUESTION_IDS[number];
