export const LANGS = ["ka", "en", "de", "pl"];

// Languages that live under a URL prefix. "ka" is the default/root language
// and has no prefix (devline.digital/... not devline.digital/ka/...).
const PREFIXED_LANGS = ["en", "de", "pl"];

export function langFromPathname(pathname) {
  const seg = pathname.split("/")[1];
  return PREFIXED_LANGS.includes(seg) ? seg : "ka";
}

// Removes a language prefix from a pathname, e.g. "/en/services/web" -> "/services/web".
export function stripLangPrefix(pathname) {
  const seg = pathname.split("/")[1];
  if (!PREFIXED_LANGS.includes(seg)) return pathname;
  const rest = pathname.slice(seg.length + 1);
  return rest === "" ? "/" : rest;
}

// Adds a language prefix to a bare (unprefixed) path, e.g. ("/services/web", "en") -> "/en/services/web".
export function localizePath(barePath, lang) {
  if (!PREFIXED_LANGS.includes(lang)) return barePath;
  return barePath === "/" ? `/${lang}` : `/${lang}${barePath}`;
}
