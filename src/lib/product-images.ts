import type { MarketplaceProduct } from "./marketplace-products";

const fixedImages: Record<string, string> = {
  "pinzas-pequenas-metalicas-pack-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAyB7U9Dz5twILkqYUhIzOsBJuCC4zV6ho5Q&s",
  "anillo-caramelo-fresa": "https://www.tiendashoppi.com/cdn/shop/products/tienda-shoppi-ring-pop-min_large.jpg?v=1632072524",
  "iman-premium-barcelona-skyline": "https://m.media-amazon.com/images/I/619eaAmDBkL._AC_UF894,1000_QL80_.jpg"
};

const sectorVisuals: Record<string, { emoji: string; colorA: string; colorB: string }> = {
  "Souvenirs y regalos": { emoji: "🎁", colorA: "#0072CE", colorB: "#7DD3FC" },
  "Ferretería y bricolaje": { emoji: "🔧", colorA: "#1E3A8A", colorB: "#F97316" },
  "Papelería y material escolar": { emoji: "✏️", colorA: "#2563EB", colorB: "#FACC15" },
  "Librería": { emoji: "📚", colorA: "#7C2D12", colorB: "#FDBA74" },
  "Moda y complementos": { emoji: "👜", colorA: "#BE185D", colorB: "#FBCFE8" },
  "Calzado": { emoji: "👟", colorA: "#111827", colorB: "#93C5FD" },
  "Joyería y bisutería": { emoji: "💍", colorA: "#92400E", colorB: "#FDE68A" },
  "Óptica": { emoji: "🕶️", colorA: "#075985", colorB: "#BAE6FD" },
  "Perfumería y cosmética": { emoji: "💄", colorA: "#9D174D", colorB: "#FDA4AF" },
  "Droguería": { emoji: "🧴", colorA: "#065F46", colorB: "#A7F3D0" },
  "Bazar multiproducto": { emoji: "🛍️", colorA: "#4338CA", colorB: "#C4B5FD" },
  "Decoración y hogar": { emoji: "🕯️", colorA: "#78350F", colorB: "#FCD34D" },
  "Textil hogar": { emoji: "🛏️", colorA: "#0F766E", colorB: "#99F6E4" },
  "Muebles y diseño": { emoji: "🪑", colorA: "#44403C", colorB: "#D6D3D1" },
  "Electrónica y accesorios": { emoji: "🔌", colorA: "#0F172A", colorB: "#60A5FA" },
  "Telefonía móvil": { emoji: "📱", colorA: "#1D4ED8", colorB: "#A5B4FC" },
  "Informática": { emoji: "⌨️", colorA: "#312E81", colorB: "#93C5FD" },
  "Fotografía": { emoji: "📷", colorA: "#111827", colorB: "#E5E7EB" },
  "Juguetería": { emoji: "🧩", colorA: "#DC2626", colorB: "#FDE047" },
  "Hobby y modelismo": { emoji: "🎲", colorA: "#6D28D9", colorB: "#DDD6FE" },
  "Deporte": { emoji: "🏋️", colorA: "#15803D", colorB: "#BBF7D0" },
  "Bicicletas y movilidad urbana": { emoji: "🚲", colorA: "#0369A1", colorB: "#7DD3FC" },
  "Mascotas": { emoji: "🐾", colorA: "#B45309", colorB: "#FED7AA" },
  "Floristería no perecedera": { emoji: "🌾", colorA: "#15803D", colorB: "#FEF3C7" },
  "Artesanía local": { emoji: "🏺", colorA: "#9A3412", colorB: "#FDBA74" },
  "Galerías y arte": { emoji: "🎨", colorA: "#7E22CE", colorB: "#F0ABFC" },
  "Música": { emoji: "🎸", colorA: "#991B1B", colorB: "#FCA5A5" },
  "Mercería": { emoji: "🧵", colorA: "#BE123C", colorB: "#FDA4AF" },
  "Costura y arreglos": { emoji: "🪡", colorA: "#831843", colorB: "#FBCFE8" },
  "Segunda mano y vintage": { emoji: "🧥", colorA: "#57534E", colorB: "#E7E5E4" },
  "Antigüedades": { emoji: "🕰️", colorA: "#713F12", colorB: "#FDE68A" },
  "Enmarcación": { emoji: "🖼️", colorA: "#1F2937", colorB: "#CBD5E1" },
  "Copistería e impresión": { emoji: "🖨️", colorA: "#1E40AF", colorB: "#BFDBFE" },
  "Tatuaje y piercing retail": { emoji: "✨", colorA: "#18181B", colorB: "#A1A1AA" },
  "Estancos y loterías": { emoji: "📰", colorA: "#374151", colorB: "#D1D5DB" },
  "Productos esotéricos": { emoji: "🔮", colorA: "#581C87", colorB: "#D8B4FE" },
  "Tiendas de cómic y manga": { emoji: "💥", colorA: "#B91C1C", colorB: "#FDE047" },
  "Gaming y videojuegos": { emoji: "🎮", colorA: "#312E81", colorB: "#22D3EE" },
  "Belleza profesional": { emoji: "💅", colorA: "#BE185D", colorB: "#F9A8D4" },
  "Ortopedia": { emoji: "🦶", colorA: "#0E7490", colorB: "#A5F3FC" },
  "Material sanitario no farmacéutico": { emoji: "🩺", colorA: "#0369A1", colorB: "#BAE6FD" },
  "Regalos personalizados": { emoji: "🎀", colorA: "#C2410C", colorB: "#FED7AA" },
  "Cerámica y diseño local": { emoji: "🍶", colorA: "#92400E", colorB: "#FCD34D" },
  "Maletas y viaje": { emoji: "🎒", colorA: "#0F766E", colorB: "#5EEAD4" }
};

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&apos;");
}

function wrapText(value: string, max = 25) {
  const words = value.split(" ");
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function productSvg(product: MarketplaceProduct, index: number) {
  const visual = sectorVisuals[product.category] ?? { emoji: "🛍️", colorA: "#002B5C", colorB: "#7DD3FC" };
  const lines = wrapText(product.name);
  const safeCategory = escapeXml(product.category);
  const safeStore = escapeXml(product.store);
  const safeLines = lines.map(escapeXml);
  const patternOpacity = 0.1 + ((index % 4) * 0.035);
  const circleX = 170 + ((index * 73) % 520);
  const circleY = 80 + ((index * 47) % 320);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${visual.colorA}"/><stop offset="1" stop-color="${visual.colorB}"/></linearGradient><filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#001B3D" flood-opacity="0.22"/></filter></defs><rect width="900" height="700" fill="url(#g)"/><circle cx="${circleX}" cy="${circleY}" r="210" fill="#ffffff" opacity="${patternOpacity}"/><circle cx="760" cy="560" r="260" fill="#ffffff" opacity="0.12"/><rect x="74" y="74" width="752" height="552" rx="48" fill="#ffffff" opacity="0.88" filter="url(#shadow)"/><text x="450" y="205" text-anchor="middle" font-size="112" dominant-baseline="middle">${visual.emoji}</text><text x="450" y="310" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="800" fill="#002B5C">${safeCategory}</text>${safeLines.map((line, i) => `<text x="450" y="${384 + i * 44}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="900" fill="#06152B">${line}</text>`).join("")}<rect x="284" y="540" width="332" height="52" rx="26" fill="#0072CE"/><text x="450" y="574" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="800" fill="#ffffff">${safeStore}</text></svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function resolvedProductImage(product: MarketplaceProduct, index = 0) {
  const fixed = fixedImages[product.slug];
  if (fixed) return fixed;
  if (!product.id.startsWith("a")) return product.imageUrl;
  return productSvg(product, index);
}
