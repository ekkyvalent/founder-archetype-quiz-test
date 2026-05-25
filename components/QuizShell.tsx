'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import RevealCard from './RevealCard';
import { questions } from '@/lib/quiz-data';
import { calculateArchetype } from '@/lib/scoring';
import { getArchetypeBySlug } from '@/lib/archetypes';

type Step = 'landing' | 'quiz' | 'reveal' | 'redirecting';

// ── Landing screen stats ──────────────────────────────────────
const STATS = [
  { value: '10', label: 'Scenarios' },
  { value: '5 min', label: 'To complete' },
  { value: '8', label: 'Archetypes' },
];

// ── Slide transition variants ─────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
  }),
};

const transition = { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const };

// ── Main component ────────────────────────────────────────────
export default function QuizShell() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('landing');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);
  const [archetypeSlug, setArchetypeSlug] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const selectedOption = answers[currentQuestion?.id] ?? null;
  const isLastQuestion = currentIndex === questions.length - 1;

  // Auto-advance after selection with brief delay so user sees selection
  const handleAnswer = (optionId: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate archetype immediately and go straight to reveal
      const slug = calculateArchetype(newAnswers);
      setArchetypeSlug(slug);
      setTimeout(() => setStep('reveal'), 380);
    } else {
      setDirection(1);
      setTimeout(() => setCurrentIndex((i) => i + 1), 380);
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) return;
    setDirection(-1);
    setCurrentIndex((i) => i - 1);
  };

  const handleRevealComplete = () => {
    if (!archetypeSlug) return;
    setStep('redirecting');
    router.push(`/results/${archetypeSlug}`);
  };

  return (
    <div className="min-h-screen bg-near-black binary-bg flex flex-col">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
        {/* Aspire wordmark */}
        <motion.button
          onClick={() => step !== 'landing' && setStep('landing')}
          whileHover={{ opacity: 0.8 }}
          transition={{ duration: 0.15 }}
        >
          <img src="/aspire-logo.svg" alt="Aspire" className="h-5 w-auto" />
        </motion.button>

        {/* Right: back button or step counter */}
        <div className="flex items-center gap-4">
          {step === 'quiz' && currentIndex > 0 && (
            <button
              onClick={handleBack}
              className="text-white/35 hover:text-white/60 font-body text-sm transition-colors duration-200 flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
          {step === 'quiz' && (
            <span className="text-white/25 font-body text-xs tabular-nums">
              {currentIndex + 1} / {questions.length}
            </span>
          )}
        </div>
      </header>

      {/* ── Main content ────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className={`w-full ${step === 'quiz' ? 'max-w-2xl' : 'max-w-lg'}`}>

          <AnimatePresence mode="wait" custom={direction}>

            {/* ── LANDING SCREEN ─────────────────────────── */}
            {step === 'landing' && (
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <span className="text-[11px] font-body font-semibold tracking-wide text-white/40">
                    Founder Archetypes 2026
                  </span>
                </motion.div>

                {/* Main headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.08] mb-5"
                >
                  What is your{' '}
                  <span className="text-mint">founder</span>{' '}
                  archetype?
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="font-body text-white/55 text-[15px] leading-relaxed mb-8"
                >
                  Building a company that lasts is statistically rare. We analysed dozens of long-form interviews with global changemakers to identify the 4 primary archetypes of the modern founder. Most founders are hybrids. This quiz finds your unique blend of leadership DNA.
                </motion.p>

                {/* Stats row */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34, duration: 0.4 }}
                  className="flex items-center gap-6 mb-9 pb-8 border-b border-white/[0.07]"
                >
                  {STATS.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="font-display font-bold text-xl text-white tabular-nums">
                        {stat.value}
                      </span>
                      <span className="text-white/35 text-xs font-body">{stat.label}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Why take this quiz */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="mb-9"
                >
                  <p className="text-[11px] font-body font-semibold tracking-wide text-white/35 mb-3">
                    Why take this quiz?
                  </p>
                  <p className="font-body text-white/50 text-[14px] leading-relaxed">
                    We have identified 10 real-world inflection points where a founder's intuition takes over. By navigating these scenarios, you will see the specific execution logic that drives your decisions — whether you are scaling with surgical precision or betting on a future no one else sees yet.
                  </p>
                </motion.div>

                {/* CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.46, duration: 0.4 }}
                  onClick={() => setStep('quiz')}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    w-full bg-mint text-near-black font-display font-bold
                    py-4 px-6 rounded-xl text-base
                    transition-opacity duration-200 hover:opacity-92
                    flex items-center justify-center gap-2
                  "
                >
                  Decode your founder DNA
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>

                {/* Fine print */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="text-center text-white/25 text-xs font-body mt-4"
                >
                  5 minutes · 10 questions · 1 result
                </motion.p>
              </motion.div>
            )}

            {/* ── QUIZ QUESTIONS ─────────────────────────── */}
            {step === 'quiz' && currentQuestion && (
              <motion.div
                key="quiz-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Progress bar */}
                <div className="mb-9">
                  <ProgressBar current={currentIndex + 1} total={questions.length} />
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentQuestion.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                  >
                    <QuestionCard
                      question={currentQuestion}
                      questionNumber={currentIndex + 1}
                      selectedOption={selectedOption}
                      onAnswer={handleAnswer}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── CARD REVEAL ────────────────────────────── */}
            {step === 'reveal' && archetypeSlug && (() => {
              const archetype = getArchetypeBySlug(archetypeSlug);
              return archetype ? (
                <RevealCard
                  key="reveal"
                  archetype={archetype}
                  onComplete={handleRevealComplete}
                />
              ) : null;
            })()}

            {/* ── REDIRECTING / CALCULATING ──────────────── */}
            {step === 'redirecting' && (
              <motion.div
                key="redirecting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="flex flex-col items-center gap-5">
                  {/* Spinner */}
                  <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-mint animate-spin" />
                  <p className="text-white/40 font-body text-sm">
                    Decoding your leadership DNA...
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
