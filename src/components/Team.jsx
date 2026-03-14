import { motion } from 'framer-motion';

const teamMembers = [
    {
        name: "Mayank",
        role: "Lead Developer",
        expertise: "React, Node.js, Three.js, WebGL",
        avatar: "https://ui-avatars.com/api/?name=Mayank&background=3E3F7E&color=fff&size=200",
    },
    {
        name: "Nakul",
        role: "Full-Stack Engineer",
        expertise: "Next.js, Python, AWS, PostgreSQL",
        avatar: "https://ui-avatars.com/api/?name=Nakul&background=A2A3E9&color=fff&size=200",
    },
    {
        name: "Suraj",
        role: "AI & ML Specialist",
        expertise: "Agentic AI, LLMs, Python, TensorFlow",
        avatar: "https://ui-avatars.com/api/?name=Suraj&background=696AAC&color=fff&size=200",
    },
    {
        name: "Tanaya",
        role: "Frontend Engineer",
        expertise: "UI/UX, CSS, Framer Motion, React",
        avatar: "https://ui-avatars.com/api/?name=Tanaya&background=2C2D5C&color=fff&size=200",
    }
];

export default function Team() {
    return (
        <section className="team-section" style={{ padding: '6rem 0' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <span style={{ color: 'var(--purple-secondary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                        The Core Team
                    </span>
                    <h2 className="heading-section" style={{ marginTop: '1rem' }}>
                        Meet The Developers
                    </h2>
                    <p className="text-body" style={{ maxWidth: '600px', margin: '1.5rem auto 0' }}>
                        Behind every innovative digital solution is a team of expert engineers pushing the boundaries of what is possible.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {teamMembers.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            style={{
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                                backdropFilter: 'var(--glass-blur)',
                                borderRadius: '20px',
                                padding: '2rem',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'var(--glass-border)';
                                e.currentTarget.style.background = 'var(--glass-bg)';
                            }}
                        >
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                margin: '0 auto 1.5rem',
                                overflow: 'hidden',
                                border: '2px solid var(--glass-border)',
                                boxShadow: '0 0 15px rgba(162, 163, 233, 0.1)'
                            }}>
                                <img src={member.avatar} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{member.name}</h3>
                            <div style={{ color: 'var(--purple-secondary)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '1rem', textTransform: 'uppercase' }}>
                                {member.role}
                            </div>
                            <p style={{ color: 'var(--grey-light)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                <span style={{ opacity: 0.6 }}>Expertise:</span><br />
                                {member.expertise}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
