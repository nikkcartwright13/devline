import { T } from "../../theme";

export default function PageLoader() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.base }}>
      <span
        aria-hidden
        style={{
          width: 36, height: 36, borderRadius: "50%",
          border: `3px solid ${T.border}`, borderTopColor: T.blue,
          animation: "dl-spin .8s linear infinite",
        }}
      />
    </div>
  );
}
