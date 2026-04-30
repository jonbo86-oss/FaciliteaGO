import { getMerchantBySlug, getMerchants } from "@/lib/merchants";
import MerchantDetailClient from "@/components/MerchantDetailClient";

export const dynamicParams = true;

export function generateStaticParams() {
  return getMerchants().map((merchant) => ({ slug: merchant.slug }));
}

export default async function MerchantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const merchant = getMerchantBySlug(slug) ?? getMerchants()[0];
  return <MerchantDetailClient merchant={merchant} />;
}
