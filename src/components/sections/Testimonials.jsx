import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import StarField from "@/components/ui/StarField";

function Rating({ value, label }) {
  if (!value) return null;
  return (
    <div className="flex gap-1 text-amber" role="img" aria-label={label.replace("{rating}", value)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" className={`size-4 ${i < value ? "fill-current" : "opacity-30"}`} />
      ))}
    </div>
  );
}

export default function Testimonials({ content }) {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="section-y relative isolate overflow-hidden bg-cocoa text-ivory">
      <StarField count={50} seed={29} className="opacity-60" />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rust/40 blur-[140px]" />

      <div className="container-page relative">
        <SectionHeading id="testimonials-title" eyebrow={content.eyebrow} title={content.title} tone="dark" />

        <ul className="mt-16 grid gap-6 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <li
              key={item.id}
              className={`reveal relative flex flex-col rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 backdrop-blur-sm sm:p-10 ${
                i === 1 ? "lg:-translate-y-6" : ""
              }`}
            >
              <figure className="flex h-full flex-col">
                <Icon name="quote" className="size-10 text-amber/60" strokeWidth={1} />
                <blockquote className="mt-6 flex-1 font-serif text-base leading-relaxed text-ivory/90 italic sm:text-lg">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <span>
                    <span className="block font-semibold text-ivory">{item.name}</span>
                    <span className="mt-0.5 block text-xs text-mist">
                      {[item.location, item.service].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                  <Rating value={item.rating} label={content.ratingLabel} />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {content.disclaimer && (
          <p className="mx-auto mt-12 max-w-xl text-center text-xs text-mist/80">
            <span className="mr-2 inline-block rounded-full border border-amber/40 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-amber uppercase">
              {content.disclaimerBadge}
            </span>
            {content.disclaimer}
          </p>
        )}
      </div>
    </section>
  );
}
