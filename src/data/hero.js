import { media } from "./media";

export const hero = {
  eyebrow: "Vedic Astrologer · 18 Years of Practice",
  title: "Clarity, written in",
  titleAccent: "your stars.",
  description:
    "Acharya Devansh Rao reads your birth chart with patience and precision, helping you move through career turns, relationships and life's big decisions with calm confidence.",
  primaryCta: { label: "Book a Consultation", href: "#book" },
  secondaryCta: { label: "Explore Products", href: "#store" },
  image: media.zodiacArtwork,
  portrait: media.portrait,
  imageCaption: { title: "Acharya Devansh Rao", subtitle: "Jyotish Acharya · Numerologist" },
  highlights: [
    { id: "hl-online", icon: "video", label: "Online & in-person sessions" },
    { id: "hl-private", icon: "lock", label: "Private & confidential" },
  ],
  stats: [
    { id: "stat-years", value: "18+", label: "Years of practice" },
    { id: "stat-sessions", value: "12k+", label: "Consultations held" },
    { id: "stat-countries", value: "40+", label: "Countries served" },
    { id: "stat-rating", value: "4.9", label: "Average client rating" },
  ],
};
