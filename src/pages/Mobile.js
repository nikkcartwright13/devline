import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import PageHeader from "../components/sections/PageHeader";
import MobileShowcase from "../components/sections/MobileShowcase";
import TechMarquee from "../components/sections/TechMarquee";
import CTA from "../components/sections/CTA";

export default function MobilePage() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={t("mobilePage.seo.title")} description={t("mobilePage.seo.description")} />
      <PageHeader
        eyebrow={t("mobilePage.header.eyebrow")}
        title={t("mobilePage.header.title")}
        text={t("mobilePage.header.text")}
      />
      <MobileShowcase />
      <TechMarquee />
      <CTA />
    </>
  );
}
