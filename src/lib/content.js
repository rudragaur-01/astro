// Content repository: the single place the UI reads content from.
//
// Content is defined in `src/data` and can be overridden from the Google Sheet
// for the fields allowed in `src/lib/cms/schema.js`. The sheet can edit and
// hide existing records and add services and products; it never adds sections
// or other page types. Components never import `src/data` directly.

import { getContent } from "@/lib/cms/load";

// Routes are an app concern, so URLs are derived here from each item's slug.
const withProductHref = (product) => ({ ...product, href: `/store/${product.slug}` });
const withServiceHref = (service) => ({ ...service, href: `/services/${service.slug}` });

const isVisible = (item) => item.visible !== false;
const visibleServices = (content) =>
  content.services.filter(isVisible).map((service) => ({ ...service, faqs: service.faqs?.filter(isVisible) }));
const visibleProducts = (content) => content.products.filter(isVisible);

export async function getSiteSettings() {
  const content = await getContent();
  const hiddenHrefs = new Set([
    ...content.services.filter((item) => !isVisible(item)).map((item) => withServiceHref(item).href),
    ...content.products.filter((item) => !isVisible(item)).map((item) => withProductHref(item).href),
  ]);
  const { site } = content;
  return {
    ...site,
    footer: {
      ...site.footer,
      columns: site.footer.columns.map((column) => ({
        ...column,
        links: column.links.filter((link) => !hiddenHrefs.has(link.href)),
      })),
    },
  };
}

export async function getHero() {
  return (await getContent()).hero;
}

export async function getAbout() {
  return (await getContent()).about;
}

export async function getServices() {
  const content = await getContent();
  return {
    ...content.servicesSection,
    bookHref: content.serviceDetail.bookHref,
    items: visibleServices(content).map(withServiceHref),
  };
}

export async function getServiceSlugs() {
  return (await getContent()).services.map((service) => service.slug);
}

export async function getService(slug) {
  const service = visibleServices(await getContent()).find((item) => item.slug === slug);
  return service ? withServiceHref(service) : null;
}

export async function getOtherServices(slug) {
  return visibleServices(await getContent())
    .filter((item) => item.slug !== slug)
    .map(withServiceHref);
}

export async function getServiceDetailContent() {
  return (await getContent()).serviceDetail;
}

export async function getWhyChooseUs() {
  return (await getContent()).whyChooseUs;
}

export async function getConsultationProcess() {
  return (await getContent()).consultationProcess;
}

export async function getProducts() {
  const content = await getContent();
  return {
    ...content.productsSection,
    categories: content.productCategories,
    items: visibleProducts(content).map(withProductHref),
  };
}

export async function getProductSlugs() {
  return (await getContent()).products.map((product) => product.slug);
}

export async function getProduct(slug) {
  const product = visibleProducts(await getContent()).find((item) => item.slug === slug);
  return product ? withProductHref(product) : null;
}

// Same-category items first, then the rest of the catalogue.
export async function getRelatedProducts(slug, count) {
  const products = visibleProducts(await getContent());
  const current = products.find((item) => item.slug === slug);
  const others = products.filter((item) => item.slug !== slug);
  const sameCategory = others.filter((item) => item.category === current?.category);
  const rest = others.filter((item) => item.category !== current?.category);
  return [...sameCategory, ...rest].slice(0, count).map(withProductHref);
}

export async function getProductDetailContent() {
  const content = await getContent();
  return {
    ...content.productDetail,
    categories: content.productCategories,
    compareAtLabel: content.productsSection.compareAtLabel,
    viewProductLabel: content.productsSection.viewProductLabel,
  };
}

export async function getTestimonials() {
  const content = await getContent();
  return { ...content.testimonialsSection, items: content.testimonials.filter(isVisible) };
}

export async function getBooking() {
  const content = await getContent();
  return {
    ...content.booking,
    serviceOptions: visibleServices(content).map(({ slug, title }) => ({ value: slug, label: title })),
  };
}

export async function getInsights() {
  const content = await getContent();
  return { ...content.insightsSection, items: content.insights.filter(isVisible) };
}

export async function getFaqs() {
  const content = await getContent();
  return { ...content.faqsSection, items: content.faqs.filter(isVisible) };
}

export async function getFinalCta() {
  return (await getContent()).finalCta;
}
