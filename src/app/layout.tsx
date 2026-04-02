import type { Metadata } from 'next';
import './globals.css';
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
            <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)' }}>
              © 2026 Grandmaster Automation. All rights reserved. Built with precision.
            </footer>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
