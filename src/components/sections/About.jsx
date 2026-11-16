import CmsImage from "@/components/ui/CmsImage";
import CmsLink from "@/components/ui/CmsLink";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About({ about }) {
  const mainImage = about.portrait ?? about.image;

  return (
    <section id="about" aria-labelledby="about-title" className="bg-paper section-y relative overflow-hidden">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="reveal relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-[4/5] w-[85%] overflow-hidden rounded-[2.5rem] shadow-card">
            <CmsImage image={mainImage} sizes="(min-width: 1024px) 40vw, 85vw" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-espresso/30 to-transparent" />
          </div>

          <div className="absolute right-0 bottom-[-6%] aspect-square w-[46%] overflow-hidden rounded-[2rem] border-8 border-ivory shadow-card">
            <CmsImage image={about.secondaryImage} sizes="(min-width: 1024px) 22vw, 45vw" />
          </div>
        </div>

        <div>
          <SectionHeading
            id="about-title"
            eyebrow={about.eyebrow}
            title={about.title}
            align="left"
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {about.achievements.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 rounded-2xl border border-sand bg-white/70 p-4 transition-colors hover:border-amber/60"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-maroon text-honey">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <span>
                  <span className="block font-serif text-base leading-tight font-bold text-ink">{item.title}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted">{item.description}</span>
                </span>
              </li>
            ))}
          </ul>

          <ul aria-label={about.expertiseLabel} className="mt-8 flex flex-wrap gap-2">
            {about.expertise.map((skill) => (
              <li key={skill} className="rounded-full border border-amber/40 px-4 py-1.5 text-xs font-medium text-copper">
                {skill}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-sand pt-8">
            <p className="font-serif text-2xl text-maroon italic">{about.signature}</p>
            <CmsLink
              href={about.cta.href}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-copper"
            >
              {about.cta.label}
              <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
            </CmsLink>
          </div>
        </div>
      </div>
    </section>
  );
}
