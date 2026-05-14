import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { lang } = useLanguage();
    const t = translations[lang].projects;

    const projects = [
        {
            title: 'E-Commerce Platform',
            description: {
                en: 'A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard.',
                id: 'Platform e-commerce lengkap dengan keranjang belanja, integrasi pembayaran, dan dasbor admin.',
            },
            image: project1,
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            github: 'https://github.com',
            live: 'https://example.com',
        },
        {
            title: 'Social Media App',
            description: {
                en: 'A modern social media application with real-time messaging, posts, and user interactions.',
                id: 'Aplikasi media sosial modern dengan pesan real-time, postingan, dan interaksi pengguna.',
            },
            image: project2,
            tech: ['Next.js', 'Socket.io', 'PostgreSQL', 'Tailwind'],
            github: 'https://github.com',
            live: 'https://example.com',
        },
        {
            title: 'AI Dashboard',
            description: {
                en: 'An intelligent analytics dashboard with machine learning predictions and data visualization.',
                id: 'Dasbor analitik cerdas dengan prediksi machine learning dan visualisasi data.',
            },
            image: project3,
            tech: ['Python', 'React', 'TensorFlow', 'D3.js'],
            github: 'https://github.com',
            live: 'https://example.com',
        },
        {
            title: 'Fitness Tracker',
            description: {
                en: 'A mobile-first fitness tracking app with workout plans, progress tracking, and community features.',
                id: 'Aplikasi pelacak kebugaran mobile-first dengan rencana latihan, pelacak progres, dan fitur komunitas.',
            },
            image: project2,
            tech: ['React Native', 'Firebase', 'Redux', 'Charts'],
            github: 'https://github.com',
            live: 'https://example.com',
        },
        {
            title: 'Task Management',
            description: {
                en: 'A collaborative task management tool with Kanban boards, team features, and automation.',
                id: 'Alat manajemen tugas kolaboratif dengan papan Kanban, fitur tim, dan otomatisasi.',
            },
            image: project3,
            tech: ['Vue.js', 'Express', 'MySQL', 'Socket.io'],
            github: 'https://github.com',
            live: 'https://example.com',
        },
        {
            title: 'Crypto Exchange',
            description: {
                en: 'A cryptocurrency exchange platform with real-time trading, wallet integration, and market analysis.',
                id: 'Platform pertukaran mata uang kripto dengan trading real-time, integrasi dompet, dan analisis pasar.',
            },
            image: project1,
            tech: ['React', 'Web3.js', 'Node.js', 'Redis'],
            github: 'https://github.com',
            live: 'https://example.com',
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
        <section id="projects" className="projects" ref={ref}>
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
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="project-card"
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                rotateX: 5,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="project-image-wrapper">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="project-image"
                                />
                                <motion.div
                                    className="project-overlay"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    <div className="project-links">
                                        <motion.a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FiGithub />
                                        </motion.a>
                                        <motion.a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FiExternalLink />
                                        </motion.a>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="project-info">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description[lang]}</p>
                                <div className="project-tech">
                                    {project.tech.map((tech, techIndex) => (
                                        <span key={techIndex} className="tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
