import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { T, GRAD, mono, display } from "../../theme";
import Reveal from "../ui/Reveal";
import Tilt3D from "../ui/Tilt3D";
import WebsiteMockup from "../ui/WebsiteMockup";
import Icon from "../ui/Icon";

export default function WebShowcase() {
  const { t } = useTranslation();
  const features = t("web.features", { returnObjects: true });

  return (
    <section style={{ background: T.panel, borderBottom: `1px solid ${T.border}`, overflow: "hidden" }}>
      <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 grid lg:grid-cols-2 gap-14 items-center">
        {/* mockup */}
        <Reveal>
          <div className="flex justify-center" style={{ padding: "10px 0" }}>
            <Tilt3D max={10}>
              <WebsiteMockup />
            </Tilt3D>
          </div>
        </Reveal>

        {/* text */}
        <Reveal delay={150}>
          <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: T.blue }}>{t("web.section.eyebrow")}</p>
          <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,42px)", marginTop: 10, lineHeight: 1.15 }}>
            {t("web.section.title")}
          </h2>
          <p style={{ color: T.muted, marginTop: 16, lineHeight: 1.8, maxWidth: 480 }}>
            {t("web.section.text")}
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0", display: "flex", flexDirection: "column", gap: 12 }}>
            {features.map((f) => (
              <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: T.ink, fontSize: 15 }}>
                <span aria-hidden style={{ width: 20, height: 20, borderRadius: "50%", background: GRAD, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <Icon name="Check" size={12} color="#fff" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <Link to="/contact" className="dl-btn" style={{ display: "inline-block", marginTop: 28, fontSize: 15, fontWeight: 600, background: GRAD, color: "#fff", padding: "13px 28px", borderRadius: 999, textDecoration: "none" }}>
            {t("web.cta")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
