import { useTranslation } from "react-i18next";
import { T, DARK, mono, display, gradientText } from "../../theme";
import Reveal from "../ui/Reveal";
import Orb from "../ui/Orb";
import Tilt3D from "../ui/Tilt3D";
import MobileBuildMockup from "../ui/MobileBuildMockup";

export default function MobileBuildShowcase() {
  const { t } = useTranslation();

  return (
    <section style={{ position: "relative", background: DARK, color: "#fff", overflow: "hidden" }}>
      <Orb size={320} top="-100px" left="-80px" colors={[T.blue, "transparent"]} dur={13} opacity={0.4} />
      <Orb size={280} bottom="-110px" right="-60px" colors={[T.violet, "transparent"]} dur={16} opacity={0.35} />

      <div className="max-w-6xl mx-auto px-5 py-20 md:py-24 relative grid lg:grid-cols-2 gap-14 items-center">
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
        </Reveal>

        {/* mockup */}
        <Reveal delay={150}>
          <div className="flex justify-center" style={{ padding: "10px 0" }}>
            <Tilt3D max={10}>
              <MobileBuildMockup />
            </Tilt3D>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
