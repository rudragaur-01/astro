import { media } from "./media";

export const hero = {
  eyebrow: "Astrology · Vastu · Spiritual Healing",
  title: "See your path with",
  titleAccent: "the third eye.",
  description:
    "Divine Trinetra brings together Vedic astrology, numerology, Vastu and spiritual healing. Dr Shalini Vashistha reads your chart with patience and care, helping you move through life's turning points with clarity and calm.",
  primaryCta: { label: "Book a Consultation", href: "#book" },
  secondaryCta: { label: "Explore Products", href: "#store" },
  image: media.zodiacArtwork,
  portrait: media.portrait,
  imageCaption: { title: "Dr Shalini Vashistha", subtitle: "Founder · Divine Trinetra" },
  highlights: [
    { id: "hl-online", icon: "video", label: "Online & in-person sessions" },
    { id: "hl-private", icon: "lock", label: "Private & confidential" },
  ],
  stats: [
    { id: "stat-services", value: "7", label: "Specialised services" },
    { id: "stat-personal", value: "1:1", label: "Personal consultations" },
    { id: "stat-private", value: "100%", label: "Confidential" },
    { id: "stat-reply", value: "24h", label: "Reply to every request" },
  ],
};
