import { CheckCircle2, CreditCard, Home, KeyRound, Lock, MapPin, Package, RotateCcw, ShieldCheck, Star, Ticket, Truck, UserRound } from "lucide-react";

const orders = [
  { id: "GO-1024", status: "Listo para recoger", store: "Ferreteria Ramblas Pro", total: "12,45 €", pickup: "GO-1024", date: "29/04/2026" },
  { id: "GO-1023", status: "Entregado", store: "DulceRaval", total: "8,90 €", pickup: "GO-1023", date: "26/04/2026" }
];

function Card({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return <article className="rounded-3xl bg-white p-6 shadow-soft"><div className="mb-4 flex items-center gap-3"><div className="rounded-2xl bg-caixa-sky p-3 text-caixa-blue"><Icon className="h-6 w-6" /></div><h2 className="text-2xl font-black text-caixa-ink">{title}</h2></div>{children}</article>;
}

export default function UserPortalPage() {
  return (
    <main className="min-h-screen bg-caixa-sky px-5 py-8">
      <section className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 rounded-[2rem] bg-caixa-navy p-7 text-white shadow-soft md:flex-row md:items-center">
          <div><a href="/" className="text-sm font-bold text-blue-100">← Volver al marketplace</a><p className="mt-4 text-sm font-bold uppercase tracking-[0.25em] text-caixa-yellow">Area cliente</p><h1 className="mt-2 text-4xl font-black">Mi cuenta faciliteaGO</h1><p className="mt-3 max-w-2xl text-blue-100">Perfil, direcciones, pagos, seguridad, pedidos y preferencias de envio.</p></div>
          <div className="rounded-3xl bg-white/10 p-5"><UserRound className="h-10 w-10 text-caixa-yellow" /><p className="mt-3 font-black">Cliente demo</p><p className="text-sm text-blue-100">cliente@demo.com</p></div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-6">
            <Card title="Direccion principal" icon={Home}><div className="space-y-3 text-sm font-semibold text-slate-600"><p className="font-black text-caixa-navy">Carrer de la Portaferrissa 12, 08002 Barcelona</p><p>Referencia: cerca de Las Ramblas</p><p className="flex items-center gap-2 text-caixa-blue"><MapPin className="h-4 w-4" /> Ubicacion activa para busquedas locales</p><button className="rounded-2xl bg-caixa-blue px-4 py-2 font-bold text-white">Editar direccion</button></div></Card>
            <Card title="Metodo de pago" icon={CreditCard}><div className="space-y-3 text-sm font-semibold text-slate-600"><p className="font-black text-caixa-navy">Tarjeta CaixaBank terminada en 4521</p><p>Pago externo simulado en esta demo.</p><button className="rounded-2xl bg-caixa-blue px-4 py-2 font-bold text-white">Cambiar metodo</button></div></Card>
            <Card title="Metodo de envio preferido" icon={Truck}><div className="space-y-3 text-sm font-semibold text-slate-600"><p className="font-black text-caixa-navy">Click & collect</p><p>Priorizar recogida en tienda frente a entrega local.</p><div className="grid gap-2"><label className="rounded-2xl bg-blue-50 px-4 py-3"><input type="radio" defaultChecked className="mr-2" /> Recogida en tienda</label><label className="rounded-2xl bg-blue-50 px-4 py-3"><input type="radio" className="mr-2" /> Entrega local cuando este disponible</label></div></div></Card>
            <Card title="Seguridad" icon={ShieldCheck}><div className="grid gap-3 text-sm font-semibold text-slate-600"><button className="flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 text-left font-bold text-caixa-navy"><KeyRound className="h-4 w-4" /> Cambiar contrasena</button><button className="flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 text-left font-bold text-caixa-navy"><Lock className="h-4 w-4" /> Activar doble factor</button><button className="rounded-2xl bg-white px-4 py-3 text-left font-bold text-caixa-navy ring-1 ring-blue-100">Cerrar sesiones abiertas</button></div></Card>
          </div>

          <div className="grid gap-6">
            <Card title="Resumen" icon={CheckCircle2}><div className="grid gap-4 md:grid-cols-3">{[{ label: "Pedidos", value: "12" }, { label: "Ahorro", value: "38,40 €" }, { label: "Comercios", value: "7" }].map((item) => <div key={item.label} className="rounded-2xl bg-blue-50 p-4"><p className="text-3xl font-black text-caixa-blue">{item.value}</p><p className="text-sm font-bold text-slate-500">{item.label}</p></div>)}</div></Card>
            <Card title="Pedidos" icon={Package}><div className="grid gap-4">{orders.map((order) => <article key={order.id} className="rounded-3xl border border-blue-100 bg-white p-5"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><p className="text-sm font-bold text-slate-500">Pedido {order.id} · {order.date}</p><h3 className="text-2xl font-black text-caixa-ink">{order.store}</h3><p className="mt-1 font-bold text-caixa-blue">{order.status} · {order.total}</p></div><div className="rounded-2xl bg-caixa-sky px-5 py-4 text-center"><p className="text-xs font-bold text-slate-500">Codigo recogida</p><p className="text-2xl font-black text-caixa-navy">{order.pickup}</p></div></div><div className="mt-5 flex flex-wrap gap-3"><button className="flex items-center gap-2 rounded-full bg-caixa-blue px-4 py-2 text-sm font-bold text-white"><Package className="h-4 w-4" /> Ver detalle</button><button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-caixa-navy ring-1 ring-blue-100"><RotateCcw className="h-4 w-4" /> Devolucion</button><button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-caixa-navy ring-1 ring-blue-100"><Ticket className="h-4 w-4" /> Incidencia</button><button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-caixa-navy ring-1 ring-blue-100"><Star className="h-4 w-4" /> Valorar</button></div></article>)}</div></Card>
          </div>
        </div>
      </section>
    </main>
  );
}
