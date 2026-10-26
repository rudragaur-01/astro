import CmsImage from "@/components/ui/CmsImage";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import StarField from "@/components/ui/StarField";

export default function WhyChooseUs({ content }) {
  return (
    <section id="why-us" aria-labelledby="why-title" className="bg-earth section-y relative isolate overflow-hidden text-ivory">
      <StarField count={60} seed={17} className="opacity-70" />

      <div className="container-page relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading id="why-title" eyebrow={content.eyebrow} title={content.title} description={content.description} align="left" tone="dark" />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {content.pillars.map((pillar, i) => (
              <li
                key={pillar.id}
                className="reveal group relative rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:border-amber/40 hover:bg-white/[0.06]"
              >
                <span aria-hidden="true" className="absolute top-6 right-7 font-serif text-sm text-amber/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber/30 to-amber/5 text-honey ring-1 ring-amber/30 transition-transform duration-500 group-hover:scale-110">
                  <Icon name={pillar.icon} className="size-6" />
                </span>
                <h3 className="mt-6 font-serif text-xl font-bold">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{pillar.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal relative min-h-[30rem] overflow-hidden rounded-[2.5rem] border border-white/10 lg:col-span-5">
          <CmsImage image={content.image} sizes="(min-width: 1024px) 40vw, 100vw" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent" />

          <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/10 bg-espresso/70 p-7 backdrop-blur-xl sm:inset-x-6 sm:bottom-6">
            <h3 className="text-xs font-semibold tracking-[0.24em] text-amber uppercase">{content.credentialsTitle}</h3>
            <ul className="mt-5 space-y-3.5">
              {content.credentials.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ivory/90">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-amber text-espresso">
                    <Icon name="check" className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
