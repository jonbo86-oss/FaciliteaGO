"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, KeyRound, MapPin, MessageCircle, Minus, Plus, Search, Send, ShoppingCart, SlidersHorizontal, Star, UserRound, X } from "lucide-react";
import { marketplaceCategories, marketplaceProducts, money, type MarketplaceProduct } from "@/lib/marketplace-products";

const quickPrompts = ["Necesito herramientas para una reforma", "Busca promociones cerca", "Ordena por cercania", "Aplica FINBROADPEAK26"];
const locations = ["Las Ramblas, Barcelona", "El Born, Barcelona", "Eixample, Barcelona", "Gracia, Barcelona", "Barceloneta, Barcelona"];
const juaniasImage = "https://i.imgur.com/4f8nYhk.png";
type CartLine = MarketplaceProduct & { quantity: number };
type ChatMessage = { role: "user" | "assistant"; text: string };
type CurrentUser = { name: string; email: string };

function ProductCard({ product, onAdd }: { product: MarketplaceProduct; onAdd: (product: MarketplaceProduct) => void }) {
  return (
    <article className="group overflow-hidden rounded-[28px] bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
      <a href={`/producto/${product.slug}`} className="block">
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#002B5C]">{product.category}</div>
          {product.oldPrice && <div className="absolute right-3 top-3 rounded-full bg-[#FFCC00] px-3 py-1 text-xs font-black text-[#002B5C]">Oferta</div>}
        </div>
        <div className="p-5 pb-3">
          <div className="mb-2 flex items-center justify-between text-xs font-black text-slate-500"><span>{product.store}</span><span>{product.distance.toFixed(2)} km</span></div>
          <h3 className="min-h-14 text-xl font-black text-slate-950">{product.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-600">{product.description}</p>
          <div className="mt-4 flex items-center gap-3 text-sm font-bold text-slate-500"><span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {product.rating}</span><span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {product.pickup}</span><span>Stock {product.stock}</span></div>
        </div>
      </a>
      <div className="flex items-end justify-between px-5 pb-5">
        <div>{product.oldPrice && <p className="text-sm font-bold text-slate-400 line-through">{money(product.oldPrice)}</p>}<p className="text-3xl font-black text-[#0072CE]">{money(product.price)}</p></div>
        <button onClick={() => onAdd(product)} className="rounded-2xl bg-[#0072CE] px-4 py-3 text-sm font-black text-white">Añadir</button>
      </div>
    </article>
  );
}

export default function MarketplaceExperience() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [sort, setSort] = useState("near");
  const [location, setLocation] = useState("Las Ramblas, Barcelona");
  const [chatOpen, setChatOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [coupon, setCoupon] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", text: "Hola, soy JuanIAs. Dime que necesitas y busco en comercios cercanos." }]);

  useEffect(() => {
    const savedCart = window.localStorage.getItem("faciliteago-cart");
    const savedLocation = window.localStorage.getItem("faciliteago-location");
    const savedUser = window.localStorage.getItem("faciliteago-user");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedLocation) setLocation(savedLocation);
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => { window.localStorage.setItem("faciliteago-cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { window.localStorage.setItem("faciliteago-location", location); }, [location]);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    const base = marketplaceProducts.filter((product) => {
      const matchesCategory = category === "Todos" || product.category === category;
      const matchesQuery = !query || [product.name, product.store, product.category, product.district, product.description].join(" ").toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
    return [...base].sort((a, b) => sort === "price" ? a.price - b.price : sort === "rating" ? b.rating - a.rating : a.distance - b.distance);
  }, [query, category, sort]);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = coupon.toUpperCase() === "FINBROADPEAK26" ? Math.min(subtotal * 0.15, 15) : 0;
  const total = Math.max(subtotal - discount, 0);

  function handleLogin(withCaixa = false) {
    const typedName = loginName.trim();
    const finalName = typedName || (withCaixa ? "Cliente CaixaBank" : "Cliente");
    const email = typedName.includes("@") ? typedName : `${finalName.toLowerCase().replace(/\s+/g, ".")}@faciliteago.com`;
    const user = { name: finalName, email };
    setCurrentUser(user);
    window.localStorage.setItem("faciliteago-user", JSON.stringify(user));
    setLoginName("");
    setLoginPassword("");
    setLoginOpen(false);
  }

  function handleCheckout() {
    if (cart.length === 0) return;
    const order = {
      id: `GO-${Date.now().toString().slice(-6)}`,
      status: "Pedido confirmado",
      store: cart.length === 1 ? cart[0].store : `${new Set(cart.map((item) => item.store)).size} comercios`,
      total: money(total),
      pickup: `PK-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString("es-ES"),
      items: cart.map((item) => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price, store: item.store }))
    };
    const existingOrders = JSON.parse(window.localStorage.getItem("faciliteago-orders") || "[]");
    window.localStorage.setItem("faciliteago-orders", JSON.stringify([order, ...existingOrders]));
    setCart([]);
    setCoupon("");
    window.localStorage.setItem("faciliteago-cart", JSON.stringify([]));
    setCartOpen(false);
    router.push("/usuario");
  }

  function addToCart(product: MarketplaceProduct) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) => current.flatMap((item) => {
      if (item.id !== id) return [item];
      const next = item.quantity + delta;
      return next <= 0 ? [] : [{ ...item, quantity: next }];
    }));
  }

  function assistantReply(text: string) {
    const lower = text.toLowerCase();
    let reply = "He buscado opciones cercanas. Te dejo resultados disponibles para recoger hoy.";
    if (lower.includes("reforma") || lower.includes("herramienta") || lower.includes("pinzas")) { setQuery("ferreteria"); setCategory("Ferreteria"); reply = "Para una reforma te muestro ferreteria cercana: pinzas, kit basico, cinta, guantes y cutter."; }
    else if (lower.includes("gominola") || lower.includes("caramelo") || lower.includes("anillo")) { setQuery("gominolas"); setCategory("Gominolas"); reply = "He filtrado gominolas cercanas. Tienes el anillo de caramelo en promocion y bolsa mix disponible."; }
    else if (lower.includes("cerca") || lower.includes("cercania")) { setSort("near"); reply = `He ordenado los resultados por cercania desde ${location}.`; }
    else if (lower.includes("cupon") || lower.includes("finbroadpeak26")) { setCoupon("FINBROADPEAK26"); reply = "Cupon FINBROADPEAK26 aplicado al carrito."; }
    setMessages((current) => [...current, { role: "user", text }, { role: "assistant", text: reply }]);
  }

  function sendMessage(text = chatInput) { const clean = text.trim(); if (!clean) return; setChatInput(""); assistantReply(clean); }

  return (
    <main className="min-h-screen bg-[#f4f8ff] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/90 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6"><a href="/" className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0072CE] text-lg font-black text-white shadow-lg">GO</div><div><p className="text-lg font-black text-[#002B5C]">faciliteaGO</p><p className="text-xs font-bold text-slate-500">by CaixaBank</p></div></a><div className="flex items-center gap-2">{currentUser ? <a href="/usuario" className="hidden rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-[#002B5C] md:flex"><UserRound className="mr-2 h-4 w-4" /> {currentUser.name}</a> : <button onClick={() => setLoginOpen(true)} className="hidden rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-[#002B5C] md:flex"><UserRound className="mr-2 h-4 w-4" /> Acceso clientes</button>}<button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 rounded-full bg-[#0072CE] px-4 py-2 text-sm font-black text-white"><ShoppingCart className="h-4 w-4" /> Carrito{itemCount > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-[#FFCC00] px-2 py-0.5 text-xs text-[#002B5C]">{itemCount}</span>}</button></div></div></header>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6"><div className="overflow-hidden rounded-[32px] bg-cover bg-center shadow-2xl" style={{ backgroundImage: "linear-gradient(rgba(0,43,92,0.74), rgba(0,43,92,0.74)), url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=80')" }}><div className="p-6 text-white md:p-10"><div className="mb-5 flex flex-wrap gap-2"><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">Marketplace local</span><span className="rounded-full bg-[#FFCC00] px-3 py-1 text-xs font-black text-[#002B5C]">FINBROADPEAK26</span></div><h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">Encuentra productos de comercios cercanos y recogelos hoy.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">Compra en comercios locales con busqueda inteligente, recogida rapida y una experiencia sencilla.</p><div className="mt-7 grid gap-3 rounded-3xl bg-white p-3 text-slate-900 md:grid-cols-[1fr_260px_150px]"><div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3"><Search className="h-5 w-5 text-[#0072CE]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca pinzas, gominolas, souvenirs..." className="w-full bg-transparent text-sm font-semibold outline-none" /></div><div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold"><MapPin className="h-5 w-5 text-[#0072CE]" /><select value={location} onChange={(event) => setLocation(event.target.value)} className="w-full bg-transparent outline-none">{locations.map((item) => <option key={item}>{item}</option>)}</select></div><button className="rounded-2xl bg-[#FFCC00] px-5 py-3 text-sm font-black text-[#002B5C]">Buscar</button></div></div></div></section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 md:grid-cols-[260px_1fr] md:px-6"><aside className="rounded-[28px] bg-white p-5 shadow-xl md:sticky md:top-24 md:h-fit"><div className="mb-4 flex items-center gap-2 text-sm font-black text-[#002B5C]"><SlidersHorizontal className="h-5 w-5" /> Filtros</div><div className="space-y-2">{marketplaceCategories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-black ${category === item ? "bg-[#0072CE] text-white" : "bg-blue-50 text-[#002B5C]"}`}>{item}</button>)}</div><div className="mt-5"><p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Ordenar</p><select value={sort} onChange={(event) => setSort(event.target.value)} className="w-full rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-bold outline-none"><option value="near">Cercania</option><option value="price">Precio</option><option value="rating">Valoracion</option></select></div></aside><section><div className="mb-4"><p className="text-sm font-bold text-slate-500">{filtered.length} resultados cerca de {location}</p><h2 className="text-3xl font-black text-[#002B5C]">Productos disponibles</h2></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div></section></section>

      <footer className="border-t border-blue-100 bg-white px-4 py-8 text-center text-xs font-semibold text-slate-500"><p>faciliteaGO by CaixaBank · Comercio local · {location}</p><div className="mt-3 flex justify-center gap-4"><a href="/comercio" className="hover:text-[#0072CE]">Acceso comercios</a><a href="/admin" className="hover:text-[#0072CE]">Administracion</a></div></footer>

      {loginOpen && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4"><div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-2xl font-black text-[#002B5C]">Acceso clientes</h2><button onClick={() => setLoginOpen(false)}><X /></button></div><div className="mt-5 space-y-3"><input value={loginName} onChange={(event) => setLoginName(event.target.value)} placeholder="Usuario o email" className="w-full rounded-2xl border border-blue-100 px-4 py-3 font-semibold outline-none" /><input value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} placeholder="Contraseña" type="password" className="w-full rounded-2xl border border-blue-100 px-4 py-3 font-semibold outline-none" /><button onClick={() => handleLogin(false)} className="w-full rounded-2xl bg-[#0072CE] px-4 py-3 font-black text-white">Entrar</button><button onClick={() => handleLogin(true)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FFCC00] px-4 py-3 font-black text-[#002B5C]"><KeyRound className="h-5 w-5" /> Acceso con usuario de CaixaBank</button></div></div></div>}

      {cartOpen && <div className="fixed inset-0 z-[65] flex justify-end bg-slate-950/40"><aside className="h-full w-full max-w-md overflow-auto bg-white p-5 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-2xl font-black text-[#002B5C]">Carrito</h2><button onClick={() => setCartOpen(false)}><X /></button></div><div className="mt-5 space-y-3">{cart.length === 0 ? <div className="rounded-3xl border border-dashed border-blue-200 bg-blue-50 p-5 text-sm font-bold text-slate-500">Tu carrito esta vacio.</div> : cart.map((item) => <div key={item.id} className="rounded-2xl border border-blue-100 p-3"><p className="font-black text-slate-900">{item.name}</p><p className="text-xs font-bold text-slate-500">{item.store}</p><div className="mt-3 flex items-center justify-between"><span className="font-black text-[#0072CE]">{money(item.price * item.quantity)}</span><div className="flex items-center gap-2"><button onClick={() => changeQuantity(item.id, -1)} className="rounded-full bg-slate-100 p-1"><Minus className="h-4 w-4" /></button><span className="text-sm font-black">{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} className="rounded-full bg-slate-100 p-1"><Plus className="h-4 w-4" /></button></div></div></div>)}</div><div className="mt-5 rounded-2xl bg-slate-50 p-3"><label className="text-xs font-black uppercase text-slate-500">Cupon</label><input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="FINBROADPEAK26" className="mt-2 w-full rounded-xl border border-blue-100 px-3 py-2 text-sm font-bold outline-none" /></div><div className="mt-5 space-y-2 text-sm font-bold"><div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="flex justify-between text-emerald-600"><span>Descuento</span><span>-{money(discount)}</span></div><div className="flex justify-between border-t border-blue-100 pt-3 text-xl font-black text-[#002B5C]"><span>Total</span><span>{money(total)}</span></div></div><button onClick={handleCheckout} className="mt-5 w-full rounded-2xl bg-[#0072CE] px-5 py-3 font-black text-white shadow-lg">Finalizar compra</button></aside></div>}

      <button onClick={() => setChatOpen(true)} className="fixed bottom-6 right-6 z-50 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white shadow-2xl ring-4 ring-[#0072CE]"><img src={juaniasImage} alt="JuanIAs" className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} /><MessageCircle className="absolute h-7 w-7 text-[#0072CE] opacity-0" /></button>
      {chatOpen && <div className="fixed bottom-28 right-4 z-50 flex h-[560px] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-blue-100"><div className="flex items-center justify-between bg-[#002B5C] p-4 text-white"><div className="flex items-center gap-3"><div className="h-12 w-12 overflow-hidden rounded-2xl bg-white"><img src={juaniasImage} alt="JuanIAs" className="h-full w-full object-cover" /></div><div><p className="font-black">JuanIAs</p><p className="text-xs text-blue-100">Asistente de compra local</p></div></div><button onClick={() => setChatOpen(false)}><X className="h-5 w-5" /></button></div><div className="flex-1 space-y-3 overflow-auto bg-blue-50 p-4">{messages.map((message, index) => <div key={index} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm font-semibold leading-6 ${message.role === "user" ? "ml-auto bg-[#0072CE] text-white" : "bg-white text-slate-700"}`}>{message.text}</div>)}</div><div className="border-t border-blue-100 bg-white p-3"><div className="mb-2 flex flex-wrap gap-2">{quickPrompts.map((prompt) => <button key={prompt} onClick={() => sendMessage(prompt)} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#002B5C]">{prompt}</button>)}</div><div className="flex gap-2"><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendMessage(); }} placeholder="Escribe a JuanIAs..." className="flex-1 rounded-2xl border border-blue-100 px-4 py-3 text-sm font-semibold outline-none" /><button onClick={() => sendMessage()} className="rounded-2xl bg-[#0072CE] px-4 text-white"><Send className="h-5 w-5" /></button></div></div></div>}
    </main>
  );
}
