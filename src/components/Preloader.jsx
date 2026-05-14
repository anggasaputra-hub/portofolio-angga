import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';

const Preloader = ({ onComplete }) => {
    const [text, setText] = useState('');
    const { lang } = useLanguage();
    const fullText = translations[lang].preloader.text;

    useEffect(() => {
        let index = 0;
        setText('');
        const interval = setInterval(() => {
            setText(fullText.slice(0, index + 1));
            index++;
            if (index > fullText.length) {
                clearInterval(interval);
                setTimeout(() => {
                    onComplete();
                }, 1000);
            }
        }, 80);

        return () => clearInterval(interval);
    }, [onComplete, fullText]);

    return (
        <motion.div
            className="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                background: 'var(--bg-primary)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
                flexDirection: 'column'
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
                    {text}<span className="cursor">|</span>
                </h1>
            </motion.div>

            <motion.div
                className="loader-bar"
                style={{
                    width: '200px',
                    height: '4px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    marginTop: '20px'
                }}
            >
                <motion.div
                    style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--gradient-1), var(--gradient-2))',
                        transformOrigin: 'left'
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                />
            </motion.div>

            <style>{`
                .cursor {
                    animation: blink 1s step-end infinite;
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </motion.div>
    );
};

export default Preloader;
