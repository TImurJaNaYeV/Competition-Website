import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, CircleNotch, Info, CaretDown, Envelope } from '@phosphor-icons/react';
import { supabase } from '../supabaseClient';
import { useLang } from '../context/LanguageContext';
import Footer from '../components/Footer';

// Score 0-4: 0 = empty, 1 = weak, 2 = fair, 3 = good, 4 = strong
function getStrength(pwd) {
  if (!pwd) return 0;
  let s = 0;
  if (pwd.length >= 8) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  return Math.max(s, 1);
}

// Full class strings as static literals so Tailwind JIT includes them
const STRENGTH_BAR  = ['', 'bg-rose-500',  'bg-amber-400',  'bg-lime-400',  'bg-accent'];
const STRENGTH_TEXT = ['', 'text-rose-400', 'text-amber-400', 'text-lime-400', 'text-accent'];

const INPUT =
  'w-full bg-navy-950 border border-navy-700 text-white rounded-xl px-4 py-3 text-sm ' +
  'placeholder-slate-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 ' +
  'transition-colors duration-150';

const LABEL = 'block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-1.5';

// Check if this user already has a completed registration
async function fetchRegistration(userId) {
  const { data } = await supabase
    .from('registrations')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();
  return data; // null if no row, object if exists
}

function RegisterPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const r = t.register;

  // 'loading' | 'step1' | 'email-sent' | 'step2'
  const [flowState,      setFlowState]      = useState('loading');
  const [loading,        setLoading]        = useState(false);
  const [error,          setError]          = useState('');
  const [authUser,       setAuthUser]       = useState(null);
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Step 1 fields
  const [email,           setEmail]           = useState('');
  const [password,        setPassword]        = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2 fields
  const [firstName,  setFirstName]  = useState('');
  const [lastName,   setLastName]   = useState('');
  const [age,        setAge]        = useState('');
  const [grade,      setGrade]      = useState('9');
  const [country,    setCountry]    = useState('');
  const [schoolName, setSchoolName] = useState('');

  const strength = getStrength(password);

  // On mount: if user is already signed in, skip Step 1 entirely
  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setFlowState('step1');
        return;
      }
      try {
        const reg = await fetchRegistration(session.user.id);
        if (reg) {
          navigate('/qualifying', { replace: true });
        } else {
          setAuthUser(session.user);
          setFlowState('step2');
        }
      } catch {
        // Table may not exist yet — let step2 surface the error on submit
        setAuthUser(session.user);
        setFlowState('step2');
      }
    }
    init();
  }, [navigate]);

  async function handleCreateAccount(e) {
    e.preventDefault();
    setError('');

    if (password.length < 8) { setError(r.errors.passwordTooShort); return; }
    if (password !== confirmPassword) { setError(r.errors.passwordMismatch); return; }

    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signUp({ email, password });
      if (authError) throw authError;

      const user = data?.user;
      if (!user) throw new Error('no_user');

      if (data.session) {
        // Email confirmation is OFF — user is signed in immediately. Check for
        // an existing registration (edge case: same email re-registered).
        setAuthUser(user);
        const reg = await fetchRegistration(user.id).catch(() => null);
        if (reg) {
          navigate('/qualifying', { replace: true });
        } else {
          setFlowState('step2');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        // Email confirmation is ON — direct user to check their inbox
        setSubmittedEmail(email);
        setFlowState('email-sent');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('[BEF] Account creation error:', err);
      const msg = (err?.message ?? '').toLowerCase();
      if (
        msg.includes('already registered') ||
        msg.includes('already exists') ||
        msg.includes('user already')
      ) {
        setError(r.errors.emailExists);
      } else {
        setError(`${r.errors.generic} (${err?.message ?? 'unknown'})`);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCompleteRegistration(e) {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !age || !country || !schoolName) {
      setError(r.errors.fillRequired);
      return;
    }
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 13 || ageNum > 19) {
      setError(r.errors.ageRange);
      return;
    }

    setLoading(true);
    try {
      const { error: dbError } = await supabase.from('registrations').insert({
        user_id:        authUser.id,
        first_name:     firstName,
        last_name:      lastName,
        age:            ageNum,
        grade:          parseInt(grade, 10),
        country,
        school_name:    schoolName,
        payment_status: 'pending',
      });
      if (dbError) throw dbError;
      navigate('/qualifying');
    } catch (err) {
      console.error('[BEF] Registration insert error:', err);
      const msg = (err?.message ?? '').toLowerCase();
      if (msg.includes('violates row-level security') || msg.includes('rls')) {
        setError('Insert blocked by Supabase RLS. Check that the INSERT policy exists and you are signed in.');
      } else if (msg.includes('does not exist') || msg.includes('relation')) {
        setError('The registrations table does not exist. Run the SQL from SETUP.md.');
      } else {
        setError(`${r.errors.generic} (${err?.message ?? 'unknown'})`);
      }
    } finally {
      setLoading(false);
    }
  }

  // ── RENDER ──────────────────────────────────────────────────────────

  return (
    <>
      <main className="bg-navy-950 min-h-[calc(100dvh-4rem)]">
        <div className="max-w-md mx-auto px-6 py-16">

          {/* ── LOADING ────────────────────────────────────────── */}
          {flowState === 'loading' && (
            <div className="flex justify-center py-24">
              <CircleNotch size={32} weight="bold" className="text-accent animate-spin" />
            </div>
          )}

          {/* ── CHECK YOUR EMAIL ───────────────────────────────── */}
          {flowState === 'email-sent' && (
            <div className="animate-fade-up">
              <div className="bg-navy-900 border border-white/10 rounded-2xl p-10 text-center">
                <div className="w-14 h-14 bg-accent/10 border border-accent/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Envelope size={26} weight="fill" className="text-accent" />
                </div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight mb-4">
                  {r.emailSentTitle}
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
                  {r.emailSentPre}
                  <span className="text-white font-semibold">{submittedEmail}</span>
                  {r.emailSentPost}
                </p>
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center bg-accent text-navy-950 font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-accent-light active:scale-[0.97] transition-all duration-150"
                >
                  {r.goToSignIn}
                </Link>
              </div>
            </div>
          )}

          {/* ── STEP 1 + STEP 2 ────────────────────────────────── */}
          {(flowState === 'step1' || flowState === 'step2') && (
            <>
              {/* Step indicator */}
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 bg-accent text-navy-950">
                  {flowState === 'step2' ? <CheckCircle size={16} weight="fill" /> : '1'}
                </div>
                <div className={`flex-1 h-px mx-3 transition-colors duration-500 ${flowState === 'step2' ? 'bg-accent' : 'bg-navy-700'}`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 transition-colors duration-300 ${
                  flowState === 'step2'
                    ? 'bg-accent text-navy-950'
                    : 'bg-navy-800 border border-navy-600 text-slate-500'
                }`}>
                  2
                </div>
              </div>

              {/* Step heading */}
              <div className="mb-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-2">
                  {flowState === 'step1' ? r.step1Label : r.step2Label}
                </p>
                <h1 className="text-2xl font-black text-white uppercase tracking-tight">
                  {flowState === 'step1' ? r.createAccount : r.personalDetails}
                </h1>
              </div>

              {/* Form card — key re-triggers fade-up when transitioning steps */}
              <div key={flowState} className="animate-fade-up bg-navy-900 border border-white/10 rounded-2xl p-8">

                {/* ── STEP 1 FORM ─────────────────────────────── */}
                {flowState === 'step1' && (
                  <form onSubmit={handleCreateAccount} noValidate>
                    <div className="space-y-5">

                      <div>
                        <label htmlFor="reg-email" className={LABEL}>{r.emailLabel}</label>
                        <input
                          id="reg-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={r.emailPlaceholder}
                          required
                          autoComplete="email"
                          className={INPUT}
                        />
                      </div>

                      <div>
                        <label htmlFor="reg-password" className={LABEL}>{r.passwordLabel}</label>
                        <input
                          id="reg-password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={r.passwordPlaceholder}
                          required
                          autoComplete="new-password"
                          className={INPUT}
                        />
                        {password && (
                          <div className="mt-2.5">
                            <div className="flex gap-1 mb-1.5">
                              {[1, 2, 3, 4].map((i) => (
                                <div
                                  key={i}
                                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                                    i <= strength ? STRENGTH_BAR[strength] : 'bg-navy-700'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className={`text-xs ${STRENGTH_TEXT[strength]}`}>
                              {strength === 1 ? r.strength.weak
                                : strength === 2 ? r.strength.fair
                                : strength === 3 ? r.strength.good
                                : r.strength.strong}
                            </p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label htmlFor="reg-confirm" className={LABEL}>{r.confirmPasswordLabel}</label>
                        <input
                          id="reg-confirm"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder={r.confirmPasswordPlaceholder}
                          required
                          autoComplete="new-password"
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
                        : r.ctaCreate}
                    </button>

                    <p className="mt-5 text-center text-sm text-slate-500">
                      {t.signIn.haveAccount}{' '}
                      <Link to="/signin" className="text-accent hover:text-accent-light font-semibold transition-colors duration-150">
                        {t.nav.signIn}
                      </Link>
                    </p>
                  </form>
                )}

                {/* ── STEP 2 FORM ─────────────────────────────── */}
                {flowState === 'step2' && (
                  <form onSubmit={handleCompleteRegistration} noValidate>
                    <div className="space-y-5">

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="reg-first" className={LABEL}>{r.firstNameLabel}</label>
                          <input
                            id="reg-first"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder={r.firstNamePlaceholder}
                            required
                            autoComplete="given-name"
                            className={INPUT}
                          />
                        </div>
                        <div>
                          <label htmlFor="reg-last" className={LABEL}>{r.lastNameLabel}</label>
                          <input
                            id="reg-last"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder={r.lastNamePlaceholder}
                            required
                            autoComplete="family-name"
                            className={INPUT}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="reg-age" className={LABEL}>{r.ageLabel}</label>
                          <input
                            id="reg-age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder={r.agePlaceholder}
                            min="13"
                            max="19"
                            required
                            className={INPUT}
                          />
                        </div>
                        <div>
                          <label htmlFor="reg-grade" className={LABEL}>{r.gradeLabel}</label>
                          <div className="relative">
                            <select
                              id="reg-grade"
                              value={grade}
                              onChange={(e) => setGrade(e.target.value)}
                              className={`${INPUT} appearance-none pr-9 cursor-pointer`}
                            >
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                            </select>
                            <CaretDown
                              size={13}
                              weight="bold"
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="reg-country" className={LABEL}>{r.countryLabel}</label>
                        <input
                          id="reg-country"
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder={r.countryPlaceholder}
                          required
                          autoComplete="country-name"
                          className={INPUT}
                        />
                      </div>

                      <div>
                        <label htmlFor="reg-school" className={LABEL}>{r.schoolNameLabel}</label>
                        <input
                          id="reg-school"
                          type="text"
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          placeholder={r.schoolNamePlaceholder}
                          required
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
                        : r.ctaComplete}
                    </button>
                  </form>
                )}
              </div>

              {/* Payment notice */}
              <div className="mt-5 rounded-2xl border border-accent/30 bg-accent/5 p-5">
                <div className="flex gap-3">
                  <Info size={18} weight="fill" className="text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white mb-1.5">{r.paymentTitle}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{r.paymentBody}</p>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}

export default RegisterPage;
