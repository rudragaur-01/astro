import Button from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import ZodiacWheel from "@/components/ui/ZodiacWheel";
import { getSiteSettings } from "@/lib/content";

export default async function NotFound() {
  const { notFound } = await getSiteSettings();

  return (
    <section className="bg-hero relative flex min-h-[80svh] items-center overflow-hidden pt-24 pb-16">
      <ZodiacWheel className="animate-spin-slow pointer-events-none absolute top-1/2 left-1/2 w-[40rem] -translate-x-1/2 -translate-y-1/2 text-copper/10" />
      <div className="container-page relative text-center">
        <Eyebrow>{notFound.eyebrow}</Eyebrow>
        <h1 className="text-heading mx-auto mt-5 max-w-2xl font-serif font-bold text-balance text-ink">{notFound.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">{notFound.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button cta={notFound.primaryCta} arrow />
          <Button cta={notFound.secondaryCta} variant="ghostDark" />
        </div>
      </div>
    </section>
  );
}
