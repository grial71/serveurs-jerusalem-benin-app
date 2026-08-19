import { IMG } from "../lib/assets";
import { usePrefersReducedMotion, useScrollY, useSmoothScrollTo } from "../lib/hooks";
import Reveal from "./Reveal";
import Scramble from "./Scramble";

const STATS = [
  { value: "84", unit: "ha", label: "de hêtraie protégée" },
  { value: "1 204", unit: "", label: "espèces recensées" },
  { value: "320", unit: "ans", label: "pour le chêne doyen" },
  { value: "09:56", unit: "", label: "le film, une saison" },
];

export default function Hero() {
  const scrollY = useScrollY();
  const reduced = usePrefersReducedMotion();
  const scrollTo = useSmoothScrollTo();
  const py = reduced ? 0 : scrollY;

  return (
    <section id="accueil" className="relative min-h-screen overflow-hidden flex flex-col">
      {/* ——— Fond : image en respiration Ken Burns + parallaxe ——— */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${py * 0.26}px)` }}
        aria-hidden="true"
      >
        <img
          src={IMG.hero}
          alt=""
          className="w-full h-[112%] object-cover animate-kenburns motion-reduce:animate-none"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-night via-night/55 to-night/20" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/60" aria-hidden="true" />
      <div className="absolute inset-0 topo-lines opacity-70" aria-hidden="true" />

      {/* ——— Ornement : badge circulaire rotatif ——— */}
      <div
        className="absolute right-10 bottom-40 hidden md:block z-10 will-change-transform"
        style={{ transform: `translateY(${py * -0.08}px)` }}
        aria-hidden="true"
      >
        <div className="relative w-36 h-36 animate-floaty">
          <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
            <defs>
              <path id="circlePath" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <circle cx="100" cy="100" r="63" fill="none" stroke="rgba(227,180,88,0.35)" strokeWidth="1" strokeDasharray="3 6" />
            <text fill="#E3B458" fontSize="12.5" letterSpacing="4.5" fontFamily="Satoshi, sans-serif">
              <textPath href="#circlePath">RÉSERVE DE VALBRUNE • FORÊT ANCIENNE • DEPUIS 1987 •</textPath>
            </text>
          </svg>
          <svg viewBox="0 0 32 32" className="absolute inset-0 m-auto w-8 h-8" fill="none" aria-hidden="true">
            <path d="M16 4c5.5 3.4 8 8.6 8 13.6 0 4.6-3.4 8.8-8 10.4-4.6-1.6-8-5.8-8-10.4C8 12.6 10.5 7.4 16 4z" fill="#3DBE77" />
            <path d="M16 9v18" stroke="#07120B" strokeWidth="1.6" />
          </svg>
        </div>
      </div>

      {/* ——— Contenu principal ——— */}
      <div
        className="relative z-10 flex-1 flex flex-col justify-end max-w-7xl mx-auto w-full px-5 sm:px-8 pb-10 pt-36"
        style={{
          transform: `translateY(${py * 0.1}px)`,
          opacity: reduced ? 1 : Math.max(0, 1 - py / 620),
        }}
      >
        <Reveal variant="fade" delay={100}>
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-gold" />
            <p className="text-[11px] sm:text-xs tracking-[0.32em] uppercase text-sage">
              Expédition 07 — Secteur Nord · <span className="text-gold">48.87° N, 2.33° E</span>
            </p>
          </div>
        </Reveal>

        <h1 className="font-display font-bold leading-[0.92] tracking-tight text-mist">
          <Reveal variant="mask" delay={250}>
            <span className="block text-[clamp(3.2rem,11vw,8.75rem)]">
              <Scramble text="ÉCOUTER" delay={500} />
            </span>
          </Reveal>
          <Reveal variant="mask" delay={400}>
            <span className="block text-[clamp(3.2rem,11vw,8.75rem)]">
              LA <span className="text-outline">FORÊT</span>
            </span>
          </Reveal>
          <Reveal variant="mask" delay={550}>
            <span className="block text-[clamp(2rem,6.2vw,4.9rem)] text-gold">
              qui ne dort jamais.
            </span>
          </Reveal>
        </h1>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-14">
          <Reveal variant="up" delay={700} className="max-w-md">
            <p className="text-sage/90 leading-relaxed text-[15px] sm:text-base">
              Quatre-vingt-quatre hectares de hêtraie ancienne, un réseau de mycélium plus vaste
              que la ville voisine, et une saison entière filmée sous la canopée. Bienvenue dans
              la réserve de <strong className="text-mist font-medium">Valbrune</strong>.
            </p>
          </Reveal>
          <Reveal variant="up" delay={850}>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo("film")}
                className="group relative bg-gold text-night font-display font-semibold tracking-wide px-7 py-3.5 overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 bg-emerald translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative flex items-center gap-2.5">
                  Voir le film
                  <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
              </button>
              <button
                onClick={() => scrollTo("ecosysteme")}
                className="group border border-sage/35 text-mist px-7 py-3.5 font-display font-medium tracking-wide hover:border-emerald hover:text-emerald transition-colors duration-300"
              >
                Explorer l'écosystème
              </button>
            </div>
          </Reveal>
        </div>

        {/* Indice de défilement */}
        <Reveal variant="fade" delay={1200} className="absolute bottom-8 right-8 hidden sm:flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.4em] uppercase text-bark [writing-mode:vertical-rl]">
            Défiler
          </span>
          <span className="block w-px h-14 bg-sage/25 relative overflow-hidden">
            <span className="absolute top-0 left-0 w-full h-5 bg-gold animate-[scrollcue_1.8s_ease-in-out_infinite]" />
          </span>
        </Reveal>
      </div>

      {/* ——— Bandeau de chiffres ——— */}
      <div className="relative z-10 border-t border-sage/15 bg-night/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              variant="up"
              delay={i * 120}
              className={`px-5 sm:px-8 py-5 border-sage/10 ${i > 0 ? "border-l" : ""} ${
                i >= 2 ? "border-t lg:border-t-0" : ""
              }`}
            >
              <p className="font-display font-bold text-2xl sm:text-3xl text-mist">
                {s.value}
                {s.unit && <span className="text-gold text-lg ml-1">{s.unit}</span>}
              </p>
              <p className="text-xs text-bark tracking-wide mt-1">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Keyframe locale de l'indice de défilement */}
      <style>{`@keyframes scrollcue { 0% { transform: translateY(-100%);} 60% { transform: translateY(280%);} 100% { transform: translateY(280%);} }`}</style>
    </section>
  );
}
