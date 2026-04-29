import { describe, expect, it } from "vitest";
import { assertStockAvailable, calculateDiscount, generatePickupCode, simulatePayment } from "./business-rules";

describe("business rules", () => {
  it("applies FINBROADPEAK26 with cap", () => {
    expect(calculateDiscount(100, "FINBROADPEAK26")).toBe(15);
    expect(calculateDiscount(20, "FINBROADPEAK26")).toBe(3);
  });

  it("simulates payment scenarios", () => {
    expect(simulatePayment(10, "approved").status).toBe("AUTHORIZED");
    expect(simulatePayment(10, "rejected").status).toBe("FAILED");
    expect(simulatePayment(10, "pending").status).toBe("PENDING");
  });

  it("generates pickup code", () => {
    expect(generatePickupCode("GO-1024")).toBe("GO-1024");
  });

  it("protects stock", () => {
    expect(() => assertStockAvailable(1, 2)).toThrow("Stock insuficiente");
  });
});
