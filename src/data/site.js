// Global settings: branding, navigation, contact details and footer.
// All values are sample content for the prototype.

import { media } from "./media";

// Business phone, used for the call link, WhatsApp chat and footer.
// Change it here only; the links below are derived from it.
const phone = "+91 92105 59516";
const phoneDigits = phone.replace(/\D/g, "");

export const site = {
  brand: {
    name: "Divine Trinetra",
    tagline: "Dr Shalini Vashistha",
    logo: media.logo,
    homeHref: "/",
  },

  seo: {
    // Replace with the production domain; used to build absolute social-image URLs.
    siteUrl: "https://divinetrinetra.example",
    title: "Divine Trinetra | Dr Shalini Vashistha: Astrology, Vastu & Spiritual Healing",
    description:
      "Kundali analysis and matching, numerology, Vastu, spiritual healing, and rudraksha and gemstone guidance with Dr Shalini Vashistha. Online and in person, with a curated store of energised spiritual products.",
    keywords: ["Divine Trinetra", "Dr Shalini Vashistha", "vedic astrologer", "kundali analysis", "kundali matching", "numerology", "vastu consultation", "spiritual healing", "rudraksha", "gemstones", "yantras"],
  },

  locale: "en-IN",
  currency: "INR",

  navigation: [
    { id: "nav-about", label: "About", href: "/#about" },
    { id: "nav-services", label: "Services", href: "/#services" },
    { id: "nav-process", label: "How It Works", href: "/#process" },
    { id: "nav-store", label: "Store", href: "/#store" },
    { id: "nav-insights", label: "Insights", href: "/#insights" },
    { id: "nav-faq", label: "FAQs", href: "/#faq" },
  ],

  headerCta: { label: "Book a Consultation", href: "/#book" },
  skipLinkLabel: "Skip to main content",
  breadcrumbLabel: "Breadcrumb",
  breadcrumbHomeLabel: "Home",

  notFound: {
    eyebrow: "Page not found",
    title: "This page has drifted out of orbit.",
    description: "The page you're looking for doesn't exist or may have moved.",
    primaryCta: { label: "Back to home", href: "/" },
    secondaryCta: { label: "Visit the store", href: "/#store" },
  },
  menuLabels: { open: "Open menu", close: "Close menu" },

  contact: {
    phone: { label: phone, href: `tel:+${phoneDigits}` },
    email: { label: "namaste@divinetrinetra.example", href: "mailto:namaste@divinetrinetra.example" },
    whatsapp: {
      label: "Chat on WhatsApp",
      href: `https://wa.me/${phoneDigits}`,
    },
    address: "Studio 4, Celestial Court, Hauz Khas Village, New Delhi 110016",
    hours: "Mon – Sat · 10:00 am – 7:00 pm IST",
  },

  social: [
    { id: "instagram", label: "Instagram", platform: "instagram", href: "https://instagram.com/" },
    { id: "youtube", label: "YouTube", platform: "youtube", href: "https://youtube.com/" },
    { id: "facebook", label: "Facebook", platform: "facebook", href: "https://facebook.com/" },
    { id: "linkedin", label: "LinkedIn", platform: "linkedin", href: "https://linkedin.com/" },
  ],

  footer: {
    blurb:
      "Vedic astrology, numerology, Vastu and spiritual healing with Dr Shalini Vashistha, alongside a curated collection of authentic spiritual products.",
    columns: [
      {
        id: "footer-services",
        title: "Consultations",
        links: [
          { label: "Kundali Analysis", href: "/services/kundali-analysis" },
          { label: "Kundali Matching", href: "/services/kundali-matching" },
          { label: "Numerology", href: "/services/numerology" },
          { label: "Vastu Consultation", href: "/services/vastu-consultation" },
          { label: "Spiritual Healing", href: "/services/spiritual-healing" },
          { label: "Rudraksha & Gemstones", href: "/services/rudraksha-gemstone-consultation" },
          { label: "Yantras & Products", href: "/services/yantras-spiritual-products" },
        ],
      },
      {
        id: "footer-store",
        title: "Store",
        links: [
          { label: "Gemstones", href: "/#store" },
          { label: "Rudraksha", href: "/#store" },
          { label: "Yantras", href: "/#store" },
          { label: "Spiritual Accessories", href: "/#store" },
          { label: "Personalised Reports", href: "/#store" },
        ],
      },
      {
        id: "footer-company",
        title: "Explore",
        links: [
          { label: "About Dr Shalini", href: "/#about" },
          { label: "How It Works", href: "/#process" },
          { label: "Insights", href: "/#insights" },
          { label: "FAQs", href: "/#faq" },
          { label: "Book a Session", href: "/#book" },
        ],
      },
    ],
    contactTitle: "Get in touch",
    newsletter: {
      title: "Monthly Planetary Notes",
      description: "One calm email a month on transits, auspicious dates and new arrivals.",
      placeholder: "Your email address",
      buttonLabel: "Subscribe",
      successMessage: "Thank you. This is a prototype, so no email has been stored.",
    },
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "Shipping Policy", href: "#" },
    ],
    copyright: "© 2026 Divine Trinetra. All rights reserved.",
    disclaimer:
      "Astrology offers guidance for reflection and is not a substitute for medical, legal or financial advice.",
  },
};
