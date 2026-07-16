import { useTranslation } from "react-i18next";
import Icon from "./Icon";

export default function CarouselArrow({ direction = "next", onClick, style = {} }) {
  const { t } = useTranslation();
  return (
    <button
      aria-label={direction === "next" ? t("common.next") : t("common.prev")}
      onClick={onClick}
      className="dl-carousel-btn"
      style={{
        width: 40, height: 40, borderRadius: "50%",
        border: "1px solid rgba(255,255,255,.3)", background: "rgba(255,255,255,.06)",
        color: "#fff", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        ...style,
      }}
    >
      <Icon name={direction === "next" ? "ArrowRight" : "ArrowLeft"} size={17} />
    </button>
  );
}
