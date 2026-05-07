// ─────────────────────────────────────────────────────────────
// SCORING ENGINE — Binary Anchor Logic
//
// Reads answers for the 3 anchor questions only:
//   Q1  → Bit 0 (Growth:    A=0 Deliberate / B=1 Speed-first)
//   Q4  → Bit 1 (Decisions: A=0 Conviction  / B=1 Principle)
//   Q7  → Bit 2 (Scale:     A=0 Lean        / B=1 Global)
//
// Combines into a 3-bit binary string → maps to archetype slug.
// The 7 non-anchor questions do not affect the result.
//
// Pure function — no side effects, easy to unit test.
// ─────────────────────────────────────────────────────────────

import { questions, ANCHOR_QUESTION_IDS } from './quiz-data';
import { getArchetypeByCode, type BinaryCode } from './archetypes';

type Answers = Record<string, string>; // { q1: 'q1-a', q4: 'q4-b', q7: 'q7-a', ... }

/**
 * Read the bit value for a single anchor question.
 * Option ID ending in '-a' → 0 (deliberate / conviction / lean)
 * Option ID ending in '-b' → 1 (speed / principle / global)
 * Defaults to 0 if the question was not answered.
 */
function getAnchorBit(answers: Answers, questionId: string): 0 | 1 {
  const optionId = answers[questionId];
  if (!optionId) return 0; // safe default

  const question = questions.find((q) => q.id === questionId);
  const option = question?.options.find((o) => o.id === optionId);
  return option?.value ?? 0;
}

/**
 * Convert answers map → 3-bit binary string → archetype slug.
 *
 * @example
 * // User answered Q1=A, Q4=B, Q7=B → '011' → 'anchored-scaler'
 * calculateArchetype({ q1: 'q1-a', q4: 'q4-b', q7: 'q7-b' })
 */
export function calculateArchetype(answers: Answers): string {
  const bits = ANCHOR_QUESTION_IDS.map((qId) => getAnchorBit(answers, qId));
  const code = bits.join('') as BinaryCode;
  const archetype = getArchetypeByCode(code);

  if (!archetype) {
    // Fallback — should never happen if data is valid
    console.error(`[scoring] No archetype found for code: ${code}`);
    return 'stealth-architect';
  }

  return archetype.slug;
}

/**
 * Returns the binary code (e.g. '101') from answers.
 * Useful for displaying the code on the results page.
 */
export function calculateBinaryCode(answers: Answers): BinaryCode {
  const bits = ANCHOR_QUESTION_IDS.map((qId) => getAnchorBit(answers, qId));
  return bits.join('') as BinaryCode;
}

/**
 * Returns a per-dimension breakdown of the user's DNA.
 * Useful for the results page DNA section.
 */
export function getDnaBreakdown(answers: Answers) {
  const [growthBit, decisionsBit, scaleBit] = ANCHOR_QUESTION_IDS.map((qId) =>
    getAnchorBit(answers, qId)
  );

  return {
    growth: {
      dimension: 'Growth',
      value: growthBit,
      label: growthBit === 0 ? 'Deliberate' : 'Speed-first',
      description:
        growthBit === 0
          ? 'You expand with intention. Foundation before fuel.'
          : 'You move before the market catches up. Speed is the strategy.',
    },
    decisions: {
      dimension: 'Decisions',
      value: decisionsBit,
      label: decisionsBit === 0 ? 'Conviction-led' : 'Principle-driven',
      description:
        decisionsBit === 0
          ? 'You trust your vision when the data runs out. Gut over guardrail.'
          : 'You lean on proven frameworks when the fog gets thick. Structure over instinct.',
    },
    scale: {
      dimension: 'Scale',
      value: scaleBit,
      label: scaleBit === 0 ? 'Lean' : 'Global',
      description:
        scaleBit === 0
          ? 'Talent density over headcount. A small team that punches above its weight.'
          : 'Multiple markets, multiple time zones. The world was always your addressable market.',
    },
  };
}
