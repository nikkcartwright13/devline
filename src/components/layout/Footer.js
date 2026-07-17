import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { T, GRAD, display, mono } from "../../theme";
import { SERVICE_CATEGORIES } from "../../data/services";
import { COMPANY_DROPDOWN } from "../../data/nav";

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
    <footer style={{ borderTop: `1px solid ${T.border}`, background: "#fff" }}>
      <div className="max-w-6xl mx-auto px-5 pt-14 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" style={{ ...display, fontWeight: 700, fontSize: 18, color: T.ink, textDecoration: "none" }}>
              devline<span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>.digital</span>
            </Link>
            <p style={{ color: T.muted, fontSize: 13.5, lineHeight: 1.7, marginTop: 14, maxWidth: 240 }}>
              {t("footer.tagline")}
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <div style={{ ...mono, fontSize: 12, letterSpacing: ".08em", color: T.muted, marginBottom: 14 }}>{col.title.toUpperCase()}</div>
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
              <a href="tel:+995555000000" className="dl-navlink" style={{ fontSize: 13.5, color: T.ink, textDecoration: "none", wordBreak: "break-word" }}>+995 555 00 00 00</a>
              <span style={{ fontSize: 13.5, color: T.muted }}>{t("footer.address")}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: `1px solid ${T.border}`, marginTop: 40, paddingTop: 24 }}>
          <span style={{ ...mono, fontSize: 12, color: T.muted }}>© {new Date().getFullYear()} Devline.digital</span>
          <div className="flex gap-6">
            <span style={{ fontSize: 12.5, color: T.muted }}>{t("footer.privacyTerms")}</span>
            <span style={{ fontSize: 12.5, color: T.muted }}>{t("footer.cookiePolicy")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
