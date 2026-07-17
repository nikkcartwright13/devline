import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { T, mono, display } from "../../theme";
import Reveal from "../ui/Reveal";
import StoryCard from "../ui/StoryCard";

export default function CustomerStoriesPreview() {
  const { t } = useTranslation();
  const items = t("stories.items", { returnObjects: true });

  return (
    <section style={{ background: "#EFF3F9", borderBottom: `1px solid ${T.border}` }}>
      <div className="max-w-6xl mx-auto px-5 py-20 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: T.blue }}>{t("stories.previewSection.eyebrow")}</p>
              <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,40px)", marginTop: 10 }}>
                {t("stories.previewSection.title")}
              </h2>
            </div>
            <Link to="/customer-stories" className="dl-navlink" style={{ fontSize: 14, fontWeight: 600, color: T.ink, textDecoration: "none" }}>
              {t("stories.previewSection.viewAll")}
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {items.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}>
              <StoryCard story={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
