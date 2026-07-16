import { useEffect, useState } from "react";
import { mono, display } from "../../theme";
import { JIRA_BOARD } from "../../data/jira";

const PORTAL_TICKET = { id: "JSM-102", label: "Portal setup", color: "#4F8CFF" };

const PHASE_ORDER = ["todo", "lifting", "moving", "done"];
const PHASE_DURATION = { todo: 2200, lifting: 350, moving: 900, done: 2400 };

const GHOST_TRANSFORM = {
  todo: "translateX(0) scale(1) rotate(0deg)",
  lifting: "translateX(0) scale(1.07) rotate(-3deg)",
  moving: "translateX(148px) scale(1.05) rotate(2deg)",
  done: "translateX(148px) scale(1) rotate(0deg)",
};

function TicketCard({ ticket, lifted, entering }) {
  return (
    <div
      style={{
        background: "#1A2138",
        border: `1px solid ${lifted ? "rgba(79,140,255,.5)" : "rgba(255,255,255,.08)"}`,
        borderRadius: 8,
        padding: "8px 9px",
        animation: entering ? "dl-ticket-pop .45s cubic-bezier(.34,1.56,.64,1) both" : "none",
      }}
    >
      <span style={{ display: "block", width: 22, height: 4, borderRadius: 3, background: ticket.color, marginBottom: 6 }} />
      <span style={{ display: "block", fontSize: 10, color: "#E4EAFB", fontWeight: 500 }}>{ticket.label}</span>
      <span style={{ ...mono, fontSize: 8, color: "#5C6B95", marginTop: 4, display: "block" }}>{ticket.id}</span>
    </div>
  );
}

function ColumnLabel({ title, count }) {
  return (
    <div style={{ ...mono, fontSize: 8.5, letterSpacing: ".08em", color: "#7285B0", marginBottom: 8, paddingLeft: 2 }}>
      {title} · {count}
    </div>
  );
}

export default function JiraBoardMockup() {
  const [phase, setPhase] = useState("todo");

  useEffect(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    const timer = setTimeout(() => setPhase(next), PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  const inTodo = phase === "todo" || phase === "lifting";
  const inProgress = phase === "done";
  const isLifting = phase === "lifting";
  const isMoving = phase === "moving";

  const todoOthers = JIRA_BOARD.columns[0].tickets.filter((t) => t.id !== PORTAL_TICKET.id);
  const inProgressOthers = JIRA_BOARD.columns[1].tickets;
  const doneTickets = JIRA_BOARD.columns[2].tickets;

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
          devline.digital/jsm/board
        </div>
      </div>

      {/* board header */}
      <div style={{ background: "#151A32", padding: "14px 16px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ ...display, fontWeight: 700, fontSize: 13, color: "#fff" }}>Support Board</span>
        <span style={{ ...mono, fontSize: 9, letterSpacing: ".1em", color: "#7FB0FF" }}>JSM</span>
      </div>

      {/* columns */}
      <div style={{ position: "relative", background: "#0F1428", padding: "10px 12px 18px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        <div>
          <ColumnLabel title="TO DO" count={todoOthers.length + (inTodo ? 1 : 0)} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {inTodo && <TicketCard ticket={PORTAL_TICKET} lifted={isLifting} />}
            {todoOthers.map((t) => <TicketCard key={t.id} ticket={t} />)}
          </div>
        </div>

        <div>
          <ColumnLabel title="IN PROGRESS" count={inProgressOthers.length + (inProgress ? 1 : 0)} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {inProgress && <TicketCard ticket={PORTAL_TICKET} entering />}
            {inProgressOthers.map((t) => <TicketCard key={t.id} ticket={t} />)}
          </div>
        </div>

        <div>
          <ColumnLabel title="DONE" count={doneTickets.length} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {doneTickets.map((t) => <TicketCard key={t.id} ticket={t} />)}
          </div>
        </div>

        {/* traveling ghost — carries "Portal setup" from TO DO to IN PROGRESS */}
        <div
          style={{
            position: "absolute",
            left: 12,
            top: 30,
            width: 132,
            opacity: isLifting || isMoving ? 1 : 0,
            transform: GHOST_TRANSFORM[phase],
            transition: "transform .9s cubic-bezier(.34,1.56,.64,1), opacity .35s ease",
            pointerEvents: "none",
            zIndex: 5,
            boxShadow: isLifting || isMoving ? "0 10px 26px rgba(79,140,255,.45)" : "none",
            borderRadius: 8,
          }}
        >
          <TicketCard ticket={PORTAL_TICKET} lifted />
        </div>
      </div>
    </div>
  );
}
