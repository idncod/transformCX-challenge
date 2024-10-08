'use client'
import React, { useState, createContext, useContext, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ClientOnly from "@/app/ClientOnly";


const LanguageContext = createContext();

const languages = ['JavaScript', 'Python'];
const bgColor = {
    JavaScript: '#FDFD97',
    Python: '#D2FDBB',
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
                opacity: 0,
                y: 10,
                transition: { duration: 0.3 },
            }).then(() => {
                controls.start({
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3 },
                });
            });

            setPrevLanguage(language);
        }
    }, [language, controls, prevLanguage]);

    return (
        <ClientOnly>
            <div style={{position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto'}}>
                <div style={{marginBottom: '20px'}}>
                    <p
                        id="favoriteLanguage"
                        style={{fontSize: '24px', fontWeight: 'bold'}}
                    >
                        Favorite programming language:
                    </p>
                    <motion.div
                        style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            display: 'inline-block',
                            opacity: 1,
                        }}
                        animate={controls}
                    >
                        {language}
                    </motion.div>
                </div>
                <motion.button
                    id="changeFavorite"
                    onClick={toggleLanguage}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: '0 4px 10px rgba(0, 118, 255, 0.5)',
                    }}
                    whileTap={{scale: 0.95}}
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
                        color: "#36454F",
                    }}
                >
                    <span style={{fontSize: '18px', paddingTop: '50px'}}>Developed by Viola Lykova</span>
                </a>
            </div>
        </ClientOnly>
    );
}