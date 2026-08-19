import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/hooks";

const HOVER_SELECTOR = "a, button, [role='button'], input, label, video, [data-cursor]";

/** Curseur personnalisé : point or + anneau en léger retard élastique. */
export function Cursor() {
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [finePointer, setFinePointer] = useState(false);
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!finePointer || reduced) return;
    document.body.classList.add("custom-cursor-on");
    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setActive(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%,-50%)`;
      }
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest?.(HOVER_SELECTOR));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.16;
      ring.y += (mouse.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      document.body.classList.remove("custom-cursor-on");
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [finePointer, reduced]);

  if (!finePointer || reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 z-[150] pointer-events-none w-1.5 h-1.5 rounded-full bg-gold transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 z-[149] pointer-events-none rounded-full border transition-all duration-300 ease-out ${
          hover ? "w-14 h-14 border-emerald/70 bg-emerald/10" : "w-9 h-9 border-sage/50"
        } ${pressed ? "scale-75" : "scale-100"} ${active ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}

/** Halo lumineux qui suit la souris (ambiance vivante du fond). */
export function GlowField() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    const pos = { ...mouse };
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const loop = () => {
      pos.x += (mouse.x - pos.x) * 0.055;
      pos.y += (mouse.y - pos.y) * 0.055;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduced]);

  if (reduced) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed left-0 top-0 z-0 pointer-events-none w-[70vmax] h-[70vmax] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(61,190,119,0.07) 0%, rgba(227,180,88,0.03) 32%, transparent 62%)",
      }}
    />
  );
}
