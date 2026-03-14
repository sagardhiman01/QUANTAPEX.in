import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../components/Hero';
import Services from '../components/Services';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import TrustedBy from '../components/TrustedBy';
import Hero3D from '../components/canvas/Hero3D';
import { useRef } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 }
};

const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  // Scale down from 1 to 0.6 as we scroll, and hold it there
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [1, isMobile ? 0.8 : 0.6, isMobile ? 0.8 : 0.6]);
  // Move to the left and hold it - slightly more subtle on mobile
  const x = useTransform(scrollYProgress, [0, 0.4, 1], ['0%', isMobile ? '-10%' : '-25%', isMobile ? '-10%' : '-25%']);
  // Move down slightly for parallax
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  // Stay visible longer - doesn't fade to 0 completely
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.2]);

  return (
    <motion.div
      ref={containerRef}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      style={{ position: 'relative' }}
    >
      {/* 3D Earth Background linked to scroll - Now fixed on mobile too */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none', // Don't block clicks
          scale,
          x,
          y,
          opacity,
          transformOrigin: 'center center'
        }}
      >
        <Hero3D />
      </motion.div>

      {/* Foreground Content */}
      <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        {/* Re-enable pointer events for actual content */}
        <div style={{ pointerEvents: 'auto' }}>
          <Hero />
          <Services />
          <TechStack />
          <Projects />
          <TrustedBy />
        </div>
      </div>
    </motion.div>
  );
}
