import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { lang } = useLanguage();
    const t = translations[lang].contact;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const serviceId = 'service_asta'; // Placeholder, user needs to update
        const templateId = 'template_asta'; // Placeholder
        const publicKey = 'user_asta_key'; // Placeholder

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_name: 'Angga Saputra',
        };

        emailjs.send(
            serviceId,
            templateId,
            templateParams,
            publicKey
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setIsSubmitting(false);
                setSubmitted(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSubmitted(false), 4000);
            })
            .catch((err) => {
                console.error('FAILED...', err);
                setIsSubmitting(false);
                alert('Gagal mengirim pesan. Silakan coba lagi nanti atau hubungi via email langsung.');
            });
    };

    const contactInfo = [
        { icon: <FiMail />, value: 'astaaja075@gmail.com' },
        { icon: <FiMapPin />, value: 'Purworejo, Indonesia' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <section id="contact" className="contact" ref={ref}>
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
                    className="contact-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <motion.div className="contact-info" variants={itemVariants}>
                        <h3>{t.heading}</h3>
                        <p>{t.description}</p>

                        <div className="contact-details">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    className="contact-item"
                                    whileHover={{ x: 10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="contact-item-icon">{info.icon}</div>
                                    <div className="contact-item-text">
                                        <h4>{t.contactLabels[index]}</h4>
                                        <span>{info.value}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.form
                        className="contact-form"
                        variants={itemVariants}
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <motion.input
                                type="text"
                                name="name"
                                placeholder={t.namePlaceholder}
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                whileFocus={{ scale: 1.01 }}
                            />
                        </div>

                        <div className="form-group">
                            <motion.input
                                type="email"
                                name="email"
                                placeholder={t.emailPlaceholder}
                                className="form-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                whileFocus={{ scale: 1.01 }}
                            />
                        </div>

                        <div className="form-group">
                            <motion.input
                                type="text"
                                name="subject"
                                placeholder={t.subjectPlaceholder}
                                className="form-input"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                whileFocus={{ scale: 1.01 }}
                            />
                        </div>

                        <div className="form-group">
                            <motion.textarea
                                name="message"
                                placeholder={t.messagePlaceholder}
                                className="form-input"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                whileFocus={{ scale: 1.01 }}
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="submit-btn"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                            }}
                        >
                            {isSubmitting ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    style={{ width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }}
                                />
                            ) : submitted ? (
                                <>{t.sent}</>
                            ) : (
                                <>
                                    <FiSend /> {t.sendBtn}
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
