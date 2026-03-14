import { motion, useScroll, useTransform } from 'framer-motion';
import Projects from '../components/Projects';
import Hero3D from '../components/canvas/Hero3D';
import { useRef } from 'react';

const pageVariants = {
    initial: { opacity: 0, y: 200 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -200 }
};

const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

export default function Work() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
    });

    // On the Work page, we can start with it already slightly shifted/scaled,
    // or we can animate it exactly like the Home page. We'll animate it similarly.
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 0.6]);
    const x = useTransform(scrollYProgress, [0, 1], ['-10%', '-25%']);
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.8, 0.4]);

    return (
        <motion.div
            ref={containerRef}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            style={{ paddingTop: '80px', minHeight: '100vh', position: 'relative' }}
        >
            {/* 3D Earth Background linked to scroll */}
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
              <div style={{ pointerEvents: 'auto' }}>
                <Projects />
              </div>
            </div>
        </motion.div>
    );
}
