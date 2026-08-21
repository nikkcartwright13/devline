import { useEffect, useRef, useState } from "react";

// A single hard threshold flips back and forth when scrollY hovers near it
// (momentum/rubber-band scroll), retriggering the header's transition mid-animation
// and making it stutter. Hysteresis gives entering/exiting the "scrolled" state
// separate thresholds so small jitter around one point can't cause that.
export default function useScrolled(threshold = 10, hysteresis = 8) {
  // Always start false: a client hydrating after scroll-position restoration
  // (e.g. back/forward navigation) could otherwise read a nonzero scrollY on
  // the very first render and mismatch the server-rendered (always-false) HTML.
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(scrolled);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (!scrolledRef.current && y > threshold + hysteresis) {
          scrolledRef.current = true;
          setScrolled(true);
        } else if (scrolledRef.current && y < threshold - hysteresis) {
          scrolledRef.current = false;
          setScrolled(false);
        }
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, hysteresis]);

  return scrolled;
}
