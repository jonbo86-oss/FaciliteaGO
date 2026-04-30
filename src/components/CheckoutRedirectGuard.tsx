"use client";

import { useEffect } from "react";

function findCouponInput() {
  const inputs = Array.from(document.querySelectorAll<HTMLInputElement>("input"));
  return inputs.find((input) => {
    const text = `${input.placeholder || ""} ${input.value || ""}`.toUpperCase();
    return text.includes("FINBROADPEAK26") || text.includes("CUPON") || text.includes("CUPÓN") || text.includes("PROMOCIONAL");
  });
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
          window.sessionStorage.setItem("faciliteago-payment-verified", "true");
          hidePaymentVerificationOverlay();
          button.click();
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
