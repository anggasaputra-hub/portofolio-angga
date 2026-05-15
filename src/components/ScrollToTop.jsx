import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="scroll-to-top"
                    onClick={scrollToTop}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        position: 'fixed',
                        bottom: '25px',
                        right: '20px', // aligned with music player
                        backgroundColor: 'var(--gradient-1)', // Fallback
                        background: 'linear-gradient(135deg, var(--gradient-1), var(--gradient-2))',
                        color: 'white',
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        zIndex: 999,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                        fontSize: '1.5rem',
                        border: 'none'
                    }}
                >
                    <FiArrowUp />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
