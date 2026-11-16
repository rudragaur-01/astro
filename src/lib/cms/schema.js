// The editable surface of the Google Sheet. Anything not listed here stays
// controlled by code. Sheet values for unlisted keys are ignored.
//
// Tabs are named for what the client sees on the website, not for the code.
// - `fields` tables: one row per value, edited in the "What shows on the website" column.
// - `collection` tables: one row per record. Display columns are shown only for context.
// - `allowNew` (consultations and shop only): blank-key rows become new records.
//   Slug comes from the name; rows missing a required field are ignored.

import { mediaLabel } from "./fields";
import { parsePath, toPattern } from "./paths";

export const KEY_HEADER = "Key (do not edit)";
export const CONTENT_HEADER = "What shows on the website";
export const NOTES_HEADER = "Your notes";

const field = (key, label, type = "text", extra = {}) => ({ key, label, type, ...extra });
const column = (header, name, type = "text", extra = {}) => ({ header, field: name, type, ...extra });
const show = column("Show on website?", "visible", "visible");
const imageHelp = "Image (paste https:// link, or pick a name from the Images tab)";

export const contentTabs = [
  // ——— Everyday work ———
  {
    title: "Consultations",
    description:
      "Questions for each consultation are above. The list at the bottom is where you add or hide consultations: fill an empty row (Name, Short description and Price are required), or set Show on website? to No. Then Website → Publish changes.",
    tables: [
      {
        heading: "Questions on each consultation page",
        collection: "services[*].faqs",
        display: [{ header: "Consultation", value: (_item, [service]) => service.title }],
        columns: [show, column("Question", "question"), column("Answer", "answer")],
      },
      {
        heading: "Consultations (add new ones in the empty rows below)",
        collection: "services",
        allowNew: {
          nameField: "title",
          required: ["title", "summary", "price"],
          defaults: { icon: "sparkles", faqs: [] },
          defaultImage: "nightSky",
        },
        display: [{ header: "Website page", value: (item) => `/services/${item.slug}` }],
        columns: [
          show,
          column("Name", "title"),
          column("Short description", "summary"),
          column("Price (₹)", "price", "price"),
          column("Duration", "duration"),
          column("Badge (optional)", "tag", "optionalText"),
          column("Full description", "description", "paragraphs"),
          column("What we cover (one per line)", "includes", "lines"),
          column("Ideal for (one per line)", "idealFor", "lines"),
          column("What you receive (one per line)", "deliverables", "lines"),
          column(imageHelp, "image", "image"),
        ],
      },
    ],
  },
  {
    title: "Shop",
    description:
      "Categories are above. Products are at the bottom — add a product in an empty row (Name, Category, Short description and Price are required), or set Show on website? to No to hide one. Then Website → Publish changes.",
    tables: [
      {
        heading: "Shop categories",
        collection: "productCategories",
        columns: [column("Category name", "label")],
      },
      {
        heading: "Products (add new ones in the empty rows below)",
        collection: "products",
        allowNew: {
          nameField: "name",
          required: ["name", "category", "description", "price"],
          defaults: {},
          defaultImage: "zodiacArtwork",
        },
        display: [{ header: "Website page", value: (item) => `/store/${item.slug}` }],
        columns: [
          show,
          column("Name", "name"),
          column("Category", "category", "category"),
          column("Short description", "description"),
          column("Price (₹)", "price", "price"),
          column("Old price (₹, optional)", "compareAtPrice", "optionalPrice"),
          column("Badge (optional)", "badge", "optionalText"),
          column("Full description", "longDescription", "paragraphs"),
          column("Highlights (one per line)", "highlights", "lines"),
          column("Details (Label: Value, one per line)", "specifications", "specs"),
          column("How to use (one per line)", "howToUse", "lines"),
          column(imageHelp, "image", "image"),
        ],
      },
    ],
  },
  {
    title: "Home page",
    description:
      "Text and images on the home page, in the order visitors see them when they scroll. Consultations and products themselves are edited on the Consultations and Shop tabs.",
    tables: [
      {
        heading: "1. Top of the home page",
        fields: [
          field("hero.eyebrow", "Small badge above the headline"),
          field("hero.title", "Headline (first part)"),
          field("hero.titleAccent", "Headline (highlighted part)"),
          field("hero.description", "Introduction under the headline"),
          field("hero.primaryCta.label", "Main button"),
          field("hero.secondaryCta.label", "Second button"),
          field("hero.imageCaption.title", "Name on the photo card"),
          field("hero.imageCaption.subtitle", "Title on the photo card"),
          field("hero.image", imageHelp, "image"),
        ],
      },
      {
        heading: "Top highlights (small chips)",
        collection: "hero.highlights",
        columns: [column("Text", "label")],
      },
      {
        heading: "Top stats",
        collection: "hero.stats",
        columns: [column("Number", "value"), column("Label", "label")],
      },
      {
        heading: "2. About",
        fields: [
          field("about.eyebrow", "Small line above the title"),
          field("about.title", "Title"),
          field("about.paragraphs", "Biography (blank line between paragraphs)", "paragraphs"),
          field("about.expertiseLabel", "Expertise list heading"),
          field("about.expertise", "Expertise tags (one per line)", "lines"),
          field("about.signature", "Signature"),
          field("about.cta.label", "Link text"),
          field("about.image", `Main ${imageHelp}`, "image"),
          field("about.secondaryImage", `Small ${imageHelp}`, "image"),
        ],
      },
      {
        heading: "About highlight cards",
        collection: "about.achievements",
        columns: [column("Title", "title"), column("Description", "description")],
      },
      {
        heading: "3. Consultations section (list is on the Consultations tab)",
        fields: [
          field("servicesSection.eyebrow", "Small line above the title"),
          field("servicesSection.title", "Title"),
          field("servicesSection.description", "Introduction"),
          field("servicesSection.cardCtaLabel", "Button on the featured card"),
          field("servicesSection.detailsLabel", "Details button"),
          field("servicesSection.priceLabel", "Word before the price"),
          field("servicesSection.footnote", "Note under the cards"),
        ],
      },
      {
        heading: "4. Why choose us",
        fields: [
          field("whyChooseUs.eyebrow", "Small line above the title"),
          field("whyChooseUs.title", "Title"),
          field("whyChooseUs.description", "Introduction"),
          field("whyChooseUs.credentialsTitle", "Side card heading"),
          field("whyChooseUs.credentials", "Side card list (one per line)", "lines"),
          field("whyChooseUs.image", imageHelp, "image"),
        ],
      },
      {
        heading: "Why choose us — pillars",
        collection: "whyChooseUs.pillars",
        columns: [column("Title", "title"), column("Description", "description")],
      },
      {
        heading: "5. How it works",
        fields: [
          field("consultationProcess.eyebrow", "Small line above the title"),
          field("consultationProcess.title", "Title"),
          field("consultationProcess.description", "Introduction"),
          field("consultationProcess.stepLabel", "Word before each step number"),
          field("consultationProcess.tagline", "Line under the steps"),
        ],
      },
      {
        heading: "How it works — steps",
        collection: "consultationProcess.steps",
        columns: [column("Title", "title"), column("Description", "description")],
      },
      {
        heading: "6. Shop section (products are on the Shop tab)",
        fields: [
          field("productsSection.eyebrow", "Small line above the title"),
          field("productsSection.title", "Title"),
          field("productsSection.description", "Introduction"),
          field("productsSection.collectionCta.label", "Button"),
          field("productsSection.allCategoriesLabel", "'All' filter text"),
          field("productsSection.viewProductLabel", "'View product' text"),
          field("productsSection.resultsLabel", "Results text (keep {count})", "text", { placeholders: ["count"] }),
          field("productsSection.compareAtLabel", "Old-price label"),
        ],
      },
      {
        heading: "Shop trust badges",
        collection: "productsSection.assurances",
        columns: [column("Text", "label")],
      },
      {
        heading: "7. Booking section",
        fields: [
          field("booking.eyebrow", "Small line above the title"),
          field("booking.title", "Title"),
          field("booking.description", "Introduction"),
          field("booking.benefits", "Benefit tags (one per line)", "lines"),
          field("booking.contactPrompt", "Text on the photo"),
          field("booking.image", imageHelp, "image"),
          field("booking.form.title", "Form heading"),
          field("booking.form.submitLabel", "Submit button"),
          field("booking.form.privacyNote", "Note under the button"),
          field("booking.form.successTitle", "Thank-you heading"),
          field("booking.form.successMessage", "Thank-you message"),
        ],
      },
      {
        heading: "8. Articles section",
        fields: [
          field("insightsSection.eyebrow", "Small line above the title"),
          field("insightsSection.title", "Title"),
          field("insightsSection.description", "Introduction"),
          field("insightsSection.readMoreLabel", "'Read article' text"),
          field("insightsSection.viewAllCta.label", "Button"),
        ],
      },
      {
        heading: "Articles",
        collection: "insights",
        columns: [
          show,
          column("Title", "title"),
          column("Category", "category"),
          column("Short excerpt", "excerpt"),
          column(imageHelp, "image", "image"),
          column("Date (YYYY-MM-DD)", "date", "date"),
          column("Reading time", "readingTime"),
        ],
      },
      {
        heading: "9. Closing banner (above the footer)",
        fields: [
          field("finalCta.eyebrow", "Small line above the title"),
          field("finalCta.title", "Title"),
          field("finalCta.description", "Introduction"),
          field("finalCta.primaryCta.label", "Main button"),
          field("finalCta.secondaryCta.label", "Second button"),
          field("finalCta.image", `Background ${imageHelp}`, "image"),
        ],
      },
    ],
  },
  {
    title: "Reviews & FAQs",
    description: "Client reviews and the common questions on the home page. Set Show on website? to No to hide one without deleting it.",
    tables: [
      {
        heading: "Reviews section",
        fields: [
          field("testimonialsSection.eyebrow", "Small line above the title"),
          field("testimonialsSection.title", "Title"),
          field("testimonialsSection.ratingLabel", "Star rating text (keep {rating})", "text", { placeholders: ["rating"] }),
          field("testimonialsSection.disclaimerBadge", "Sample badge text"),
          field("testimonialsSection.disclaimer", "Sample notice (leave empty to remove)", "optionalText"),
        ],
      },
      {
        heading: "Reviews",
        collection: "testimonials",
        columns: [
          show,
          column("Client name", "name"),
          column("City / country", "location"),
          column("Review", "quote"),
          column("Consultation taken", "service"),
          column("Stars (1–5)", "rating", "rating"),
        ],
      },
      {
        heading: "FAQs section",
        fields: [
          field("faqsSection.eyebrow", "Small line above the title"),
          field("faqsSection.title", "Title"),
          field("faqsSection.description", "Introduction"),
          field("faqsSection.contactCta.label", "Button"),
        ],
      },
      {
        heading: "Common questions",
        collection: "faqs",
        columns: [show, column("Question", "question"), column("Answer", "answer")],
      },
    ],
  },

  // ——— Occasional ———
  {
    title: "Contact & brand",
    description: "Phone, email, WhatsApp, address, logo and how the site appears on Google. The call and WhatsApp buttons use the phone number automatically.",
    tables: [
      {
        heading: "Brand",
        fields: [
          field("site.brand.name", "Brand name"),
          field("site.brand.tagline", "Line under the brand name"),
          field("site.brand.logo", imageHelp, "image"),
        ],
      },
      {
        heading: "Contact",
        fields: [
          field("site.contact.phone.label", "Phone (with country code)"),
          field("site.contact.email.label", "Email (as shown)"),
          field("site.contact.email.href", "Email link (mailto:name@domain.com)", "mailto"),
          field("site.contact.whatsapp.label", "WhatsApp button text"),
          field("site.contact.address", "Address"),
          field("site.contact.hours", "Working hours"),
        ],
      },
      {
        heading: "Social media",
        collection: "site.social",
        display: [{ header: "Platform", value: (item) => item.label }],
        columns: [column("Profile link (https://…)", "href", "url")],
      },
      {
        heading: "Google search listing",
        fields: [
          field("site.seo.title", "Title on Google (under 60 characters)"),
          field("site.seo.description", "Description on Google (about 150 characters)"),
          field("site.seo.keywords", "Search keywords (one per line)", "lines"),
        ],
      },
    ],
  },
  {
    title: "Images",
    description:
      "Optional picture library. For most changes, paste an https:// image link in the Image column on Consultations or Shop. Use this tab to replace a shared picture everywhere, or to see the names you can pick from. Google Drive links work if the file is shared as 'Anyone with the link'.",
    tables: [
      {
        heading: "Pictures",
        collection: "media",
        display: [{ header: "Name", value: (_item, _parents, _content, id) => mediaLabel(id) }],
        columns: [
          column("Picture link or file", "src", "imageFile"),
          column("Description (for Google & screen readers)", "alt"),
        ],
      },
    ],
  },
  {
    title: "Website settings",
    description:
      "Menu labels, footer text, and shared button labels. You usually do not need this tab. You can rename menu items, but you cannot add or remove them here.",
    tables: [
      {
        heading: "Top menu",
        collection: "site.navigation",
        display: [{ header: "Goes to", value: (item) => item.href }],
        columns: [column("Menu text", "label")],
      },
      {
        heading: "Menu button",
        fields: [field("site.headerCta.label", "Button text")],
      },
      {
        heading: "Footer",
        fields: [
          field("site.footer.blurb", "Short text under the logo"),
          field("site.footer.contactTitle", "Contact column heading"),
          field("site.footer.copyright", "Copyright line"),
          field("site.footer.disclaimer", "Disclaimer"),
        ],
      },
      {
        heading: "Footer column headings",
        collection: "site.footer.columns",
        columns: [column("Heading", "title")],
      },
      {
        heading: "Footer links",
        collection: "site.footer.columns[*].links",
        display: [
          { header: "Column", value: (_item, [footerColumn]) => footerColumn.title },
          { header: "Goes to", value: (item) => item.href },
        ],
        columns: [column("Link text", "label")],
      },
      {
        heading: "Newsletter",
        fields: [
          field("site.footer.newsletter.title", "Heading"),
          field("site.footer.newsletter.description", "Description"),
          field("site.footer.newsletter.placeholder", "Hint inside the email box"),
          field("site.footer.newsletter.buttonLabel", "Button"),
          field("site.footer.newsletter.successMessage", "Thank-you message"),
        ],
      },
      {
        heading: "Policy links",
        collection: "site.footer.legal",
        columns: [column("Link text", "label")],
      },
      {
        heading: "Consultation page buttons & headings",
        fields: [
          field("serviceDetail.servicesLabel", "Breadcrumb word for consultations"),
          field("serviceDetail.bookLabel", "Book button"),
          field("serviceDetail.enquireLabel", "WhatsApp button"),
          field("serviceDetail.enquireMessage", "WhatsApp message (keep {service})", "text", { placeholders: ["service"] }),
          field("serviceDetail.summaryTitle", "Summary card heading"),
          field("serviceDetail.durationLabel", "Duration label"),
          field("serviceDetail.priceLabel", "Price label"),
          field("serviceDetail.formatLabel", "Format label"),
          field("serviceDetail.formatValue", "Session format"),
          field("serviceDetail.languageLabel", "Language label"),
          field("serviceDetail.languageValue", "Languages offered"),
          field("serviceDetail.aboutTitle", "'About' heading"),
          field("serviceDetail.includesTitle", "'What we cover' heading"),
          field("serviceDetail.idealForTitle", "'Ideal for' heading"),
          field("serviceDetail.deliverablesTitle", "'What you receive' heading"),
          field("serviceDetail.processEyebrow", "Process: small line"),
          field("serviceDetail.processTitle", "Process: title"),
          field("serviceDetail.faqTitle", "FAQ heading"),
          field("serviceDetail.otherEyebrow", "Other consultations: small line"),
          field("serviceDetail.otherTitle", "Other consultations: title"),
        ],
      },
      {
        heading: "Product page buttons & headings",
        fields: [
          field("productDetail.storeLabel", "Breadcrumb word for the shop"),
          field("productDetail.backLabel", "Back button"),
          field("productDetail.enquireLabel", "Order button"),
          field("productDetail.enquireMessage", "WhatsApp message (keep {product})", "text", { placeholders: ["product"] }),
          field("productDetail.consultLabel", "Second button"),
          field("productDetail.checkoutNote", "Ordering note"),
          field("productDetail.taxNote", "Note under the price"),
          field("productDetail.savingsLabel", "Discount tag (keep {amount})", "text", { placeholders: ["amount"] }),
          field("productDetail.highlightsTitle", "Highlights heading"),
          field("productDetail.descriptionTitle", "About heading"),
          field("productDetail.specificationsTitle", "Details heading"),
          field("productDetail.howToUseTitle", "How to use heading"),
          field("productDetail.relatedEyebrow", "Related products: small line"),
          field("productDetail.relatedTitle", "Related products: title"),
        ],
      },
      {
        heading: "Perks under each product photo",
        collection: "productDetail.perks",
        columns: [column("Title", "title"), column("Text", "text")],
      },
      {
        heading: "Booking form labels",
        fields: [
          field("booking.form.fields.name.label", "Name"),
          field("booking.form.fields.name.placeholder", "Hint inside Name"),
          field("booking.form.fields.email.label", "Email"),
          field("booking.form.fields.email.placeholder", "Hint inside Email"),
          field("booking.form.fields.phone.label", "Phone"),
          field("booking.form.fields.phone.placeholder", "Hint inside Phone"),
          field("booking.form.fields.birthDate.label", "Date of birth"),
          field("booking.form.fields.birthTime.label", "Time of birth"),
          field("booking.form.fields.birthPlace.label", "Place of birth"),
          field("booking.form.fields.birthPlace.placeholder", "Hint inside Place of birth"),
          field("booking.form.fields.service.label", "Consultation"),
          field("booking.form.fields.service.placeholder", "Hint inside Consultation"),
          field("booking.form.fields.mode.label", "Session preference"),
          field("booking.form.fields.message.label", "Message"),
          field("booking.form.fields.message.placeholder", "Hint inside Message"),
          field("booking.form.resetLabel", "'Send another' button"),
        ],
      },
      {
        heading: "Session preference options",
        collection: "booking.form.fields.mode.options",
        columns: [column("Option text", "label")],
      },
      {
        heading: "Page not found",
        fields: [
          field("site.notFound.eyebrow", "Small line"),
          field("site.notFound.title", "Title"),
          field("site.notFound.description", "Message"),
          field("site.notFound.primaryCta.label", "Button 1"),
          field("site.notFound.secondaryCta.label", "Button 2"),
        ],
      },
    ],
  },
];

// pattern (e.g. "services[*].price") → field definition
export const editableFields = new Map();
// collection record pattern (e.g. "services[*]") → column header → field definition
export const collectionColumns = new Map();
// tables whose keyless rows become new records
export const newRecordTables = [];

for (const tab of contentTabs) {
  for (const table of tab.tables) {
    if (table.allowNew) newRecordTables.push(table);
    if (table.collection) {
      const recordPattern = `${table.collection}[*]`;
      const byHeader = collectionColumns.get(recordPattern) ?? new Map();
      for (const def of table.columns) {
        byHeader.set(def.header, def);
        editableFields.set(`${recordPattern}.${def.field}`, def);
      }
      collectionColumns.set(recordPattern, byHeader);
    } else {
      for (const def of table.fields) {
        editableFields.set(toPattern(parsePath(def.key)), def);
      }
    }
  }
}
