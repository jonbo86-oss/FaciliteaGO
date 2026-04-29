import { BarChart3, Boxes, CheckCircle2, PackageCheck, PackageX, Star, Store } from "lucide-react";

const merchantOrders = [
  { id: "MO-778", buyer: "Cliente demo", status: "Pendiente de confirmacion", total: "14,85 €", items: "Pinzas pequenas + guantes" },
  { id: "MO-777", buyer: "Cliente demo", status: "Preparando", total: "9,95 €", items: "Tornillos + cinta" }
];

export default function MerchantPortalPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] bg-caixa-navy p-8 text-white shadow-soft">
          <div className="flex items-center gap-4">
            <div className="rounded-3xl bg-white p-4 text-caixa-blue"><Store className="h-10 w-10" /></div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-caixa-yellow">Portal comercio</p>
              <h1 className="text-4xl font-black">Ferreteria Ramblas Pro</h1>
              <p className="mt-2 text-blue-100">Gestion real de productos, stock, promociones, pedidos, resenas y liquidaciones simuladas.</p>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[{ label: "Pedidos pendientes", value: "12", icon: PackageCheck }, { label: "Stock bajo", value: "7", icon: Boxes }, { label: "Ventas hoy", value: "284 €", icon: BarChart3 }, { label: "Valoracion", value: "4,8", icon: Star }].map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-blue-100 bg-caixa-sky p-5 shadow-soft">
              <metric.icon className="h-6 w-6 text-caixa-blue" />
              <p className="mt-4 text-3xl font-black text-caixa-navy">{metric.value}</p>
              <p className="text-sm font-bold text-slate-500">{metric.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-5">
          {merchantOrders.map((order) => (
            <article key={order.id} className="rounded-3xl border border-blue-100 bg-white p-6 shadow-soft">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-bold text-slate-500">Subpedido {order.id}</p>
                  <h2 className="text-2xl font-black text-caixa-ink">{order.items}</h2>
                  <p className="mt-1 font-bold text-caixa-blue">{order.status} · {order.total}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white"><CheckCircle2 className="h-4 w-4" /> Confirmar</button>
                  <button className="flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-700"><PackageX className="h-4 w-4" /> Rechazar</button>
                  <button className="rounded-full bg-caixa-blue px-4 py-2 text-sm font-bold text-white">Marcar listo</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
