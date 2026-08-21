import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import PageHeader from "../components/sections/PageHeader";
import About from "../components/sections/About";
import StatsImpact from "../components/sections/StatsImpact";
import Practices from "../components/sections/Practices";
import Process from "../components/sections/Process";
import WhyUs from "../components/sections/WhyUs";
import FAQ from "../components/sections/FAQ";
import CTA from "../components/sections/CTA";

export default function CompanyPage() {
  const { t, i18n } = useTranslation();
  // Georgian-only for now, same as WhyUs/Process — see src/locales/*.json "company.faq".
  const faqItems = i18n.resolvedLanguage === "ka"
    ? t("company.faq", { returnObjects: true, defaultValue: [] })
    : [];
  const jsonLd = faqItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : undefined;

  return (
    <>
      <Seo title={t("company.seo.title")} description={t("company.seo.description")} jsonLd={jsonLd} />
      <PageHeader
        eyebrow={t("company.header.eyebrow")}
        title={t("company.header.title")}
        text={t("company.header.text")}
      />
      <About ctaHref="/contact" ctaLabel={t("about.ctaContact")} />
      <StatsImpact />
      <Practices />
      <WhyUs />
      <Process />
      {faqItems.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 py-16 md:py-20">
          <FAQ eyebrow={t("company.faqTitle")} items={faqItems} />
        </section>
      )}
      <CTA />
    </>
  );
}
