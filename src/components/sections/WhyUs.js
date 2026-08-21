import { useTranslation } from "react-i18next";
import { T, GRAD, mono, display } from "../../theme";
import { WHY_US } from "../../data/whyUs";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";

// Georgian-only for now — remove this guard once the copy has been
// translated into en/de/pl (see src/locales/*.json "whyUs" namespace).
export default function WhyUs() {
  const { t, i18n } = useTranslation();
  if (i18n.resolvedLanguage !== "ka") return null;

  return (
    <section className="max-w-6xl mx-auto px-5 py-20 md:py-24">
      <Reveal>
        <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: T.blue }}>{t("whyUs.section.eyebrow")}</p>
        <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,40px)", marginTop: 10 }}>{t("whyUs.section.title")}</h2>
        <p style={{ color: T.muted, marginTop: 12, maxWidth: 560, lineHeight: 1.7 }}>{t("whyUs.section.text")}</p>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
        {WHY_US.map((item, i) => (
          <Reveal key={item.key} delay={i * 80}>
            <div className="dl-card" style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: "26px 24px", height: "100%" }}>
              <span aria-hidden style={{ width: 42, height: 42, borderRadius: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", background: GRAD }}>
                <Icon name={item.icon} size={20} />
              </span>
              <h3 style={{ ...display, fontWeight: 700, fontSize: 18, margin: "14px 0 8px" }}>{t(`whyUs.items.${item.key}.title`)}</h3>
              <p style={{ color: T.muted, fontSize: 14, lineHeight: 1.65, margin: 0 }}>{t(`whyUs.items.${item.key}.text`)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
