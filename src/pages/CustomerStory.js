import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { T, mono, display } from "../theme";
import Seo from "../components/Seo";
import PageHeader from "../components/sections/PageHeader";
import PlaceholderBadge from "../components/ui/PlaceholderBadge";
import Reveal from "../components/ui/Reveal";

export default function CustomerStoryPage() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const items = t("stories.items", { returnObjects: true });
  const story = items.find((s) => s.slug === slug);

  if (!story) {
    return (
      <section className="max-w-6xl mx-auto px-5 py-24 text-center">
        <Seo title={t("stories.notFound")} />
        <h1 style={{ ...display, fontWeight: 700, fontSize: 28 }}>{t("stories.notFound")}</h1>
        <Link to="/customer-stories" style={{ color: T.blue, fontWeight: 600 }}>{t("stories.backToStories")}</Link>
      </section>
    );
  }

  return (
    <>
      <Seo title={story.client} description={story.summary} />
      <PageHeader eyebrow={story.industry} title={story.client} />
      <section className="max-w-6xl mx-auto px-5 py-16 md:py-20">
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <PlaceholderBadge />
            <p style={{ ...mono, fontSize: 13, color: T.muted, marginTop: 18 }}>{story.summary}</p>
            <p style={{ color: T.ink, fontSize: 16, lineHeight: 1.9, marginTop: 20 }}>{story.body}</p>
            <Link to="/customer-stories" className="dl-navlink" style={{ display: "inline-block", marginTop: 30, fontSize: 14, fontWeight: 600, color: T.ink, textDecoration: "none" }}>
              {t("stories.backToStories")}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
