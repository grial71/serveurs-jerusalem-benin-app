import type { PropsWithChildren } from "react";
import { useInView } from "../lib/hooks";

type Variant = "up" | "fade" | "left" | "right" | "scale" | "mask";

const HIDDEN: Record<Variant, string> = {
  up: "opacity-0 translate-y-12",
  fade: "opacity-0",
  left: "opacity-0 -translate-x-14",
  right: "opacity-0 translate-x-14",
  scale: "opacity-0 scale-[0.94]",
  mask: "translate-y-[112%]",
};
const SHOWN: Record<Variant, string> = {
  up: "opacity-100 translate-y-0",
  fade: "opacity-100",
  left: "opacity-100 translate-x-0",
  right: "opacity-100 translate-x-0",
  scale: "opacity-100 scale-100",
  mask: "translate-y-0",
};

type Props = PropsWithChildren<{
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  innerClassName?: string;
}>;

/**
 * Révélation au défilement. Le variant « mask » produit l'effet
 * « line-mask reveal » (le texte glisse hors d'un masque).
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 950,
  className = "",
  innerClassName = "",
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const style = {
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
  };

  if (variant === "mask") {
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <div
          style={style}
          className={`transform-gpu transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] ${
            inView ? SHOWN.mask : HIDDEN.mask
          } ${innerClassName}`}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={style}
      className={`transform-gpu transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${
        inView ? SHOWN[variant] : HIDDEN[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}
