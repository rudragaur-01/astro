import { cacheLife, cacheTag } from "next/cache";
import { about } from "@/data/about";
import { booking } from "@/data/booking";
import { finalCta } from "@/data/cta";
import { faqs, faqsSection } from "@/data/faqs";
import { hero } from "@/data/hero";
import { insights, insightsSection } from "@/data/insights";
import { media } from "@/data/media";
import { consultationProcess } from "@/data/process";
import { productCategories, productDetail, products, productsSection } from "@/data/products";
import { serviceDetail, services, servicesSection } from "@/data/services";
import { site } from "@/data/site";
import { testimonials, testimonialsSection } from "@/data/testimonials";
import { whyChooseUs } from "@/data/why-choose-us";
import { applyEdits, readSheetEdits } from "./edits";
import { fetchSheetTabs, isSheetConfigured } from "./google-sheets";

export const CONTENT_TAG = "content";

// Code-owned content. It defines every page, section and record that exists,
// and is what the site shows when the sheet is unavailable.
export const defaultContent = {
  site,
  hero,
  about,
  servicesSection,
  serviceDetail,
  services,
  whyChooseUs,
  consultationProcess,
  productsSection,
  productDetail,
  productCategories,
  products,
  testimonialsSection,
  testimonials,
  booking,
  insightsSection,
  insights,
  faqsSection,
  faqs,
  finalCta,
  media,
};

// Mirrors src/data/site.js: the call and WhatsApp links follow the phone number.
function deriveContactLinks(content) {
  const { contact } = content.site;
  const digits = contact.phone.label.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return content;
  contact.phone.href = `tel:+${digits}`;
  contact.whatsapp.href = `https://wa.me/${digits}`;
  return content;
}

export async function getContent() {
  "use cache";
  cacheTag(CONTENT_TAG);

  if (!isSheetConfigured()) {
    cacheLife("hours");
    return defaultContent;
  }

  try {
    const { content, ignored } = applyEdits(defaultContent, readSheetEdits(await fetchSheetTabs()));
    if (ignored.length) console.warn(`[cms] Ignored ${ignored.length} sheet value(s):`, ignored.join(", "));
    cacheLife("hours");
    return deriveContactLinks(content);
  } catch (error) {
    // Retry soon instead of holding the fallback for hours.
    console.error("[cms] Falling back to src/data:", error.message);
    cacheLife("minutes");
    return defaultContent;
  }
}
