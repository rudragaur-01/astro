export function formatPrice(amount, { locale = "en-IN", currency = "INR" } = {}) {
  if (typeof amount !== "number") return null;
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export function formatDate(isoDate, locale = "en-IN") {
  if (!isoDate) return null;
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(isoDate),
  );
}

// Adds display-ready category and price labels to products. Run on the server
// so client components receive plain strings and hydrate consistently.
export function toProductCards(products, categories, pricing) {
  const categoryLabels = Object.fromEntries(categories.map((c) => [c.id, c.label]));
  return products.map((product) => ({
    ...product,
    categoryLabel: categoryLabels[product.category] ?? product.category,
    priceFormatted: formatPrice(product.price, pricing),
    compareAtFormatted: formatPrice(product.compareAtPrice, pricing),
  }));
}

// Replaces `{key}` placeholders in CMS-provided strings.
export function fillTemplate(template, values) {
  return template?.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match) ?? "";
}

export function whatsappLink(baseHref, message) {
  return `${baseHref}?text=${encodeURIComponent(message)}`;
}
