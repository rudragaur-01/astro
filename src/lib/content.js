// Content repository: the single place the UI reads content from.
//
// Today every getter resolves local data from `src/data`. When Strapi is
// introduced, replace a getter's body with a fetch to the Strapi API and map
// the response to the same shape. Components never import `src/data` directly,
// so nothing in the UI needs to change.
//
//   export async function getServices() {
//     "use cache";
//     cacheLife("hours");
//     const res = await fetch(`${process.env.STRAPI_URL}/api/services?populate=image`);
//     return (await res.json()).data.map(toService);
//   }

import { cacheLife } from "next/cache";
import { site } from "@/data/site";
import { hero } from "@/data/hero";
import { about } from "@/data/about";
import { services, servicesSection, serviceDetail } from "@/data/services";
import { whyChooseUs } from "@/data/why-choose-us";
import { consultationProcess } from "@/data/process";
import { products, productCategories, productsSection, productDetail } from "@/data/products";
import { testimonials, testimonialsSection } from "@/data/testimonials";
import { booking } from "@/data/booking";
import { insights, insightsSection } from "@/data/insights";
import { faqs, faqsSection } from "@/data/faqs";
import { finalCta } from "@/data/cta";

// Routes are an app concern, so URLs are derived here from each item's slug.
const withProductHref = (product) => ({ ...product, href: `/store/${product.slug}` });
const withServiceHref = (service) => ({ ...service, href: `/services/${service.slug}` });

export async function getSiteSettings() {
  "use cache";
  cacheLife("hours");
  return site;
}

export async function getHero() {
  "use cache";
  cacheLife("hours");
  return hero;
}

export async function getAbout() {
  "use cache";
  cacheLife("hours");
  return about;
}

export async function getServices() {
  "use cache";
  cacheLife("hours");
  return { ...servicesSection, bookHref: serviceDetail.bookHref, items: services.map(withServiceHref) };
}

export async function getServiceSlugs() {
  "use cache";
  cacheLife("hours");
  return services.map((service) => service.slug);
}

export async function getService(slug) {
  "use cache";
  cacheLife("hours");
  const service = services.find((item) => item.slug === slug);
  return service ? withServiceHref(service) : null;
}

export async function getOtherServices(slug) {
  "use cache";
  cacheLife("hours");
  return services.filter((item) => item.slug !== slug).map(withServiceHref);
}

export async function getServiceDetailContent() {
  "use cache";
  cacheLife("hours");
  return serviceDetail;
}

export async function getWhyChooseUs() {
  "use cache";
  cacheLife("hours");
  return whyChooseUs;
}

export async function getConsultationProcess() {
  "use cache";
  cacheLife("hours");
  return consultationProcess;
}

export async function getProducts() {
  "use cache";
  cacheLife("hours");
  return { ...productsSection, categories: productCategories, items: products.map(withProductHref) };
}

export async function getProductSlugs() {
  "use cache";
  cacheLife("hours");
  return products.map((product) => product.slug);
}

export async function getProduct(slug) {
  "use cache";
  cacheLife("hours");
  const product = products.find((item) => item.slug === slug);
  return product ? withProductHref(product) : null;
}

// Same-category items first, then the rest of the catalogue.
export async function getRelatedProducts(slug, count) {
  "use cache";
  cacheLife("hours");
  const current = products.find((item) => item.slug === slug);
  const others = products.filter((item) => item.slug !== slug);
  const sameCategory = others.filter((item) => item.category === current?.category);
  const rest = others.filter((item) => item.category !== current?.category);
  return [...sameCategory, ...rest].slice(0, count).map(withProductHref);
}

export async function getProductDetailContent() {
  "use cache";
  cacheLife("hours");
  return { ...productDetail, categories: productCategories, compareAtLabel: productsSection.compareAtLabel, viewProductLabel: productsSection.viewProductLabel };
}

export async function getTestimonials() {
  "use cache";
  cacheLife("hours");
  return { ...testimonialsSection, items: testimonials };
}

export async function getBooking() {
  "use cache";
  cacheLife("hours");
  return {
    ...booking,
    serviceOptions: services.map(({ slug, title }) => ({ value: slug, label: title })),
  };
}

export async function getInsights() {
  "use cache";
  cacheLife("hours");
  return { ...insightsSection, items: insights };
}

export async function getFaqs() {
  "use cache";
  cacheLife("hours");
  return { ...faqsSection, items: faqs };
}

export async function getFinalCta() {
  "use cache";
  cacheLife("hours");
  return finalCta;
}
