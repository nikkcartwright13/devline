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
          background: "rgba(247,249,252,.85)",
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
          className="lg:hidden"
          style={{
            position: "fixed",
            top: menuTop,
            left: 0,
            right: 0,
            bottom: 0,
            background: T.base,
            borderTop: `1px solid ${T.border}`,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            zIndex: 50,
          }}
        >
          <div className="px-5" style={{ paddingTop: 16, paddingBottom: 10 }}>
            <LanguageSwitcher style={{ width: "fit-content" }} />
          </div>

          {navMenu.map((item) => (
            <div key={item.href} className="px-5" style={{ borderTop: `1px solid ${T.border}` }}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => setOpenMobileCategory(openMobileCategory === item.href ? null : item.href)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", background: "none", border: "none", fontWeight: 600, fontSize: 15, color: T.ink, textAlign: "left" }}
                  >
                    {item.label}
                    <Icon name="ChevronDown" size={16} color={T.muted} style={{ transform: openMobileCategory === item.href ? "rotate(180deg)" : "none", transition: "transform .2s ease", flexShrink: 0 }} />
                  </button>
                  {openMobileCategory === item.href && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingBottom: 12 }}>
                      {item.dropdown.map((it) => (
                        <Link key={it.href} to={it.href} className="dl-navlink" style={{ color: T.muted, textDecoration: "none", fontSize: 14, padding: "9px 12px", borderRadius: 8, background: T.panel, border: `1px solid ${T.border}` }}>
                          {it.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={item.href} style={{ display: "block", padding: "14px 0", color: T.ink, textDecoration: "none", fontWeight: 600, fontSize: 15 }}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <div className="px-5" style={{ paddingTop: 18, paddingBottom: 28 }}>
            <Link to="/contact" style={{ display: "block", textAlign: "center", fontSize: 14, fontWeight: 600, background: GRAD, color: "#fff", padding: "13px 16px", borderRadius: 999, textDecoration: "none" }}>
              {t("header.contactUs")}
            </Link>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
