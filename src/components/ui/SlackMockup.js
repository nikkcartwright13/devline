import { useEffect, useState } from "react";
import { GRAD, mono } from "../../theme";
import Icon from "./Icon";

const CHANNELS = ["general", "dev-team", "dev-alerts", "random"];

const PHASE_ORDER = ["waiting", "notification", "reactions", "reply"];
const PHASE_DURATION = { waiting: 1600, notification: 900, reactions: 1400, reply: 2600 };

export default function SlackMockup() {
  const [phase, setPhase] = useState("waiting");

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => setPhase(next), PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  const showBot = phase !== "waiting";
  const showReactions = phase === "reactions" || phase === "reply";
  const showReply = phase === "reply";

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
        animationDelay: ".8s",
      }}
    >
      {/* chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6" }}>
          Slack — devline-workspace
        </div>
      </div>

      <div style={{ display: "flex", background: "#151A32", minHeight: 236 }}>
        {/* channel sidebar */}
        <div style={{ width: 110, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,.08)", padding: "12px 8px" }}>
          <div style={{ ...mono, fontSize: 8, letterSpacing: ".08em", color: "#7285B0", padding: "0 6px", marginBottom: 8 }}>CHANNELS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {CHANNELS.map((c) => {
              const active = c === "dev-alerts";
              return (
                <div
                  key={c}
                  style={{
                    display: "flex", alignItems: "center", gap: 4, borderRadius: 6, padding: "5px 7px",
                    background: active ? "rgba(79,140,255,.18)" : "transparent",
                    transition: "background .3s ease",
                  }}
                >
                  <span style={{ fontSize: 10, color: active ? "#7FB0FF" : "#5C6B95" }}>#</span>
                  <span style={{ fontSize: 9.5, color: active ? "#E4EAFB" : "#7285B0", fontWeight: active ? 600 : 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* message thread */}
        <div style={{ flex: 1, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          {showBot && (
            <div key="bot" style={{ animation: "dl-fade .35s ease both" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ width: 26, height: 26, borderRadius: 7, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="Zap" size={13} color="#fff" fill="#fff" />
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>Jira Bot</span>
                    <span style={{ ...mono, fontSize: 8, color: "#5C6B95" }}>9:41 AM</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#DDE5F8", marginTop: 2, lineHeight: 1.5 }}>
                    🎫 New ticket assigned: <strong>Fix checkout bug</strong> (PROJ-142)
                  </div>

                  {showReactions && (
                    <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
                      {[["👍", 3], ["🚀", 1]].map(([emoji, count], i) => (
                        <span
                          key={emoji}
                          style={{
                            display: "flex", alignItems: "center", gap: 3, background: "rgba(79,140,255,.14)", border: "1px solid rgba(79,140,255,.3)",
                            borderRadius: 999, padding: "2px 7px", fontSize: 10, color: "#7FB0FF",
                            animation: "dl-ticket-pop .3s cubic-bezier(.34,1.56,.64,1) both", animationDelay: `${i * 0.15}s`,
                          }}
                        >
                          {emoji} {count}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {showReply && (
            <div key="reply" style={{ display: "flex", gap: 8, animation: "dl-fade .35s ease both" }}>
              <span style={{ width: 26, height: 26, borderRadius: 7, background: "#8B5CF6", flexShrink: 0 }} />
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>Cartwright</span>
                  <span style={{ ...mono, fontSize: 8, color: "#5C6B95" }}>9:42 AM</span>
                </div>
                <div style={{ fontSize: 11, color: "#DDE5F8", marginTop: 2 }}>On it! 🔧</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
