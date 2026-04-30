'use client';

import { motion } from 'framer-motion';

type Props = {
  current: number; // 1-based current question index
  total: number;
};

export default function ProgressBar({ current, total }: Props) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      {/* Step counter + percentage */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-body text-white/40 tracking-widest uppercase">
          Question {current} of {total}
        </span>
        <span className="text-xs font-body font-semibold text-mint tabular-nums">
          {percent}%
        </span>
      </div>

      {/* Dot track */}
      <div className="flex items-center gap-1 mb-2.5">
        {Array.from({ length: total }).map((_, i) => {
          const isDone = i < current - 1;
          const isCurrent = i === current - 1;
          const isPending = i > current - 1;

          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                backgroundColor: isDone
                  ? '#00D395'
                  : isCurrent
                  ? '#ffffff'
                  : 'rgba(255,255,255,0.12)',
                scale: isCurrent ? 1.15 : 1,
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`
                rounded-full flex-1 h-1
                ${isCurrent ? 'animate-dot-pulse' : ''}
              `}
            />
          );
        })}
      </div>

      {/* Animated fill bar */}
      <div className="w-full h-px bg-white/8 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #00D395, #00F5AF)' }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
