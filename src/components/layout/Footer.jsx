import CmsLink from "@/components/ui/CmsLink";
import Icon from "@/components/ui/Icon";
import SocialIcon from "@/components/ui/SocialIcon";
import StarField from "@/components/ui/StarField";
import BrandMark from "./BrandMark";
import NewsletterForm from "./NewsletterForm";

export default function Footer({ brand, footer, contact, social }) {
  const contactItems = [
    { id: "phone", icon: "phone", label: contact.phone.label, href: contact.phone.href },
    { id: "email", icon: "mail", label: contact.email.label, href: contact.email.href },
    { id: "address", icon: "map-pin", label: contact.address },
    { id: "hours", icon: "clock", label: contact.hours },
  ];

  return (
    <footer className="relative overflow-hidden bg-cocoa text-mist">
      <StarField count={50} seed={23} className="opacity-50" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/50 to-transparent" />

      <div className="container-page relative pt-20 pb-10">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <BrandMark brand={brand} tone="dark" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed">{footer.blurb}</p>
            <ul className="mt-6 flex gap-3">
              {social.map((item) => (
                <li key={item.id}>
                  <CmsLink
                    href={item.href}
                    aria-label={item.label}
                    className="flex size-10 items-center justify-center rounded-full border border-white/15 text-ivory/80 transition-all hover:border-amber hover:bg-amber hover:text-espresso"
                  >
                    <SocialIcon platform={item.platform} />
                  </CmsLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-serif text-xl font-bold text-ivory">{footer.newsletter.title}</h2>
            <p className="mt-2 text-sm">{footer.newsletter.description}</p>
            <div className="mt-5 max-w-lg">
              <NewsletterForm {...footer.newsletter} />
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          {footer.columns.map((column) => (
            <nav key={column.id} aria-label={column.title} className="lg:col-span-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-amber">{column.title}</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <CmsLink href={link.href} className="transition-colors hover:text-honey">
                      {link.label}
                    </CmsLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="sm:col-span-2 lg:col-span-5 lg:col-start-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-amber">{footer.contactTitle}</h2>
            <ul className="mt-5 space-y-4 text-sm">
              {contactItems.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <Icon name={item.icon} className="mt-0.5 size-4 shrink-0 text-amber" />
                  {item.href ? (
                    <CmsLink href={item.href} className="transition-colors hover:text-honey">
                      {item.label}
                    </CmsLink>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 text-xs lg:flex-row lg:items-center lg:justify-between">
          <p>{footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.legal.map((link) => (
              <li key={link.label}>
                <CmsLink href={link.href} className="transition-colors hover:text-honey">
                  {link.label}
                </CmsLink>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-xs text-mist/60">{footer.disclaimer}</p>
      </div>
    </footer>
  );
}
