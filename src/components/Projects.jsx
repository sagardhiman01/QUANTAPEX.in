import { motion } from 'framer-motion';
import { useState } from 'react';

const caseStudies = [
  {
    id: '01', title: 'Aurora Estates (Real Estate)',
    link: '#', 
    tags: [
      { icon: '✦', label: 'Property Match' },
      { icon: '◻', label: '3D Virtual Tours' },
      { icon: '⌁', label: 'Real Estate' }
    ]
  },
  {
    id: '02', title: 'Nova Health (Medical)',
    link: '#',
    tags: [
      { icon: '✦', label: 'Healthcare' },
      { icon: '◻', label: 'Telemedicine' },
      { icon: '◇', label: 'Patient Portal' }
    ]
  },
  {
    id: '03', title: 'Exo-Apex (3D Experience)',
    link: 'https://exo-apex.com/',
    tags: [
      { icon: '◻', label: 'Creative Tech' },
      { icon: '◇', label: 'Immersive Web' },
      { icon: '⌁', label: '3D Interactions' }
    ]
  },
  {
    id: '04', title: 'FreshMart (E-Commerce)',
    link: '#',
    tags: [
      { icon: '✦', label: 'Retail' },
      { icon: '◇', label: 'Online Store' },
      { icon: '⌁', label: 'Clean UI' }
    ]
  },
  {
    id: '05', title: 'EduTech Pro (Learning)',
    link: '#',
    tags: [
      { icon: '✦', label: 'Education LMS' },
      { icon: '◇', label: 'Platform' }
    ]
  },
  {
    id: '06', title: 'Creative Studio (Portfolio)',
    link: '#',
    tags: [
      { icon: '◻', label: 'Branding' },
      { icon: '⌁', label: 'Design' }
    ]
  }
];

export default function Projects() {
  const [hoveredIdx, setHoveredIdx] = useState(0);

  return (
    <section id="work" className="case-studies-section">
      <div className="container">
        {/* Header */}
        <div className="case-studies-header">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            Case Studies
          </motion.h2>
          <motion.div
            className="case-studies-header-right"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Proven results, measurable impact—explore the transformations we've delivered.
          </motion.div>
        </div>

        {/* Split Layout */}
        <div className="case-studies-layout">
          {/* Left: Project List */}
          <div className="case-study-list">
            {caseStudies.map((study, i) => (
              <motion.a
                href={study.link || "#"}
                target={study.link && study.link !== "#" ? "_blank" : "_self"}
                rel={study.link && study.link !== "#" ? "noopener noreferrer" : ""}
                key={study.id}
                className="case-study-row"
                onMouseEnter={() => setHoveredIdx(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={(e) => {
                  if (!study.link || study.link === "#") {
                    e.preventDefault();
                  }
                }}
              >
                <span className="cs-num">{study.id}</span>
                <span className="cs-title">{study.title}</span>
                <div className="cs-tags">
                  {study.tags.map((tag, j) => (
                    <span key={j} className="cs-tag">
                      <span className="cs-tag-icon">{tag.icon}</span>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>

          {/* Right: Mockup Preview */}
          <motion.div
            className="case-study-mockup"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="case-study-mockup-img">
              {/* Faux monitor display content */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
                background: 'linear-gradient(160deg, #0a1628 0%, #1a1a3e 40%, #0f2847 100%)'
              }}>
                {/* Fake UI elements */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }}></div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                  {/* Sidebar */}
                  <div style={{
                    width: '30%',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    <div style={{ height: '24px', background: 'rgba(108, 99, 255, 0.3)', borderRadius: '6px', width: '80%' }}></div>
                    <div style={{ height: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', width: '90%' }}></div>
                    <div style={{ height: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', width: '75%' }}></div>
                    <div style={{ height: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', width: '85%' }}></div>
                    <div style={{ height: '16px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', width: '60%' }}></div>
                  </div>
                  {/* Main content */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ height: '28px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', width: '60%' }}></div>
                    <div style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '8px',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: '0.5rem',
                      padding: '0.75rem'
                    }}>
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} style={{
                          background: `rgba(108, 99, 255, ${0.05 + i * 0.02})`,
                          borderRadius: '6px',
                          minHeight: '40px'
                        }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow effect at bottom of mockup */}
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-20px',
                right: '-20px',
                height: '60px',
                background: 'linear-gradient(to top, rgba(0, 191, 255, 0.1), transparent)',
                filter: 'blur(10px)',
                pointerEvents: 'none'
              }}></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
