import { useLang } from '../context/LanguageContext';

function Footer() {
  const { lang, toggleLang, t } = useLang();

  return (
    <footer className="bg-navy-800 border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 items-center">

        {/* Left — empty, mirrors the button width to keep copyright truly centered */}
        <div />

        {/* Center — copyright */}
        <p className="text-center text-slate-500 text-xs tracking-wide">
          {t.footer.copyright}
        </p>

        {/* Right — language switcher */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={lang === 'en' ? 'Switch to Russian' : 'Switch to English'}
            className="text-base border border-navy-700 hover:border-accent rounded-lg px-3 py-1.5 transition-all duration-150 active:scale-[0.97]"
          >
            {lang === 'en' ? '🇷🇺' : '🇬🇧'}
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
