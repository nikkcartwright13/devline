import { lazy, Suspense } from "react";
import "./styles/animations.css";
import "./i18n";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PageLoader from "./components/ui/PageLoader";
import { SERVICE_PAGES } from "./pages/servicePages";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Mobile = lazy(() => import("./pages/Mobile"));
const Company = lazy(() => import("./pages/Company"));
const OurProjects = lazy(() => import("./pages/OurProjects"));
const Contact = lazy(() => import("./pages/Contact"));
const CustomerStories = lazy(() => import("./pages/CustomerStories"));
const CustomerStory = lazy(() => import("./pages/CustomerStory"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function DevlineSite() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              {SERVICE_PAGES.map(({ slug, Component }) => (
                <Route key={slug} path={`/services/${slug}`} element={<Component />} />
              ))}
              <Route path="/mobile" element={<Mobile />} />
              <Route path="/company" element={<Company />} />
              <Route path="/our-projects" element={<OurProjects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/customer-stories" element={<CustomerStories />} />
              <Route path="/customer-stories/:slug" element={<CustomerStory />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
