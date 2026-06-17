import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilSimple, VideoCamera, Trophy } from '@phosphor-icons/react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import Footer from '../components/Footer';

function Modal({ message, closeLabel, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-navy-900 text-base font-medium mb-6 leading-relaxed">
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="bg-accent text-navy-950 font-bold px-6 py-2.5 rounded-xl hover:bg-accent-light active:scale-[0.97] transition-all duration-150 text-sm"
        >
          {closeLabel}
        </button>
      </div>
    </div>
  );
}

function QualifyingPage() {
  const { user } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();
  const q = t.qualifying;

  const [firstName, setFirstName] = useState('');
  const [pageReady, setPageReady] = useState(false);
  const [modal, setModal] = useState(null); // null | 'exam' | 'zoom'

  useEffect(() => {
    if (user === undefined) return; // session still loading

    if (user === null) {
      navigate('/signin', { replace: true });
      return;
    }

    supabase
      .from('registrations')
      .select('first_name')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) {
          navigate('/register', { replace: true });
          return;
        }
        setFirstName(data.first_name);
        setPageReady(true);
      });
  }, [user, navigate]);

  if (!pageReady) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-navy-950">
        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  const detailRows = [
    { label: q.dateLabel,     value: q.dateValue     },
    { label: q.durationLabel, value: q.durationValue },
    { label: q.subjectsLabel, value: q.subjectsValue },
    { label: q.formatLabel,   value: q.formatValue   },
  ];

  return (
    <>
      {modal && (
        <Modal
          message={modal === 'exam' ? q.examModal : q.zoomModal}
          closeLabel={q.closeModal}
          onClose={() => setModal(null)}
        />
      )}

      <main>

        {/* ── SECTION 1: WELCOME ──────────────────────────────────────── */}
        <section className="relative w-full bg-navy-950 py-20 px-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,196,140,0.07),transparent_70%)]"
          />
          <div className="relative max-w-4xl mx-auto text-center animate-fade-up">
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              {q.welcome}{' '}
              <span className="text-accent">{firstName}</span>!
            </h1>
            <p className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              {q.welcomeSubtext}
            </p>
          </div>
        </section>

        {/* ── SECTION 2: ROUND 1 ──────────────────────────────────────── */}
        <section className="w-full bg-navy-800 py-16 px-6">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-start">

            {/* Left: round details */}
            <div className="flex-1 animate-fade-up">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-7">
                {q.round1Heading}
              </h2>
              <dl className="space-y-3 mb-7">
                {detailRows.map(({ label, value }) => (
                  <div key={label} className="flex flex-wrap items-baseline gap-x-2">
                    <dt className="text-xs font-bold uppercase tracking-[0.08em] text-slate-400 whitespace-nowrap">
                      {label}:
                    </dt>
                    <dd className="text-white text-base font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                {q.round1Desc}
              </p>
            </div>

            {/* Right: action buttons */}
            <div className="flex flex-col gap-4 w-full lg:w-72 shrink-0 animate-fade-up-1">
              <button
                type="button"
                onClick={() => setModal('exam')}
                className="flex items-center justify-center gap-3 w-full bg-accent text-navy-950 font-bold py-5 px-6 rounded-xl hover:bg-accent-light active:scale-[0.97] transition-all duration-150 text-base"
              >
                <PencilSimple size={20} weight="bold" />
                {q.startExam}
              </button>
              <button
                type="button"
                onClick={() => setModal('zoom')}
                className="flex items-center justify-center gap-3 w-full border-2 border-accent text-accent font-bold py-5 px-6 rounded-xl hover:bg-accent/10 active:scale-[0.97] transition-all duration-150 text-base"
              >
                <VideoCamera size={20} weight="bold" />
                {q.joinZoom}
              </button>
            </div>

          </div>
        </section>

        {/* ── SECTION 3: FINALS ───────────────────────────────────────── */}
        <section className="w-full bg-accent py-20 px-6">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <Trophy
              size={52}
              weight="fill"
              className="text-navy-950 mx-auto mb-6 opacity-70"
            />
            <h2 className="text-4xl sm:text-5xl font-black text-navy-950 mb-4 leading-tight">
              {q.finalsHeading}
            </h2>
            <p className="text-navy-950 font-semibold text-lg mb-3 opacity-80">
              {q.finalsDate}
            </p>
            <p className="text-navy-950 text-base opacity-60">
              {q.finalsDetails}
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default QualifyingPage;
