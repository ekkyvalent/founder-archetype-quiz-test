'use client';

import { motion } from 'framer-motion';

// ── Corner ornament ─────────────────────────────────────────
function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
    >
      <rect
        x="2.5"
        y="2.5"
        width="9"
        height="9"
        transform="rotate(45 7 7)"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="5"
        y="5"
        width="4"
        height="4"
        transform="rotate(45 7 7)"
        fill="currentColor"
      />
    </svg>
  );
}

// ── Tarot card frame ─────────────────────────────────────────
type CardFrameProps = {
  illustration: React.ReactNode;
  label: React.ReactNode;          // bottom text (option text or archetype name)
  topLabel?: React.ReactNode;      // optional top centre (roman numeral for result)
  isSelected?: boolean;
  isOtherSelected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  // sm = compact fallback
  // md = question cards (full-width, tall — matches lg card height)
  // lg = result card (fixed width 220px)
};

// Illustration area min-height by size
const illoMinH = { sm: '90px', md: '110px', lg: '155px' };

export default function CardFrame({
  illustration,
  label,
  topLabel,
  isSelected = false,
  isOtherSelected = false,
  onClick,
  size = 'sm',
}: CardFrameProps) {
  const isClickable = !!onClick;

  const sizeClass =
    size === 'lg'
      ? 'w-[220px] min-h-[308px]'          // 220 × 7/5 = 308 — true poker card ratio
      : size === 'md'
      ? 'w-full aspect-[5/7] min-h-[220px] sm:min-h-[280px]' // responsive 5:7 at any width
      : 'w-full min-h-[214px]';

  return (
    <motion.div
      onClick={onClick}
      animate={{ opacity: isOtherSelected ? 0.35 : 1 }}
      whileHover={isClickable && !isSelected && !isOtherSelected ? { y: -4 } : {}}
      whileTap={isClickable ? { scale: 0.97 } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`
        relative flex flex-col
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
      {/* ── Corner ornaments ─────────────────────────────── */}
      <CornerOrnament
        className={`absolute top-2.5 left-2.5 ${isSelected ? 'text-mint' : 'text-white/20'} transition-colors duration-200`}
      />
      <CornerOrnament
        className={`absolute top-2.5 right-2.5 ${isSelected ? 'text-mint' : 'text-white/20'} transition-colors duration-200`}
      />
      <CornerOrnament
        className={`absolute bottom-2.5 left-2.5 ${isSelected ? 'text-mint' : 'text-white/20'} transition-colors duration-200`}
      />
      <CornerOrnament
        className={`absolute bottom-2.5 right-2.5 ${isSelected ? 'text-mint' : 'text-white/20'} transition-colors duration-200`}
      />

      {/* ── Top label (roman numeral for result card) ──── */}
      {topLabel && (
        <div className="flex justify-center pt-5 pb-1">
          <span className={`font-display font-bold text-xs tracking-[0.2em] ${isSelected ? 'text-mint' : 'text-white/30'} transition-colors duration-200`}>
            {topLabel}
          </span>
        </div>
      )}

      {/* ── Illustration area ─────────────────────────── */}
      <div
        className={`
          relative flex items-center justify-center flex-1
          mx-4 mt-${topLabel ? '1' : '5'}
          rounded-lg overflow-hidden
          ${isSelected ? 'bg-mint/5' : 'bg-white/[0.03]'}
          transition-colors duration-200
        `}
        style={{ minHeight: illoMinH[size] }}
      >
        {/* Subtle radial glow behind illustration */}
        {isSelected && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,211,149,0.08),transparent_70%)]" />
        )}
        <div className="relative w-full h-full flex items-center justify-center p-4">
          {illustration}
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────── */}
      <div className={`mx-4 my-3 border-t ${isSelected ? 'border-mint/25' : 'border-white/8'} transition-colors duration-200`} />

      {/* ── Label / text area ─────────────────────────── */}
      <div className="px-4 pb-6 flex-shrink-0">
        {label}
      </div>
    </motion.div>
  );
}
