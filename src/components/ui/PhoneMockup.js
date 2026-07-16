import { useTranslation } from "react-i18next";
import { GRAD, mono, display } from "../../theme";
import Icon from "./Icon";

const TAB_ICONS = ["Home", "List", "CirclePlus", "Heart", "User"];

export default function PhoneMockup({ variant = "front" }) {
  const { t } = useTranslation();
  const schedule = t("mobile.app.schedule", { returnObjects: true });
  const isFront = variant === "front";
  return (
    <div
      aria-hidden
      style={{
        width: isFront ? 268 : 230,
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
      <div style={{ width: "100%", height: "100%", borderRadius: 32, overflow: "hidden", background: "linear-gradient(160deg,#0C1030 0%,#221656 100%)", position: "relative", display: "flex", flexDirection: "column" }}>
        {/* status bar */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px 0", ...mono, fontSize: 10, color: "#8FA3D6" }}>
          <span>9:41</span><span>●●● ⌁ ▮</span>
        </div>

        {/* app header */}
        <div style={{ padding: "22px 20px 0" }}>
          <div style={{ ...mono, fontSize: 9, letterSpacing: ".14em", color: "#7FB0FF" }}>DAPET APP</div>
          <div style={{ ...display, fontWeight: 700, fontSize: isFront ? 19 : 16, color: "#fff", marginTop: 6 }}>
            {t("mobile.app.greeting")}
          </div>
        </div>

        {/* balance-style gradient card */}
        <div style={{ margin: "16px 16px 0", borderRadius: 18, padding: "16px 16px 18px", background: GRAD, color: "#fff" }}>
          <div style={{ fontSize: 10, opacity: .85 }}>{t("mobile.app.statLabel")}</div>
          <div style={{ ...display, fontWeight: 700, fontSize: isFront ? 26 : 21, marginTop: 4 }}>12</div>
          <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
            {[38, 60, 45, 80, 55, 70, 90].map((h, i) => (
              <span key={i} style={{ width: 8, height: h * 0.34, background: "rgba(255,255,255,.75)", borderRadius: 4, alignSelf: "flex-end", animation: "dl-pulse 2.4s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>

        {/* list items */}
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {schedule.map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: "10px 12px" }}>
              <span style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: 11.5, color: "#E4EAFB", fontWeight: 500 }}>{item.label}</span>
              <span style={{ ...mono, fontSize: 10, color: "#8FA3D6" }}>{item.time}</span>
            </div>
          ))}
        </div>

        {/* tab bar */}
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-around", padding: "12px 0 16px", borderTop: "1px solid rgba(255,255,255,.08)" }}>
          {TAB_ICONS.map((ic, i) => (
            <Icon key={ic} name={ic} size={17} color={i === 0 ? "#7FB0FF" : "#5C6B95"} />
          ))}
        </div>
      </div>
    </div>
  );
}
