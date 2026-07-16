import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GRAD, DARK, mono } from "../../theme";
import Icon from "./Icon";

const TOKEN_COLOR = {
  kw: "#C084FC",
  fn: "#60A5FA",
  tag: "#F87171",
  attr: "#FBBF24",
  str: "#34D399",
  p: "#8FA3D6",
};

const CODE_LINES = [
  [{ t: "kw", v: "export default function " }, { t: "fn", v: "App" }, { t: "p", v: "() {" }],
  [{ t: "p", v: "  return (" }],
  [{ t: "tag", v: "    <View " }, { t: "attr", v: "style" }, { t: "p", v: "=" }, { t: "str", v: "styles.card" }, { t: "tag", v: ">" }],
  [{ t: "tag", v: "      <Text>" }, { t: "str", v: "Hi, Cartwright 👋" }, { t: "tag", v: "</Text>" }],
  [{ t: "tag", v: "      <StatCard " }, { t: "attr", v: "value" }, { t: "p", v: "=" }, { t: "str", v: '"12"' }, { t: "tag", v: "/>" }],
  [{ t: "tag", v: "    </View>" }],
  [{ t: "p", v: "  );" }],
  [{ t: "p", v: "}" }],
];

const PHASE_ORDER = ["coding", "building", "hold"];
const PHASE_DURATION = { coding: 2800, building: 1300, hold: 2200 };

const TAB_ICONS = ["Home", "List", "CirclePlus", "Heart", "User"];

export default function MobileBuildMockup() {
  const { t } = useTranslation();
  const [phase, setPhase] = useState("coding");
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => {
      if (next === "coding") setLoop((l) => l + 1);
      setPhase(next);
    }, PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  const isCoding = phase === "coding";

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
        animationDelay: ".45s",
      }}
    >
      {/* chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6" }}>
          {isCoding ? "App.jsx" : "Flutter — Live Preview"}
        </div>
      </div>

      <div style={{ position: "relative", minHeight: 390, display: "flex", alignItems: "center", justifyContent: "center", padding: isCoding ? 0 : "26px 0" }}>
        {isCoding && (
          <div key={`code-${loop}`} style={{ width: "100%", padding: "16px 18px" }}>
            {CODE_LINES.map((line, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "2px 0", animation: "dl-fade .35s ease both", animationDelay: `${i * 0.3}s` }}>
                <span style={{ width: 14, flexShrink: 0, ...mono, fontSize: 9.5, color: "#3A4568", textAlign: "right" }}>{i + 1}</span>
                <span style={{ ...mono, fontSize: 10.5, whiteSpace: "pre" }}>
                  {line.map((tok, ti) => <span key={ti} style={{ color: TOKEN_COLOR[tok.t] }}>{tok.v}</span>)}
                </span>
              </div>
            ))}
            <span
              style={{
                display: "inline-block", width: 6, height: 12, background: "#7FB0FF", marginLeft: 24, marginTop: 4,
                animation: "dl-fade .2s ease both, dl-pulse 1s ease-in-out infinite",
                animationDelay: `${CODE_LINES.length * 0.3}s, ${CODE_LINES.length * 0.3}s`,
              }}
            />
          </div>
        )}

        {!isCoding && (
          <div
            key={`phone-${loop}`}
            style={{
              width: 168, height: 340, borderRadius: 28, background: "#0B0F1E",
              border: "1px solid rgba(255,255,255,.14)", padding: 10, position: "relative",
              boxShadow: "0 20px 50px rgba(16,26,51,.4), inset 0 0 0 5px #1A2138",
            }}
          >
            <span style={{ position: "absolute", top: 13, left: "50%", transform: "translateX(-50%)", width: 50, height: 13, borderRadius: 999, background: "#1A2138", zIndex: 2 }} />
            <div style={{ width: "100%", height: "100%", borderRadius: 20, overflow: "hidden", background: DARK, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 12px 0", ...mono, fontSize: 7.5, color: "#8FA3D6" }}>
                <span>9:41</span><span>●●● ⌁ ▮</span>
              </div>

              <div style={{ padding: "14px 12px 0", animation: "dl-fade .4s ease both", animationDelay: ".15s" }}>
                <div style={{ ...mono, fontSize: 6.5, letterSpacing: ".12em", color: "#7FB0FF" }}>DAPET APP</div>
                <div style={{ fontWeight: 700, fontSize: 12.5, color: "#fff", marginTop: 4 }}>{t("mobile.app.greeting")}</div>
              </div>

              <div
                style={{
                  margin: "12px 10px 0", borderRadius: 12, padding: "11px 12px 13px", background: GRAD, color: "#fff",
                  animation: "dl-ticket-pop .4s cubic-bezier(.34,1.56,.64,1) both", animationDelay: ".35s",
                }}
              >
                <div style={{ fontSize: 7, opacity: 0.85 }}>{t("mobile.app.statLabel")}</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginTop: 2 }}>12</div>
                <div style={{ display: "flex", gap: 3, marginTop: 10 }}>
                  {[8, 14, 10, 18, 12, 16, 20].map((h, i) => (
                    <span key={i} style={{ width: 4, height: h, background: "rgba(255,255,255,.75)", borderRadius: 2, alignSelf: "flex-end" }} />
                  ))}
                </div>
              </div>

              <div style={{ padding: "12px 10px", display: "flex", flexDirection: "column", gap: 7 }}>
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.06)",
                      border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, padding: "7px 8px",
                      animation: "dl-ticket-pop .4s cubic-bezier(.34,1.56,.64,1) both", animationDelay: `${0.5 + i * 0.15}s`,
                    }}
                  >
                    <span style={{ width: 15, height: 15, borderRadius: 5, background: "rgba(255,255,255,.1)", flexShrink: 0 }} />
                    <span style={{ flex: 1, height: 5, borderRadius: 2, background: "rgba(255,255,255,.15)" }} />
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-around", padding: "10px 0 12px", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                {TAB_ICONS.map((ic, i) => (
                  <span key={ic} style={{ animation: "dl-fade .3s ease both", animationDelay: `${0.75 + i * 0.06}s` }}>
                    <Icon name={ic} size={13} color={i === 0 ? "#7FB0FF" : "#5C6B95"} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
