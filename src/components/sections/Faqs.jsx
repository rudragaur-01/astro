import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import ZodiacWheel from "@/components/ui/ZodiacWheel";

// Native <details> keeps the accordion keyboard-accessible without client JS.
export default function Faqs({ content, className = "bg-ivory" }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className={`section-y relative overflow-hidden ${className}`}>
      <ZodiacWheel className="pointer-events-none absolute -bottom-40 -left-40 hidden w-[34rem] text-amber/15 lg:block" />

      <div className="container-page relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="faq-title" eyebrow={content.eyebrow} title={content.title} description={content.description} align="left" />
            <Button cta={content.contactCta} variant="brand" arrow className="mt-8" />
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="divide-y divide-sand border-y border-sand">
            {content.items.map((faq, i) => (
              <li key={faq.id}>
                <details className="group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left">
                    <span className="flex gap-5">
                      <span aria-hidden="true" className="pt-1 font-serif text-sm text-copper">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-serif text-base leading-snug font-bold text-ink transition-colors group-hover:text-copper sm:text-lg">
                        {faq.question}
                      </span>
                    </span>
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink transition-all duration-300 group-open:rotate-45 group-open:border-maroon group-open:bg-maroon group-open:text-honey">
                      <Icon name="plus" className="size-4" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pr-14 pb-7 pl-10 leading-relaxed text-muted">{faq.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
