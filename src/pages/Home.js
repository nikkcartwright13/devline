import { useTranslation } from "react-i18next";
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
import About from "../components/sections/About";
import CTA from "../components/sections/CTA";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Seo description={t("home.seo.description")} />
      <HeroCarousel />
      <TechMarquee />
      <Services viewAllHref="/services" />
      <DarkShowcaseGroup nextBg="#EFF3F9">
        <MobileShowcase grouped />
        <JiraShowcase grouped />
        <DesignShowcase grouped />
        <MarketingShowcase grouped />
      </DarkShowcaseGroup>
      <StatsImpact />
      <About />
      <CTA />
    </>
  );
}
