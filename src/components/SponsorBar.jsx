const SPONSORS = [
  { id: 'almu',      label: 'AlmaU'      },
  { id: 'kimep',     label: 'KIMEP'      },
  { id: 'clevers',   label: 'Clevers'    },
  { id: 'idp',       label: 'IDP IELTS'  },
  { id: 'teen',      label: 'TeenVestor' },
  { id: 'freedom',   label: 'Freedom'    },
  { id: 'airastana', label: 'Air Astana' },
  { id: 'yandex',    label: 'Yandex'     },
  { id: 'aiesec',    label: 'AIESEC'     },
  { id: 'weglobal',  label: 'Weglobal'   },
];

// Exactly 2 copies — animation translates -50% (one full original-list width),
// so copy 2 snaps back to where copy 1 started with zero visible jump.
const TRACK = [...SPONSORS, ...SPONSORS];

function Logo({ label, accent }) {
  return (
    <span
      className={`flex-shrink-0 whitespace-nowrap font-black text-xs sm:text-sm tracking-wide px-3 sm:px-4 py-1.5 rounded-lg border ${
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
          to   { transform: translateX(-50%); }
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
        className="sponsor-bar w-full overflow-hidden bg-navy-800"
        style={{ height: '52px' }}
      >
        <div
          className="h-full overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          }}
        >
          <div className="sponsor-track flex items-center h-full gap-3 sm:gap-5 px-6">
            {TRACK.map((s, i) => (
              <Logo
                key={`${s.id}-${i}`}
                label={s.label}
                accent={i % 2 === 1}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SponsorBar;
