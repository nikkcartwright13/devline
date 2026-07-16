import { useEffect, useState } from "react";
import { T, GRAD, DARK, mono } from "../../theme";

const DOTS = ["#FF5F57", "#FEBC2E", "#28C840"];

const TOKEN_COLOR = {
  kw: "#C084FC",
  fn: "#60A5FA",
  tag: "#F87171",
  attr: "#FBBF24",
  str: "#34D399",
  p: "#8FA3D6",
};

const CODE_LINES = [
  [{ t: "kw", v: "export default function " }, { t: "fn", v: "Hero" }, { t: "p", v: "() {" }],
  [{ t: "p", v: "  return (" }],
  [{ t: "tag", v: "    <section " }, { t: "attr", v: "className" }, { t: "p", v: "=" }, { t: "str", v: '"hero"' }, { t: "tag", v: ">" }],
  [{ t: "tag", v: "      <h1>" }, { t: "str", v: "Ship faster." }, { t: "tag", v: "</h1>" }],
  [{ t: "tag", v: "      <Button " }, { t: "attr", v: "variant" }, { t: "p", v: "=" }, { t: "str", v: '"primary"' }, { t: "tag", v: "/>" }],
  [{ t: "tag", v: "    </section>" }],
  [{ t: "p", v: "  );" }],
  [{ t: "p", v: "}" }],
];

const PHASE_ORDER = ["coding", "building", "hold"];
const PHASE_DURATION = { coding: 2800, building: 1300, hold: 2200 };

export default function WebBuildMockup() {
  const [phase, setPhase] = useState("coding");
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => {
      if (next === "coding") setLoop((l) => l + 1);
      setPhase(next);
    }, PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  const isCoding = phase === "coding";

  return (
    <div
      aria-hidden
      style={{
        width: 460,
        maxWidth: "100%",
        borderRadius: 18,
        background: "#0B0F1E",
        border: "1px solid rgba(255,255,255,.14)",
        boxShadow: "0 40px 90px rgba(16,26,51,.35)",
        overflow: "hidden",
        animation: "dl-web-float 5.5s ease-in-out infinite alternate",
      }}
    >
      {/* browser chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {DOTS.map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6", transition: "opacity .25s ease" }}>
          {isCoding ? "Hero.jsx" : "devline.digital"}
        </div>
      </div>

      <div style={{ position: "relative", minHeight: 236 }}>
        {isCoding && (
          <div key={`code-${loop}`} style={{ background: "#0B0F1E", padding: "16px 18px" }}>
            {CODE_LINES.map((line, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "2px 0",
                  animation: "dl-fade .35s ease both",
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                <span style={{ width: 14, flexShrink: 0, ...mono, fontSize: 9.5, color: "#3A4568", textAlign: "right" }}>{i + 1}</span>
                <span style={{ ...mono, fontSize: 10.5, whiteSpace: "pre" }}>
                  {line.map((tok, ti) => (
                    <span key={ti} style={{ color: TOKEN_COLOR[tok.t] }}>{tok.v}</span>
                  ))}
                </span>
              </div>
            ))}
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 12,
                background: "#7FB0FF",
                marginLeft: 24,
                marginTop: 4,
                animation: `dl-fade .2s ease both, dl-pulse 1s ease-in-out infinite`,
                animationDelay: `${CODE_LINES.length * 0.3}s, ${CODE_LINES.length * 0.3}s`,
              }}
            />
          </div>
        )}

        {!isCoding && (
          <div key={`site-${loop}`}>
            <div style={{ background: DARK, padding: "22px 22px 26px" }}>
              <div
                style={{
                  ...mono, fontSize: 8.5, letterSpacing: ".14em", color: "#A5B8E8",
                  border: "1px solid rgba(255,255,255,.18)", borderRadius: 999, padding: "4px 10px",
                  display: "inline-block", animation: "dl-fade .4s ease both",
                }}
              >
                SOFTWARE STUDIO
              </div>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ height: 12, width: "82%", borderRadius: 4, background: "rgba(255,255,255,.9)", display: "block", animation: "dl-fade .4s ease both", animationDelay: ".15s" }} />
                <span style={{ height: 12, width: "58%", borderRadius: 4, background: "linear-gradient(90deg,#7FB0FF,#B79CFF)", display: "block", animation: "dl-fade .4s ease both", animationDelay: ".3s" }} />
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <span style={{ height: 20, width: 78, borderRadius: 999, background: GRAD, display: "block", animation: "dl-ticket-pop .4s cubic-bezier(.34,1.56,.64,1) both", animationDelay: ".45s" }} />
                <span style={{ height: 20, width: 68, borderRadius: 999, border: "1px solid rgba(255,255,255,.3)", display: "block", animation: "dl-ticket-pop .4s cubic-bezier(.34,1.56,.64,1) both", animationDelay: ".55s" }} />
              </div>
            </div>

            <div style={{ background: T.base, padding: "18px 22px 22px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    background: T.panel, border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 8px",
                    animation: "dl-ticket-pop .4s cubic-bezier(.34,1.56,.64,1) both",
                    animationDelay: `${0.7 + i * 0.15}s`,
                  }}
                >
                  <span aria-hidden style={{ width: 20, height: 20, borderRadius: 6, display: "block", background: GRAD }} />
                  <span style={{ display: "block", height: 6, width: "70%", borderRadius: 3, background: T.border, marginTop: 8 }} />
                  <span style={{ display: "block", height: 6, width: "45%", borderRadius: 3, background: T.border, marginTop: 5 }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
