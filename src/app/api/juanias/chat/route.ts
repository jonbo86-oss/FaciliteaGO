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

function productUrl(slug: string) {
  return `/producto/${slug}`;
}

const intentRules = [
  {
    id: "edibleKids",
    keywords: ["comestible", "comer", "dulce", "dulces", "chuche", "chuches", "gominola", "gominolas", "caramelo", "caramelos", "anillo caramelo", "niño dulce", "nino dulce"],
    categories: ["Bazar multiproducto"],
    productBoosts: ["gominolas", "caramelo", "anillo", "dulce", "fresa", "bolsa", "mix"]
  },
  {
    id: "mobile",
    keywords: ["movil", "telefono", "smartphone", "iphone", "samsung", "android", "funda movil", "protector pantalla", "cargador movil"],
    categories: ["Telefonía móvil", "Electrónica y accesorios", "Informática"],
    productBoosts: ["funda", "movil", "pantalla", "cargador", "usb", "cable", "telefono", "protector"]
  },
  {
    id: "kidsGift",
    keywords: ["niño", "nino", "niña", "nina", "infantil", "regalo", "juguete", "cumpleaños", "cumpleanos"],
    categories: ["Juguetería", "Tiendas de cómic y manga", "Gaming y videojuegos", "Souvenirs y regalos", "Regalos personalizados"],
    productBoosts: ["puzzle", "juego", "manga", "figura", "mando", "taza", "iman", "regalo"]
  },
  {
    id: "tools",
    keywords: ["reforma", "herramienta", "bricolaje", "taladro", "broca", "adhesivo", "cinta", "ferreteria", "ferretería"],
    categories: ["Ferretería y bricolaje"],
    productBoosts: ["brocas", "cinta", "adhesivo", "kit", "pinzas", "herramienta"]
  },
  {
    id: "sewing",
    keywords: ["costura", "coser", "hilo", "botones", "boton", "merceria", "mercería", "arreglos"],
    categories: ["Mercería", "Costura y arreglos"],
    productBoosts: ["costura", "hilo", "botones", "parche", "kit"]
  },
  {
    id: "homeFragrance",
    keywords: ["ambientador", "mikado", "lavanda", "incienso", "sándalo", "sandalo", "vela", "aroma"],
    categories: ["Droguería", "Decoración y hogar", "Productos esotéricos"],
    productBoosts: ["ambientador", "mikado", "lavanda", "incienso", "vela", "aromatica", "aromática"]
  },
  {
    id: "travel",
    keywords: ["maleta", "viaje", "mochila", "neceser", "turismo"],
    categories: ["Maletas y viaje", "Souvenirs y regalos"],
    productBoosts: ["mochila", "neceser", "maleta", "viaje"]
  }
];

function detectIntent(message: string) {
  const q = normalize(message);
  const edibleWords = ["comestible", "comer", "dulce", "dulces", "chuche", "chuches", "gominola", "gominolas", "caramelo", "caramelos"];
  if (edibleWords.some((word) => q.includes(word))) return intentRules[0];
  return intentRules.find((rule) => rule.keywords.some((keyword) => q.includes(normalize(keyword)))) ?? null;
}

function localRecommendations(message: string) {
  const q = normalize(message);
  const intent = detectIntent(message);
  const tokens = q.split(/\s+/).filter((token) => token.length > 2 && !["buscame", "busca", "quiero", "necesito", "para", "unos", "unas", "algo", "mejor", "cerca"].includes(token));

  const candidates = intent
    ? marketplaceProducts.filter((product) => intent.categories.includes(product.category))
    : marketplaceProducts;

  const scored = candidates
    .map((product) => {
      const haystack = normalize([product.name, product.category, product.description, product.store, product.district].join(" "));
      let score = 0;

      tokens.forEach((token) => {
        if (haystack.includes(token)) score += 4;
      });

      if (intent) {
        if (intent.categories.includes(product.category)) score += 20;
        intent.productBoosts.forEach((boost) => {
          if (haystack.includes(normalize(boost))) score += 8;
        });
      }

      if ((q.includes("cerca") || q.includes("cercania") || q.includes("cercanía")) && product.distance <= 0.75) score += 4;
      if ((q.includes("promocion") || q.includes("promoción") || q.includes("oferta")) && product.oldPrice) score += 8;
      if (product.stock > 0) score += 1;

      return { product, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.product.distance - b.product.distance)
    .slice(0, 4)
    .map((item) => item.product);

  if (scored.length) return scored;

  if (intent) return candidates.sort((a, b) => a.distance - b.distance).slice(0, 4);

  return marketplaceProducts.slice(0, 4);
}

function fallbackReply(message: string) {
  const picks = localRecommendations(message);
  const lines = picks.map((p) => `• [${p.name}](${productUrl(p.slug)}) (${p.store}) - ${money(p.price)}, a ${p.distance.toFixed(2)} km, recogida ${p.pickup}.`).join("\n");
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
      .map((p) => `${p.name} | categoría: ${p.category} | comercio: ${p.store} | precio: ${money(p.price)} | distancia: ${p.distance.toFixed(2)} km | recogida: ${p.pickup} | stock: ${p.stock} | enlace: ${productUrl(p.slug)}`)
      .join("\n");

    const cartContext = cart.length
      ? cart.map((item) => `${item.quantity}x ${item.name} (${item.store}) - ${money(item.price * item.quantity)}`).join("\n")
      : "Carrito vacío";

    const systemPrompt = `Eres JuanIAs, asistente conversacional de faciliteaGO by CaixaBank. Atiendes en ${lang === "ca" ? "catalán" : "español"}.
Tu trabajo es ayudar a comprar en un marketplace local de Barcelona.
Reglas estrictas:
- Responde como humano útil, directo y natural.
- Usa SOLO productos presentes en el catálogo incluido. No inventes productos, precios, stock ni comercios.
- Cuando recomiendes un producto, escribe siempre el nombre como enlace markdown usando el enlace incluido, por ejemplo: [Nombre del producto](/producto/slug).
- Si el usuario pide algo comestible, dulce, chuches, gominolas o caramelos, prioriza productos como anillo de caramelo o bolsa mix de gominolas. No recomiendes manga, videojuegos, imanes ni regalos no comestibles.
- Si el usuario pide móvil, teléfono o smartphone, prioriza productos de Telefonía móvil, Electrónica y accesorios o Informática. No recomiendes libros, belleza, moda ni productos irrelevantes.
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
        temperature: 0.25,
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
