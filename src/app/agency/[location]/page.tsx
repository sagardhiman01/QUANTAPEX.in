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

// SEO Dynamic Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params;
  const city = CITIES.find((c) => c.id === location);
  const cityName = city ? city.name : location.charAt(0).toUpperCase() + location.slice(1);

  return {
    title: `Elite Web Development Agency in ${cityName} | Quantapex`,
    description: `Quantapex is a premium web agency serving ${cityName}. We build high-performance 3D websites, AI solutions, and enterprise software starting from ${city?.currency === 'INR' ? '₹6,999' : '$99'}.`,
    alternates: {
      canonical: `https://quantapex.in/agency/${location}`,
    },
  };
}

export default async function AgencyPage({ params }: Props) {
  const { location } = await params;
  const city = CITIES.find((c) => c.id === location);
  const cityName = city ? city.name : location;
  const isGlobal = city ? city.region !== 'India' : false;

  return (
    <div className="city-page-wrapper">
      {/* Hero Section */}
      <section className="container" style={{ paddingTop: '8rem', paddingBottom: '6rem', position: 'relative' }}>
        <div className="hero-glow" style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0, 183, 255, 0.15) 0%, transparent 70%)', filter: 'blur(70px)', zIndex: -1 }} />
        
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
            Elevating Brand Authority in {cityName}
          </h1>
          <p className="description" style={{ fontSize: '1.25rem', marginBottom: '3rem', opacity: 0.8 }}>
            Quantapex is {cityName}&apos;s premier digital architecture firm. We dismantle flat 2D experiences and build immersive, high-conversion digital showrooms for modern businesses.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link href="/#analyze" className="btn btn-primary">Start Your Audit</Link>
            <Link href="/#sales" className="btn btn-secondary">Get a Quote</Link>
          </div>
        </div>
      </section>

      {/* Localized Authority Section */}
      <section style={{ padding: '6rem 0', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Why {cityName} Businesses Choose Quantapex?</h2>
            <p style={{ opacity: 0.7, marginBottom: '2rem', lineHeight: 1.6 }}>
              In a crowded market like {cityName}, standard websites no longer capture attention. Our Next.js-powered frameworks ensure your business loads in under 0.5s, outranking local competitors and establishing instant trust.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary-color)' }}>✓</span> 0.5s Page Load Guaranteed
              </li>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary-color)' }}>✓</span> Enterprise-Grade Security
              </li>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary-color)' }}>✓</span> Localized SEO Dominance
              </li>
            </ul>
          </div>
          <div className="card" style={{ padding: '3rem', background: 'linear-gradient(135deg, rgba(0, 183, 255, 0.1), rgba(0, 50, 100, 0.2))', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Starting From</h3>
            <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem' }} className="text-gradient">
              {isGlobal ? '$99' : '₹6,999'}
            </div>
            <p style={{ opacity: 0.6, marginBottom: '2rem' }}>No hidden costs. Full transparent ownership.</p>
            <button className="btn btn-primary" style={{ width: '100%' }}>Book Discovery Call</button>
          </div>
        </div>
      </section>

      {/* Global Locations Footer Grid */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.5, textAlign: 'center', letterSpacing: '2px', textTransform: 'uppercase' }}>Global Network</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', height: '200px', overflowY: 'auto', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '1rem' }} className="scrollbar-hidden">
            {CITIES.map((c) => (
              <Link 
                key={c.id} 
                href={`/agency/${c.id}`}
                style={{ fontSize: '0.85rem', opacity: 0.5, transition: 'opacity 0.2s' }}
                className="hover:opacity-100"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
