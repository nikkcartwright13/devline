import { useEffect, useState } from "react";
import { GRAD, mono } from "../../theme";
import Icon from "./Icon";

const TOOLS = ["Frame", "PenTool", "Image", "Palette"];

const PHASE_ORDER = ["before", "editing", "after"];
const PHASE_DURATION = { before: 1800, editing: 1800, after: 2400 };

const SLIDERS_BEFORE = [30, 25, 20];
const SLIDERS_AFTER = [72, 66, 78];

export default function PhotoshopMockup() {
  const [phase, setPhase] = useState("before");

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => setPhase(next), PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  const isBefore = phase === "before";
  const wipe = isBefore ? 0 : 100;
  const ease = "1.6s cubic-bezier(.4,0,.2,1)";
  const canvasTransition = isBefore ? "none" : `clip-path ${ease}, left ${ease}`;
  const barTransition = isBefore ? "none" : `width ${ease}`;
  const handleTransition = isBefore ? "none" : `left ${ease}`;
  const sliders = isBefore ? SLIDERS_BEFORE : SLIDERS_AFTER;

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
        animationDelay: ".75s",
      }}
    >
      {/* chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6" }}>
          Photoshop — banner-final.psd
        </div>
      </div>

      <div style={{ padding: 16, background: "#151A32" }}>
        <div style={{ display: "flex", gap: 10 }}>
          {/* tools column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
            {TOOLS.map((tool, i) => {
              const active = i === 1 && !isBefore;
              return (
                <div
                  key={tool}
                  style={{
                    width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                    background: active ? GRAD : "rgba(255,255,255,.05)", border: active ? "1px solid rgba(79,140,255,.5)" : "1px solid rgba(255,255,255,.08)",
                    transition: "background .3s ease, border-color .3s ease",
                  }}
                >
                  <Icon name={tool} size={13} color={active ? "#fff" : "#7285B0"} />
                </div>
              );
            })}
          </div>

          {/* canvas with before/after wipe */}
          <div style={{ position: "relative", flex: 1, height: 190, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,.1)" }}>
            {/* before layer */}
            <div style={{ position: "absolute", inset: 0, background: "#3A4256" }}>
              <div style={{ position: "absolute", left: 16, right: 16, top: 16, height: 9, borderRadius: 3, background: "rgba(255,255,255,.25)" }} />
              <div style={{ position: "absolute", left: 16, top: 34, width: "40%", height: 7, borderRadius: 3, background: "rgba(255,255,255,.16)" }} />
              <div style={{ position: "absolute", right: 20, bottom: 20, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,.12)" }} />
            </div>

            {/* after layer, revealed via clip-path wipe */}
            <div
              style={{
                position: "absolute", inset: 0, background: GRAD,
                clipPath: `inset(0 ${100 - wipe}% 0 0)`,
                transition: canvasTransition,
              }}
            >
              <div style={{ position: "absolute", left: 16, right: 16, top: 16, height: 9, borderRadius: 3, background: "rgba(255,255,255,.95)" }} />
              <div style={{ position: "absolute", left: 16, top: 34, width: "40%", height: 7, borderRadius: 3, background: "rgba(255,255,255,.7)" }} />
              <div style={{ position: "absolute", right: 20, bottom: 20, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,.35)", boxShadow: "0 0 30px rgba(255,255,255,.3)" }} />
            </div>

            {/* wipe divider handle */}
            <div
              style={{
                position: "absolute", top: 0, bottom: 0, left: `${wipe}%`, width: 2,
                background: "rgba(255,255,255,.9)", transform: "translateX(-1px)", transition: canvasTransition,
              }}
            >
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 22, height: 22, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,.35)" }}>
                <span style={{ fontSize: 11, color: "#101A33" }}>↔</span>
              </div>
            </div>
          </div>
        </div>

        {/* adjustment sliders */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
          {["Brightness", "Contrast", "Saturation"].map((label, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ ...mono, fontSize: 8.5, color: "#7285B0", width: 62, flexShrink: 0 }}>{label}</span>
              <div style={{ position: "relative", flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,.1)" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${sliders[i]}%`, borderRadius: 2, background: "linear-gradient(90deg,#4F8CFF,#8B5CF6)", transition: barTransition }} />
                <div style={{ position: "absolute", top: "50%", left: `${sliders[i]}%`, width: 9, height: 9, borderRadius: "50%", background: "#fff", transform: "translate(-50%,-50%)", boxShadow: "0 1px 4px rgba(0,0,0,.4)", transition: handleTransition }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
