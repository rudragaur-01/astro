"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const ALL = "all";

export default function ProductGrid({
  items,
  categories,
  allLabel,
  viewLabel,
  filterLabel,
  resultsLabel,
  compareAtLabel,
  maxItems = 8,
}) {
  const [active, setActive] = useState(ALL);

  const available = categories.filter((c) => items.some((p) => p.category === c.id));
  const filters = [{ id: ALL, label: allLabel }, ...available];
  const visible = active === ALL ? items.slice(0, maxItems) : items.filter((p) => p.category === active);

  return (
    <>
      <div role="group" aria-label={filterLabel} className="-mx-5 mt-12 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2">
          {filters.map((filter) => {
            const selected = filter.id === active;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(filter.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selected
                    ? "bg-maroon text-honey shadow-[0_8px_24px_-10px_rgb(92_36_16/0.7)]"
                    : "border border-ink/10 bg-ivory/60 text-ink hover:border-copper/60 hover:text-copper"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {resultsLabel.replace("{count}", visible.length)}
      </p>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} viewLabel={viewLabel} compareAtLabel={compareAtLabel} />
        ))}
      </div>
    </>
  );
}
