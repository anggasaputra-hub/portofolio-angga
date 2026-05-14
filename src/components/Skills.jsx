import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
    FiCode, FiLayout, FiDatabase, FiSmartphone,
    FiGitBranch, FiCloud
} from 'react-icons/fi';
import {
    SiReact, SiNodedotjs, SiPython, SiJavascript,
    SiTypescript, SiMongodb, SiTailwindcss, SiFigma
} from 'react-icons/si';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [animateSkills, setAnimateSkills] = useState(false);
    const { lang } = useLanguage();
    const t = translations[lang].skills;

    useEffect(() => {
        if (isInView) {
            setTimeout(() => setAnimateSkills(true), 300);
        }
    }, [isInView]);

    const skillCategories = [
        {
            icon: <FiCode />,
            titleKey: 0,
            skills: [
                { name: 'React/Next.js', level: 95, icon: <SiReact /> },
                { name: 'JavaScript', level: 90, icon: <SiJavascript /> },
                { name: 'TypeScript', level: 85, icon: <SiTypescript /> },
                { name: 'Tailwind CSS', level: 92, icon: <SiTailwindcss /> },
            ],
        },
        {
            icon: <FiDatabase />,
            titleKey: 1,
            skills: [
                { name: 'Node.js', level: 88, icon: <SiNodedotjs /> },
                { name: 'Python', level: 82, icon: <SiPython /> },
                { name: 'MongoDB', level: 85, icon: <SiMongodb /> },
                { name: 'REST APIs', level: 90, icon: <FiCloud /> },
            ],
        },
        {
            icon: <FiLayout />,
            titleKey: 2,
            skills: [
                { name: 'Figma', level: 88, icon: <SiFigma /> },
                { name: 'Responsive Design', level: 95, icon: <FiSmartphone /> },
                { name: 'Prototyping', level: 85, icon: <FiLayout /> },
                { name: 'User Research', level: 80, icon: <FiGitBranch /> },
            ],
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <section id="skills" className="skills" ref={ref}>
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
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={categoryIndex}
                            className="skill-card"
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                        >
                            <div className="skill-icon">{category.icon}</div>
                            <h3 className="skill-name">{t.categories[category.titleKey]}</h3>

                            <div style={{ marginTop: '20px' }}>
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex} style={{ marginBottom: '20px' }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '8px'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                fontSize: '0.95rem',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                <span style={{ color: 'var(--gradient-1)' }}>{skill.icon}</span>
                                                {skill.name}
                                            </div>
                                            <span className="skill-percentage">{skill.level}%</span>
                                        </div>
                                        <div className="skill-bar-container">
                                            <motion.div
                                                className="skill-bar"
                                                initial={{ width: 0 }}
                                                animate={{ width: animateSkills ? `${skill.level}%` : 0 }}
                                                transition={{
                                                    duration: 1.5,
                                                    delay: categoryIndex * 0.2 + skillIndex * 0.1,
                                                    ease: 'easeOut'
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
