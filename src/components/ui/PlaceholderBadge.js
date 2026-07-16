import { useTranslation } from "react-i18next";
import { mono } from "../../theme";

export default function PlaceholderBadge() {
  const { t } = useTranslation();
  return (
    <span style={{ ...mono, fontSize: 10.5, letterSpacing: ".08em", color: "#B45309", background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: 999, padding: "3px 10px", display: "inline-block" }}>
      {t("placeholderBadge")}
    </span>
  );
}
