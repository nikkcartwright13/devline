const KEY = "devline-theme";

export function getStoredThemeMode() {
  return localStorage.getItem(KEY);
}

export function applyThemeMode(mode) {
  document.documentElement.setAttribute("data-theme", mode);
  localStorage.setItem(KEY, mode);
}

// Runs once at startup: respects a previously saved choice, otherwise falls
// back to the visitor's OS-level light/dark preference.
export function initThemeMode() {
  const stored = getStoredThemeMode();
  const mode = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", mode);
  return mode;
}
