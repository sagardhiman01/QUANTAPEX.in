import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';

const teamLeaders = [
    {
        name: "Sagar Dhiman",
        tag: "Co-Founder",
        role: "Chief Technology Officer (CTO)",
        skills: "Web Development • App Development",
        desc1: "Leading the technological vision of the company. I specialize in architecting scalable web and mobile applications that solve complex business problems from the ground up.",
        desc2: "My passion lies in clean code, modern frameworks, and creating high-performance digital solutions that deliver seamless and engaging user experiences.",
        img: "/sagar.jpg",
        exp: "5+ Years",
        email: "Support.quantapex@gmail.com"
    },
    {
        name: "Shivam Dhiman",
        tag: "Co-Founder",
        role: "Marketing Strategist",
        skills: "Brand Building • Marketing Strategy",
        desc1: "We build innovative digital solutions that drive growth. With a proven track record in marketing strategy, I help organizations navigate the complex digital landscape to achieve remarkable outcomes.",
        desc2: "My focus is on creating scalable, user-centric experiences that not only look stunning but deliver measurable business results.",
        img: "/shivam.jpg",
        exp: "3+ Years",
        email: "hello.shivamdhiman@gmail.com"
    },
    {
        name: "Shikhar Singh",
        tag: "Founder",
        role: "Founder & Chief Executive Officer (CEO)",
        skills: "Chief Financial Officer (CFO) & Chief Marketing Officer (CMO)",
        desc1: "Overseeing both the financial health and marketing operations of our agency. I bridge the gap between creative marketing campaigns and sustainable financial growth.",
        desc2: "My goal is to optimize our resources while maximizing our market reach, ensuring we scale efficiently while delivering exceptional value to our clients.",
        img: "/shikhar.jpg",
        exp: "3+ Years",
        email: "Singhshikhar.support@gmail.com"
    }
];

export default function About() {
    return (
        <section id="company" className="services-section" style={{ padding: '8rem 0', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '6rem' }}
                >
                    <span style={{ color: 'var(--purple-secondary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                        Company Leadership
                    </span>
                    <h2 className="heading-section" style={{ marginTop: '1rem' }}>
                        Meet The Visionaries
                    </h2>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
                    {teamLeaders.map((leader, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div key={index} style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                                gap: '4rem', 
                                alignItems: 'center' 
                            }}>
                                {/* Image Column */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.8 }}
                                    style={{ 
                                        position: 'relative', 
                                        order: isEven ? 1 : 2 
                                    }}
                                    className="about-image-col"
                                >
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '120%',
                                        height: '120%',
                                        background: 'radial-gradient(circle, rgba(162, 163, 233, 0.2) 0%, transparent 60%)',
                                        zIndex: 0,
                                        pointerEvents: 'none'
                                    }}></div>

                                    <div style={{
                                        position: 'relative',
                                        width: '100%',
                                        paddingTop: '100%',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        border: '1px solid var(--glass-border)',
                                        background: 'var(--glass-bg)',
                                        zIndex: 1,
                                        backdropFilter: 'var(--glass-blur)'
                                    }}>
                                        <img
                                            src={leader.img}
                                            alt={leader.name}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                            onError={(e) => {
                                                e.target.src = `https://ui-avatars.com/api/?name=${leader.name.replace(' ', '+')}&background=3E3F7E&color=fff&size=500`;
                                            }}
                                        />
                                    </div>

                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-20px',
                                        [isEven ? 'right' : 'left']: '-20px',
                                        background: 'var(--glass-bg)',
                                        backdropFilter: 'blur(20px)',
                                        padding: '1.5rem',
                                        borderRadius: '15px',
                                        border: '1px solid var(--glass-border)',
                                        zIndex: 2,
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                    }}>
                                        <h3 style={{ fontSize: '1.5rem', color: 'var(--purple-secondary)', margin: '0 0 5px 0' }}>{leader.exp}</h3>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--grey-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Experience</p>
                                    </div>
                                </motion.div>

                                {/* Text Column */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    style={{ order: isEven ? 2 : 1 }}
                                >
                                    <span style={{ 
                                        color: 'var(--purple-secondary)', 
                                        fontWeight: 600, 
                                        letterSpacing: '2px', 
                                        textTransform: 'uppercase', 
                                        fontSize: '0.85rem', 
                                        display: 'inline-block', 
                                        marginBottom: '1rem',
                                        background: 'rgba(162, 163, 233, 0.1)',
                                        padding: '5px 15px',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(162, 163, 233, 0.2)'
                                    }}>
                                        {leader.tag}
                                    </span>

                                    <h2 className="heading-section" style={{ marginBottom: '0.5rem', fontSize: '2.5rem' }}>
                                        {leader.name}
                                    </h2>

                                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1rem', fontWeight: 500 }}>
                                        {leader.role}
                                    </h3>
                                    
                                    <p style={{ color: 'var(--purple-secondary)', fontSize: '0.9rem', marginBottom: '2rem', fontWeight: 600, letterSpacing: '0.5px' }}>
                                        Skills: <span style={{ color: 'var(--grey-light)', fontWeight: 400 }}>{leader.skills}</span>
                                    </p>

                                    <p className="text-body" style={{ marginBottom: '1.5rem' }}>
                                        {leader.desc1}
                                    </p>

                                    <p className="text-body" style={{ marginBottom: '3rem' }}>
                                        {leader.desc2}
                                    </p>

                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <a href="#contact" className="btn-primary" style={{ padding: '0.8rem 2rem' }}>
                                            Connect Form
                                        </a>
                                        {leader.email && (
                                            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${leader.email}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', background: 'transparent', border: '1px solid var(--purple-secondary)' }}>
                                                <FaEnvelope /> Email
                                            </a>
                                        )}
                                        {leader.linkedin && (
                                            <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', background: '#0077b5', border: 'none' }}>
                                                <FaLinkedin /> LinkedIn
                                            </a>
                                        )}
                                    </div>
                                </motion.div>

                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Quick CSS for Mobile Ordering */}
            <style dangerouslySetInnerHTML={{__html: `
                @media (max-width: 768px) {
                    .about-image-col {
                        order: 1 !important;
                    }
                    .about-image-col + div {
                        order: 2 !important;
                    }
                }
            `}} />
        </section>
    );
}
