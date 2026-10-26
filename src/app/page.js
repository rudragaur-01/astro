import About from "@/components/sections/About";
import Booking from "@/components/sections/Booking";
import Faqs from "@/components/sections/Faqs";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import Insights from "@/components/sections/Insights";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import {
  getAbout,
  getBooking,
  getConsultationProcess,
  getFaqs,
  getFinalCta,
  getHero,
  getInsights,
  getProducts,
  getServices,
  getSiteSettings,
  getTestimonials,
  getWhyChooseUs,
} from "@/lib/content";

export default async function HomePage() {
  const [site, hero, about, services, whyChooseUs, consultationProcess, products, testimonials, booking, insights, faqs, finalCta] =
    await Promise.all([
      getSiteSettings(),
      getHero(),
      getAbout(),
      getServices(),
      getWhyChooseUs(),
      getConsultationProcess(),
      getProducts(),
      getTestimonials(),
      getBooking(),
      getInsights(),
      getFaqs(),
      getFinalCta(),
    ]);

  const { locale, currency } = site;

  return (
    <>
      <Hero hero={hero} />
      <About about={about} />
      <Services services={services} locale={locale} currency={currency} />
      <WhyChooseUs content={whyChooseUs} />
      <Process content={consultationProcess} />
      <FeaturedProducts content={products} locale={locale} currency={currency} />
      <Testimonials content={testimonials} />
      <Booking content={booking} contact={site.contact} />
      <Insights content={insights} locale={locale} />
      <Faqs content={faqs} />
      <FinalCta content={finalCta} />
    </>
  );
}
