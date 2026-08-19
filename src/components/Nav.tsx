import { useEffect, useState } from "react";
import { ambience } from "../lib/audio";
import { useScrollY, useSmoothScrollTo } from "../lib/hooks";

const LINKS = [
  { id: "accueil", label: "Accueil" },
  { id: "film", label: "Le Film" },
  { id: "ecosysteme", label: "Écosystème" },
  { id: "journal", label: "Journal" },
  { id: "manifeste", label: "Manifeste" },
];

export default function Nav() {
  const scrollY = useScrollY();
  const scrollTo = useSmoothScrollTo();
  const [active, setActive] = useState("accueil");
  const [playing, setPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const scrolled = scrollY > 40;

  /* Barre de progression de lecture de la page */
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Section active */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const toggleAudio = () => {
    if (playing) {
      ambience.stop();
      setPlaying(false);
    } else {
      ambience.start();
      setPlaying(true);
    }
  };

  const go = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  return (
    <>
      {/* Progression */}
      <div className="fixed top-0 left-0 right-0 z-[130] h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-emerald via-gold to-emerald origin-left"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-500 ${
          scrolled
            ? "bg-pine/85 backdrop-blur-md border-b border-sage/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => go("accueil")}
            className="flex items-center gap-2.5 group"
            aria-label="Retour à l'accueil"
          >
            <svg viewBox="0 0 32 32" className="w-7 h-7 transition-transform duration-500 group-hover:rotate-[18deg]" fill="none">
              <path
                d="M16 4c5.5 3.4 8 8.6 8 13.6 0 4.6-3.4 8.8-8 10.4-4.6-1.6-8-5.8-8-10.4C8 12.6 10.5 7.4 16 4z"
                fill="#3DBE77"
              />
              <path d="M16 9v18" stroke="#07120B" strokeWidth="1.6" />
            </svg>
            <span className="font-display font-semibold tracking-[0.3em] text-sm text-mist">
              TERRA<span className="text-gold">·07</span>
            </span>
          </button>

          {/* Liens desktop */}
          <nav className="hidden lg:flex items-center gap-7">
            {LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className={`relative text-[13px] tracking-[0.14em] uppercase transition-colors duration-300 group ${
                  active === id ? "text-gold" : "text-sage hover:text-mist"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                    active === id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Ambiance sonore */}
            <button
              onClick={toggleAudio}
              aria-label={playing ? "Couper l'ambiance sonore" : "Activer l'ambiance sonore"}
              className={`h-9 px-3.5 rounded-full border flex items-center gap-2.5 transition-all duration-300 ${
                playing
                  ? "border-emerald/60 bg-emerald/10"
                  : "border-sage/25 bg-mist/5 hover:border-sage/50"
              }`}
            >
              {playing ? (
                <span className="flex items-end gap-[2.5px] h-3.5" aria-hidden="true">
                  <span className="w-[3px] h-full bg-emerald origin-bottom animate-eq-1 rounded-sm" />
                  <span className="w-[3px] h-full bg-emerald origin-bottom animate-eq-2 rounded-sm" />
                  <span className="w-[3px] h-full bg-gold origin-bottom animate-eq-3 rounded-sm" />
                  <span className="w-[3px] h-full bg-emerald origin-bottom animate-eq-4 rounded-sm" />
                </span>
              ) : (
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-sage" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5 6 9H2v6h4l5 4V5z" />
                  <line x1="22" y1="9" x2="16" y2="15" />
                  <line x1="16" y1="9" x2="22" y2="15" />
                </svg>
              )}
              <span className="hidden sm:flex flex-col items-start leading-none">
                <span className="text-[9px] tracking-[0.2em] text-bark uppercase">Ambiance</span>
                <span className={`text-[11px] font-bold tracking-widest ${playing ? "text-emerald" : "text-sage"}`}>
                  {playing ? "ON" : "OFF"}
                </span>
              </span>
            </button>

            {/* Burger mobile */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden w-9 h-9 rounded-full border border-sage/25 flex flex-col items-center justify-center gap-[5px]"
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <span className={`block h-[1.5px] w-4 bg-mist transition-all duration-300 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`block h-[1.5px] w-4 bg-mist transition-all duration-300 ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        className={`fixed inset-0 z-[110] lg:hidden transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-night/90 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <nav
          className={`absolute top-0 right-0 h-full w-72 bg-pine border-l border-sage/10 pt-24 px-8 flex flex-col gap-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {LINKS.map(({ id, label }, i) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="text-left font-display text-2xl font-semibold text-mist hover:text-gold transition-colors py-3 border-b border-sage/10 flex items-baseline gap-3"
            >
              <span className="text-[11px] text-bark font-sans tracking-widest">0{i + 1}</span>
              {label}
            </button>
          ))}
          <p className="mt-auto text-xs text-bark leading-relaxed">
            Réserve naturelle de Valbrune
            <br />
            Sentier des Hêtres, secteur 07
          </p>
        </nav>
      </div>
    </>
  );
}
