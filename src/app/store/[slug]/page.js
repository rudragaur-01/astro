import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import { getProduct, getProductDetailContent, getProductSlugs, getRelatedProducts, getSiteSettings } from "@/lib/content";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [product, site] = await Promise.all([getProduct(slug), getSiteSettings()]);
  if (!product) return {};
  return {
    title: `${product.name} | ${site.brand.name}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.image?.src ? [product.image.src] : undefined,
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const [product, detail, site] = await Promise.all([getProduct(slug), getProductDetailContent(), getSiteSettings()]);
  if (!product) notFound();

  const related = await getRelatedProducts(slug, detail.relatedCount);

  return <ProductDetail product={product} related={related} detail={detail} site={site} />;
}
