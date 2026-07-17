import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageview } from "../../lib/analytics";

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    trackPageview(pathname);
  }, [pathname]);

  return null;
}
