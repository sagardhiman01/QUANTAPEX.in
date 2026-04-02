"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Search, Activity, Zap, ShieldCheck, CheckCircle, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
  }, []);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    // Simulate terminal-like sound effect (from Sixth API/UI context logic)
    // In a real browser this would play audio, here we just respect the preference logic
    console.log("Sixth AI / Sanjeev Node terminal error sound logic initializing...");

    try {
      const resp = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, businessDesc })
      });
      const data = await resp.json();
      setResults(data);

      setTimeout(() => {
        // Animate results appearing
        gsap.fromTo(
          ".results-container",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
      }, 100);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze. Check terminal error sounds.");
    } finally {
      setLoading(false);
    }
  };

  const handleAutoRank = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubToken || !repoName || !url) {
      alert("Please ensure URL, Token, and Repo Name are filled.");
      return;
    }

    setRankLoading(true);
    setRankResult(null);
    console.log("Initializing GitHub deployment sequence...");

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

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Dynamic 3D Hero Section */}
      <section 
        className="container"
        style={{ 
          minHeight: '80vh', display: 'flex', flexDirection: 'column', 
          justifyContent: 'center', alignItems: 'center', textAlign: 'center',
          perspective: '1000px'
        }}
      >
        <div ref={heroRef}>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>
            Dominate Search with <br/>
            <span className="text-gradient">AI SEO Grandmaster</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            We understand your full website and business. Input your details below to generate zero-mistake ranking strategies instantly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="#analyze" className="glow-button">Start Free Analysis</a>
            <a href="#features" style={{ padding: '12px 24px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'transparent' }} className="hover:bg-gray-800 transition-colors">How it works</a>
          </div>
        </div>
      </section>

      {/* Analysis Input Section */}
      <section id="analyze" className="container" style={{ margin: '4rem auto' }}>
        <div 
          ref={formRef} 
          className="glass-panel" 
          style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', transformStyle: 'preserve-3d' }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }} className="text-gradient-neon">
            Run Deep AI Analysis
          </h2>
          <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="url" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Target Website URL</label>
              <div style={{ position: 'relative' }}>
                <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-neon)' }} />
                <input 
                  type="url" 
                  id="url" 
                  required
                  placeholder="https://yourwebsite.com" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  style={{ 
                    width: '100%', padding: '16px 16px 16px 48px', 
                    background: 'var(--bg-primary)', border: '1px solid var(--border-color)', 
                    borderRadius: '8px', color: 'var(--text-primary)', fontSize: '1rem',
                    outline: 'none', transition: 'border-color 0.3s'
                  }} 
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-neon)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="business" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Full Business Context (Optional)</label>
              <textarea 
                id="business" 
                rows={4}
                placeholder="Describe your business, target audience, and main competitors to help AI understand your niche completely..." 
                value={businessDesc}
                onChange={(e) => setBusinessDesc(e.target.value)}
                style={{ 
                  width: '100%', padding: '16px', 
                  background: 'var(--bg-primary)', border: '1px solid var(--border-color)', 
                  borderRadius: '8px', color: 'var(--text-primary)', fontSize: '1rem',
                  outline: 'none', resize: 'vertical', transition: 'border-color 0.3s'
                }} 
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
            </div>

            <button type="submit" className="glow-button" style={{ 
              marginTop: '1rem', height: '60px', fontSize: '1.2rem', 
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' 
            }} disabled={loading}>
              {loading ? (
                <span><Activity className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> Processing...</span>
              ) : (
                <span><Zap size={20} /> Generate SEO Masterplan</span>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Results Section */}
      {results && (
        <section className="container results-container" style={{ margin: '4rem auto' }}>
           <div className="glass-panel" style={{ padding: '3rem', border: '1px solid var(--accent-gold)' }}>
             <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} className="text-gradient">Analysis Complete</h2>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ color: 'var(--accent-neon)', fontSize: '1.5rem', marginBottom: '1rem' }}>Tech SEO Score</h3>
                    <div style={{ fontSize: '4rem', fontWeight: 800 }}>{results.score}<span style={{fontSize: '2rem', color: 'var(--text-secondary)'}}>/100</span></div>
                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{results.summary}</p>
                  </div>
                  {results.performance && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: `8px solid ${results.performance.score > 80 ? 'var(--accent-gold)' : '#ff4c4c'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                        {results.performance.score}
                      </div>
                      <p style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Speed: {results.performance.loadTimeMs}ms</p>
                    </div>
                  )}
                </div>
                
                <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.5rem', marginBottom: '1rem' }}>Top Growth Opportunities</h3>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {results.opportunities?.map((item: string, i: number) => (
                      <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <ShieldCheck size={24} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
             
             {/* Dynamic Predictive Market Analytics Section */}
             {results.marketPosition && (
               <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                 <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--accent-neon)', position: 'relative', overflow: 'hidden' }}>
                   <div style={{ position: 'absolute', top: 0, right: 0, padding: '10px 20px', background: 'var(--accent-neon)', color: '#000', fontWeight: 'bold', borderBottomLeftRadius: '12px' }}>LIVE PROJECTION</div>
                   <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Global Market Position</h3>
                   <div style={{ marginBottom: '1.5rem' }}>
                     <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Current Detected Rank:</span>
                     <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-gold)' }}>{results.marketPosition}</div>
                   </div>
                   <div>
                     <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Estimated SEO Growth:</span>
                     <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-neon)', textShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }}>{results.growthProjection}</div>
                   </div>
                 </div>

                 <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                   <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Post-Deployment Action Plan</h3>
                   <p style={{ color: 'var(--accent-gold)', marginBottom: '1rem', fontSize: '0.9rem' }}>{results.marketPerformance}</p>
                   <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                     {results.actionPlanNextSteps?.map((step: string, i: number) => (
                       <li key={i} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', borderLeft: '3px solid var(--accent-neon)' }}>
                         <div style={{ background: 'var(--accent-neon)', color: '#000', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>{i + 1}</div>
                         <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{step}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
               </div>
             )}

             <div style={{ marginTop: '2rem', background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Business & Content Gap Analysis</h3>
               <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>{results.businessAIAnalysis}</p>
             </div>

             {/* Backlink Arsenal Section */}
             {results.outreachEmail && (
               <div style={{ marginTop: '2rem', background: '#0a0a0c', padding: '2rem', borderRadius: '12px', border: '1px solid var(--accent-gold)', position: 'relative' }}>
                 <div style={{ position: 'absolute', top: 0, right: 0, padding: '5px 15px', background: 'var(--accent-gold)', color: '#000', fontWeight: 'bold', borderBottomLeftRadius: '12px' }}>AI OUTREACH ARSENAL</div>
                 <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Automated Backlink Hustle</h3>
                 <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Send this highly-converting template to bloggers in your niche to secure core backlinks.</p>
                 <pre style={{ background: '#000', padding: '1.5rem', borderRadius: '8px', color: '#00f0ff', whiteSpace: 'pre-wrap', fontFamily: 'monospace', border: '1px dashed #333' }}>
                   {results.outreachEmail}
                 </pre>
               </div>
             )}
           </div>
        </section>
      )}

      {/* GitHub Auto Ranker Section */}
      {results && (
        <section id="autorank" className="container" style={{ margin: '4rem auto' }}>
          <div className="glass-panel" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', transformStyle: 'preserve-3d', border: '1px solid var(--accent-neon)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} className="text-gradient">
              ⚡ GitHub Auto-Ranker
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Automatically inject the generated perfect SEO metrics and JSON-LD structure directly into your repository.
            </p>
            
            <form onSubmit={handleAutoRank} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="token" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>GitHub Personal Access Token</label>
                <input 
                  type="password" 
                  id="token" 
                  required
                  placeholder="github_pat_xxxxxxxx..." 
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  style={{ 
                    width: '100%', padding: '16px', 
                    background: 'var(--bg-primary)', border: '1px solid var(--border-color)', 
                    borderRadius: '8px', color: 'var(--text-primary)', fontSize: '1rem',
                    outline: 'none', transition: 'border-color 0.3s'
                  }} 
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-neon)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="repo" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Repository Path</label>
                <input 
                  type="text" 
                  id="repo" 
                  required
                  placeholder="username/repository-name" 
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  style={{ 
                    width: '100%', padding: '16px', 
                    background: 'var(--bg-primary)', border: '1px solid var(--border-color)', 
                    borderRadius: '8px', color: 'var(--text-primary)', fontSize: '1rem',
                    outline: 'none', transition: 'border-color 0.3s'
                  }} 
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-neon)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              {rankResult && (
                <div style={{ 
                  padding: '1.5rem', borderRadius: '8px', 
                  background: rankResult.error ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 240, 255, 0.1)',
                  border: `1px solid ${rankResult.error ? 'red' : 'var(--accent-neon)'}`,
                  display: 'flex', flexDirection: 'column', gap: '10px'
                }}>
                  {rankResult.error ? (
                    <span style={{ color: '#ff4c4c' }}>Error: {rankResult.error} {rankResult.details}</span>
                  ) : (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-neon)' }}>
                        <CheckCircle /> <span>{rankResult.message}</span>
                      </div>
                      {rankResult.commitUrl && (
                        <a href={rankResult.commitUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-gold)', textDecoration: 'underline' }}>
                          View Live Commit Hash: {rankResult.commitHash?.substring(0, 7)}
                        </a>
                      )}
                    </>
                  )}
                </div>
              )}

              <button type="submit" className="glow-button" style={{ 
                marginTop: '1rem', height: '60px', fontSize: '1.2rem', 
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' 
              }} disabled={rankLoading}>
                {rankLoading ? (
                  <span><Activity className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> Pushing to GitHub...</span>
                ) : (
                  <span><Zap size={20} /> Execute Auto-Ranking</span>
                )}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Competitor Spy Section */}
      {results && (
        <section id="spy" className="container" style={{ margin: '4rem auto' }}>
          <div className="glass-panel" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', transformStyle: 'preserve-3d', border: '1px solid #ff4c4c' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#ff4c4c' }}>
              🕵️ Competitor X-Ray Vision
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Enter a rival's domain to extract their highest-density keyword clusters and steal their traffic structure.
            </p>
            
            <form onSubmit={handleSpy} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="rivalUrl" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Target Rival Domain</label>
                <div style={{ position: 'relative' }}>
                  <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#ff4c4c' }} />
                  <input 
                    type="url" 
                    id="rivalUrl" 
                    required
                    placeholder="https://their-website.com" 
                    value={rivalUrl}
                    onChange={(e) => setRivalUrl(e.target.value)}
                    style={{ 
                      width: '100%', padding: '16px 16px 16px 48px', 
                      background: 'var(--bg-primary)', border: '1px solid var(--border-color)', 
                      borderRadius: '8px', color: 'var(--text-primary)', fontSize: '1rem',
                      outline: 'none', transition: 'border-color 0.3s'
                    }} 
                    onFocus={(e) => e.target.style.borderColor = '#ff4c4c'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>
              </div>

              <button type="submit" className="glow-button" style={{ 
                marginTop: '1rem', height: '60px', fontSize: '1.2rem', 
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
                background: 'rgba(255, 76, 76, 0.1)', border: '1px solid #ff4c4c', color: '#ff4c4c', boxShadow: '0 0 15px rgba(255, 76, 76, 0.2)'
              }} disabled={spyLoading}>
                {spyLoading ? (
                  <span><Activity className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> Penetrating defense...</span>
                ) : (
                  <span><Target size={20} /> Generate Theft Strategy</span>
                )}
              </button>
            </form>

            {spyResult && (
              <div style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', border: '1px solid #ff4c4c' }}>
                <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Extracted Intel ({spyResult.title})</h3>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Top Hunted Keywords:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {spyResult.topKeywords?.map((kw: string, i: number) => (
                      <span key={i} style={{ padding: '5px 10px', background: '#331111', color: '#ff4c4c', borderRadius: '4px', fontSize: '0.8rem', border: '1px solid #661111' }}>{kw}</span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '15px', background: '#1a0505', borderRadius: '8px', borderLeft: '3px solid #ff4c4c' }}>
                  <div style={{ fontWeight: 'bold', color: '#ff4c4c', marginBottom: '10px' }}>TRAFFIC THEFT PROTOCOL</div>
                  <p style={{ color: '#ffaaaa', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {spyResult.theftStrategy}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Basic spinning animation for loading icon */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
