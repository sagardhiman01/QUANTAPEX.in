import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', website: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      // connecting to our local custom backend API
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          website: formData.website,
          message: formData.message
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: 'Message sent successfully! Our team will contact you soon.', error: null });
        setFormData({ name: '', email: '', company: '', website: '', message: '' });
      } else {
        setStatus({ loading: false, success: null, error: data.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setStatus({ loading: false, success: null, error: 'Could not connect to the server. Make sure the backend is running.' });
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '1.25rem 1rem',
    borderRadius: '10px',
    border: '1px solid var(--glass-border)',
    background: 'var(--glass-bg)',
    color: 'var(--text-main)',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-main)',
    outline: 'none',
    transition: 'all 0.3s ease',
    backdropFilter: 'var(--glass-blur)'
  };

  return (
    <section id="contact" style={{ padding: '8rem 0', background: 'var(--bg-black)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{ color: 'var(--purple-secondary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
            Get In Touch
          </span>
          <h2 className="heading-section" style={{ marginTop: '1rem' }}>
            Start Your Project
          </h2>
          <p className="text-body" style={{ marginTop: '1rem' }}>
            Ready to build the future? Reach out to us.
          </p>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Support.quantapex@gmail.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', textDecoration: 'none', background: 'rgba(255,255,255,0.05)', padding: '0.8rem 1.5rem', borderRadius: '30px', border: '1px solid var(--glass-border)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--purple-secondary)'; e.currentTarget.style.color = 'var(--purple-secondary)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text-main)'; }}>
              <FaEnvelope style={{ color: 'var(--purple-secondary)' }} /> Support.quantapex@gmail.com
            </a>
            <a href="https://www.linkedin.com/company/quant-apex/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', textDecoration: 'none', background: 'rgba(255,255,255,0.05)', padding: '0.8rem 1.5rem', borderRadius: '30px', border: '1px solid var(--glass-border)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0077b5'; e.currentTarget.style.color = '#0077b5'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text-main)'; }}>
              <FaLinkedin style={{ color: '#0077b5' }} /> LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {status.success && <div style={{ color: '#A2A3E9', textAlign: 'center', background: 'rgba(162, 163, 233, 0.1)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(162,163,233,0.3)' }}>{status.success}</div>}
          {status.error && <div style={{ color: '#ff6b6b', textAlign: 'center', background: 'rgba(255, 107, 107, 0.1)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255,107,107,0.3)' }}>{status.error}</div>}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Full Name *" style={inputStyle} />
            <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email Address *" style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <input name="company" value={formData.company} onChange={handleChange} type="text" placeholder="Company" style={inputStyle} />
            <input name="website" value={formData.website} onChange={handleChange} type="url" placeholder="Website URL" style={inputStyle} />
          </div>

          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." rows="4" style={{ ...inputStyle, resize: 'vertical' }}></textarea>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button disabled={status.loading} className="btn-primary" type="submit" style={{ padding: '1rem 3rem', fontSize: '1.05rem' }}>
              {status.loading ? 'Sending...' : 'Submit Inquiry'}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
