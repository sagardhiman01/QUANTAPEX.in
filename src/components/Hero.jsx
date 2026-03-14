import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Background flares */}
      <div className="flare flare-left"></div>
      <div className="flare flare-right"></div>

      {/* Watermark */}
      <div className="bg-watermark">QUANTAPEX</div>

      <div className="container hero-content">
        <motion.h1
          className="heading-hero"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          Building <em>Digital</em><br />
          <em>Solutions</em> That Matter
        </motion.h1>
      </div>

      <div className="container hero-bottom-bar">
        <motion.div
          className="hero-left-desc"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p>
            We empower organizations with AI that turns complex challenges into real-world outcomes.
          </p>
          <Link to="/contact" className="btn-primary">
            Start Your Project
          </Link>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <div className="stat-item">
            <span className="stat-num">50+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">100%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">24/7</span>
            <span className="stat-label">Support Available</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
