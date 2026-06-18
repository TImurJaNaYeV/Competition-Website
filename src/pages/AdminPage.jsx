import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CircleNotch,
  MagnifyingGlass,
  ArrowUp,
  ArrowDown,
  Check,
} from '@phosphor-icons/react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import { checkIsAdmin } from '../utils/checkAdmin';
import Footer from '../components/Footer';

const SETTINGS_INPUT =
  'w-full bg-navy-950 border border-navy-700 text-white rounded-xl px-4 py-3 text-base ' +
  'placeholder-slate-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 ' +
  'transition-colors duration-150 [color-scheme:dark]';

const LABEL = 'block text-xs font-bold uppercase tracking-[0.1em] text-slate-400 mb-1.5';

const TH = 'text-left text-[10px] font-bold uppercase tracking-[0.15em] px-5 py-4 whitespace-nowrap';

function toDatetimeLocal(iso) {
  if (!iso) return '';
  return iso.slice(0, 16);
}

function SortBtn({ label, col, sortKey, sortDir, onSort }) {
  const active = sortKey === col;
  return (
    <button
      type="button"
      onClick={() => onSort(col)}
      className={`px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide border transition-colors duration-150 inline-flex items-center gap-1 ${
        active
          ? 'bg-accent/10 border-accent/30 text-accent'
          : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'
      }`}
    >
      {label}
      {active && (sortDir === 'asc'
        ? <ArrowUp size={11} weight="bold" />
        : <ArrowDown size={11} weight="bold" />
      )}
    </button>
  );
}

function PaymentBadge({ status, label }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
      status === 'paid'
        ? 'bg-accent/15 text-accent'
        : 'bg-amber-400/15 text-amber-400'
    }`}>
      {label}
    </span>
  );
}

function AdminPage() {
  const { user } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();
  const a = t.admin;

  const [pageReady, setPageReady] = useState(false);

  // Settings state
  const [round1Date,      setRound1Date]      = useState('');
  const [round2Date,      setRound2Date]      = useState('');
  const [finalDate,       setFinalDate]       = useState('');
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSaved,   setSettingsSaved]   = useState(false);
  const [settingsError,   setSettingsError]   = useState('');

  // Registrations state
  const [registrations, setRegistrations] = useState([]);
  const [regsLoading,   setRegsLoading]   = useState(false);
  const [searchQuery,   setSearchQuery]   = useState('');
  const [sortKey,       setSortKey]       = useState('date');
  const [sortDir,       setSortDir]       = useState('desc');
  const [togglingId,    setTogglingId]    = useState(null);

  // Profiles state (for incomplete registrations diff)
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) { navigate('/signin', { replace: true }); return; }

    checkIsAdmin(user.id).then((isAdmin) => {
      if (!isAdmin) { navigate('/', { replace: true }); return; }
      setPageReady(true);
      loadSettings();
      loadRegistrations();
      loadProfiles();
    });
  }, [user, navigate]);

  async function loadSettings() {
    const { data } = await supabase
      .from('competition_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle();
    if (data) {
      setRound1Date(toDatetimeLocal(data.round1_date));
      setRound2Date(toDatetimeLocal(data.round2_date));
      setFinalDate(toDatetimeLocal(data.final_date));
    }
  }

  async function loadRegistrations() {
    setRegsLoading(true);
    console.log('Fetching all registrations as admin');
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });
    console.log('Registrations fetched:', data);
    console.log('Fetch error:', error);
    console.log('Count:', data?.length);
    setRegistrations(data || []);
    setRegsLoading(false);
  }

  async function loadProfiles() {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, created_at')
      .order('created_at', { ascending: false });
    if (error) console.log('Profiles fetch error:', error);
    setProfiles(data || []);
  }

  async function handleSaveSettings(e) {
    e.preventDefault();
    setSettingsLoading(true);
    setSettingsError('');
    setSettingsSaved(false);
    const { error } = await supabase
      .from('competition_settings')
      .upsert({
        id:          1,
        round1_date: round1Date || null,
        round2_date: round2Date || null,
        final_date:  finalDate  || null,
        updated_at:  new Date().toISOString(),
      });
    if (error) {
      setSettingsError(error.message);
    } else {
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    }
    setSettingsLoading(false);
  }

  async function togglePayment(reg) {
    const newStatus = reg.payment_status === 'paid' ? 'pending' : 'paid';
    setTogglingId(reg.id);
    const { error } = await supabase
      .from('registrations')
      .update({ payment_status: newStatus })
      .eq('id', reg.id);
    if (!error) {
      setRegistrations((prev) =>
        prev.map((r) => (r.id === reg.id ? { ...r, payment_status: newStatus } : r))
      );
    }
    setTogglingId(null);
  }

  function handleSort(col) {
    if (sortKey === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(col);
      setSortDir('asc');
    }
  }

  // Set of user_ids that have completed registration
  const registeredIds = useMemo(
    () => new Set(registrations.map((r) => r.user_id)),
    [registrations],
  );

  // Profiles with no matching registrations row
  const incompleteUsers = useMemo(
    () => profiles.filter((p) => !registeredIds.has(p.id)),
    [profiles, registeredIds],
  );

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return registrations
      .filter((r) => {
        if (!q) return true;
        return (
          r.first_name?.toLowerCase().includes(q) ||
          r.last_name?.toLowerCase().includes(q) ||
          r.email?.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortKey === 'name') {
          const na = `${a.first_name ?? ''} ${a.last_name ?? ''}`.toLowerCase();
          const nb = `${b.first_name ?? ''} ${b.last_name ?? ''}`.toLowerCase();
          const cmp = na.localeCompare(nb);
          return sortDir === 'asc' ? cmp : -cmp;
        }
        const ta = new Date(a.created_at).getTime();
        const tb = new Date(b.created_at).getTime();
        return sortDir === 'asc' ? ta - tb : tb - ta;
      });
  }, [registrations, searchQuery, sortKey, sortDir]);

  if (!pageReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950">
        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <>
      <main className="bg-navy-950 min-h-[calc(100dvh-4rem)]">
        <div className="max-w-6xl mx-auto px-6 py-14">

          {/* ── HEADER ─────────────────────────────────────────────── */}
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-2">
              {a.eyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              {a.heading}
            </h1>
            <p className="text-slate-500 text-sm mt-2">{user.email}</p>
          </div>

          {/* ── SECTION 1: COMPETITION DATES ───────────────────────── */}
          <section className="mb-14">
            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-6">
              {a.settingsHeading}
            </h2>
            <div className="bg-navy-900 border border-white/10 rounded-2xl p-8">
              <form onSubmit={handleSaveSettings} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className={LABEL}>{a.round1Label}</label>
                    <input
                      type="datetime-local"
                      value={round1Date}
                      onChange={(e) => setRound1Date(e.target.value)}
                      className={SETTINGS_INPUT}
                    />
                  </div>
                  <div>
                    <label className={LABEL}>{a.round2Label}</label>
                    <input
                      type="datetime-local"
                      value={round2Date}
                      onChange={(e) => setRound2Date(e.target.value)}
                      className={SETTINGS_INPUT}
                    />
                  </div>
                  <div>
                    <label className={LABEL}>{a.finalLabel}</label>
                    <input
                      type="datetime-local"
                      value={finalDate}
                      onChange={(e) => setFinalDate(e.target.value)}
                      className={SETTINGS_INPUT}
                    />
                  </div>
                </div>

                {settingsError && (
                  <p className="mt-4 text-base text-rose-400">{settingsError}</p>
                )}

                <div className="mt-6 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={settingsLoading}
                    className="inline-flex items-center gap-2 bg-accent text-navy-950 font-bold text-sm px-6 py-3 rounded-xl hover:bg-accent-light active:scale-[0.97] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {settingsLoading ? (
                      <><CircleNotch size={16} weight="bold" className="animate-spin" />{a.saving}</>
                    ) : a.saveChanges}
                  </button>
                  {settingsSaved && (
                    <span className="flex items-center gap-1.5 text-accent text-sm font-semibold">
                      <Check size={16} weight="bold" />
                      {a.saved}
                    </span>
                  )}
                </div>
              </form>
            </div>
          </section>

          {/* ── SECTION 2: INCOMPLETE REGISTRATIONS ────────────────── */}
          <section className="mb-14">
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                {a.incompleteHeading}
              </h2>
              {incompleteUsers.length > 0 && (
                <span className="text-sm text-amber-400/70">
                  {incompleteUsers.length} {a.total}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 mb-6">{a.incompleteSubtext}</p>

            {incompleteUsers.length === 0 ? (
              <p className="text-slate-400 text-base text-center py-10 border border-amber-400/15 rounded-2xl">
                {a.noIncomplete}
              </p>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-amber-400/20">
                <table className="min-w-[420px] w-full text-sm">
                  <thead>
                    <tr className="bg-amber-400/5 border-b border-amber-400/15">
                      <th className={`${TH} text-amber-400`}>{a.colEmail}</th>
                      <th className={`${TH} text-amber-400`}>{a.colSignedUp}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incompleteUsers.map((profile, i) => (
                      <tr
                        key={profile.id}
                        className={`border-b border-white/5 hover:bg-white/[0.025] transition-colors duration-100 ${
                          i % 2 === 0 ? 'bg-navy-900/40' : 'bg-navy-950'
                        }`}
                      >
                        <td className="px-5 py-4 text-slate-300">
                          {profile.email ?? '—'}
                        </td>
                        <td className="px-5 py-4 text-slate-400 text-xs">
                          {profile.created_at
                            ? new Date(profile.created_at).toLocaleDateString()
                            : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* ── SECTION 3: COMPLETE REGISTRATIONS ──────────────────── */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-baseline gap-3">
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  {a.registrationsHeading}
                </h2>
                <span className="text-sm text-slate-500">
                  {filtered.length} {a.total}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <MagnifyingGlass
                    size={15}
                    weight="bold"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={a.searchPlaceholder}
                    className="bg-navy-900 border border-white/10 text-white rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder-slate-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors duration-150 w-full sm:w-64"
                  />
                </div>
                <div className="flex gap-2">
                  <SortBtn label={a.sortName} col="name" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                  <SortBtn label={a.sortDate} col="date" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                </div>
              </div>
            </div>

            {regsLoading ? (
              <div className="flex justify-center py-16">
                <CircleNotch size={28} weight="bold" className="text-accent animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-slate-500 text-base text-center py-16">{a.noResults}</p>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="min-w-[820px] w-full text-sm">
                  <thead>
                    <tr className="bg-navy-900 border-b border-white/10">
                      {[a.colName, a.colEmail, a.colAge, a.colGrade, a.colSchool, a.colPayment, a.colRegistered].map((h) => (
                        <th key={h} className={`${TH} text-slate-400`}>{h}</th>
                      ))}
                      <th className="px-5 py-4" aria-label="Actions" />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((reg, i) => (
                      <tr
                        key={reg.id}
                        className={`border-b border-white/5 hover:bg-white/[0.025] transition-colors duration-100 ${
                          i % 2 === 0 ? 'bg-navy-900/40' : 'bg-navy-950'
                        }`}
                      >
                        <td className="px-5 py-4 text-white font-medium whitespace-nowrap">
                          {reg.first_name} {reg.last_name}
                        </td>
                        <td className="px-5 py-4 text-slate-300 whitespace-nowrap">
                          {reg.email ?? '—'}
                        </td>
                        <td className="px-5 py-4 text-slate-300">{reg.age ?? '—'}</td>
                        <td className="px-5 py-4 text-slate-300">{reg.grade ?? '—'}</td>
                        <td className="px-5 py-4 text-slate-300 max-w-[180px] truncate">
                          {reg.school_name ?? '—'}
                        </td>
                        <td className="px-5 py-4">
                          <PaymentBadge
                            status={reg.payment_status}
                            label={reg.payment_status === 'paid' ? a.statusPaid : a.statusPending}
                          />
                        </td>
                        <td className="px-5 py-4 text-slate-400 whitespace-nowrap text-xs">
                          {reg.created_at
                            ? new Date(reg.created_at).toLocaleDateString()
                            : '—'}
                        </td>
                        <td className="px-5 py-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            disabled={togglingId === reg.id}
                            onClick={() => togglePayment(reg)}
                            className="text-xs font-bold border border-white/10 text-slate-300 hover:text-white hover:border-white/25 px-3 py-1.5 rounded-lg transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            {togglingId === reg.id ? (
                              <CircleNotch size={12} weight="bold" className="animate-spin" />
                            ) : reg.payment_status === 'paid' ? a.markPending : a.markPaid}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}

export default AdminPage;
