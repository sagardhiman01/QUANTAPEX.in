import { motion, useAnimationFrame } from 'framer-motion';
import { useRef } from 'react';

const logos = [
  'Aurora Estates', 'Nova Health', 'Exo-Apex', 'FreshMart', 'EduTech Pro', 'Rohan Sharma'
];

function RotatingLogo({ name, index, total }) {
  const ref = useRef(null);

  useAnimationFrame((time) => {
    // 25 seconds for a full marquee cycle
    const cycle = 25000;
    const progress = ((time % cycle) / cycle);
    const basePos = index / total;
    
    // Moving right to left
    let currentPos = (basePos - progress) % 1;
    if (currentPos < 0) currentPos += 1;

    // Map 0 -> 1 to -1 -> 1 centered on screen
    const x = (currentPos - 0.5) * 2;
    
    // Responsive mathematical curve calculation
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    
    // On mobile, use a flat 2D marquee without depth or tilt
    const spreadMultiplier = isMobile ? window.innerWidth * 2 : 850;
    const depthMultiplier = isMobile ? 0 : 75; // No curve on mobile

    const opacity = isMobile ? 1 : Math.max(0, 1 - Math.pow(Math.abs(x), 3.5)); // No fade at edges on mobile
    const yOffset = x * x * depthMultiplier; // Curve depth
    const rotation = isMobile ? 0 : x * 20; // No tilt on mobile
    const xTranslate = x * spreadMultiplier; // Total spread width

    if (ref.current) {
      ref.current.style.transform = `translate(calc(-50% + ${xTranslate}px), ${yOffset}px) rotate(${rotation}deg)`;
      ref.current.style.opacity = opacity;
    }
  });

  return (
    <span 
      ref={ref} 
      className="logo-item" 
      style={{ position: 'absolute', top: 0, left: '50%' }}
    >
      {name}
    </span>
  );
}

export default function TrustedBy() {
  return (
    <section className="trusted-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          Trusted by Industry Leaders
        </motion.h2>
        <motion.p
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Powering Innovation for Companies Worldwide
        </motion.p>

        <motion.div
          className="logos-arc"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {logos.map((name, i) => (
            <RotatingLogo key={name} name={name} index={i} total={logos.length} />
          ))}
          <div className="arc-glow-container">
            <div className="shooting-beam"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
