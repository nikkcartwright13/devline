import Document, { Html, Head, Main, NextScript } from "next/document";
import { langFromPathname } from "../src/lib/langRouting";

// Page-independent <head> content only (icons, fonts, theme-color). Anything
// that varies per page — title, description, canonical, hreflang, OG tags,
// JSON-LD — lives in src/components/Seo.js via next/head instead, so there's
// exactly one source of truth per tag and never a duplicate.
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, lang: langFromPathname(ctx.pathname) };
  }

  render() {
    return (
      <Html lang={this.props.lang}>
        <Head>
          <meta name="theme-color" content="#0C1030" />

          <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
          <link rel="manifest" href="/manifest.json" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Noto+Sans+Georgian:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
