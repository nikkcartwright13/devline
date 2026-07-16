import { useEffect, useState } from "react";
import { GRAD, mono } from "../../theme";
import Icon from "./Icon";

const TOOLS = ["PenTool", "Frame", "Image", "Palette"];

const HEX_POINTS = [
  [60, 15],
  [98.97, 37.5],
  [98.97, 82.5],
  [60, 105],
  [21.03, 82.5],
  [21.03, 37.5],
];
const HEX_PATH = `M${HEX_POINTS.map((p) => p.join(",")).join(" L")} Z`;
const PATH_LENGTH = 300;

const PHASE_ORDER = ["empty", "drawing", "complete"];
const PHASE_DURATION = { empty: 300, drawing: 1700, complete: 2600 };

export default function IllustratorMockup() {
  const [phase, setPhase] = useState("empty");
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => {
      if (next === "empty") setLoop((l) => l + 1);
      setPhase(next);
    }, PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  const isEmpty = phase === "empty";
  const isComplete = phase === "complete";
  const pathTransition = isEmpty ? "none" : "stroke-dashoffset 1.5s ease";
  const fillTransition = isEmpty ? "none" : "fill-opacity .5s ease .1s";

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
        animationDelay: ".9s",
      }}
    >
      {/* chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6" }}>
          Illustrator — logo-concept.ai
        </div>
      </div>

      <div style={{ padding: 16, background: "#151A32" }}>
        <div style={{ display: "flex", gap: 10 }}>
          {/* tools column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
            {TOOLS.map((tool, i) => {
              const active = i === 0 && !isComplete;
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

          {/* artboard */}
          <div style={{ position: "relative", flex: 1, height: 190, borderRadius: 10, border: "1px solid rgba(255,255,255,.1)", background: "#0F1428", backgroundImage: "radial-gradient(circle, rgba(255,255,255,.05) 1px, transparent 1px)", backgroundSize: "14px 14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg key={`svg-${loop}`} width="130" height="130" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="illu-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4F8CFF" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <path
                d={HEX_PATH}
                fill="url(#illu-grad)"
                fillOpacity={isComplete ? 1 : 0}
                stroke="#7FB0FF"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeDasharray={PATH_LENGTH}
                strokeDashoffset={isEmpty ? PATH_LENGTH : 0}
                style={{ transition: `${pathTransition}, ${fillTransition}` }}
              />
              {!isEmpty && HEX_POINTS.map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3.5"
                  fill="#0B0F1E"
                  stroke="#7FB0FF"
                  strokeWidth="1.5"
                  style={{
                    opacity: 0,
                    animation: "dl-ticket-pop .3s ease both",
                    animationDelay: `${0.2 + i * 0.22}s`,
                  }}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* exported variations */}
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                flex: 1, height: 44, borderRadius: 8, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: isComplete ? 1 : 0,
                transform: isComplete ? "scale(1)" : "scale(.7)",
                transition: `opacity .35s ease ${0.3 + i * 0.12}s, transform .35s cubic-bezier(.34,1.56,.64,1) ${0.3 + i * 0.12}s`,
              }}
            >
              <div
                style={{
                  width: 20, height: 20, borderRadius: 5,
                  background: i === 0 ? GRAD : i === 1 ? "rgba(255,255,255,.7)" : "#12172B",
                  border: i === 2 ? "1px solid rgba(255,255,255,.2)" : "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
