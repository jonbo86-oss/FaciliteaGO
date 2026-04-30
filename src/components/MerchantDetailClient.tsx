"use client";

import { useEffect, useState } from "react";
import { MapPin, Minus, Plus, ShoppingCart, Star, X } from "lucide-react";
import { money, type MarketplaceProduct } from "@/lib/marketplace-products";
import { resolvedProductImage } from "@/lib/product-images";
import type { Merchant } from "@/lib/merchants";

type CartLine = MarketplaceProduct & { quantity: number };

function readCart() {
  try {
    return JSON.parse(window.localStorage.getItem("faciliteago-cart") || "[]") as CartLine[];
  } catch {
    return [];
  }
}

export default function MerchantDetailClient({ merchant }: { merchant: Merchant }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState<string | null>(null);
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(`${merchant.lat},${merchant.lng}`)}&z=16&output=embed`;

  useEffect(() => setCart(readCart()), []);
  useEffect(() => {
    window.localStorage.setItem("faciliteago-cart", JSON.stringify(cart));
  }, [cart]);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(product: MarketplaceProduct) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...product, quantity: 1 }];
    });
    setAddedProduct(product.id);
    setCartOpen(true);
    window.setTimeout(() => setAddedProduct(null), 1300);
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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0072CE] text-lg font-black text-white shadow-lg">GO</div><div><p className="text-lg font-black text-[#002B5C]">faciliteaGO</p><p className="text-xs font-bold text-slate-500">by CaixaBank</p></div></a>
          <div className="flex items-center gap-2"><a href="/comercios" className="hidden rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-[#002B5C] md:inline-flex">Buscar comercios</a><button onClick={() => setCartOpen(true)} className="relative inline-flex items-center gap-2 rounded-full bg-[#0072CE] px-4 py-2 text-sm font-black text-white"><ShoppingCart className="h-4 w-4" /> Carrito{itemCount > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-[#FFCC00] px-2 py-0.5 text-xs text-[#002B5C]">{itemCount}</span>}</button></div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="overflow-hidden rounded-[34px] bg-cover bg-center shadow-2xl" style={{ backgroundImage: `linear-gradient(rgba(0,43,92,0.76), rgba(0,43,92,0.76)), url('${merchant.heroImage}')` }}>
          <div className="p-7 text-white md:p-12">
            <div className="flex flex-wrap gap-2"><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">{merchant.mainCategory}</span><span className="rounded-full bg-[#FFCC00] px-3 py-1 text-xs font-black text-[#002B5C]">{merchant.products.length} productos</span></div>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight md:text-7xl">{merchant.name}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-black text-blue-100"><span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {merchant.rating}/5</span><span>{merchant.distance.toFixed(2)} km desde Las Ramblas</span><span>{merchant.district}</span></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 md:px-6">
        <article className="overflow-hidden rounded-[32px] bg-white shadow-2xl">
          <div className="grid md:grid-cols-[0.9fr_1.1fr]">
            <div className="p-6 md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#0072CE]">Ubicación del comercio</p>
              <h2 className="mt-2 text-3xl font-black text-[#002B5C]">{merchant.name}</h2>
              <p className="mt-4 flex items-start gap-3 text-lg font-bold leading-7 text-slate-700"><MapPin className="mt-1 h-5 w-5 shrink-0 text-[#0072CE]" /> {merchant.address}</p>
              <div className="mt-5 rounded-3xl bg-blue-50 p-4 text-sm font-bold text-slate-600"><p>Zona: {merchant.district}, Barcelona</p><p>Coordenadas simuladas: {merchant.lat.toFixed(5)}, {merchant.lng.toFixed(5)}</p></div>
              <a href={`https://www.google.com/maps/search/?api=1&query=${merchant.lat},${merchant.lng}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-2xl bg-[#0072CE] px-5 py-3 text-sm font-black text-white">Abrir en Google Maps</a>
            </div>
            <div className="h-[360px] bg-blue-50 md:h-full"><iframe title={`Mapa ${merchant.name}`} src={mapSrc} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="mb-5 rounded-[28px] bg-white p-5 shadow-xl"><p className="text-sm font-bold text-slate-500">Catálogo del comercio</p><h2 className="text-3xl font-black text-[#002B5C]">Productos de {merchant.name}</h2></div>
        <div className="space-y-4">
          {merchant.products.map((product, index) => (
            <article key={product.id} className="grid gap-4 rounded-[28px] bg-white p-4 shadow-xl md:grid-cols-[150px_1fr_130px_150px] md:items-center">
              <a href={`/producto/${product.slug}`} className="block overflow-hidden rounded-2xl bg-slate-100"><img src={resolvedProductImage(product, index)} alt={product.name} className="h-36 w-full object-cover transition hover:scale-105" /></a>
              <div><p className="text-xs font-black uppercase tracking-wide text-[#0072CE]">{product.category}</p><a href={`/producto/${product.slug}`} className="mt-1 block text-2xl font-black text-slate-950 hover:text-[#0072CE]">{product.name}</a><p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-600">{product.description}</p><p className="mt-2 text-xs font-bold text-slate-500">Stock {product.stock} · Recogida {product.pickup}</p></div>
              <div className="md:text-right">{product.oldPrice && <p className="text-sm font-bold text-slate-400 line-through">{money(product.oldPrice)}</p>}<p className="text-3xl font-black text-[#0072CE]">{money(product.price)}</p></div>
              <button onClick={() => addToCart(product)} className="rounded-2xl bg-[#0072CE] px-4 py-3 text-sm font-black text-white transition hover:bg-[#005fb0]">{addedProduct === product.id ? "Añadido" : "Añadir al carrito"}</button>
            </article>
          ))}
        </div>
      </section>

      {cartOpen && <div className="fixed inset-0 z-[80] flex justify-end bg-slate-950/40"><aside className="h-full w-full max-w-md overflow-auto bg-white p-5 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-2xl font-black text-[#002B5C]">Carrito</h2><button onClick={() => setCartOpen(false)}><X /></button></div><div className="mt-5 space-y-3">{cart.length === 0 ? <div className="rounded-3xl border border-dashed border-blue-200 bg-blue-50 p-5 text-sm font-bold text-slate-500">El carrito está vacío.</div> : cart.map((item) => <div key={item.id} className="rounded-2xl border border-blue-100 p-3"><p className="font-black text-slate-900">{item.name}</p><p className="text-xs font-bold text-slate-500">{item.store}</p><div className="mt-3 flex items-center justify-between"><span className="font-black text-[#0072CE]">{money(item.price * item.quantity)}</span><div className="flex items-center gap-2"><button onClick={() => changeQuantity(item.id, -1)} className="rounded-full bg-slate-100 p-1"><Minus className="h-4 w-4" /></button><span className="text-sm font-black">{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} className="rounded-full bg-slate-100 p-1"><Plus className="h-4 w-4" /></button></div></div></div>)}</div><div className="mt-5 flex justify-between border-t border-blue-100 pt-4 text-xl font-black text-[#002B5C]"><span>Total</span><span>{money(subtotal)}</span></div><a href="/usuario" className="mt-5 block w-full rounded-2xl bg-[#0072CE] px-5 py-3 text-center font-black text-white shadow-lg">Ver mis pedidos</a></aside></div>}
    </main>
  );
}
