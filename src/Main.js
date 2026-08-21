import { lazy, Suspense } from "react";
import "./styles/animations.css";
import "./i18n";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PageLoader from "./components/ui/PageLoader";
import { SERVICE_PAGES } from "./pages/servicePages";
import { LANGS, localizePath } from "./lib/langRouting";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Mobile = lazy(() => import("./pages/Mobile"));
const Company = lazy(() => import("./pages/Company"));
const OurProjects = lazy(() => import("./pages/OurProjects"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Bare (unprefixed) route definitions — mirrored per language below so every
// page gets its own crawlable, indexable URL (/, /en/*, /de/*, /pl/*) instead
// of one URL whose content silently changes based on the visitor's browser/IP.
const ROUTE_DEFS = [
  { path: "/", Component: Home },
  { path: "/services", Component: Services },
  ...SERVICE_PAGES.map(({ slug, Component }) => ({ path: `/services/${slug}`, Component })),
  { path: "/mobile", Component: Mobile },
  { path: "/company", Component: Company },
  { path: "/our-projects", Component: OurProjects },
  { path: "/contact", Component: Contact },
];

export default function DevlineSite() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              {LANGS.flatMap((lang) =>
                ROUTE_DEFS.map(({ path, Component }) => (
                  <Route key={`${lang}:${path}`} path={localizePath(path, lang)} element={<Component />} />
                ))
              )}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
