import { useEffect, useState } from "react";
import { T } from "../../theme";
import { getStoredThemeMode, applyThemeMode } from "../../lib/themeMode";
import Icon from "./Icon";

export default function ThemeToggle({ style = {} }) {
  const [mode, setMode] = useState(() => getStoredThemeMode() || document.documentElement.getAttribute("data-theme") || "light");

  useEffect(() => {
    applyThemeMode(mode);
  }, [mode]);

  const isDark = mode === "dark";

  return (
    <button
      onClick={() => setMode(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="dl-navlink"
      style={{
        background: "none", border: `1px solid ${T.border}`, borderRadius: 999, cursor: "pointer",
        width: 36, height: 36, flexShrink: 0, color: T.ink,
        display: "flex", alignItems: "center", justifyContent: "center",
        ...style,
      }}
    >
      <Icon name={isDark ? "Sun" : "Moon"} size={16} />
    </button>
  );
}
