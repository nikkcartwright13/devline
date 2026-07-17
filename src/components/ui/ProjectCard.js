import { T, mono, display } from "../../theme";
import PlaceholderBadge from "./PlaceholderBadge";

export default function ProjectCard({ project }) {
  return (
    <div className="dl-card" style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: "26px 24px", height: "100%", display: "flex", flexDirection: "column" }}>
      <PlaceholderBadge />
      <p style={{ ...mono, fontSize: 12, letterSpacing: ".08em", color: T.blue, marginTop: 14 }}>{project.category}</p>
      <h3 style={{ ...display, fontWeight: 700, fontSize: 19, margin: "8px 0 10px" }}>{project.name}</h3>
      <p style={{ color: T.muted, fontSize: 14.5, lineHeight: 1.7, margin: 0, flex: 1 }}>{project.summary}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
        {project.tags.map((tag) => (
          <span key={tag} style={{ ...mono, fontSize: 11.5, color: T.ink, background: T.base, border: `1px solid ${T.border}`, borderRadius: 999, padding: "4px 12px" }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
