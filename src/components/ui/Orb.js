export default function Orb({ size, top, left, right, bottom, colors, dur = 12, delay = 0, blur = 60, opacity = 0.5 }) {
  return (
    <span aria-hidden style={{
      position: "absolute", width: size, height: size, top, left, right, bottom,
      borderRadius: "50%", filter: `blur(${blur}px)`, opacity,
      background: `radial-gradient(circle at 30% 30%, ${colors[0]}, ${colors[1]})`,
      animation: `dl-float ${dur}s ease-in-out ${delay}s infinite alternate`,
      pointerEvents: "none",
    }} />
  );
}
