import { AlertTriangle, Building2, ClipboardList, LineChart, ShieldCheck } from "lucide-react";

const metrics = [
  { label: "Comercios activos", value: "86", icon: Building2 },
  { label: "Pedidos hoy", value: "142", icon: ClipboardList },
  { label: "GMV demo", value: "6.842 €", icon: LineChart },
  { label: "Incidencias abiertas", value: "9", icon: AlertTriangle }
];

const governanceQueue = [
  "Aprobar comercio pendiente",
  "Revisar producto en moderacion",
  "Resolver incidencia prioritaria",
  "Publicar promocion FINBROADPEAK26",
  "Revisar cambio de stock",
  "Moderar resenas pendientes"
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-caixa-sky px-5 py-10">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-caixa-blue">Backoffice admin</p>
        <h1 className="mt-2 text-4xl font-black text-caixa-ink">Gobierno completo del marketplace</h1>
        <p className="mt-3 max-w-3xl text-slate-600">Control de comercios, productos, pedidos, promociones, incidencias, logs, metricas, contenido y operacion.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-3xl bg-white p-5 shadow-soft">
              <metric.icon className="h-7 w-7 text-caixa-blue" />
              <p className="mt-4 text-3xl font-black text-caixa-navy">{metric.value}</p>
              <p className="text-sm font-bold text-slate-500">{metric.label}</p>
            </article>
          ))}
        </div>

        <article className="mt-8 rounded-3xl bg-white p-6 shadow-soft">
          <div className="mb-5 flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-caixa-blue" />
            <h2 className="text-2xl font-black text-caixa-ink">Cola de gobierno</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {governanceQueue.map((action) => (
              <div key={action} className="rounded-2xl border border-blue-100 px-4 py-3 text-sm font-bold text-slate-700">{action}</div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
