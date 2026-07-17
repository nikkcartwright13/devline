import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { T, DARK, GRAD, mono, display, gradientText } from "../../theme";
import { HERO_HREFS } from "../../data/hero";
import useCarousel from "../../hooks/useCarousel";
import Orb from "../ui/Orb";
import CarouselDots from "../ui/CarouselDots";
import Counter from "../ui/Counter";
import Tilt3D from "../ui/Tilt3D";
import WebsiteMockup from "../ui/WebsiteMockup";
import PhoneMockup from "../ui/PhoneMockup";

export default function HeroCarousel() {
  const { t } = useTranslation();
  const { index, setIndex } = useCarousel(HERO_HREFS.length, { interval: 7000 });
  const slides = t("hero.slides", { returnObjects: true });

  const stats = [
    [30, "+", t("hero.stats.projects")],
    [8, "+", t("hero.stats.experience")],
    [99, "%", t("hero.stats.uptime")],
  ];

  return (
    <section id="top" style={{ position: "relative", background: DARK, color: "#fff", overflow: "hidden", marginTop: -90 }}>
      <Orb size={420} top="-120px" left="-100px" colors={[T.blue, "transparent"]} dur={14} />
      <Orb size={360} bottom="-140px" right="-80px" colors={[T.violet, "transparent"]} dur={11} delay={1} />
      <Orb size={220} top="30%" right="18%" colors={["#22D3EE", "transparent"]} dur={9} delay={0.5} opacity={0.35} />

      <div className="max-w-6xl mx-auto px-5 pt-32 pb-28 md:pt-40 md:pb-36 relative grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-10 items-center">
        <div>
          <div style={{ display: "grid" }}>
            {slides.map((s, i) => (
              <div
                key={i}
                inert={i !== index ? "" : undefined}
                aria-hidden={i !== index}
                style={{
                  gridArea: "1 / 1",
                  minWidth: 0,
                  opacity: i === index ? 1 : 0,
                  pointerEvents: i === index ? "auto" : "none",
                  transition: "opacity .4s ease",
                }}
              >
                <span style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: "#A5B8E8", border: "1px solid rgba(255,255,255,.18)", borderRadius: 999, padding: "7px 16px", display: "inline-block" }}>
                  {s.eyebrow}
                </span>
                <h1 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,6vw,40px)", lineHeight: 1.1, marginTop: 26 }}>
                  {s.title}
                </h1>
                <p style={{ fontSize: 18, color: "#B9C6E6", maxWidth: 560, marginTop: 22, lineHeight: 1.75 }}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          {/* fixed CTA — stays put while the slide text above rotates */}
          <div className="flex flex-wrap gap-4 mt-10">
            <Link to="/contact" className="dl-btn" style={{ fontSize: 15, fontWeight: 600, background: GRAD, color: "#fff", padding: "14px 30px", borderRadius: 999, textDecoration: "none" }}>
              {t("hero.cta.primary")}
            </Link>
            <Link to="/services" className="dl-btn" style={{ fontSize: 15, fontWeight: 500, border: "1px solid rgba(255,255,255,.3)", color: "#fff", padding: "14px 30px", borderRadius: 999, textDecoration: "none" }}>
              {t("hero.cta.secondary")}
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <CarouselDots count={HERO_HREFS.length} index={index} onSelect={setIndex} color={GRAD} />
          </div>

          {/* stats row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-16 max-w-lg">
            {stats.map(([n, s, l]) => (
              <div key={l}>
                <div style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,38px)", ...gradientText }}>
                  <Counter to={n} suffix={s} />
                </div>
                <div style={{ fontSize: "clamp(10.5px,3vw,13px)", color: "#93A5CE", marginTop: 4, lineHeight: 1.3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D visual accent */}
        <div className="dl-hero-visual flex justify-center items-center" style={{ position: "relative" }}>
          <span aria-hidden className="dl-hero-glow-a" style={{ position: "absolute", borderRadius: "50%", background: "radial-gradient(circle, rgba(79,140,255,.35), transparent 70%)", filter: "blur(30px)" }} />
          <span aria-hidden className="dl-hero-glow-b" style={{ position: "absolute", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,.32), transparent 70%)", filter: "blur(26px)" }} />

          <Tilt3D max={16}>
            <div className="dl-hero-mockup" style={{ transform: "translateZ(0px)" }}>
              <WebsiteMockup />
            </div>

            <div className="dl-hero-phone" style={{ position: "absolute", zIndex: 3 }}>
              <PhoneMockup variant="front" />
            </div>

            <div
              className="dl-hero-badge"
              style={{
                position: "absolute", zIndex: 4,
                animation: "dl-web-float 6s ease-in-out infinite alternate",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.08)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 14, padding: "10px 14px", boxShadow: "0 20px 40px rgba(16,26,51,.4)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34D399", animation: "dl-pulse 1.6s ease-in-out infinite", flexShrink: 0 }} />
                <span style={{ ...mono, fontSize: 11.5, color: "#fff", fontWeight: 600, whiteSpace: "nowrap" }}>Live in production</span>
              </div>
            </div>
          </Tilt3D>
        </div>
      </div>

      {/* wave divider into light section */}
      <svg aria-hidden viewBox="0 0 1440 90" style={{ display: "block", width: "100%", marginBottom: -1 }}>
        <path d="M0,60 C360,110 1080,0 1440,50 L1440,90 L0,90 Z" fill={T.base} />
      </svg>
    </section>
  );
}
