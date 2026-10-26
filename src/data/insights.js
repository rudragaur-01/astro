import { media } from "./media";

export const insightsSection = {
  eyebrow: "Astrology Insights",
  title: "Notes from the observatory",
  description: "Plain-language articles on planets, signs and numbers, and what they mean for everyday life.",
  readMoreLabel: "Read article",
  viewAllCta: { label: "View all articles", href: "#insights" },
};

// `href` is a placeholder until the blog is built.
export const insights = [
  {
    id: "insight-saturn-return",
    slug: "understanding-your-saturn-return",
    category: "Planets",
    title: "Understanding your Saturn return, and why it isn't a curse",
    excerpt: "Around 29 and again at 58, Saturn comes home. Here's how to work with its lessons instead of fearing them.",
    image: media.saturn,
    date: "2026-10-12",
    readingTime: "6 min read",
    href: "#insights",
  },
  {
    id: "insight-moon-sign",
    slug: "moon-sign-vs-sun-sign",
    category: "Zodiac Signs",
    title: "Moon sign vs. Sun sign: which one describes you?",
    excerpt: "In Vedic astrology, the Moon holds the mind. Learn why your Rashi often feels truer than your Sun sign.",
    image: media.fullMoon,
    date: "2026-09-28",
    readingTime: "5 min read",
    href: "#insights",
  },
  {
    id: "insight-life-path",
    slug: "finding-your-life-path-number",
    category: "Numerology",
    title: "Finding your life path number in three simple steps",
    excerpt: "A quick, practical method to calculate your core number and what each of the nine paths suggests.",
    image: media.nebula,
    date: "2026-09-14",
    readingTime: "4 min read",
    href: "#insights",
  },
  {
    id: "insight-dasha",
    slug: "a-beginners-guide-to-dasha-periods",
    category: "Vedic Basics",
    title: "A beginner's guide to Dasha periods",
    excerpt: "The Vimshottari Dasha is astrology's timeline. Here's how planetary periods colour each chapter of life.",
    image: media.zodiacMap,
    date: "2026-08-30",
    readingTime: "7 min read",
    href: "#insights",
  },
];
