'use client';

import { motion } from 'framer-motion';

// ── Selected checkmark badge ─────────────────────────────────
function CheckBadge() {
  return (
    <div className="w-9 h-9 rounded-full bg-mint flex items-center justify-center flex-shrink-0">
      <svg className="w-4.5 h-4.5 text-near-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

// ── Question option card frame ────────────────────────────────
// Text-only: no illustration, no ornaments — just the frame,
// an optional selected checkmark, and centred label copy.
type CardFrameProps = {
  label: React.ReactNode;
  isSelected?: boolean;
  isOtherSelected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
};

export default function CardFrame({
  label,
  isSelected = false,
  isOtherSelected = false,
  onClick,
  size = 'sm',
}: CardFrameProps) {
  const isClickable = !!onClick;

  const sizeClass =
    size === 'lg'
      ? 'w-[220px] min-h-[308px]'
      : size === 'md'
      ? 'w-full min-h-[170px] sm:aspect-[5/7] sm:min-h-[280px]'
      : 'w-full min-h-[214px]';

  return (
    <motion.div
      onClick={onClick}
      animate={{ opacity: isOtherSelected ? 0.35 : 1 }}
      whileHover={isClickable && !isSelected && !isOtherSelected ? { y: -4 } : {}}
      whileTap={isClickable ? { scale: 0.97 } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`
        relative flex flex-col items-center justify-center text-center
        gap-4 px-4 sm:px-5 py-6
        rounded-xl overflow-hidden
        border transition-all duration-250
        ${sizeClass}
        ${isClickable ? 'cursor-pointer select-none' : ''}
        ${isSelected
          ? 'border-mint bg-[#1e281f] shadow-[0_0_0_1px_#BEFFCF,0_0_32px_rgba(190,255,207,0.15)]'
          : 'border-white/12 bg-[#1e1e1e] hover:border-white/25'
        }
      `}
    >
      {isSelected && <CheckBadge />}

      {/* ── Label copy ───────────────────────────────────── */}
      <div className="flex-shrink-0">
        {label}
      </div>
    </motion.div>
  );
}
