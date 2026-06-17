import { useLang } from '../context/LanguageContext';

function Footer() {
  const { lang, toggleLang, t } = useLang();

  return (
    <footer className="bg-navy-800 border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 items-center">

        {/* Left — mirrors button width so copyright stays centered */}
        <div />

        {/* Center — copyright */}
        <p className="text-center text-slate-500 text-xs tracking-wide">
          {t.footer.copyright}
        </p>

        {/* Right — language switcher, text-only to match navbar secondary actions */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={lang === 'en' ? 'Switch to Russian' : 'Switch to English'}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-150"
          >
            {lang === 'en' ? '🇷🇺 RU' : '🇬🇧 EN'}
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
