import { useEffect, useState } from "react";
import { useInView, usePrefersReducedMotion } from "../lib/hooks";

const CHARS = "█▓▒░#/\\<>+=*·";

/**
 * Effet « scramble-decode » : le texte se brouille puis se résout
 * lettre par lettre quand il entre dans le viewport.
 */
export default function Scramble({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.2 });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(() =>
    text.replace(/[^\s]/g, (c, i) => ((i * 7) % 3 === 0 ? "░" : c))
  );

  useEffect(() => {
    if (reduced) {
      setDisplay(text);
      return;
    }
    if (!inView) return;
    let interval = 0;
    const timeout = window.setTimeout(() => {
      let frame = 0;
      const totalFrames = Math.max(16, Math.round(text.length * 2.4));
      interval = window.setInterval(() => {
        frame += 1;
        const locked = Math.floor((frame / totalFrames) * text.length);
        let out = text.slice(0, locked);
        for (let i = locked; i < text.length; i++) {
          out += text[i] === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setDisplay(out);
        if (locked >= text.length) {
          window.clearInterval(interval);
          setDisplay(text);
        }
      }, 30);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [inView, text, delay, reduced]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
}
