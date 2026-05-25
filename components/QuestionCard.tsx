'use client';

import { motion } from 'framer-motion';
import type { Question } from '@/lib/quiz-data';
import CardFrame from '@/components/tarot/CardFrame';
import { QUESTION_ILLOS } from '@/components/tarot/QuestionIllos';

type Props = {
  question: Question;
  questionNumber: number;
  selectedOption: string | null;
  onAnswer: (optionId: string) => void;
};

export default function QuestionCard({
  question,
  questionNumber,
  selectedOption,
  onAnswer,
}: Props) {
  const illos = QUESTION_ILLOS[question.id] ?? [() => null, () => null];
  const [IlloA, IlloB] = illos;

  const optionA = question.options[0];
  const optionB = question.options[1];

  const isASelected = selectedOption === optionA?.id;
  const isBSelected = selectedOption === optionB?.id;
  const hasSelection = selectedOption !== null;

  const labelFor = (option: typeof optionA, isSelected: boolean) => (
    <p
      className={`
        font-body text-[13px] leading-snug text-center transition-colors duration-200
        ${isSelected ? 'text-white font-semibold' : 'text-white/80'}
      `}
    >
      {option.label}
    </p>
  );

  return (
    <div className="w-full">
      {/* Scenario label */}
      <div className="mb-4">
        <span className="inline-block text-[11px] font-body font-semibold tracking-[0.15em] uppercase text-mint/70">
          Scenario {questionNumber}
        </span>
      </div>

      {/* Question text */}
      <h2 className="font-display text-xl md:text-2xl font-bold text-white leading-tight mb-8">
        {question.text}
      </h2>

      {/* ── Tarot card layout ───────────────────────────────── */}
      <div className="flex items-center gap-3">

        {/* Card A */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
        >
          {optionA && (
            <CardFrame
              illustration={<IlloA />}
              label={labelFor(optionA, isASelected)}
              isSelected={isASelected}
              isOtherSelected={hasSelection && !isASelected}
              onClick={() => onAnswer(optionA.id)}
              size="md"
            />
          )}
        </motion.div>

        {/* OR divider — desktop */}
        <motion.div
          className="hidden sm:flex flex-col items-center gap-2 flex-shrink-0 px-1 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <div className="w-px h-10 bg-white/10" />
          <span className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-white/22">
            or
          </span>
          <div className="w-px h-10 bg-white/10" />
        </motion.div>

        {/* Card B */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
        >
          {optionB && (
            <CardFrame
              illustration={<IlloB />}
              label={labelFor(optionB, isBSelected)}
              isSelected={isBSelected}
              isOtherSelected={hasSelection && !isBSelected}
              onClick={() => onAnswer(optionB.id)}
              size="md"
            />
          )}
        </motion.div>
      </div>

      {/* OR divider — mobile (between stacked cards it's rendered via margin) */}
      <div className="flex sm:hidden items-center gap-3 my-3">
        <div className="flex-1 h-px bg-white/10" />
        <span className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-white/22">
          or
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Tap hint */}
      {!selectedOption && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center text-white/25 text-xs font-body mt-6"
        >
          Choose a card to advance
        </motion.p>
      )}
    </div>
  );
}
