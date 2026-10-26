import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { toProductCards } from "@/lib/format";
import ProductGrid from "./ProductGrid";

export default function FeaturedProducts({ content, locale, currency }) {
  const items = toProductCards(content.items, content.categories, { locale, currency });

  return (
    <section id="store" aria-labelledby="store-title" className="section-y relative bg-cream">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="store-title" eyebrow={content.eyebrow} title={content.title} description={content.description} align="left" />
          <Button cta={content.collectionCta} variant="brand" arrow className="self-start lg:self-auto" />
        </div>

        <ProductGrid
          items={items}
          categories={content.categories}
          allLabel={content.allCategoriesLabel}
          viewLabel={content.viewProductLabel}
          filterLabel={content.filterLabel}
          resultsLabel={content.resultsLabel}
          compareAtLabel={content.compareAtLabel}
          maxItems={content.maxItems}
        />

        <ul className="mt-14 grid gap-4 rounded-3xl border border-sand bg-ivory/70 p-6 sm:grid-cols-3 sm:p-4">
          {content.assurances.map((item) => (
            <li key={item.id} className="flex items-center justify-center gap-3 text-sm font-medium text-ink sm:py-2">
              <span className="flex size-9 items-center justify-center rounded-full bg-maroon text-honey">
                <Icon name={item.icon} className="size-4" />
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
