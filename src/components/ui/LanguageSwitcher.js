import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { T } from "../../theme";
import { langFromPathname, localizePath, stripLangPrefix } from "../../lib/langRouting";
import Icon from "./Icon";

const LANGS = [
  { code: "ka", label: "ქართული" },
  { code: "en", label: "English" },
  // { code: "ru", label: "Русский" }, // temporarily disabled
  { code: "de", label: "Deutsch" },
  { code: "pl", label: "Polski" },
];

export default function LanguageSwitcher({ style = {} }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const current = langFromPathname(location.pathname);
  const currentLang = LANGS.find((l) => l.code === current) || LANGS[0];

  const switchTo = (code) => {
    const target = localizePath(stripLangPrefix(location.pathname), code) + location.search + location.hash;
    navigate(target);
    setOpen(false);
  };

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
          fontSize: 12.5, fontWeight: 600, color: T.ink, padding: "8px 11px",
          display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
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
            const active = current === l.code;
            return (
              <button
                key={l.code}
                onClick={() => switchTo(l.code)}
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
