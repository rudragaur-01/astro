import { media } from "./media";

// Booking form copy. Service options are derived from services.js.
export const booking = {
  eyebrow: "Request a Consultation",
  title: "Begin with a single question",
  description:
    "Whether it's a career move, marriage timing or a decision you keep returning to, share a little about yourself and our team will reach out to schedule your session.",
  image: media.diyas,
  benefits: [
    "Personalised to your chart",
    "Private & confidential",
    "Online or in person",
    "Reply within 24 hours",
  ],
  contactPrompt: "Prefer to talk first?",
  form: {
    title: "Book an Astrology Session",
    fields: {
      name: { label: "Full name", placeholder: "Your full name" },
      email: { label: "Email address", placeholder: "you@example.com" },
      phone: { label: "Phone number", placeholder: "98765 43210", countryCode: "+91" },
      birthDate: { label: "Date of birth" },
      birthTime: { label: "Time of birth" },
      birthPlace: { label: "Place of birth", placeholder: "City, Country" },
      service: { label: "Service", placeholder: "Choose a service" },
      mode: {
        label: "Session preference",
        options: [
          { value: "online", label: "Online" },
          { value: "in-person", label: "In person" },
        ],
      },
      message: { label: "Your question", placeholder: "Tell us briefly what you'd like guidance on…" },
    },
    requiredHint: "Required",
    submitLabel: "Request Consultation",
    privacyNote: "Your details are used only to arrange your consultation.",
    successTitle: "Thank you, your request is noted.",
    successMessage:
      "This is a prototype, so nothing has been sent yet. In the live site, our team will contact you within 24 hours.",
    resetLabel: "Submit another request",
  },
};
