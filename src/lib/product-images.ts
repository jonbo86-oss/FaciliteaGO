import type { MarketplaceProduct } from "./marketplace-products";

const baseFallbackByCategory: Record<string, string> = {
  "Souvenirs y regalos": "barcelona,souvenir,gift",
  "Ferretería y bricolaje": "hardware,tools,diy",
  "Papelería y material escolar": "stationery,notebook,pens",
  "Librería": "books,bookstore,library",
  "Moda y complementos": "fashion,accessories,boutique",
  "Calzado": "shoes,footwear,sneakers",
  "Joyería y bisutería": "jewelry,bracelet,necklace",
  "Óptica": "glasses,optical,sunglasses",
  "Perfumería y cosmética": "cosmetics,perfume,beauty",
  "Droguería": "cleaning,home,products",
  "Bazar multiproducto": "store,small,objects",
  "Decoración y hogar": "home,decor,interior",
  "Textil hogar": "home,textile,towels",
  "Muebles y diseño": "furniture,design,chair",
  "Electrónica y accesorios": "electronics,accessories,cables",
  "Telefonía móvil": "smartphone,phone,accessories",
  "Informática": "computer,keyboard,mouse",
  "Fotografía": "camera,photography,frame",
  "Juguetería": "toys,game,puzzle",
  "Hobby y modelismo": "model,miniature,hobby",
  "Deporte": "sport,training,fitness",
  "Bicicletas y movilidad urbana": "bicycle,urban,mobility",
  "Mascotas": "pets,dog,cat",
  "Floristería no perecedera": "dried,flowers,decor",
  "Artesanía local": "handmade,craft,ceramic",
  "Galerías y arte": "art,gallery,illustration",
  "Música": "music,vinyl,guitar",
  "Mercería": "sewing,thread,buttons",
  "Costura y arreglos": "sewing,tailor,fabric",
  "Segunda mano y vintage": "vintage,clothes,shop",
  "Antigüedades": "antiques,vintage,furniture",
  "Enmarcación": "picture,frame,art",
  "Copistería e impresión": "printing,paper,copy",
  "Tatuaje y piercing retail": "piercing,jewelry,studio",
  "Estancos y loterías": "newspaper,magazine,kiosk",
  "Productos esotéricos": "candles,incense,minerals",
  "Tiendas de cómic y manga": "comic,manga,figures",
  "Gaming y videojuegos": "gaming,controller,videogames",
  "Belleza profesional": "beauty,hair,cosmetics",
  "Ortopedia": "orthopedic,health,support",
  "Material sanitario no farmacéutico": "medical,health,kit",
  "Regalos personalizados": "personalized,gift,mug",
  "Cerámica y diseño local": "ceramic,design,tableware",
  "Maletas y viaje": "travel,bag,luggage"
};

const fixedImages: Record<string, string> = {
  "pinzas-pequenas-metalicas-pack-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAyB7U9Dz5twILkqYUhIzOsBJuCC4zV6ho5Q&s",
  "anillo-caramelo-fresa": "https://www.tiendashoppi.com/cdn/shop/products/tienda-shoppi-ring-pop-min_large.jpg?v=1632072524",
  "iman-premium-barcelona-skyline": "https://m.media-amazon.com/images/I/619eaAmDBkL._AC_UF894,1000_QL80_.jpg"
};

function normalizeForImage(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s,-]/g, "")
    .replace(/\s+/g, ",")
    .toLowerCase();
}

export function resolvedProductImage(product: MarketplaceProduct, index = 0) {
  const fixed = fixedImages[product.slug];
  if (fixed) return fixed;

  if (!product.id.startsWith("a")) return product.imageUrl;

  const categoryTerms = baseFallbackByCategory[product.category] ?? "local,shop,product";
  const productTerms = normalizeForImage(product.name);
  const signature = product.id.replace(/\D/g, "") || String(index + 1);

  return `https://source.unsplash.com/900x700/?${productTerms},${categoryTerms}&sig=faciliteago-${signature}`;
}
