import { motion } from 'framer-motion';

const stackLayers = [
  { label: "Frontend", color: "#FFD700", textColor: "#000" },
  { label: "Backend / APIs", color: "#5DADE2", textColor: "#fff" },
  { label: "Database", color: "#58D68D", textColor: "#fff" },
  { label: "Servers", color: "#AAB7B8", textColor: "#fff" },
  { label: "Networking", color: "#F4D03F", textColor: "#000" },
  { label: "Cloud Infrastructure", color: "#D5DBDB", textColor: "#000" },
  { label: "CI / CD Pipelines", color: "#EB984E", textColor: "#fff" },
  { label: "Security", color: "#E74C3C", textColor: "#fff" },
  { label: "Containers", color: "#1ABC9C", textColor: "#fff" },
  { label: "CDN", color: "#8E44AD", textColor: "#fff" },
  { label: "Containers", color: "#E74C3C", textColor: "#fff" },
  { label: "Monitoring & Logging", color: "#7FB3D5", textColor: "#fff" },
  { label: "Backups & Recovery", color: "#D4E157", textColor: "#000" },
];

export default function TechStack() {
  return (
    <section className="tech-stack-section" style={{ padding: '8rem 0', background: 'transparent' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ color: 'var(--purple-secondary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
              Our Expertise
            </span>
            <h2 className="heading-section" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
              What Full-Stack <span style={{ color: 'var(--purple-secondary)' }}>Actually</span> Means
            </h2>
            <p className="text-body" style={{ marginBottom: '2rem', maxWidth: '500px' }}>
              We don't just build interfaces. We architect end-to-end digital ecosystems that are secure, scalable, and optimized for peak performance.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)', flex: '1 1 200px' }}>
                <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Scalable</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--grey-light)' }}>Cloud-native architectures that grow with your business.</p>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)', flex: '1 1 200px' }}>
                <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Secure</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--grey-light)' }}>Security-first approach across every layer of the stack.</p>
              </div>
            </div>
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'center', perspective: '1000px' }}>
            <div className="stack-container" style={{ position: 'relative', width: '280px', height: 'auto' }}>
              {stackLayers.map((layer, index) => (
                <motion.div
                  key={index}
                  className="stack-layer"
                  initial={{ opacity: 0, y: 50, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 25 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: (stackLayers.length - index) * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  style={{
                    background: layer.color,
                    color: layer.textColor,
                    padding: '12px 20px',
                    borderRadius: '50px',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: '1rem',
                    boxShadow: `0 10px 0 ${adjustColor(layer.color, -30)}, 0 15px 30px rgba(0,0,0,0.3)`,
                    marginBottom: '-15px',
                    width: '100%',
                    position: 'relative',
                    zIndex: stackLayers.length - index,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {layer.label}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Helper to darken colors for the 3D side effect
function adjustColor(color, amount) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).slice(-2));
}
