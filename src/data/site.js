// Global settings: branding, navigation, contact details and footer.
// All values are sample content for the prototype.

export const site = {
  brand: {
    name: "Devansh Rao",
    tagline: "Vedic Astrology",
    monogram: "DR",
    homeHref: "/",
  },

  seo: {
    // Replace with the production domain; used to build absolute social-image URLs.
    siteUrl: "https://devanshrao.example",
    title: "Acharya Devansh Rao | Vedic Astrologer & Spiritual Store",
    description:
      "Personal Vedic astrology consultations: kundli analysis, career, marriage compatibility and numerology. Online and in person, with a curated store of energised spiritual products.",
    keywords: ["vedic astrologer", "kundli analysis", "marriage compatibility", "numerology", "rudraksha", "gemstones"],
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
    phone: { label: "+91 98765 43210", href: "tel:+919876543210" },
    email: { label: "namaste@devanshrao.example", href: "mailto:namaste@devanshrao.example" },
    whatsapp: {
      label: "Chat on WhatsApp",
      href: "https://wa.me/919876543210",
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
      "Thoughtful Vedic guidance for life's important crossroads, with a curated collection of authentic spiritual products.",
    columns: [
      {
        id: "footer-services",
        title: "Consultations",
        links: [
          { label: "Kundli Analysis", href: "/services/kundli-analysis" },
          { label: "Career Astrology", href: "/services/career-astrology" },
          { label: "Marriage Compatibility", href: "/services/marriage-compatibility" },
          { label: "Numerology", href: "/services/numerology" },
          { label: "Personal Consultation", href: "/services/personal-consultation" },
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
          { label: "About Devansh", href: "/#about" },
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
    copyright: "© 2026 Devansh Rao Vedic Astrology. All rights reserved.",
    disclaimer:
      "Astrology offers guidance for reflection and is not a substitute for medical, legal or financial advice.",
  },
};
