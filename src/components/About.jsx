import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiCode, FiCoffee, FiAward } from 'react-icons/fi';
import profileImage from '../assets/profile.jpg';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { lang } = useLanguage();
    const t = translations[lang].about;

    const statsData = [
        { icon: <FiCode />, number: '50+' },
        { icon: <FiCoffee />, number: '3+' },
        { icon: <FiAward />, number: '20+' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <section id="about" className="about" ref={ref}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    {t.title} <span className="gradient-text">{t.titleHighlight}</span>
                </motion.h2>

                <motion.div
                    className="about-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <motion.div className="about-image-wrapper" variants={itemVariants}>
                        <div className="about-image-bg"></div>
                        <motion.img
                            src={profileImage}
                            alt="Profile"
                            className="about-image"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>

                    <motion.div className="about-text" variants={itemVariants}>
                        <h3>
                            {t.heading} <span className="gradient-text">{t.headingHighlight}</span>
                        </h3>
                        <p>{t.p1}</p>
                        <p>{t.p2}</p>

                        <motion.div
                            className="about-stats"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                        >
                            {statsData.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="stat-item"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, y: -10 }}
                                >
                                    <div className="stat-icon" style={{
                                        fontSize: '1.5rem',
                                        marginBottom: '10px',
                                        color: 'var(--gradient-1)'
                                    }}>
                                        {stat.icon}
                                    </div>
                                    <div className="stat-number">{stat.number}</div>
                                    <div className="stat-label">{t.stats[index]}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
