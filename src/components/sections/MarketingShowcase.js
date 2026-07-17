import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { T, DARK, GRAD, mono, display, gradientText } from "../../theme";
import Reveal from "../ui/Reveal";
import Orb from "../ui/Orb";
import Tilt3D from "../ui/Tilt3D";
import MarketingMockup from "../ui/MarketingMockup";
import Icon from "../ui/Icon";

export default function MarketingShowcase({ grouped = false }) {
  const { t } = useTranslation();
  const features = t("marketing.features", { returnObjects: true });

  return (
    <section id="marketing-showcase" style={{ position: "relative", background: grouped ? "transparent" : DARK, color: "#fff", overflow: "hidden" }}>
      <Orb size={320} top="-90px" right="-70px" colors={[T.blue, "transparent"]} dur={13} opacity={0.4} />
      <Orb size={260} bottom="-110px" left="-50px" colors={[T.violet, "transparent"]} dur={16} opacity={0.35} />

      <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 relative grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* mockup */}
        <Reveal className="order-2 lg:order-1">
          <div className="flex justify-center dl-mockup-scale" style={{ padding: "10px 0" }}>
            <Tilt3D max={10}>
              <MarketingMockup />
            </Tilt3D>
          </div>
        </Reveal>

        {/* text */}
        <Reveal delay={150} className="order-1 lg:order-2">
          <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: "#7FB0FF" }}>{t("marketing.section.eyebrow")}</p>
          <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,42px)", marginTop: 10, lineHeight: 1.15 }}>
            {t("marketing.section.titleA")}{" "}
            <span style={gradientText}>{t("marketing.section.titleB")}</span>
          </h2>
          <p style={{ color: "#B9C6E6", marginTop: 16, lineHeight: 1.8, maxWidth: 480 }}>
            {t("marketing.section.text")}
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0", display: "flex", flexDirection: "column", gap: 12 }}>
            {features.map((f) => (
              <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#DDE5F8", fontSize: 15 }}>
                <span aria-hidden style={{ width: 20, height: 20, borderRadius: "50%", background: GRAD, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <Icon name="Check" size={12} color="#fff" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <Link to="/contact" className="dl-btn" style={{ display: "inline-block", marginTop: 28, fontSize: 15, fontWeight: 600, background: GRAD, color: "#fff", padding: "13px 28px", borderRadius: 999, textDecoration: "none" }}>
            {t("marketing.cta")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
