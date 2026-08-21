import { lazy } from "react";

const WebAplications = lazy(() => import("./WebAplications"));
const MobileApps = lazy(() => import("./MobileApps"));
const Devops = lazy(() => import("./Devops"));
const Infra = lazy(() => import("./Infra"));
const Analytics = lazy(() => import("./Analytics"));
const Support = lazy(() => import("./Support"));
const ClickUp = lazy(() => import("./ClickUp"));
const JsmPortal = lazy(() => import("./JsmPortal"));
const Jira = lazy(() => import("./Jira"));
const Slack = lazy(() => import("./Slack"));
const Figma = lazy(() => import("./Figma"));
const Photoshop = lazy(() => import("./Photoshop"));
const Illustrator = lazy(() => import("./Illustrator"));
const Premiere = lazy(() => import("./Premiere"));
const MetaMarketing = lazy(() => import("./MetaMarketing"));
const SeoService = lazy(() => import("./SeoService"));

export const SERVICE_PAGES = [
  { slug: "web", Component: WebAplications },
  { slug: "mobile", Component: MobileApps },
  { slug: "devops", Component: Devops },
  { slug: "infra", Component: Infra },
  { slug: "analytics", Component: Analytics },
  { slug: "support", Component: Support },
  { slug: "clickup", Component: ClickUp },
  { slug: "jsmPortal", Component: JsmPortal },
  { slug: "jira", Component: Jira },
  { slug: "slack", Component: Slack },
  { slug: "figma", Component: Figma },
  { slug: "photoshop", Component: Photoshop },
  { slug: "illustrator", Component: Illustrator },
  { slug: "premiere", Component: Premiere },
  { slug: "metaMarketing", Component: MetaMarketing },
  { slug: "seo", Component: SeoService },
];
