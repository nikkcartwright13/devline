import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { T, GRAD, mono, display } from "../../theme";
import { SERVICE_CATEGORIES } from "../../data/services";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";

export default function Services({ viewAllHref }) {
  const { t } = useTranslation();

  return (
    <section
      id="services"
      className="max-w-6xl mx-auto px-5 py-20 md:py-24"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(16,26,51,.07) 1.5px, transparent 1.5px)",
        backgroundSize: "26px 26px",
        borderRadius: 24,
      }}
    >
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: T.blue }}>{t("services.section.eyebrow")}</p>
            <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,40px)", marginTop: 10 }}>{t("services.section.title")}</h2>
            <p style={{ color: T.muted, marginTop: 12, maxWidth: 520, lineHeight: 1.7 }}>
              {t("services.section.text")}
            </p>
          </div>
          {viewAllHref && (
            <Link to={viewAllHref} className="dl-navlink" style={{ fontSize: 14, fontWeight: 600, color: T.ink, textDecoration: "none" }}>
              {t("services.section.viewAll")}
            </Link>
          )}
        </div>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
        {SERVICE_CATEGORIES.map((cat, i) => (
          <Reveal key={cat.key} delay={i * 80}>
            <Link
              to={`/services#${cat.key}`}
              className="dl-card"
              style={{ display: "block", background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: "28px 24px", height: "100%", textDecoration: "none", color: "inherit" }}
            >
              <span aria-hidden style={{ width: 46, height: 46, borderRadius: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", background: GRAD }}>
                <Icon name={cat.icon} size={22} />
              </span>
              <h3 style={{ ...display, fontWeight: 700, fontSize: 19, margin: "16px 0 10px" }}>{t(`services.categories.${cat.key}.title`)}</h3>
              <p style={{ color: T.muted, fontSize: 14, lineHeight: 1.65, margin: 0 }}>{t(`services.categories.${cat.key}.blurb`)}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
