export type PaymentScenario = "approved" | "rejected" | "pending" | "technical_error";

export function calculateDiscount(total: number, couponCode?: string) {
  if (!couponCode) return 0;
  if (couponCode.toUpperCase() === "FINBROADPEAK26") {
    return Math.min(total * 0.15, 15);
  }
  return 0;
}

export function generatePickupCode(orderNumber: string) {
  const suffix = orderNumber.replace(/\D/g, "").slice(-4).padStart(4, "0");
  return `GO-${suffix}`;
}

export function simulatePayment(amount: number, scenario: PaymentScenario = "approved") {
  if (amount <= 0) {
    return { status: "FAILED", message: "El importe debe ser superior a cero" } as const;
  }

  if (scenario === "rejected") {
    return { status: "FAILED", message: "Pago rechazado por el simulador" } as const;
  }

  if (scenario === "pending") {
    return { status: "PENDING", message: "Pago pendiente de confirmacion" } as const;
  }

  if (scenario === "technical_error") {
    return { status: "FAILED", message: "Error tecnico simulado" } as const;
  }

  return { status: "AUTHORIZED", message: "Pago autorizado por simulador" } as const;
}

export function assertCanReview(hasDeliveredOrder: boolean) {
  if (!hasDeliveredOrder) {
    throw new Error("Solo se pueden crear resenas verificadas desde pedidos entregados");
  }
}

export function assertStockAvailable(stockAvailable: number, requestedQuantity: number) {
  if (requestedQuantity <= 0) throw new Error("La cantidad debe ser superior a cero");
  if (stockAvailable < requestedQuantity) throw new Error("Stock insuficiente");
}
