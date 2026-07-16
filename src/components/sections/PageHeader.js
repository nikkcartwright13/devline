import { T, DARK, mono, display } from "../../theme";
import Reveal from "../ui/Reveal";
import Orb from "../ui/Orb";

export default function PageHeader({ eyebrow, title, text }) {
  return (
    <section style={{ position: "relative", background: DARK, color: "#fff", overflow: "hidden" }}>
      <Orb size={340} top="-120px" left="-100px" colors={[T.blue, "transparent"]} dur={14} />
      <Orb size={280} bottom="-140px" right="-80px" colors={[T.violet, "transparent"]} dur={11} delay={1} />

      <div className="max-w-6xl mx-auto px-5 pt-20 pb-16 md:pt-28 md:pb-20 relative">
        <Reveal>
          {eyebrow && (
            <span style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: "#A5B8E8", border: "1px solid rgba(255,255,255,.18)", borderRadius: 999, padding: "7px 16px", display: "inline-block" }}>
              {eyebrow}
            </span>
          )}
          <h1 style={{ ...display, fontWeight: 700, fontSize: "clamp(30px,5vw,52px)", lineHeight: 1.15, maxWidth: 760, marginTop: 22 }}>
            {title}
          </h1>
          {text && (
            <p style={{ fontSize: 16.5, color: "#B9C6E6", maxWidth: 560, marginTop: 18, lineHeight: 1.75 }}>
              {text}
            </p>
          )}
        </Reveal>
      </div>

      <svg aria-hidden viewBox="0 0 1440 90" style={{ display: "block", width: "100%", marginBottom: -1 }}>
        <path d="M0,60 C360,110 1080,0 1440,50 L1440,90 L0,90 Z" fill={T.base} />
      </svg>
    </section>
  );
}
