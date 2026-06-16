import { useState, useEffect, useRef } from 'react';

// [PLACEHOLDER DATE] — update TARGET to the real competition date
const TARGET = new Date('2026-07-25T00:00:00');

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  /    60_000),
    seconds: Math.floor((diff %    60_000)  /     1_000),
  };
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center bg-navy-700 border border-white/10 rounded-xl px-5 py-4 min-w-[80px] sm:min-w-[96px]">
      <span className="text-4xl sm:text-5xl font-black text-white tabular-nums leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </span>
    </div>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [displayed, setDisplayed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [animated, setAnimated] = useState(false);
  const containerRef = useRef(null);

  // Live tick
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // Roll-up animation on scroll into view
  useEffect(() => {
    if (animated) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const target = getTimeLeft();
        const DURATION = 1400;
        const startTime = performance.now();

        function frame(now) {
          const t = Math.min((now - startTime) / DURATION, 1);
          const ease = easeOutCubic(t);
          setDisplayed({
            days:    Math.round(target.days    * ease),
            hours:   Math.round(target.hours   * ease),
            minutes: Math.round(target.minutes * ease),
            seconds: Math.round(target.seconds * ease),
          });
          if (t < 1) {
            requestAnimationFrame(frame);
          } else {
            setAnimated(true);
          }
        }
        requestAnimationFrame(frame);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  // After animation finishes, hand off to the live countdown
  const values = animated ? timeLeft : displayed;

  return (
    <div ref={containerRef} className="flex gap-3 sm:gap-4 justify-center flex-wrap">
      <TimeBox value={values.days}    label="Days"  />
      <TimeBox value={values.hours}   label="Hours" />
      <TimeBox value={values.minutes} label="Mins"  />
      <TimeBox value={values.seconds} label="Secs"  />
    </div>
  );
}

export default CountdownTimer;
