import { motion } from 'framer-motion';
import { useState } from 'react';
import DNAHelix from './canvas/DNAHelix';

const services = [
  {
    num: '01', title: 'Web / App Development',
    desc: 'Custom, scalable web and mobile applications built for performance and seamless user experiences.',
    services: ['Custom Web Development', 'Mobile App Development', 'Frontend Architecture', 'Backend Systems'],
    tools: ['React', 'Next.js', 'Node.js', 'React Native']
  },
  {
    num: '02', title: 'API Integrations',
    desc: 'Seamlessly connect your systems and third-party services with robust, secure, and performant API integrations.',
    services: ['REST & GraphQL APIs', 'Third-Party Services', 'Payment Gateways', 'System Modernization'],
    tools: ['Postman', 'GraphQL', 'Stripe', 'AWS API Gateway']
  },
  {
    num: '03', title: 'Graphic Design',
    desc: 'Compelling visual identities, marketing materials, and digital assets that capture your brand essence and engage your audience.',
    services: ['Brand Identity & Logos', 'Marketing Collateral', 'Social Media Assets', 'Illustration & Iconography'],
    tools: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Procreate']
  },
  {
    num: '04', title: 'Landing Page Design',
    desc: 'High-converting, beautifully designed landing pages optimized for performance, SEO, and maximizing your marketing ROI.',
    services: ['Conversion Optimization', 'A/B Testing & Analytics', 'Responsive Design', 'Copywriting & Strategy'],
    tools: ['Figma', 'Webflow', 'Google Analytics', 'Framer']
  },
  {
    num: '05', title: 'Maintenance & Support',
    desc: 'Reliable, ongoing website maintenance, security updates, and technical support to keep your digital presence running smoothly.',
    services: ['Security Audits & Updates', 'Performance Monitoring', 'Content Updates', '24/7 Technical Support'],
    tools: ['Datadog', 'Sentry', 'GitHub Actions', 'Vercel']
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0); // Web / App Development active by default

  const activeService = services[activeIndex];
  const otherServices = services.filter((_, i) => i !== activeIndex);

  return (
    <section id="services" className="services-section">
      <div className="container">
        {/* Header */}
        {/* Header */}
        <div className="services-header">
          <motion.h2
            className="heading-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h2>
          <motion.div
            className="services-header-right"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            We offer comprehensive digital solutions that
            transform your business and drive innovation across
            every touchpoint.
          </motion.div>
        </div>

        {/* 2-3 Column Layout */}
        <div className="services-layout">
          {/* Left: DNA Helix */}
          <div className="services-dna-col">
            <DNAHelix />
          </div>

          <div className="services-content-stack">
            {/* Center: Active Service Card */}
            <motion.div
              className="services-center-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="service-card active" key={activeIndex}>
                <div className="service-card-header">
                  <h3>{activeService.title}</h3>
                  <span className="service-arrow">↗</span>
                </div>
                <p>{activeService.desc}</p>

                <div className="service-card-details">
                  <div className="service-detail-col">
                    <h4>Services</h4>
                    <ul>
                      {activeService.services.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="service-detail-col">
                    <h4>Tools</h4>
                    <ul>
                      {activeService.tools.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Other servicecards */}
            <div className="services-right-col-wrapper">
              <div className="services-right-col">
                {otherServices.map((svc, i) => (
                  <motion.div
                    key={svc.num}
                    className="service-card-mini"
                    onClick={() => setActiveIndex(services.indexOf(svc))}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <div className="service-card-header">
                      <span className="service-num">{svc.num}</span>
                      <span className="service-arrow">↗</span>
                    </div>
                    <h3>{svc.title}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
