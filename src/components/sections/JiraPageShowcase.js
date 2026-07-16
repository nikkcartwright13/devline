import { useTranslation } from "react-i18next";
import { T, DARK, mono, display } from "../../theme";
import Reveal from "../ui/Reveal";
import Orb from "../ui/Orb";
import Tilt3D from "../ui/Tilt3D";
import JiraBoardMockup from "../ui/JiraBoardMockup";

export default function JiraPageShowcase() {
  const { t } = useTranslation();

  return (
    <section style={{ position: "relative", background: DARK, color: "#fff", overflow: "hidden" }}>
      <Orb size={340} top="-100px" right="-80px" colors={["#22D3EE", "transparent"]} dur={13} opacity={0.35} />
      <Orb size={300} bottom="-120px" left="-60px" colors={[T.violet, "transparent"]} dur={16} opacity={0.4} />

      <div className="max-w-6xl mx-auto px-5 py-20 md:py-24 relative grid lg:grid-cols-2 gap-14 items-center">
        {/* text */}
        <Reveal>
          <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: "#7FB0FF" }}>{t("services.items.jira.eyebrow")}</p>
          <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,42px)", marginTop: 10, lineHeight: 1.15 }}>
            {t("services.items.jira.title")}
          </h2>
          <p style={{ color: "#B9C6E6", marginTop: 16, lineHeight: 1.8, maxWidth: 480 }}>
            {t("services.items.jira.text")}
          </p>
        </Reveal>

        {/* mockup */}
        <Reveal delay={150}>
          <div className="flex justify-center" style={{ padding: "10px 0" }}>
            <Tilt3D max={10}>
              <JiraBoardMockup />
            </Tilt3D>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
