import { useRef, useState } from "react";

export default function Tilt3D({ children, max = 12, scale = 1.03, style = {} }) {
  const ref = useRef(null);
  const reduced = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)[0];
  const [t, setT] = useState({ rx: 0, ry: 0, active: false });

  if (reduced) return <div style={style}>{children}</div>;

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: -(py - 0.5) * 2 * max, ry: (px - 0.5) * 2 * max, active: true });
  }

  function onLeave() {
    setT({ rx: 0, ry: 0, active: false });
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ perspective: 1200, ...style }}>
      <div
        style={{
          position: "relative",
          transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${t.active ? scale : 1})`,
          transition: t.active ? "transform .08s linear" : "transform .6s cubic-bezier(.2,.7,.3,1)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 50,
            opacity: t.active ? 1 : 0,
            transition: "opacity .3s ease",
            background: `radial-gradient(circle at ${50 + t.ry * 2.6}% ${50 - t.rx * 2.6}%, rgba(255,255,255,.2), transparent 50%)`,
          }}
        />
      </div>
    </div>
  );
}
