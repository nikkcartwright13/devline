import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GRAD, display } from "../theme";
import Seo from "../components/Seo";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <section className="max-w-6xl mx-auto px-5 py-32 text-center">
      <Seo title={t("notFound.seoTitle")} />
      <div style={{ ...display, fontWeight: 700, fontSize: "clamp(48px,10vw,96px)", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>404</div>
      <h1 style={{ ...display, fontWeight: 700, fontSize: 24, marginTop: 10 }}>{t("notFound.title")}</h1>
      <Link to="/" className="dl-btn" style={{ display: "inline-block", marginTop: 26, fontSize: 15, fontWeight: 600, background: GRAD, color: "#fff", padding: "13px 28px", borderRadius: 999, textDecoration: "none" }}>
        {t("notFound.cta")}
      </Link>
    </section>
  );
}
