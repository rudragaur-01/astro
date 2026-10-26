import Button from "@/components/ui/Button";
import CmsImage from "@/components/ui/CmsImage";
import CmsLink from "@/components/ui/CmsLink";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/format";

export default function Insights({ content, locale }) {
  return (
    <section id="insights" aria-labelledby="insights-title" className="section-y bg-cream">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="insights-title" eyebrow={content.eyebrow} title={content.title} description={content.description} align="left" />
          <Button cta={content.viewAllCta} variant="ghostDark" arrow className="self-start lg:self-auto" />
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((post) => (
            <li key={post.id} className="reveal">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-ivory ring-1 ring-sand transition-all duration-500 hover:-translate-y-1 hover:shadow-card">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <CmsImage image={post.image} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                  {post.category && (
                    <span className="absolute top-4 left-4 rounded-full bg-ivory/95 px-3 py-1 text-[11px] font-semibold tracking-wide text-copper">
                      {post.category}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs text-muted">
                    {post.date && <time dateTime={post.date}>{formatDate(post.date, locale)}</time>}
                    {post.date && post.readingTime && <span aria-hidden="true"> · </span>}
                    {post.readingTime}
                  </p>
                  <h3 className="mt-3 font-serif text-lg leading-snug font-bold text-ink transition-colors group-hover:text-copper">
                    <CmsLink href={post.href} className="after:absolute after:inset-0">
                      {post.title}
                    </CmsLink>
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  <span aria-hidden="true" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                    {content.readMoreLabel}
                    <Icon name="arrow-right" className="size-4 text-copper transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
