import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { T, GRAD, mono, display } from "../../theme";
import { PRACTICES } from "../../data/practices";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";

export default function Practices() {
  const { t } = useTranslation();

  return (
    <section className="max-w-6xl mx-auto px-5 py-20 md:py-24">
      <Reveal>
        <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: T.blue }}>{t("practices.section.eyebrow")}</p>
        <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,40px)", marginTop: 10 }}>{t("practices.section.title")}</h2>
        <p style={{ color: T.muted, marginTop: 12, maxWidth: 560, lineHeight: 1.7 }}>
          {t("practices.section.text")}
        </p>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
        {PRACTICES.map((p, i) => (
          <Reveal key={p.key} delay={i * 80}>
            <div className="dl-card" style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: "26px 24px", height: "100%" }}>
              <span aria-hidden style={{ width: 42, height: 42, borderRadius: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", background: GRAD }}>
                <Icon name={p.icon} size={20} />
              </span>
              <h3 style={{ ...display, fontWeight: 700, fontSize: 18, margin: "14px 0 8px" }}>{t(`practices.items.${p.key}.title`)}</h3>
              <p style={{ color: T.muted, fontSize: 14, lineHeight: 1.65, margin: 0 }}>{t(`practices.items.${p.key}.text`)}</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={PRACTICES.length * 80}>
          <div style={{ background: GRAD, borderRadius: 16, padding: "26px 24px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff" }}>
            <div>
              <h3 style={{ ...display, fontWeight: 700, fontSize: 18, margin: "0 0 8px" }}>{t("practices.cta.title")}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.92, margin: 0 }}>{t("practices.cta.text")}</p>
            </div>
            <Link to="/contact" className="dl-btn" style={{ marginTop: 18, display: "inline-block", fontSize: 14, fontWeight: 600, background: "#fff", color: T.ink, padding: "11px 20px", borderRadius: 999, textDecoration: "none", width: "fit-content" }}>
              {t("practices.cta.button")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
