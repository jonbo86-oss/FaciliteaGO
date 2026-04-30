"use client";

import { useEffect } from "react";

function findCouponInput() {
  const inputs = Array.from(document.querySelectorAll<HTMLInputElement>("input"));
  return inputs.find((input) => {
    const text = `${input.placeholder || ""} ${input.value || ""}`.toUpperCase();
    return text.includes("FINBROADPEAK26") || text.includes("CUPON") || text.includes("CUPÓN") || text.includes("PROMOCIONAL");
  });
}

export default function CheckoutRedirectGuard() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (window.location.pathname === "/checkout") return;
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");
      if (!button) return;
      const text = (button.textContent || "").trim().toLowerCase();
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
