'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Archetype } from '@/lib/archetypes';
import { ARCHETYPE_ILLOS_BY_SLUG } from '@/components/tarot/ArchetypeIllos';

// ── Roman numerals ───────────────────────────────────────────────
const ROMAN: Record<string, string> = {
  'stealth-architect':    'I',
  'visionary-pathfinder': 'II',
  'product-purist':       'III',
  'anchored-scaler':      'IV',
  'hustler':              'V',
  'solo-visionary':       'VI',
  'tinkerer':             'VII',
  'global-trailblazer':   'VIII',
};

// ── Shared corner ornament ───────────────────────────────────────
function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className={className}>
      <rect x="2.5" y="2.5" width="9" height="9" transform="rotate(45 7 7)"
        stroke="currentColor" strokeWidth="1" />
      <rect x="5" y="5" width="4" height="4" transform="rotate(45 7 7)"
        fill="currentColor" />
    </svg>
  );
}

// ── Card back face ───────────────────────────────────────────────
// Ornate dark face — pattern + central mark, no content revealed
function CardBack() {
  return (
    <div
      className="absolute inset-0 rounded-xl overflow-hidden bg-[#111] border border-white/14 flex items-center justify-center"
      style={{ backfaceVisibility: 'hidden' } as React.CSSProperties}
    >
      {/* Corner ornaments */}
      <CornerOrnament className="absolute top-3.5 left-3.5 text-mint/35" />
      <CornerOrnament className="absolute top-3.5 right-3.5 text-mint/35" />
      <CornerOrnament className="absolute bottom-3.5 left-3.5 text-mint/35" />
      <CornerOrnament className="absolute bottom-3.5 right-3.5 text-mint/35" />

      {/* Repeating diamond tile */}
      <div className="absolute inset-5 rounded-lg overflow-hidden opacity-25">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="card-back-tile" x="0" y="0" width="28" height="28"
              patternUnits="userSpaceOnUse">
              {/* Outer diamond */}
              <rect x="14" y="0" width="10" height="10"
                transform="rotate(45 14 5)"
                fill="none" stroke="rgba(0,211,149,0.6)" strokeWidth="0.6" />
              {/* Inner dot */}
              <circle cx="14" cy="14" r="1.2"
                fill="rgba(0,211,149,0.4)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#card-back-tile)" />
        </svg>
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,211,149,0.06),transparent_65%)]" />

      {/* Central mark */}
      <div className="flex flex-col items-center gap-4 relative z-10">
        <div className="w-20 h-20 rounded-full border border-mint/18 bg-mint/[0.04] flex items-center justify-center">
          <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
            {/* Stylised A / triangle mark */}
            <polygon
              points="24,6 42,42 6,42"
              stroke="rgba(0,211,149,0.45)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <line x1="12" y1="32" x2="36" y2="32"
              stroke="rgba(0,211,149,0.45)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <p className="font-display text-[10px] tracking-[0.26em] uppercase text-white/18 font-semibold">
          Your archetype awaits
        </p>
      </div>
    </div>
  );
}

// ── Card front face ──────────────────────────────────────────────
// Revealed archetype — same visual language as the result CardFrame
function CardFront({ archetype }: { archetype: Archetype }) {
  const IlloComp = ARCHETYPE_ILLOS_BY_SLUG[archetype.slug] ?? (() => null);
  const roman = ROMAN[archetype.slug] ?? '';

  return (
    <div
      className="absolute inset-0 rounded-xl overflow-hidden flex flex-col
        bg-[#0d1f18] border border-mint
        shadow-[0_0_0_1px_#00D395,0_0_56px_rgba(0,211,149,0.20)]"
      style={{
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
      } as React.CSSProperties}
    >
      {/* Corner ornaments */}
      <CornerOrnament className="absolute top-3.5 left-3.5 text-mint" />
      <CornerOrnament className="absolute top-3.5 right-3.5 text-mint" />
      <CornerOrnament className="absolute bottom-3.5 left-3.5 text-mint" />
      <CornerOrnament className="absolute bottom-3.5 right-3.5 text-mint" />

      {/* Roman numeral */}
      <div className="flex justify-center pt-6 pb-1">
        <span className="font-display font-bold text-sm tracking-[0.22em] text-mint">
          {roman}
        </span>
      </div>

      {/* Illustration */}
      <div className="flex-1 mx-5 mt-2 rounded-lg bg-mint/5 flex items-center justify-center
        overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,211,149,0.10),transparent_70%)]" />
        <div className="relative w-full h-full flex items-center justify-center p-5">
          <IlloComp />
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 my-3 border-t border-mint/25" />

      {/* Name + tagline */}
      <div className="px-5 pb-7 text-center flex-shrink-0">
        <p className="font-display font-bold text-base text-white tracking-wide leading-tight">
          {archetype.name}
        </p>
        <p className="font-body text-mint/75 text-xs mt-1.5 leading-relaxed">
          {archetype.tagline}
        </p>
      </div>
    </div>
  );
}

// ── RevealCard ───────────────────────────────────────────────────
type Stage = 'idle' | 'flipping' | 'flying';

type Props = {
  archetype: Archetype;
  onComplete: () => void;
};

export default function RevealCard({ archetype, onComplete }: Props) {
  const [stage, setStage] = useState<Stage>('idle');

  // Step 1: user clicks card
  const handleCardClick = useCallback(() => {
    if (stage !== 'idle') return;
    setStage('flipping');
  }, [stage]);

  // Step 2: flip animation finishes → start fly-away
  const handleFlipComplete = useCallback(() => {
    if (stage !== 'flipping') return;
    // Brief pause so the user can admire the front face, then fly
    setTimeout(() => setStage('flying'), 700);
  }, [stage]);

  // Step 3: fly animation finishes → hand off to parent
  const handleFlyComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const isFlipped = stage === 'flipping' || stage === 'flying';
  const isFlying  = stage === 'flying';

  return (
    // Full-screen overlay
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center
        bg-near-black/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Ambient glow that brightens on reveal */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={isFlipped
          ? { background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,211,149,0.06), transparent)' }
          : { background: 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent, transparent)' }
        }
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {/* Status text */}
      <div className="h-8 mb-5 relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          {stage === 'idle' && (
            <motion.p
              key="hint"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="font-body text-white/35 text-sm tracking-wide"
            >
              Your archetype is ready — tap to reveal
            </motion.p>
          )}
          {stage === 'flipping' && (
            <motion.p
              key="flipping"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ delay: 0.3, duration: 0.35 }}
              className="font-body text-mint text-sm tracking-wide font-semibold"
            >
              {archetype.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Fly-away wrapper ─────────────────────────── */}
      <motion.div
        animate={
          isFlying
            ? { scale: 0.42, x: '-36vw', y: '-30vh', opacity: 0 }
            : { scale: 1,    x: 0,       y: 0,        opacity: 1 }
        }
        transition={
          isFlying
            ? { duration: 0.7, ease: [0.4, 0, 0.15, 1] }
            : {}
        }
        onAnimationComplete={isFlying ? handleFlyComplete : undefined}
        style={{ width: 260, height: 400 }}
      >
        {/* ── 3D perspective wrapper (static) ─────────── */}
        <div style={{ perspective: '1100px', width: '100%', height: '100%' }}>

          {/* ── Flip card ───────────────────────────── */}
          <motion.div
            onClick={handleCardClick}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            onAnimationComplete={stage === 'flipping' ? handleFlipComplete : undefined}
            style={{
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              position: 'relative',
              cursor: stage === 'idle' ? 'pointer' : 'default',
            }}
          >
            <CardBack />
            <CardFront archetype={archetype} />
          </motion.div>
        </div>
      </motion.div>

      {/* Pulse hint — visible only when idle */}
      <AnimatePresence>
        {stage === 'idle' && (
          <motion.div
            key="pulse"
            className="mt-7 flex items-center gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.span
              className="block w-1.5 h-1.5 rounded-full bg-mint"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-body text-white/22 text-[11px] tracking-[0.16em] uppercase">
              Tap the card
            </span>
            <motion.span
              className="block w-1.5 h-1.5 rounded-full bg-mint"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.75 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
