import { useSmoothScrollTo } from "../lib/hooks";
import Reveal from "./Reveal";

const LINES: { text: string; cls?: string }[] = [
  { text: "« Protéger une forêt," },
  { text: "ce n'est pas la mettre", cls: "text-outline" },
  { text: "sous verre." },
  { text: "C'est apprendre, enfin,", cls: "text-gold" },
  { text: "à respirer à son rythme. »" },
];

export default function Manifesto() {
  const scrollTo = useSmoothScrollTo();

  return (
    <section id="manifeste" className="relative py-28 sm:py-40 overflow-hidden">
      {/* filigrane */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span className="font-display font-bold text-[26vw] leading-none text-outline opacity-25 animate-floaty-slow">
          TERRA
        </span>
      </div>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vmax] h-[70vmax] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(61,190,119,0.07), transparent 60%)" }}
        aria-hidden="true"
      />

      {/* feuille flottante */}
      <svg viewBox="0 0 32 32" className="absolute top-16 right-[12%] w-10 h-10 animate-floaty opacity-60" fill="#3DBE77" aria-hidden="true">
        <path d="M16 4c5.5 3.4 8 8.6 8 13.6 0 4.6-3.4 8.8-8 10.4-4.6-1.6-8-5.8-8-10.4C8 12.6 10.5 7.4 16 4z" />
      </svg>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <Reveal variant="fade">
          <p className="flex items-center justify-center gap-3 text-[11px] tracking-[0.35em] uppercase text-gold mb-10">
            <span className="h-px w-10 bg-gold" /> 06 — Manifeste <span className="h-px w-10 bg-gold" />
          </p>
        </Reveal>

        <blockquote className="font-display font-semibold leading-[1.12] text-[clamp(1.7rem,4.6vw,3.3rem)] text-mist">
          {LINES.map((l, i) => (
            <Reveal key={l.text} variant="mask" delay={i * 140}>
              <span className={`block ${l.cls ?? ""}`}>{l.text}</span>
            </Reveal>
          ))}
        </blockquote>

        <Reveal variant="fade" delay={700}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-sage/30" />
            <p className="text-sm text-bark tracking-wide">
              Élise Vasseur — <span className="text-sage">garde-forestière en chef, Valbrune</span>
            </p>
            <span className="h-px w-12 bg-sage/30" />
          </div>
        </Reveal>

        <Reveal variant="up" delay={850}>
          <button
            onClick={() => scrollTo("contact")}
            className="group mt-14 inline-flex items-center gap-3 bg-emerald text-night font-display font-semibold px-8 py-4 hover:bg-gold transition-colors duration-300 hover:-translate-y-0.5"
          >
            Rejoindre les 2 400 gardiens
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
