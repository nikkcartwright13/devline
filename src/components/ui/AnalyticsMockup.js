import { useEffect, useState } from "react";
import { mono } from "../../theme";
import Icon from "./Icon";

const CHART_POINTS = [[0, 42], [30, 36], [60, 38], [90, 22], [120, 26], [150, 14], [180, 8], [200, 4]];
const LINE_PATH = "M" + CHART_POINTS.map(([x, y]) => `${x},${y}`).join(" L");
const AREA_PATH = LINE_PATH + " L200,50 L0,50 Z";
const LINE_LENGTH = 260;

const PAGES = [
  { path: "/", views: 1240 },
  { path: "/services", views: 812 },
  { path: "/contact", views: 356 },
];

const PHASE_ORDER = ["syncing", "synced"];
const PHASE_DURATION = { syncing: 1400, synced: 3200 };

export default function AnalyticsMockup() {
  const [phase, setPhase] = useState("syncing");
  const [loop, setLoop] = useState(0);
  const [visitors, setVisitors] = useState(2140);
  const [pageViews, setPageViews] = useState(5680);

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => {
      if (next === "syncing") setLoop((l) => l + 1);
      setPhase(next);
    }, PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    const v = setInterval(() => setVisitors((n) => (n > 2400 ? 2140 : n + 3)), 400);
    const p = setInterval(() => setPageViews((n) => (n > 6200 ? 5680 : n + 7)), 350);
    return () => { clearInterval(v); clearInterval(p); };
  }, []);

  const isSyncing = phase === "syncing";

  const stats = [
    ["Visitors", visitors.toLocaleString()],
    ["Page Views", pageViews.toLocaleString()],
    ["Avg. Session", "3m 42s"],
    ["Bounce Rate", "38%"],
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
        animationDelay: "1.5s",
      }}
    >
      {/* chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6" }}>
          Analytics — devline.digital
        </div>
      </div>

      <div style={{ padding: 16, background: "#151A32" }}>
        {/* stat row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
          {stats.map(([label, val]) => (
            <div key={label} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "8px 9px" }}>
              <div style={{ ...mono, fontSize: 7.5, color: "#7285B0" }}>{label}</div>
              <div style={{ ...mono, fontWeight: 700, fontSize: 12, color: "#fff", marginTop: 3, fontVariantNumeric: "tabular-nums" }}>{val}</div>
            </div>
          ))}
        </div>

        {/* trend chart */}
        <div style={{ marginTop: 14, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "12px 14px 8px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ ...mono, fontSize: 8.5, color: "#7285B0" }}>TRAFFIC — LAST 7 DAYS</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, ...mono, fontSize: 8.5, color: "#34D399" }}>
              <Icon name="TrendingUp" size={11} color="#34D399" /> +18%
            </span>
          </div>
          <svg key={`chart-${loop}`} viewBox="0 0 200 54" width="100%" height="70" style={{ marginTop: 6, overflow: "visible" }}>
            <defs>
              <linearGradient id="analytics-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={AREA_PATH}
              fill="url(#analytics-area)"
              style={{
                opacity: isSyncing ? 0 : 1,
                transition: "opacity .6s ease .9s",
              }}
            />
            <path
              d={LINE_PATH}
              fill="none"
              stroke="url(#lineStroke)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={LINE_LENGTH}
              strokeDashoffset={isSyncing ? LINE_LENGTH : 0}
              style={{ transition: isSyncing ? "none" : "stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)" }}
            />
            <defs>
              <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#4F8CFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* top pages */}
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
          {PAGES.map((p) => (
            <div key={p.path} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px", background: "rgba(255,255,255,.03)", borderRadius: 8 }}>
              <span style={{ ...mono, fontSize: 10, color: "#DDE5F8" }}>{p.path}</span>
              <span style={{ ...mono, fontSize: 9.5, color: "#7285B0" }}>{p.views.toLocaleString()} views</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
