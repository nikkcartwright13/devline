import { useEffect, useState } from "react";
import { GRAD, mono } from "../../theme";
import Icon from "./Icon";

const QUESTION = "How do I reset my account password?";

const PHASE_ORDER = ["typing", "suggesting", "submitted"];
const PHASE_DURATION = { typing: 2000, suggesting: 1900, submitted: 2600 };

export default function JsmPortalMockup() {
  const [phase, setPhase] = useState("typing");
  const [chars, setChars] = useState(0);

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => {
      if (next === "typing") setChars(0);
      setPhase(next);
    }, PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "typing") { setChars(QUESTION.length); return; }
    const step = setInterval(() => {
      setChars((c) => (c >= QUESTION.length ? c : c + 1));
    }, PHASE_DURATION.typing / QUESTION.length);
    return () => clearInterval(step);
  }, [phase]);

  const submitted = phase === "submitted";
  const showSuggestion = phase === "suggesting" || phase === "submitted";

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
        animationDelay: ".5s",
      }}
    >
      {/* chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6" }}>
          JSM — Customer Portal
        </div>
      </div>

      <div style={{ position: "relative", padding: 16, background: "#151A32", minHeight: 220 }}>
        {!submitted && (
          <div style={{ animation: "dl-fade .3s ease both" }}>
            <span style={{ ...mono, fontSize: 8.5, letterSpacing: ".08em", color: "#7285B0" }}>REQUEST TYPE</span>
            <div style={{ marginTop: 6, display: "inline-block", background: "rgba(79,140,255,.16)", border: "1px solid rgba(79,140,255,.4)", borderRadius: 999, padding: "5px 12px" }}>
              <span style={{ fontSize: 10.5, color: "#7FB0FF", fontWeight: 600 }}>Technical Issue</span>
            </div>

            <div style={{ marginTop: 12, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "12px 14px", minHeight: 46 }}>
              <span style={{ fontSize: 12, color: "#E4EAFB" }}>
                {QUESTION.slice(0, chars)}
                {phase === "typing" && (
                  <span style={{ display: "inline-block", width: 5, height: 13, background: "#7FB0FF", marginLeft: 2, verticalAlign: "middle", animation: "dl-pulse .9s ease-in-out infinite" }} />
                )}
              </span>
            </div>

            {showSuggestion && (
              <div
                key="suggestion"
                style={{
                  marginTop: 10, display: "flex", gap: 10, alignItems: "flex-start",
                  background: "rgba(52,211,153,.08)", border: "1px solid rgba(52,211,153,.3)", borderRadius: 10, padding: "10px 12px",
                  animation: "dl-ticket-pop .4s cubic-bezier(.34,1.56,.64,1) both",
                }}
              >
                <span style={{ width: 26, height: 26, borderRadius: 8, background: "#34D399", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="Newspaper" size={13} color="#0B0F1E" />
                </span>
                <div>
                  <div style={{ fontSize: 11, color: "#E4EAFB", fontWeight: 600 }}>Suggested: "How to reset your password"</div>
                  <div style={{ ...mono, fontSize: 9, color: "#6FCF97", marginTop: 3 }}>👍 87% found this helpful</div>
                </div>
              </div>
            )}
          </div>
        )}

        {submitted && (
          <div key="submitted" style={{ animation: "dl-fade .35s ease both" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 34, height: 34, borderRadius: 10, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="Ticket" size={16} color="#fff" />
              </span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Ticket JSM-118 created</div>
                <div style={{ fontSize: 11, color: "#7285B0" }}>Technical Issue · Password reset</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "10px 12px" }}>
                <Icon name="Clock" size={14} color="#F59E0B" />
                <div>
                  <div style={{ ...mono, fontSize: 8, color: "#7285B0" }}>RESPONSE SLA</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginTop: 2 }}>3h 42m</div>
                </div>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "10px 12px" }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#8B5CF6", flexShrink: 0 }} />
                <div>
                  <div style={{ ...mono, fontSize: 8, color: "#7285B0" }}>ASSIGNED TO</div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: "#fff", marginTop: 2 }}>Support Team</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
