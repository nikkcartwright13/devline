import Link from "next/link";
import { useRouter } from "next/router";
import { langFromPathname, localizePath, stripLangPrefix } from "../../lib/langRouting";

const EXTERNAL_RE = /^[a-z][a-z0-9+.-]*:/i;

// Drop-in replacement for next/link's <Link> that keeps internal links
// inside the current language section (e.g. on /en/*, "/services" resolves
// to "/en/services") instead of dropping the visitor back to the default language.
export default function LocalizedLink({ to, ...props }) {
  const router = useRouter();
  // router.pathname (matched route pattern), not router.asPath (real browser
  // URL): for the shared static 404 page, asPath reflects whatever the
  // visitor actually typed, which can disagree with what was pre-rendered
  // at build time for "/404" and would make every link's resolved href
  // mismatch between server and client — see Seo.js for the same issue.
  const lang = langFromPathname(router.pathname);

  let resolvedTo = to;
  if (typeof to === "string" && !EXTERNAL_RE.test(to) && !to.startsWith("//") && !to.startsWith("#")) {
    const [path, hash] = to.split("#");
    resolvedTo = localizePath(stripLangPrefix(path), lang) + (hash ? `#${hash}` : "");
  }

  return <Link href={resolvedTo} {...props} />;
}
