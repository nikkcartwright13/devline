import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { T, DARK, GRAD, mono, display, gradientText } from "../../theme";
import Reveal from "../ui/Reveal";
import Orb from "../ui/Orb";
import Tilt3D from "../ui/Tilt3D";
import PhoneMockup from "../ui/PhoneMockup";
import Icon from "../ui/Icon";

export default function MobileShowcase({ grouped = false }) {
  const { t } = useTranslation();
  const features = t("mobile.features", { returnObjects: true });

  return (
    <section id="mobile" style={{ position: "relative", background: grouped ? "transparent" : DARK, color: "#fff", overflow: "hidden" }}>
      <Orb size={380} top="-100px" right="-80px" colors={[T.violet, "transparent"]} dur={12} opacity={0.4} />
      <Orb size={300} bottom="-120px" left="-60px" colors={[T.blue, "transparent"]} dur={15} opacity={0.4} />

      <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 relative grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* text */}
        <Reveal>
          <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: "#7FB0FF" }}>{t("mobile.section.eyebrow")}</p>
          <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,42px)", marginTop: 10, lineHeight: 1.15 }}>
            {t("mobile.section.titleA")}{" "}
            <span style={gradientText}>{t("mobile.section.titleB")}</span>
          </h2>
          <p style={{ color: "#B9C6E6", marginTop: 16, lineHeight: 1.8, maxWidth: 480 }}>
            {t("mobile.section.text")}
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
            {t("mobile.cta")}
          </Link>
        </Reveal>

        {/* phones */}
        <Reveal delay={150}>
          <Tilt3D max={8}>
            <div className="flex justify-center items-center dl-mockup-scale" style={{ position: "relative", minHeight: 560, padding: "20px 0" }}>
              {/* glow behind phones */}
              <span aria-hidden style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,140,255,.35), transparent 70%)", filter: "blur(30px)" }} />
              <div className="hidden sm:block" style={{ position: "relative", right: -30, zIndex: 1, opacity: 0.85 }}>
                <PhoneMockup variant="back" />
              </div>
              <div style={{ position: "relative", zIndex: 2, marginLeft: -40 }}>
                <PhoneMockup variant="front" />
              </div>
            </div>
          </Tilt3D>
        </Reveal>
      </div>

      {!grouped && (
        <svg aria-hidden viewBox="0 0 1440 90" style={{ display: "block", width: "100%", marginBottom: -1 }}>
          <path d="M0,50 C400,100 1000,10 1440,60 L1440,90 L0,90 Z" fill="#EFF3F9" />
        </svg>
      )}
    </section>
  );
}
