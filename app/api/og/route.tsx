import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getArchetypeBySlug } from '@/lib/archetypes';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('archetype');
  const archetype = slug ? getArchetypeBySlug(slug) : null;

  const isResult = !!archetype;

  // Default state (quiz landing)
  const headline = isResult
    ? archetype.name
    : 'What kind of founder are you?';
  const subline = isResult
    ? archetype.tagline
    : 'Take the Aspire Founder Archetype Quiz — 5 minutes, 8 possible results.';
  const binaryCode = isResult ? archetype.code : null;
  const badge = isResult ? archetype.badge : null;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          backgroundColor: '#141414',
          padding: '64px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background grid lines (subtle) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '100% 80px',
            pointerEvents: 'none',
          }}
        />

        {/* Top: Aspire logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', zIndex: 1 }}>
          <span style={{ color: '#ffffff', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px' }}>
            aspire
          </span>
          <span style={{ color: '#00D395', fontSize: '28px', fontWeight: 700 }}>.</span>
          {isResult && (
            <span
              style={{
                color: 'rgba(255,255,255,0.25)',
                fontSize: '14px',
                fontWeight: 400,
                marginLeft: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              Founder Archetypes 2026
            </span>
          )}
        </div>

        {/* Middle: Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 1 }}>
          {/* Binary code — only on result pages */}
          {binaryCode && (
            <div style={{ display: 'flex', gap: '12px', marginBottom: '4px' }}>
              {binaryCode.split('').map((digit, i) => (
                <span
                  key={i}
                  style={{
                    color: '#00D395',
                    fontSize: '72px',
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: '-2px',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {digit}
                </span>
              ))}
            </div>
          )}

          {/* Badge */}
          {badge && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(0, 211, 149, 0.12)',
                border: '1px solid rgba(0, 211, 149, 0.25)',
                color: '#00D395',
                fontSize: '13px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                padding: '8px 16px',
                borderRadius: '999px',
                width: 'fit-content',
              }}
            >
              Your archetype
            </div>
          )}

          {/* Headline */}
          <div
            style={{
              color: '#ffffff',
              fontSize: isResult ? '52px' : '58px',
              fontWeight: 800,
              lineHeight: 1.08,
              maxWidth: '900px',
              letterSpacing: isResult ? '-1px' : '-0.5px',
            }}
          >
            {headline}
          </div>

          {/* Sub-line */}
          <div
            style={{
              color: isResult ? '#00D395' : 'rgba(255,255,255,0.5)',
              fontSize: '22px',
              fontWeight: 400,
              maxWidth: '750px',
              lineHeight: 1.45,
            }}
          >
            {subline}
          </div>

          {/* DNA dimensions — only on result pages */}
          {isResult && archetype && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              {[
                archetype.dna.growth === 'deliberate' ? 'Deliberate' : 'Speed-first',
                archetype.dna.decisions === 'conviction' ? 'Conviction-led' : 'Principle-driven',
                archetype.dna.scale === 'lean' ? 'Lean' : 'Global',
              ].map((label) => (
                <div
                  key={label}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '13px',
                    fontWeight: 500,
                    padding: '6px 14px',
                    borderRadius: '8px',
                    letterSpacing: '0.5px',
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom: CTA / site URL */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '16px' }}>
            aspireapp.com/founder-archetype-quiz
          </span>
          {!isResult && (
            <div
              style={{
                backgroundColor: '#00D395',
                color: '#141414',
                fontSize: '16px',
                fontWeight: 700,
                padding: '10px 24px',
                borderRadius: '10px',
              }}
            >
              Take the quiz →
            </div>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
