import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import PageHeader from "../components/sections/PageHeader";
import ProjectCategorySection from "../components/sections/ProjectCategorySection";
import { PROJECT_CATEGORIES } from "../data/projects";

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
      {PROJECT_CATEGORIES.map((cat) => (
        <ProjectCategorySection
          key={cat.key}
          category={cat}
          items={items.filter((p) => p.category === cat.key)}
        />
      ))}
    </>
  );
}
