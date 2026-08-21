const GEORGIAN_RE = /[Ⴀ-ჿᲐ-Ჿ]/;

// JS's String.toUpperCase() maps Georgian Mkhedruli letters to Mtavruli — a
// distinct, archaic capital alphabet, not a visual "all caps" style. Used on
// an eyebrow/label, that reads as broken text to Georgian users. Georgian has
// no case distinction for everyday UI text, so leave it as authored; only
// uppercase strings that are actually Latin/Cyrillic.
export function upperLabel(str) {
  return GEORGIAN_RE.test(str) ? str : str.toUpperCase();
}
