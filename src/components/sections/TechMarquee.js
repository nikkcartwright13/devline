import { T, mono } from "../../theme";
import { TECHS } from "../../data/techs";

export default function TechMarquee() {
  return (
    <div style={{ overflow: "hidden", padding: "26px 0", borderBottom: `1px solid ${T.border}` }}>
      <div style={{ display: "flex", gap: 48, width: "max-content", animation: "dl-marquee 28s linear infinite" }}>
        {[...TECHS, ...TECHS].map((t, i) => (
          <span key={i} style={{ ...mono, fontSize: 14, color: T.muted, whiteSpace: "nowrap" }}>
            <span style={{ color: T.blue }}>◆</span>&nbsp; {t}
          </span>
        ))}
      </div>
    </div>
  );
}
