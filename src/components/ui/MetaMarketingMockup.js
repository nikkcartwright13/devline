import { useEffect, useState } from "react";
import { mono } from "../../theme";
import Icon from "./Icon";

const PHASE_ORDER = ["testing", "deciding", "winner"];
const PHASE_DURATION = { testing: 2200, deciding: 800, winner: 2600 };

const VARIANTS = [
  { key: "A", gradient: "linear-gradient(135deg,#4F8CFF,#22D3EE)", ctr: "2.1%", tickEvery: 900 },
  { key: "B", gradient: "linear-gradient(135deg,#8B5CF6,#F472B6)", ctr: "3.8%", tickEvery: 500 },
];

export default function MetaMarketingMockup() {
  const [phase, setPhase] = useState("testing");
  const [likesA, setLikesA] = useState(212);
  const [likesB, setLikesB] = useState(198);

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => setPhase(next), PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    const a = setInterval(() => setLikesA((v) => (v > 400 ? 212 : v + 1)), VARIANTS[0].tickEvery);
    const b = setInterval(() => setLikesB((v) => (v > 480 ? 198 : v + 3)), VARIANTS[1].tickEvery);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  const winner = phase === "winner";
  const likes = [likesA, likesB];
  const budget = winner ? [8, 92] : [50, 50];

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
        animationDelay: "1.2s",
      }}
    >
      {/* chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#12172B", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 999, padding: "5px 14px", ...mono, fontSize: 10.5, color: "#8FA3D6" }}>
          Meta Ads Manager — A/B Test
        </div>
      </div>

      <div style={{ padding: 16, background: "#151A32" }}>
        <div style={{ display: "flex", gap: 10 }}>
          {VARIANTS.map((v, i) => {
            const isWinner = winner && i === 1;
            const isLoser = winner && i === 0;
            return (
              <div
                key={v.key}
                style={{
                  position: "relative",
                  flex: 1,
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "rgba(255,255,255,.05)",
                  border: isWinner ? "1px solid rgba(52,211,153,.5)" : "1px solid rgba(255,255,255,.08)",
                  opacity: isLoser ? 0.45 : 1,
                  filter: isLoser ? "grayscale(.6)" : "none",
                  transition: "border-color .4s ease, opacity .4s ease, filter .4s ease",
                }}
              >
                {isWinner && (
                  <span
                    style={{
                      position: "absolute", top: 6, right: 6, zIndex: 2, display: "flex", alignItems: "center", gap: 3,
                      background: "#34D399", color: "#0B0F1E", borderRadius: 999, padding: "3px 8px",
                      ...mono, fontSize: 8, fontWeight: 700,
                      animation: "dl-ticket-pop .4s cubic-bezier(.34,1.56,.64,1) both",
                    }}
                  >
                    <Icon name="Star" size={9} color="#0B0F1E" fill="#0B0F1E" /> WINNER
                  </span>
                )}
                {isLoser && (
                  <span style={{ position: "absolute", top: 6, right: 6, zIndex: 2, ...mono, fontSize: 8, fontWeight: 700, color: "#7285B0", background: "rgba(255,255,255,.08)", borderRadius: 999, padding: "3px 8px" }}>
                    PAUSED
                  </span>
                )}

                <div style={{ height: 66, background: v.gradient }} />

                <div style={{ padding: "9px 10px" }}>
                  <span style={{ display: "block", height: 6, width: "80%", borderRadius: 2, background: "rgba(255,255,255,.18)" }} />
                  <span style={{ display: "block", height: 5, width: "55%", borderRadius: 2, background: "rgba(255,255,255,.1)", marginTop: 5 }} />

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 9 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 3, ...mono, fontSize: 9, color: "#DDE5F8" }}>
                      <Icon name="Heart" size={10} color="#F87171" fill="#F87171" /> {likes[i]}
                    </span>
                    <span style={{ ...mono, fontSize: 8.5, color: "#7285B0" }}>CTR {v.ctr}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* budget allocation */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ ...mono, fontSize: 8.5, color: "#7285B0" }}>BUDGET ALLOCATION</span>
          </div>
          <div style={{ display: "flex", height: 6, borderRadius: 3, overflow: "hidden", gap: 2 }}>
            <div style={{ width: `${budget[0]}%`, background: "linear-gradient(90deg,#4F8CFF,#22D3EE)", transition: "width .8s cubic-bezier(.4,0,.2,1)" }} />
            <div style={{ width: `${budget[1]}%`, background: "linear-gradient(90deg,#8B5CF6,#F472B6)", transition: "width .8s cubic-bezier(.4,0,.2,1)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
