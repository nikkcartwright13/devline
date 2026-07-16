import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import PageHeader from "../components/sections/PageHeader";
import About from "../components/sections/About";
import StatsImpact from "../components/sections/StatsImpact";
import Practices from "../components/sections/Practices";
import CTA from "../components/sections/CTA";

export default function CompanyPage() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={t("company.seo.title")} description={t("company.seo.description")} />
      <PageHeader
        eyebrow={t("company.header.eyebrow")}
        title={t("company.header.title")}
        text={t("company.header.text")}
      />
      <About ctaHref="/contact" ctaLabel={t("about.ctaContact")} />
      <StatsImpact />
      <Practices />
      <CTA />
    </>
  );
}
