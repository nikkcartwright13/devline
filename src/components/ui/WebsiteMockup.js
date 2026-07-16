import { T, GRAD, DARK, mono } from "../../theme";

const DOTS = ["#FF5F57", "#FEBC2E", "#28C840"];

export default function WebsiteMockup() {
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
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6" }}>
          devline.digital
        </div>
      </div>

      {/* page content */}
      <div style={{ background: DARK, padding: "22px 22px 26px" }}>
        <div style={{ ...mono, fontSize: 8.5, letterSpacing: ".14em", color: "#A5B8E8", border: "1px solid rgba(255,255,255,.18)", borderRadius: 999, padding: "4px 10px", display: "inline-block" }}>
          SOFTWARE STUDIO
        </div>
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ height: 12, width: "82%", borderRadius: 4, background: "rgba(255,255,255,.9)" }} />
          <span style={{ height: 12, width: "58%", borderRadius: 4, background: "linear-gradient(90deg,#7FB0FF,#B79CFF)" }} />
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <span style={{ height: 20, width: 78, borderRadius: 999, background: GRAD }} />
          <span style={{ height: 20, width: 68, borderRadius: 999, border: "1px solid rgba(255,255,255,.3)" }} />
        </div>
      </div>

      <div style={{ background: T.base, padding: "18px 22px 22px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 8px" }}>
            <span aria-hidden style={{ width: 20, height: 20, borderRadius: 6, display: "block", background: GRAD }} />
            <span style={{ display: "block", height: 6, width: "70%", borderRadius: 3, background: T.border, marginTop: 8 }} />
            <span style={{ display: "block", height: 6, width: "45%", borderRadius: 3, background: T.border, marginTop: 5 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
