import { useReveal } from "../../hooks/useReveal";

export function Reveal({ children, className = "", delay = 0, dir = "", style = {} }) {
  const ref = useReveal();
  const cls = dir === "left" ? "reveal-left" : dir === "right" ? "reveal-right" : "reveal";
  return (
    <div ref={ref} className={`${cls} ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}
