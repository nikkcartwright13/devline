import { useTranslation } from "react-i18next";
import { T, GRAD, mono, display } from "../../theme";
import { STEPS } from "../../data/process";
import Reveal from "../ui/Reveal";

// Georgian-only for now — remove this guard once the copy has been
// translated into en/de/pl (see src/locales/*.json "process" namespace).
export default function Process() {
  const { t, i18n } = useTranslation();
  if (i18n.resolvedLanguage !== "ka") return null;

  return (
    <section id="process" style={{ background: T.alt, borderBottom: `1px solid ${T.border}` }}>
      <div className="max-w-6xl mx-auto px-5 py-20 md:py-24">
        <Reveal>
          <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: T.blue }}>{t("process.section.eyebrow")}</p>
          <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,40px)", marginTop: 10 }}>{t("process.section.title")}</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {STEPS.map((st, i) => (
            <Reveal key={st.n} delay={i * 100}>
              <div className="dl-card" style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: "26px 24px", height: "100%", position: "relative" }}>
                <span style={{ ...display, fontWeight: 700, fontSize: 40, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", opacity: 0.9 }}>{st.n}</span>
                <h3 style={{ ...display, fontWeight: 700, fontSize: 19, margin: "12px 0 8px" }}>{t(`process.items.${st.key}.title`)}</h3>
                <p style={{ color: T.muted, fontSize: 14.5, lineHeight: 1.65, margin: 0 }}>{t(`process.items.${st.key}.text`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
