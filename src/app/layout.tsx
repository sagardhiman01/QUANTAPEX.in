import type { Metadata } from 'next';
import './globals.css';
import { CITIES } from '../lib/cities';
import SmoothScroll from '../components/SmoothScroll';
import AnalyticsTracker from '@/components/AnalyticsTracker';

export const metadata: Metadata = {
  title: {
    default: 'Quantapex | Top Web Development & AI Solutions Agency',
    template: '%s | Quantapex',
  },
  description: "Boutique agency specializing in generative AI development, LLM enterprise integration, and high-converting custom website design for hotels, resorts, and restaurants.",
  keywords: ['Generative AI development services', 'Hotel booking engine integration', 'Direct booking website design for hotels', 'Online ordering system developer for restaurants', 'Cloud kitchen website development', 'Custom React development for fintech'],
  authors: [{ name: 'Quantapex Studio' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://quantapex.in',
    siteName: 'Quantapex',
    title: 'Quantapex | Top Web Development & AI Solutions Agency',
    description: 'Empowering organizations with scalable AI, custom software, and digital solutions.',
    images: [
      {
        url: 'https://quantapex.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Quantapex - Leading Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantapex | Top Web Development & AI Solutions Agency',
    description: 'Empowering organizations with scalable AI, custom software, and digital solutions.',
    creator: '@quantapex',
    images: ['https://quantapex.in/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://quantapex.in',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Quantapex',
  alternateName: 'Quantapex Studio',
  description: 'Boutique agency specializing in generative AI development, LLM enterprise integration, and high-converting custom website design for hotels, resorts, and restaurants.',
  url: 'https://quantapex.in',
  telephone: '+91-0000000000',
  email: 'hello@quantapex.in',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'India',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://linkedin.com/company/quantapex',
    'https://twitter.com/quantapex',
    'https://github.com/sagardhiman01',
  ],
  image: 'https://quantapex.in/og-image.jpg',
  logo: 'https://quantapex.in/og-image.jpg',
  priceRange: '$$$',
  // GEO: Author/Publisher for AI citation engines
  author: {
    '@type': 'Organization',
    name: 'Quantapex Studio',
    url: 'https://quantapex.in',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Quantapex',
    logo: {
      '@type': 'ImageObject',
      url: 'https://quantapex.in/og-image.jpg',
    },
  },
  // AggregateRating for rich snippets
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '6',
    bestRating: '5',
    worstRating: '1',
  },
  // Service catalog for hospitality + AI
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Quantapex Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hotel Website Development',
          description: 'Direct booking engine integration and PMS-connected hotel websites.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Restaurant Website Development',
          description: 'Online ordering system, table reservation, and digital menu for restaurants.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Generative AI Development',
          description: 'LLM integration, ChatGPT API, RAG pipelines, and AI automation for businesses.',
        },
      },
    ],
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AnalyticsTracker />
        <SmoothScroll>
          <div className="layout-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(16px)' }} className="container">
              <a href="/" style={{ fontSize: '1.4rem', fontWeight: 800, textDecoration: 'none' }} className="text-gradient">Quantapex</a>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <a href="/#analyze" style={{ fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', color: 'rgba(255,255,255,0.6)' }}>Analyze</a>
                <a href="/faq" style={{ fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', color: 'rgba(255,255,255,0.6)' }}>FAQ</a>
                <a href="/reviews" style={{ fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', color: 'rgba(255,255,255,0.6)' }}>Reviews</a>
                <a href="/#analyze" style={{ fontSize: '0.85rem', fontWeight: 700, padding: '8px 18px', background: 'linear-gradient(135deg, #00f0ff22, #0070ff22)', border: '1px solid #00f0ff66', borderRadius: '100px', color: '#00f0ff', textDecoration: 'none' }}>Start Free Analysis</a>
              </div>
            </nav>
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-black)' }}>
              <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', opacity: 0.5, letterSpacing: '2px', textTransform: 'uppercase' }}>Global Presence</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem', height: '150px', overflowY: 'auto', padding: '1.5rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }} className="scrollbar-hidden">
                    {CITIES.map((c) => (
                      <a 
                        key={c.id} 
                        href={`/agency/${c.id}`}
                        style={{ fontSize: '0.8rem', opacity: 0.4, whiteSpace: 'nowrap' }}
                        className="hover:opacity-100 hover:text-blue-400 transition-all"
                      >
                        {c.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: 'center', opacity: 0.4, fontSize: '0.9rem' }}>
                  © 2026 Quantapex Growth Automation. All rights reserved. 
                  <br />
                  <span style={{ fontSize: '0.7rem' }}>Global Web Supremacy Engine Active.</span>
                </div>
              </div>
            </footer>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
