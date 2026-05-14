import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(
        () => localStorage.getItem('lang') || 'en'
    );

    const toggleLang = () => {
        const newLang = lang === 'en' ? 'id' : 'en';
        setLang(newLang);
        localStorage.setItem('lang', newLang);
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
};
