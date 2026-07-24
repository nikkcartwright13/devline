/* ─────────────────────────────────────────────
   Devline.digital — design tokens
   Light clean base + dark gradient hero/CTA + motion
   Palette:
   base:     #F7F9FC (light) / #0B0F1A (dark)  page background
   panel:    #FFFFFF (light) / #131829 (dark)  card surfaces
   ink:      #101A33 (light) / #EEF2FA (dark)  primary text
   muted:    #5C6B85 (light) / #93A2C4 (dark)  secondary text
   dark bg:  #0C1030 → #221656  gradient (hero / CTA — fixed, not theme-dependent)
   accents:  #4F8CFF (blue) → #8B5CF6 (violet) gradient

   base/panel/ink/muted/border read from CSS custom properties (see index.css)
   so the whole site follows the light/dark mode toggled in the header, without
   every component needing to know which mode is active.
───────────────────────────────────────────── */

export const T = {
  base: "var(--dl-base)",
  panel: "var(--dl-panel)",
  ink: "var(--dl-ink)",
  muted: "var(--dl-muted)",
  border: "var(--dl-border)",
  blue: "#4F8CFF",
  violet: "#8B5CF6",
  darkA: "#0C1030",
  darkB: "#221656",
};

export const GRAD = `linear-gradient(90deg, ${T.blue}, ${T.violet})`;
export const DARK = `linear-gradient(135deg, ${T.darkA} 0%, ${T.darkB} 100%)`;
export const TEXT_GRAD = "linear-gradient(90deg,#7FB0FF,#B79CFF)";

export const display = { fontFamily: "'Space Grotesk','Noto Sans Georgian',sans-serif" };
export const body = { fontFamily: "'Noto Sans Georgian','Space Grotesk',sans-serif" };
export const mono = { fontFamily: "'JetBrains Mono',monospace" };

export const gradientText = {
  background: TEXT_GRAD,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
