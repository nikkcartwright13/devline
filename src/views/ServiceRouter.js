import { Suspense } from "react";
import PageLoader from "../components/ui/PageLoader";
import { SERVICE_PAGES } from "./servicePages";

export default function ServiceRouter({ slug }) {
  const entry = SERVICE_PAGES.find((s) => s.slug === slug);
  if (!entry) return null;
  const Component = entry.Component;
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}
