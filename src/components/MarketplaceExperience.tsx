"use client";

import { useMemo, useState } from "react";
import { Bot, ChevronRight, Clock, MapPin, MessageCircle, Search, Send, ShoppingBag, SlidersHorizontal, Star, X } from "lucide-react";
import { marketplaceCategories, marketplaceProducts, money, type MarketplaceProduct } from "@/lib/marketplace-products";

const quickPrompts = ["Necesito herramientas para una reforma", "Busca promociones cerca", "Ordena por cercania", "Aplica FINBROADPEAK26"];
const locations = ["Las Ramblas, Barcelona", "El Born, Barcelona", "Eixample, Barcelona", "Gracia, Barcelona", "Barceloneta, Barcelona"];

type ChatMessage = { role: "user" | "assistant"; text: string };

function ProductCard({ product }: { product: MarketplaceProduct }) {
  return (
    <a href={`/producto/${product.slug}`} className="group overflow-hidden rounded-[28px] bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#002B5C]">{product.category}</div>
        {product.oldPrice && <div className="absolute right-3 top-3 rounded-full bg-[#FFCC00] px-3 py-1 text-xs font-black text-[#002B5C]">Oferta</div>}
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between text-xs font-black text-slate-500">
          <span>{product.store}</span>
          <span>{product.distance.toFixed(2)} km</span>
        </div>
        <h3 className="min-h-14 text-xl font-black text-slate-950">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-600">{product.description}</p>
        <div className="mt-4 flex items-center gap-3 text-sm font-bold text-slate-500">
          <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {product.rating}</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {product.pickup}</span>
          <span>Stock {product.stock}</span>
        </div>
        <div className="mt-5 flex items-end justify-between">
          <div>
            {product.oldPrice && <p className="text-sm font-bold text-slate-400 line-through">{money(product.oldPrice)}</p>}
            <p className="text-3xl font-black text-[#0072CE]">{money(product.price)}</p>
          </div>
          <span className="flex items-center gap-1 rounded-2xl bg-[#0072CE] px-4 py-3 text-sm font-black text-white">Ver <ChevronRight className="h-4 w-4" /></span>
        </div>
      </div>
    </a>
  );
}

export default function MarketplaceExperience() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [sort, setSort] = useState("near");
  const [location, setLocation] = useState("Las Ramblas, Barcelona");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: "Hola, soy JuanIAs. Dime que necesitas y busco en comercios cercanos." }
  ]);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    const base = marketplaceProducts.filter((product) => {
      const matchesCategory = category === "Todos" || product.category === category;
      const matchesQuery = !query || [product.name, product.store, product.category, product.district, product.description].join(" ").toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
    return [...base].sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "rating") return b.rating - a.rating;
      return a.distance - b.distance;
    });
  }, [query, category, sort]);

  function assistantReply(text: string) {
    const lower = text.toLowerCase();
    let reply = "He buscado opciones cercanas. Te dejo resultados disponibles para recoger hoy.";
    if (lower.includes("reforma") || lower.includes("herramienta") || lower.includes("pinzas")) {
      setQuery("ferreteria");
      setCategory("Ferreteria");
      reply = "Para una reforma te muestro ferreteria cercana: pinzas, kit basico, cinta, guantes y cutter. He filtrado por Ferreteria.";
    } else if (lower.includes("gominola") || lower.includes("caramelo") || lower.includes("anillo")) {
      setQuery("gominolas");
      setCategory("Gominolas");
      reply = "He filtrado gominolas cercanas. Tienes el anillo de caramelo en promocion y bolsa mix disponible en DulceRaval.";
    } else if (lower.includes("cerca") || lower.includes("cercania")) {
      setSort("near");
      reply = `He ordenado los resultados por cercania desde ${location}.`;
    } else if (lower.includes("cupon") || lower.includes("finbroadpeak26")) {
      reply = "El cupon FINBROADPEAK26 esta disponible para el checkout simulado. En la ficha de producto lo veras como ventaja activa.";
    }
    setMessages((current) => [...current, { role: "user", text }, { role: "assistant", text: reply }]);
  }

  function sendMessage(text = chatInput) {
    const clean = text.trim();
    if (!clean) return;
    setChatInput("");
    assistantReply(clean);
  }

  return (
    <main className="min-h-screen bg-[#f4f8ff] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0072CE] text-lg font-black text-white shadow-lg">GO</div>
            <div><p className="text-lg font-black text-[#002B5C]">faciliteaGO</p><p className="text-xs font-bold text-slate-500">by CaixaBank</p></div>
          </a>
          <a href="/usuario" className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-[#002B5C]"><ShoppingBag className="h-4 w-4" /> Mis compras</a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="rounded-[32px] bg-[#002B5C] p-6 text-white shadow-2xl md:p-10">
          <div className="mb-5 flex flex-wrap gap-2"><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">Marketplace local</span><span className="rounded-full bg-[#FFCC00] px-3 py-1 text-xs font-black text-[#002B5C]">FINBROADPEAK26</span></div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">Encuentra productos de comercios cercanos y recogelos hoy.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">Demo en Barcelona con busqueda, filtros, ubicacion editable, fichas de producto y JuanIAs como asistente flotante.</p>
          <div className="mt-7 grid gap-3 rounded-3xl bg-white p-3 text-slate-900 md:grid-cols-[1fr_260px_150px]">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3"><Search className="h-5 w-5 text-[#0072CE]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca pinzas, gominolas, souvenirs..." className="w-full bg-transparent text-sm font-semibold outline-none" /></div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold"><MapPin className="h-5 w-5 text-[#0072CE]" /><select value={location} onChange={(event) => setLocation(event.target.value)} className="w-full bg-transparent outline-none">{locations.map((item) => <option key={item}>{item}</option>)}</select></div>
            <button className="rounded-2xl bg-[#FFCC00] px-5 py-3 text-sm font-black text-[#002B5C]">Buscar</button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 md:grid-cols-[260px_1fr] md:px-6">
        <aside className="rounded-[28px] bg-white p-5 shadow-xl md:sticky md:top-24 md:h-fit"><div className="mb-4 flex items-center gap-2 text-sm font-black text-[#002B5C]"><SlidersHorizontal className="h-5 w-5" /> Filtros</div><div className="space-y-2">{marketplaceCategories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-black ${category === item ? "bg-[#0072CE] text-white" : "bg-blue-50 text-[#002B5C]"}`}>{item}</button>)}</div><div className="mt-5"><p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Ordenar</p><select value={sort} onChange={(event) => setSort(event.target.value)} className="w-full rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-bold outline-none"><option value="near">Cercania</option><option value="price">Precio</option><option value="rating">Valoracion</option></select></div></aside>
        <section><div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-end"><div><p className="text-sm font-bold text-slate-500">{filtered.length} resultados cerca de {location}</p><h2 className="text-3xl font-black text-[#002B5C]">Productos disponibles</h2></div></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
      </section>

      <footer className="border-t border-blue-100 bg-white px-4 py-8 text-center text-xs font-semibold text-slate-500"><p>faciliteaGO by CaixaBank · Demo funcional Broad Peak · {location}</p><div className="mt-3 flex justify-center gap-4"><a href="/comercio" className="hover:text-[#0072CE]">Acceso comercios</a><a href="/admin" className="hover:text-[#0072CE]">Administracion</a></div></footer>

      <button onClick={() => setChatOpen(true)} className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#0072CE] text-white shadow-2xl"><MessageCircle className="h-8 w-8" /></button>
      {chatOpen && <div className="fixed bottom-24 right-4 z-50 flex h-[560px] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-blue-100"><div className="flex items-center justify-between bg-[#002B5C] p-4 text-white"><div className="flex items-center gap-3"><div className="rounded-2xl bg-white/10 p-2"><Bot className="h-6 w-6" /></div><div><p className="font-black">JuanIAs</p><p className="text-xs text-blue-100">Asistente de compra local</p></div></div><button onClick={() => setChatOpen(false)}><X className="h-5 w-5" /></button></div><div className="flex-1 space-y-3 overflow-auto bg-blue-50 p-4">{messages.map((message, index) => <div key={index} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm font-semibold leading-6 ${message.role === "user" ? "ml-auto bg-[#0072CE] text-white" : "bg-white text-slate-700"}`}>{message.text}</div>)}</div><div className="border-t border-blue-100 bg-white p-3"><div className="mb-2 flex flex-wrap gap-2">{quickPrompts.map((prompt) => <button key={prompt} onClick={() => sendMessage(prompt)} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#002B5C]">{prompt}</button>)}</div><div className="flex gap-2"><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendMessage(); }} placeholder="Escribe a JuanIAs..." className="flex-1 rounded-2xl border border-blue-100 px-4 py-3 text-sm font-semibold outline-none" /><button onClick={() => sendMessage()} className="rounded-2xl bg-[#0072CE] px-4 text-white"><Send className="h-5 w-5" /></button></div></div></div>}
    </main>
  );
}
