import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://aspireapp.com/founder-archetype-quiz'),
  title: 'What kind of founder are you? | Aspire',
  description:
    'Take the Aspire Founder Archetype Quiz and discover which financial tools are built for founders like you.',
  openGraph: {
    title: 'What kind of founder are you? | Aspire',
    description:
      'Take the Aspire Founder Archetype Quiz and discover which financial tools are built for founders like you.',
    url: 'https://aspireapp.com/founder-archetype-quiz',
    siteName: 'Aspire',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Aspire Founder Archetype Quiz',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What kind of founder are you? | Aspire',
    description: 'Discover your founder archetype and the Aspire products built for you.',
    images: ['/api/og'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Satoshi — display font (Fontshare CDN) */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,900&display=swap"
          rel="stylesheet"
        />
        {/* Inter — body font (Google Fonts) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
