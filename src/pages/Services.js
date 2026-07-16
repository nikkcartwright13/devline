import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import PageHeader from "../components/sections/PageHeader";
import Services from "../components/sections/Services";
import ServiceCategorySection from "../components/sections/ServiceCategorySection";
import WebShowcase from "../components/sections/WebShowcase";
import DarkShowcaseGroup from "../components/sections/DarkShowcaseGroup";
import JiraShowcase from "../components/sections/JiraShowcase";
import DesignShowcase from "../components/sections/DesignShowcase";
import MarketingShowcase from "../components/sections/MarketingShowcase";
import Practices from "../components/sections/Practices";
import CTA from "../components/sections/CTA";
import { T } from "../theme";
import { SERVICE_CATEGORIES } from "../data/services";

export default function ServicesPage() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={t("servicesPage.seo.title")} description={t("servicesPage.seo.description")} />
      <PageHeader
        eyebrow={t("servicesPage.header.eyebrow")}
        title={t("servicesPage.header.title")}
        text={t("servicesPage.header.text")}
      />
      <Services />
      {SERVICE_CATEGORIES.map((cat) => (
        <ServiceCategorySection key={cat.key} category={cat} />
      ))}
      <WebShowcase />
      <DarkShowcaseGroup nextBg={T.base}>
        <JiraShowcase grouped />
        <DesignShowcase grouped />
        <MarketingShowcase grouped />
      </DarkShowcaseGroup>
      <Practices />
      <CTA />
    </>
  );
}
