import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { T } from "../../theme";
import { langFromPathname, localizePath, stripLangPrefix } from "../../lib/langRouting";
import Icon from "./Icon";

const LANGS = [
  { code: "ka", label: "ქართული" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "pl", label: "Polski" },
];

export default function LanguageSwitcher({ style = {} }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  // router.pathname (matched route pattern) for anything rendered — it's
  // consistent between server and client even for the shared static 404
  // page, unlike router.asPath, which reflects whatever URL the visitor
  // actually typed and would mismatch the "ka" the 404 page was built as.
  const current = langFromPathname(router.pathname);
  const currentLang = LANGS.find((l) => l.code === current) || LANGS[0];

  const switchTo = (code) => {
    // Safe to use asPath here: this only runs from a click handler, never
    // during render, so there's no hydration comparison to disagree with.
    const asPath = router.asPath;
    const pathname = asPath.split(/[?#]/)[0];
    const rest = asPath.slice(pathname.length);
    const target = localizePath(stripLangPrefix(pathname), code) + rest;
    router.push(target);
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
