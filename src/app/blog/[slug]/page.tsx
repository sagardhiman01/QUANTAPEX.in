import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '../../../lib/blogPosts';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Quantapex Blog`,
    description: post.description,
    keywords: post.keywords.join(', '),
    alternates: {
      canonical: `https://quantapex.in/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://quantapex.in/blog/${slug}`,
      siteName: 'Quantapex',
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category === post.category
  ).slice(0, 2);

  const otherPosts = BLOG_POSTS.filter(
    (p) => p.slug !== slug
  ).slice(0, 3);

  const displayRelated = relatedPosts.length > 0 ? relatedPosts : otherPosts.slice(0, 2);

  // Estimate word count and reading time
  const wordCount = post.content.split(' ').length;

  return (
    <article style={{ paddingBottom: '6rem' }}>
      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.description,
            "url": `https://quantapex.in/blog/${slug}`,
            "datePublished": post.date,
            "dateModified": post.date,
            "author": {
              "@type": "Organization",
              "name": "Quantapex",
              "url": "https://quantapex.in"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Quantapex",
              "url": "https://quantapex.in"
            },
            "keywords": post.keywords.join(', '),
            "wordCount": wordCount,
            "articleSection": post.category
          })
        }}
      />

      {/* FAQ Schema for blog posts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `What are the best ${post.category} strategies?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": post.description
                }
              }
            ]
          })
        }}
      />

      {/* Breadcrumb */}
      <div className="container" style={{ paddingTop: '2rem' }}>
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <Link href="/" style={{ opacity: 0.7 }}>Home</Link>
          <span>›</span>
          <Link href="/blog" style={{ opacity: 0.7 }}>Blog</Link>
          <span>›</span>
          <span style={{ color: 'var(--accent-neon)' }}>{post.category}</span>
        </nav>
      </div>

      {/* Article Header */}
      <header className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '800px' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--accent-gold)', padding: '4px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700 }}>
            {post.category}
          </span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            📅 {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>⏱ {post.readTime}</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>📝 {wordCount} words</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.5rem' }}>
          {post.title}
        </h1>

        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
          {post.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {post.keywords.map((kw) => (
            <span
              key={kw}
              style={{
                padding: '4px 12px',
                background: 'rgba(0,240,255,0.08)',
                border: '1px solid rgba(0,240,255,0.2)',
                borderRadius: '100px',
                fontSize: '0.75rem',
                color: 'var(--accent-neon)'
              }}
            >
              #{kw.replace(/ /g, '_')}
            </span>
          ))}
        </div>
      </header>

      {/* Article Content */}
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="glass-panel" style={{ padding: '3rem', marginBottom: '3rem' }}>
          <div
            style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
              fontSize: '1.05rem'
            }}
            dangerouslySetInnerHTML={{
              __html: post.content
                .split('\n')
                .map(line => {
                  if (line.startsWith('## ')) {
                    return `<h2 style="font-size:1.6rem;font-weight:700;color:#f8f9fa;margin:2.5rem 0 1.2rem;padding-left:1rem;border-left:3px solid #d4af37">${line.replace('## ', '')}</h2>`;
                  }
                  if (line.startsWith('### ')) {
                    return `<h3 style="font-size:1.2rem;font-weight:600;color:#f8f9fa;margin:2rem 0 0.8rem">${line.replace('### ', '')}</h3>`;
                  }
                  if (line.startsWith('- ')) {
                    return `<li style="margin-bottom:0.5rem;padding-left:0.5rem">${line.replace('- ', '')}</li>`;
                  }
                  if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ')) {
                    return `<li style="margin-bottom:0.5rem;list-style-type:decimal;margin-left:1.5rem">${line.replace(/^\d+\. /, '')}</li>`;
                  }
                  if (line.trim() === '') return '<br/>';
                  // Handle bold text
                  const withBold = line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#f8f9fa;font-weight:600">$1</strong>');
                  return `<p style="margin-bottom:1rem">${withBold}</p>`;
                })
                .join('')
            }}
          />
        </div>

        {/* Author/Brand Box */}
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-neon))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
            Q
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: '0.3rem' }}>Quantapex Growth Team</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Expert digital marketing practitioners with 10+ years growing businesses online.
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link href="/blog" style={{ color: 'var(--accent-neon)', fontSize: '0.85rem' }}>More Articles →</Link>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div style={{ padding: '2.5rem', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(0,240,255,0.1), rgba(0,100,200,0.1))', border: '1px solid rgba(0,240,255,0.3)', textAlign: 'center', marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Apply These Strategies to Your Website
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Get a free AI-powered audit of your site and a personalized action plan in 60 seconds.
          </p>
          <Link href="/#analyze" className="glow-button" style={{ display: 'inline-block', padding: '14px 36px' }}>
            ⚡ Get Free SEO Audit
          </Link>
        </div>

        {/* Related Posts */}
        {displayRelated.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Related Articles</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {displayRelated.map((related) => (
                <Link href={`/blog/${related.slug}`} key={related.slug}>
                  <div className="glass-panel" style={{ padding: '1.5rem', cursor: 'pointer' }}>
                    <span style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 600 }}>{related.category}</span>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0.5rem 0', lineHeight: 1.4 }}>{related.title}</h3>
                    <span style={{ color: 'var(--accent-neon)', fontSize: '0.85rem' }}>Read Article →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
