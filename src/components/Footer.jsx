import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const indiaTime = new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(indiaTime);
    };
    const interval = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* CTA Section */}
      <section className="footer-cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h2>We turn bold ideas into powerful digital realities.</h2>
          <Link to="/contact" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
            Let's work together
          </Link>
          <div className="footer-cta-info">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Support.quantapex@gmail.com" target="_blank" rel="noopener noreferrer">Support.quantapex@gmail.com</a>
            <a href="https://www.linkedin.com/company/quant-apex/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span>Based in India</span>
            <span>Serving clients globally</span>
          </div>
        </div>
        <div className="footer-cta-arc"></div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>Services</h3>
              <ul>
                <li><Link to="/services">Web / App Development</Link></li>
                <li><Link to="/services">API Integrations</Link></li>
                <li><Link to="/services">Graphic Design</Link></li>
                <li><Link to="/services">Landing Page Design</Link></li>
                <li><Link to="/services">Maintenance & Support</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Technologies</h3>
              <ul>
                <li><a href="#">React & Next.js</a></li>
                <li><a href="#">Node.js Backend</a></li>
                <li><a href="#">Three.js / WebGL</a></li>
                <li><a href="#">Figma Design</a></li>
                <li><a href="#">AWS & Cloud</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Case Studies</h3>
              <ul>
                <li><Link to="/work">Aurora Estates</Link></li>
                <li><Link to="/work">Nova Health</Link></li>
                <li><Link to="/work">Exo-Apex</Link></li>
                <li><Link to="/work">FreshMart</Link></li>
                <li><Link to="/work">EduTech Pro</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Company</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Our Services</Link></li>
                <li><Link to="/work">Portfolio</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/contact">Support</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <div className="footer-clock">
                <div className="footer-clock-label">India Time (IST)</div>
                <div className="footer-clock-time">
                  {time || '00:00:00 AM'}
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>Quantapex, © 2026. All rights reserved.</div>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="https://www.linkedin.com/company/quant-apex/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
