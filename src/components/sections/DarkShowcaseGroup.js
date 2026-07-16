import { DARK, T } from "../../theme";

export default function DarkShowcaseGroup({ children, nextBg = T.base }) {
  return (
    <div style={{ background: DARK, position: "relative" }}>
      {children}
      <svg aria-hidden viewBox="0 0 1440 90" style={{ display: "block", width: "100%", marginBottom: -1 }}>
        <path d="M0,50 C400,100 1000,10 1440,60 L1440,90 L0,90 Z" fill={nextBg} />
      </svg>
    </div>
  );
}
