import { useState, useEffect } from 'react';

// [PLACEHOLDER DATE] — update TARGET to the real competition date when it changes
const TARGET = new Date('2025-07-01T00:00:00');

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

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
      <TimeBox value={timeLeft.days}    label="Days"  />
      <TimeBox value={timeLeft.hours}   label="Hours" />
      <TimeBox value={timeLeft.minutes} label="Mins"  />
      <TimeBox value={timeLeft.seconds} label="Secs"  />
    </div>
  );
}

export default CountdownTimer;
