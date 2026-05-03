import { Metadata } from 'next';
import { CITIES } from '../../../lib/cities';
import Link from 'next/link';

export const dynamicParams = false;

// Pre-render all 200+ city pages at build time
export async function generateStaticParams() {
  return CITIES.map((city) => ({
    location: city.id,
  }));
}

type Props = {
  params: Promise<{ location: string }>;
};

// Deterministic unique content generators based on city data
const getUniqueSEOData = (cityName: string, region: string, index: number) => {
  const titles = [
    `#1 AI SEO Agency in ${cityName} | Quantapex`,
    `Elite Web Development & SEO Company ${cityName}`,
    `Top-Rated SEO Services in ${cityName} | AI Growth Automation`,
    `Best Web Design & SEO Agency ${cityName} (${region})`,
    `${cityName}'s Premier AI SEO & Digital Agency`
  ];

  const metaDescriptions = [
    `Looking for the best SEO agency in ${cityName}? Quantapex delivers AI-powered Google rankings, 3D web design, and guaranteed traffic growth. Book a free audit!`,
    `Quantapex is ${cityName}'s leading AI web development and SEO company. We build high-conversion Next.js sites and dominate local search rankings in ${region}.`,
    `Dominate the ${cityName} market with our advanced AI SEO services. We help businesses in ${region} rank #1 on Google with programmatic SEO and high-speed web design.`,
    `Need a reliable web design agency in ${cityName}? We specialize in AI-driven SEO, enterprise Next.js development, and local search dominance for ${region} businesses.`,
    `Accelerate your business in ${cityName} with Quantapex. Our AI-automated SEO protocols and premium web design ensure you outrank competitors in ${region}.`
  ];

  const h1s = [
    `Dominate Search Rankings in ${cityName}`,
    `Elevating Brand Authority in ${cityName}`,
    `The #1 AI SEO & Web Agency in ${cityName}`,
    `Accelerate Growth with ${cityName}'s Top SEO Experts`,
    `Next-Gen Web Design & Local SEO in ${cityName}`
  ];

  const paragraphs = [
    `In the highly competitive market of ${cityName}, traditional SEO is no longer enough. Quantapex utilizes proprietary AI engines and programmatic SEO to ensure your business captures the majority of local search volume in ${region}. From enterprise-grade Next.js development to surgical keyword mapping, we build digital assets that convert.`,
    `Businesses in ${cityName} are losing thousands of potential customers to competitors with better visibility. Our AI-driven SEO strategies are specifically tailored for the ${region} market, ensuring rapid indexing, superior topical authority, and a guaranteed surge in high-intent organic traffic.`,
    `Quantapex is not just another web agency in ${cityName}. We are an AI growth automation firm. We dismantle flat 2D experiences and build immersive, high-conversion digital showrooms for modern businesses in ${cityName}. Combine this with our localized search domination protocols, and you become the undisputed market leader.`,
    `Our mission in ${cityName} is simple: absolute search engine dominance. We deploy custom PSEO silos, lightning-fast web architectures, and automated authority-building systems. Whether you're targeting local customers in ${cityName} or expanding across ${region}, our AI SEO grandmaster protocol guarantees ROI.`,
    `Why do top brands in ${cityName} choose Quantapex? Because we eliminate the guesswork. Our technical SEO audits, semantic content generation, and sub-second page load speeds ensure that your digital presence in ${cityName} is unmatched. We engineer your site to be Google's favorite answer.`
  ];

  const benefitsList = [
    [
      `Dominate "Near Me" Searches in ${cityName}`,
      `AI-Optimized Content for ${region} Audience`,
      `Sub-0.5s Page Load Speeds Guaranteed`,
      `Automated High-DA Link Building`
    ],
    [
      `Rank #1 for Competitive ${cityName} Keywords`,
      `Enterprise-Grade Next.js Architecture`,
      `Advanced Schema Markup for Local SEO`,
      `Real-time Analytics & Rank Tracking`
    ],
    [
      `Hyper-Local PSEO Campaigns for ${cityName}`,
      `Immersive 3D Web Design Features`,
      `Conversion Rate Optimization (CRO)`,
      `Monthly AI Diagnostic Reports`
    ],
    [
      `Outrank Established ${cityName} Competitors`,
      `Mobile-First Performance Optimization`,
      `Topical Authority Silo Construction`,
      `Secure, Scalable & Hack-Proof Hosting`
    ]
  ];

  const title = titles[index % titles.length];
  const desc = metaDescriptions[index % metaDescriptions.length];
  const h1 = h1s[index % h1s.length];
  const p1 = paragraphs[index % paragraphs.length];
  const p2 = paragraphs[(index + 1) % paragraphs.length];
  const benefits = benefitsList[index % benefitsList.length];

  return { title, desc, h1, p1, p2, benefits };
};

// SEO Dynamic Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params;
  const index = CITIES.findIndex((c) => c.id === location);
  const cityIndex = index !== -1 ? index : 0;
  const city = CITIES[cityIndex];
  
  const seoData = getUniqueSEOData(city.name, city.region, cityIndex);

  return {
    title: seoData.title,
    description: seoData.desc,
    alternates: {
      canonical: `https://quantapex.in/agency/${location}`,
    },
    openGraph: {
      title: seoData.title,
      description: seoData.desc,
      url: `https://quantapex.in/agency/${location}`,
      type: 'website',
    }
  };
}

export default async function AgencyPage({ params }: Props) {
  const { location } = await params;
  const index = CITIES.findIndex((c) => c.id === location);
  const cityIndex = index !== -1 ? index : 0;
  const city = CITIES[cityIndex];
  
  const isGlobal = city.region !== 'India';
  const seoData = getUniqueSEOData(city.name, city.region, cityIndex);

  // Generate unique JSON-LD schema per city
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `Quantapex SEO Agency ${city.name}`,
    "url": `https://quantapex.in/agency/${location}`,
    "priceRange": isGlobal ? "$99 - $5000" : "₹6,999 - ₹99,999",
    "currenciesAccepted": city.currency,
    "areaServed": {
      "@type": "City",
      "name": city.name
    },
    "description": seoData.desc
  };

  return (
    <div className="city-page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      
      {/* Hero Section */}
      <section className="container" style={{ paddingTop: '8rem', paddingBottom: '6rem', position: 'relative' }}>
        <div className="hero-glow" style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0, 183, 255, 0.15) 0%, transparent 70%)', filter: 'blur(70px)', zIndex: -1 }} />
        
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
            {seoData.h1}
          </h1>
          <p className="description" style={{ fontSize: '1.25rem', marginBottom: '3rem', opacity: 0.8, lineHeight: 1.6 }}>
            {seoData.p1}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link href="/#analyze" className="btn btn-primary" style={{ padding: '16px 32px', borderRadius: '8px', background: 'var(--accent-neon)', color: '#000', fontWeight: 700 }}>Start Local Audit</Link>
            <Link href="/#sales" className="btn btn-secondary" style={{ padding: '16px 32px', borderRadius: '8px', border: '1px solid var(--accent-neon)', color: 'var(--accent-neon)', fontWeight: 700 }}>Get a Quote</Link>
          </div>
        </div>
      </section>

      {/* Localized Authority Section */}
      <section style={{ padding: '6rem 0', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Why {city.name} Businesses Choose Quantapex?</h2>
            <p style={{ opacity: 0.7, marginBottom: '2rem', lineHeight: 1.6 }}>
              {seoData.p2}
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {seoData.benefits.map((benefit, i) => (
                <li key={i} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
                  <span style={{ color: 'var(--accent-neon)' }}>✓</span> {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="card" style={{ padding: '3rem', background: 'linear-gradient(135deg, rgba(0, 183, 255, 0.1), rgba(0, 50, 100, 0.2))', textAlign: 'center', borderRadius: '16px', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Starting From</h3>
            <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem' }} className="text-gradient">
              {isGlobal ? '$99' : '₹6,999'}
            </div>
            <p style={{ opacity: 0.6, marginBottom: '2rem' }}>No hidden costs. Full transparent ownership in {city.name}.</p>
            <Link href="/#sales" style={{ display: 'block', width: '100%', padding: '16px', borderRadius: '8px', background: 'var(--accent-gold)', color: '#000', fontWeight: 700, textDecoration: 'none' }}>
              Book {city.name} Strategy Call
            </Link>
          </div>
        </div>
      </section>

      {/* Global Locations Footer Grid */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.5, textAlign: 'center', letterSpacing: '2px', textTransform: 'uppercase' }}>Our Global SEO Network</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', height: '200px', overflowY: 'auto', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }} className="scrollbar-hidden">
            {CITIES.map((c) => (
              <Link 
                key={c.id} 
                href={`/agency/${c.id}`}
                style={{ fontSize: '0.85rem', opacity: c.id === location ? 1 : 0.5, color: c.id === location ? 'var(--accent-neon)' : 'inherit', transition: 'all 0.2s' }}
                className="hover:opacity-100 hover:text-[var(--accent-neon)]"
              >
                {c.name} SEO Agency
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
