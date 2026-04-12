import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '../../lib/blogPosts';

export const metadata: Metadata = {
  title: 'SEO Blog & Digital Marketing Guides | Quantapex',
  description: 'Free expert guides on SEO, web design, local search, and digital marketing. Learn proven strategies to grow your website traffic and rank on Google.',
  keywords: 'seo blog, digital marketing guide, website ranking, local seo tips, web design tips',
  alternates: {
    canonical: 'https://quantapex.in/blog',
  },
  openGraph: {
    title: 'SEO & Digital Marketing Blog | Quantapex',
    description: 'Expert guides to grow your website traffic organically.',
    url: 'https://quantapex.in/blog',
    siteName: 'Quantapex',
    type: 'website',
  },
};

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <div style={{ paddingBottom: '6rem' }}>
      {/* JSON-LD Blog Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Quantapex SEO Blog",
            "url": "https://quantapex.in/blog",
            "description": "Expert SEO and digital marketing guides",
            "blogPost": BLOG_POSTS.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.description,
              "url": `https://quantapex.in/blog/${post.slug}`,
              "datePublished": post.date,
            }))
          })
        }}
      />

      {/* Hero */}
      <section className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '1.5rem' }}>
          <span style={{ color: 'var(--accent-neon)', fontSize: '0.85rem', fontWeight: 600 }}>📈 FREE SEO INTELLIGENCE</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
          SEO &amp; Growth <span className="text-gradient">Mastery Blog</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Expert strategies used by top agencies to rank websites, generate leads, and grow revenue — all completely free.
        </p>
      </section>

      {/* Featured Post */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <Link href={`/blog/${featured.slug}`} style={{ display: 'block' }}>
          <div className="glass-panel" style={{
            padding: '3rem',
            border: '1px solid rgba(212,175,55,0.3)',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(0,240,255,0.05))',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'var(--accent-gold)', color: '#000', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700 }}>
              FEATURED
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 600 }}>{featured.category}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{featured.readTime}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.3 }}>{featured.title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{featured.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {featured.keywords.map((kw) => (
                <span key={kw} style={{ padding: '4px 12px', background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '100px', fontSize: '0.75rem', color: 'var(--accent-neon)' }}>
                  #{kw.replace(/ /g, '')}
                </span>
              ))}
            </div>
            <span style={{ color: 'var(--accent-neon)', fontWeight: 600 }}>Read Full Guide →</span>
          </div>
        </Link>
      </section>

      {/* Blog Grid */}
      <section className="container">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>All Articles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {rest.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <div
                className="glass-panel"
                style={{
                  padding: '2rem',
                  height: '100%',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--accent-gold)', padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}>{post.category}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{post.readTime}</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.4 }}>{post.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>{post.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span style={{ color: 'var(--accent-neon)', fontSize: '0.85rem', fontWeight: 600 }}>Read More →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container" style={{ marginTop: '5rem' }}>
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', borderColor: 'rgba(0,240,255,0.3)', background: 'linear-gradient(135deg, rgba(0,240,255,0.05), rgba(0,100,200,0.05))' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            Ready to <span className="text-gradient-neon">Skyrocket Your Rankings?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Use our free AI-powered SEO analysis tool to get a custom roadmap for your website.
          </p>
          <Link href="/#analyze" className="glow-button" style={{ display: 'inline-block', padding: '16px 40px', fontSize: '1.1rem' }}>
            ⚡ Get Free SEO Analysis
          </Link>
        </div>
      </section>
    </div>
  );
}
