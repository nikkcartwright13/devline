import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { T } from "../../theme";
import Icon from "./Icon";

const LANGS = [
  { code: "ka", label: "ქართული" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "de", label: "Deutsch" },
];

export default function LanguageSwitcher({ style = {} }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = i18n.resolvedLanguage || i18n.language || "ka";
  const currentLang = LANGS.find((l) => current.startsWith(l.code)) || LANGS[0];

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", ...style }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="dl-navlink"
        style={{
          background: "none", border: `1px solid ${T.border}`, borderRadius: 999, cursor: "pointer",
          fontSize: 13, fontWeight: 600, color: T.ink, padding: "8px 14px",
          display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
        }}
      >
        {currentLang.code.toUpperCase()}
        <Icon name="ChevronDown" size={13} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
      </button>

      {open && (
        <div
          className="dl-fade-in absolute left-0 lg:left-auto lg:right-0"
          style={{
            top: "calc(100% + 8px)", minWidth: 170,
            background: T.panel, border: `1px solid ${T.border}`, borderRadius: 14,
            boxShadow: "0 20px 50px rgba(16,26,51,.14)", padding: 6, zIndex: 60,
          }}
        >
          {LANGS.map((l) => {
            const active = current.startsWith(l.code);
            return (
              <button
                key={l.code}
                onClick={() => { i18n.changeLanguage(l.code); setOpen(false); }}
                style={{
                  width: "100%", textAlign: "left", background: active ? T.base : "none", border: "none",
                  borderRadius: 8, padding: "9px 12px", fontSize: 13.5, fontWeight: active ? 700 : 500,
                  color: active ? T.ink : T.muted, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}
              >
                {l.label}
                {active && <Icon name="Check" size={14} color={T.blue} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
