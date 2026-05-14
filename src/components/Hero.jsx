import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiMail, FiInstagram } from 'react-icons/fi';
import { FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';

const Hero = () => {
    const particlesRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const { lang } = useLanguage();
    const t = translations[lang].hero;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const createParticle = () => {
            if (!particlesRef.current) return;

            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 4 + 4}s`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            particle.style.opacity = Math.random() * 0.5 + 0.2;

            const colors = ['#8B5CF6', '#06B6D4', '#EC4899', '#F59E0B'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            particlesRef.current.appendChild(particle);
        };

        for (let i = 0; i < 50; i++) {
            createParticle();
        }

        return () => {
            if (particlesRef.current) {
                particlesRef.current.innerHTML = '';
            }
        };
    }, []);

    const scrollToAbout = () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="hero">
            <div className="particles" ref={particlesRef}></div>

            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.span
                    className="hero-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {t.badge}
                </motion.span>

                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {t.greeting} <span className="gradient-text">Angga</span>
                </motion.h1>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    {t.subtitle}
                </motion.p>

                <motion.div
                    className="hero-typed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <TypeAnimation
                        key={lang}
                        sequence={t.typed}
                        wrapper="span"
                        speed={50}
                        className="gradient-text"
                        repeat={Infinity}
                    />
                </motion.div>

                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    {t.description}
                </motion.p>

                <motion.div
                    className="hero-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                >
                    <motion.a
                        href="#contact"
                        className="btn btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <FiMail /> {t.talkBtn}
                    </motion.a>
                    <motion.a
                        href="#"
                        className="btn btn-secondary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FiDownload /> {t.cvBtn}
                    </motion.a>
                </motion.div>

                <motion.div
                    className="hero-socials"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    {[
                        { icon: <FaWhatsapp />, href: 'https://wa.me/6288221051462' },
                        { icon: <FiInstagram />, href: 'https://www.instagram.com/4ns.taa?igsh=d2NhOGd2bGt5bHU0&utm_source=qr' },
                        { icon: <FaTiktok />, href: 'https://www.tiktok.com/@4ns.ta?_r=1&_t=ZS-92b4JaTb9vu' },
                    ].map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: isScrolled ? 0 : 1 }}
                transition={{ duration: 0.5, delay: isScrolled ? 0 : 1.2 }}
                onClick={scrollToAbout}
                style={{ cursor: 'pointer' }}
            >
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <span>{t.scrollDown}</span>
            </motion.div>
        </section>
    );
};

export default Hero;
