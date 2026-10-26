import Button from "@/components/ui/Button";
import CmsImage from "@/components/ui/CmsImage";
import CmsLink from "@/components/ui/CmsLink";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { fillTemplate, formatPrice } from "@/lib/format";
import ServiceCard, { ServiceMeta } from "./ServiceCard";

function FeaturedServiceCard({ service, ctaLabel, detailsLabel, bookHref }) {
  return (
    <article className="reveal group relative isolate flex min-h-[32rem] flex-col justify-end overflow-hidden rounded-[2rem] p-8 text-ivory shadow-card md:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-0 lg:p-10">
      <CmsImage image={service.image} sizes="(min-width: 1024px) 34vw, 100vw" className="-z-10 transition-transform duration-700 group-hover:scale-105" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/10" />

      {service.tag && (
        <span className="absolute top-6 left-6 rounded-full border border-amber/40 bg-espresso/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-honey backdrop-blur">
          {service.tag}
        </span>
      )}

      <span className="flex size-14 items-center justify-center rounded-2xl border border-amber/40 bg-amber/15 text-honey backdrop-blur">
        <Icon name={service.icon} className="size-6" />
      </span>
      <h3 className="mt-6 font-serif text-3xl leading-tight font-bold">
        <CmsLink href={service.href} className="transition-colors hover:text-honey">
          {service.title}
        </CmsLink>
      </h3>
      <p className="mt-3 max-w-md leading-relaxed text-ivory/80">{service.summary}</p>
      <div className="mt-6">
        <ServiceMeta service={service} dark />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button cta={{ label: ctaLabel, href: bookHref }} variant="amber" arrow />
        <Button cta={{ label: detailsLabel, href: service.href }} variant="ghostLight" />
      </div>
    </article>
  );
}

export default function Services({ services, locale, currency }) {
  const items = services.items.map((service) => ({
    ...service,
    priceLabel: services.priceLabel,
    priceFormatted: formatPrice(service.price, { locale, currency }),
  }));
  const [featured, ...rest] = items.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <section id="services" aria-labelledby="services-title" className="section-y relative bg-cream">
      <div className="container-page">
        <SectionHeading id="services-title" eyebrow={services.eyebrow} title={services.title} description={services.description} />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured && (
            <FeaturedServiceCard
              service={featured}
              ctaLabel={services.cardCtaLabel}
              detailsLabel={services.detailsLabel}
              bookHref={fillTemplate(services.bookHref, { service: featured.slug })}
            />
          )}
          {rest.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {services.footnote && <p className="mt-12 text-center text-sm text-muted">{services.footnote}</p>}
      </div>
    </section>
  );
}
