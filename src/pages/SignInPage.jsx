import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CircleNotch } from '@phosphor-icons/react';
import { supabase } from '../supabaseClient';
import { useLang } from '../context/LanguageContext';
import Footer from '../components/Footer';

const INPUT =
  'w-full bg-navy-950 border border-navy-700 text-white rounded-xl px-4 py-3 text-sm ' +
  'placeholder-slate-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 ' +
  'transition-colors duration-150';

const LABEL = 'block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400';

function SignInPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const s = t.signIn;

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  // After a successful sign in (or if the user is already signed in), check
  // whether they have a completed registration row and route accordingly.
  const checkAndRedirect = useCallback(async (userId) => {
    try {
      const { data: reg } = await supabase
        .from('registrations')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
      navigate(reg ? '/qualifying' : '/register', { replace: true });
    } catch {
      // If the table doesn't exist yet, send them to /register where they can
      // fill in personal details and will see a specific error on submit.
      navigate('/register', { replace: true });
    }
  }, [navigate]);

  // Redirect immediately if already signed in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) checkAndRedirect(session.user.id);
    });
  }, [checkAndRedirect]);

  async function handleSignIn(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;
      await checkAndRedirect(data.user.id);
    } catch (err) {
      console.error('[BEF] Sign in error:', err);
      const msg = (err?.message ?? '').toLowerCase();
      if (
        msg.includes('invalid') ||
        msg.includes('credentials') ||
        msg.includes('invalid login')
      ) {
        setError(s.errors.invalidCredentials);
      } else if (msg.includes('email not confirmed')) {
        setError(s.errors.emailNotConfirmed);
      } else {
        setError(s.errors.generic);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main className="bg-navy-950 min-h-[calc(100dvh-4rem)]">
        <div className="max-w-md mx-auto px-6 py-16">

          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-2">
              {s.eyebrow}
            </p>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">
              {s.title}
            </h1>
          </div>

          <div className="animate-fade-up bg-navy-900 border border-white/10 rounded-2xl p-8">
            <form onSubmit={handleSignIn} noValidate>
              <div className="space-y-5">

                <div>
                  <label htmlFor="si-email" className={`${LABEL} mb-1.5`}>
                    {s.emailLabel}
                  </label>
                  <input
                    id="si-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={s.emailPlaceholder}
                    required
                    autoComplete="email"
                    className={INPUT}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <label htmlFor="si-password" className={LABEL}>
                      {s.passwordLabel}
                    </label>
                    {/* Forgot password — UI only for now */}
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-xs text-slate-500 hover:text-accent transition-colors duration-150"
                    >
                      {s.forgotPassword}
                    </a>
                  </div>
                  <input
                    id="si-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={s.passwordPlaceholder}
                    required
                    autoComplete="current-password"
                    className={INPUT}
                  />
                </div>
              </div>

              {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-accent text-navy-950 font-bold text-sm py-3.5 rounded-xl hover:bg-accent-light active:scale-[0.97] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? <CircleNotch size={18} weight="bold" className="animate-spin" />
                  : s.cta}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              {s.noAccount}{' '}
              <Link
                to="/register"
                className="text-accent hover:text-accent-light font-semibold transition-colors duration-150"
              >
                {s.registerLink}
              </Link>
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

export default SignInPage;
