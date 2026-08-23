import { useTranslation } from "react-i18next";
import Link from "../ui/LocalizedLink";
import { T, GRAD, display, mono } from "../../theme";
import { SERVICE_CATEGORIES } from "../../data/services";
import { COMPANY_DROPDOWN } from "../../data/nav";
import logo from "../../assets/logo/optimized/title_logo.png";
import { upperLabel } from "../../lib/text";

// lucide-react dropped brand/logo icons (LinkedIn included), so this is a
// plain inline SVG of the standard LinkedIn glyph instead of Icon.js.
function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useTranslation();

  const footerColumns = [
    {
      title: t("services.section.title"),
      links: SERVICE_CATEGORIES.map((cat) => [t(`services.categories.${cat.key}.title`), `/services#${cat.key}`]),
    },
    {
      title: t("header.companyLabel"),
      links: COMPANY_DROPDOWN.map((it) => [t(`nav.companyDropdown.${it.key}.label`), it.href]),
    },
  ];

  return (
    <footer style={{ borderTop: `1px solid ${T.border}`, background: T.panel }}>
      <div className="max-w-6xl mx-auto px-5 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
              <img src={logo.src} alt="" width={26} height={26} style={{ borderRadius: 7, display: "block" }} />
              <span style={{ ...display, fontWeight: 700, fontSize: 18, color: T.ink }}>
                devline<span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>.digital</span>
              </span>
            </Link>
            <p style={{ color: T.muted, fontSize: 13.5, lineHeight: 1.7, marginTop: 14, maxWidth: 240 }}>
              {t("footer.tagline")}
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <div style={{ ...mono, fontSize: 12, letterSpacing: ".08em", color: T.muted, marginBottom: 14 }}>{upperLabel(col.title)}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(([label, href]) => (
                  <Link key={href} to={href} className="dl-navlink" style={{ fontSize: 13.5, color: T.ink, textDecoration: "none" }}>{label}</Link>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div style={{ ...mono, fontSize: 12, letterSpacing: ".08em", color: T.muted, marginBottom: 14 }}>{t("footer.contactHeading")}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="mailto:hello@devline.digital" className="dl-navlink" style={{ fontSize: 13.5, color: T.ink, textDecoration: "none", wordBreak: "break-word" }}>hello@devline.digital</a>
              <span style={{ fontSize: 13.5, color: T.muted }}>{t("footer.address")}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: `1px solid ${T.border}`, marginTop: 40, paddingTop: 24 }}>
          <span style={{ ...mono, fontSize: 12, color: T.muted }}>© {new Date().getFullYear()} Devline.digital</span>
          <div className="flex items-center gap-6">
            <span style={{ fontSize: 12.5, color: T.muted }}>{t("footer.privacyTerms")}</span>
            <span style={{ fontSize: 12.5, color: T.muted }}>{t("footer.cookiePolicy")}</span>
            <a
              href="https://www.linkedin.com/company/devline-digital/"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={t("footer.linkedinAria")}
              style={{ display: "flex", alignItems: "center", color: T.muted, transition: "color .15s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.ink)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
            >
              <LinkedinIcon width={18} height={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
