import { useEffect } from "react";
import { useRouter } from "next/router";
import { trackPageview } from "../../lib/analytics";

export default function ScrollManager() {
  const router = useRouter();
  const asPath = router.asPath;
  const pathname = asPath.split(/[?#]/)[0];
  const hashMatch = asPath.match(/#.+$/);
  const hash = hashMatch ? hashMatch[0] : "";

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
