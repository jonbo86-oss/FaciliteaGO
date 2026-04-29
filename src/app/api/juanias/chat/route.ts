import { NextResponse } from "next/server";
import { marketplaceProducts, money } from "@/lib/marketplace-products";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  store: string;
};

const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function localRecommendations(message: string) {
  const q = normalize(message);
  const scored = marketplaceProducts
    .map((product) => {
      const haystack = normalize([product.name, product.category, product.description, product.store, product.district].join(" "));
      let score = 0;
      q.split(/\s+/).filter(Boolean).forEach((token) => {
        if (haystack.includes(token)) score += 2;
      });
      if (q.includes("niño") || q.includes("nino") || q.includes("regalo")) {
        if (["Juguetería", "Tiendas de cómic y manga", "Gaming y videojuegos", "Souvenirs y regalos", "Regalos personalizados"].includes(product.category)) score += 4;
      }
      if (q.includes("reforma") || q.includes("herramienta") || q.includes("bricolaje")) {
        if (product.category === "Ferretería y bricolaje") score += 5;
      }
      if (q.includes("cerca") || q.includes("cercania") || q.includes("cercanía")) score += Math.max(0, 3 - product.distance);
      if (product.oldPrice) score += 1;
      return { product, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.product.distance - b.product.distance)
    .slice(0, 4)
    .map((item) => item.product);

  return scored.length ? scored : marketplaceProducts.slice(0, 4);
}

function fallbackReply(message: string) {
  const picks = localRecommendations(message);
  const lines = picks.map((p) => `• ${p.name} (${p.store}) - ${money(p.price)}, a ${p.distance.toFixed(2)} km, recogida ${p.pickup}.`).join("\n");
  return `Te propongo estas opciones reales del catálogo:\n${lines}\n\nPuedes pedirme que filtre por cercanía, precio, promociones o tipo de comercio.`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = String(body?.message || "").slice(0, 1200);
    const history = (Array.isArray(body?.history) ? body.history : []) as ChatMessage[];
    const cart = (Array.isArray(body?.cart) ? body.cart : []) as CartItem[];
    const location = String(body?.location || "Las Ramblas, Barcelona");
    const lang = body?.lang === "ca" ? "ca" : "es";

    if (!message.trim()) {
      return NextResponse.json({ reply: "Dime qué necesitas y busco opciones en comercios cercanos." });
    }

    const catalogueContext = marketplaceProducts
      .slice(0, 108)
      .map((p) => `${p.name} | categoría: ${p.category} | comercio: ${p.store} | precio: ${money(p.price)} | distancia: ${p.distance.toFixed(2)} km | recogida: ${p.pickup} | stock: ${p.stock} | slug: ${p.slug}`)
      .join("\n");

    const cartContext = cart.length
      ? cart.map((item) => `${item.quantity}x ${item.name} (${item.store}) - ${money(item.price * item.quantity)}`).join("\n")
      : "Carrito vacío";

    const systemPrompt = `Eres JuanIAs, asistente conversacional de faciliteaGO by CaixaBank. Atiendes en ${lang === "ca" ? "catalán" : "español"}.
Tu trabajo es ayudar a comprar en un marketplace local de Barcelona.
Reglas estrictas:
- Responde como humano útil, directo y natural.
- Usa SOLO productos presentes en el catálogo incluido. No inventes productos, precios, stock ni comercios.
- Si el usuario pide un regalo, propone 3-5 opciones concretas y explica por qué.
- Si pide cercanía, prioriza menor distancia.
- Si pide promociones, prioriza productos con precio anterior o cupón FINBROADPEAK26.
- Si pide añadir algo al carrito, indica claramente qué producto añadirías y pide confirmación si hay ambigüedad.
- No digas que eres una demo ni que simulas nada.
- Sé breve, pero conversacional.

Ubicación actual: ${location}
Carrito actual:
${cartContext}

Catálogo disponible:
${catalogueContext}`;

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ reply: fallbackReply(message), mode: "fallback" });
    }

    const groqMessages = [
      { role: "system", content: systemPrompt },
      ...history.slice(-8).map((m) => ({ role: m.role, content: m.text })),
      { role: "user", content: message }
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: groqMessages,
        temperature: 0.45,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Groq error", response.status, text);
      return NextResponse.json({ reply: fallbackReply(message), mode: "fallback" });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || fallbackReply(message);

    return NextResponse.json({ reply, mode: "groq", model: GROQ_MODEL });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ reply: "Ahora mismo no puedo procesar bien la petición. Prueba a pedirme un producto, una categoría o una recomendación concreta." }, { status: 200 });
  }
}
