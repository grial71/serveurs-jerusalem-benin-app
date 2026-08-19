import type { PropsWithChildren } from "react";
import { IMG } from "../lib/assets";
import { useSmoothScrollTo } from "../lib/hooks";
import Reveal from "./Reveal";

function Icon({ children }: PropsWithChildren) {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-8 h-8 text-emerald transition-colors duration-300 group-hover:text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const LAYERS = [
  {
    index: "I",
    title: "La canopée",
    text: "Trente mètres au-dessus du sol, un océan de hêtres et de chênes où pics, chouettes et martres vivent sans presque jamais descendre. C'est là que la réserve capte la lumière — et la plupart de ses sons.",
    tags: ["1 200 espèces", "30 m de haut", "Pics & chouettes"],
    icon: (
      <Icon>
        <path d="M16 28V14" />
        <path d="M16 14c0-6 4-10 11-10 0 7-4 10-11 10z" />
        <path d="M16 20c0-4.5-3-7-8.5-7 0 5.5 3 7 8.5 7z" />
      </Icon>
    ),
  },
  {
    index: "II",
    title: "Le mycélium",
    text: "Sous vos pieds, 40 kilomètres de filaments par mètre carré relient les arbres entre eux. Ce réseau échange sucres, alertes et mémoire — les forestiers de Valbrune l'appellent « la phrase ».",
    tags: ["40 km / m²", "Réseau souterrain", "Symbiose"],
    icon: (
      <Icon>
        <circle cx="8" cy="8" r="2.6" />
        <circle cx="24" cy="10" r="2.6" />
        <circle cx="16" cy="22" r="2.6" />
        <circle cx="26" cy="25" r="2" />
        <path d="M10.3 9.2 14 20M18 20.8l6-9M18.4 23.3l5.8 1.4" />
      </Icon>
    ),
  },
  {
    index: "III",
    title: "Les clairières",
    text: "Quand un géant tombe, la lumière entre. Orchidées, gentianes et deux cents espèces d'insectes colonisent l'ouverture en moins de trois étés. La clairière est la salle de naissance de la forêt.",
    tags: ["Orchidées", "200+ insectes", "Régénération"],
    icon: (
      <Icon>
        <circle cx="16" cy="16" r="5" />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M24.5 7.5l-2.8 2.8M10.3 21.7l-2.8 2.8" />
      </Icon>
    ),
  },
  {
    index: "IV",
    title: "Les ruisseaux",
    text: "Le ruisseau des Aulnes traverse la réserve sur 6 kilomètres d'eau noire et froide. Salamandres, écrevisses à pattes blanches et moules perlières y trouvent l'un des derniers refuges de la région.",
    tags: ["6 km d'eau vive", "Salamandres", "Eau de source"],
    icon: (
      <Icon>
        <path d="M16 4s7 8.4 7 14a7 7 0 0 1-14 0c0-5.6 7-14 7-14z" />
        <path d="M12.5 19a3.5 3.5 0 0 0 3.5 3.5" />
      </Icon>
    ),
  },
];

export default function Ecosystem() {
  const scrollTo = useSmoothScrollTo();

  return (
    <section id="ecosysteme" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20">
        {/* ——— Colonne collante ——— */}
        <div className="lg:sticky lg:top-28 self-start">
          <Reveal variant="fade">
            <p className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-gold mb-4">
              <span className="h-px w-10 bg-gold" /> 03 — Écosystème
            </p>
          </Reveal>
          <h2 className="font-display font-bold text-[clamp(2.2rem,5vw,3.9rem)] leading-[1.02] text-mist mb-6">
            <Reveal variant="mask"><span className="block">Ce que la forêt</span></Reveal>
            <Reveal variant="mask" delay={120}><span className="block text-emerald">abrite, étage</span></Reveal>
            <Reveal variant="mask" delay={240}><span className="block text-outline-gold">par étage.</span></Reveal>
          </h2>
          <Reveal variant="up" delay={300}>
            <p className="text-sage/90 leading-relaxed max-w-md mb-9">
              Une forêt ancienne n'est pas un décor : c'est une architecture vivante, stratifiée de
              la cime des arbres jusqu'aux galeries du sol. Quatre étages, quatre mondes — tous
              indispensables les uns aux autres.
            </p>
          </Reveal>

          {/* Image macro, respiration au survol */}
          <Reveal variant="scale" delay={350}>
            <div className="group relative max-w-md overflow-hidden rounded-md border border-sage/15">
              <img
                src={IMG.canopy}
                alt="Fougères en développement couvertes de rosée sur le sol forestier"
                loading="lazy"
                className="w-full aspect-[4/5] object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-1">Sous-étage</p>
                  <p className="text-sm text-mist">Fougères & rosée, relevé n°7</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald animate-blink" aria-hidden="true" />
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={420}>
            <button
              onClick={() => scrollTo("journal")}
              className="group mt-8 inline-flex items-center gap-3 text-sm text-mist border-b border-gold/60 pb-1 hover:text-gold hover:gap-4 transition-all duration-300"
            >
              Lire le journal de terrain
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </Reveal>
        </div>

        {/* ——— Cartes des étages ——— */}
        <div className="space-y-5">
          {LAYERS.map((layer, i) => (
            <Reveal key={layer.index} variant="right" delay={i * 110}>
              <article className="group relative border border-sage/12 bg-pine/80 p-7 sm:p-9 overflow-hidden transition-all duration-500 hover:border-emerald/45 hover:bg-pine hover:translate-x-2">
                {/* liseré vivant */}
                <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-emerald to-gold origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" aria-hidden="true" />
                {/* indice romain */}
                <span className="absolute -top-4 right-2 font-display font-bold text-[6.5rem] leading-none text-outline opacity-40 group-hover:opacity-90 transition-opacity duration-500 select-none" aria-hidden="true">
                  {layer.index}
                </span>

                <div className="relative">
                  {layer.icon}
                  <h3 className="font-display font-semibold text-2xl sm:text-[1.7rem] text-mist mt-4 mb-3">
                    {layer.title}
                  </h3>
                  <p className="text-sage/85 leading-relaxed text-[15px] max-w-lg">{layer.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {layer.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] tracking-wide text-gold border border-gold/25 bg-gold/5 px-2.5 py-1 rounded-full group-hover:border-gold/50 transition-colors duration-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
