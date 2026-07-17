const GA_ID = process.env.REACT_APP_GA_ID;
const CONSENT_KEY = "devline-cookie-consent";

let loaded = false;

export function isAnalyticsConfigured() {
  return Boolean(GA_ID);
}

export function getStoredConsent() {
  return localStorage.getItem(CONSENT_KEY);
}

function loadGtag() {
  if (loaded || !GA_ID) return;
  loaded = true;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
}

export function grantConsent() {
  localStorage.setItem(CONSENT_KEY, "granted");
  loadGtag();
}

export function denyConsent() {
  localStorage.setItem(CONSENT_KEY, "denied");
}

export function initAnalyticsIfConsented() {
  if (getStoredConsent() === "granted") loadGtag();
}

export function trackPageview(path) {
  if (!loaded || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: path });
}
