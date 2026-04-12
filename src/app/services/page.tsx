"use client";

import { CheckCircle, Zap, ShieldCheck, Search, Globe, Code, Target, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      title: "AI-Powered SEO Automation",
      desc: "Our proprietary AI engine analyzes 500+ ranking signals to automate technical fixes and content optimization for guaranteed SERP dominance.",
      icon: Search,
      price: "₹6,999/mo"
    },
    {
      title: "3D & Immersive Web Design",
      desc: "We build stunning, high-performance websites using Next.js and Three.js that load in under 500ms and convert visitors into loyal clients.",
      icon: Code,
      price: "₹14,999 onwards"
    },
    {
      title: "PSEO (Programmatic SEO)",
      desc: "Scale your reach to 200+ cities instantly. Our PSEO engine generates highly targeted local landing pages that capture regional search intent.",
      icon: Globe,
      price: "₹19,999 onwards"
    },
    {
      title: "Conversion Audit & UX",
      desc: "Stop losing traffic. We identify friction points in your user journey and re-engineer your UX for maximum conversion efficiency.",
      icon: Target,
      price: "₹4,999 (Audit)"
    }
  ];

  return (
    <div className="services-page">
      <section className="container" style={{ paddingTop: '8rem', paddingBottom: '6rem', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', marginBottom: '1.5rem' }}>
          Elite Ranking Services
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
          We don&apos;t just build websites; we engineer revenue-generating assets that dominate search results and crush your competition.
        </p>
      </section>

      <section className="container" style={{ paddingBottom: '8rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {services.map((s, i) => (
            <div key={i} className="glass-panel" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05 }}>
                <s.icon size={120} />
              </div>
              <div style={{ background: 'rgba(0,240,255,0.1)', display: 'inline-flex', padding: '12px', borderRadius: '12px', marginBottom: '1.5rem' }}>
                <s.icon size={32} color="var(--accent-neon)" />
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>{s.desc}</p>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--accent-gold)' }}>{s.price}</span>
                <Link href="/#analyze" style={{ color: 'var(--accent-neon)', fontWeight: 600, fontSize: '0.9rem' }}>Enquire Now →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section style={{ background: 'rgba(255,255,255,0.02)', padding: '8rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', fontWeight: 800, textAlign: 'center', marginBottom: '4rem' }}>
            Traditional SEO vs <span className="text-gradient">Quantapex AI</span>
          </h2>
          <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <th style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)' }}>FEATURE</th>
                  <th style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)' }}>OTHER AGENCIES</th>
                  <th style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-neon)' }}>QUANTAPEX AI</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: "Ranking Speed", t: "3-6 Months", q: "30-60 Days" },
                  { f: "Audit Type", t: "Manual Checklist", q: "AI Deep Scan (500+ Signals)" },
                  { f: "Scalability", t: "Limited (Manual)", q: "Infinite (PSEO Engine)" },
                  { f: "Content Quality", t: "Generic Blogs", q: "High-Relevance Semantic Pillars" }
                ].map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>{row.f}</td>
                    <td style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', opacity: 0.6 }}>{row.t}</td>
                    <td style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', fontWeight: 700, color: 'var(--accent-neon)' }}>{row.q}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container" style={{ margin: '8rem auto', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '5rem', background: 'linear-gradient(135deg, rgba(0,240,255,0.1), rgba(0,0,0,0.5))' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem' }}>Ready to Scale Your Business?</h2>
          <Link href="/#analyze" className="glow-button" style={{ padding: '20px 60px', borderRadius: '100px' }}>Initiate First-Page Strategy</Link>
        </div>
      </section>
    </div>
  );
}
