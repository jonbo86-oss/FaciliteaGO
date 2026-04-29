import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: "faciliteaGO",
    paymentProvider: "SIMULATOR",
    timestamp: new Date().toISOString()
  });
}
