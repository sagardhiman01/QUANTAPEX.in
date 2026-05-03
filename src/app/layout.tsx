import type { Metadata } from 'next';
import './globals.css';
import { CITIES } from '../lib/cities';
import SmoothScroll from '../components/SmoothScroll';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    default: 'Quantapex | AI SEO & Web Agency — Rank #1 on Google',
    template: '%s | Quantapex'
  },
  description: 'Quantapex is an AI-powered SEO automation and web development agency. Get a free website audit, rank higher on Google, and grow your business with proven strategies.',
  keywords: ['AI SEO agency', 'automated SEO services', 'enterprise web development', 'Next.js agency', 'programmatic SEO', 'Google ranking automation', 'Quantapex', 'local SEO domination'],
  authors: [{ name: 'Quantapex', url: 'https://quantapex.in' }],
  creator: 'Quantapex',
  publisher: 'Quantapex',
  metadataBase: new URL('https://quantapex.in'),
  alternates: {
    canonical: 'https://quantapex.in',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://quantapex.in',
    siteName: 'Quantapex SEO & Web Agency',
    title: 'Quantapex | AI SEO & Web Agency — Rank #1 on Google',
    description: 'Quantapex is an AI-powered SEO automation and web development agency. Get a free website audit, rank higher on Google, and grow your business.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Quantapex — AI SEO Grandmaster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantapex | AI SEO & Web Agency',
    description: 'AI-powered SEO automation. Get a free website audit and rank higher on Google.',
    creator: '@quantapex',
  },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        {/* Organization JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Quantapex",
              "url": "https://quantapex.in",
              "logo": "https://quantapex.in/favicon.ico",
              "description": "AI-powered SEO automation and web development agency helping businesses rank on Google and grow revenue.",
              "foundingDate": "2024",
              "numberOfEmployees": "10-50",
              "areaServed": "Worldwide",
              "serviceType": ["SEO", "Web Development", "Digital Marketing", "AI Automation"],
              "sameAs": [
                "https://github.com/quantapex"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["English", "Hindi"]
              }
            })
          }}
        />
        {/* WebSite Search Box Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Quantapex",
              "url": "https://quantapex.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://quantapex.in/blog?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Quantapex SEO Agency",
              "url": "https://quantapex.in",
              "priceRange": "₹6,999 - ₹99,999",
              "currenciesAccepted": "INR, USD",
              "paymentAccepted": "Cash, Credit Card, Bank Transfer",
              "openingHours": "Mo-Fr 09:00-18:00",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "SEO & Web Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "SEO Audit & Strategy",
                      "description": "Comprehensive AI-powered SEO audit with actionable ranking strategy"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Web Design & Development",
                      "description": "High-performance Next.js websites that rank and convert"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Local SEO Domination",
                      "description": "Google Maps and local search ranking for businesses"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body>
        <AnalyticsTracker />
        <SmoothScroll>
          <div className="layout-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <nav style={{ 
              padding: '1.25rem 2rem', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderBottom: '1px solid var(--border-color)',
              background: 'rgba(10,10,12,0.85)',
              backdropFilter: 'blur(20px)',
              position: 'sticky',
              top: 0,
              zIndex: 100
            }} className="container">
              <Link href="/" style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }} className="text-gradient">
                ⚡ Quantapex
              </Link>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <Link href="/#analyze" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)' }} className="nav-link">
                  Free Audit
                </Link>
                <Link href="/blog" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)' }} className="nav-link">
                  SEO Blog
                </Link>
                <Link href="/#spy" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)' }} className="nav-link">
                  Competitor Spy
                </Link>
                <Link href="/#sales" style={{ 
                  fontSize: '0.9rem', fontWeight: 600, 
                  padding: '8px 18px',
                  border: '1px solid var(--accent-gold)',
                  borderRadius: '8px',
                  color: 'var(--accent-gold)',
                  background: 'rgba(212,175,55,0.1)',
                  transition: 'all 0.2s'
                }}>
                  Get Clients 💰
                </Link>
              </div>
            </nav>
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
              <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Footer Links */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }} className="text-gradient">⚡ Quantapex</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                      AI-powered SEO & web development agency. We help businesses dominate Google rankings globally.
                    </p>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5 }}>Quick Links</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <Link href="/blog" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>SEO Blog</Link>
                      <Link href="/#analyze" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Free SEO Audit</Link>
                      <Link href="/#spy" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Competitor Spy</Link>
                      <Link href="/#sales" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Client Acquisition</Link>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5 }}>SEO Resources</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <Link href="/blog/seo-ranking-tips-2026" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>SEO Tips 2026</Link>
                      <Link href="/blog/local-seo-google-maps-ranking" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Local SEO Guide</Link>
                      <Link href="/blog/website-speed-optimization-guide" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Speed Optimization</Link>
                      <Link href="/blog/ai-seo-tools-2026" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>AI SEO Tools</Link>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5 }}>Top Cities</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <Link href="/agency/delhi" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>SEO Agency Delhi</Link>
                      <Link href="/agency/mumbai" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>SEO Agency Mumbai</Link>
                      <Link href="/agency/dubai" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>SEO Agency Dubai</Link>
                      <Link href="/agency/london" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>SEO Agency London</Link>
                    </div>
                  </div>
                </div>

                {/* City Grid */}
                <div style={{ marginBottom: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                  <h3 style={{ fontSize: '0.85rem', marginBottom: '1.5rem', opacity: 0.4, letterSpacing: '2px', textTransform: 'uppercase' }}>Global SEO Agency Network — 200+ Cities</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.5rem', maxHeight: '120px', overflowY: 'auto', padding: '1rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }} className="scrollbar-hidden">
                    {CITIES.map((c) => (
                      <Link
                        key={c.id}
                        href={`/agency/${c.id}`}
                        style={{ fontSize: '0.75rem', opacity: 0.4, whiteSpace: 'nowrap', transition: 'opacity 0.2s' }}
                        className="hover:opacity-100"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'center', opacity: 0.4, fontSize: '0.85rem' }}>
                  © 2026 Quantapex Growth Automation. All rights reserved.
                  <br />
                  <span style={{ fontSize: '0.75rem' }}>AI SEO Grandmaster Engine | Serving 200+ Cities Globally</span>
                </div>
              </div>
            </footer>
          </div>
        </SmoothScroll>
        <style>{`
          .nav-link:hover { color: #fff !important; }
        `}</style>
      </body>
    </html>
  );
}
