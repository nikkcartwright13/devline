import { useTranslation } from "react-i18next";
import { T } from "../theme";
import Seo from "../components/Seo";
import HeroCarousel from "../components/sections/HeroCarousel";
import TechMarquee from "../components/sections/TechMarquee";
import Services from "../components/sections/Services";
import DarkShowcaseGroup from "../components/sections/DarkShowcaseGroup";
import MobileShowcase from "../components/sections/MobileShowcase";
import JiraShowcase from "../components/sections/JiraShowcase";
import DesignShowcase from "../components/sections/DesignShowcase";
import MarketingShowcase from "../components/sections/MarketingShowcase";
import StatsImpact from "../components/sections/StatsImpact";
import WhyUs from "../components/sections/WhyUs";
import About from "../components/sections/About";
import CTA from "../components/sections/CTA";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Seo
        title={t("home.seo.title", { defaultValue: "", fallbackLng: false }) || undefined}
        description={t("home.seo.description")}
      />
      <HeroCarousel />
      <TechMarquee />
      <Services viewAllHref="/services" />
      <DarkShowcaseGroup nextBg={T.alt}>
        <MobileShowcase grouped />
        <JiraShowcase grouped />
        <DesignShowcase grouped />
        <MarketingShowcase grouped />
      </DarkShowcaseGroup>
      <StatsImpact />
      <WhyUs />
      <About />
      <CTA />
    </>
  );
}
