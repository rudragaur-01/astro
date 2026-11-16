// Field types the spreadsheet is allowed to edit. Each type parses a raw cell
// into the shape `src/data` uses, and formats that shape back into a cell for
// the sheet template. A parse that returns SKIP leaves the code default in place.

export const SKIP = Symbol("skip");
export const REMOVE = Symbol("remove");

const YES = new Set(["yes", "y", "true", "show", "1"]);
const NO = new Set(["no", "n", "false", "hide", "0"]);

const lines = (raw) =>
  raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const toNumber = (raw) => {
  const cleaned = raw.replace(/[₹,\s]/g, "");
  if (!/^\d+(\.\d+)?$/.test(cleaned)) return SKIP;
  return Number(cleaned);
};

// Media keys are camelCase in code ("kundliClock"); the sheet shows "Kundli clock".
export const mediaLabel = (key) => key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()).replace(/ (\w)/g, (m) => m.toLowerCase());
const mediaLookupKey = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const placeholders = (text) => new Set(text.match(/\{\w+\}/g) ?? []);

export const isExternalImage = (src) => typeof src === "string" && /^https:\/\//.test(src);

// Accepts a direct https image link. Google Drive share links are rewritten to
// their direct image address (the file must be shared as "Anyone with the link").
function toImageUrl(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || /\s/.test(raw)) return null;
  const driveId =
    url.hostname === "drive.google.com" && (url.pathname.match(/\/file\/d\/([\w-]+)/)?.[1] ?? url.searchParams.get("id"));
  return driveId ? `https://lh3.googleusercontent.com/d/${driveId}` : url.href;
}

const types = {
  text: {
    parse: (raw, field) => {
      if (!raw) return SKIP;
      const required = field.placeholders ?? [];
      const present = placeholders(raw);
      return required.every((name) => present.has(`{${name}}`)) ? raw : SKIP;
    },
    format: (value) => value ?? "",
  },
  optionalText: {
    parse: (raw) => raw || REMOVE,
    format: (value) => value ?? "",
  },
  lines: {
    parse: (raw) => (lines(raw).length ? lines(raw) : SKIP),
    format: (value) => (value ?? []).join("\n"),
  },
  paragraphs: {
    parse: (raw) => {
      const paragraphs = raw
        .split(/\n\s*\n/)
        .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
        .filter(Boolean);
      return paragraphs.length ? paragraphs : SKIP;
    },
    format: (value) => (value ?? []).join("\n\n"),
  },
  price: {
    parse: (raw) => (raw ? toNumber(raw) : SKIP),
    format: (value) => (value == null ? "" : String(value)),
  },
  optionalPrice: {
    parse: (raw) => (raw ? toNumber(raw) : REMOVE),
    format: (value) => (value == null ? "" : String(value)),
  },
  visible: {
    parse: (raw) => {
      const v = raw.toLowerCase();
      if (YES.has(v)) return true;
      if (NO.has(v)) return false;
      return SKIP;
    },
    format: (value) => (value === false ? "No" : "Yes"),
  },
  rating: {
    parse: (raw) => {
      const n = toNumber(raw);
      return Number.isInteger(n) && n >= 1 && n <= 5 ? n : SKIP;
    },
    format: (value) => (value == null ? "" : String(value)),
  },
  date: {
    parse: (raw) => (/^\d{4}-\d{2}-\d{2}$/.test(raw) && !Number.isNaN(Date.parse(raw)) ? raw : SKIP),
    format: (value) => value ?? "",
  },
  url: {
    parse: (raw) => (/^https:\/\/[^\s]+$/.test(raw) ? raw : SKIP),
    format: (value) => value ?? "",
  },
  mailto: {
    parse: (raw) => (/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw) ? raw : SKIP),
    format: (value) => value ?? "",
  },
  // "Label: Value" per line.
  specs: {
    parse: (raw) => {
      const specs = lines(raw).map((line) => {
        const i = line.indexOf(":");
        return i > 0 ? { label: line.slice(0, i).trim(), value: line.slice(i + 1).trim() } : null;
      });
      return specs.length && specs.every((s) => s?.label && s.value) ? specs : SKIP;
    },
    format: (value) => (value ?? []).map((s) => `${s.label}: ${s.value}`).join("\n"),
  },
  // A product category from src/data/products.js, chosen by its label.
  category: {
    parse: (raw, _field, { productCategories }) => {
      const wanted = raw.toLowerCase();
      return productCategories.find((c) => c.id === raw || c.label.toLowerCase() === wanted)?.id ?? SKIP;
    },
    format: (value, { productCategories }) => productCategories.find((c) => c.id === value)?.label ?? "",
  },
  // An image registered in src/data/media.js (by name), or a direct https link.
  // Linked images take their alt text from the record's title or name.
  image: {
    parse: (raw, _field, { media, record }) => {
      if (!raw) return SKIP;
      const url = toImageUrl(raw);
      if (url) return { src: url, alt: record?.title ?? record?.name ?? "" };
      const wanted = mediaLookupKey(raw);
      const key = Object.keys(media).find((k) => mediaLookupKey(k) === wanted);
      return key && media[key] ? media[key] : SKIP;
    },
    format: (value, { media }) => {
      const key = Object.keys(media).find((k) => media[k] && value && media[k].src === value.src);
      if (key) return mediaLabel(key);
      return isExternalImage(value?.src) ? value.src : "";
    },
  },
  // The file behind an Images-tab entry. Only a direct https link replaces it;
  // the image's own path is accepted unchanged, anything else is ignored.
  imageFile: {
    parse: (raw, _field, { record }) => toImageUrl(raw) ?? (raw === record?.src ? raw : SKIP),
    format: (value) => value ?? "",
  },
};

export function parseCell(raw, field, context) {
  const type = types[field.type];
  if (!type) return SKIP;
  return type.parse(String(raw ?? "").replace(/\r\n?/g, "\n").trim(), field, context);
}

export function formatCell(value, field, context) {
  return types[field.type]?.format(value, context) ?? "";
}

export function slugify(text) {
  return String(text ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function imageChoices(media) {
  return Object.keys(media)
    .filter((key) => media[key])
    .map(mediaLabel);
}
