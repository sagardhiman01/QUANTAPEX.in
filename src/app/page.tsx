"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Search, Activity, Zap, ShieldCheck, CheckCircle, Target, MapPin, Globe, Rocket, BarChart3, Github, Eye, Mail, Layout, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { CITIES } from '@/lib/cities';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const protocolRef = useRef<HTMLDivElement>(null);
  const toolsetRef = useRef<HTMLDivElement>(null);
  
  const [url, setUrl] = useState("");
  const [businessDesc, setBusinessDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  // GitHub Auto-Rank States
  const [githubToken, setGithubToken] = useState("");
  const [repoName, setRepoName] = useState("");
  const [rankLoading, setRankLoading] = useState(false);
  const [rankResult, setRankResult] = useState<any>(null);

  // Competitor Spy States
  const [rivalUrl, setRivalUrl] = useState("");
  const [spyLoading, setSpyLoading] = useState(false);
  const [spyResult, setSpyResult] = useState<any>(null);

  // Sales Engine States
  const [targetNiche, setTargetNiche] = useState("");
  const [targetPainPoint, setTargetPainPoint] = useState("");
  const [salesLoading, setSalesLoading] = useState(false);
  const [salesResult, setSalesResult] = useState<any>(null);

  // Web Audit States
  const [auditUrl, setAuditUrl] = useState("");
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  // Intersection Observer for Sticky CTA
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    // 3D Hero Animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 100, opacity: 0, rotateX: 45 },
        { 
          y: 0, opacity: 1, rotateX: 0, 
          duration: 1.5, stagger: 0.2, 
          ease: "power4.out",
          transformPerspective: 800
        }
      );
    }

    // Scroll Animation for Form
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { scale: 0.8, opacity: 0, rotateY: -15 },
        {
          scale: 1, opacity: 1, rotateY: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Feature Cards Stagger Animation
    featureRefs.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, rotateX: -10 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            }
          }
        );
      }
    });

    // Protocol Step Animation
    if (protocolRef.current) {
        gsap.fromTo(
            protocolRef.current.querySelectorAll('.protocol-step'),
            { opacity: 0, x: -30 },
            {
                opacity: 1, x: 0,
                stagger: 0.3,
                duration: 1,
                scrollTrigger: {
                    trigger: protocolRef.current,
                    start: "top 70%"
                }
            }
        );
    }

    // Toolset Stagger
    if (toolsetRef.current) {
        gsap.fromTo(
            toolsetRef.current.querySelectorAll('.tool-card'),
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1, scale: 1,
                stagger: 0.2,
                duration: 0.8,
                scrollTrigger: {
                    trigger: toolsetRef.current,
                    start: "top 70%"
                }
            }
        );
    }

    // Sticky CTA Logic
    const handleScroll = () => {
      setShowSticky(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    try {
      const resp = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, businessDesc })
      });
      const data = await resp.json();
      setResults(data);
      setTimeout(() => {
        gsap.fromTo(
          ".results-container",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
      }, 100);
    } catch (err) {
      console.error(err);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleAutoRank = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubToken || !repoName || !url) {
      alert("Missing required fields (Token, Repo, URL).");
      return;
    }
    setRankLoading(true);
    try {
      const resp = await fetch('/api/auto-rank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: githubToken, repoFullName: repoName, url, businessDesc })
      });
      const data = await resp.json();
      setRankResult(data);
    } catch (err) {
      console.error(err);
      setRankResult({ error: "Deployment failed check console." });
    } finally {
      setRankLoading(false);
    }
  };

  const handleSpy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rivalUrl) return;
    setSpyLoading(true);
    try {
      const resp = await fetch('/api/spy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: rivalUrl })
      });
      const data = await resp.json();
      setSpyResult(data);
    } catch (err) {
      console.error(err);
      alert("Failed to penetrate rival website.");
    } finally {
      setSpyLoading(false);
    }
  };

  const handleSalesEngine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetNiche) return;
    setSalesLoading(true);
    try {
      const resp = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetNiche, targetPainPoint })
      });
      const data = await resp.json();
      setSalesResult(data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate sales pitch.");
    } finally {
      setSalesLoading(false);
    }
  };

  const handleWebAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl) return;
    setAuditLoading(true);
    try {
      const resp = await fetch('/api/webaudit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: auditUrl })
      });
      const data = await resp.json();
      setAuditResult(data);
    } catch (err) {
      console.error(err);
      alert("Failed to audit website design.");
    } finally {
      setAuditLoading(false);
    }
  };

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Sticky CTA */}
      <div style={{ 
          position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000,
          transform: showSticky ? 'translateY(0)' : 'translateY(100px)',
          opacity: showSticky ? 1 : 0, transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)'
      }}>
          <Link href="#analyze" className="glow-button" style={{ borderRadius: '100px', padding: '15px 30px', boxShadow: '0 10px 40px rgba(0,240,255,0.4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <Zap size={18} /> Get Free Audit
          </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does SEO take to show results?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SEO typically shows measurable results in 3-6 months. However, with our AI-powered strategies and technical optimizations, clients often see ranking improvements within 30-60 days for long-tail keywords."
                }
              },
              {
                "@type": "Question",
                "name": "How much does SEO cost in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SEO services in India typically cost between ₹6,999 to ₹50,000 per month depending on scope. Quantapex offers packages starting at ₹6,999/month with guaranteed first-page results."
                }
              }
            ]
          })
        }}
      />
      
      {/* Dynamic 3D Hero Section */}
      <section 
        className="container"
        style={{ 
          minHeight: '85vh', display: 'flex', flexDirection: 'column', 
          justifyContent: 'center', alignItems: 'center', textAlign: 'center',
          perspective: '1000px', paddingTop: '4rem'
        }}
      >
        <div ref={heroRef}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '1.5rem' }}>
            <span style={{ color: 'var(--accent-neon)', fontSize: '0.85rem', fontWeight: 600 }}>🚀 2026 EDITION: AI SEARCH DOMINANCE</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>
            Dominate Traffic with <br/>
            <span className="text-gradient">AI SEO Grandmaster</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
            We engine-analyze your entire digital presence. Our proprietary AI generates unbreakable ranking protocols to put you at #1 instantly.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#analyze" className="glow-button" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>Initiate Diagnostic</Link>
            <Link href="/blog" style={{ padding: '16px 40px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', fontWeight: 600 }} className="hover:bg-gray-800 transition-colors">Growth Library</Link>
          </div>
        </div>
      </section>

      {/* Global Performance Stats */}
      <section className="container" style={{ margin: '4rem auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              {[
                  { label: 'Avg. Ranking Boost', val: '+140%', icon: Rocket, color: 'var(--accent-neon)' },
                  { label: 'Technical SEO Score', val: '98/100', icon: ShieldCheck, color: 'var(--accent-gold)' },
                  { label: 'Page Load Speed', val: '122ms', icon: Zap, color: '#00ff88' },
                  { label: 'Index Rate', val: 'Instant', icon: Activity, color: '#ff4c4c' }
              ].map((stat, i) => (
                  <div key={i} className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderBottom: `2px solid ${stat.color}` }}>
                      <stat.icon size={32} color={stat.color} style={{ margin: '0 auto 1rem' }} />
                      <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>{stat.val}</div>
                      <div style={{ fontSize: '0.85rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '2px', marginTop: '0.5rem' }}>{stat.label}</div>
                  </div>
              ))}
          </div>
      </section>

      {/* Analysis Input Section - Primary Tool */}
      <section id="analyze" className="container" style={{ margin: '8rem auto' }}>
        <div 
          ref={formRef} 
          className="glass-panel" 
          style={{ padding: '4rem', maxWidth: '900px', margin: '0 auto', transformStyle: 'preserve-3d', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }} className="text-gradient">
               Initialize Site Diagnostic
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>Enter your URL to receive an AI-generated ranking roadmap.</p>
          </div>
          <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label htmlFor="url" style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>WEBSITE URL</label>
              <div style={{ position: 'relative' }}>
                <Search size={22} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-neon)' }} />
                <input 
                  type="url" 
                  id="url" 
                  required
                  placeholder="https://yourwebsite.com" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  style={{ 
                    width: '100%', padding: '20px 20px 20px 56px', 
                    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', 
                    borderRadius: '12px', color: 'var(--text-primary)', fontSize: '1.1rem',
                    transition: 'all 0.3s'
                  }} 
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-neon)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label htmlFor="business" style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>BUSINESS GOALS & CONTEXT</label>
              <textarea 
                id="business" 
                rows={4}
                placeholder="Briefly explain your business and target audience for better AI context..." 
                value={businessDesc}
                onChange={(e) => setBusinessDesc(e.target.value)}
                style={{ 
                  width: '100%', padding: '20px', 
                  background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', 
                  borderRadius: '12px', color: 'var(--text-primary)', fontSize: '1.1rem',
                  transition: 'all 0.3s'
                }} 
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-neon)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
            </div>
            <button type="submit" className="glow-button" style={{ height: '70px', fontSize: '1.25rem', fontWeight: 700 }} disabled={loading}>
              {loading ? "Decrypting Architecture..." : "Generate Mastery Protocol"}
            </button>
          </form>
        </div>

        {/* Results Visualization */}
        {results && (
            <div className="results-container" style={{ marginTop: '4rem' }}>
                <div className="glass-panel" style={{ padding: '3rem', border: '1px solid var(--accent-neon)' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }} className="text-gradient">Diagnostic Report</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(0,0,0,0.3)', textAlign: 'center' }}>
                            <div style={{ fontSize: '1rem', opacity: 0.5, marginBottom: '1rem' }}>TECHNICAL SEO SCORE</div>
                            <div style={{ fontSize: '5.5rem', fontWeight: 900, color: 'var(--accent-neon)' }}>{results.score}</div>
                            <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{results.summary}</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(0,0,0,0.3)' }}>
                            <div style={{ fontSize: '1rem', opacity: 0.5, marginBottom: '1.5rem' }}>RECCOMMENDED FIXES</div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {results.opportunities?.map((opp: any, i: number) => (
                                    <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '0.95rem' }}>
                                        <CheckCircle size={20} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                                        <span>{opp}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {results.outreachEmail && (
                        <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(212,175,55,0.05)', borderRadius: '12px', border: '1px solid var(--accent-gold)' }}>
                            <h3 style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Mail size={20} /> AI Link-Building Arsenal
                            </h3>
                            <pre style={{ background: '#000', padding: '2rem', borderRadius: '8px', color: '#00f0ff', whiteSpace: 'pre-wrap', fontSize: '0.9rem', lineHeight: 1.6, border: '1px solid #111' }}>{results.outreachEmail}</pre>
                        </div>
                    )}
                </div>
            </div>
        )}
      </section>

      {/* Mastery Toolset - Secondary Interactive Tools */}
      <section ref={toolsetRef} className="container" style={{ margin: '8rem auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, textAlign: 'center', marginBottom: '1.5rem' }}>Growth <span className="text-gradient">Engine Suite</span></h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>Battle-tested AI modules for specific ranking objectives.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2.5rem' }}>
              {/* 1. GitHub Auto-Rank */}
              <div className="tool-card glass-panel" style={{ padding: '2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                      <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px' }}><Github size={24} /></div>
                      <div>
                          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>GitHub Auto-Rank</h3>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Automated Meta Injection via GitHub API</p>
                      </div>
                  </div>
                  <form onSubmit={handleAutoRank} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <input type="password" placeholder="GitHub Personal Access Token" value={githubToken} onChange={(e)=>setGithubToken(e.target.value)} style={{ padding: '12px', background: '#111', border: '1px solid #333', borderRadius: '8px' }} />
                      <input type="text" placeholder="username/repo" value={repoName} onChange={(e)=>setRepoName(e.target.value)} style={{ padding: '12px', background: '#111', border: '1px solid #333', borderRadius: '8px' }} />
                      <button type="submit" disabled={rankLoading} className="glow-button" style={{ background: '#fff', color: '#000' }}>
                          {rankLoading ? 'Deploying...' : 'Inject SEO Core'}
                      </button>
                  </form>
                  {rankResult && (
                      <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,255,0,0.05)', borderRadius: '8px', fontSize: '0.85rem' }}>
                          {rankResult.success ? rankResult.message : rankResult.error}
                      </div>
                  )}
              </div>

              {/* 2. Competitor Spy */}
              <div className="tool-card glass-panel" style={{ padding: '2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                      <div style={{ background: 'rgba(255,76,76,0.1)', padding: '10px', borderRadius: '10px' }}><Eye size={24} color="#ff4c4c" /></div>
                      <div>
                          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Competitor X-Ray</h3>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Reverse Engineer Winning Strategies</p>
                      </div>
                  </div>
                  <form onSubmit={handleSpy} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <input type="url" placeholder="Competitor URL" value={rivalUrl} onChange={(e)=>setRivalUrl(e.target.value)} style={{ padding: '12px', background: '#111', border: '1px solid #333', borderRadius: '8px' }} />
                      <button type="submit" disabled={spyLoading} className="glow-button" style={{ background: '#ff4c4c', border: 'none' }}>
                          {spyLoading ? 'Penetrating...' : 'Scan Rival Structure'}
                      </button>
                  </form>
                  {spyResult && (
                      <div style={{ marginTop: '1rem', padding: '1rem', background: '#1a0505', borderRadius: '8px', borderLeft: '3px solid #ff4c4c' }}>
                          <p style={{ fontSize: '0.85rem', color: '#ffaaaa' }}>{(spyResult as any).theftStrategy}</p>
                      </div>
                  )}
              </div>

              {/* 3. Sales Engine */}
              <div className="tool-card glass-panel" style={{ padding: '2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                      <div style={{ background: 'rgba(212,175,55,0.1)', padding: '10px', borderRadius: '10px' }}><Target size={24} color="var(--accent-gold)" /></div>
                      <div>
                          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>AI Lead Closer</h3>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Convert Traffic into High-Ticket Clients</p>
                      </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <input type="text" placeholder="Target Niche (e.g. Lawyers)" value={targetNiche} onChange={(e)=>setTargetNiche(e.target.value)} style={{ padding: '12px', background: '#111', border: '1px solid #333', borderRadius: '8px' }} />
                      <input type="text" placeholder="Main Pain Point" value={targetPainPoint} onChange={(e)=>setTargetPainPoint(e.target.value)} style={{ padding: '12px', background: '#111', border: '1px solid #333', borderRadius: '8px' }} />
                      <button onClick={handleSalesEngine} disabled={salesLoading} className="glow-button" style={{ background: 'var(--accent-gold)', color: '#000' }}>
                          {salesLoading ? 'Drafting...' : 'Generate Sales Pitch'}
                      </button>
                  </div>
                  {salesResult && (
                      <div style={{ marginTop: '1rem', maxHeight: '200px', overflowY: 'auto' }}>
                          <pre style={{ fontSize: '0.75rem', background: '#000', padding: '1rem', borderRadius: '8px', color: 'var(--accent-gold)' }}>{(salesResult as any).emailTemplate}</pre>
                      </div>
                  )}
              </div>

              {/* 4. UX/Design Audit */}
              <div className="tool-card glass-panel" style={{ padding: '2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                      <div style={{ background: 'rgba(0,240,255,0.1)', padding: '10px', borderRadius: '10px' }}><Layout size={24} color="var(--accent-neon)" /></div>
                      <div>
                          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Conversion Audit</h3>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Identify UX Friction Points</p>
                      </div>
                  </div>
                  <form onSubmit={handleWebAudit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <input type="url" placeholder="Your Site URL" value={auditUrl} onChange={(e)=>setAuditUrl(e.target.value)} style={{ padding: '12px', background: '#111', border: '1px solid #333', borderRadius: '8px' }} />
                      <button type="submit" disabled={auditLoading} className="glow-button">
                          {auditLoading ? 'Auditing...' : 'Run UX Scan'}
                      </button>
                  </form>
                  {auditResult && (
                      <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,240,255,0.05)', borderRadius: '8px' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-neon)' }}>Grade: {(auditResult as any).designGrade}</div>
                          <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Trust Score: {(auditResult as any).trustScore}/100</p>
                      </div>
                  )}
              </div>
          </div>
      </section>

      {/* The Protocol Section (How it Works) */}
      <section ref={protocolRef} className="container" style={{ margin: '8rem auto' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem' }}>The <span className="text-gradient">Execution Protocol</span></h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '5rem' }}>How we turn an unranked domain into an organic powerhouse.</p>
          <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                  { step: '01', title: 'Deep Extraction', desc: 'Our AI scans 500+ technical, design, and semantic signals to map your current rank equity.' },
                  { step: '02', title: 'Content Forge', desc: 'We deploy programmatic keyword silos that answer user intent better than your competitors.' },
                  { step: '03', title: 'Authority Surge', desc: 'Real-time indexing submission and automated link-building outreach for rapid visibility.' }
              ].map((p, i) => (
                  <div key={i} className="protocol-step glass-panel" style={{ padding: '3rem', maxWidth: '380px', position: 'relative', background: 'rgba(255,255,255,0.01)' }}>
                      <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', background: 'var(--accent-gold)', color: '#000', padding: '6px 18px', borderRadius: '6px', fontWeight: 900, fontSize: '1.3rem' }}>{p.step}</div>
                      <h3 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', marginTop: '1rem', fontWeight: 700 }}>{p.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>{p.desc}</p>
                  </div>
              ))}
          </div>
      </section>

      {/* Aurora Estates Case Study Section */}
      <section className="container" style={{ margin: '10rem auto' }}>
          <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.2)', background: 'linear-gradient(145deg, rgba(212,175,55,0.03), rgba(0,0,0,0.8))' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center' }}>
                  <div style={{ padding: '5rem' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '2rem' }}>
                          <Zap size={14} color="var(--accent-gold)" fill="var(--accent-gold)" />
                          <span style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '1px' }}>CASE STUDY: AURORA ESTATES</span>
                      </div>
                      <h2 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem' }}>
                          From 800 to <span className="text-gradient">245,000 Organic Visits</span>/Month.
                      </h2>
                      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '3rem' }}>
                          We redesigned Aurora Estates' digital footprint, injecting a custom PSEO silo and high-conversion 3D showrooms. In 90 days, we achieved a +140% increase in qualified leads.
                      </p>
                      <div style={{ display: 'flex', gap: '3rem' }}>
                          <div>
                              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-neon)' }}>+140%</div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Conversion Rate</div>
                          </div>
                          <div>
                              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-gold)' }}>Top 3</div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Google Rankings</div>
                          </div>
                      </div>
                  </div>
                  <div style={{ height: '100%', minHeight: '500px', background: 'url(/desktop_hero_fixed.png) center/cover' }}>
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(0,0,0,1), transparent)', display: 'flex', alignItems: 'flex-end', padding: '3rem' }}>
                          <Link href="/blog/seo-ranking-tips-2026" className="glass-panel" style={{ padding: '1.5rem 2.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <div style={{ fontWeight: 700 }}>Read full Case Study</div>
                              <TrendingUp size={20} color="var(--accent-neon)" />
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Global Presence Grid (PSEO Traffic Booster) */}
      <section className="container" style={{ margin: '8rem auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Global <span className="text-gradient-neon">Presence Grid</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '4.5rem', maxWidth: '600px', margin: '0 auto 4.5rem' }}>Dominating search results across global business hubs using Programmatic SEO.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
              {CITIES.slice(0, 12).map((city: any, i: number) => (
                  <Link key={i} href={`/agency/${city.id}`} className="glass-panel" style={{ padding: '1.75rem', border: '1px solid rgba(0,240,255,0.1)', transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)', cursor: 'pointer' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-neon)';
                        e.currentTarget.style.background = 'rgba(0,240,255,0.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0,240,255,0.1)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                          <MapPin size={18} color="var(--accent-neon)" />
                          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{city.name}</span>
                      </div>
                  </Link>
              ))}
          </div>
          <div style={{ marginTop: '3rem' }}>
            <Link href="/sitemap.xml" style={{ color: 'var(--accent-neon)', fontSize: '1rem', fontWeight: 600, borderBottom: '1px solid var(--accent-neon)', paddingBottom: '4px' }}>
                +Explore all {CITIES.length} regional hubs
            </Link>
          </div>
      </section>

      {/* Services Hub (Featured Cities for internal link strength) */}
      <section className="container" style={{ margin: '8rem auto' }}>
          <div className="glass-panel" style={{ padding: '5rem', background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,240,255,0.08))', border: '1px solid rgba(0,240,255,0.2)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'center' }}>
                  <div style={{ textAlign: 'left' }}>
                      <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.2 }}>The <span className="text-gradient">Local Domination</span> Engine</h2>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                          Quantapex uses proprietary PSEO (Programmatic SEO) to deploy high-converting landing pages for businesses in {CITIES.length} cities worldwide. From Local SEO in Dubai to enterprise audits in London, we scale your traffic automatically.
                      </p>
                      <Link href="#analyze" className="glow-button" style={{ padding: '18px 45px' }}>Start Your Build</Link>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div style={{ padding: '3rem 2rem', background: 'rgba(255,255,255,0.04)', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <Globe size={40} className="animate-pulse" style={{ margin: '0 auto 1.5rem', color: 'var(--accent-neon)' }} />
                          <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>{CITIES.length}</div>
                          <div style={{ fontSize: '0.85rem', opacity: 0.6, letterSpacing: '2px', marginTop: '0.5rem' }}>ACTIVE HUBS</div>
                      </div>
                      <div style={{ padding: '3rem 2rem', background: 'rgba(255,255,255,0.04)', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <BarChart3 size={40} style={{ margin: '0 auto 1.5rem', color: 'var(--accent-gold)' }} />
                          <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>1M+</div>
                          <div style={{ fontSize: '0.85rem', opacity: 0.6, letterSpacing: '2px', marginTop: '0.5rem' }}>SERP TARGETS</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* FAQ Targetted Section */}
      <section className="container" style={{ margin: '8rem auto 4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem' }}>Common <span className="text-gradient">SEO Intelligence</span></h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '4rem' }}>Answers for the performance-driven enterprise.</p>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              {[
                  { q: 'How does AI help in SEO ranking?', a: 'AI automates technical audits, predicts keyword clustering success, and generates semantic content structures that search engines prioritize in 2026. It removes the guesswork from organic growth.' },
                  { q: 'Is Quantapex better than a normal agency?', a: 'Traditional agencies rely on manual work. Quantapex uses automated diagnostic tools and programmatic deployment to deliver results 10x faster and with zero technical bias.' },
                  { q: 'Can we use this for Local SEO?', a: 'Absolutely. Our Global Presence Grid is built specifically for city-level domination using high-relevance local intent signals.' }
              ].map((f, i) => (
                  <details key={i} style={{ marginBottom: '1.25rem', background: 'rgba(255,255,255,0.02)', padding: '1.75rem', borderRadius: '15px', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                      <summary style={{ fontWeight: 700, fontSize: '1.1rem' }}>{f.q}</summary>
                      <p style={{ marginTop: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem' }}>{f.a}</p>
                  </details>
              ))}
          </div>
      </section>

      {/* Final CTA Footer Section */}
      <section className="container" style={{ margin: '8rem auto' }}>
          <div className="glass-panel" style={{ 
              padding: '5rem', textAlign: 'center', 
              borderColor: 'rgba(0,240,255,0.4)', 
              background: 'linear-gradient(135deg, rgba(0,240,255,0.08), rgba(0,0,0,0.9))',
              borderRadius: '30px',
              position: 'relative',
              overflow: 'hidden'
          }}>
              <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(0,240,255,0.1)', filter: 'blur(100px)', borderRadius: '100%' }}></div>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1 }}>
                Ready to <span className="text-gradient-neon">Dominate the SERP?</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto 3rem' }}>
                Join the elite businesses using AI-Engine SEO to capture high-intent leads while competitors stay invisible.
              </p>
              <Link href="#analyze" className="glow-button" style={{ padding: '20px 60px', fontSize: '1.3rem', borderRadius: '100px' }}>
                ⚡ Get Your Free Master Report
              </Link>
          </div>
      </section>
    </div>
  );
}
