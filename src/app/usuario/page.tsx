import { CheckCircle2, Package, RotateCcw, Star, Ticket } from "lucide-react";

const orders = [
  { id: "GO-1024", status: "Listo para recoger", store: "Ferreteria Ramblas Pro", total: "12,45 €", pickup: "GO-1024" },
  { id: "GO-1023", status: "Entregado", store: "DulceRaval", total: "8,90 €", pickup: "GO-1023" }
];

export default function UserPortalPage() {
  return (
    <main className="min-h-screen bg-caixa-sky px-5 py-10">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-caixa-blue">Portal usuario</p>
        <h1 className="mt-2 text-4xl font-black text-caixa-ink">Tus compras en faciliteaGO</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Historico navegable, estados de pedido, codigo de recogida, devoluciones, incidencias y resenas verificadas.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {["Pedidos", "Cupones", "Incidencias", "Resenas"].map((item) => <div key={item} className="rounded-2xl bg-white p-5 font-black text-caixa-navy shadow-soft">{item}</div>)}
        </div>
        <div className="mt-8 grid gap-5">
          {orders.map((order) => (
            <article key={order.id} className="rounded-3xl bg-white p-6 shadow-soft">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-bold text-slate-500">Pedido {order.id}</p>
                  <h2 className="text-2xl font-black text-caixa-ink">{order.store}</h2>
                  <p className="mt-1 font-bold text-caixa-blue">{order.status}</p>
                </div>
                <div className="rounded-2xl bg-caixa-sky px-5 py-4 text-center">
                  <p className="text-xs font-bold text-slate-500">Codigo recogida</p>
                  <p className="text-2xl font-black text-caixa-navy">{order.pickup}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button className="flex items-center gap-2 rounded-full bg-caixa-blue px-4 py-2 text-sm font-bold text-white"><Package className="h-4 w-4" /> Ver detalle</button>
                <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-caixa-navy ring-1 ring-blue-100"><RotateCcw className="h-4 w-4" /> Solicitar devolucion</button>
                <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-caixa-navy ring-1 ring-blue-100"><Ticket className="h-4 w-4" /> Abrir incidencia</button>
                <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-caixa-navy ring-1 ring-blue-100"><Star className="h-4 w-4" /> Valorar</button>
              </div>
              <div className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-600"><CheckCircle2 className="h-4 w-4" /> Pedido persistente preparado para BD</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
