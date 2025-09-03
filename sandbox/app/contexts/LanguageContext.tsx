import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'mr' | 'gu' | 'bn' | 'ta' | 'te' | 'kn' | 'ml' | 'pa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  getLanguageName: (lang: Language) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const getLanguageName = (lang: Language): string => {
    const languageNames: Record<Language, string> = {
      en: 'English',
      hi: 'हिंदी',
      mr: 'मराठी',
      gu: 'ગુજરાતી',
      bn: 'বাংলা',
      ta: 'தமிழ்',
      te: 'తెలుగు',
      kn: 'ಕನ್ನಡ',
      ml: 'മലയാളം',
      pa: 'ਪੰਜਾਬੀ'
    };
    return languageNames[lang];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getLanguageName }}>
      {children}
    </LanguageContext.Provider>
  );
}; 