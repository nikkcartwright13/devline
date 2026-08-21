import { T, body } from "../../theme";
import Header from "./Header";
import Footer from "./Footer";
import ScrollManager from "./ScrollManager";
import CookieConsentBanner from "../ui/CookieConsentBanner";
import LangSuggestionBanner from "../ui/LangSuggestionBanner";

// Language is resolved from the URL synchronously in pages/_app.js, before
// this ever renders — no client-side effect needed here for that anymore.
export default function Layout({ children }) {
  return (
    <div style={{ ...body, background: T.base, color: T.ink, minHeight: "100vh" }}>
      <ScrollManager />
      <LangSuggestionBanner />
      <Header />
      {children}
      <Footer />
      <CookieConsentBanner />
    </div>
  );
}
