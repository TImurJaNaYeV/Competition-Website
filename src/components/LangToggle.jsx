import { useLang } from '../context/LanguageContext';

function LangToggle() {
  const { lang, toggleLang } = useLang();

  function switchTo(target) {
    if (lang !== target) toggleLang();
  }

  return (
    <div className="flex items-center rounded-full border border-white/15 bg-navy-700/60 p-0.5">
      <button
        type="button"
        onClick={() => switchTo('en')}
        aria-label="Switch to English"
        className={`px-2.5 py-1 rounded-full text-xs font-bold leading-none transition-all duration-150 ${
          lang === 'en'
            ? 'bg-accent text-navy-950'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => switchTo('ru')}
        aria-label="Switch to Russian"
        className={`px-2.5 py-1 rounded-full text-xs font-bold leading-none transition-all duration-150 ${
          lang === 'ru'
            ? 'bg-accent text-navy-950'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        RU
      </button>
    </div>
  );
}

export default LangToggle;
