import { useEffect, useState } from "react";
import { mono, display } from "../../theme";
import Icon from "./Icon";

const PHASE_ORDER = ["steady", "spike", "provisioning", "scaled"];
const PHASE_DURATION = { steady: 2200, spike: 900, provisioning: 1300, scaled: 2400 };

const BARS_STEADY = [30, 40, 35, 45, 38, 42, 36];
const BARS_SPIKE = [55, 72, 62, 88, 92, 78, 70];
const BARS_SCALED = [40, 50, 45, 55, 48, 52, 46];

export default function InfraMockup() {
  const [phase, setPhase] = useState("steady");

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => setPhase(next), PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  const bars = phase === "steady" ? BARS_STEADY : phase === "scaled" ? BARS_SCALED : BARS_SPIKE;
  const cpu = phase === "steady" ? "42%" : phase === "scaled" ? "58%" : "81%";
  const nodeCount = phase === "scaled" ? 4 : 3;
  const node4State = phase === "provisioning" ? "provisioning" : phase === "scaled" ? "online" : "idle";

  const stats = [
    ["CPU Load", cpu],
    ["Uptime", "99.98%"],
    ["Nodes", String(nodeCount)],
  ];

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
        animationDelay: ".15s",
      }}
    >
      {/* chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6" }}>
          Cloud Console — production
        </div>
      </div>

      <div style={{ padding: 18, background: "#151A32" }}>
        {/* stat row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {stats.map(([label, val]) => (
            <div key={label} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "9px 10px" }}>
              <div style={{ ...mono, fontSize: 8.5, color: "#7285B0" }}>{label}</div>
              <div style={{ ...display, fontWeight: 700, fontSize: 15, color: "#fff", marginTop: 3, fontVariantNumeric: "tabular-nums", transition: "color .2s ease" }}>{val}</div>
            </div>
          ))}
        </div>

        {/* traffic chart */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 52, marginTop: 16, padding: "0 2px" }}>
          {bars.map((h, i) => (
            <span
              key={i}
              style={{
                flex: 1,
                height: `${h}%`,
                borderRadius: 4,
                background: "linear-gradient(180deg,#4F8CFF,#8B5CF6)",
                opacity: 0.55 + (i / bars.length) * 0.45,
                transition: "height .5s cubic-bezier(.4,0,.2,1)",
              }}
            />
          ))}
        </div>

        {/* server nodes */}
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "10px 6px" }}>
              <span style={{ width: 26, height: 26, borderRadius: 8, background: "#34D399", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="Server" size={13} color="#0B0F1E" />
              </span>
              <span style={{ ...mono, fontSize: 8, color: "#8FA3D6" }}>node-{i + 1}</span>
            </div>
          ))}

          {/* auto-scaled node */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              borderRadius: 10,
              padding: "10px 6px",
              background: node4State === "online" ? "rgba(52,211,153,.12)" : "rgba(255,255,255,.02)",
              border: node4State === "online" ? "1px solid rgba(52,211,153,.4)" : node4State === "provisioning" ? "1px dashed rgba(79,140,255,.6)" : "1px dashed rgba(255,255,255,.15)",
              transition: "background .35s ease, border-color .35s ease",
            }}
          >
            <span
              style={{
                position: "relative",
                width: 26,
                height: 26,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: node4State === "online" ? "#34D399" : node4State === "provisioning" ? "rgba(79,140,255,.18)" : "transparent",
                transition: "background .35s ease",
              }}
            >
              {node4State === "provisioning" && (
                <span aria-hidden style={{ position: "absolute", inset: -1, borderRadius: 8, border: "2px solid transparent", borderTopColor: "#7FB0FF", animation: "dl-spin .9s linear infinite" }} />
              )}
              <Icon name="Server" size={13} color={node4State === "online" ? "#0B0F1E" : node4State === "provisioning" ? "#7FB0FF" : "#3A4568"} />
            </span>
            <span style={{ ...mono, fontSize: 8, color: node4State === "idle" ? "#3A4568" : "#8FA3D6" }}>
              node-4
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
