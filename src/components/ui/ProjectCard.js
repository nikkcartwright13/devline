import { T, mono, display } from "../../theme";

export default function ProjectCard({ project, image }) {
  const cardStyle = {
    background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, height: "100%",
    display: "flex", flexDirection: "column", overflow: "hidden", textDecoration: "none", color: "inherit",
  };

  const content = (
    <>
      {image && (
        <div style={{ width: "100%", height: 200, flexShrink: 0 }}>
          <img src={image} alt={project.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      )}
      <div style={{ padding: "26px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ ...display, fontWeight: 700, fontSize: 19, margin: "0 0 10px" }}>{project.name}</h3>
        <p style={{ color: T.muted, fontSize: 14.5, lineHeight: 1.7, margin: 0, flex: 1 }}>{project.summary}</p>
        {project.tags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{ ...mono, fontSize: 11.5, color: T.ink, background: T.base, border: `1px solid ${T.border}`, borderRadius: 999, padding: "4px 12px" }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (project.link) {
    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="dl-card" style={cardStyle}>
        {content}
      </a>
    );
  }

  return (
    <div className="dl-card" style={cardStyle}>
      {content}
    </div>
  );
}
