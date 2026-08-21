import { useTranslation } from "react-i18next";
import { T, GRAD, mono, display } from "../../theme";
import { MOBILE_APP_TYPES } from "../../data/mobileAppTypes";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";
import { upperLabel } from "../../lib/text";

export default function MobileAppTypes() {
  const { t } = useTranslation();

  return (
    <section className="max-w-6xl mx-auto px-5 py-16 md:py-20">
      <Reveal>
        <p style={{ ...mono, fontSize: 13, letterSpacing: ".1em", color: T.blue }}>{upperLabel(t("mobileAppTypes.eyebrow"))}</p>
        <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(24px,3.5vw,36px)", marginTop: 10 }}>{t("mobileAppTypes.title")}</h2>
        <p style={{ color: T.muted, marginTop: 12, maxWidth: 640, lineHeight: 1.7 }}>{t("mobileAppTypes.text")}</p>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {MOBILE_APP_TYPES.map((item, i) => (
          <Reveal key={item.key} delay={i * 70}>
            <div className="dl-card" style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: "22px 20px", height: "100%" }}>
              <span aria-hidden style={{ width: 38, height: 38, borderRadius: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", background: GRAD }}>
                <Icon name={item.icon} size={18} />
              </span>
              <h3 style={{ ...display, fontWeight: 700, fontSize: 16.5, margin: "12px 0 6px" }}>{t(`mobileAppTypes.items.${item.key}.title`)}</h3>
              <p style={{ color: T.muted, fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{t(`mobileAppTypes.items.${item.key}.text`)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
