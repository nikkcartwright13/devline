import { useEffect, useState } from "react";
import { GRAD, mono } from "../../theme";
import Icon from "./Icon";

const PHASE_ORDER = ["raw", "grading", "rendering", "done"];
const PHASE_DURATION = { raw: 1800, grading: 1600, rendering: 1400, done: 2400 };

const WAVEFORM = [6, 12, 8, 16, 10, 14, 7, 18, 11, 9, 15, 8];

export default function PremiereMockup() {
  const [phase, setPhase] = useState("raw");

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => setPhase(next), PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  const isRaw = phase === "raw";
  const graded = !isRaw;
  const playheadPercent = phase === "raw" ? 0 : phase === "grading" ? 55 : 90;
  const playheadTransition = isRaw ? "none" : "left 1.5s linear";
  const renderWidth = phase === "rendering" || phase === "done" ? 100 : 0;
  const renderTransition = phase === "rendering" ? "width 1.3s linear" : "none";
  const done = phase === "done";

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
        animationDelay: "1.05s",
      }}
    >
      {/* chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6" }}>
          Premiere Pro — promo_final.prproj
        </div>
      </div>

      <div style={{ padding: 16, background: "#151A32" }}>
        {/* preview window */}
        <div
          style={{
            position: "relative", height: 140, borderRadius: 10, overflow: "hidden",
            border: "1px solid rgba(255,255,255,.1)",
            background: graded ? GRAD : "#3A4256",
            transition: "background .8s ease",
          }}
        >
          {/* simple scene shapes */}
          <span
            style={{
              position: "absolute", top: 18, right: 26, width: 30, height: 30, borderRadius: "50%",
              background: graded ? "#FFD873" : "rgba(255,255,255,.2)", transition: "background .8s ease",
            }}
          />
          <span
            style={{
              position: "absolute", left: 0, right: 0, bottom: 0, height: 42,
              background: graded ? "rgba(16,26,51,.4)" : "rgba(255,255,255,.08)", transition: "background .8s ease",
            }}
          />

          {/* play button */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(0,0,0,.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="Play" size={14} color="#fff" fill="#fff" />
            </span>
          </div>

          <span style={{ position: "absolute", bottom: 8, left: 10, ...mono, fontSize: 9, color: "rgba(255,255,255,.85)" }}>00:00:12:04</span>
        </div>

        {/* timeline */}
        <div style={{ position: "relative", marginTop: 14, padding: "10px 0" }}>
          {/* playhead */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: `${playheadPercent}%`, width: 2, background: "#F87171", transition: playheadTransition, zIndex: 2 }} />

          {/* video track */}
          <div style={{ display: "flex", gap: 4 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  flex: i === 1 ? 1.4 : 1, height: 24, borderRadius: 4,
                  background: graded ? "linear-gradient(90deg,#4F8CFF,#8B5CF6)" : "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.1)", transition: "background .5s ease",
                }}
              />
            ))}
          </div>

          {/* audio waveform track */}
          <div style={{ display: "flex", alignItems: "center", gap: 2, height: 20, marginTop: 5 }}>
            {WAVEFORM.map((h, i) => (
              <span
                key={i}
                style={{
                  flex: 1, height: h, borderRadius: 1, background: "#34D399", opacity: 0.6,
                  animation: "dl-bar-breathe 2.4s ease-in-out infinite alternate", animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* render progress */}
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ ...mono, fontSize: 9, color: "#7285B0", flexShrink: 0 }}>
            {done ? "Export complete" : "Rendering"}
          </span>
          <div style={{ position: "relative", flex: 1, height: 4, borderRadius: 2, background: "rgba(255,255,255,.08)" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${renderWidth}%`, borderRadius: 2, background: GRAD, transition: renderTransition }} />
          </div>
          <span
            style={{
              width: 16, height: 16, borderRadius: "50%", background: "#34D399", display: "flex", alignItems: "center", justifyContent: "center",
              opacity: done ? 1 : 0, transform: done ? "scale(1)" : "scale(.6)",
              transition: "opacity .3s ease, transform .3s cubic-bezier(.34,1.56,.64,1)", flexShrink: 0,
            }}
          >
            <Icon name="Check" size={10} color="#0B0F1E" strokeWidth={3} />
          </span>
        </div>
      </div>
    </div>
  );
}
