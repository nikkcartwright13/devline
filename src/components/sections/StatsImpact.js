import { useTranslation } from "react-i18next";
import { T, mono, display } from "../../theme";
import { IMPACT_STATS } from "../../data/stats";
import Reveal from "../ui/Reveal";
import Counter from "../ui/Counter";

export default function StatsImpact() {
  const { t } = useTranslation();

  return (
    <section
      style={{
        backgroundColor: "#EFF3F9",
        backgroundImage: "radial-gradient(circle, rgba(16,26,51,.07) 1.5px, transparent 1.5px)",
        backgroundSize: "26px 26px",
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-5 py-20 md:py-24">
        <Reveal>
          <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: T.blue }}>{t("stats.section.eyebrow")}</p>
          <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,40px)", marginTop: 10 }}>{t("stats.section.title")}</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-12">
          {IMPACT_STATS.map((s, i) => (
            <Reveal key={s.key} delay={i * 70}>
              <div className="dl-card" style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: "26px 22px", height: "100%" }}>
                <div style={{ ...display, fontWeight: 700, fontSize: "clamp(28px,4vw,36px)", color: T.ink }}>
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div style={{ color: T.muted, fontSize: 14, marginTop: 6 }}>{t(`stats.items.${s.key}`)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
