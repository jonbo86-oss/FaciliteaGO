import { NextRequest, NextResponse } from "next/server";
import { juaniasSuggestions, promotions } from "@/lib/demo-data";

const supportedActions = [
  "searchProducts",
  "filterProducts",
  "sortProducts",
  "getNearbyStores",
  "addToCart",
  "removeFromCart",
  "showCart",
  "applyCoupon",
  "getOrderStatus",
  "recommendBundle"
];

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const action = body?.action ?? "searchProducts";

  if (!supportedActions.includes(action)) {
    return NextResponse.json({ error: "Accion no soportada", supportedActions }, { status: 400 });
  }

  return NextResponse.json({
    assistant: "JuanIAs",
    action,
    rememberedContext: {
      location: "Las Ramblas, Barcelona",
      lastSearch: body?.query ?? "promociones cercanas"
    },
    suggestions: juaniasSuggestions,
    products: promotions,
    requiresConfirmation: ["createOrder", "cancelOrder", "requestRefund"].includes(action)
  });
}
