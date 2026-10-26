import { notFound } from "next/navigation";
import ServiceDetail from "@/components/service/ServiceDetail";
import {
  getConsultationProcess,
  getOtherServices,
  getService,
  getServiceDetailContent,
  getServices,
  getServiceSlugs,
  getSiteSettings,
} from "@/lib/content";

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [service, site] = await Promise.all([getService(slug), getSiteSettings()]);
  if (!service) return {};
  return {
    title: `${service.title} | ${site.brand.name}`,
    description: service.summary,
    openGraph: {
      title: service.title,
      description: service.summary,
      images: service.image?.src ? [service.image.src] : undefined,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const [service, otherServices, detail, consultationProcess, servicesSection, site] = await Promise.all([
    getService(slug),
    getOtherServices(slug),
    getServiceDetailContent(),
    getConsultationProcess(),
    getServices(),
    getSiteSettings(),
  ]);
  if (!service) notFound();

  return (
    <ServiceDetail
      service={service}
      otherServices={otherServices}
      detail={detail}
      process={consultationProcess}
      servicesSection={servicesSection}
      site={site}
    />
  );
}
