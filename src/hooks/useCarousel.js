import { useEffect, useState } from "react";

export default function useCarousel(length, { interval = 6000, auto = true } = {}) {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % length);
  const prev = () => setIndex((i) => (i - 1 + length) % length);

  useEffect(() => {
    if (!auto || length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, auto, interval, length]);

  return { index, setIndex, next, prev };
}
