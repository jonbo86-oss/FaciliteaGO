import { MapPin, Search, Star, Store } from "lucide-react";
import { getMerchants } from "@/lib/merchants";

export default function ComerciosPage({ searchParams }: { searchParams?: { q?: string } }) {
  const q = (searchParams?.q ?? "").toLowerCase().trim();
  const merchants = getMerchants().filter((merchant) => {
    if (!q) return true;
    return [merchant.name, merchant.mainCategory, merchant.district, merchant.address].join(" ").toLowerCase().includes(q);
  });

  return (
    <main className="min-h-screen bg-[#f4f8ff] text-slate-950">
      <header className="border-b border-blue-100 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0072CE] text-lg font-black text-white shadow-lg">GO</div>
            <div><p className="text-lg font-black text-[#002B5C]">faciliteaGO</p><p className="text-xs font-bold text-slate-500">Comercios locales</p></div>
          </a>
          <a href="/" className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-[#002B5C]">Volver al marketplace</a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="overflow-hidden rounded-[32px] bg-cover bg-center shadow-2xl" style={{ backgroundImage: "linear-gradient(rgba(0,43,92,0.78), rgba(0,43,92,0.78)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80')" }}>
          <div className="p-6 text-white md:p-10">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">Directorio local</span>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">Busca comercios y descubre todo lo que venden.</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">Encuentra tiendas cercanas, revisa su ubicación y compra directamente productos disponibles para recoger.</p>
            <form className="mt-7 grid gap-3 rounded-3xl bg-white p-3 text-slate-900 md:grid-cols-[1fr_150px]" action="/comercios">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                <Search className="h-5 w-5 text-[#0072CE]" />
                <input name="q" defaultValue={q} placeholder="Busca ferretería, manga, regalos, tecnología..." className="w-full bg-transparent text-sm font-semibold outline-none" />
              </div>
              <button className="rounded-2xl bg-[#FFCC00] px-5 py-3 text-sm font-black text-[#002B5C]">Buscar</button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <div className="mb-5 rounded-[28px] bg-white p-5 shadow-xl">
          <p className="text-sm font-bold text-slate-500">{merchants.length} comercios encontrados</p>
          <h2 className="text-3xl font-black text-[#002B5C]">Comercios disponibles</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {merchants.map((merchant) => (
            <a key={merchant.slug} href={`/comercios/${merchant.slug}`} className="group overflow-hidden rounded-[28px] bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img src={merchant.heroImage} alt={merchant.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#002B5C]">{merchant.mainCategory}</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black text-slate-950">{merchant.name}</h3>
                    <p className="mt-1 text-sm font-bold text-slate-500">{merchant.products.length} productos disponibles</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-sm font-black text-[#002B5C]"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {merchant.rating}</div>
                </div>
                <div className="mt-4 space-y-2 text-sm font-bold text-slate-600">
                  <p className="flex gap-2"><Store className="h-4 w-4 text-[#0072CE]" /> {merchant.district}</p>
                  <p className="flex gap-2"><MapPin className="h-4 w-4 text-[#0072CE]" /> {merchant.address}</p>
                </div>
                <div className="mt-5 rounded-2xl bg-[#0072CE] px-4 py-3 text-center text-sm font-black text-white">Ver comercio</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
