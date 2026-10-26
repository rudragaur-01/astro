import Button from "@/components/ui/Button";
import CmsImage from "@/components/ui/CmsImage";
import Icon from "@/components/ui/Icon";
import ZodiacWheel from "@/components/ui/ZodiacWheel";

// Sized from the viewport height so the whole hero fits on one screen.
export default function Hero({ hero }) {
  const visual = hero.portrait ?? hero.image;
  const [chipTop, chipBottom] = hero.highlights;

  return (
    <section id="top" aria-labelledby="hero-title" className="bg-hero relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-paper absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(90deg,black,transparent_60%)]" />

      <div className="container-page grid min-h-[min(100svh,62rem)] items-center gap-10 pt-24 pb-12 sm:pt-28 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-6">
        <div className="lg:col-span-7 xl:col-span-6">
          <p className="animate-rise inline-flex rounded-md bg-maroon px-3.5 py-2 text-[11px] font-bold tracking-[0.18em] text-ivory uppercase shadow-[0_8px_20px_-10px_rgb(92_36_16/0.8)] sm:text-xs">
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="text-display animate-rise mt-[clamp(1rem,3svh,1.75rem)] font-serif font-bold tracking-tight text-balance text-ink"
            style={{ animationDelay: "80ms" }}
          >
            {hero.title} <span className="text-accent-gradient">{hero.titleAccent}</span>
          </h1>

          <div aria-hidden="true" className="mt-[clamp(0.9rem,2.4svh,1.5rem)] flex items-center gap-3 text-amber">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber sm:w-24" />
            <Icon name="sparkles" className="size-4" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber sm:w-24" />
          </div>

          <p
            className="animate-rise mt-[clamp(0.9rem,2.4svh,1.5rem)] max-w-xl text-[clamp(1rem,0.92rem+0.3vw,1.15rem)] leading-relaxed text-muted text-pretty"
            style={{ animationDelay: "160ms" }}
          >
            {hero.description}
          </p>

          <div className="animate-rise mt-[clamp(1.25rem,3.6svh,2.25rem)] flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
            <Button cta={hero.primaryCta} arrow />
            <Button cta={hero.secondaryCta} variant="ghostDark" />
          </div>

          <dl
            className="animate-rise mt-[clamp(1.5rem,4.5svh,2.75rem)] grid max-w-xl grid-cols-2 gap-y-4 border-t border-sand sm:grid-cols-4 sm:divide-x sm:divide-sand pt-[clamp(0.9rem,2.4svh,1.5rem)]"
            style={{ animationDelay: "320ms" }}
          >
            {hero.stats.map((stat) => (
              <div key={stat.id} className="flex flex-col-reverse gap-1 sm:px-4 sm:text-center sm:first:pl-0 sm:first:text-left sm:last:pr-0">
                <dt className="text-[10px] leading-tight font-semibold tracking-[0.08em] text-muted uppercase sm:text-[11px]">
                  {stat.label}
                </dt>
                <dd className="font-serif text-[clamp(1.25rem,0.9rem+1.2vw,2rem)] font-bold text-copper">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto lg:col-span-5 xl:col-span-6">
          <div aria-hidden="true" className="absolute top-1/2 left-1/2 w-[150%] -translate-x-1/2 -translate-y-1/2">
            <ZodiacWheel className="animate-spin-slow w-full text-copper/20" />
          </div>
          <div aria-hidden="true" className="absolute top-1/2 left-1/2 aspect-square w-[122%] -translate-x-1/2 -translate-y-1/2">
            <div className="animate-spin-slower absolute inset-0 rounded-full border border-dashed border-amber/50">
              <span className="absolute top-0 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber shadow-[0_0_16px_4px_rgb(238_161_58/0.55)]" />
              <span className="absolute bottom-[14%] left-[6%] size-2 rounded-full bg-copper" />
            </div>
          </div>

          <figure className="relative aspect-[4/5] w-[min(76vw,22rem)] lg:h-[min(64svh,40rem)] lg:w-auto">
            <div className="h-full rounded-t-full rounded-b-[2rem] border border-copper/25 bg-white p-2 shadow-[0_40px_90px_-30px_rgb(107_42_18/0.45)]">
              <div className="relative h-full overflow-hidden rounded-t-full rounded-b-[1.6rem]">
                <CmsImage
                  image={visual}
                  sizes="(min-width: 1024px) 30vw, 76vw"
                  preload
                  className={hero.portrait ? "" : "scale-[1.35]"}
                />
              </div>
            </div>

            <figcaption className="absolute -bottom-5 left-1/2 w-[86%] -translate-x-1/2 rounded-2xl bg-gradient-to-r from-cocoa to-rust px-5 py-3.5 text-center shadow-[0_18px_40px_-16px_rgb(74_28_11/0.8)]">
              <span className="block font-serif text-lg font-bold text-ivory">{hero.imageCaption.title}</span>
              <span className="mt-0.5 block text-[11px] font-medium tracking-[0.12em] text-honey uppercase">
                {hero.imageCaption.subtitle}
              </span>
            </figcaption>

            {chipTop && (
              <span className="animate-float absolute top-[18%] -left-[22%] hidden items-center gap-2.5 rounded-full bg-white py-2 pr-4 pl-2 text-sm font-semibold text-ink shadow-card ring-1 ring-sand lg:flex">
                <span className="flex size-8 items-center justify-center rounded-full bg-maroon text-honey">
                  <Icon name={chipTop.icon} className="size-4" />
                </span>
                {chipTop.label}
              </span>
            )}
            {chipBottom && (
              <span
                className="animate-float absolute bottom-[24%] -right-[18%] hidden items-center gap-2.5 rounded-full bg-white py-2 pr-4 pl-2 text-sm font-semibold text-ink shadow-card ring-1 ring-sand lg:flex"
                style={{ animationDelay: "1.5s" }}
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-amber-gradient text-cocoa">
                  <Icon name={chipBottom.icon} className="size-4" />
                </span>
                {chipBottom.label}
              </span>
            )}
          </figure>
        </div>
      </div>
    </section>
  );
}
