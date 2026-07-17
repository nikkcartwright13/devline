import { GRAD, DARK, mono, display } from "../../theme";
import Icon from "./Icon";

const MUTED = "#8FA3D6";
const MINI_BARS = [40, 65, 50, 80, 55, 70, 95];
const FIELDS = [
  { icon: "Zap", w: [70, 45] },
  { icon: "Clock", w: [55, 35] },
  { icon: "TrendingUp", w: [80, 50] },
];
const SUMMARY_STATS = [
  { value: "2.4k", label: "Users" },
  { value: "87%", label: "Retention" },
  { value: "4.9", label: "Rating" },
];
const CHART_BARS = [30, 55, 40, 70, 50, 85, 60];

function TabBar({ active = 0 }) {
  const tabs = ["Home", "List", "CirclePlus", "Heart", "User"];
  return (
    <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-around", padding: "12px 0 14px", borderTop: "1px solid rgba(255,255,255,.08)" }}>
      {tabs.map((ic, i) => (
        <Icon key={ic} name={ic} size={14} color={i === active ? "#7FB0FF" : "#4A5578"} />
      ))}
    </div>
  );
}

function DashboardScreen({ isFront }) {
  return (
    <>
      <div style={{ padding: isFront ? "16px 18px 0" : "12px 14px 0" }}>
        <div style={{ ...mono, fontSize: isFront ? 7.5 : 7, letterSpacing: ".14em", color: "#7FB0FF" }}>YOUR APP</div>
        <div style={{ ...display, fontWeight: 700, fontSize: isFront ? 15 : 12, color: "#fff", marginTop: 5 }}>Dashboard</div>
      </div>

      <div style={{ margin: isFront ? "14px 16px 0" : "10px 12px 0", borderRadius: 16, padding: isFront ? "14px 16px 16px" : "10px 12px 12px", background: GRAD, color: "#fff" }}>
        <div style={{ fontSize: isFront ? 10 : 8.5, opacity: 0.85 }}>Overview</div>
        <div style={{ ...display, fontWeight: 700, fontSize: isFront ? 24 : 19, marginTop: 4 }}>2,481</div>
        <div style={{ display: "flex", gap: isFront ? 4 : 3, marginTop: 12, alignItems: "flex-end" }}>
          {MINI_BARS.map((h, i) => (
            <span key={i} style={{ width: isFront ? 7 : 6, height: h * (isFront ? 0.34 : 0.28), background: "rgba(255,255,255,.75)", borderRadius: 3 }} />
          ))}
        </div>
      </div>

      <div style={{ padding: isFront ? "16px 16px 0" : "12px 12px 0", display: "flex", flexDirection: "column", gap: isFront ? 8 : 6 }}>
        {FIELDS.map((f) => (
          <div key={f.icon} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: isFront ? "9px 12px" : "7px 10px" }}>
            <span style={{ width: isFront ? 26 : 22, height: isFront ? 26 : 22, borderRadius: 8, background: GRAD, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={f.icon} size={isFront ? 13 : 11} color="#fff" />
            </span>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ height: 6, width: `${f.w[0]}%`, borderRadius: 3, background: "rgba(255,255,255,.35)" }} />
              <span style={{ height: 5, width: `${f.w[1]}%`, borderRadius: 3, background: "rgba(255,255,255,.15)" }} />
            </div>
          </div>
        ))}
      </div>

      <TabBar active={0} />
    </>
  );
}

function StatsScreen() {
  return (
    <>
      <div style={{ padding: "12px 14px 0" }}>
        <div style={{ ...mono, fontSize: 7, letterSpacing: ".14em", color: "#7FB0FF" }}>YOUR APP</div>
        <div style={{ ...display, fontWeight: 700, fontSize: 12, color: "#fff", marginTop: 5 }}>Statistics</div>
      </div>

      <div style={{ display: "flex", gap: 8, padding: "12px 12px 0" }}>
        {SUMMARY_STATS.map((s) => (
          <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
            <div style={{ ...display, fontWeight: 700, fontSize: 12, color: "#fff" }}>{s.value}</div>
            <div style={{ fontSize: 6.5, color: MUTED, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ margin: "12px 12px 0", borderRadius: 14, padding: "12px 14px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "flex-end", gap: 5, height: 80 }}>
        {CHART_BARS.map((h, i) => (
          <span key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 4, background: i === 5 ? GRAD : "rgba(255,255,255,.18)" }} />
        ))}
      </div>

      <div style={{ padding: "12px 12px 0", display: "flex", flexDirection: "column", gap: 6 }}>
        {[{ icon: "Check", w: [60, 40] }, { icon: "Star", w: [45, 30] }].map((f) => (
          <div key={f.icon} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "7px 10px" }}>
            <span style={{ width: 20, height: 20, borderRadius: 7, background: GRAD, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={f.icon} size={10} color="#fff" />
            </span>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ height: 5, width: `${f.w[0]}%`, borderRadius: 3, background: "rgba(255,255,255,.35)" }} />
              <span style={{ height: 4, width: `${f.w[1]}%`, borderRadius: 3, background: "rgba(255,255,255,.15)" }} />
            </div>
          </div>
        ))}
      </div>

      <TabBar active={1} />
    </>
  );
}

export default function PhoneMockup({ variant = "front" }) {
  const isFront = variant === "front";
  return (
    <div
      aria-hidden
      style={{
        width: isFront ? 268 : 230,
        maxWidth: "100%",
        height: isFront ? 552 : 474,
        borderRadius: 44,
        background: "#0B0F1E",
        border: "1px solid rgba(255,255,255,.14)",
        boxShadow: isFront
          ? "0 40px 80px rgba(16,26,51,.35), inset 0 0 0 6px #1A2138"
          : "0 30px 60px rgba(16,26,51,.25), inset 0 0 0 6px #1A2138",
        padding: 14,
        animation: `${isFront ? "dl-phone" : "dl-phone2"} 4.5s ease-in-out infinite alternate`,
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* notch */}
      <div style={{ position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)", width: 88, height: 22, borderRadius: 999, background: "#1A2138", zIndex: 2 }} />

      {/* screen */}
      <div style={{ width: "100%", height: "100%", borderRadius: 32, overflow: "hidden", background: DARK, position: "relative", display: "flex", flexDirection: "column" }}>
        {/* status bar */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px 4px", ...mono, fontSize: 9, color: MUTED }}>
          <span>9:41</span><span>●●● ⌁ ▮</span>
        </div>

        {isFront ? <DashboardScreen isFront={isFront} /> : <StatsScreen />}
      </div>
    </div>
  );
}
