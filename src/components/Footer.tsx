import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useSmoothScrollTo } from "../lib/hooks";
import Reveal from "./Reveal";

const EXPLORE = [
  { id: "accueil", label: "Accueil" },
  { id: "film", label: "Le film" },
  { id: "ecosysteme", label: "L'écosystème" },
  { id: "journal", label: "Journal de terrain" },
  { id: "manifeste", label: "Le manifeste" },
];

export default function Footer() {
  const scrollTo = useSmoothScrollTo();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [clock, setClock] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" });
    const update = () => setClock(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <footer id="contact" className="relative bg-pine border-t border-sage/10 overflow-hidden">
      <div className="absolute inset-0 topo-lines opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-10">
        <div className="grid lg:grid-cols-[7fr_5fr] gap-14 pb-16 border-b border-sage/10">
          {/* Lettre de la clairière */}
          <div>
            <Reveal variant="fade">
              <p className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-gold mb-4">
                <span className="h-px w-10 bg-gold" /> 07 — Garder le lien
              </p>
            </Reveal>
            <h2 className="font-display font-bold text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] text-mist">
              <Reveal variant="mask"><span className="block">Restons</span></Reveal>
              <Reveal variant="mask" delay={120}><span className="block text-emerald">racinés.</span></Reveal>
            </h2>
            <Reveal variant="up" delay={200}>
              <p className="text-sage/90 max-w-md leading-relaxed mt-6 mb-8">
                Une lettre par saison : les relevés de l'équipe, les dates d'affût, les nouvelles
                de la canopée. Rien d'autre — la forêt déteste le bruit inutile.
              </p>
            </Reveal>

            {status === "success" ? (
              <Reveal variant="scale">
                <div className="flex items-center gap-4 border border-emerald/50 bg-emerald/10 px-6 py-5 max-w-lg">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-emerald shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m8 12.5 2.5 2.5L16 9.5" />
                  </svg>
                  <p className="text-mist text-sm">
                    <strong className="font-display">Bienvenue dans la clairière.</strong>
                    <br />
                    <span className="text-sage">La prochaine lettre partira à l'équinoxe.</span>
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal variant="up" delay={280}>
                <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-lg" noValidate>
                  <label htmlFor="nl-email" className="sr-only">
                    Adresse e-mail
                  </label>
                  <input
                    id="nl-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="votre@adresse.fr"
                    className={`flex-1 bg-night/70 border px-5 py-3.5 text-mist placeholder:text-bark/70 outline-none transition-colors duration-300 focus:border-gold ${
                      status === "error" ? "border-gold" : "border-sage/25"
                    }`}
                  />
                  <button
                    type="submit"
                    className="group bg-gold text-night font-display font-semibold px-7 py-3.5 hover:bg-emerald transition-colors duration-300 whitespace-nowrap"
                  >
                    <span className="flex items-center justify-center gap-2">
                      S'abonner
                      <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </button>
                </form>
                {status === "error" && (
                  <p className="mt-3 text-sm text-gold">
                    Adresse invalide — la chouette n'a pas trouvé votre boîte. Réessayez ?
                  </p>
                )}
              </Reveal>
            )}
          </div>

          {/* Colonnes pratiques */}
          <div className="grid grid-cols-2 gap-10 content-start">
            <Reveal variant="up" delay={150}>
              <div>
                <h3 className="text-[11px] tracking-[0.3em] uppercase text-bark mb-5">Explorer</h3>
                <ul className="space-y-3">
                  {EXPLORE.map((l) => (
                    <li key={l.id}>
                      <button
                        onClick={() => scrollTo(l.id)}
                        className="group text-sm text-sage hover:text-gold transition-colors duration-300 flex items-center gap-2"
                      >
                        <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" />
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal variant="up" delay={250}>
              <div>
                <h3 className="text-[11px] tracking-[0.3em] uppercase text-bark mb-5">Nous trouver</h3>
                <ul className="space-y-3 text-sm text-sage">
                  <li>Maison de la réserve<br /><span className="text-bark">Sentier des Hêtres, secteur 07</span></li>
                  <li>
                    <a href="mailto:contact@terra07.fr" className="hover:text-gold transition-colors duration-300">
                      contact@terra07.fr
                    </a>
                  </li>
                  <li>
                    <a href="tel:+33100070707" className="hover:text-gold transition-colors duration-300">
                      +33 1 00 07 07 07
                    </a>
                  </li>
                  <li className="text-bark">Ouvert de l'aube au crépuscule,<br />tous les jours, toutes saisons.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Barre finale */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" aria-hidden="true">
              <path d="M16 4c5.5 3.4 8 8.6 8 13.6 0 4.6-3.4 8.8-8 10.4-4.6-1.6-8-5.8-8-10.4C8 12.6 10.5 7.4 16 4z" fill="#3DBE77" />
              <path d="M16 9v18" stroke="#07120B" strokeWidth="1.6" />
            </svg>
            <p className="text-xs text-bark">
              © 2026 TERRA·07 — Réserve naturelle de Valbrune. Fiction documentaire, conçue avec soin.
            </p>
          </div>

          <p className="flex items-center gap-2.5 text-xs text-sage tabular-nums">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-blink" aria-hidden="true" />
            Valbrune — {clock || "…"} · forêt éveillée
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Revenir en haut de page"
            className="group w-11 h-11 rounded-full border border-sage/30 flex items-center justify-center text-sage hover:border-gold hover:text-night hover:bg-gold transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
