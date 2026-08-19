import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
import { CHAPTERS, IMG, VIDEO_SRC } from "../lib/assets";
import Reveal from "./Reveal";
import Scramble from "./Scramble";

const RATES = [1, 1.25, 1.5, 2, 0.75];

function fmt(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export default function Film() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [isFull, setIsFull] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [dragging, setDragging] = useState(false);

  /* Masque les contrôles pendant la lecture si la souris ne bouge plus */
  const poke = () => {
    setControlsVisible(true);
    window.clearTimeout(hideTimer.current);
    if (playing) {
      hideTimer.current = window.setTimeout(() => setControlsVisible(false), 2600);
    }
  };
  useEffect(() => () => window.clearTimeout(hideTimer.current), []);
  useEffect(() => {
    if (!playing) setControlsVisible(true);
    else poke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  /* Pause automatique quand le lecteur sort de l'écran */
  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting && videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onFs = () => setIsFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setStarted(true);
    } else {
      v.pause();
    }
  };

  const seekTo = (clientX: number) => {
    const v = videoRef.current;
    const bar = barRef.current;
    if (!v || !bar || !duration) return;
    const r = bar.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    v.currentTime = pct * duration;
    setCurrent(v.currentTime);
  };

  const cycleRate = () => {
    const next = RATES[(RATES.indexOf(rate) + 1) % RATES.length];
    setRate(next);
    if (videoRef.current) videoRef.current.playbackRate = next;
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const setVol = (val: number) => {
    const v = videoRef.current;
    setVolume(val);
    if (v) {
      v.volume = val;
      v.muted = val === 0;
      setMuted(v.muted);
    }
  };

  const toggleFull = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void shellRef.current?.requestFullscreen();
  };

  const onKey = (e: ReactKeyboardEvent) => {
    const v = videoRef.current;
    if (!v) return;
    switch (e.key) {
      case " ":
      case "k":
        e.preventDefault();
        toggle();
        break;
      case "ArrowRight":
        v.currentTime = Math.min(v.duration || 0, v.currentTime + 5);
        break;
      case "ArrowLeft":
        v.currentTime = Math.max(0, v.currentTime - 5);
        break;
      case "f":
        toggleFull();
        break;
      case "m":
        toggleMute();
        break;
    }
    poke();
  };

  const activeChapter =
    [...CHAPTERS].reverse().find((c) => current >= c.time)?.label ?? CHAPTERS[0].label;

  const playPct = duration ? (current / duration) * 100 : 0;
  const bufPct = duration ? (buffered / duration) * 100 : 0;

  return (
    <section id="film" className="relative py-24 sm:py-32 bg-pine overflow-hidden">
      {/* lueur d'ambiance */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full blur-3xl transition-opacity duration-1000 pointer-events-none ${
          playing ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "radial-gradient(circle, rgba(61,190,119,0.12), transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 topo-lines opacity-40 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        {/* En-tête de section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <Reveal variant="fade">
              <p className="flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-gold mb-4">
                <span className="h-px w-10 bg-gold" /> 02 — Le film
              </p>
            </Reveal>
            <h2 className="font-display font-bold text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.02] text-mist">
              <Reveal variant="mask">
                <span className="block">
                  Une saison <Scramble text="sous la canopée" delay={150} />
                </span>
              </Reveal>
            </h2>
          </div>
          <Reveal variant="up" delay={200}>
            <div className="text-sm text-bark space-y-1 lg:text-right">
              <p>
                Court-métrage · <span className="text-sage">09 min 56</span> · capté in situ
              </p>
              <p>
                État : <span className={`font-bold tracking-widest ${playing ? "text-emerald" : "text-gold"}`}>{playing ? "EN LECTURE" : "EN PAUSE"}</span>
                <span className={`inline-block w-1.5 h-1.5 rounded-full ml-2 align-middle ${playing ? "bg-emerald animate-blink" : "bg-gold"}`} />
              </p>
            </div>
          </Reveal>
        </div>

        {/* ——— Lecteur ——— */}
        <Reveal variant="scale" duration={1100}>
          <div className="relative">
            {/* coins documentaires */}
            {["-top-3 -left-3 border-t-2 border-l-2", "-top-3 -right-3 border-t-2 border-r-2", "-bottom-3 -left-3 border-b-2 border-l-2", "-bottom-3 -right-3 border-b-2 border-r-2"].map(
              (pos) => (
                <span key={pos} className={`absolute w-7 h-7 border-gold/70 z-20 pointer-events-none ${pos}`} aria-hidden="true" />
              )
            )}

            <div
              ref={shellRef}
              tabIndex={0}
              role="region"
              aria-label="Lecteur vidéo — Une saison sous la canopée"
              onKeyDown={onKey}
              onMouseMove={poke}
              onTouchStart={poke}
              className={`group relative aspect-video bg-black rounded-md overflow-hidden border border-sage/15 outline-none focus-visible:ring-2 focus-visible:ring-gold/70 shadow-[0_30px_80px_rgba(0,0,0,0.55)] ${
                playing && !controlsVisible ? "cursor-none" : ""
              }`}
            >
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                poster={IMG.poster}
                preload="metadata"
                playsInline
                onClick={toggle}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  setCurrent(v.currentTime);
                  if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1));
                }}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onEnded={() => setPlaying(false)}
                className="w-full h-full object-cover"
              />

              {/* badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-mist/90 bg-night/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-mist/10 pointer-events-none">
                <span className={`w-1.5 h-1.5 rounded-full ${playing ? "bg-emerald animate-blink" : "bg-gold"}`} />
                Terra·07 — Saison 01
              </div>
              <div className="absolute top-4 right-4 text-[10px] tracking-[0.25em] uppercase text-mist/60 bg-night/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-mist/10 pointer-events-none hidden sm:block">
                Chapitre · {activeChapter}
              </div>

              {/* gros bouton play */}
              {!playing && (
                <div className="absolute inset-0 flex items-center justify-center bg-night/30 transition-opacity duration-300">
                  <button
                    onClick={toggle}
                    aria-label={started ? "Reprendre la lecture" : "Lancer le film"}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-gold bg-night/60 backdrop-blur-sm flex items-center justify-center text-gold hover:bg-gold hover:text-night transition-all duration-300 hover:scale-105"
                  >
                    <span className="absolute inset-0 rounded-full border border-gold/60 animate-pulse-ring" aria-hidden="true" />
                    <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-9 sm:h-9 translate-x-0.5" fill="currentColor">
                      <path d="M7 4.5v15l13-7.5-13-7.5z" />
                    </svg>
                  </button>
                </div>
              )}

              {/* ——— Contrôles ——— */}
              <div
                className={`absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-night/95 via-night/60 to-transparent px-4 sm:px-6 pt-14 pb-3.5 transition-all duration-500 ${
                  controlsVisible || !playing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
                }`}
              >
                {/* barre de progression */}
                <div
                  ref={barRef}
                  role="slider"
                  aria-label="Position de lecture"
                  aria-valuemin={0}
                  aria-valuemax={Math.round(duration) || 0}
                  aria-valuenow={Math.round(current)}
                  tabIndex={-1}
                  onPointerDown={(e) => {
                    setDragging(true);
                    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
                    seekTo(e.clientX);
                  }}
                  onPointerMove={(e) => dragging && seekTo(e.clientX)}
                  onPointerUp={() => setDragging(false)}
                  className="group/bar relative h-5 flex items-center cursor-pointer"
                >
                  <div className="relative w-full h-[4px] rounded-full bg-mist/15 overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-mist/20" style={{ width: `${bufPct}%` }} />
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald to-gold"
                      style={{ width: `${playPct}%` }}
                    />
                  </div>
                  <div
                    className={`absolute w-3.5 h-3.5 rounded-full bg-gold shadow-[0_0_12px_rgba(227,180,88,0.8)] -translate-x-1/2 transition-transform duration-150 ${
                      dragging ? "scale-125" : "scale-0 group-hover/bar:scale-100"
                    }`}
                    style={{ left: `${playPct}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center gap-3 sm:gap-4">
                  {/* lecture */}
                  <button onClick={toggle} aria-label={playing ? "Pause" : "Lecture"} className="text-mist hover:text-gold transition-colors">
                    {playing ? (
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M7 4.5v15l13-7.5-13-7.5z" /></svg>
                    )}
                  </button>

                  <span className="text-xs sm:text-sm tabular-nums text-mist/90 min-w-[86px]">
                    {fmt(current)} <span className="text-bark">/ {fmt(duration)}</span>
                  </span>

                  <div className="flex-1" />

                  {/* vitesse */}
                  <button
                    onClick={cycleRate}
                    className="text-[11px] font-bold tracking-wider text-sage border border-sage/30 rounded-full px-2.5 py-1 hover:border-gold hover:text-gold transition-colors tabular-nums"
                    aria-label={`Vitesse de lecture : ${rate}x`}
                  >
                    {rate}×
                  </button>

                  {/* volume */}
                  <div className="hidden sm:flex items-center gap-2.5">
                    <button onClick={toggleMute} aria-label={muted ? "Rétablir le son" : "Couper le son"} className="text-mist hover:text-gold transition-colors">
                      {muted || volume === 0 ? (
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z" /><line x1="22" y1="9" x2="16" y2="15" /><line x1="16" y1="9" x2="22" y2="15" /></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9.5 9.5 0 0 1 0 13" /></svg>
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={muted ? 0 : volume}
                      onChange={(e) => setVol(parseFloat(e.target.value))}
                      className="vol w-20"
                      style={{ "--fill": `${(muted ? 0 : volume) * 100}%` } as CSSProperties}
                      aria-label="Volume"
                    />
                  </div>

                  {/* plein écran */}
                  <button onClick={toggleFull} aria-label={isFull ? "Quitter le plein écran" : "Plein écran"} className="text-mist hover:text-gold transition-colors">
                    {isFull ? (
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v5H3M16 3v5h5M8 21v-5H3M16 21v-5h5" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8V3h5M21 8V3h-5M3 16v5h5M21 16v5h-5" /></svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Chapitres */}
        <Reveal variant="up" delay={150}>
          <div className="mt-10 flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] tracking-[0.3em] uppercase text-bark mr-2">Chapitres</span>
            {CHAPTERS.map((c) => {
              const isActive = activeChapter === c.label;
              return (
                <button
                  key={c.label}
                  onClick={() => {
                    const v = videoRef.current;
                    if (!v) return;
                    v.currentTime = c.time;
                    void v.play();
                    setStarted(true);
                  }}
                  className={`group flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs tracking-wide transition-all duration-300 ${
                    isActive
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-sage/20 text-sage hover:border-emerald/60 hover:text-mist hover:-translate-y-0.5"
                  }`}
                >
                  <span className="tabular-nums text-[10px] opacity-70">{fmt(c.time)}</span>
                  {c.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal variant="fade" delay={250}>
          <p className="mt-8 text-sm text-bark max-w-2xl leading-relaxed">
            Réalisation — collectif <span className="text-sage">Sylva</span>. Image tournée au sol et en
            canopée, ambiances sonores captées in situ. <span className="text-gold">Espace</span> pour lire,
            <span className="text-gold"> ←/→ </span> pour naviguer, <span className="text-gold">F</span> plein écran,
            <span className="text-gold"> M </span> muet.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
