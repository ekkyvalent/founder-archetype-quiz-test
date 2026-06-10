import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import type { Metadata } from 'next';

import { getArchetypeBySlug, allArchetypeSlugs } from '@/lib/archetypes';
import ResultsCard from '@/components/ResultsCard';

type Props = {
  params: { slug: string };
  searchParams: { name?: string };
};

// Pre-render all 8 archetype result pages at build time
export function generateStaticParams() {
  return allArchetypeSlugs.map((slug) => ({ slug }));
}

// Dynamic OG meta per archetype — this is what makes sharing work on LinkedIn etc.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const archetype = getArchetypeBySlug(params.slug);

  if (!archetype) {
    return { title: 'Not Found | Aspire Founder Quiz' };
  }

  // Auto-detect origin so URLs work on any environment (Vercel preview, prod, local)
  const headersList = headers();
  const host = headersList.get('host') ?? 'aspireapp.com';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? `${protocol}://${host}`;
  const ogImageUrl = `${BASE_URL}/og/${params.slug}.png`; // static file in /public/og/
  const pageUrl = `${BASE_URL}/results/${params.slug}`;

  return {
    title: `I'm "${archetype.name}" — What's your founder archetype? | Aspire`,
    description: archetype.tagline,
    openGraph: {
      title: `I'm "${archetype.name}" — What's your founder archetype?`,
      description: archetype.tagline,
      url: pageUrl,
      siteName: 'Aspire',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: `${archetype.name} — Aspire Founder Archetype`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `I'm "${archetype.name}" — What's your founder archetype?`,
      description: archetype.tagline,
      images: [ogImageUrl],
    },
  };
}

export default function ResultsPage({ params, searchParams }: Props) {
  const archetype = getArchetypeBySlug(params.slug);

  if (!archetype) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-near-black binary-bg flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
        <a
          href="/quiz"
          className="hover:opacity-70 transition-opacity duration-200"
        >
          <img src="/aspire-logo.svg" alt="Aspire" className="h-5 w-auto" />
        </a>
        <a
          href="/quiz"
          className="text-white/35 hover:text-white/60 font-body text-sm transition-colors duration-200 flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Retake quiz
        </a>
      </header>

      {/* Results content */}
      <div className="flex-1 flex items-start justify-center px-4 md:px-8 py-12 md:py-16">
        <ResultsCard archetype={archetype} />
      </div>
    </main>
  );
}
