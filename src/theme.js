/* ─────────────────────────────────────────────
   Devline.digital — design tokens
   Light clean base + dark gradient hero/CTA + motion
   Palette:
   base:     #F7F9FC   light corporate paper
   panel:    #FFFFFF
   ink:      #101A33   deep navy text
   muted:    #5C6B85
   dark bg:  #0C1030 → #221656  gradient (hero / CTA)
   accents:  #4F8CFF (blue) → #8B5CF6 (violet) gradient
───────────────────────────────────────────── */

export const T = {
  base: "#F7F9FC",
  panel: "#FFFFFF",
  ink: "#101A33",
  muted: "#5C6B85",
  border: "#E3E9F2",
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
