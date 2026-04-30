"use client";

import { useEffect } from "react";

function findCouponInput() {
  const inputs = Array.from(document.querySelectorAll<HTMLInputElement>("input"));
  return inputs.find((input) => {
    const text = `${input.placeholder || ""} ${input.value || ""}`.toUpperCase();
    return text.includes("FINBROADPEAK26") || text.includes("CUPON") || text.includes("CUPÓN") || text.includes("PROMOCIONAL");
  });
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
}

function readCartForSummary() {
  try {
    return JSON.parse(window.localStorage.getItem("faciliteago-cart") || "[]") as Array<{ name: string; store: string; quantity: number; price: number }>;
  } catch {
    return [];
  }
}

function getDeliveryModeText() {
  const selectedPickup = Array.from(document.querySelectorAll("button")).find((button) => {
    const text = (button.textContent || "").toLowerCase();
    const cls = button.getAttribute("class") || "";
    return text.includes("recogida en comercio") && cls.includes("bg-blue-50");
  });
  return selectedPickup ? "Recogida en comercio" : "Envío a domicilio";
}

function getPickupStoresFromCheckout() {
  const articles = Array.from(document.querySelectorAll("article"));
  return articles
    .map((article) => article.textContent || "")
    .filter((text) => text.includes("producto(s) para recoger"))
    .map((text) => text.replace(/\s+/g, " ").trim());
}

function getAddressFromCheckout() {
  const inputs = Array.from(document.querySelectorAll<HTMLInputElement>("input"));
  const visibleValues = inputs
    .map((input) => input.value?.trim())
    .filter(Boolean)
    .filter((value) => !value.toUpperCase().includes("FINBROADPEAK26"));
  return visibleValues.slice(0, 5).join(" · ");
}

function showPaymentVerificationOverlay() {
  const existing = document.getElementById("faciliteago-payment-verification");
  existing?.remove();

  const style = document.createElement("style");
  style.id = "faciliteago-payment-verification-style";
  style.textContent = `
    @keyframes faciliteagoSpin { to { transform: rotate(360deg); } }
    @keyframes faciliteagoPulse { 0%, 100% { opacity: 1; } 50% { opacity: .55; } }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.id = "faciliteago-payment-verification";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.zIndex = "99999";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.background = "rgba(15, 23, 42, 0.46)";
  overlay.style.backdropFilter = "blur(7px)";

  overlay.innerHTML = `
    <div style="width:min(420px,calc(100vw - 32px)); border-radius:32px; background:white; padding:34px 28px; text-align:center; box-shadow:0 30px 90px rgba(15,23,42,.32); border:1px solid rgba(0,114,206,.18);">
      <div style="margin:0 auto 18px; width:72px; height:72px; border-radius:999px; border:7px solid #EAF3FF; border-top-color:#0072CE; animation:faciliteagoSpin .8s linear infinite;"></div>
      <p style="margin:0; color:#002B5C; font-size:26px; line-height:1.15; font-weight:900; font-family:inherit;">Verificando compra</p>
      <p style="margin:10px 0 0; color:#475569; font-size:15px; line-height:1.6; font-weight:700; font-family:inherit;">Estamos validando el pago y preparando la confirmación del pedido.</p>
      <div style="margin:22px auto 0; display:flex; justify-content:center; gap:6px;">
        <span style="width:8px;height:8px;border-radius:999px;background:#0072CE;animation:faciliteagoPulse .9s ease-in-out infinite;"></span>
        <span style="width:8px;height:8px;border-radius:999px;background:#0072CE;animation:faciliteagoPulse .9s ease-in-out .15s infinite;"></span>
        <span style="width:8px;height:8px;border-radius:999px;background:#0072CE;animation:faciliteagoPulse .9s ease-in-out .3s infinite;"></span>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
}

function hidePaymentVerificationOverlay() {
  document.getElementById("faciliteago-payment-verification")?.remove();
  document.getElementById("faciliteago-payment-verification-style")?.remove();
}

function showPurchaseSummaryOverlay(confirmButton: HTMLButtonElement) {
  const existing = document.getElementById("faciliteago-purchase-summary");
  existing?.remove();

  const cart = readCartForSummary();
  const deliveryMode = getDeliveryModeText();
  const isPickup = deliveryMode === "Recogida en comercio";
  const pickupStores = getPickupStoresFromCheckout();
  const address = getAddressFromCheckout();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const coupon = (findCouponInput()?.value || "").trim().toUpperCase();
  const discountRate = coupon === "FINBROADPEAK26" ? 15 : 0;
  const discount = discountRate ? Math.min(subtotal * 0.15, 15) : 0;
  const shipping = isPickup ? 0 : 2.95;
  const total = Math.max(subtotal - discount + shipping, 0);

  const overlay = document.createElement("div");
  overlay.id = "faciliteago-purchase-summary";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.zIndex = "99999";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.background = "rgba(15, 23, 42, 0.48)";
  overlay.style.backdropFilter = "blur(7px)";
  overlay.style.padding = "18px";

  const itemsHtml = cart.map((item) => `
    <div style="display:flex;justify-content:space-between;gap:14px;padding:12px 0;border-bottom:1px solid #EAF3FF;">
      <div>
        <p style="margin:0;color:#0F172A;font-weight:900;font-size:15px;">${item.quantity}x ${item.name}</p>
        <p style="margin:4px 0 0;color:#64748B;font-weight:700;font-size:12px;">${item.store}</p>
      </div>
      <p style="margin:0;color:#0072CE;font-weight:900;white-space:nowrap;">${formatMoney(item.price * item.quantity)}</p>
    </div>
  `).join("");

  const pickupHtml = pickupStores.length
    ? pickupStores.map((store) => `<li style="margin:8px 0;color:#334155;font-weight:700;line-height:1.45;">${store}</li>`).join("")
    : `<li style="margin:8px 0;color:#334155;font-weight:700;">Recogida en los comercios indicados en el pedido.</li>`;

  overlay.innerHTML = `
    <div style="width:min(760px,calc(100vw - 28px));max-height:calc(100vh - 36px);overflow:auto;border-radius:32px;background:white;box-shadow:0 30px 90px rgba(15,23,42,.34);border:1px solid rgba(0,114,206,.18);">
      <div style="padding:26px 28px;background:#002B5C;color:white;">
        <p style="margin:0;color:#7DD3FC;font-weight:900;font-size:13px;letter-spacing:.14em;text-transform:uppercase;">Compra verificada</p>
        <h2 style="margin:8px 0 0;font-size:32px;line-height:1.1;font-weight:900;">Resumen de tu compra</h2>
        <p style="margin:10px 0 0;color:#DBEAFE;font-weight:700;">Revisa el detalle antes de guardar el pedido.</p>
      </div>
      <div style="padding:24px 28px;display:grid;gap:18px;">
        <section style="border:1px solid #D8EAFE;border-radius:22px;padding:18px;background:#F8FBFF;">
          <h3 style="margin:0 0 8px;color:#002B5C;font-size:20px;font-weight:900;">Detalle de compra</h3>
          ${itemsHtml || `<p style="font-weight:700;color:#64748B;">No hay productos en el carrito.</p>`}
        </section>
        <section style="border:1px solid #D8EAFE;border-radius:22px;padding:18px;">
          <h3 style="margin:0 0 8px;color:#002B5C;font-size:20px;font-weight:900;">Entrega</h3>
          <p style="margin:0 0 10px;color:#0F172A;font-weight:900;">${deliveryMode}</p>
          ${isPickup ? `<ul style="padding-left:18px;margin:0;">${pickupHtml}</ul>` : `<p style="margin:0;color:#334155;font-weight:700;line-height:1.55;">${address || "Dirección de entrega informada en el checkout."}</p>`}
        </section>
        <section style="border:1px solid #D8EAFE;border-radius:22px;padding:18px;background:#F8FBFF;">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-weight:800;color:#334155;"><span>Subtotal</span><span>${formatMoney(subtotal)}</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-weight:800;color:#059669;"><span>Descuento${discountRate ? ` (${discountRate}%)` : ""}</span><span>-${formatMoney(discount)}</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;font-weight:800;color:#334155;"><span>${isPickup ? "Recogida" : "Envío"}</span><span>${formatMoney(shipping)}</span></div>
          <div style="display:flex;justify-content:space-between;border-top:1px solid #D8EAFE;padding-top:14px;font-size:24px;font-weight:900;color:#002B5C;"><span>Total</span><span>${formatMoney(total)}</span></div>
        </section>
        <div style="display:flex;gap:12px;justify-content:flex-end;flex-wrap:wrap;">
          <button id="faciliteago-summary-back" style="border:0;border-radius:18px;background:#EAF3FF;color:#002B5C;padding:14px 20px;font-weight:900;cursor:pointer;">Volver al checkout</button>
          <button id="faciliteago-summary-confirm" style="border:0;border-radius:18px;background:#0072CE;color:white;padding:14px 22px;font-weight:900;cursor:pointer;box-shadow:0 14px 34px rgba(0,114,206,.28);">Ver mis pedidos</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.getElementById("faciliteago-summary-back")?.addEventListener("click", () => overlay.remove());
  document.getElementById("faciliteago-summary-confirm")?.addEventListener("click", () => {
    window.sessionStorage.setItem("faciliteago-payment-verified", "true");
    overlay.remove();
    confirmButton.click();
  });
}

export default function CheckoutRedirectGuard() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");
      if (!button) return;
      const text = (button.textContent || "").trim().toLowerCase();

      const isFinalConfirmButton = window.location.pathname === "/checkout" && text.includes("confirmar pedido");
      if (isFinalConfirmButton) {
        const alreadyVerified = window.sessionStorage.getItem("faciliteago-payment-verified") === "true";
        if (alreadyVerified) {
          window.sessionStorage.removeItem("faciliteago-payment-verified");
          return;
        }

        const cart = window.localStorage.getItem("faciliteago-cart");
        if (!cart || cart === "[]") return;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        showPaymentVerificationOverlay();

        window.setTimeout(() => {
          hidePaymentVerificationOverlay();
          showPurchaseSummaryOverlay(button);
        }, 2000);
        return;
      }

      if (window.location.pathname === "/checkout") return;
      const isCheckoutButton = text.includes("finalizar compra") || text.includes("finalizar pedido") || text.includes("confirmar compra");
      if (!isCheckoutButton) return;

      const cart = window.localStorage.getItem("faciliteago-cart");
      if (!cart || cart === "[]") return;

      const coupon = findCouponInput()?.value?.trim();
      if (coupon) window.localStorage.setItem("faciliteago-checkout-coupon", coupon.toUpperCase());

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      window.location.href = "/checkout";
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
