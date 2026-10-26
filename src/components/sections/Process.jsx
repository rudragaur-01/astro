import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Process({ content, className = "bg-ivory" }) {
  return (
    <section id="process" aria-labelledby="process-title" className={`section-y relative overflow-hidden ${className}`}>
      <div className="container-page">
        <SectionHeading id="process-title" eyebrow={content.eyebrow} title={content.title} description={content.description} />

        <ol className="relative mt-20 grid gap-12 lg:grid-cols-5 lg:gap-6">
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[2.25rem] w-px bg-gradient-to-b from-amber/0 via-amber/60 to-amber/0 lg:top-[2.25rem] lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-px lg:w-auto lg:bg-gradient-to-r"
          />
          {content.steps.map((step, i) => (
            <li key={step.id} className="reveal group relative flex gap-6 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
              <div className="relative shrink-0">
                <span className="relative z-10 flex size-18 items-center justify-center rounded-full border border-amber/50 bg-ivory text-copper shadow-[0_0_0_8px_var(--section-bg,var(--color-ivory))] transition-all duration-500 group-hover:border-maroon group-hover:bg-maroon group-hover:text-honey">
                  <Icon name={step.icon} className="size-7" strokeWidth={1.25} />
                </span>
                <span className="absolute -top-1 -right-1 z-20 flex size-7 items-center justify-center rounded-full bg-amber font-serif text-xs font-bold text-espresso">
                  {i + 1}
                </span>
              </div>
              <div className="pt-2 lg:mt-7 lg:pt-0">
                <p className="text-[11px] font-semibold tracking-[0.24em] text-copper uppercase">
                  {content.stepLabel} {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-serif text-lg font-bold text-ink">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-muted lg:max-w-[13rem]">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        {content.tagline && (
          <p className="mt-14 text-center text-sm font-bold tracking-[0.2em] text-maroon uppercase">{content.tagline}</p>
        )}
      </div>
    </section>
  );
}
