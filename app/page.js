'use client'
import React, { useState, createContext, useContext } from 'react';

const LanguageContext = createContext();

const languages = ['JavaScript', 'Python'];

export default function Home() {

  const [languageState, setLanguageState] = useState(0);

  const toggleLanguage = () => {
    setLanguageState((prevState) => (prevState + 1) % languages.length);
  };

  return (
      <LanguageContext.Provider value={{ language: languages[languageState], toggleLanguage }}>
        <MainSection />
      </LanguageContext.Provider>
  );
}

function MainSection() {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p id="favoriteLanguage" style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Favorite programming language: {language}
        </p>
        <button
            id="changeFavorite"
            onClick={toggleLanguage}
            style={{
              margin: 40,
              padding: '10px 50px',
              fontSize: '18px',
              cursor: 'pointer',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
        >
          Toggle language
        </button>
      </div>
  );
}