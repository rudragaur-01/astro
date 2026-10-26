import { media } from "./media";

export const about = {
  eyebrow: "Meet Your Astrologer",
  title: "A lifelong student of the sky, and of people.",
  paragraphs: [
    "Devansh Rao grew up in a family of Sanskrit scholars in Varanasi, where he began studying Parashari Jyotish at the age of fourteen. Nearly two decades later, his practice blends classical rigour with a warm, practical way of speaking about what a chart really means.",
    "He doesn't believe in fear or fatalism. Each consultation is a quiet, focused conversation: your chart, your questions, and clear guidance you can act on, with remedies suggested only where they genuinely help.",
  ],
  image: media.brassDiya,
  secondaryImage: media.persianHoroscope,
  portrait: media.portrait,
  experienceBadge: { value: "18", label: "Years reading charts" },
  achievements: [
    { id: "ach-1", icon: "award", title: "Jyotish Acharya", description: "Bharatiya Vidya Sansthan, Varanasi" },
    { id: "ach-2", icon: "book-open", title: "Author", description: "“The Quiet Chart”, a guide to Dasha periods" },
    { id: "ach-3", icon: "users", title: "Mentor", description: "2,000+ students in Vedic astrology courses" },
    { id: "ach-4", icon: "globe", title: "Speaker", description: "Talks across India, Singapore and the UK" },
  ],
  expertiseLabel: "Areas of expertise",
  expertise: ["Parashari Jyotish", "KP System", "Prashna", "Vedic Numerology", "Vastu Basics", "Muhurta"],
  signature: "Devansh Rao",
  cta: { label: "Read his approach", href: "#why-us" },
};
