'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Archetype } from '@/lib/archetypes';
import CardFrame from '@/components/tarot/CardFrame';
import { ARCHETYPE_ILLOS_BY_SLUG } from '@/components/tarot/ArchetypeIllos';

// Roman numeral for each archetype (I–VIII) by slug
const ROMAN_NUMERALS: Record<string, string> = {
  'stealth-architect':    'I',
  'visionary-pathfinder': 'II',
  'product-purist':       'III',
  'anchored-scaler':      'IV',
  'hustler':              'V',
  'solo-visionary':       'VI',
  'tinkerer':             'VII',
  'global-trailblazer':   'VIII',
};

type Props = {
  archetype: Archetype;
};

// DNA dimension labels
const DIMENSION_META = {
  growth: {
    label: 'Growth style',
    zeroLabel: 'Deliberate',
    oneLabel: 'Speed-first',
    zeroDesc: 'Foundation before fuel',
    oneDesc: 'Move before the market turns',
  },
  decisions: {
    label: 'Decision mode',
    zeroLabel: 'Conviction-led',
    oneLabel: 'Principle-driven',
    zeroDesc: 'Gut over guardrail',
    oneDesc: 'Structure over instinct',
  },
  scale: {
    label: 'Scale horizon',
    zeroLabel: 'Lean',
    oneLabel: 'Global',
    zeroDesc: 'Talent density over headcount',
    oneDesc: 'The world is the addressable market',
  },
} as const;

// ── DNA Dimension Card ────────────────────────────────────────
function DnaDimensionCard({
  dimension,
  value,
  delay,
}: {
  dimension: keyof typeof DIMENSION_META;
  value: 0 | 1;
  delay: number;
}) {
  const meta = DIMENSION_META[dimension];
  const activeLabel = value === 0 ? meta.zeroLabel : meta.oneLabel;
  const activeDesc = value === 0 ? meta.zeroDesc : meta.oneDesc;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="p-4 rounded-2xl border border-white/8 bg-white/[0.03]"
    >
      {/* Dimension label */}
      <p className="text-[10px] font-body font-semibold tracking-wide text-white/30 mb-3">
        {meta.label}
      </p>

      {/* Active side */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="font-display font-bold text-base text-mint">{activeLabel}</span>
          <p className="text-white/45 text-xs font-body mt-0.5 leading-relaxed">{activeDesc}</p>
        </div>
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-mint/15 border border-mint/30 flex items-center justify-center mt-0.5">
          <svg className="w-3 h-3 text-mint" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

// ── Peer Badge ────────────────────────────────────────────────
function PeerBadge({ name, company, delay }: { name: string; company: string; delay: number }) {
  // Initials from name
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.35, type: 'spring', stiffness: 240, damping: 22 }}
      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-white/8 bg-white/[0.03]"
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-mint/15 border border-mint/20 flex items-center justify-center flex-shrink-0">
        <span className="font-display font-bold text-[11px] text-mint">{initials}</span>
      </div>
      <div>
        <p className="font-body font-semibold text-white text-sm leading-tight">{name}</p>
        <p className="font-body text-white/40 text-xs">{company}</p>
      </div>
    </motion.div>
  );
}

const REPORT_DOWNLOAD_URL = process.env.NEXT_PUBLIC_REPORT_URL ?? '#';

// ── Product icon map ──────────────────────────────────────────
const PRODUCT_ICONS: Record<string, React.ReactElement> = {
  'Aspire Business Account': (
    <svg className="w-4 h-4 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  'Aspire Multi-Currency Account': (
    <svg className="w-4 h-4 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'Aspire International Transfers': (
    <svg className="w-4 h-4 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  'Aspire Corporate Cards': (
    <svg className="w-4 h-4 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  'Aspire Expense Management': (
    <svg className="w-4 h-4 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  'Aspire OS': (
    <svg className="w-4 h-4 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  'default': (
    <svg className="w-4 h-4 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

// ── Main ResultsCard ──────────────────────────────────────────
export default function ResultsCard({ archetype }: Props) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://aspireapp.com/founder-archetype-quiz';
  const [copied, setCopied] = useState(false);
  const linkedInTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (linkedInTimerRef.current) clearTimeout(linkedInTimerRef.current);
    };
  }, []);

  // Download report email capture
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState('');
  const [reportEmail, setReportEmail] = useState('');
  const [reportFirstName, setReportFirstName] = useState('');

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reportLoading) return;
    setReportError('');

    if (!reportFirstName.trim()) {
      setReportError('Please enter your first name.');
      return;
    }
    if (!reportEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reportEmail)) {
      setReportError('Enter a valid work email address.');
      return;
    }

    setReportLoading(true);
    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: reportEmail,
          firstName: reportFirstName || '',
          archetype: archetype.slug,
          source: 'founder-quiz-report',
        }),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      setReportSubmitted(true);
    } catch {
      setReportError('Something went wrong. Please try again.');
    } finally {
      setReportLoading(false);
    }
  };

  const shareUrl = `${BASE_URL}/results/${archetype.slug}`;

  // X/Twitter — pre-filled tweet
  const archetypeName = archetype.name.charAt(0).toLowerCase() + archetype.name.slice(1);
  const tweetCopy = `Just took the Aspire Founder Archetypes quiz. I'm ${archetypeName}. ${archetype.tagline} I nominate (insert 3 names) to take this quiz. What's yours? #FounderArchetype`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetCopy)}&url=${encodeURIComponent(shareUrl)}`;

  // X/Twitter handler — Web Share API on mobile, download + open intent URL on desktop
  const handleX = useCallback(async () => {
    const shareCardUrl = `/share/${archetype.slug}.png`;
    const isMobile = navigator.maxTouchPoints > 0;

    if (isMobile && typeof navigator.share === 'function') {
      try {
        const imgRes = await fetch(shareCardUrl);
        const blob = await imgRes.blob();
        const file = new File([blob], `${archetype.slug}-founder-archetype.png`, { type: 'image/png' });
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], text: tweetCopy });
          return;
        }
        // Device supports share but not file sharing — share text + URL only
        await navigator.share({ text: tweetCopy, url: shareUrl });
        return;
      } catch {
        // Fall through to desktop flow
      }
    }

    // Desktop: download image + open pre-filled tweet
    const a = document.createElement('a');
    a.href = shareCardUrl;
    a.download = `${archetype.slug}-founder-archetype.png`;
    a.click();
    setTimeout(() => {
      window.open(twitterUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  }, [archetype.slug, tweetCopy, twitterUrl]);

  // LinkedIn — copy to clipboard, open feed
  const linkedInShareUrl = 'https://www.linkedin.com/feed/';
  const clipboardCopy = `Just took the Aspire Founder Archetypes quiz. I'm ${archetypeName}.\n\n${archetype.tagline}\n\nI nominate (insert 3 names) to take this quiz.\n\nFind out your founder type → ${shareUrl}\n\n#FounderArchetype`;

  const handleLinkedIn = useCallback(async () => {
    const shareCardUrl = `/share/${archetype.slug}.png`;

    // LinkedIn drops image attachments from the share sheet on mobile,
    // so we use the same flow on all devices: download image + copy caption + open feed.

    // Copy caption to clipboard
    try {
      await navigator.clipboard.writeText(clipboardCopy);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = clipboardCopy;
      textarea.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try { document.execCommand('copy'); } finally { document.body.removeChild(textarea); }
    }

    // Also trigger image download so it's ready to attach
    const a = document.createElement('a');
    a.href = shareCardUrl;
    a.download = `${archetype.slug}-founder-archetype.png`;
    a.click();

    setCopied(true);
    linkedInTimerRef.current = setTimeout(() => {
      window.open(linkedInShareUrl, '_blank', 'noopener,noreferrer');
    }, 4000);
  }, [archetype.slug, clipboardCopy, linkedInShareUrl]);

  const dnaValues = {
    growth: archetype.dna.growth === 'speed' ? 1 : 0,
    decisions: archetype.dna.decisions === 'principle' ? 1 : 0,
    scale: archetype.dna.scale === 'global' ? 1 : 0,
  } as const;

  const IlloComp = ARCHETYPE_ILLOS_BY_SLUG[archetype.slug] ?? (() => null);
  const romanNumeral = ROMAN_NUMERALS[archetype.slug] ?? '';

  return (
    <div className="w-full max-w-4xl mx-auto pb-16">

      {/* ── Hero row: tarot card + archetype identity ────── */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Stacks vertically on mobile, side-by-side on sm+ */}
          <div className="flex flex-col sm:flex-row gap-6 md:gap-10 items-start mb-12">

            {/* ── Tarot card (fixed width) ─────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 self-center sm:self-auto"
            >
              <CardFrame
                illustration={<IlloComp />}
                label={
                  <p className="font-display font-bold text-sm text-white text-center tracking-wide">
                    {archetype.name}
                  </p>
                }
                topLabel={romanNumeral}
                isSelected
                size="lg"
              />
            </motion.div>

            {/* ── Archetype identity text ──────────────── */}
            <div className="flex-1 min-w-0 pt-1">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.35 }}
                className="inline-flex items-center gap-2 bg-mint/10 border border-mint/20 text-mint text-[11px] font-body font-semibold tracking-wide px-3 py-1.5 rounded-full mb-4"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                Your archetype
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-3"
              >
                {archetype.name}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.4 }}
                className="font-body text-mint text-base md:text-lg leading-relaxed mb-5"
              >
                {archetype.tagline}
              </motion.p>

              {/* Dominant + secondary trait pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.24, duration: 0.35 }}
                className="flex flex-wrap gap-2 mb-5"
              >
                <span className="text-[11px] font-body font-semibold bg-white/8 text-white/60 px-3 py-1.5 rounded-full border border-white/10">
                  {archetype.dominantArchetype}
                </span>
                {archetype.secondaryArchetypes.map((a) => (
                  <span key={a} className="text-[11px] font-body bg-white/[0.04] text-white/35 px-3 py-1.5 rounded-full border border-white/[0.07]">
                    {a}
                  </span>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.4 }}
                className="font-body text-white/60 text-[14px] leading-relaxed mb-6"
              >
                {archetype.description}
              </motion.p>

              {/* Famous peers — sits in the right column on desktop */}
              {archetype.peers.length > 0 && (
                <div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="text-[11px] font-body font-semibold tracking-wide text-white/30 mb-3"
                  >
                    Your famous peers
                  </motion.p>
                  <div className="flex flex-wrap gap-2">
                    {archetype.peers.map((peer, i) => (
                      <PeerBadge
                        key={peer.name}
                        name={peer.name}
                        company={peer.company}
                        delay={0.32 + i * 0.08}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

            {/* ── Social sharing ─────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.36, duration: 0.4 }}
              className="flex flex-col items-center gap-4 mb-10 p-5 rounded-2xl border border-mint/20 bg-mint/[0.04]"
            >
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1 h-px bg-mint/20" />
                <p className="text-mint/70 text-xs font-body font-semibold tracking-wide flex-shrink-0">
                  Share your archetype
                </p>
                <div className="flex-1 h-px bg-mint/20" />
              </div>

              <div className="flex gap-3 flex-wrap justify-center">
                {/* LinkedIn — clipboard + open share dialog */}
                <button
                  onClick={handleLinkedIn}
                  className="
                    flex items-center gap-2 px-4 py-2.5 rounded-xl
                    border border-mint/25 bg-mint/10
                    text-mint hover:bg-mint/20 hover:border-mint/40
                    font-body text-sm transition-all duration-200
                  "
                >
                  <svg className="w-4 h-4 text-mint" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Share on LinkedIn
                </button>

                {/* X/Twitter */}
                <button
                  onClick={handleX}
                  className="
                    flex items-center gap-2 px-4 py-2.5 rounded-xl
                    border border-mint/25 bg-mint/10
                    text-mint hover:bg-mint/20 hover:border-mint/40
                    font-body text-sm transition-all duration-200
                  "
                >
                  <svg className="w-4 h-4 text-mint" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Share on X
                </button>

                {/* Download social card */}
                <a
                  href={`/share/${archetype.slug}.png`}
                  download={`${archetype.slug}-founder-archetype.png`}
                  className="
                    flex items-center gap-2 px-4 py-2.5 rounded-xl
                    border border-mint/25 bg-mint/10
                    text-mint hover:bg-mint/20 hover:border-mint/40
                    font-body text-sm transition-all duration-200
                  "
                >
                  <svg className="w-4 h-4 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download card
                </a>
              </div>

              {/* LinkedIn clipboard toast */}
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2 text-xs font-body text-mint/80"
                  >
                    <svg className="w-3.5 h-3.5 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Caption copied — image downloading now. Open LinkedIn, create a post, attach the image from your Downloads or camera roll, then paste the caption.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hashtag prompt */}
              <p className="text-mint/40 text-xs font-body text-center">
                Tag{' '}
                <span className="text-mint/60 font-semibold">#FounderArchetype</span>
                {' '}and see how your DNA compares with your network
              </p>
            </motion.div>

            {/* ── Download Report ───────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.4 }}
              className="mb-10 p-5 rounded-2xl border border-white/8 bg-white/[0.03]"
            >
              <p className="text-[11px] font-body font-semibold tracking-wide text-white/30 mb-2">
                Free report
              </p>
              <h3 className="font-display font-bold text-white text-lg mb-1">
                Read the full Founder Archetypes Report 2026
              </h3>
              <p className="font-body text-white/50 text-sm leading-relaxed mb-4">
                Go deeper on all 8 archetypes: the decision frameworks, the famous founder profiles, and what separates the builders who last. Enter your details below to get the full report.
              </p>

              {/* Default CTA button */}
              {!showEmailForm && !reportSubmitted && (
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="
                    w-full bg-mint text-near-black font-display font-bold
                    py-3.5 px-6 rounded-xl text-sm
                    hover:opacity-90 transition-opacity duration-200
                    flex items-center justify-center gap-2
                  "
                >
                  Download the report
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              )}

              {/* Email form */}
              {showEmailForm && !reportSubmitted && (
                <motion.form
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleReportSubmit}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="text"
                    placeholder="First name *"
                    value={reportFirstName}
                    onChange={(e) => setReportFirstName(e.target.value)}
                    disabled={reportLoading}
                    required
                    className="
                      w-full px-4 py-3.5 rounded-xl border border-white/10
                      bg-white/[0.04] text-white placeholder-white/25
                      font-body text-[15px]
                      focus:outline-none focus:border-mint/60 focus:bg-white/[0.07]
                      transition-all duration-200 disabled:opacity-50
                    "
                  />
                  <input
                    type="email"
                    placeholder="Work email *"
                    value={reportEmail}
                    onChange={(e) => setReportEmail(e.target.value)}
                    disabled={reportLoading}
                    required
                    className="
                      w-full px-4 py-3.5 rounded-xl border border-white/10
                      bg-white/[0.04] text-white placeholder-white/25
                      font-body text-[15px]
                      focus:outline-none focus:border-mint/60 focus:bg-white/[0.07]
                      transition-all duration-200 disabled:opacity-50
                    "
                  />
                  {reportError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm font-body"
                    >
                      {reportError}
                    </motion.p>
                  )}
                  <button
                    type="submit"
                    disabled={reportLoading}
                    className="
                      w-full bg-mint text-near-black font-display font-bold
                      py-4 px-6 rounded-xl text-sm
                      hover:opacity-90 transition-all duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  >
                    {reportLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send me the report →'
                    )}
                  </button>
                  <p className="text-white/25 text-xs font-body text-center">
                    No spam. Unsubscribe any time.
                  </p>
                </motion.form>
              )}

              {/* Success state */}
              {reportSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-3 py-2"
                >
                  <div className="w-10 h-10 rounded-full bg-mint/15 border border-mint/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-body text-white/70 text-sm text-center">
                    Report is on its way to your inbox.
                  </p>
                  {REPORT_DOWNLOAD_URL !== '#' && (
                    <a
                      href={REPORT_DOWNLOAD_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-mint text-sm font-body font-semibold hover:opacity-80 transition-opacity"
                    >
                      Or download it directly →
                    </a>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* ── DNA Breakdown ─────────────────────────── */}
            <div className="mb-10">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.36, duration: 0.3 }}
                className="text-[11px] font-body font-semibold tracking-wide text-white/30 mb-3"
              >
                Your DNA breakdown
              </motion.p>
              <div className="flex flex-col gap-3">
                <DnaDimensionCard dimension="growth" value={dnaValues.growth} delay={0.38} />
                <DnaDimensionCard dimension="decisions" value={dnaValues.decisions} delay={0.46} />
                <DnaDimensionCard dimension="scale" value={dnaValues.scale} delay={0.54} />
              </div>
            </div>

            {/* ── Aspire products ────────────────────────── */}
            <div className="mb-8">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="text-[11px] font-body font-semibold tracking-wide text-white/30 mb-3"
              >
                Built for founders like you
              </motion.p>

              {/* Product reasoning */}
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.62, duration: 0.4 }}
                className="font-body text-white/50 text-[14px] leading-relaxed mb-4"
              >
                {archetype.productReasoning}
              </motion.p>

              {/* Icon-based product pills */}
              <div className="flex flex-wrap gap-3">
                {archetype.products.map((product, i) => {
                  const icon = PRODUCT_ICONS[product.name] ?? PRODUCT_ICONS['default'];
                  return (
                    <motion.a
                      key={product.name}
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.64 + i * 0.07, duration: 0.3 }}
                      className="
                        group flex items-center gap-3 px-4 py-3 rounded-2xl
                        border border-white/8 bg-white/[0.03]
                        hover:border-mint/30 hover:bg-white/[0.06]
                        transition-all duration-200
                      "
                    >
                      {/* Icon circle */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mint/10 border border-mint/20 flex items-center justify-center group-hover:bg-mint/15 transition-colors duration-200">
                        {icon}
                      </div>
                      {/* Product name */}
                      <span className="font-body font-semibold text-white/70 text-sm group-hover:text-white transition-colors duration-200 whitespace-nowrap">
                        {product.name === 'Aspire OS' ? 'Aspire OS' : product.name.replace('Aspire ', '')}
                      </span>
                      {/* Arrow */}
                      <svg className="w-3.5 h-3.5 text-white/20 group-hover:text-mint/60 flex-shrink-0 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* ── Primary CTA ────────────────────────────── */}
            <motion.a
              href={archetype.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.4 }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              className="
                block w-full text-center
                bg-mint text-near-black font-display font-bold
                py-4 px-6 rounded-xl text-base
                transition-opacity duration-200 hover:opacity-92
                mb-8
              "
            >
              {archetype.ctaLabel} →
            </motion.a>

            {/* Retake */}
            <div className="text-center mt-8">
              <a
                href="/quiz"
                className="text-white/25 text-sm font-body hover:text-white/50 transition-colors duration-200"
              >
                Retake the quiz
              </a>
            </div>
          </motion.div>
      </AnimatePresence>
    </div>
  );
}
