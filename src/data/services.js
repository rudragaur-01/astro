import { media } from "./media";

export const servicesSection = {
  eyebrow: "Consultations",
  title: "Guidance for every crossroad",
  description:
    "Every session begins with a careful study of your birth chart. Choose the focus that matters most to you right now.",
  cardCtaLabel: "Book this session",
  detailsLabel: "View details",
  priceLabel: "From",
  footnote: "All sessions are available online via video call or in person at the New Delhi studio.",
};

// Labels and shared content for the service detail page.
export const serviceDetail = {
  servicesLabel: "Services",
  servicesHref: "/#services",
  bookLabel: "Book this session",
  // `{service}` is replaced with the service slug to preselect it in the booking form.
  bookHref: "/?service={service}#book",
  enquireLabel: "Ask on WhatsApp",
  enquireMessage: "Namaste, I'd like to know more about the {service} consultation.",
  summaryTitle: "Session at a glance",
  durationLabel: "Duration",
  priceLabel: "Starting at",
  formatLabel: "Format",
  formatValue: "Online or in person",
  languageLabel: "Language",
  languageValue: "English or Hindi",
  aboutTitle: "About this consultation",
  includesTitle: "What we cover",
  idealForTitle: "Ideal for you if",
  deliverablesTitle: "What you receive",
  processEyebrow: "How It Works",
  processTitle: "From booking to guidance",
  faqTitle: "Questions about this session",
  otherEyebrow: "Explore More",
  otherTitle: "Other consultations",
};

// Service pages live at /services/{slug}; the content layer builds each `href`.
export const services = [
  {
    id: "kundli-analysis",
    slug: "kundli-analysis",
    icon: "scroll-text",
    title: "Kundli Analysis",
    summary:
      "A complete reading of your birth chart: planetary strengths, current Dasha, life themes and the windows of opportunity ahead.",
    image: media.kundliClock,
    price: 3100,
    duration: "60 min",
    featured: true,
    tag: "Most requested",
    description: [
      "Your kundli is a snapshot of the sky at the moment you were born. In this session Acharya Devansh walks you through it house by house, explaining what each planet's placement means for your nature, relationships, career and wellbeing.",
      "We then focus on timing: the Mahadasha and Antardasha you are in now, the transits shaping the next twelve months, and the periods best suited to important decisions.",
    ],
    includes: [
      "Ascendant, Moon sign and Nakshatra in depth",
      "Planetary strengths, yogas and doshas",
      "Current Mahadasha and Antardasha",
      "12-month transit outlook",
      "Simple, practical remedies where relevant",
    ],
    idealFor: [
      "You want a complete overview of your chart for the first time",
      "You're entering a new life phase and want to understand its themes",
      "You have several questions across different areas of life",
    ],
    deliverables: [
      "A recorded video session (for online consultations)",
      "Written summary with key dates within 48 hours",
      "One follow-up question by email within 30 days",
    ],
    faqs: [
      {
        id: "kundli-faq-1",
        question: "What if I don't know my exact birth time?",
        answer:
          "Share your best estimate. Devansh can perform birth time rectification using key life events, or use Prashna (horary) techniques for specific questions.",
      },
      {
        id: "kundli-faq-2",
        question: "Do I need to prepare questions?",
        answer:
          "It helps but isn't required. Most clients note two or three areas of focus; the rest of the session covers your chart as a whole.",
      },
    ],
  },
  {
    id: "career-astrology",
    slug: "career-astrology",
    icon: "briefcase",
    title: "Career Astrology",
    summary: "Timing for job changes, business launches and promotions, read through your 10th house and transits.",
    image: media.careerDesk,
    price: 2100,
    duration: "45 min",
    description: [
      "Career questions are rarely just about 'what' but about 'when'. This session reads your 10th house, its lord, and the planets influencing your profession to understand where your natural strengths lie.",
      "We then map the upcoming Dasha and transit periods so you can plan job changes, business launches, investments or further study with greater confidence.",
    ],
    includes: [
      "10th house, its lord and career significators",
      "Suitable fields and working styles for your chart",
      "Favourable periods for change, growth and launches",
      "Business vs. employment indications",
      "Remedies for obstacles and delays",
    ],
    idealFor: [
      "You're considering a job change or a career switch",
      "You're planning to start or expand a business",
      "You feel stuck despite consistent effort",
    ],
    deliverables: [
      "Written summary with favourable date windows",
      "Recorded session for online consultations",
      "Follow-up question by email within 30 days",
    ],
    faqs: [
      {
        id: "career-faq-1",
        question: "Can you suggest a specific company or role?",
        answer:
          "Astrology indicates fields, environments and timing rather than specific employers. Devansh helps you weigh real options you are considering against your chart.",
      },
      {
        id: "career-faq-2",
        question: "Is this suitable for business owners?",
        answer: "Yes. Many clients use this session to time launches, partnerships and expansion decisions.",
      },
    ],
  },
  {
    id: "marriage-compatibility",
    slug: "marriage-compatibility",
    icon: "heart-handshake",
    title: "Marriage Compatibility",
    summary: "Detailed Guna Milan, Manglik assessment and an honest look at long-term harmony between two charts.",
    image: media.bridalHands,
    price: 2500,
    duration: "60 min",
    description: [
      "Kundli matching goes far beyond a score out of 36. Devansh studies both charts individually, then together, looking at emotional compatibility, family life, health and long-term stability.",
      "He is known for honest, balanced guidance. Where challenges appear, he explains what they really mean and how couples can work with them, without fear or exaggeration.",
    ],
    includes: [
      "Ashtakoota Guna Milan with explanation",
      "Manglik (Kuja) dosha assessment for both charts",
      "7th house and Navamsa (D9) comparison",
      "Auspicious marriage timing (Muhurta) guidance",
      "Remedies where genuinely required",
    ],
    idealFor: [
      "Families evaluating a proposed match",
      "Couples who want to understand each other better",
      "You're looking for an auspicious wedding date",
    ],
    deliverables: [
      "Compatibility summary for both families",
      "Suggested Muhurta windows if requested",
      "Follow-up question by email within 30 days",
    ],
    faqs: [
      {
        id: "marriage-faq-1",
        question: "Do both partners need to attend?",
        answer:
          "It's not required, but we recommend it. We need accurate birth details for both partners either way.",
      },
      {
        id: "marriage-faq-2",
        question: "What if the Guna score is low?",
        answer:
          "A low score alone doesn't decide a match. Devansh looks at the full charts and explains whether the concerns are significant or easily balanced.",
      },
    ],
  },
  {
    id: "numerology",
    slug: "numerology",
    icon: "hash",
    title: "Numerology",
    summary: "Your life path, destiny and name numbers decoded, with guidance on names, dates and lucky cycles.",
    image: media.constellationGlobe,
    price: 1500,
    duration: "40 min",
    description: [
      "Numbers carry vibrations that shape personality and opportunity. In this session your birth date and name are translated into your core numbers: Life Path, Destiny, Soul Urge and Personal Year.",
      "You'll learn which numbers support you, how to choose favourable dates, and whether a small change to the spelling of your name or business name could help.",
    ],
    includes: [
      "Life Path, Destiny and Soul Urge numbers",
      "Personal Year and Month cycles",
      "Name and business name analysis",
      "Lucky numbers, dates and colours",
      "Name-correction suggestions if needed",
    ],
    idealFor: [
      "You're naming a baby, a business or a brand",
      "You want to understand your personal cycles",
      "You're choosing dates for important events",
    ],
    deliverables: [
      "Personal numerology chart (PDF)",
      "Name suggestions where requested",
      "Follow-up question by email within 30 days",
    ],
    faqs: [
      {
        id: "num-faq-1",
        question: "Do I need my birth time for numerology?",
        answer: "No, only your full date of birth and your name as you commonly use it.",
      },
      {
        id: "num-faq-2",
        question: "Can you suggest names for a new business?",
        answer: "Yes. Share a shortlist and Devansh will analyse each option and suggest refinements.",
      },
    ],
  },
  {
    id: "personal-consultation",
    slug: "personal-consultation",
    icon: "messages-square",
    title: "Personal Consultation",
    summary: "An open one-to-one session for any question, from health and family to relocation and timing.",
    image: media.meditationDawn,
    price: 5100,
    duration: "90 min",
    description: [
      "Our most in-depth session, with no fixed agenda. Bring any question, whether it's family, health, relocation, property, education or a decision you keep returning to.",
      "With ninety minutes, there is time to go deep into your chart, explore several areas and leave with a clear, personalised plan.",
    ],
    includes: [
      "Full birth chart review",
      "Any combination of life areas you choose",
      "Prashna (horary) for specific questions",
      "Muhurta for upcoming events",
      "A personalised remedy plan",
    ],
    idealFor: [
      "You're facing a significant life decision",
      "You have questions across several areas",
      "You'd like an unhurried, in-depth conversation",
    ],
    deliverables: [
      "Detailed written summary and remedy plan",
      "Recorded session for online consultations",
      "Two follow-up questions by email within 60 days",
    ],
    faqs: [
      {
        id: "personal-faq-1",
        question: "Can family members join the session?",
        answer: "Yes, up to two family members can join, and we can look at their charts briefly if details are shared in advance.",
      },
      {
        id: "personal-faq-2",
        question: "Is this available in person?",
        answer: "Yes, at the New Delhi studio, or online via video call from anywhere in the world.",
      },
    ],
  },
];
