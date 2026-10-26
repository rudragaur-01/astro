import { Inter, Libre_Baskerville } from "next/font/google";
import FloatingContact from "@/components/layout/FloatingContact";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { getSiteSettings } from "@/lib/content";
import "./globals.css";

const baskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const { seo } = await getSiteSettings();
  return {
    metadataBase: new URL(seo.siteUrl),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
    },
  };
}

export default async function RootLayout({ children }) {
  const site = await getSiteSettings();

  return (
    <html lang="en" className={`${baskerville.variable} ${inter.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-maroon px-5 py-3 text-sm font-semibold text-ivory focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {site.skipLinkLabel}
        </a>
        <Header brand={site.brand} navigation={site.navigation} cta={site.headerCta} menuLabels={site.menuLabels} />
        <main id="main">{children}</main>
        <Footer brand={site.brand} footer={site.footer} contact={site.contact} social={site.social} />
        <FloatingContact whatsapp={site.contact.whatsapp} />
      </body>
    </html>
  );
}
