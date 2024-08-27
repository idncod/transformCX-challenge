'use client'
import React, { useState, createContext, useContext, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ClientOnly from "@/app/ClientOnly";


const LanguageContext = createContext();

const languages = ['JavaScript', 'Python'];
const bgColor = {
    JavaScript: '#FFEB3B',
    Python: '#4CAF50',
};

export default function Page() {
    const [languageState, setLanguageState] = useState(0);

    const toggleLanguage = () => {
        setLanguageState((prevState) => (prevState + 1) % languages.length);
    };

    return (
        <LanguageContext.Provider value={{ language: languages[languageState], toggleLanguage }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '50px',
                minHeight: '100vh',
                backgroundColor: bgColor[languages[languageState]],
                transition: 'background-color 0.5s ease',
            }}>
                <MainSection />
            </div>
        </LanguageContext.Provider>
    );
}

function MainSection() {
    const { language, toggleLanguage } = useContext(LanguageContext);
    const controls = useAnimation();
    const [prevLanguage, setPrevLanguage] = useState(language);

    useEffect(() => {
        if (language !== prevLanguage) {
            controls.start({
                opacity: 1,
                width: '100%',
                transition: { duration: 0.3 },
            }).then(() => {
                controls.start({
                    opacity: 0,
                    width: 0,
                    transition: { duration: 0.3 },
                });
            });

            setPrevLanguage(language);
        }
    }, [language, controls, prevLanguage]);

    return (
        <ClientOnly>
        <div style={{ position: 'relative' }}>
            <p
                id="favoriteLanguage"
                style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', position: 'relative', display: 'inline-block' }}
            >
                Favorite programming language: {language}
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '4px',
                        backgroundColor: '#0070f3',
                    }}
                    animate={controls}
                />
            </p>
            <motion.button
                id="changeFavorite"
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05,
                    boxShadow: '0 4px 10px rgba(0, 118, 255, 0.5)',
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                    padding: '10px 20px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    outline: 'none',
                    position: 'relative',
                    transition: 'box-shadow 0.3s ease',
                    boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
                }}
            >
                Toggle language
            </motion.button>
            <a
                href="https://idncod.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '20px',
                    textDecoration: 'none',
                    color: "gray",
                }}
            >
                <span style={{ fontSize: '18px' }}>Developed by Viola Lykova</span>
            </a>
        </div>
    </ClientOnly>
    );
}