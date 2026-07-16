import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { T, mono, display } from "../../theme";
import PlaceholderBadge from "./PlaceholderBadge";

export default function StoryCard({ story }) {
  const { t } = useTranslation();
  return (
    <div className="dl-card" style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: "26px 24px", height: "100%", display: "flex", flexDirection: "column" }}>
      <PlaceholderBadge />
      <p style={{ ...mono, fontSize: 12, letterSpacing: ".08em", color: T.blue, marginTop: 14 }}>{story.industry}</p>
      <h3 style={{ ...display, fontWeight: 700, fontSize: 19, margin: "8px 0 10px" }}>{story.client}</h3>
      <p style={{ color: T.muted, fontSize: 14.5, lineHeight: 1.7, margin: 0, flex: 1 }}>{story.summary}</p>
      <Link to={`/customer-stories/${story.slug}`} className="dl-navlink" style={{ marginTop: 18, fontSize: 14, fontWeight: 600, color: T.ink, textDecoration: "none" }}>
        {t("stories.readStory")}
      </Link>
    </div>
  );
}
