// This route is no longer used — OG images are static files in /public/og/
// Keeping the file as a redirect for any cached links that still hit /api/og
import { NextRequest, NextResponse } from 'next/server';
import { getArchetypeBySlug } from '@/lib/archetypes';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('archetype');
  const archetype = slug ? getArchetypeBySlug(slug) : null;

  const imageFile = archetype ? `${archetype.slug}.png` : 'default.png';
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? `https://${req.headers.get('host')}`;

  return NextResponse.redirect(`${base}/og/${imageFile}`, { status: 301 });
}
