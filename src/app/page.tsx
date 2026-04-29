import { categories, demoLocation, featuredStores, juaniasSuggestions, platformModules, promotions } from "@/lib/demo-data";
import { Bot, Building2, CheckCircle2, MapPin, Search, ShieldCheck, ShoppingCart, Store, Tag, Users } from "lucide-react";

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-caixa-sky px-3 py-1 text-xs font-semibold text-caixa-navy">{children}</span>;
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-caixa-blue">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-tight text-caixa-ink md:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-slate-600">{text}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-caixa-sky to-white">
      <header className="sticky top-0 z-20 border-b border-blue-100 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-caixa-blue text-lg font-black text-white shadow-soft">GO</div>
            <div>
              <p className="text-lg font-black text-caixa-navy">faciliteaGO</p>
              <p className="text-xs font-semibold text-slate-500">by CaixaBank</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
            <a href="#marketplace">Marketplace</a>
            <a href="#juanias">JuanIAs</a>
            <a href="#operacion">Operacion real</a>
            <a href="#portales">Portales</a>
          </nav>
          <button className="rounded-full bg-caixa-blue px-5 py-2.5 text-sm font-bold text-white shadow-soft">Entrar demo</button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
        <div>
          <Badge>Demo funcional avanzada para comercio local</Badge>
          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight text-caixa-ink md:text-7xl">
            Compra cerca. Ayuda a tu barrio. Opera como un marketplace real.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            faciliteaGO conecta clientes con comercios locales de Barcelona. La pasarela de pago es simulada, pero el resto del flujo esta pensado como producto real: catalogo, stock, carrito, checkout, pedidos, comercio, admin, incidencias y JuanIAs.
          </p>
          <div className="mt-8 rounded-3xl border border-blue-100 bg-white p-3 shadow-soft">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                <Search className="h-5 w-5 text-caixa-blue" />
                <span className="text-slate-500">Busca ferreterias, gominolas, souvenirs...</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                <MapPin className="h-5 w-5 text-caixa-blue" />
                <span className="font-semibold text-caixa-navy">{demoLocation.label}</span>
              </div>
              <button className="rounded-2xl bg-caixa-yellow px-6 py-3 font-black text-caixa-navy">Buscar</button>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.slice(0, 6).map((category) => <Badge key={category}>{category}</Badge>)}
          </div>
        </div>

        <div className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-soft">
          <div className="rounded-[1.5rem] bg-caixa-navy p-5 text-white">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">Mapa local interactivo</p>
                <p className="text-2xl font-black">Barcelona cerca de ti</p>
              </div>
              <MapPin className="h-8 w-8 text-caixa-yellow" />
            </div>
            <div className="relative h-80 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-200 via-white to-yellow-100">
              <div className="absolute left-8 top-10 rounded-full bg-caixa-blue px-4 py-2 text-sm font-bold text-white shadow-soft">Ferreteria 350 m</div>
              <div className="absolute right-8 top-24 rounded-full bg-caixa-yellow px-4 py-2 text-sm font-bold text-caixa-navy shadow-soft">Dulces 620 m</div>
              <div className="absolute bottom-12 left-20 rounded-full bg-white px-4 py-2 text-sm font-bold text-caixa-navy shadow-soft">Souvenirs 900 m</div>
              <div className="absolute bottom-24 right-16 rounded-full bg-caixa-blue px-4 py-2 text-sm font-bold text-white shadow-soft">Papeleria 1,1 km</div>
              <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-caixa-blue shadow-soft ring-8 ring-blue-100">
                <Users className="h-7 w-7" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="marketplace" className="mx-auto max-w-7xl px-5 py-14">
        <SectionTitle eyebrow="Marketplace" title="Promociones reales para una demo que se puede enseñar" text="No restaurantes, no catalogo generico. Comercios locales variados con productos concretos, precios plausibles, distancia, stock y promociones." />
        <div className="grid gap-5 md:grid-cols-3">
          {promotions.map((promo, index) => (
            <article key={promo.product} className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-soft">
              <div className="mb-4 flex h-40 items-center justify-center rounded-3xl bg-gradient-to-br from-caixa-sky to-white text-5xl font-black text-caixa-blue">{index + 1}</div>
              <div className="flex items-center justify-between gap-3">
                <Tag className="h-5 w-5 text-caixa-blue" />
                <span className="text-sm font-bold text-slate-500">{promo.distance}</span>
              </div>
              <h3 className="mt-3 text-xl font-black text-caixa-ink">{promo.product}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">{promo.store}</p>
              <div className="mt-4 flex items-end gap-3">
                <span className="text-sm font-semibold text-slate-400 line-through">{promo.oldPrice}</span>
                <span className="text-3xl font-black text-caixa-blue">{promo.price}</span>
              </div>
              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-caixa-blue px-4 py-3 font-bold text-white">
                <ShoppingCart className="h-5 w-5" /> Anadir al carrito
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <SectionTitle eyebrow="Comercios" title="Fichas de comercio con confianza, distancia y operativa" text="Cada comercio tendra horarios, stock, pedidos, resenas, promociones, metodos de recogida y panel propio." />
        <div className="grid gap-5 md:grid-cols-3">
          {featuredStores.map((store) => (
            <article key={store.name} className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-soft">
              <div className="mb-4 flex h-32 items-center justify-center rounded-3xl bg-caixa-navy text-white">
                <Store className="h-12 w-12" />
              </div>
              <Badge>{store.badge}</Badge>
              <h3 className="mt-4 text-xl font-black text-caixa-ink">{store.name}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">{store.category} · {store.district}</p>
              <div className="mt-4 flex items-center justify-between text-sm font-bold">
                <span className="text-caixa-blue">{store.distance}</span>
                <span className="text-slate-700">★ {store.rating}</span>
                <span className="text-emerald-600">{store.open ? "Abierto" : "Cerrado"}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="juanias" className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-8 rounded-[2rem] bg-caixa-navy p-6 text-white shadow-soft md:grid-cols-[0.9fr_1.1fr] md:p-10">
          <div>
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-caixa-blue">
              <Bot className="h-10 w-10" />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-caixa-yellow">JuanIAs</p>
            <h2 className="mt-2 text-4xl font-black">Asistente conversacional con acciones reales</h2>
            <p className="mt-4 leading-7 text-blue-100">Debe recordar contexto, buscar productos reales, filtrar por distancia, ordenar resultados, aplicar cupones y modificar el carrito. No puede inventar stock ni precios.</p>
          </div>
          <div className="rounded-3xl bg-white p-5 text-caixa-ink">
            <p className="mb-4 font-black">Sugerencias predefinidas</p>
            <div className="grid gap-3 md:grid-cols-2">
              {juaniasSuggestions.map((suggestion) => (
                <button key={suggestion} className="rounded-2xl border border-blue-100 bg-caixa-sky px-4 py-3 text-left text-sm font-bold text-caixa-navy">{suggestion}</button>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-blue-100 p-4">
              <p className="text-sm font-semibold text-slate-500">Ejemplo de accion</p>
              <p className="mt-1 font-black">“Anade las pinzas pequenas al carrito y aplica FINBROADPEAK26”</p>
            </div>
          </div>
        </div>
      </section>

      <section id="operacion" className="mx-auto max-w-7xl px-5 py-14">
        <SectionTitle eyebrow="Operacion real" title="Lo que queda preparado desde el inicio" text="La web se construye pensando en producto full-stack: datos, permisos, estados, auditoria y despliegue real en Vercel." />
        <div className="grid gap-4 md:grid-cols-3">
          {platformModules.map((module) => (
            <div key={module} className="flex gap-3 rounded-2xl border border-blue-100 bg-white p-4 shadow-soft">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-caixa-blue" />
              <p className="text-sm font-bold text-slate-700">{module}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="portales" className="mx-auto grid max-w-7xl gap-5 px-5 py-14 md:grid-cols-3">
        {[{ icon: Users, title: "Portal usuario", text: "Pedidos navegables, carrito, direcciones, codigo de recogida, incidencias, devoluciones y resenas." }, { icon: Building2, title: "Portal comercio", text: "Productos, stock, promociones, pedidos, confirmaciones, ventas, resenas y liquidaciones simuladas." }, { icon: ShieldCheck, title: "Backoffice admin", text: "Gobierno de comercios, productos, cupones, incidencias, auditoria, metricas y contenido." }].map((card) => (
          <article key={card.title} className="rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-soft">
            <card.icon className="h-10 w-10 text-caixa-blue" />
            <h3 className="mt-4 text-2xl font-black text-caixa-ink">{card.title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{card.text}</p>
          </article>
        ))}
      </section>

      <footer className="border-t border-blue-100 bg-white px-5 py-8 text-center text-sm font-semibold text-slate-500">
        faciliteaGO by CaixaBank · Demo Broad Peak · Pago externo simulado, operativa interna real
      </footer>
    </main>
  );
}
