import { useEffect, useState } from "react";
import { GRAD, mono } from "../../theme";
import Icon from "./Icon";

const SWATCHES = ["#4F8CFF", "#8B5CF6", "#22D3EE", "#34D399", "#F59E0B"];
const LAYERS = ["Hero / Background", "Hero / Headline", "Button / Primary", "Card / Service ×6"];

const PHASE_ORDER = ["idle", "selecting", "editing", "done"];
const PHASE_DURATION = { idle: 2200, selecting: 500, editing: 1500, done: 2200 };

const CURSOR_POS = {
  idle: { x: 96, y: 178, opacity: 0, scale: 0.9 },
  selecting: { x: 96, y: 178, opacity: 1, scale: 1 },
  editing: { x: 210, y: 205, opacity: 1, scale: 1 },
  done: { x: 210, y: 205, opacity: 1, scale: 1 },
};

export default function DesignMockup() {
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => setPhase(next), PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  const layerSelected = phase !== "idle";
  const cardDesigned = phase === "editing" || phase === "done";
  const cursor = CURSOR_POS[phase];

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
        position: "relative",
        animation: "dl-web-float 5.5s ease-in-out infinite alternate",
        animationDelay: ".6s",
      }}
    >
      {/* chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6" }}>
          Figma — Devline UI Kit
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {/* layers panel */}
        <div style={{ width: 128, borderRight: "1px solid rgba(255,255,255,.08)", padding: "14px 12px", flexShrink: 0 }}>
          <div style={{ ...mono, fontSize: 8.5, letterSpacing: ".08em", color: "#7285B0", marginBottom: 10 }}>LAYERS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {LAYERS.map((l, i) => {
              const isTarget = i === LAYERS.length - 1;
              const active = isTarget && layerSelected;
              return (
                <div
                  key={l}
                  style={{
                    fontSize: 9.5,
                    color: active ? "#E4EAFB" : "#B9C6E6",
                    background: active ? "rgba(79,140,255,.22)" : "rgba(255,255,255,.05)",
                    borderLeft: active ? "2px solid #4F8CFF" : "2px solid transparent",
                    borderRadius: 6,
                    padding: "6px 8px",
                    transition: "background .3s ease, border-color .3s ease, color .3s ease",
                  }}
                >
                  {l}
                </div>
              );
            })}
          </div>
        </div>

        {/* canvas */}
        <div
          style={{
            flex: 1,
            padding: 18,
            background: "#151A32",
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,.05) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span aria-hidden style={{ position: "absolute", top: -18, left: 30, width: 130, height: 90, borderRadius: "50%", background: "rgba(79,140,255,.22)", filter: "blur(26px)", animation: "dl-float 8s ease-in-out infinite alternate" }} />

            {/* website frame being designed */}
            <div style={{ position: "relative", flex: 1, borderRadius: 10, background: "#1A2138", border: "1px solid rgba(255,255,255,.1)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 8px", background: "rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />)}
                <span style={{ flex: 1, height: 7, borderRadius: 3, background: "rgba(255,255,255,.08)", marginLeft: 4 }} />
              </div>
              <div style={{ padding: 9 }}>
                <div style={{ borderRadius: 6, height: 32, background: GRAD, position: "relative", overflow: "hidden" }}>
                  <span style={{ position: "absolute", top: 6, left: 8, width: "55%", height: 5, borderRadius: 2, background: "rgba(255,255,255,.85)" }} />
                  <span style={{ position: "absolute", top: 15, left: 8, width: "35%", height: 4, borderRadius: 2, background: "rgba(255,255,255,.5)" }} />
                </div>
                <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
                  {[0, 1, 2].map((i) => <span key={i} style={{ flex: 1, height: 16, borderRadius: 4, background: "rgba(255,255,255,.06)" }} />)}
                </div>
              </div>
            </div>

            {/* phone frame being designed */}
            <div style={{ position: "relative", width: 56, flexShrink: 0, borderRadius: 14, background: "#1A2138", border: "1px solid rgba(255,255,255,.14)", padding: "10px 6px 8px" }}>
              <span style={{ position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)", width: 20, height: 5, borderRadius: 3, background: "#0B0F1E" }} />
              <div style={{ marginTop: 8, borderRadius: 6, height: 24, background: GRAD }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 6 }}>
                {[0, 1].map((i) => <span key={i} style={{ height: 5, borderRadius: 2, background: "rgba(255,255,255,.08)" }} />)}
              </div>
              <div style={{ display: "flex", gap: 4, marginTop: 6, justifyContent: "center" }}>
                {[0, 1, 2].map((i) => <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? GRAD : "rgba(255,255,255,.1)" }} />)}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 7, marginTop: 12 }}>
            {[0, 1, 2].map((i) => {
              const designed = i === 0 && cardDesigned;
              const complete = i === 0 && phase === "done";
              return (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 8,
                    padding: "9px 8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    background: designed ? "rgba(79,140,255,.12)" : "rgba(255,255,255,.05)",
                    border: designed ? "1px solid rgba(79,140,255,.4)" : "1px solid rgba(255,255,255,.08)",
                    transition: "background .35s ease, border-color .35s ease",
                  }}
                >
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: designed ? GRAD : "rgba(255,255,255,.12)",
                      transform: designed ? "scale(1)" : "scale(.7)",
                      transition: "background .35s ease .12s, transform .4s cubic-bezier(.34,1.56,.64,1) .12s",
                    }}
                  />
                  <span
                    style={{
                      display: "block",
                      height: 5,
                      width: designed ? "80%" : "60%",
                      borderRadius: 2,
                      background: designed ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.15)",
                      transition: "width .45s cubic-bezier(.34,1.56,.64,1) .4s, background .45s ease .4s",
                    }}
                  />
                  <span
                    style={{
                      display: "block",
                      height: 4,
                      width: designed ? "55%" : "40%",
                      borderRadius: 2,
                      background: designed ? "rgba(255,255,255,.5)" : "rgba(255,255,255,.1)",
                      transition: "width .45s cubic-bezier(.34,1.56,.64,1) .65s, background .45s ease .65s",
                    }}
                  />

                  {i === 0 && (
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        height: 2,
                        width: designed ? "100%" : "0%",
                        background: "linear-gradient(90deg,#4F8CFF,#8B5CF6)",
                        transition: designed ? "width 1.2s ease .05s" : "width .2s ease",
                      }}
                    />
                  )}

                  {complete && (
                    <span
                      style={{
                        position: "absolute",
                        top: -6,
                        right: -6,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "#34D399",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 10px rgba(52,211,153,.5)",
                        animation: "dl-ticket-pop .4s cubic-bezier(.34,1.56,.64,1) both",
                      }}
                    >
                      <Icon name="Check" size={11} color="#0B0F1E" strokeWidth={3} />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            {SWATCHES.map((c, i) => (
              <span
                key={c}
                style={{ width: 18, height: 18, borderRadius: "50%", background: c, border: "2px solid #151A32", animation: "dl-pulse 2.6s ease-in-out infinite", animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* selection box around the card being "designed" */}
      <div
        style={{
          position: "absolute",
          left: 144,
          top: 175,
          width: 99,
          height: 63,
          border: "1.5px dashed #7FB0FF",
          borderRadius: 9,
          opacity: cardDesigned ? 1 : 0,
          transform: phase === "done" ? "scale(1.03)" : "scale(1)",
          transition: "opacity .3s ease, transform .3s cubic-bezier(.34,1.56,.64,1)",
          pointerEvents: "none",
        }}
      >
        {["-4px", "calc(100% - 4px)"].map((left) =>
          ["-4px", "calc(100% - 4px)"].map((top) => (
            <span
              key={left + top}
              style={{ position: "absolute", left, top, width: 6, height: 6, background: "#7FB0FF", borderRadius: 1 }}
            />
          ))
        )}
      </div>

      {/* animated cursor */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          opacity: cursor.opacity,
          transform: `translate(${cursor.x}px, ${cursor.y}px) scale(${cursor.scale})`,
          transition: "transform .55s cubic-bezier(.4,0,.2,1), opacity .25s ease",
          pointerEvents: "none",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,.4))",
        }}
      >
        <Icon name="MousePointer2" size={16} color="#fff" strokeWidth={1.8} />
      </div>
    </div>
  );
}
