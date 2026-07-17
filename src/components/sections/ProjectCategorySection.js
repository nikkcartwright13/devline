import { useTranslation } from "react-i18next";
import { GRAD, display } from "../../theme";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";
import ProjectCard from "../ui/ProjectCard";

export default function ProjectCategorySection({ category, items }) {
  const { t } = useTranslation();
  if (items.length === 0) return null;

  return (
    <section id={category.key} className="max-w-6xl mx-auto px-5 py-14 md:py-16" style={{ scrollMarginTop: 88 }}>
      <Reveal>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span aria-hidden style={{ width: 44, height: 44, borderRadius: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", background: GRAD, flexShrink: 0 }}>
            <Icon name={category.icon} size={21} />
          </span>
          <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(22px,3vw,30px)" }}>
            {t(`projects.categories.${category.key}`)}
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {items.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
