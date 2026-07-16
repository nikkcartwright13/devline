import useReveal from "../../hooks/useReveal";

export default function Reveal({ children, delay = 0, y = 22, style = {}, className }) {
  const [ref, seen] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: seen ? 1 : 0,
      transform: seen ? "none" : `translateY(${y}px)`,
      transition: `opacity .7s cubic-bezier(.2,.7,.3,1) ${delay}ms, transform .7s cubic-bezier(.2,.7,.3,1) ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}
