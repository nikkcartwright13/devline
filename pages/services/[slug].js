import ServiceRouter from "../../src/views/ServiceRouter";
import { SERVICE_PAGES } from "../../src/views/servicePages";

export default function ServicePage({ slug }) {
  return <ServiceRouter slug={slug} />;
}

export async function getStaticPaths() {
  return {
    paths: SERVICE_PAGES.map((s) => ({ params: { slug: s.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}
