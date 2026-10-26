import CmsImage from "@/components/ui/CmsImage";
import CmsLink from "@/components/ui/CmsLink";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import BookingForm from "./BookingForm";

export default function Booking({ content, contact }) {
  return (
    <section id="book" aria-labelledby="book-title" className="bg-paper section-y relative">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-sand bg-gradient-to-br from-cream via-ivory to-cream p-6 shadow-card sm:p-10 lg:p-14">
          <div aria-hidden="true" className="absolute -top-24 -left-24 size-72 rounded-full bg-amber/15 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="flex flex-col lg:col-span-5">
              <SectionHeading id="book-title" eyebrow={content.eyebrow} title={content.title} description={content.description} align="left" />

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {content.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 rounded-2xl border border-sand bg-ivory/80 px-4 py-3.5 text-sm font-medium text-ink">
                    <Icon name="check" className="size-4 shrink-0 text-copper" strokeWidth={2.5} />
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="relative mt-8 hidden min-h-48 flex-1 overflow-hidden rounded-3xl lg:block">
                <CmsImage image={content.image} sizes="35vw" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-espresso/85 to-espresso/10" />
                <div className="absolute inset-x-6 bottom-6 text-ivory">
                  <p className="font-serif text-xl font-bold">{content.contactPrompt}</p>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <CmsLink href={contact.phone.href} className="inline-flex items-center gap-2 hover:text-honey">
                      <Icon name="phone" className="size-4 text-amber" />
                      {contact.phone.label}
                    </CmsLink>
                    <CmsLink href={contact.whatsapp.href} className="inline-flex items-center gap-2 hover:text-honey">
                      <Icon name="message-circle" className="size-4 text-amber" />
                      {contact.whatsapp.label}
                    </CmsLink>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <BookingForm form={content.form} serviceOptions={content.serviceOptions} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
