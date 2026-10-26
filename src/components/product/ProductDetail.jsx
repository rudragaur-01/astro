import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Button from "@/components/ui/Button";
import CmsImage from "@/components/ui/CmsImage";
import Icon from "@/components/ui/Icon";
import SectionHeading, { Eyebrow } from "@/components/ui/SectionHeading";
import ProductCard from "@/components/sections/ProductCard";
import { fillTemplate, formatPrice, toProductCards, whatsappLink } from "@/lib/format";

export default function ProductDetail({ product, related, detail, site }) {
  const pricing = { locale: site.locale, currency: site.currency };
  const [card] = toProductCards([product], detail.categories, pricing);
  const relatedCards = toProductCards(related, detail.categories, pricing);
  const savings =
    product.compareAtPrice > product.price
      ? fillTemplate(detail.savingsLabel, { amount: formatPrice(product.compareAtPrice - product.price, pricing) })
      : null;
  const enquireHref = whatsappLink(site.contact.whatsapp.href, fillTemplate(detail.enquireMessage, { product: product.name }));

  return (
    <>
      <section aria-labelledby="product-title" className="bg-hero pt-24 pb-[clamp(3.5rem,6vw,6rem)] sm:pt-28">
        <div className="container-page">
          <Breadcrumbs
            label={site.breadcrumbLabel}
            items={[
              { label: site.breadcrumbHomeLabel, href: "/" },
              { label: detail.storeLabel, href: detail.storeHref },
              { label: card.categoryLabel, href: detail.storeHref },
              { label: product.name },
            ]}
          />

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white shadow-card ring-1 ring-sand">
                <CmsImage image={product.image} sizes="(min-width: 1024px) 45vw, 100vw" preload fallbackLabel={product.name} />
                {product.badge && (
                  <span className="absolute top-5 left-5 rounded-full bg-maroon px-3.5 py-1.5 text-xs font-semibold text-ivory shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>

              <ul className="mt-5 grid grid-cols-3 gap-3">
                {detail.perks.map((perk) => (
                  <li key={perk.id} className="rounded-2xl border border-sand bg-white/80 p-3 text-center sm:p-4">
                    <span className="mx-auto flex size-9 items-center justify-center rounded-full bg-maroon text-honey">
                      <Icon name={perk.icon} className="size-4" />
                    </span>
                    <span className="mt-2 block text-xs font-bold text-ink sm:text-sm">{perk.title}</span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-muted sm:text-xs">{perk.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-copper uppercase">{card.categoryLabel}</p>
              <h1 id="product-title" className="text-heading mt-3 font-serif font-bold text-balance text-ink">
                {product.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">{product.description}</p>

              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-serif text-4xl font-bold text-maroon">{card.priceFormatted}</span>
                {card.compareAtFormatted && (
                  <s className="text-lg text-muted/80">
                    <span className="sr-only">{detail.compareAtLabel} </span>
                    {card.compareAtFormatted}
                  </s>
                )}
                {savings && (
                  <span className="rounded-full bg-amber/20 px-3 py-1 text-xs font-bold text-copper">{savings}</span>
                )}
              </div>
              <p className="mt-1.5 text-xs text-muted">{detail.taxNote}</p>

              {product.highlights?.length > 0 && (
                <div className="mt-8 border-t border-sand pt-7">
                  <h2 className="font-serif text-lg font-bold text-ink">{detail.highlightsTitle}</h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {product.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink/90">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-gradient text-cocoa">
                          <Icon name="check" className="size-3" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-9 flex flex-wrap gap-3">
                <Button cta={{ label: detail.enquireLabel, href: enquireHref }} arrow />
                <Button cta={{ label: detail.consultLabel, href: detail.consultHref }} variant="ghostDark" />
              </div>
              <p className="mt-5 flex items-start gap-3 rounded-2xl border border-sand bg-cream/70 p-4 text-sm leading-relaxed text-muted">
                <Icon name="lock" className="mt-0.5 size-4 shrink-0 text-copper" />
                {detail.checkoutNote}
              </p>

              {product.specifications?.length > 0 && (
                <div className="mt-9">
                  <h2 className="font-serif text-lg font-bold text-ink">{detail.specificationsTitle}</h2>
                  <dl className="mt-4 divide-y divide-sand overflow-hidden rounded-2xl border border-sand bg-white">
                    {product.specifications.map((spec) => (
                      <div key={spec.label} className="grid grid-cols-5 gap-4 px-5 py-3.5 text-sm">
                        <dt className="col-span-2 text-muted">{spec.label}</dt>
                        <dd className="col-span-3 font-semibold text-ink">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {(product.longDescription?.length > 0 || product.howToUse?.length > 0) && (
        <section className="section-y bg-ivory">
          <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
            {product.longDescription?.length > 0 && (
              <div className="lg:col-span-7">
                <Eyebrow>{detail.descriptionTitle}</Eyebrow>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
                  {product.longDescription.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
              </div>
            )}

            {product.howToUse?.length > 0 && (
              <div className="lg:col-span-5">
                <div className="bg-earth relative overflow-hidden rounded-[2rem] p-8 text-ivory sm:p-10">
                  <h2 className="font-serif text-2xl font-bold">{detail.howToUseTitle}</h2>
                  <ol className="mt-6 space-y-5">
                    {product.howToUse.map((step, i) => (
                      <li key={step} className="flex gap-4">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-gradient font-serif text-sm font-bold text-cocoa">
                          {i + 1}
                        </span>
                        <span className="pt-1 text-sm leading-relaxed text-mist">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {relatedCards.length > 0 && (
        <section aria-labelledby="related-title" className="section-y bg-cream">
          <div className="container-page">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading id="related-title" eyebrow={detail.relatedEyebrow} title={detail.relatedTitle} align="left" />
              <Button cta={{ label: detail.backLabel, href: detail.storeHref }} variant="ghostDark" arrow className="self-start sm:self-auto" />
            </div>
            <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
              {relatedCards.map((item) => (
                <ProductCard key={item.id} product={item} viewLabel={detail.viewProductLabel} compareAtLabel={detail.compareAtLabel} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
