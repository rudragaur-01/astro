import { ChevronRight } from "lucide-react";
import CmsLink from "./CmsLink";

export default function Breadcrumbs({ items, label }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {last || !item.href ? (
                <span aria-current={last ? "page" : undefined} className={last ? "font-semibold text-ink" : undefined}>
                  {item.label}
                </span>
              ) : (
                <CmsLink href={item.href} className="transition-colors hover:text-copper">
                  {item.label}
                </CmsLink>
              )}
              {!last && <ChevronRight aria-hidden="true" className="size-3.5 text-copper/60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
