import { createContext, useContext, useState } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('bef-lang') || 'en';
    } catch {
      return 'en';
    }
  });

  function toggleLang() {
    setLang((prev) => {
      const next = prev === 'en' ? 'ru' : 'en';
      try {
        localStorage.setItem('bef-lang', next);
      } catch {
        // localStorage unavailable (private browsing, etc.) — ignore
      }
      return next;
    });
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return {
    lang: ctx.lang,
    toggleLang: ctx.toggleLang,
    t: translations[ctx.lang],
  };
}
