import { useEffect, useState } from "react";
import { GRAD, mono } from "../../theme";
import Icon from "./Icon";

const STATUS = {
  todo: { label: "TO DO", color: "#7285B0", bg: "rgba(255,255,255,.08)" },
  progress: { label: "IN PROGRESS", color: "#7FB0FF", bg: "rgba(79,140,255,.16)" },
  done: { label: "DONE", color: "#34D399", bg: "rgba(52,211,153,.16)" },
};

const TASKS = [
  { name: "Design onboarding flow", avatar: "#F59E0B", status: "todo" },
  { name: "Ship landing page redesign", avatar: "#8B5CF6", status: "target" },
  { name: "QA regression pass", avatar: "#22D3EE", status: "todo" },
];

const PHASE_ORDER = ["idle", "checking", "done", "automated"];
const PHASE_DURATION = { idle: 1800, checking: 500, done: 1300, automated: 2600 };

export default function ClickUpMockup() {
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => setPhase(next), PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  const checked = phase === "checking" || phase === "done" || phase === "automated";
  const isDone = phase === "done" || phase === "automated";
  const showAutomation = phase === "automated";

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
        animationDelay: ".2s",
      }}
    >
      {/* chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6" }}>
          ClickUp — Sprint 24
        </div>
      </div>

      <div style={{ position: "relative", padding: 16, background: "#151A32" }}>
        {/* task list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {TASKS.map((task) => {
            const isTarget = task.status === "target";
            const statusKey = isTarget ? (isDone ? "done" : "progress") : task.status;
            const s = STATUS[statusKey];
            return (
              <div key={task.name} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "9px 10px" }}>
                <span
                  style={{
                    width: 16, height: 16, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                    border: isTarget && checked ? "none" : "1.5px solid rgba(255,255,255,.25)",
                    background: isTarget && checked ? "#34D399" : "transparent",
                    transition: "background .3s ease, border-color .3s ease",
                  }}
                >
                  {isTarget && checked && <Icon name="Check" size={10} color="#0B0F1E" strokeWidth={3} />}
                </span>
                <span
                  style={{
                    flex: 1, fontSize: 11.5, color: isTarget && isDone ? "#7285B0" : "#E4EAFB",
                    textDecoration: isTarget && isDone ? "line-through" : "none",
                    transition: "color .3s ease",
                  }}
                >
                  {task.name}
                </span>
                <span style={{ width: 18, height: 18, borderRadius: "50%", background: task.avatar, flexShrink: 0 }} />
                <span
                  style={{
                    ...mono, fontSize: 8, fontWeight: 700, color: s.color, background: s.bg,
                    borderRadius: 999, padding: "3px 8px", whiteSpace: "nowrap",
                    transition: "background .3s ease, color .3s ease",
                  }}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* automation toast */}
        <div
          style={{
            marginTop: 12,
            display: "flex", alignItems: "center", gap: 8,
            borderRadius: 10, padding: "9px 12px",
            background: GRAD,
            opacity: showAutomation ? 1 : 0,
            transform: showAutomation ? "translateY(0)" : "translateY(8px)",
            transition: "opacity .4s ease, transform .4s cubic-bezier(.34,1.56,.64,1)",
          }}
        >
          <Icon name="Zap" size={13} color="#fff" fill="#fff" />
          <span style={{ fontSize: 10.5, color: "#fff", fontWeight: 600 }}>
            Automation: Status → Done → notify #general
          </span>
        </div>
      </div>
    </div>
  );
}
