import { Clock, MapPin, ShieldCheck, Star, Store, Truck } from "lucide-react";
import { marketplaceProducts, money } from "@/lib/marketplace-products";
import { dict, productText, type Lang } from "@/lib/i18n";

export const dynamicParams = true;

export function generateStaticParams() {
  return marketplaceProducts.map((product) => ({ slug: product.slug }));
}

function localized(product: typeof marketplaceProducts[number], lang: Lang) {
  const tr = productText(product.slug, lang);
  return { ...product, name: tr?.name ?? product.name, description: tr?.description ?? product.description, details: tr?.details ?? product.details, category: tr?.category ?? product.category };
}

export default async function ProductPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams?: Promise<{ lang?: string }> }) {
  const { slug } = await params;
  const sp = searchParams ? await searchParams : {};
  const lang: Lang = sp?.lang === "ca" ? "ca" : "es";
  const t = dict[lang];
  const baseProduct = marketplaceProducts.find((item) => item.slug === slug) ?? marketplaceProducts[0];
  const product = localized(baseProduct, lang);

  return (
    <main className="min-h-screen bg-[#f4f8ff] text-slate-950">
      <header className="border-b border-blue-100 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0072CE] font-black text-white">GO</div><div><p className="font-black text-[#002B5C]">faciliteaGO</p><p className="text-xs font-bold text-slate-500">{t.backMarketplace}</p></div></a>
          <div className="flex items-center gap-2"><a href={`/producto/${baseProduct.slug}?lang=es`} className={`rounded-full bg-blue-50 px-3 py-2 text-base ${lang === "es" ? "grayscale opacity-40" : "opacity-100"}`}>🇪🇸</a><a href={`/producto/${baseProduct.slug}?lang=ca`} className={`rounded-full bg-blue-50 px-3 py-2 text-xs font-black text-[#a32626] ${lang === "ca" ? "grayscale opacity-40" : "opacity-100"}`}>CAT</a><a href="/usuario" className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-[#002B5C]">{t.orders}</a></div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1fr_0.9fr]">
        <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl"><img src={product.imageUrl} alt={product.name} className="h-[430px] w-full object-cover" /></div>
        <article className="rounded-[32px] bg-white p-6 shadow-2xl md:p-8">
          <div className="mb-4 flex flex-wrap gap-2"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-[#002B5C]">{product.category}</span>{product.oldPrice && <span className="rounded-full bg-[#FFCC00] px-3 py-1 text-xs font-black text-[#002B5C]">{t.offer}</span>}</div>
          <h1 className="text-4xl font-black leading-tight text-[#002B5C]">{product.name}</h1>
          <p className="mt-4 text-lg font-semibold leading-8 text-slate-600">{product.description}</p>
          <div className="mt-6 flex items-end gap-3">{product.oldPrice && <span className="text-lg font-bold text-slate-400 line-through">{money(product.oldPrice)}</span>}<span className="text-5xl font-black text-[#0072CE]">{money(product.price)}</span></div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-blue-50 p-4"><Store className="mb-2 h-5 w-5 text-[#0072CE]" /><p className="font-black text-[#002B5C]">{product.store}</p><p className="text-sm font-semibold text-slate-500">{product.district}</p></div>
            <div className="rounded-2xl bg-blue-50 p-4"><MapPin className="mb-2 h-5 w-5 text-[#0072CE]" /><p className="font-black text-[#002B5C]">{product.distance.toFixed(2)} km</p><p className="text-sm font-semibold text-slate-500">{t.fromRamblas}</p></div>
            <div className="rounded-2xl bg-blue-50 p-4"><Clock className="mb-2 h-5 w-5 text-[#0072CE]" /><p className="font-black text-[#002B5C]">{t.readyIn} {product.pickup}</p><p className="text-sm font-semibold text-slate-500">{t.stock} {product.stock}</p></div>
            <div className="rounded-2xl bg-blue-50 p-4"><Star className="mb-2 h-5 w-5 fill-yellow-400 text-yellow-400" /><p className="font-black text-[#002B5C]">{product.rating}/5</p><p className="text-sm font-semibold text-slate-500">{t.storeRating}</p></div>
          </div>
          <button className="mt-7 w-full rounded-2xl bg-[#0072CE] px-6 py-4 text-lg font-black text-white shadow-xl">{t.addToCart}</button>
          <button className="mt-3 w-full rounded-2xl bg-[#FFCC00] px-6 py-4 text-lg font-black text-[#002B5C]">{t.buyWithCoupon}</button>
        </article>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-12"><div className="grid gap-6 md:grid-cols-[1fr_360px]"><article className="rounded-[28px] bg-white p-6 shadow-xl"><h2 className="text-2xl font-black text-[#002B5C]">{t.productDescription}</h2><ul className="mt-5 grid gap-3 md:grid-cols-2">{product.details.map((detail) => <li key={detail} className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-slate-700">{detail}</li>)}</ul></article><article className="rounded-[28px] bg-[#002B5C] p-6 text-white shadow-xl"><ShieldCheck className="h-8 w-8 text-[#FFCC00]" /><h2 className="mt-4 text-2xl font-black">{t.protectedBuy}</h2><p className="mt-3 text-sm font-semibold leading-6 text-blue-100">{t.protectedBuyText}</p><div className="mt-5 flex items-center gap-2 text-sm font-black"><Truck className="h-5 w-5" /> {t.priorityPickup}</div></article></div></section>
    </main>
  );
}
