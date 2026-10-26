import CmsImage from "@/components/ui/CmsImage";
import CmsLink from "@/components/ui/CmsLink";
import Icon from "@/components/ui/Icon";

// Expects display-ready fields from `toProductCards` (categoryLabel, priceFormatted…).
export default function ProductCard({ product, viewLabel, compareAtLabel }) {
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-2xl sm:rounded-[1.75rem] bg-white shadow-card ring-1 ring-sand transition-all duration-500 group-hover:shadow-glow">
        <CmsImage
          image={product.image}
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className="transition-transform duration-700 group-hover:scale-[1.06]"
          fallbackLabel={product.name}
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-espresso/85 px-2.5 py-1 text-[10px] sm:top-4 sm:left-4 sm:px-3 sm:text-[11px] font-semibold tracking-wide text-honey backdrop-blur">
            {product.badge}
          </span>
        )}
        <span
          aria-hidden="true"
          className="absolute right-4 bottom-4 hidden translate-y-3 items-center gap-1.5 rounded-full bg-ivory/95 px-4 py-2 text-xs font-semibold text-ink opacity-0 shadow-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:flex"
        >
          {viewLabel}
          <Icon name="arrow-up-right" className="size-3.5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-5">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-copper uppercase sm:text-[11px]">{product.categoryLabel}</p>
        <h3 className="mt-1.5 font-serif text-[15px] leading-snug font-bold text-ink sm:text-lg">
          <CmsLink href={product.href} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none sm:after:rounded-[1.75rem]">
            {product.name}
          </CmsLink>
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-muted sm:text-sm">{product.description}</p>
        <p className="mt-3 flex items-baseline gap-2">
          {product.priceFormatted && <span className="text-base font-semibold text-ink sm:text-lg">{product.priceFormatted}</span>}
          {product.compareAtFormatted && (
            <s className="text-xs text-muted/80 sm:text-sm">
              <span className="sr-only">{compareAtLabel} </span>
              {product.compareAtFormatted}
            </s>
          )}
        </p>
      </div>
    </article>
  );
}
