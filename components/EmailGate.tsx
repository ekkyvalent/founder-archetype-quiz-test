'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  onSubmit: (email: string, firstName?: string) => Promise<void>;
};

export default function EmailGate({ onSubmit }: Props) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address to unlock your results.');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(email, firstName || undefined);
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md mx-auto"
    >
      {/* Lock icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, type: 'spring', stiffness: 260, damping: 20 }}
        className="flex justify-center mb-8"
      >
        <div className="w-16 h-16 rounded-2xl bg-mint/10 border border-mint/20 flex items-center justify-center">
          <svg className="w-7 h-7 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
      </motion.div>

      {/* Heading */}
      <div className="text-center mb-8">
        <p className="text-mint font-body text-[11px] font-semibold tracking-wide mb-3">
          Your DNA is ready
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
          Unlock your full founder profile
        </h2>
        <p className="font-body text-white/50 text-[15px] leading-relaxed">
          Your archetype, your famous founder peers, and the Aspire products built for your exact execution style. One email away.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* First name (optional but friendly) */}
        <input
          type="text"
          placeholder="First name (optional)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={loading}
          className="
            w-full px-4 py-3.5 rounded-xl border border-white/10
            bg-white/[0.04] text-white placeholder-white/25
            font-body text-[15px]
            focus:outline-none focus:border-mint/60 focus:bg-white/[0.07]
            transition-all duration-200
            disabled:opacity-50
          "
        />

        {/* Email (required) */}
        <input
          type="email"
          placeholder="Work email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
          className="
            w-full px-4 py-3.5 rounded-xl border border-white/10
            bg-white/[0.04] text-white placeholder-white/25
            font-body text-[15px]
            focus:outline-none focus:border-mint/60 focus:bg-white/[0.07]
            transition-all duration-200
            disabled:opacity-50
          "
        />

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm font-body"
          >
            {error}
          </motion.p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            relative w-full overflow-hidden
            bg-mint text-near-black font-display font-bold
            py-4 px-6 rounded-xl text-base
            hover:opacity-90 active:scale-[0.98]
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Decoding your DNA...
            </span>
          ) : (
            'Reveal my founder archetype →'
          )}
        </button>
      </form>

      {/* Trust signal */}
      <p className="text-white/25 text-xs font-body mt-5 text-center">
        No spam. No noise. Unsubscribe any time.
      </p>
    </motion.div>
  );
}
