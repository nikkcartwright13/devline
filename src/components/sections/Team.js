import { useTranslation } from "react-i18next";
import { T, GRAD, mono, display } from "../../theme";
import { TEAM } from "../../data/team";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";
import PlaceholderBadge from "../ui/PlaceholderBadge";

export default function Team() {
  const { t } = useTranslation();

  return (
    <section className="max-w-6xl mx-auto px-5 py-20 md:py-24">
      <Reveal>
        <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: T.blue }}>{t("team.section.eyebrow")}</p>
        <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,40px)", marginTop: 10 }}>{t("team.section.title")}</h2>
        <p style={{ color: T.muted, marginTop: 12, maxWidth: 560, lineHeight: 1.7 }}>
          {t("team.section.text")}
        </p>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
        {TEAM.map((key, i) => (
          <Reveal key={key} delay={i * 80}>
            <div className="dl-card" style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: "24px 22px", height: "100%", textAlign: "center" }}>
              <PlaceholderBadge />
              <span aria-hidden style={{ width: 68, height: 68, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", background: GRAD, margin: "16px auto 0" }}>
                <Icon name="User" size={30} />
              </span>
              <h3 style={{ ...display, fontWeight: 700, fontSize: 16.5, margin: "14px 0 4px" }}>{t(`team.items.${key}.name`)}</h3>
              <p style={{ color: T.muted, fontSize: 13.5, margin: 0 }}>{t(`team.items.${key}.role`)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
