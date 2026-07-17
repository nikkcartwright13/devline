import { useState } from "react";
import { T, mono, display } from "../../theme";
import Icon from "../ui/Icon";

export default function FAQ({ eyebrow, items }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!items || items.length === 0) return null;

  return (
    <div>
      {eyebrow && (
        <p style={{ ...mono, fontSize: 13, letterSpacing: ".1em", color: T.blue }}>
          {eyebrow.toUpperCase()}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.q} style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left", ...display, fontWeight: 600, fontSize: 15.5, color: T.ink }}
              >
                {item.q}
                <Icon name="ChevronDown" size={17} color={T.muted} style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
              </button>
              {isOpen && (
                <p style={{ margin: 0, padding: "0 20px 18px", color: T.muted, fontSize: 14.5, lineHeight: 1.75 }}>
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
