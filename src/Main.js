import "./styles/animations.css";
import "./i18n";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import { SERVICE_PAGES } from "./pages/servicePages";
import Mobile from "./pages/Mobile";
import Company from "./pages/Company";
import OurProjects from "./pages/OurProjects";
import Contact from "./pages/Contact";
import CustomerStories from "./pages/CustomerStories";
import CustomerStory from "./pages/CustomerStory";
import NotFound from "./pages/NotFound";

export default function DevlineSite() {
  return (
    <HelmetProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </HelmetProvider>
  );
}
