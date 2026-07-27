import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { T, GRAD, display } from "../../theme";
import { SERVICE_CATEGORIES } from "../../data/services";
import { COMPANY_DROPDOWN } from "../../data/nav";
import useScrolled from "../../hooks/useScrolled";
import Icon from "../ui/Icon";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import ThemeToggle from "../ui/ThemeToggle";

function DropdownPanel({ items }) {
  return (
    <div
      className="dl-fade-in"
      style={{
        position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)",
        width: 340, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16,
        boxShadow: "0 20px 50px rgba(16,26,51,.14)", padding: 10, zIndex: 60,
      }}
    >
      {items.map((it) => (
        <Link
          key={it.href}
          to={it.href}
          style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 12px", borderRadius: 10, textDecoration: "none" }}
          className="dl-navlink"
        >
          <span aria-hidden style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", background: GRAD }}>
            <Icon name={it.icon} size={17} />
          </span>
          <span>
            <span style={{ ...display, fontWeight: 600, fontSize: 14, color: T.ink, display: "block" }}>{it.label}</span>
            <span style={{ fontSize: 12.5, color: T.muted }}>{it.text}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

const HEADER_GAP = 10;

export default function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileCategory, setOpenMobileCategory] = useState(null);
  const [menuTop, setMenuTop] = useState(84);
  const navRef = useRef(null);
  const pillRef = useRef(null);
  const location = useLocation();
  const scrolled = useScrolled(10);

  useEffect(() => { setMenuOpen(false); setOpenDropdown(null); setOpenMobileCategory(null); }, [location.pathname]);

  useEffect(() => {
    function onClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenDropdown(null);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const measure = () => {
      if (pillRef.current) setMenuTop(pillRef.current.getBoundingClientRect().bottom + HEADER_GAP);
    };
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", measure); };
  }, [scrolled, menuOpen]);

  const navMenu = useMemo(() => [
    ...SERVICE_CATEGORIES.map((cat) => ({
      label: t(`services.categories.${cat.key}.title`),
      href: `/services#${cat.key}`,
      icon: cat.icon,
      dropdown: cat.services.length > 1
        ? cat.services.map((s) => ({
            icon: s.icon,
            label: t(`services.items.${s.slug}.title`),
            text: t(`services.items.${s.slug}.text`),
            href: `/services/${s.slug}`,
          }))
        : undefined,
    })),
    {
      label: t("header.companyLabel"),
      href: "/company",
      icon: "Building2",
      dropdown: COMPANY_DROPDOWN.map((it) => ({
        icon: it.icon,
        label: t(`nav.companyDropdown.${it.key}.label`),
        text: t(`nav.companyDropdown.${it.key}.text`),
        href: it.href,
      })),
    },
  ], [t]);

  return (
    <header className="sticky z-50 px-5" style={{ top: HEADER_GAP }}>
      <nav
        ref={(el) => { navRef.current = el; pillRef.current = el; }}
        className="max-w-6xl mx-auto flex items-center justify-between"
        style={{
          background: "var(--dl-header-bg)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${T.border}`,
          borderRadius: 999,
          boxShadow: scrolled ? "0 14px 36px rgba(16,26,51,.14)" : "0 8px 24px rgba(16,26,51,.07)",
          paddingTop: scrolled ? 12 : 20,
          paddingBottom: scrolled ? 12 : 20,
          paddingLeft: 28,
          paddingRight: 20,
          transition: "padding .25s ease, box-shadow .25s ease",
        }}
      >
        <Link to="/" style={{ ...display, fontWeight: 700, fontSize: scrolled ? 17 : 20, color: T.ink, textDecoration: "none", flexShrink: 0, transition: "font-size .25s ease" }}>
          devline<span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>.digital</span>
        </Link>

        <div className="hidden lg:flex items-center">
          {navMenu.map((item) => (
            <div key={item.href} style={{ position: "relative" }}>
              {item.dropdown ? (
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                  className="dl-navlink"
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13.5, fontWeight: 500, color: openDropdown === item.href ? T.ink : T.muted, padding: "10px 11px", display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}
                >
                  {item.label}
                  <Icon name="ChevronDown" size={14} style={{ transform: openDropdown === item.href ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
                </button>
              ) : (
                <Link to={item.href} className="dl-navlink" style={{ fontSize: 13.5, fontWeight: 500, color: T.muted, textDecoration: "none", padding: "10px 11px", display: "inline-block", whiteSpace: "nowrap" }}>
                  {item.label}
                </Link>
              )}
              {item.dropdown && openDropdown === item.href && <DropdownPanel items={item.dropdown} />}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link to="/contact" className="dl-btn" style={{ fontSize: 14, fontWeight: 600, background: GRAD, color: "#fff", padding: "10px 20px", borderRadius: 999, textDecoration: "none", whiteSpace: "nowrap" }}>
            {t("header.contactUs")}
          </Link>
        </div>

        <button className="lg:hidden flex items-center justify-center" aria-label={t("header.menuAria")} onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: 8, padding: "6px 9px", color: T.ink }}>
          <Icon name={menuOpen ? "X" : "Menu"} size={18} />
        </button>
      </nav>

      {menuOpen && createPortal(
        <div
          className="lg:hidden dl-fade-in"
          style={{
            position: "fixed",
            top: menuTop,
            left: 0,
            right: 0,
            bottom: 0,
            background: T.base,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            zIndex: 50,
            padding: "16px 16px 28px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: 10, marginBottom: 14, boxShadow: "0 8px 20px rgba(16,26,51,.05)" }}>
            <LanguageSwitcher style={{ width: "fit-content" }} />
            <ThemeToggle />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {navMenu.map((item) => (
              <div key={item.href} style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 20px rgba(16,26,51,.05)" }}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setOpenMobileCategory(openMobileCategory === item.href ? null : item.href)}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "none", border: "none", fontWeight: 600, fontSize: 15, color: T.ink, textAlign: "left", cursor: "pointer" }}
                    >
                      <span aria-hidden style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", background: GRAD }}>
                        <Icon name={item.icon} size={16} />
                      </span>
                      <span style={{ flex: 1 }}>{item.label}</span>
                      <Icon name="ChevronDown" size={16} color={T.muted} style={{ transform: openMobileCategory === item.href ? "rotate(180deg)" : "none", transition: "transform .2s ease", flexShrink: 0 }} />
                    </button>
                    {openMobileCategory === item.href && (
                      <div className="dl-fade-in" style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 8px 10px", borderTop: `1px solid ${T.border}`, marginTop: 2, paddingTop: 8 }}>
                        {item.dropdown.map((it) => (
                          <Link key={it.href} to={it.href} className="dl-navlink" style={{ display: "flex", alignItems: "center", gap: 10, color: T.muted, textDecoration: "none", fontSize: 13.5, fontWeight: 500, padding: "9px 10px", borderRadius: 10 }}>
                            <Icon name={it.icon} size={15} style={{ flexShrink: 0 }} />
                            {it.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.href} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", color: T.ink, textDecoration: "none", fontWeight: 600, fontSize: 15 }}>
                    <span aria-hidden style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", background: GRAD }}>
                      <Icon name={item.icon} size={16} />
                    </span>
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <Link to="/contact" style={{ display: "block", textAlign: "center", fontSize: 14, fontWeight: 600, background: GRAD, color: "#fff", padding: "14px 16px", borderRadius: 999, textDecoration: "none", marginTop: 16 }}>
            {t("header.contactUs")}
          </Link>
        </div>,
        document.body
      )}
    </header>
  );
}
