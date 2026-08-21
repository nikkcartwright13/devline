/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — this deploys to plain Apache/LiteSpeed hosting
  // (cPanel) with no Node.js server, so SSR/ISR/API routes aren't available.
  // Every route is still pre-rendered per language at build time via
  // getStaticProps/getStaticPaths, which is what actually matters for SEO.
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
