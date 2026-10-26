import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Button from "@/components/ui/Button";
import CmsImage from "@/components/ui/CmsImage";
import Icon from "@/components/ui/Icon";
import SectionHeading, { Eyebrow } from "@/components/ui/SectionHeading";
import ZodiacWheel from "@/components/ui/ZodiacWheel";
import Faqs from "@/components/sections/Faqs";
import Process from "@/components/sections/Process";
import ServiceCard from "@/components/sections/ServiceCard";
import { fillTemplate, formatPrice, whatsappLink } from "@/lib/format";

function ListBlock({ title, items, icon }) {
  if (!items?.length) return null;
  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl">{title}</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 rounded-2xl border border-sand bg-white px-4 py-3.5 text-sm leading-relaxed text-ink/90">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-maroon text-honey">
              <Icon name={icon} className="size-3.5" strokeWidth={2.25} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServiceDetail({ service, otherServices, detail, process, servicesSection, site }) {
  const pricing = { locale: site.locale, currency: site.currency };
  const price = formatPrice(service.price, pricing);
  const bookHref = fillTemplate(detail.bookHref, { service: service.slug });
  const enquireHref = whatsappLink(site.contact.whatsapp.href, fillTemplate(detail.enquireMessage, { service: service.title }));
  const others = otherServices.map((item) => ({
    ...item,
    priceLabel: servicesSection.priceLabel,
    priceFormatted: formatPrice(item.price, pricing),
  }));

  const glance = [
    { id: "duration", icon: "clock", label: detail.durationLabel, value: service.duration },
    { id: "price", icon: "gem", label: detail.priceLabel, value: price },
    { id: "format", icon: "video", label: detail.formatLabel, value: detail.formatValue },
    { id: "language", icon: "globe", label: detail.languageLabel, value: detail.languageValue },
  ].filter((row) => row.value);

  return (
    <>
      <section aria-labelledby="service-title" className="bg-hero relative overflow-hidden pt-24 pb-[clamp(3.5rem,6vw,6rem)] sm:pt-28">
        <ZodiacWheel className="pointer-events-none absolute -top-24 -right-40 hidden w-[42rem] text-copper/10 lg:block" />
        <div className="container-page relative">
          <Breadcrumbs
            label={site.breadcrumbLabel}
            items={[
              { label: site.breadcrumbHomeLabel, href: "/" },
              { label: detail.servicesLabel, href: detail.servicesHref },
              { label: service.title },
            ]}
          />

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-maroon text-honey shadow-[0_10px_24px_-12px_rgb(92_36_16/0.8)]">
                  <Icon name={service.icon} className="size-6" />
                </span>
                {service.tag && (
                  <span className="rounded-full bg-amber/20 px-3 py-1 text-xs font-bold text-copper">{service.tag}</span>
                )}
              </div>
              <h1 id="service-title" className="text-display mt-6 font-serif font-bold text-balance text-ink">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-[clamp(1rem,0.92rem+0.3vw,1.15rem)] leading-relaxed text-muted">{service.summary}</p>

              <ul className="mt-7 flex flex-wrap gap-3">
                {glance.slice(0, 2).map((row) => (
                  <li key={row.id} className="flex items-center gap-2 rounded-full border border-sand bg-white px-4 py-2 text-sm">
                    <Icon name={row.icon} className="size-4 text-copper" />
                    <span className="text-muted">{row.label}</span>
                    <span className="font-semibold text-ink">{row.value}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button cta={{ label: detail.bookLabel, href: bookHref }} arrow />
                <Button cta={{ label: detail.enquireLabel, href: enquireHref }} variant="ghostDark" />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div aria-hidden="true" className="absolute -inset-3 -rotate-3 rounded-[2.5rem] bg-amber-gradient opacity-30" />
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-card ring-4 ring-white lg:aspect-[4/5]">
                  <CmsImage image={service.image} sizes="(min-width: 1024px) 38vw, 100vw" preload />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-14 lg:col-span-8">
            {service.description?.length > 0 && (
              <div>
                <Eyebrow>{detail.aboutTitle}</Eyebrow>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
                  {service.description.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
              </div>
            )}
            <ListBlock title={detail.includesTitle} items={service.includes} icon="check" />
            <ListBlock title={detail.idealForTitle} items={service.idealFor} icon="sparkles" />
            <ListBlock title={detail.deliverablesTitle} items={service.deliverables} icon="scroll-text" />
          </div>

          <aside className="lg:col-span-4">
            <div className="bg-earth rounded-[2rem] p-7 text-ivory shadow-card sm:p-8 lg:sticky lg:top-28">
              <h2 className="font-serif text-xl font-bold">{detail.summaryTitle}</h2>
              <dl className="mt-6 divide-y divide-white/10">
                {glance.map((row) => (
                  <div key={row.id} className="flex items-center justify-between gap-4 py-3.5 text-sm">
                    <dt className="flex items-center gap-2.5 text-mist">
                      <Icon name={row.icon} className="size-4 text-amber" />
                      {row.label}
                    </dt>
                    <dd className="text-right font-semibold text-ivory">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 flex flex-col gap-3">
                <Button cta={{ label: detail.bookLabel, href: bookHref }} variant="amber" arrow className="w-full" />
                <Button cta={{ label: detail.enquireLabel, href: enquireHref }} variant="ghostLight" className="w-full" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Process
        content={{ ...process, eyebrow: detail.processEyebrow, title: detail.processTitle }}
        className="bg-cream [--section-bg:var(--color-cream)]"
      />

      {service.faqs?.length > 0 && (
        <Faqs content={{ title: detail.faqTitle, items: service.faqs, contactCta: { label: detail.bookLabel, href: bookHref } }} />
      )}

      {others.length > 0 && (
        <section aria-labelledby="other-services-title" className="section-y bg-cream">
          <div className="container-page">
            <SectionHeading id="other-services-title" eyebrow={detail.otherEyebrow} title={detail.otherTitle} />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((item) => (
                <ServiceCard key={item.id} service={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
