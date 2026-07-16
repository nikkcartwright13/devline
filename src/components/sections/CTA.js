import { useTranslation } from "react-i18next";
import { T, DARK, display } from "../../theme";
import Reveal from "../ui/Reveal";
import Orb from "../ui/Orb";

export default function CTA() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="max-w-6xl mx-auto px-5 pb-20 md:pb-24">
      <Reveal>
        <div style={{ position: "relative", background: DARK, borderRadius: 24, padding: "clamp(32px,6vw,64px)", color: "#fff", overflow: "hidden" }}>
          <Orb size={300} top="-80px" right="-60px" colors={[T.violet, "transparent"]} dur={10} opacity={0.45} />
          <Orb size={260} bottom="-100px" left="-40px" colors={[T.blue, "transparent"]} dur={13} opacity={0.4} />
          <div style={{ position: "relative" }}>
            <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4.5vw,44px)", maxWidth: 560 }}>
              {t("cta.title")}
            </h2>
            <p style={{ color: "#B9C6E6", maxWidth: 480, marginTop: 14, lineHeight: 1.7 }}>
              {t("cta.text")}
            </p>
            <div className="flex flex-wrap gap-4 mt-9">
              <a href="mailto:hello@devline.digital" className="dl-btn" style={{ fontSize: 15, fontWeight: 600, background: "#fff", color: T.ink, padding: "14px 30px", borderRadius: 999, textDecoration: "none" }}>
                hello@devline.digital
              </a>
              <a href="tel:+995555000000" className="dl-btn" style={{ fontSize: 15, fontWeight: 500, border: "1px solid rgba(255,255,255,.3)", color: "#fff", padding: "14px 30px", borderRadius: 999, textDecoration: "none" }}>
                +995 555 00 00 00
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
