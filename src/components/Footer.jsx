import { motion } from 'framer-motion';
import { FiInstagram } from 'react-icons/fi';
import { FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { lang } = useLanguage();
    const t = translations[lang].footer;

    const socialLinks = [
        { icon: <FaWhatsapp />, href: 'https://wa.me/6288221051462' },
        { icon: <FiInstagram />, href: 'https://www.instagram.com/4ns.taa?igsh=d2NhOGd2bGt5bHU0&utm_source=qr' },
        { icon: <FaTiktok />, href: 'https://www.tiktok.com/@4ns.ta?_r=1&_t=ZS-92b4JaTb9vu' },
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <motion.a
                        href="#home"
                        className="footer-logo gradient-text"
                        whileHover={{ scale: 1.05 }}
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        Portfolio
                    </motion.a>

                    <p className="footer-text">
                        {t.rights.replace('{year}', currentYear)}
                    </p>

                    <div className="footer-socials">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                whileHover={{ scale: 1.2, y: -5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
