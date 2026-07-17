import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import PageHeader from "../components/sections/PageHeader";
import ProjectCard from "../components/ui/ProjectCard";
import Reveal from "../components/ui/Reveal";

export default function OurProjectsPage() {
  const { t } = useTranslation();
  const items = t("projects.items", { returnObjects: true });

  return (
    <>
      <Seo title={t("projects.seo.title")} description={t("projects.seo.description")} />
      <PageHeader
        eyebrow={t("projects.page.eyebrow")}
        title={t("projects.page.title")}
        text={t("projects.page.text")}
      />
      <section className="max-w-6xl mx-auto px-5 py-20 md:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
