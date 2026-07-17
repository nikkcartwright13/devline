import { useTranslation } from "react-i18next";
import { T, DARK, GRAD, mono, display } from "../../theme";
import Reveal from "../ui/Reveal";
import Orb from "../ui/Orb";
import Tilt3D from "../ui/Tilt3D";
import WebBuildMockup from "../ui/WebBuildMockup";
import Icon from "../ui/Icon";

const REACT_STACK = ["React", "Next.js", "Node.js"];
const WORDPRESS_STACK = ["WordPress", "PHP", "WooCommerce"];

function StackGroup({ label, stack }) {
  return (
    <div>
      <p style={{ ...mono, fontSize: 11.5, letterSpacing: ".1em", color: "#93A5CE" }}>{label.toUpperCase()}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
        {stack.map((tech) => (
          <span key={tech} style={{ ...mono, fontSize: 12, color: "#DDE5F8", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 999, padding: "5px 13px" }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function WebBuildShowcase() {
  const { t } = useTranslation();
  const features = t("web.features", { returnObjects: true });

  return (
    <section style={{ position: "relative", background: DARK, color: "#fff", overflow: "hidden" }}>
      <Orb size={320} top="-100px" left="-80px" colors={[T.blue, "transparent"]} dur={13} opacity={0.4} />
      <Orb size={280} bottom="-110px" right="-60px" colors={[T.violet, "transparent"]} dur={16} opacity={0.35} />

      <div className="max-w-6xl mx-auto px-5 py-20 md:py-24 relative grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* text */}
        <Reveal>
          <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: "#7FB0FF" }}>{t("web.section.eyebrow")}</p>
          <h1 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,42px)", marginTop: 10, lineHeight: 1.15 }}>
            {t("web.section.title")}
          </h1>
          <p style={{ color: "#B9C6E6", marginTop: 16, lineHeight: 1.8, maxWidth: 480 }}>
            {t("web.section.text")}
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

          <div style={{ display: "flex", flexWrap: "wrap", gap: 28, marginTop: 28 }}>
            <StackGroup label={t("web.section.reactLabel")} stack={REACT_STACK} />
            <StackGroup label={t("web.section.wordpressLabel")} stack={WORDPRESS_STACK} />
          </div>
        </Reveal>

        {/* mockup */}
        <Reveal delay={150}>
          <div className="flex justify-center dl-mockup-scale" style={{ padding: "10px 0" }}>
            <Tilt3D max={10}>
              <WebBuildMockup />
            </Tilt3D>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
