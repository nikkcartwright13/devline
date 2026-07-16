import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import PageHeader from "../components/sections/PageHeader";
import StoryCard from "../components/ui/StoryCard";
import Reveal from "../components/ui/Reveal";

export default function CustomerStoriesPage() {
  const { t } = useTranslation();
  const items = t("stories.items", { returnObjects: true });

  return (
    <>
      <Seo title={t("stories.seo.title")} description={t("stories.seo.description")} />
      <PageHeader
        eyebrow={t("stories.page.eyebrow")}
        title={t("stories.page.title")}
        text={t("stories.page.text")}
      />
      <section className="max-w-6xl mx-auto px-5 py-20 md:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}>
              <StoryCard story={s} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
