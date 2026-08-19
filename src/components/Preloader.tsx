import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../lib/hooks";

/** Rideau d'ouverture : compteur 0 → 100 puis levée du voile. */
export default function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setPct(100);
      const t = window.setTimeout(() => setGone(true), 200);
      return () => window.clearTimeout(t);
    }
    let raf = 0;
    const t0 = performance.now();
    const D = 1250;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / D);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const a = window.setTimeout(() => setLeaving(true), 1450);
    const b = window.setTimeout(() => setGone(true), 2250);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [reduced]);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-night flex flex-col justify-between px-6 py-8 sm:px-12 sm:py-12 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        leaving ? "-translate-y-full" : ""
      }`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-3 text-sage">
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <path
            d="M16 4c5.5 3.4 8 8.6 8 13.6 0 4.6-3.4 8.8-8 10.4-4.6-1.6-8-5.8-8-10.4C8 12.6 10.5 7.4 16 4z"
            fill="#3DBE77"
          />
          <path d="M16 9v18" stroke="#07120B" strokeWidth="1.6" />
        </svg>
        <span className="font-display font-semibold tracking-[0.35em] text-sm">TERRA·07</span>
      </div>

      <div className="flex items-end justify-between">
        <p className="text-bark text-xs sm:text-sm tracking-[0.25em] uppercase animate-blink">
          Ouverture de la canopée…
        </p>
        <p className="font-display font-bold text-6xl sm:text-8xl text-mist tabular-nums leading-none">
          {pct}
          <span className="text-gold text-3xl sm:text-4xl align-top">%</span>
        </p>
      </div>

      <div className="h-px w-full bg-fern relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald to-gold"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
