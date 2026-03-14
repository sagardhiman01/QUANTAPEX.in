import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const faqs = [
    {
        q: 'What makes Quantapex different?',
        a: 'We combine high-end product design with deep AI expertise to build products that not only function flawlessly but also deliver exceptional user experiences.'
    },
    {
        q: 'How long does an MVP take to build?',
        a: 'Depending on complexity, a full-stack AI MVP typically takes 4-8 weeks. We emphasize rapid prototyping to validate ideas early.'
    },
    {
        q: 'Do you offer post-launch AI maintenance?',
        a: 'Yes, AI models and system integrations require ongoing tuning. We offer dedicated support retainers tailored to your specific application needs.'
    },
    {
        q: 'What is your technology stack?',
        a: 'We specialize in React/Next.js for the frontend, Node.js/Python for the backend, and leverage state-of-the-art LLMs and Vector Databases (Pinecone, Weaviate) for AI capabilities.'
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <section id="faq" style={{ padding: '8rem 0', background: 'var(--bg-black)' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '4rem', textAlign: 'center' }}
                >
                    <span style={{ color: 'var(--purple-secondary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                        Questions
                    </span>
                    <h2 className="heading-section" style={{ marginTop: '1rem' }}>
                        Frequently Asked Questions
                    </h2>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            style={{
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                                backdropFilter: 'var(--glass-blur)',
                                borderRadius: '15px',
                                overflow: 'hidden'
                            }}
                        >
                            <div
                                onClick={() => toggle(i)}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1.5rem 2rem',
                                    cursor: 'pointer',
                                }}
                            >
                                <h4 style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--text-main)', margin: 0 }}>
                                    {faq.q}
                                </h4>
                                <span style={{
                                    fontSize: '1.5rem',
                                    color: 'var(--purple-secondary)',
                                    transform: openIndex === i ? 'rotate(45deg)' : 'none',
                                    transition: 'transform 0.3s ease'
                                }}>
                                    +
                                </span>
                            </div>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div style={{ padding: '0 2rem 1.5rem', color: 'var(--grey-light)', lineHeight: 1.6 }}>
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
