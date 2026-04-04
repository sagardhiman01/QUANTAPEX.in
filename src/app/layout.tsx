import type { Metadata } from 'next';
import './globals.css';
import { CITIES } from '../lib/cities';
import SmoothScroll from '../components/SmoothScroll';

export const metadata: Metadata = {
  title: 'SEO Grandmaster Automation',
  description: 'AI-Powered Full Website SEO Analysis and Ranking Strategies',
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
      </head>
      <body>
        <SmoothScroll>
          <div className="layout-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <nav style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="container">
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }} className="text-gradient">Grandmaster SEO</div>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <a href="#analyze" style={{ fontSize: '1rem', fontWeight: 500 }} className="text-secondary hover:text-white transition-colors">Analyze Data</a>
                <a href="#reports" style={{ fontSize: '1rem', fontWeight: 500 }} className="text-secondary hover:text-white transition-colors">Reports</a>
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
