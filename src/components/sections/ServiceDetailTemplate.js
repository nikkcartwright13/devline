import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Seo from "../Seo";
import CTA from "./CTA";
import FAQ from "./FAQ";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";
import { T, GRAD, mono, display } from "../../theme";
import { SERVICE_CATEGORIES } from "../../data/services";

export default function ServiceDetailTemplate({ slug, children }) {
  const { t } = useTranslation();
  const category = SERVICE_CATEGORIES.find((c) => c.services.some((s) => s.slug === slug));
  const related = category.services.filter((s) => s.slug !== slug);

  const title = t(`services.items.${slug}.title`);
  const text = t(`services.items.${slug}.text`);
  const features = t(`services.items.${slug}.features`, { returnObjects: true });
  const faqItems = t(`serviceDetail.faq.${slug}`, { returnObjects: true, defaultValue: [] });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: title,
      description: text,
      provider: { "@type": "Organization", name: "Devline.digital", url: "https://devline.digital" },
    },
  ];
  if (faqItems.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      <Seo title={title} description={text} jsonLd={jsonLd} />

      {children}

      <section className="max-w-6xl mx-auto px-5 py-16 md:py-20">
        <Reveal>
          <p style={{ ...mono, fontSize: 13, letterSpacing: ".1em", color: T.blue }}>
            {t("serviceDetail.whatsIncluded").toUpperCase()}
          </p>
          <div className="grid sm:grid-cols-2 gap-5 mt-8">
            {features.map((f, i) => (
              <div key={i} className="dl-card" style={{ display: "flex", gap: 14, alignItems: "flex-start", background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: "20px 22px" }}>
                <span aria-hidden style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", background: GRAD }}>
                  <Icon name="Check" size={17} />
                </span>
                <p style={{ color: T.ink, fontSize: 15, lineHeight: 1.6, margin: 0, paddingTop: 5 }}>{f}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {faqItems.length > 0 && (
          <Reveal delay={100}>
            <div style={{ marginTop: 64 }}>
              <FAQ eyebrow={t("serviceDetail.faqTitle")} items={faqItems} />
            </div>
          </Reveal>
        )}

        {related.length > 0 && (
          <Reveal delay={100}>
            <div style={{ marginTop: 64 }}>
              <p style={{ ...mono, fontSize: 13, letterSpacing: ".1em", color: T.blue }}>
                {t("serviceDetail.related").toUpperCase()}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="dl-card"
                    style={{ display: "block", background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: "22px 22px", textDecoration: "none", color: "inherit" }}
                  >
                    <span aria-hidden style={{ width: 38, height: 38, borderRadius: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", background: GRAD }}>
                      <Icon name={s.icon} size={18} />
                    </span>
                    <h3 style={{ ...display, fontWeight: 700, fontSize: 16, margin: "14px 0 0" }}>{t(`services.items.${s.slug}.title`)}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        <Reveal delay={150}>
          <Link to="/services" className="dl-navlink" style={{ display: "inline-block", marginTop: 40, fontSize: 14, fontWeight: 600, color: T.ink, textDecoration: "none" }}>
            ← {t("serviceDetail.backToServices")}
          </Link>
        </Reveal>
      </section>

      <CTA />
    </>
  );
}
