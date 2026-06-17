import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { List, X } from '@phosphor-icons/react';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    navigate('/');
    setMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 bg-navy-800/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="font-black text-base tracking-tight leading-none flex-shrink-0">
          <span className="text-accent">[</span>
          <span className="text-white">{t.nav.brand}</span>
          <span className="text-accent">]</span>
        </Link>

        {/* ── Desktop nav ── */}
        <div className="hidden md:flex items-center gap-5">

          <Link
            to="/"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-150"
          >
            {t.nav.home}
          </Link>

          <span className="w-px h-4 bg-white/10" aria-hidden="true" />

          {/* Language toggle: text-only, shows flag + code of the language to switch TO */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={lang === 'en' ? 'Switch to Russian' : 'Switch to English'}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-150"
          >
            {lang === 'en' ? '🇷🇺 RU' : '🇬🇧 EN'}
          </button>

          <span className="w-px h-4 bg-white/10" aria-hidden="true" />

          {/* Auth — hidden while session resolves to prevent flash */}
          {user === undefined ? null : user ? (
            <>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-150"
              >
                {t.nav.signOut}
              </button>
              <Link
                to="/qualifying"
                className="text-sm font-bold bg-accent text-navy-950 px-4 py-2 rounded-lg hover:bg-accent-light active:scale-[0.97] transition-all duration-150 leading-none"
              >
                {t.nav.myDashboard}
              </Link>
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

        {/* ── Mobile: primary CTA + hamburger ── */}
        <div className="flex md:hidden items-center gap-3">
          {/* Keep the primary CTA visible beside the hamburger */}
          {user !== undefined && (
            <Link
              to={user ? '/qualifying' : '/register'}
              onClick={() => setMenuOpen(false)}
              className="text-xs font-bold bg-accent text-navy-950 px-3 py-2 rounded-lg hover:bg-accent-light active:scale-[0.97] transition-all duration-150 leading-none whitespace-nowrap"
            >
              {user ? t.nav.myDashboard : t.nav.register}
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="p-1 text-slate-300 hover:text-white transition-colors duration-150"
          >
            {menuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>

      </div>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-navy-800 px-6 py-5 flex flex-col gap-5">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150"
          >
            {t.nav.home}
          </Link>

          {user === undefined ? null : !user ? (
            <Link
              to="/signin"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150"
            >
              {t.nav.signIn}
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleSignOut}
              className="text-left text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150"
            >
              {t.nav.signOut}
            </button>
          )}

          <button
            type="button"
            onClick={() => { toggleLang(); setMenuOpen(false); }}
            className="text-left text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150"
          >
            {lang === 'en' ? '🇷🇺 Switch to Russian' : '🇬🇧 Switch to English'}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
