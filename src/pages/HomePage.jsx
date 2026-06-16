import { Link } from 'react-router-dom';
import {
  Trophy,
  BookOpen,
  Star,
  CalendarBlank,
  MapPin,
  Medal,
  Envelope,
  InstagramLogo,
} from '@phosphor-icons/react';
import { useLang } from '../context/LanguageContext';
import CountdownTimer from '../components/CountdownTimer';
import SponsorBar from '../components/SponsorBar';
import Footer from '../components/Footer';

// Static metadata per card slot — icons/style don't change with language
const CARD_META = [
  { Icon: Trophy,   featured: true,  animClass: 'animate-fade-up'   },
  { Icon: BookOpen, featured: false, animClass: 'animate-fade-up-1' },
  { Icon: Star,     featured: false, animClass: 'animate-fade-up-2' },
];

const DETAIL_ICONS = [CalendarBlank, MapPin, Medal];

const PHOTOS = ['biz1', 'biz2', 'biz3'];

function scrollToAbout() {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
}

function HomePage() {
  const { lang, t } = useLang();

  // Hero headline is larger in English (shorter text) than in Russian (longer text)
  const heroHeadingSize =
    lang === 'ru'
      ? 'text-3xl sm:text-4xl lg:text-5xl'
      : 'text-4xl sm:text-5xl lg:text-6xl';

  return (
    <main>

      {/* ── SPONSOR BAR ───────────────────────────────────────────── */}
      <SponsorBar />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100dvh-4rem)] flex flex-col items-center justify-center overflow-hidden bg-navy-950">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-5%,rgba(0,196,140,0.09),transparent_70%)]"
        />

        <div className="relative w-full max-w-5xl mx-auto px-6 py-16 text-center">
          <h1
            className={`animate-fade-up font-black text-white uppercase leading-none tracking-tight mb-6 ${heroHeadingSize}`}
          >
            {t.hero.taglinePart1}
            <br />
            <span className="text-accent">{t.hero.taglinePart2}</span>
          </h1>

          {/*
            descriptionEnd ("2-4." / "2–4 человека.") is wrapped in whitespace-nowrap
            to prevent the browser breaking on the hyphen and orphaning the last number.
          */}
          <p className="animate-fade-up-1 text-base sm:text-lg text-slate-300 max-w-lg mx-auto mb-10 leading-relaxed">
            {t.hero.descriptionPre}
            <span className="whitespace-nowrap">{t.hero.descriptionEnd}</span>
          </p>

          <div className="animate-fade-up-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center bg-accent text-navy-950 text-sm font-bold px-8 py-4 rounded-xl hover:bg-accent-light active:scale-[0.97] transition-all duration-150"
            >
              {t.hero.registerCta}
            </Link>
            <button
              type="button"
              onClick={scrollToAbout}
              className="inline-flex items-center justify-center border border-white/20 text-white text-sm font-semibold px-8 py-4 rounded-xl hover:bg-white/5 hover:border-white/40 active:scale-[0.97] transition-all duration-150"
            >
              {t.hero.learnMore}
            </button>
          </div>
        </div>
      </section>

      {/* ── COUNTDOWN ─────────────────────────────────────────────── */}
      <section className="bg-navy-900 border-y border-white/10 py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-8">
            {t.countdown.subheading}
          </p>
          <CountdownTimer />
          <p className="mt-5 text-[11px] uppercase tracking-widest text-slate-600">
            {t.countdown.date}
          </p>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────── */}
      <section id="about" className="bg-navy-950 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-4">
              {t.about.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase leading-tight tracking-tight">
              {t.about.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CARD_META.map(({ Icon, featured, animClass }, i) => {
              const card = t.about.cards[i];
              return (
                <div
                  key={i}
                  className={`rounded-2xl p-8 border transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] ${animClass} ${
                    featured
                      ? 'bg-accent/10 border-accent/25 hover:border-accent/50'
                      : 'bg-navy-700/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon
                    size={30}
                    weight="fill"
                    className={`mb-6 ${featured ? 'text-accent' : 'text-slate-300'}`}
                  />
                  <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DETAILS ───────────────────────────────────────────────── */}
      <section className="bg-navy-900 border-y border-white/10 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight text-center mb-12">
            {t.details.heading}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch">
            {t.details.items.map((item, i) => {
              const Icon = DETAIL_ICONS[i];
              return (
                <div
                  key={i}
                  className="w-full sm:flex-1 sm:max-w-[260px] flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-navy-700/40 px-8 py-8"
                >
                  <Icon size={26} weight="fill" className="text-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    {item.label}
                  </span>
                  <span className="text-white font-semibold text-sm text-center leading-snug">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────────────── */}
      <section className="bg-navy-950 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight text-center mb-12">
            {t.gallery.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PHOTOS.map((seed) => (
              <div
                key={seed}
                className="aspect-[3/2] rounded-2xl overflow-hidden bg-navy-700"
              >
                <img
                  src={`https://picsum.photos/seed/${seed}/600/400`}
                  alt="Competition photo"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────── */}
      <section className="bg-navy-900 border-t border-white/10 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-4">
            {t.contact.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-10">
            {t.contact.heading}
          </h2>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href="#"
              className="flex items-center gap-2.5 text-slate-300 hover:text-accent transition-colors duration-150 text-sm font-medium"
            >
              <Envelope size={17} weight="fill" />
              {t.contact.emailDisplay}
            </a>
            <span className="hidden sm:block w-px h-4 bg-navy-700" aria-hidden="true" />
            <a
              href="#"
              className="flex items-center gap-2.5 text-slate-300 hover:text-accent transition-colors duration-150 text-sm font-medium"
            >
              <InstagramLogo size={17} weight="fill" />
              {t.contact.instagram}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default HomePage;
