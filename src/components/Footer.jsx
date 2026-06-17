import { useLang } from '../context/LanguageContext';

function Footer() {
  const { lang, t, toggleLang } = useLang();

  return (
    <footer className="bg-navy-800 border-t border-white/10 py-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 items-center">

        <div />

        <p className="text-center text-slate-500 text-sm tracking-wide">
          {t.footer.copyright}
        </p>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleLang}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-150"
          >
            {lang.toUpperCase()}
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
