import Button from "@/components/ui/Button";
import CmsImage from "@/components/ui/CmsImage";
import { Eyebrow } from "@/components/ui/SectionHeading";
import ZodiacWheel from "@/components/ui/ZodiacWheel";

export default function FinalCta({ content }) {
  return (
    <section aria-labelledby="cta-title" className="bg-ivory pb-20 lg:pb-28">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] px-6 py-20 text-center text-ivory sm:px-12 lg:py-28">
          <CmsImage image={content.image} sizes="(min-width: 1280px) 1200px, 100vw" className="-z-20" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-cocoa/95 via-maroon/90 to-rust/85" />
          <ZodiacWheel className="animate-spin-slow pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[46rem] -translate-x-1/2 -translate-y-1/2 text-amber/20" />

          <Eyebrow tone="dark">{content.eyebrow}</Eyebrow>
          <h2 id="cta-title" className="mx-auto mt-5 max-w-3xl font-serif text-heading font-bold text-balance">
            {content.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-mist sm:text-lg">{content.description}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button cta={content.primaryCta} variant="amber" arrow />
            <Button cta={content.secondaryCta} variant="ghostLight" />
          </div>
        </div>
      </div>
    </section>
  );
}
