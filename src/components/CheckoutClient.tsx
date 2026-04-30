"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, CreditCard, Home, MapPin, Minus, Plus, ShieldCheck, Store, Truck } from "lucide-react";
import { money, type MarketplaceProduct } from "@/lib/marketplace-products";

type CartLine = MarketplaceProduct & { quantity: number };
type UserData = { name?: string; email?: string; address?: string; phone?: string };

type CheckoutAddress = {
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(window.localStorage.getItem(key) || "") as T;
  } catch {
    return fallback;
  }
}

export default function CheckoutClient() {
  const router = useRouter();
  const [cart, setCart] = useState<CartLine[]>([]);
  const [coupon, setCoupon] = useState("");
  const [deliveryMode, setDeliveryMode] = useState<"pickup" | "home">("pickup");
  const [paymentMode, setPaymentMode] = useState<"installments" | "cash">("installments");
  const [address, setAddress] = useState<CheckoutAddress>({
    name: "",
    phone: "",
    address: "",
    city: "Barcelona",
    postalCode: "08002"
  });

  useEffect(() => {
    const savedCart = readJson<CartLine[]>("faciliteago-cart", []);
    const savedCoupon = window.localStorage.getItem("faciliteago-checkout-coupon") || "";
    const user = readJson<UserData | null>("faciliteago-user", null);
    const savedAddress = readJson<Partial<CheckoutAddress>>("faciliteago-address", {});
    setCart(savedCart);
    setCoupon(savedCoupon);
    setAddress({
      name: savedAddress.name || user?.name || "Jon",
      phone: savedAddress.phone || user?.phone || "600 123 456",
      address: savedAddress.address || user?.address || "La Rambla 89, 3º 2ª",
      city: savedAddress.city || "Barcelona",
      postalCode: savedAddress.postalCode || "08002"
    });
  }, []);

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const discountRate = coupon.toUpperCase() === "FINBROADPEAK26" ? 15 : 0;
  const discount = discountRate ? Math.min(subtotal * (discountRate / 100), 15) : 0;
  const shipping = deliveryMode === "home" && subtotal > 0 ? 2.95 : 0;
  const total = Math.max(subtotal - discount + shipping, 0);
  const storeCount = new Set(cart.map((item) => item.store)).size;

  function changeQuantity(id: string, delta: number) {
    setCart((current) => {
      const nextCart = current.flatMap((item) => {
        if (item.id !== id) return [item];
        const nextQty = item.quantity + delta;
        return nextQty <= 0 ? [] : [{ ...item, quantity: nextQty }];
      });
      window.localStorage.setItem("faciliteago-cart", JSON.stringify(nextCart));
      return nextCart;
    });
  }

  function applyCoupon() {
    window.localStorage.setItem("faciliteago-checkout-coupon", coupon.toUpperCase());
    setCoupon(coupon.toUpperCase());
  }

  function confirmOrder() {
    if (cart.length === 0) return;
    window.localStorage.setItem("faciliteago-address", JSON.stringify(address));
    const order = {
      id: `GO-${Date.now().toString().slice(-6)}`,
      status: "Pedido confirmado",
      store: cart.length === 1 ? cart[0].store : `${storeCount} comercios`,
      total: money(total),
      subtotal: money(subtotal),
      discount: money(discount),
      discountRate,
      shipping: money(shipping),
      deliveryMode: deliveryMode === "pickup" ? "Recogida en comercio" : "Envío a domicilio",
      paymentMode: paymentMode === "installments" ? "Pago en cuotas CaixaBank" : "Pago al contado",
      pickup: `PK-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString("es-ES"),
      address,
      items: cart.map((item) => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price, store: item.store }))
    };
    const existingOrders = readJson<any[]>("faciliteago-orders", []);
    window.localStorage.setItem("faciliteago-orders", JSON.stringify([order, ...existingOrders]));
    window.localStorage.setItem("faciliteago-cart", JSON.stringify([]));
    window.localStorage.removeItem("faciliteago-checkout-coupon");
    router.push("/usuario");
  }

  return (
    <main className="min-h-screen bg-[#f4f8ff] text-slate-950">
      <header className="border-b border-blue-100 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0072CE] text-lg font-black text-white">GO</div>
            <div><p className="font-black text-[#002B5C]">faciliteaGO</p><p className="text-xs font-bold text-slate-500">Checkout seguro</p></div>
          </a>
          <a href="/" className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-[#002B5C]">Volver al marketplace</a>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-4xl font-black text-[#002B5C]">Finalizar compra</h1>
        <p className="mt-2 font-semibold text-slate-600">Revisa la entrega, el pago y el resumen antes de confirmar el pedido.</p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-14 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="rounded-[28px] bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400 text-sm font-black text-[#002B5C]">1</span><h2 className="text-2xl font-black text-slate-950">Datos de envío</h2></div>
            <div className="grid gap-3 md:grid-cols-2">
              <button onClick={() => setDeliveryMode("pickup")} className={`rounded-2xl border px-4 py-4 text-left font-black transition ${deliveryMode === "pickup" ? "border-[#0072CE] bg-blue-50 text-[#002B5C]" : "border-slate-200 bg-white"}`}><Store className="mb-2 h-5 w-5" /> Recogida en comercio<p className="mt-1 text-xs font-semibold text-slate-500">Preparación rápida en los comercios seleccionados.</p></button>
              <button onClick={() => setDeliveryMode("home")} className={`rounded-2xl border px-4 py-4 text-left font-black transition ${deliveryMode === "home" ? "border-[#0072CE] bg-blue-50 text-[#002B5C]" : "border-slate-200 bg-white"}`}><Truck className="mb-2 h-5 w-5" /> Envío a domicilio<p className="mt-1 text-xs font-semibold text-slate-500">Entrega local simulada en Barcelona.</p></button>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} placeholder="Nombre y apellidos" className="rounded-2xl border border-blue-100 px-4 py-3 font-semibold outline-none" />
              <input value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} placeholder="Teléfono" className="rounded-2xl border border-blue-100 px-4 py-3 font-semibold outline-none" />
              <input value={address.address} onChange={(e) => setAddress({ ...address, address: e.target.value })} placeholder="Dirección" className="rounded-2xl border border-blue-100 px-4 py-3 font-semibold outline-none md:col-span-2" />
              <input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="Ciudad" className="rounded-2xl border border-blue-100 px-4 py-3 font-semibold outline-none" />
              <input value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} placeholder="Código postal" className="rounded-2xl border border-blue-100 px-4 py-3 font-semibold outline-none" />
            </div>
          </section>

          <section className="rounded-[28px] bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400 text-sm font-black text-[#002B5C]">2</span><h2 className="text-2xl font-black text-slate-950">Datos de pago</h2></div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between"><p className="font-bold text-slate-700">¿Tienes un código promocional?</p><ChevronDown className="h-5 w-5" /></div>
              <div className="mt-4 grid gap-3 md:grid-cols-[1fr_120px]">
                <input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Código promocional" className="rounded-xl border border-slate-300 px-4 py-3 text-lg font-semibold outline-none focus:border-[#0072CE]" />
                <button onClick={applyCoupon} className="rounded-xl bg-[#FFCC00] px-4 py-3 font-black text-[#002B5C]">APLICAR</button>
              </div>
              {discountRate > 0 && <p className="mt-3 text-sm font-black text-emerald-600">Cupón aplicado: {discountRate}% de descuento, máximo 15,00 €.</p>}
            </div>

            <div className="mt-5 grid gap-3 rounded-2xl border border-blue-100 bg-white p-4 md:grid-cols-2">
              <button onClick={() => setPaymentMode("installments")} className={`rounded-xl border px-4 py-3 font-black ${paymentMode === "installments" ? "border-[#002B5C] bg-blue-50 text-[#002B5C]" : "border-slate-200"}`}>En cuotas</button>
              <button onClick={() => setPaymentMode("cash")} className={`rounded-xl border px-4 py-3 font-black ${paymentMode === "cash" ? "border-[#002B5C] bg-blue-50 text-[#002B5C]" : "border-slate-200"}`}>Al contado</button>
            </div>

            {paymentMode === "installments" && (
              <div className="relative mt-5 rounded-2xl border border-[#002B5C] bg-white p-4">
                <span className="absolute -top-3 left-0 rounded-r bg-[#002B5C] px-3 py-1 text-sm font-black text-white">Exclusivo para clientes CaixaBank</span>
                <div className="mt-3 rounded-xl border border-[#002B5C] p-4 font-black text-[#002B5C]"><span className="mr-2 inline-flex h-4 w-4 rounded-full bg-emerald-400 ring-4 ring-[#002B5C]" /> Pago con tu tarjeta de crédito <span className="float-right">0% Intereses</span></div>
                <p className="mt-5 font-black">Ingresa los datos de tu tarjeta CaixaBank</p>
                <PaymentFields />
                <div className="mt-5 rounded-xl bg-blue-50 p-4 text-sm leading-6 text-slate-700"><p className="font-black text-[#002B5C]">Información de la oferta</p><p><strong>Condiciones de financiación:</strong> fracciona la compra con tu tarjeta CaixaBank Payments & Consumer, utilizando el crédito que ya tienes concedido en ella.</p></div>
              </div>
            )}
            {paymentMode === "cash" && <div className="mt-5 rounded-2xl border border-blue-100 bg-white p-4"><p className="font-black">Ingresa los datos de tu tarjeta</p><PaymentFields /></div>}
          </section>
        </div>

        <aside className="h-fit rounded-[28px] bg-white p-6 shadow-xl lg:sticky lg:top-6">
          <div className="mb-5 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400 text-sm font-black text-[#002B5C]">3</span><h2 className="text-2xl font-black text-slate-950">Resumen</h2></div>
          <div className="space-y-3">
            {cart.length === 0 ? <div className="rounded-2xl bg-blue-50 p-4 font-bold text-slate-500">El carrito está vacío.</div> : cart.map((item) => (
              <div key={item.id} className="rounded-2xl border border-blue-100 p-3">
                <div className="flex items-start justify-between gap-3"><div><p className="font-black text-slate-950">{item.name}</p><p className="text-xs font-bold text-slate-500">{item.store}</p></div><p className="font-black text-[#0072CE]">{money(item.price * item.quantity)}</p></div>
                <div className="mt-3 flex items-center gap-2"><button onClick={() => changeQuantity(item.id, -1)} className="rounded-full bg-slate-100 p-1"><Minus className="h-4 w-4" /></button><span className="text-sm font-black">{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} className="rounded-full bg-slate-100 p-1"><Plus className="h-4 w-4" /></button></div>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2 border-t border-blue-100 pt-5 text-sm font-bold">
            <div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <div className="flex justify-between text-emerald-600"><span>Descuento{discountRate ? ` (${discountRate}%)` : ""}</span><span>-{money(discount)}</span></div>
            <div className="flex justify-between"><span>{deliveryMode === "home" ? "Envío a domicilio" : "Recogida en comercio"}</span><span>{money(shipping)}</span></div>
            <div className="flex justify-between border-t border-blue-100 pt-3 text-2xl font-black text-[#002B5C]"><span>Total</span><span>{money(total)}</span></div>
          </div>
          <button onClick={confirmOrder} disabled={cart.length === 0} className="mt-6 w-full rounded-2xl bg-[#0072CE] px-5 py-4 font-black text-white shadow-lg transition hover:bg-[#005fb0] disabled:cursor-not-allowed disabled:opacity-50"><ShieldCheck className="mr-2 inline h-5 w-5" /> Confirmar pedido</button>
          <p className="mt-4 text-center text-xs font-semibold text-slate-500">Pago y envío simulados para facilitar la experiencia de compra.</p>
        </aside>
      </section>
    </main>
  );
}

function PaymentFields() {
  return (
    <div className="mt-4 grid gap-4">
      <label className="grid gap-2 text-sm font-bold text-[#002B5C]">Número de tarjeta<div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3"><CreditCard className="h-6 w-6 text-slate-300" /><input placeholder="Número de tarjeta" className="w-full outline-none" /></div></label>
      <label className="grid gap-2 text-sm font-bold text-[#002B5C]">Vencimiento (MM/AA)<input placeholder="Vencimiento (MM/AA)" className="rounded-xl border border-slate-200 px-4 py-3 outline-none" /></label>
      <label className="grid gap-2 text-sm font-bold text-[#002B5C]">CVV<input placeholder="CVV" className="rounded-xl border border-slate-200 px-4 py-3 outline-none" /></label>
    </div>
  );
}
