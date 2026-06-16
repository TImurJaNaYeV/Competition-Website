const SPONSORS = [
  { id: 'almu',      label: 'AlmaU',      accent: true  },
  { id: 'kimep',     label: 'KIMEP',      accent: false },
  { id: 'clevers',   label: 'Clevers',    accent: true  },
  { id: 'idp',       label: 'IDP IELTS',  accent: false },
  { id: 'teen',      label: 'TeenVestor', accent: true  },
  { id: 'freedom',   label: 'Freedom',    accent: false },
  { id: 'airastana', label: 'Air Astana', accent: false },
  { id: 'yandex',    label: 'Yandex',     accent: true  },
  { id: 'aiesec',    label: 'AIESEC',     accent: false },
  { id: 'weglobal',  label: 'Weglobal',   accent: true  },
];

// 4 copies so translateX(-25%) = exactly one set's width on any screen size.
// A single set of 10 logos is ~1400px; 3 remaining sets (3×1400 = 4200px)
// safely covers the widest displays without ever showing a gap.
const TRACK = [...SPONSORS, ...SPONSORS, ...SPONSORS, ...SPONSORS];

function Logo({ label, accent }) {
  return (
    <span
      className={`flex-shrink-0 whitespace-nowrap font-black text-[10px] sm:text-[11px] tracking-wide px-3 sm:px-4 py-1.5 rounded-lg border ${
        accent
          ? 'border-accent/30 text-accent bg-accent/10'
          : 'border-white/10 text-white/55 bg-white/5'
      }`}
    >
      {label}
    </span>
  );
}

function SponsorBar() {
  return (
    <>
      <style>{`
        @keyframes sponsor-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
        .sponsor-track {
          animation: sponsor-scroll 38s linear infinite;
          will-change: transform;
        }
        .sponsor-bar:hover .sponsor-track {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className="sponsor-bar w-full bg-navy-800 border-b border-white/10"
        style={{ height: '52px' }}
      >
        {/* overflow-hidden clips the track; mask fades the left and right edges */}
        <div
          className="h-full overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          }}
        >
          <div className="sponsor-track flex items-center h-full gap-5 sm:gap-8 px-6">
            {TRACK.map((s, i) => (
              <Logo key={`${s.id}-${i}`} label={s.label} accent={s.accent} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SponsorBar;
