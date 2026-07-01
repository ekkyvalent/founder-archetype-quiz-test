'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate as motionAnimate } from 'framer-motion';
import type { Archetype } from '@/lib/archetypes';

// ── Card back face ───────────────────────────────────────────────
function CardBack() {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-[0_0_40px_rgba(190,255,207,0.12)]">
      <img
        src="/cards/card-back.png"
        alt="Your archetype awaits"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// ── Card front face ──────────────────────────────────────────────
function CardFront({ archetype }: { archetype: Archetype }) {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-[0_0_0_1px_#BEFFCF,0_0_56px_rgba(190,255,207,0.20)]">
      <img
        src={`/cards/${archetype.slug}.png`}
        alt={archetype.name}
        className="w-full h-full object-cover"
      />
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
  const [isRevealed, setIsRevealed] = useState(false);
  const scaleX = useMotionValue(1);
  const flyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (flyTimerRef.current) clearTimeout(flyTimerRef.current);
    };
  }, []);

  const handleCardClick = useCallback(async () => {
    if (stage !== 'idle') return;
    setStage('flipping');

    try {
      // Phase 1: squish to edge-on
      await motionAnimate(scaleX, 0, { duration: 0.28, ease: [0.4, 0, 1, 1] });

      // Swap content at midpoint
      setIsRevealed(true);

      // Phase 2: expand back revealing front face
      await motionAnimate(scaleX, 1, { duration: 0.28, ease: [0, 0, 0.2, 1] });

      // Pause so user sees their result, then fly away
      flyTimerRef.current = setTimeout(() => setStage('flying'), 700);
    } catch {
      // Animation interrupted (e.g. unmount) — reset gracefully
      setStage('idle');
    }
  }, [stage, scaleX]);

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
              Your archetype is ready. Tap to reveal
            </motion.p>
          )}
          {isFlipped && isRevealed && (
            <motion.p
              key="revealed"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
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
        style={{ width: 'min(260px, 75vw)', aspectRatio: '5 / 7' }}
      >
        {/* Flip card — scaleX animates 1→0→1 for the flip effect */}
        <motion.div
          onClick={handleCardClick}
          style={{
            scaleX,
            width: '100%',
            height: '100%',
            position: 'relative',
            cursor: stage === 'idle' ? 'pointer' : 'default',
          }}
        >
          {isRevealed ? <CardFront archetype={archetype} /> : <CardBack />}
        </motion.div>
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
            <span className="font-body text-white/22 text-[11px] tracking-wide">
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
