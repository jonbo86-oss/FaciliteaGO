import { marketplaceProducts } from "@/lib/marketplace-products";
import { resolvedProductImage } from "@/lib/product-images";
import type { Lang } from "@/lib/i18n";
import ProductDetailClient from "@/components/ProductDetailClient";

export const dynamicParams = true;

export function generateStaticParams() {
  return marketplaceProducts.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams?: Promise<{ lang?: string }> }) {
  const { slug } = await params;
  const sp = searchParams ? await searchParams : {};
  const lang: Lang = sp?.lang === "ca" ? "ca" : "es";
  const baseProduct = marketplaceProducts.find((item) => item.slug === slug) ?? marketplaceProducts[0];
  const productImage = resolvedProductImage(baseProduct);

  return <ProductDetailClient product={baseProduct} productImage={productImage} lang={lang} />;
}
