import { useEffect, useState } from "react";
import { GRAD, mono } from "../../theme";
import Icon from "./Icon";

const COMPETITORS = ["webcraft.io", "pixelforge.dev", "acme-studio.com"];

function buildList(rank) {
  const list = [...COMPETITORS];
  list.splice(rank - 1, 0, "devline.digital");
  return list;
}

const PHASE_ORDER = ["r4", "r3", "r2", "r1", "hold"];
const PHASE_DURATION = { r4: 950, r3: 950, r2: 950, r1: 950, hold: 2400 };
const RANK = { r4: 4, r3: 3, r2: 2, r1: 1, hold: 1 };

export default function SeoMockup() {
  const [phase, setPhase] = useState("r4");
  const [traffic, setTraffic] = useState(4820);
  const [backlinks, setBacklinks] = useState(312);

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => setPhase(next), PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    const t = setInterval(() => setTraffic((v) => (v > 6200 ? 4820 : v + 45)), 500);
    const b = setInterval(() => setBacklinks((v) => (v > 480 ? 312 : v + 2)), 700);
    return () => { clearInterval(t); clearInterval(b); };
  }, []);

  const rank = RANK[phase];
  const climbing = phase !== "hold";
  const list = buildList(rank);

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
        animationDelay: "1.35s",
      }}
    >
      {/* chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px" }}>
          <Icon name="SearchCheck" size={12} color="#8FA3D6" />
          <span style={{ ...mono, fontSize: 10.5, color: "#8FA3D6" }}>web development studio tbilisi</span>
        </div>
      </div>

      <div style={{ padding: 16, background: "#151A32" }}>
        {/* search results */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {list.map((domain, i) => {
            const isUs = domain === "devline.digital";
            return (
              <div
                key={domain}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8,
                  background: isUs ? "rgba(79,140,255,.14)" : "rgba(255,255,255,.04)",
                  border: isUs ? "1px solid rgba(79,140,255,.5)" : "1px solid rgba(255,255,255,.06)",
                  transition: "background .3s ease, border-color .3s ease",
                }}
              >
                <span style={{ ...mono, fontSize: 9, color: isUs ? "#7FB0FF" : "#5C6B95", width: 14, flexShrink: 0 }}>{i + 1}</span>
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: isUs ? GRAD : "rgba(255,255,255,.12)", flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: isUs ? "#E4EAFB" : "#7285B0", fontWeight: isUs ? 600 : 500 }}>{domain}</span>
                {isUs && climbing && (
                  <span
                    key={phase}
                    style={{ marginLeft: "auto", display: "flex", alignItems: "center", color: "#34D399", animation: "dl-ticket-pop .35s ease both" }}
                  >
                    <Icon name="ChevronDown" size={13} color="#34D399" style={{ transform: "rotate(180deg)" }} />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 14 }}>
          {[
            ["Ranking", `#${rank}`],
            ["Organic Traffic", traffic.toLocaleString()],
            ["Backlinks", backlinks],
          ].map(([label, val]) => (
            <div key={label} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "8px 10px" }}>
              <div style={{ ...mono, fontSize: 8, color: "#7285B0" }}>{label}</div>
              <div style={{ ...mono, fontWeight: 700, fontSize: 13, color: "#fff", marginTop: 3, fontVariantNumeric: "tabular-nums" }}>{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
