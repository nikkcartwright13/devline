import { useEffect, useState } from "react";
import { mono } from "../../theme";
import Icon from "./Icon";

const STAGES = [
  { key: "build", icon: "Code2", label: "Build" },
  { key: "test", icon: "ListChecks", label: "Test" },
  { key: "deploy", icon: "Cloud", label: "Deploy" },
  { key: "live", icon: "Globe", label: "Live" },
];

const LOG_LINES = [
  "$ git push origin main",
  "✓ Build complete (12s)",
  "✓ Tests passed — 128/128",
  "✓ Deployed to production",
];

const STAGE_DURATION = 900;
const HOLD_DURATION = 2400;

export default function DevOpsMockup() {
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDoneCount((d) => (d < STAGES.length ? d + 1 : 0));
    }, doneCount < STAGES.length ? STAGE_DURATION : HOLD_DURATION);
    return () => clearTimeout(timer);
  }, [doneCount]);

  const allLive = doneCount === STAGES.length;

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
        animationDelay: ".3s",
      }}
    >
      {/* chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6" }}>
          GitLab CI/CD — pipeline #482
        </div>
      </div>

      <div style={{ padding: "22px 18px 18px", background: "#151A32" }}>
        {/* pipeline stages */}
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {STAGES.map((s, i) => {
            const state = i < doneCount ? "done" : i === doneCount ? "running" : "pending";
            return (
              <div key={s.key} style={{ display: "flex", alignItems: "center", flex: i < STAGES.length - 1 ? 1 : "0 0 auto" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <div
                    style={{
                      position: "relative",
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: state === "done" ? "#34D399" : state === "running" ? "rgba(79,140,255,.18)" : "rgba(255,255,255,.06)",
                      border: state === "running" ? "1px solid rgba(79,140,255,.6)" : "1px solid rgba(255,255,255,.1)",
                      boxShadow: state === "running" ? "0 0 0 4px rgba(79,140,255,.14)" : "none",
                      transition: "background .3s ease, border-color .3s ease, box-shadow .3s ease",
                    }}
                  >
                    {state === "running" && (
                      <span
                        aria-hidden
                        style={{
                          position: "absolute", inset: -1, borderRadius: "50%",
                          border: "2px solid transparent", borderTopColor: "#7FB0FF",
                          animation: "dl-spin .9s linear infinite",
                        }}
                      />
                    )}
                    <Icon name={state === "done" ? "Check" : s.icon} size={15} color={state === "pending" ? "#5C6B95" : state === "running" ? "#7FB0FF" : "#0B0F1E"} strokeWidth={state === "done" ? 3 : 2} />
                  </div>
                  <span style={{ ...mono, fontSize: 9, color: state === "pending" ? "#5C6B95" : "#DDE5F8", fontWeight: state === "running" ? 700 : 500 }}>
                    {s.label}
                  </span>
                </div>
                {i < STAGES.length - 1 && (
                  <span
                    style={{
                      flex: 1,
                      height: 2,
                      marginBottom: 17,
                      borderRadius: 2,
                      background: i < doneCount ? "linear-gradient(90deg,#4F8CFF,#34D399)" : "rgba(255,255,255,.08)",
                      transition: "background .4s ease",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* terminal log */}
        <div style={{ marginTop: 20, background: "#0B0F1E", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "12px 14px", minHeight: 96 }}>
          {LOG_LINES.map((line, i) => (
            <div
              key={i}
              style={{
                ...mono,
                fontSize: 10.5,
                color: i === 0 ? "#8FA3D6" : "#6FCF97",
                opacity: i < doneCount ? 1 : 0,
                transform: i < doneCount ? "translateY(0)" : "translateY(4px)",
                transition: "opacity .35s ease, transform .35s ease",
                padding: "2px 0",
              }}
            >
              {line}
            </div>
          ))}
          <div
            style={{
              ...mono, fontSize: 10.5, color: "#7FB0FF", fontWeight: 600,
              opacity: allLive ? 1 : 0,
              transform: allLive ? "translateY(0)" : "translateY(4px)",
              transition: "opacity .35s ease, transform .35s ease",
              padding: "2px 0",
            }}
          >
            → Live at devline.digital
          </div>
        </div>
      </div>
    </div>
  );
}
