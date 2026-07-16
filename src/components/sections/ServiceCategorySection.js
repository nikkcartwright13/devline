import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { T, GRAD, mono, display } from "../../theme";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";

export default function ServiceCategorySection({ category }) {
  const { t } = useTranslation();
  const title = t(`services.categories.${category.key}.title`);

  return (
    <section id={category.key} className="max-w-6xl mx-auto px-5 py-14 md:py-16" style={{ scrollMarginTop: 88 }}>
      <Reveal>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span aria-hidden style={{ width: 44, height: 44, borderRadius: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", background: GRAD, flexShrink: 0 }}>
            <Icon name={category.icon} size={21} />
          </span>
          <div>
            <p style={{ ...mono, fontSize: 12, letterSpacing: ".1em", color: T.blue }}>{title.toUpperCase()}</p>
            <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(22px,3vw,30px)", marginTop: 2 }}>{title}</h2>
          </div>
        </div>
        <p style={{ color: T.muted, marginTop: 14, maxWidth: 600, lineHeight: 1.7 }}>{t(`services.categories.${category.key}.blurb`)}</p>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {category.services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 80}>
            <Link
              to={`/services/${s.slug}`}
              id={s.slug === "jira" ? undefined : `svc-${s.slug}`}
              className="dl-card"
              style={{ display: "block", background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: "26px 24px", height: "100%", scrollMarginTop: 96, textDecoration: "none", color: "inherit" }}
            >
              <span aria-hidden style={{ width: 42, height: 42, borderRadius: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", background: GRAD }}>
                <Icon name={s.icon} size={19} />
              </span>
              <h3 style={{ ...display, fontWeight: 700, fontSize: 18, margin: "14px 0 8px" }}>{t(`services.items.${s.slug}.title`)}</h3>
              <p style={{ color: T.muted, fontSize: 14, lineHeight: 1.65, margin: 0 }}>{t(`services.items.${s.slug}.text`)}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
