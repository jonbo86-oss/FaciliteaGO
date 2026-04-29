import { NextRequest, NextResponse } from "next/server";
import { simulatePayment, type PaymentScenario } from "@/lib/business-rules";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const amount = Number(body?.amount ?? 0);
  const scenario = (body?.scenario ?? "approved") as PaymentScenario;

  const result = simulatePayment(amount, scenario);

  return NextResponse.json({
    provider: "SIMULATOR",
    amount,
    scenario,
    ...result,
    eventId: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  });
}
