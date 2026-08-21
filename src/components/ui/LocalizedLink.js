import { Link, useLocation } from "react-router-dom";
import { langFromPathname, localizePath, stripLangPrefix } from "../../lib/langRouting";

const EXTERNAL_RE = /^[a-z][a-z0-9+.-]*:/i;

// Drop-in replacement for react-router's <Link> that keeps internal links
// inside the current language section (e.g. on /en/*, "/services" resolves
// to "/en/services") instead of dropping the visitor back to the default language.
export default function LocalizedLink({ to, ...props }) {
  const { pathname } = useLocation();
  const lang = langFromPathname(pathname);

  let resolvedTo = to;
  if (typeof to === "string" && !EXTERNAL_RE.test(to) && !to.startsWith("//") && !to.startsWith("#")) {
    const [path, hash] = to.split("#");
    resolvedTo = localizePath(stripLangPrefix(path), lang) + (hash ? `#${hash}` : "");
  }

  return <Link to={resolvedTo} {...props} />;
}
