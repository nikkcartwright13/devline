import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { T, GRAD, mono, display } from "../../theme";
import { ABOUT_HIGHLIGHTS } from "../../data/about";
import Reveal from "../ui/Reveal";

export default function About({ ctaHref = "/company", ctaLabel }) {
  const { t } = useTranslation();
  const label = ctaLabel || t("about.ctaDefault");

  return (
    <section id="about" className="max-w-6xl mx-auto px-5 py-20 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: T.blue }}>{t("about.section.eyebrow")}</p>
          <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,40px)", marginTop: 10 }}>
            {t("about.section.title")}
          </h2>
          <p style={{ color: T.muted, marginTop: 16, lineHeight: 1.8 }}>
            {t("about.section.text")}
          </p>
          <Link to={ctaHref} className="dl-btn" style={{ display: "inline-block", marginTop: 26, fontSize: 15, fontWeight: 600, background: GRAD, color: "#fff", padding: "13px 28px", borderRadius: 999, textDecoration: "none" }}>
            {label}
          </Link>
        </Reveal>
        <Reveal delay={150}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ABOUT_HIGHLIGHTS.map((key, i) => (
              <div key={key} className={`dl-card ${i % 2 ? "sm:translate-y-4" : ""}`} style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: "22px 20px" }}>
                <div style={{ ...display, fontWeight: 700, fontSize: 17 }}>{t(`about.highlights.${key}.title`)}</div>
                <div style={{ fontSize: 13.5, color: T.muted, marginTop: 6, lineHeight: 1.6 }}>{t(`about.highlights.${key}.text`)}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
