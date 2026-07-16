import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GRAD, mono, display } from "../../theme";
import Icon from "./Icon";

const CAMPAIGNS = [
  { icon: "Megaphone", name: "Meta — Awareness", statusKey: "active" },
  { icon: "SearchCheck", name: "Google SEO", statusKey: "active" },
  { icon: "Repeat", name: "Instagram — Retarget", statusKey: "planned" },
];

const BARS = [40, 65, 50, 80, 60, 90, 72];

const PHASE_ORDER = ["resting", "launching", "active"];
const PHASE_DURATION = { resting: 2600, launching: 1200, active: 2600 };

export default function MarketingMockup() {
  const { t } = useTranslation();
  const [phase, setPhase] = useState("resting");
  const [impressions, setImpressions] = useState(482);

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => setPhase(next), PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    const tick = setInterval(() => {
      setImpressions((v) => (v >= 496 ? 482 : v + 1));
    }, 1400);
    return () => clearInterval(tick);
  }, []);

  const launching = phase === "launching";
  const launched = phase === "active";

  const stats = [
    [t("marketing.mock.impressions"), `${impressions}K`],
    ["CTR", "3.8%"],
    ["ROAS", "4.2×"],
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
        animationDelay: ".9s",
      }}
    >
      {/* chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6" }}>
          Ads Manager — Campaigns
        </div>
      </div>

      <div style={{ padding: 18, background: "#151A32" }}>
        {/* stat row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {stats.map(([label, val]) => (
            <div key={label} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "9px 10px" }}>
              <div style={{ ...mono, fontSize: 8.5, color: "#7285B0" }}>{label}</div>
              <div style={{ ...display, fontWeight: 700, fontSize: 15, color: "#fff", marginTop: 3, fontVariantNumeric: "tabular-nums" }}>{val}</div>
            </div>
          ))}
        </div>

        {/* chart */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 60, marginTop: 16, padding: "0 2px" }}>
          {BARS.map((h, i) => (
            <span
              key={i}
              style={{
                flex: 1,
                height: `${h}%`,
                borderRadius: 4,
                background: GRAD,
                opacity: 0.55 + (i / BARS.length) * 0.45,
                transformOrigin: "bottom",
                animation: "dl-bar-breathe 2.8s ease-in-out infinite alternate",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        {/* campaign list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
          {CAMPAIGNS.map((c) => {
            const isTarget = c.statusKey === "planned";
            const showLaunching = isTarget && launching;
            const showActive = isTarget && launched;
            const statusKey = showActive ? "active" : c.statusKey;
            return (
              <div
                key={c.name}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255,255,255,.05)",
                  border: showLaunching
                    ? "1px solid rgba(79,140,255,.5)"
                    : showActive
                    ? "1px solid rgba(52,211,153,.5)"
                    : "1px solid rgba(255,255,255,.08)",
                  borderRadius: 10,
                  padding: "8px 10px",
                  boxShadow: showActive ? "0 0 0 3px rgba(52,211,153,.15)" : "none",
                  transition: "border-color .4s ease, box-shadow .4s ease",
                }}
              >
                <span style={{ width: 24, height: 24, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", background: GRAD, flexShrink: 0 }}>
                  <Icon name={c.icon} size={12} />
                </span>
                <span style={{ flex: 1, fontSize: 11, color: "#E4EAFB", fontWeight: 500 }}>{c.name}</span>
                <span style={{ ...mono, fontSize: 9, color: statusKey === "active" ? "#34D399" : "#8FA3D6", transition: "color .3s ease" }}>
                  {t(`marketing.mock.${statusKey}`)}
                </span>
                {isTarget && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      height: 2,
                      width: showLaunching || showActive ? "100%" : "0%",
                      background: "linear-gradient(90deg,#4F8CFF,#34D399)",
                      transition: `width ${showLaunching ? "1.1s linear" : ".2s ease"}`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
