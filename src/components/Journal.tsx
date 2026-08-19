import Reveal from "./Reveal";

const ENTRIES = [
  {
    time: "05:12",
    title: "Lever de brume sur la futaie",
    text: "La nappe de brouillard se déchire au-dessus de la parcelle 12. Les hêtres apparaissent un à un, comme développés dans un bain argentique.",
    tag: "Météo",
  },
  {
    time: "06:47",
    title: "Premier chant du pouillot véloce",
    text: "Secteur nord, à hauteur d'homme. Deux phrases, puis silence. La forêt écoute avant de répondre — c'est la règle ici.",
    tag: "Ornithologie",
  },
  {
    time: "11:03",
    title: "Traces de cerf au ruisseau des Aulnes",
    text: "Empreintes fraîches de dix centimètres, bord net. Le mâle du vallon est passé dans la nuit, probablement accompagné.",
    tag: "Mammifères",
  },
  {
    time: "15:38",
    title: "Spores en suspension, lumière rasante",
    text: "Un rayon traverse la clairière et révèle des milliers de spores en vol. On photographie ce que la forêt respire.",
    tag: "Botanique",
  },
  {
    time: "19:20",
    title: "Renard roux en lisière ouest",
    text: "Vingt minutes d'observation sans jumelles. Il chasse à l'oreille dans les feuilles mortes, sautille, plonge, repart bredouille et digne.",
    tag: "Mammifères",
  },
  {
    time: "21:56",
    title: "La chouette hulotte ouvre la nuit",
    text: "Premier hululement depuis le chêne doyen. La canopée se tait d'un coup, puis reprend son murmure. Fin du relevé.",
    tag: "Ornithologie",
  },
];

export default function Journal() {
  return (
    <section id="journal" className="relative py-24 sm:py-32 bg-pine overflow-hidden">
      <div className="absolute inset-0 topo-lines opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[5fr_7fr] gap-14 lg:gap-20">
        {/* Colonne collante */}
        <div className="lg:sticky lg:top-28 self-start">
          <Reveal variant="fade">
            <p className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-gold mb-4">
              <span className="h-px w-10 bg-gold" /> 05 — Journal de terrain
            </p>
          </Reveal>
          <h2 className="font-display font-bold text-[clamp(2.2rem,5vw,3.9rem)] leading-[1.02] text-mist mb-6">
            <Reveal variant="mask"><span className="block">Vingt-quatre heures</span></Reveal>
            <Reveal variant="mask" delay={120}><span className="block text-outline-gold">dans la brume.</span></Reveal>
          </h2>
          <Reveal variant="up" delay={200}>
            <p className="text-sage/90 leading-relaxed max-w-md mb-9">
              Extrait authentique du carnet de relevés tenu par les gardes de la réserve. Une
              journée ordinaire — c'est-à-dire extraordinaire — dans le secteur nord.
            </p>
          </Reveal>

          <Reveal variant="left" delay={260}>
            <div className="relative max-w-sm border border-gold/25 bg-night/60 p-6">
              <span className="absolute -top-3 left-6 text-[10px] tracking-[0.3em] uppercase text-night bg-gold px-2.5 py-1">
                Carnet n°7
              </span>
              <dl className="grid grid-cols-2 gap-y-3 text-sm">
                <dt className="text-bark">Date</dt>
                <dd className="text-mist text-right font-medium">14 mars 2026</dd>
                <dt className="text-bark">Secteur</dt>
                <dd className="text-mist text-right font-medium">Nord — P.12</dd>
                <dt className="text-bark">Température</dt>
                <dd className="text-mist text-right font-medium">4 °C au lever</dd>
                <dt className="text-bark">Vent</dt>
                <dd className="text-mist text-right font-medium">6 km/h, NO</dd>
                <dt className="text-bark">Lune</dt>
                <dd className="text-mist text-right font-medium">Gibbeuse, 91 %</dd>
              </dl>
              <p className="mt-5 pt-4 border-t border-sage/10 text-xs text-bark italic leading-relaxed">
                « Note de l'équipe : penser à remplacer la pile du capteur sonore de la
                parcelle 9 avant l'orage annoncé. »
              </p>
            </div>
          </Reveal>
        </div>

        {/* Fil du temps */}
        <div className="relative">
          <span className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/60 via-sage/20 to-transparent" aria-hidden="true" />
          <ol className="space-y-10">
            {ENTRIES.map((e, i) => (
              <Reveal key={e.time} variant="left" delay={i * 90}>
                <li className="group relative pl-10">
                  <span
                    className="absolute left-0 top-1.5 w-[15px] h-[15px] rotate-45 border-2 border-gold bg-night transition-all duration-300 group-hover:bg-gold group-hover:shadow-[0_0_16px_rgba(227,180,88,0.7)]"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <time className="font-display font-bold text-xl text-gold tabular-nums">{e.time}</time>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-emerald border border-emerald/30 px-2 py-0.5 rounded-full">
                      {e.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg sm:text-xl text-mist mb-1.5 transition-colors duration-300 group-hover:text-gold">
                    {e.title}
                  </h3>
                  <p className="text-sage/85 text-[15px] leading-relaxed max-w-xl">{e.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
