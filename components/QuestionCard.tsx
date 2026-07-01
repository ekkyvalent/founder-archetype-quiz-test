'use client';

import { motion } from 'framer-motion';
import type { Question } from '@/lib/quiz-data';
import CardFrame from '@/components/tarot/CardFrame';

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
  const optionA = question.options[0];
  const optionB = question.options[1];

  const isASelected = selectedOption === optionA?.id;
  const isBSelected = selectedOption === optionB?.id;
  const hasSelection = selectedOption !== null;

  const labelFor = (option: typeof optionA, isSelected: boolean) => (
    <p
      className={`
        font-body text-sm sm:text-base leading-snug text-center transition-colors duration-200
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
        <span className="inline-block text-[11px] font-body font-semibold tracking-wide text-mint/70">
          Scenario {questionNumber}
        </span>
      </div>

      {/* Question text */}
      <h2 className="font-display text-xl md:text-2xl font-bold text-white leading-tight mb-8">
        {question.text}
      </h2>

      {/* ── Tarot card layout ───────────────────────────────── */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Card A */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
        >
          {optionA && (
            <CardFrame
              label={labelFor(optionA, isASelected)}
              isSelected={isASelected}
              isOtherSelected={hasSelection && !isASelected}
              onClick={() => onAnswer(optionA.id)}
              size="md"
            />
          )}
        </motion.div>

        {/* OR divider */}
        <motion.div
          className="flex flex-col items-center gap-2 flex-shrink-0 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <div className="w-px h-6 sm:h-8 bg-white/15" />
          <span className="font-display text-[10px] font-bold text-white/40">or</span>
          <div className="w-px h-6 sm:h-8 bg-white/15" />
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
              label={labelFor(optionB, isBSelected)}
              isSelected={isBSelected}
              isOtherSelected={hasSelection && !isBSelected}
              onClick={() => onAnswer(optionB.id)}
              size="md"
            />
          )}
        </motion.div>
      </div>

      {/* Tap hint */}
      {!selectedOption && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center text-mint/60 text-xs font-body mt-6"
        >
          Choose a card to advance
        </motion.p>
      )}
    </div>
  );
}
