import { useEffect, useState } from "react";

export default function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(typeof window !== "undefined" ? window.scrollY > threshold : false);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
