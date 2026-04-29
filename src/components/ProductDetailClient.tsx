"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, MapPin, Minus, Plus, ShieldCheck, ShoppingCart, Star, Store, Truck, X } from "lucide-react";
import { money, type MarketplaceProduct } from "@/lib/marketplace-products";
import { dict, productText, type Lang } from "@/lib/i18n";
import { getStoreLocation } from "@/lib/store-locations";

type CartLine = MarketplaceProduct & { quantity: number };

type Props = {
  product: MarketplaceProduct;
  productImage: string;
  lang: Lang;
};

function localized(product: MarketplaceProduct, lang: Lang) {
  const tr = productText(product.slug, lang);
  return {
    ...product,
    name: tr?.name ?? product.name,
    description: tr?.description ?? product.description,
    details: tr?.details ?? product.details,
    category: tr?.category ?? product.category
  };
}

function readCart() {
  try {
    return JSON.parse(window.localStorage.getItem("faciliteago-cart") || "[]") as CartLine[];
  } catch {
    return [];
  }
}

export default function ProductDetailClient({ product: baseProduct, productImage, lang }: Props) {
  const t = dict[lang];
  const product = localized(baseProduct, lang);
  const storeLocation = useMemo(() => getStoreLocation(baseProduct), [baseProduct]);
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(`${storeLocation.lat},${storeLocation.lng}`)}&z=16&output=embed`;
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => setCart(readCart()), []);
  useEffect(() => {
    window.localStorage.setItem("faciliteago-cart", JSON.stringify(cart));
  }, [cart]);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart() {
    setCart((current) => {
      const found = current.find((item) => item.id === baseProduct.id);
      if (found) return current.map((item) => item.id === baseProduct.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...baseProduct, quantity: 1 }];
    });
    setAdded(true);
    setCartOpen(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) => current.flatMap((item) => {
      if (item.id !== id) return [item];
      const next = item.quantity + delta;
      return next <= 0 ? [] : [{ ...item, quantity: next }];
    }));
  }

  return (
    <main className="min-h-screen bg-[#f4f8ff] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0072CE] font-black text-white">GO</div>
            <div><p className="font-black text-[#002B5C]">faciliteaGO</p><p className="text-xs font-bold text-slate-500">{t.backMarketplace}</p></div>
          </a>
          <div className="flex items-center gap-2">
            <a href={`/producto/${baseProduct.slug}?lang=es`} className={`rounded-full bg-blue-50 px-3 py-2 text-base ${lang === "es" ? "grayscale opacity-40" : "opacity-100"}`}>🇪🇸</a>
            <a href={`/producto/${baseProduct.slug}?lang=ca`} className={`rounded-full bg-blue-50 px-3 py-2 text-xs font-black text-[#a32626] ${lang === "ca" ? "grayscale opacity-40" : "opacity-100"}`}>CAT</a>
            <a href="/usuario" className="hidden rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-[#002B5C] md:inline-flex">{t.orders}</a>
            <button onClick={() => setCartOpen(true)} className="relative inline-flex items-center gap-2 rounded-full bg-[#0072CE] px-4 py-2 text-sm font-black text-white">
              <ShoppingCart className="h-4 w-4" /> Carrito
              {itemCount > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-[#FFCC00] px-2 py-0.5 text-xs text-[#002B5C]">{itemCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1fr_0.9fr]">
        <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl"><img src={productImage} alt={product.name} className="h-[430px] w-full object-cover" /></div>
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
          <button onClick={addToCart} className="mt-7 w-full rounded-2xl bg-[#0072CE] px-6 py-4 text-lg font-black text-white shadow-xl transition hover:bg-[#005fb0]">{added ? "Añadido al carrito" : t.addToCart}</button>
          <button onClick={addToCart} className="mt-3 w-full rounded-2xl bg-[#FFCC00] px-6 py-4 text-lg font-black text-[#002B5C] transition hover:bg-yellow-300">{t.buyWithCoupon}</button>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="grid gap-6 md:grid-cols-[1fr_360px]">
          <article className="rounded-[28px] bg-white p-6 shadow-xl"><h2 className="text-2xl font-black text-[#002B5C]">{t.productDescription}</h2><ul className="mt-5 grid gap-3 md:grid-cols-2">{product.details.map((detail) => <li key={detail} className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-slate-700">{detail}</li>)}</ul></article>
          <article className="rounded-[28px] bg-[#002B5C] p-6 text-white shadow-xl"><ShieldCheck className="h-8 w-8 text-[#FFCC00]" /><h2 className="mt-4 text-2xl font-black">{t.protectedBuy}</h2><p className="mt-3 text-sm font-semibold leading-6 text-blue-100">{t.protectedBuyText}</p><div className="mt-5 flex items-center gap-2 text-sm font-black"><Truck className="h-5 w-5" /> {t.priorityPickup}</div></article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <article className="overflow-hidden rounded-[32px] bg-white shadow-2xl">
          <div className="grid md:grid-cols-[0.9fr_1.1fr]">
            <div className="p-6 md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#0072CE]">Dónde recogerlo</p>
              <h2 className="mt-2 text-3xl font-black text-[#002B5C]">{product.store}</h2>
              <p className="mt-4 flex items-start gap-3 text-lg font-bold leading-7 text-slate-700"><MapPin className="mt-1 h-5 w-5 shrink-0 text-[#0072CE]" /> {storeLocation.address}</p>
              <div className="mt-5 grid gap-3 rounded-3xl bg-blue-50 p-4 text-sm font-bold text-slate-600">
                <p>Zona: {product.district}, Barcelona</p>
                <p>Distancia estimada desde Las Ramblas: {product.distance.toFixed(2)} km</p>
                <p>Preparación estimada: {product.pickup}</p>
              </div>
              <a href={`https://www.google.com/maps/search/?api=1&query=${storeLocation.lat},${storeLocation.lng}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-2xl bg-[#0072CE] px-5 py-3 text-sm font-black text-white">Abrir en Google Maps</a>
            </div>
            <div className="h-[360px] bg-blue-50 md:h-full"><iframe title={`Mapa ${product.store}`} src={mapSrc} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          </div>
        </article>
      </section>

      {cartOpen && <div className="fixed inset-0 z-[80] flex justify-end bg-slate-950/40"><aside className="h-full w-full max-w-md overflow-auto bg-white p-5 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-2xl font-black text-[#002B5C]">Carrito</h2><button onClick={() => setCartOpen(false)}><X /></button></div><div className="mt-5 space-y-3">{cart.length === 0 ? <div className="rounded-3xl border border-dashed border-blue-200 bg-blue-50 p-5 text-sm font-bold text-slate-500">El carrito está vacío.</div> : cart.map((item) => <div key={item.id} className="rounded-2xl border border-blue-100 p-3"><p className="font-black text-slate-900">{localized(item, lang).name}</p><p className="text-xs font-bold text-slate-500">{item.store}</p><div className="mt-3 flex items-center justify-between"><span className="font-black text-[#0072CE]">{money(item.price * item.quantity)}</span><div className="flex items-center gap-2"><button onClick={() => changeQuantity(item.id, -1)} className="rounded-full bg-slate-100 p-1"><Minus className="h-4 w-4" /></button><span className="text-sm font-black">{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} className="rounded-full bg-slate-100 p-1"><Plus className="h-4 w-4" /></button></div></div></div>)}</div><div className="mt-5 flex justify-between border-t border-blue-100 pt-4 text-xl font-black text-[#002B5C]"><span>Total</span><span>{money(subtotal)}</span></div><a href="/usuario" className="mt-5 block w-full rounded-2xl bg-[#0072CE] px-5 py-3 text-center font-black text-white shadow-lg">Ver mis pedidos</a></aside></div>}
    </main>
  );
}
