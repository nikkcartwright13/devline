import { useTranslation } from "react-i18next";
import { T, GRAD, mono, display } from "../../theme";
import useCarousel from "../../hooks/useCarousel";
import Reveal from "../ui/Reveal";
import CarouselDots from "../ui/CarouselDots";
import PlaceholderBadge from "../ui/PlaceholderBadge";

export default function Testimonials() {
  const { t } = useTranslation();
  const items = t("testimonials.items", { returnObjects: true });
  const { index, setIndex } = useCarousel(items.length, { interval: 6000 });
  const current = items[index];

  return (
    <section className="max-w-6xl mx-auto px-5 py-20 md:py-24">
      <Reveal>
        <div style={{ textAlign: "center" }}>
          <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: T.blue }}>{t("testimonials.section.eyebrow")}</p>
          <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,40px)", marginTop: 10 }}>
            {t("testimonials.section.title")}
          </h2>
          <div style={{ marginTop: 12 }}>
            <PlaceholderBadge />
          </div>
        </div>
      </Reveal>

      <div style={{ maxWidth: 720, margin: "40px auto 0" }}>
        <div key={index} className="dl-fade-in" style={{ textAlign: "center" }}>
          <span aria-hidden style={{ ...display, fontSize: 56, fontWeight: 700, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>“</span>
          <p style={{ fontSize: 19, lineHeight: 1.75, color: T.ink, margin: "0 0 20px" }}>{current.quote}</p>
          <div style={{ ...display, fontWeight: 700, fontSize: 15 }}>{current.author}</div>
          <div style={{ color: T.muted, fontSize: 13.5, marginTop: 2 }}>{current.role}</div>
        </div>

        <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
          <CarouselDots count={items.length} index={index} onSelect={setIndex} color={T.blue} inactiveColor={T.border} />
        </div>
      </div>
    </section>
  );
}
