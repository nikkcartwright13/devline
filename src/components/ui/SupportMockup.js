import { useEffect, useState } from "react";
import { GRAD, mono } from "../../theme";
import Icon from "./Icon";

const PHASE_ORDER = ["incoming", "typing", "replied", "resolved"];
const PHASE_DURATION = { incoming: 1800, typing: 1300, replied: 1700, resolved: 2600 };

const STATUS = {
  incoming: { label: "New", color: "#FBBF24", bg: "rgba(251,191,36,.16)" },
  typing: { label: "In Progress", color: "#7FB0FF", bg: "rgba(79,140,255,.16)" },
  replied: { label: "In Progress", color: "#7FB0FF", bg: "rgba(79,140,255,.16)" },
  resolved: { label: "Resolved", color: "#34D399", bg: "rgba(52,211,153,.16)" },
};

export default function SupportMockup() {
  const [phase, setPhase] = useState("incoming");
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => setPhase(next), PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "resolved") return;
    const tick = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(tick);
  }, [phase]);

  useEffect(() => {
    if (phase === "incoming") setElapsed(0);
  }, [phase]);

  const showTyping = phase === "typing";
  const showReply = phase === "replied" || phase === "resolved";
  const resolved = phase === "resolved";
  const status = STATUS[phase];
  const mins = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const secs = String(elapsed % 60).padStart(2, "0");

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
        animationDelay: ".6s",
      }}
    >
      {/* chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6" }}>
          Support Inbox — Ticket #2291
        </div>
      </div>

      <div style={{ padding: "16px 18px 20px", background: "#151A32" }}>
        {/* status bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34D399", animation: "dl-pulse 1.8s ease-in-out infinite" }} />
            <span style={{ ...mono, fontSize: 9.5, color: "#8FA3D6" }}>24/7 monitoring — online</span>
          </div>
          <span
            style={{
              ...mono, fontSize: 9, fontWeight: 700, color: status.color, background: status.bg,
              borderRadius: 999, padding: "4px 10px", transition: "background .3s ease, color .3s ease",
            }}
          >
            {status.label}
          </span>
        </div>

        {/* chat thread */}
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {/* customer message */}
          <div style={{ display: "flex", justifyContent: "flex-start", animation: "dl-ticket-pop .4s cubic-bezier(.34,1.56,.64,1) both" }}>
            <div style={{ maxWidth: "78%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "4px 14px 14px 14px", padding: "9px 12px" }}>
              <div style={{ fontSize: 11.5, color: "#E4EAFB", lineHeight: 1.5 }}>Our checkout page is throwing a 500 error since this morning 😟</div>
            </div>
          </div>

          {/* typing indicator */}
          {showTyping && (
            <div style={{ display: "flex", justifyContent: "flex-end", animation: "dl-fade .3s ease both" }}>
              <div style={{ display: "flex", gap: 4, background: "rgba(79,140,255,.14)", borderRadius: "14px 4px 14px 14px", padding: "10px 14px" }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#7FB0FF", animation: "dl-pulse .9s ease-in-out infinite", animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}

          {/* agent reply */}
          {showReply && (
            <div key="reply" style={{ display: "flex", justifyContent: "flex-end", animation: "dl-ticket-pop .4s cubic-bezier(.34,1.56,.64,1) both" }}>
              <div style={{ maxWidth: "78%", background: GRAD, borderRadius: "14px 4px 14px 14px", padding: "9px 12px" }}>
                <div style={{ fontSize: 11.5, color: "#fff", lineHeight: 1.5 }}>
                  Found it — bad deploy config. Patched and redeployed, should be live now. Can you confirm? ✅
                </div>
              </div>
            </div>
          )}
        </div>

        {/* footer: SLA timer + rating */}
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 12 }}>
          <span style={{ ...mono, fontSize: 9.5, color: "#7285B0" }}>
            {resolved ? `Resolved in ${mins}:${secs}` : `Response time — ${mins}:${secs}`}
          </span>
          <div style={{ display: "flex", gap: 2 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                style={{
                  opacity: resolved ? 1 : 0,
                  transform: resolved ? "scale(1)" : "scale(.6)",
                  transition: `opacity .3s ease ${i * 0.08}s, transform .3s cubic-bezier(.34,1.56,.64,1) ${i * 0.08}s`,
                }}
              >
                <Icon name="Star" size={12} color="#FBBF24" fill="#FBBF24" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
