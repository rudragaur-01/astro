import CmsImage from "@/components/ui/CmsImage";
import CmsLink from "@/components/ui/CmsLink";
import Icon from "@/components/ui/Icon";

export function ServiceMeta({ service, dark = false }) {
  return (
    <p className={`flex items-center gap-3 text-sm ${dark ? "text-ivory/80" : "text-muted"}`}>
      {service.duration && (
        <span className="inline-flex items-center gap-1.5">
          <Icon name="clock" className="size-4" />
          {service.duration}
        </span>
      )}
      {service.duration && service.priceFormatted && <span aria-hidden="true">·</span>}
      {service.priceFormatted && (
        <span>
          {service.priceLabel}{" "}
          <span className={`font-semibold ${dark ? "text-honey" : "text-ink"}`}>{service.priceFormatted}</span>
        </span>
      )}
    </p>
  );
}

// The whole card links to the service's detail page.
export default function ServiceCard({ service }) {
  return (
    <article className="reveal group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-sand bg-ivory shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-amber/50 hover:shadow-glow">
      <div className="relative aspect-[16/9] overflow-hidden">
        <CmsImage image={service.image} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute bottom-4 left-4 flex size-11 items-center justify-center rounded-xl bg-ivory/95 text-copper shadow-sm">
          <Icon name={service.icon} className="size-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-bold text-ink transition-colors group-hover:text-copper">
          <CmsLink href={service.href} className="after:absolute after:inset-0 after:rounded-[1.75rem]">
            {service.title}
          </CmsLink>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.summary}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-sand pt-4">
          <ServiceMeta service={service} />
          <span
            aria-hidden="true"
            className="flex size-10 items-center justify-center rounded-full border border-ink/10 text-ink transition-all group-hover:border-maroon group-hover:bg-maroon group-hover:text-honey"
          >
            <Icon name="arrow-up-right" className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
