import { Link, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/');
  }

  return (
    <nav className="sticky top-0 z-50 bg-navy-800/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link to="/" className="font-black text-base tracking-tight leading-none">
          <span className="text-accent">[</span>
          <span className="text-white">{t.nav.brand}</span>
          <span className="text-accent">]</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-150"
          >
            {t.nav.home}
          </Link>

          {/* Language toggle — shows flag of the language to switch TO */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={lang === 'en' ? 'Switch to Russian' : 'Switch to English'}
            className="text-base border border-navy-700 hover:border-accent rounded-lg px-3 py-1.5 transition-all duration-150 active:scale-[0.97]"
          >
            {lang === 'en' ? '🇷🇺' : '🇬🇧'}
          </button>

          {/*
            Auth-dependent section:
            - undefined: session check still loading — render nothing to avoid flash
            - null:      not signed in — show Sign In + Register
            - object:    signed in — show My Dashboard + Sign Out
          */}
          {user === undefined ? null : user ? (
            <>
              <Link
                to="/qualifying"
                className="text-sm font-bold bg-accent text-navy-950 px-4 py-2 rounded-lg hover:bg-accent-light active:scale-[0.97] transition-all duration-150 leading-none"
              >
                {t.nav.myDashboard}
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-150"
              >
                {t.nav.signOut}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-150"
              >
                {t.nav.signIn}
              </Link>
              <Link
                to="/register"
                className="text-sm font-bold bg-accent text-navy-950 px-4 py-2 rounded-lg hover:bg-accent-light active:scale-[0.97] transition-all duration-150 leading-none"
              >
                {t.nav.register}
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
