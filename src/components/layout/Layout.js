import { Outlet } from "react-router-dom";
import { T, body } from "../../theme";
import Header from "./Header";
import Footer from "./Footer";
import ScrollManager from "./ScrollManager";

export default function Layout() {
  return (
    <div style={{ ...body, background: T.base, color: T.ink, minHeight: "100vh" }}>
      <ScrollManager />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
