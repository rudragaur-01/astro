import { media } from "./media";

export const servicesSection = {
  eyebrow: "Professional Services",
  title: "Guidance for every part of life",
  description:
    "From your birth chart to the energy of your home, each consultation is personal, unhurried and grounded in Vedic wisdom.",
  cardCtaLabel: "Book this session",
  detailsLabel: "View details",
  priceLabel: "From",
  footnote: "All consultations are available online via video call or in person.",
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
  otherTitle: "Other services",
};

// Service pages live at /services/{slug}; the content layer builds each `href`.
export const services = [
  {
    id: "kundali-analysis",
    slug: "kundali-analysis",
    icon: "scroll-text",
    title: "Astrology & Kundali Analysis",
    summary:
      "A complete reading of your birth chart: planetary strengths, current Dasha, life themes and the windows of opportunity ahead.",
    image: media.kundliClock,
    price: 3100,
    duration: "60 min",
    featured: true,
    tag: "Most requested",
    description: [
      "Your kundali is a snapshot of the sky at the moment you were born. In this session Dr Shalini Vashistha walks you through it house by house, explaining what each planet's placement means for your nature, relationships, career, finances and wellbeing.",
      "The reading then turns to timing: the Mahadasha and Antardasha you are in now, the transits shaping the months ahead, and the periods best suited to important decisions.",
    ],
    includes: [
      "Ascendant, Moon sign and Nakshatra in depth",
      "Planetary strengths, yogas and doshas",
      "Career, relationships, health and finances",
      "Current Mahadasha and Antardasha",
      "Simple, practical remedies where relevant",
    ],
    idealFor: [
      "You want a complete overview of your chart",
      "You're entering a new phase of life and want clarity",
      "You have questions across several areas of life",
    ],
    deliverables: [
      "A recorded video session (for online consultations)",
      "Written summary with key dates",
      "One follow-up question by email",
    ],
    faqs: [
      {
        id: "kundali-faq-1",
        question: "What if I don't know my exact birth time?",
        answer:
          "Share your best estimate. Birth time rectification using key life events, or Prashna (horary) techniques for specific questions, can be used instead.",
      },
      {
        id: "kundali-faq-2",
        question: "Do I need to prepare questions?",
        answer:
          "It helps but isn't required. Most clients note two or three areas of focus; the rest of the session covers your chart as a whole.",
      },
    ],
  },
  {
    id: "kundali-matching",
    slug: "kundali-matching",
    icon: "heart-handshake",
    title: "Kundali Matching",
    summary: "Detailed Guna Milan, Manglik assessment and an honest look at long-term harmony between two charts.",
    image: media.bridalHands,
    price: 2500,
    duration: "60 min",
    description: [
      "Kundali matching goes far beyond a score out of 36. Both charts are studied individually and then together, looking at emotional compatibility, family life, health and long-term stability.",
      "Where challenges appear, Dr Shalini Vashistha explains what they really mean and how couples can work with them, with balanced guidance and without fear or exaggeration.",
    ],
    includes: [
      "Ashtakoota Guna Milan with explanation",
      "Manglik (Kuja) dosha assessment for both charts",
      "7th house and Navamsa (D9) comparison",
      "Auspicious marriage timing (Muhurta)",
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
      "One follow-up question by email",
    ],
    faqs: [
      {
        id: "matching-faq-1",
        question: "Do both partners need to attend?",
        answer:
          "It's not required, but it's recommended. Accurate birth details for both partners are needed either way.",
      },
      {
        id: "matching-faq-2",
        question: "What if the Guna score is low?",
        answer:
          "A low score alone doesn't decide a match. The full charts are studied to see whether the concerns are significant or easily balanced.",
      },
    ],
  },
  {
    id: "numerology",
    slug: "numerology",
    icon: "hash",
    title: "Numerology Consultation",
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
      "One follow-up question by email",
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
        answer: "Yes. Share a shortlist and each option will be analysed, with refinements suggested.",
      },
    ],
  },
  {
    id: "vastu-consultation",
    slug: "vastu-consultation",
    icon: "compass",
    title: "Vastu Consultation",
    summary: "Bring balance to your home or workplace with Vastu Shastra guidance on layout, directions and energy flow.",
    image: media.vastuHome,
    price: 5100,
    duration: "90 min",
    description: [
      "Vastu Shastra is the ancient science of harmonising spaces with the five elements and the eight directions. A well-balanced space supports health, relationships and prosperity for everyone who lives or works in it.",
      "Share your floor plan and photos, and receive a direction-by-direction review with practical corrections, most of which need no demolition or major changes.",
    ],
    includes: [
      "Floor plan review by direction and zone",
      "Entrance, kitchen, bedroom and puja room placement",
      "Five-element balance and energy flow",
      "Simple corrections without demolition",
      "Guidance for new homes, offices and shops",
    ],
    idealFor: [
      "You're buying, building or renovating a property",
      "You're moving into a new home or office",
      "Your space feels heavy, stuck or unsettled",
    ],
    deliverables: [
      "Marked-up floor plan with recommendations",
      "Prioritised list of corrections and remedies",
      "One follow-up question by email",
    ],
    faqs: [
      {
        id: "vastu-faq-1",
        question: "Do you need to visit the property?",
        answer:
          "Not always. Many consultations are done online using a floor plan, compass directions and photos. Site visits can be arranged where needed.",
      },
      {
        id: "vastu-faq-2",
        question: "Will I need to break walls or rebuild?",
        answer:
          "Rarely. Most imbalances can be corrected with placement changes, colours, elements or yantras, without structural work.",
      },
    ],
  },
  {
    id: "spiritual-healing",
    slug: "spiritual-healing",
    icon: "sparkles",
    title: "Spiritual Healing",
    summary: "Gentle healing sessions to release stress, restore energetic balance and reconnect with inner calm.",
    image: media.meditationDawn,
    price: 2100,
    duration: "60 min",
    description: [
      "Life's pressures can leave us drained, anxious or disconnected. Spiritual healing works on the subtle energy body to release blockages and restore a sense of balance and peace.",
      "Each session is tailored to what you're carrying at the moment, combining energy work, guided breathing and mantra, with simple practices you can continue at home.",
    ],
    includes: [
      "Energy assessment and chakra balancing",
      "Guided meditation and breathwork",
      "Mantra and affirmation practice",
      "Release of emotional and energetic blockages",
      "Daily practices to maintain balance",
    ],
    idealFor: [
      "You feel stressed, drained or emotionally heavy",
      "You're going through a difficult transition",
      "You want to deepen your spiritual practice",
    ],
    deliverables: [
      "A personalised healing session",
      "Simple daily practices to continue at home",
      "One follow-up question by email",
    ],
    faqs: [
      {
        id: "healing-faq-1",
        question: "Does spiritual healing work online?",
        answer: "Yes. Energy healing is not limited by distance, and online sessions are as effective as in-person ones.",
      },
      {
        id: "healing-faq-2",
        question: "Is it a replacement for medical treatment?",
        answer:
          "No. Spiritual healing supports emotional and energetic wellbeing and works alongside, never instead of, medical care.",
      },
    ],
  },
  {
    id: "rudraksha-gemstone-consultation",
    slug: "rudraksha-gemstone-consultation",
    icon: "gem",
    title: "Rudraksha & Gemstone Consultation",
    summary: "Find the right rudraksha and gemstones for your chart, with guidance on wearing and energising them.",
    image: media.gemstoneRuby,
    price: 1800,
    duration: "45 min",
    description: [
      "The right gemstone or rudraksha can strengthen supportive planets in your chart, while the wrong one can do more harm than good. This consultation studies your chart to recommend what truly suits you.",
      "You'll learn which stone or mukhi to wear, its weight, metal and finger, and the right day and mantra to begin, so your remedy works as intended.",
    ],
    includes: [
      "Chart-based gemstone recommendation",
      "Rudraksha mukhi selection",
      "Weight, metal and finger guidance",
      "Auspicious day and mantra for wearing",
      "Checks on stones you already own",
    ],
    idealFor: [
      "You're considering wearing a gemstone or rudraksha",
      "You've been advised a stone and want a second opinion",
      "You want an authentic, energised remedy",
    ],
    deliverables: [
      "Written recommendation with wearing instructions",
      "Access to certified stones from our store",
      "One follow-up question by email",
    ],
    faqs: [
      {
        id: "gem-faq-1",
        question: "Do I have to buy the gemstone from you?",
        answer:
          "No. You're welcome to buy elsewhere. Certified, energised options are available in the Divine Trinetra store if you'd prefer.",
      },
      {
        id: "gem-faq-2",
        question: "Can I wear more than one gemstone?",
        answer: "Sometimes. Certain combinations work well while others conflict, so your chart is checked before combining stones.",
      },
    ],
  },
  {
    id: "yantras-spiritual-products",
    slug: "yantras-spiritual-products",
    icon: "orbit",
    title: "Yantras & Spiritual Products",
    summary: "Personal guidance on choosing, placing and energising yantras and sacred products for your home and goals.",
    image: media.shreeYantra,
    price: 1100,
    duration: "30 min",
    description: [
      "Yantras are sacred geometric tools that focus divine energy for specific purposes: prosperity, protection, health or harmony. Choosing the right one, and placing it correctly, makes all the difference.",
      "This session matches yantras and spiritual products to your chart and intentions, with clear instructions on placement, energising and daily worship.",
    ],
    includes: [
      "Yantra selection based on your chart and goals",
      "Correct direction and placement at home or work",
      "Energising (pran pratishtha) guidance",
      "Daily mantra and worship routine",
      "Recommendations for malas, kalash and puja items",
    ],
    idealFor: [
      "You want to bring a yantra into your home or office",
      "You're unsure which spiritual products suit you",
      "You'd like a simple daily spiritual routine",
    ],
    deliverables: [
      "Personal yantra and product recommendations",
      "Placement and energising instructions",
      "Energised products from the Divine Trinetra store",
    ],
    faqs: [
      {
        id: "yantra-faq-1",
        question: "Are the yantras in your store energised?",
        answer: "Yes. Every yantra is energised with the appropriate mantras before it is dispatched.",
      },
      {
        id: "yantra-faq-2",
        question: "Can I keep more than one yantra?",
        answer: "Yes, as long as they're placed correctly. Placement guidance is part of the consultation.",
      },
    ],
  },
];
