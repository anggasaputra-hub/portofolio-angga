import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import project1 from '../assets/project-desa.jpg';
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
            title: 'Website Desa Digital DTIRIP',
            description: {
                en: 'A web-based village profile website built to provide online village information such as village profile, news, activity gallery, community services, and an admin dashboard for content management.',
                id: 'Website profil desa berbasis web yang dibuat untuk menyediakan informasi desa secara online seperti profil desa, berita, galeri kegiatan, layanan masyarakat, dan dashboard admin untuk pengelolaan konten website.',
            },
            image: project1,
            tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'JSON Database'],
            github: '#',
            live: 'https://dtirip.my.id',
        },
        {
            title: 'Website Top Up Diamond Game',
            description: {
                en: 'A game diamond top-up website built to facilitate users in purchasing diamonds and game vouchers online with a modern interface and a simple transaction process.',
                id: 'Website top up diamond game yang dibuat untuk memudahkan pengguna melakukan pembelian diamond dan voucher game secara online dengan tampilan modern dan proses transaksi yang sederhana.',
            },
            image: project2,
            tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js'],
            github: '#',
            live: '#',
        }
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
