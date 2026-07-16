import { useTranslation } from "react-i18next";

export default function CarouselDots({ count, index, onSelect, color = "#fff", inactiveColor = "rgba(255,255,255,.35)" }) {
  const { t } = useTranslation();
  return (
    <div role="tablist" aria-label={t("common.slides")} style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === index}
          aria-label={t("common.slide", { n: i + 1 })}
          onClick={() => onSelect(i)}
          className="dl-dot"
          style={{
            width: i === index ? 24 : 8,
            height: 8,
            borderRadius: 999,
            border: "none",
            background: i === index ? color : inactiveColor,
            cursor: "pointer",
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}
