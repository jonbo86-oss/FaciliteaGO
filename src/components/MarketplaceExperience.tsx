"use client";

import { useMemo, useState } from "react";
import { Bot, ChevronRight, Clock, Heart, MapPin, Minus, Plus, Search, ShieldCheck, ShoppingBag, ShoppingCart, SlidersHorizontal, Star, Store, Tag, UserRound } from "lucide-react";

type Product = {
  id: string;
  name: string;
  store: string;
  category: string;
  district: string;
  price: number;
  oldPrice?: number;
  distance: number;
  rating: number;
  stock: number;
  pickup: string;
  color: string;
};

type CartLine = Product & { quantity: number };

const products: Product[] = [
  { id: "p1", name: "Pinzas pequenas metalicas pack 12", store: "Ferreteria Ramblas Pro", category: "Ferreteria", district: "Gotico", price: 2.95, oldPrice: 4.9, distance: 0.35, rating: 4.8, stock: 42, pickup: "25 min", color: "from-blue-500 to-cyan-300" },
  { id: "p2", name: "Anillo de caramelo sabor fresa", store: "DulceRaval", category: "Gominolas", district: "Raval", price: 0.99, oldPrice: 1.8, distance: 0.62, rating: 4.7, stock: 68, pickup: "15 min", color: "from-pink-500 to-yellow-300" },
  { id: "p3", name: "Iman premium Barcelona skyline", store: "Souvenirs Barcelona 92", category: "Souvenirs", district: "Born", price: 4.95, oldPrice: 6.5, distance: 0.9, rating: 4.6, stock: 24, pickup: "20 min", color: "from-indigo-500 to-blue-200" },
  { id: "p4", name: "Kit reforma rapida: cinta, guantes y cutter", store: "Ferreteria Ramblas Pro", category: "Ferreteria", district: "Gotico", price: 14.95, distance: 0.35, rating: 4.8, stock: 17, pickup: "30 min", color: "from-slate-700 to-slate-300" },
  { id: "p5", name: "Pack oficina libreta, boligrafos y clips", store: "Papereria Catalunya", category: "Papeleria", district: "Eixample", price: 8.75, oldPrice: 11.2, distance: 1.2, rating: 4.5, stock: 31, pickup: "35 min", color: "from-emerald-500 to-lime-200" },
  { id: "p6", name: "Ramo urbano azul y amarillo", store: "Floristeria La Rambla", category: "Floristeria", district: "Gotico", price: 22.5, distance: 0.48, rating: 4.9, stock: 9, pickup: "45 min", color: "from-yellow-400 to-blue-400" },
  { id: "p7", name: "Bolsa mix gominolas 500 g", store: "DulceRaval", category: "Gominolas", district: "Raval", price: 5.9, distance: 0.62, rating: 4.7, stock: 54, pickup: "15 min", color: "from-red-400 to-orange-200" },
  { id: "p8", name: "Taza ceramica Barcelona local edition", store: "Souvenirs Barcelona 92", category: "Souvenirs", district: "Born", price: 9.95, distance: 0.9, rating: 4.6, stock: 18, pickup: "20 min", color: "from-blue-700 to-white" }
];

const categories = ["Todos", "Ferreteria", "Gominolas", "Souvenirs", "Papeleria", "Floristeria"];
const quickPrompts = ["Necesito herramientas para una reforma", "Busca promociones cerca de mi", "Anade las pinzas al carrito", "Ordena por cercania", "Aplica FINBROADPEAK26", "Que puedo recoger hoy?"];

function money(value: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
}

export default function MarketplaceExperience() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [sort, setSort] = useState("near");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [coupon, setCoupon] = useState("");
  const [assistantMessages, setAssistantMessages] = useState(["Hola, soy JuanIAs. Puedo buscar, filtrar por cercania, aplicar cupones y anadir cosas al carrito."]);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    const base = products.filter((product) => {
      const matchesCategory = category === "Todos" || product.category === category;
      const matchesQuery = !query || [product.name, product.store, product.category, product.district].join(" ").toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
    return [...base].sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "rating") return b.rating - a.rating;
      return a.distance - b.distance;
    });
  }, [query, category, sort]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = coupon.toUpperCase() === "FINBROADPEAK26" ? Math.min(cartTotal * 0.15, 15) : 0;
  const finalTotal = Math.max(cartTotal - discount, 0);

  function addToCart(product: Product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id: string) {
    setCart((current) => current.flatMap((item) => {
      if (item.id !== id) return [item];
      if (item.quantity <= 1) return [];
      return [{ ...item, quantity: item.quantity - 1 }];
    }));
  }

  function runAssistant(prompt: string) {
    const lower = prompt.toLowerCase();
    if (lower.includes("pinzas") || lower.includes("reforma") || lower.includes("herramientas")) {
      const target = products[0];
      addToCart(target);
      setQuery("ferreteria");
      setCategory("Ferreteria");
      setAssistantMessages((messages) => [...messages, `He anadido ${target.name} al carrito y te muestro ferreterias cercanas.`]);
      return;
    }
    if (lower.includes("cupon") || lower.includes("finbroadpeak26")) {
      setCoupon("FINBROADPEAK26");
      setAssistantMessages((messages) => [...messages, "Cupon FINBROADPEAK26 aplicado. Descuento del 15 por ciento con limite de 15 euros."]);
      return;
    }
    if (lower.includes("cercania") || lower.includes("cerca")) {
      setSort("near");
      setAssistantMessages((messages) => [...messages, "Resultados ordenados por cercania desde Las Ramblas."]);
      return;
    }
    setAssistantMessages((messages) => [...messages, "Te muestro promociones disponibles para recoger hoy cerca de Las Ramblas."]);
  }

  return (
    <main className="min-h-screen bg-[#f4f8ff] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0072CE] text-lg font-black text-white shadow-lg">GO</div><div><p className="text-lg font-black text-[#002B5C]">faciliteaGO</p><p className="text-xs font-bold text-slate-500">by CaixaBank</p></div></div>
          <nav className="hidden items-center gap-5 text-sm font-bold text-slate-700 md:flex"><a href="/usuario">Portal usuario</a><a href="/comercio">Portal comercio</a><a href="/admin">Admin</a></nav>
          <div className="flex items-center gap-3 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-[#002B5C]"><ShoppingCart className="h-4 w-4" /> {cart.reduce((sum, item) => sum + item.quantity, 0)}</div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[1fr_380px] md:px-6">
        <div className="rounded-[32px] bg-[#002B5C] p-6 text-white shadow-2xl md:p-10">
          <div className="mb-5 flex flex-wrap gap-2"><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">Marketplace local</span><span className="rounded-full bg-[#FFCC00] px-3 py-1 text-xs font-black text-[#002B5C]">FINBROADPEAK26</span><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">Pago simulado</span></div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">Compra en comercios cerca de ti con una experiencia real de marketplace.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">Busca productos, compara por cercania, anade al carrito, aplica descuentos, simula el pago y consulta tus compras. La demo empieza en Las Ramblas, Barcelona.</p>
          <div className="mt-7 grid gap-3 rounded-3xl bg-white p-3 text-slate-900 md:grid-cols-[1fr_190px_150px]"><div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3"><Search className="h-5 w-5 text-[#0072CE]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca pinzas, gominolas, souvenirs..." className="w-full bg-transparent text-sm font-semibold outline-none" /></div><div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold"><MapPin className="h-5 w-5 text-[#0072CE]" /> Las Ramblas</div><button className="rounded-2xl bg-[#FFCC00] px-5 py-3 text-sm font-black text-[#002B5C]">Buscar</button></div>
        </div>

        <aside className="rounded-[32px] bg-white p-5 shadow-xl">
          <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-[#0072CE]">Tu carrito</p><h2 className="text-2xl font-black text-[#002B5C]">Checkout demo</h2></div><ShoppingBag className="h-8 w-8 text-[#0072CE]" /></div>
          <div className="space-y-3">{cart.length === 0 ? <div className="rounded-3xl border border-dashed border-blue-200 bg-blue-50 p-5 text-sm font-bold text-slate-500">Anade productos o pide a JuanIAs que lo haga por ti.</div> : cart.map((item) => <div key={item.id} className="rounded-2xl border border-blue-100 p-3"><p className="font-black text-slate-900">{item.name}</p><p className="text-xs font-bold text-slate-500">{item.store}</p><div className="mt-3 flex items-center justify-between"><span className="font-black text-[#0072CE]">{money(item.price * item.quantity)}</span><div className="flex items-center gap-2"><button onClick={() => removeFromCart(item.id)} className="rounded-full bg-slate-100 p-1"><Minus className="h-4 w-4" /></button><span className="text-sm font-black">{item.quantity}</span><button onClick={() => addToCart(item)} className="rounded-full bg-slate-100 p-1"><Plus className="h-4 w-4" /></button></div></div></div>)}</div>
          <div className="mt-4 rounded-2xl bg-slate-50 p-3"><label className="text-xs font-black uppercase text-slate-500">Cupon</label><input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="FINBROADPEAK26" className="mt-2 w-full rounded-xl border border-blue-100 px-3 py-2 text-sm font-bold outline-none" /></div>
          <div className="mt-4 space-y-2 text-sm font-bold"><div className="flex justify-between"><span>Subtotal</span><span>{money(cartTotal)}</span></div><div className="flex justify-between text-emerald-600"><span>Descuento</span><span>-{money(discount)}</span></div><div className="flex justify-between border-t border-blue-100 pt-3 text-xl font-black text-[#002B5C]"><span>Total</span><span>{money(finalTotal)}</span></div></div>
          <button className="mt-5 w-full rounded-2xl bg-[#0072CE] px-5 py-3 font-black text-white shadow-lg">Simular pago y crear pedido</button>
        </aside>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 md:grid-cols-[260px_1fr_360px] md:px-6">
        <aside className="rounded-[28px] bg-white p-5 shadow-xl"><div className="mb-4 flex items-center gap-2 text-sm font-black text-[#002B5C]"><SlidersHorizontal className="h-5 w-5" /> Filtros</div><div className="space-y-2">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-black ${category === item ? "bg-[#0072CE] text-white" : "bg-blue-50 text-[#002B5C]"}`}>{item}</button>)}</div><div className="mt-5"><p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Ordenar</p><select value={sort} onChange={(event) => setSort(event.target.value)} className="w-full rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-bold outline-none"><option value="near">Cercania</option><option value="price">Precio</option><option value="rating">Valoracion</option></select></div></aside>
        <section><div className="mb-4"><p className="text-sm font-bold text-slate-500">{filtered.length} resultados cerca de Las Ramblas</p><h2 className="text-3xl font-black text-[#002B5C]">Productos y promociones</h2></div><div className="grid gap-4 md:grid-cols-2">{filtered.map((product) => <article key={product.id} className="overflow-hidden rounded-[28px] bg-white shadow-xl"><div className={`h-36 bg-gradient-to-br ${product.color} p-4 text-white`}><div className="flex justify-between"><span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black">{product.category}</span><button className="rounded-full bg-white/20 p-2"><Heart className="h-4 w-4" /></button></div></div><div className="p-5"><div className="mb-2 flex items-center justify-between text-xs font-black text-slate-500"><span>{product.store}</span><span>{product.distance.toFixed(2)} km</span></div><h3 className="min-h-14 text-xl font-black text-slate-950">{product.name}</h3><div className="mt-3 flex items-center gap-3 text-sm font-bold text-slate-500"><span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {product.rating}</span><span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {product.pickup}</span><span>Stock {product.stock}</span></div><div className="mt-4 flex items-end justify-between"><div>{product.oldPrice && <p className="text-sm font-bold text-slate-400 line-through">{money(product.oldPrice)}</p>}<p className="text-3xl font-black text-[#0072CE]">{money(product.price)}</p></div><button onClick={() => addToCart(product)} className="rounded-2xl bg-[#0072CE] px-4 py-3 text-sm font-black text-white">Añadir</button></div></div></article>)}</div></section>
        <aside className="space-y-5"><div className="rounded-[28px] bg-white p-5 shadow-xl"><div className="mb-4 flex items-center gap-3"><div className="rounded-2xl bg-[#002B5C] p-3 text-white"><Bot className="h-6 w-6" /></div><div><p className="text-xs font-black uppercase tracking-[0.18em] text-[#0072CE]">JuanIAs</p><h2 className="text-xl font-black text-[#002B5C]">Compra asistida</h2></div></div><div className="mb-4 max-h-36 space-y-2 overflow-auto rounded-2xl bg-blue-50 p-3">{assistantMessages.map((message, index) => <p key={index} className="text-sm font-semibold text-slate-700">{message}</p>)}</div><div className="grid gap-2">{quickPrompts.map((prompt) => <button key={prompt} onClick={() => runAssistant(prompt)} className="rounded-2xl border border-blue-100 bg-white px-3 py-2 text-left text-sm font-bold text-[#002B5C] hover:bg-blue-50">{prompt}</button>)}</div></div><div className="rounded-[28px] bg-[#002B5C] p-5 text-white shadow-xl"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#FFCC00]">Mapa vivo</p><h2 className="mt-1 text-xl font-black">Comercios sincronizados</h2><div className="relative mt-4 h-64 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-200 via-white to-yellow-100">{products.slice(0, 5).map((product, index) => <button key={product.id} onClick={() => setQuery(product.store)} className="absolute rounded-full bg-white px-3 py-2 text-xs font-black text-[#002B5C] shadow-lg" style={{ left: `${12 + (index * 17) % 70}%`, top: `${18 + (index * 23) % 60}%` }}>{product.store.split(" ")[0]}</button>)}<div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0072CE] text-white ring-8 ring-white/70"><UserRound className="h-6 w-6" /></div></div></div></aside>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-12 md:grid-cols-3 md:px-6">{[{ title: "Portal usuario", text: "Compras, estados, codigo de recogida, incidencias y resenas.", href: "/usuario", icon: ShoppingBag }, { title: "Portal comercio", text: "Pedidos, stock, productos, promociones y ventas.", href: "/comercio", icon: Store }, { title: "Backoffice admin", text: "Gobierno de comercios, productos, cupones y metricas.", href: "/admin", icon: ShieldCheck }].map((item) => <a key={item.title} href={item.href} className="group rounded-[28px] bg-white p-6 shadow-xl transition hover:-translate-y-1"><item.icon className="h-9 w-9 text-[#0072CE]" /><h3 className="mt-4 text-2xl font-black text-[#002B5C]">{item.title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.text}</p><span className="mt-4 flex items-center gap-2 text-sm font-black text-[#0072CE]">Abrir <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></a>)}</section>
      <footer className="border-t border-blue-100 bg-white px-4 py-6 text-center text-sm font-bold text-slate-500">faciliteaGO by CaixaBank · Demo funcional Broad Peak · Las Ramblas, Barcelona</footer>
    </main>
  );
}
