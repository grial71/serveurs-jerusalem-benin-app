const WORDS = [
  "Canopée",
  "Mycélium",
  "Hêtraie",
  "Sève",
  "Clairière",
  "Sylve",
  "Tourbière",
  "Luzule",
];

function Leaf() {
  return (
    <svg viewBox="0 0 32 32" className="w-4 h-4 shrink-0 opacity-70" fill="currentColor" aria-hidden="true">
      <path d="M16 4c5.5 3.4 8 8.6 8 13.6 0 4.6-3.4 8.8-8 10.4-4.6-1.6-8-5.8-8-10.4C8 12.6 10.5 7.4 16 4z" />
    </svg>
  );
}

function Band({ reverse = false, className = "" }: { reverse?: boolean; className?: string }) {
  return (
    <div
      className={`flex w-max whitespace-nowrap ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      } ${className}`}
    >
      {[0, 1].map((dup) => (
        <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
          {WORDS.map((w) => (
            <span key={`${dup}-${w}`} className="flex items-center">
              <span className="font-display font-semibold text-xl sm:text-2xl tracking-[0.22em] uppercase px-6 sm:px-10">
                {w}
              </span>
              <Leaf />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Double ruban de mots croisés, signatures du site. */
export default function Marquee() {
  return (
    <div className="relative py-10 overflow-hidden select-none" aria-hidden="true">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[1.6deg]">
        <div className="border-y border-sage/20 py-3.5 overflow-hidden">
          <Band reverse className="text-sage/40" />
        </div>
      </div>
      <div className="relative inset-x-[-5%] rotate-[-2deg]">
        <div className="bg-gold text-night py-3.5 overflow-hidden shadow-[0_10px_40px_rgba(227,180,88,0.15)]">
          <Band />
        </div>
      </div>
    </div>
  );
}
