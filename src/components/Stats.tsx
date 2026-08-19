import { useCountUp, useInView } from "../lib/hooks";
import Reveal from "./Reveal";

const STATS = [
  {
    value: 84,
    suffix: " ha",
    label: "de forêt classée",
    detail: "Protégée en réserve intégrale depuis 1987, sans exploitation.",
    offset: "",
  },
  {
    value: 1204,
    suffix: "",
    label: "espèces inventoriées",
    detail: "Du coléoptère cavernicole au balbuzard pêcheur de passage.",
    offset: "lg:mt-14",
  },
  {
    value: 96,
    suffix: " %",
    label: "de canopée continue",
    detail: "L'une des couvertures arborées les plus denses d'Europe.",
    offset: "lg:mt-6",
  },
  {
    value: 12,
    suffix: " km",
    label: "de sentiers balisés",
    detail: "Traversée douce, ouverte du lever du jour au crépuscule.",
    offset: "lg:mt-20",
  },
];

function StatBlock({
  value,
  suffix,
  label,
  detail,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  detail: string;
  delay: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const n = useCountUp(value, inView);
  return (
    <div ref={ref}>
      <Reveal variant="up" delay={delay}>
        <div className="relative border-t border-sage/15 pt-6">
          <span className="absolute -top-[5px] left-0 w-9 h-[3px] bg-gold" aria-hidden="true" />
          <p className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-mist tabular-nums leading-none">
            {n.toLocaleString("fr-FR")}
            <span className="text-gold text-2xl sm:text-3xl align-baseline">{suffix}</span>
          </p>
          <p className="mt-3 text-[13px] tracking-[0.18em] uppercase text-emerald">{label}</p>
          <p className="mt-2 text-sm text-bark leading-relaxed">{detail}</p>
        </div>
      </Reveal>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-24 sm:py-28 bg-gradient-to-b from-night via-pine/60 to-night overflow-hidden">
      <div
        className="absolute -right-32 top-0 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(227,180,88,0.06), transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <Reveal variant="fade">
              <p className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-gold mb-4">
                <span className="h-px w-10 bg-gold" /> 04 — En chiffres
              </p>
            </Reveal>
            <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.4rem)] text-mist">
              <Reveal variant="mask"><span className="block">La réserve, mesurée</span></Reveal>
              <Reveal variant="mask" delay={120}><span className="block text-outline">pas à pas.</span></Reveal>
            </h2>
          </div>
          <Reveal variant="fade" delay={200}>
            <p className="text-sm text-bark max-w-xs sm:text-right">
              Relevés consolidés chaque hiver par l'équipe scientifique — dernier inventaire : janvier 2026.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
          {STATS.map((s, i) => (
            <div key={s.label} className={s.offset}>
              <StatBlock {...s} delay={i * 120} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
