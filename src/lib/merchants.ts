import { marketplaceProducts, type MarketplaceProduct } from "./marketplace-products";
import { resolvedProductImage } from "./product-images";
import { getStoreLocation } from "./store-locations";

export type Merchant = {
  name: string;
  slug: string;
  mainCategory: string;
  district: string;
  products: MarketplaceProduct[];
  address: string;
  lat: number;
  lng: number;
  rating: number;
  distance: number;
  heroImage: string;
};

export function merchantSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const sectorHeroImages: Record<string, string> = {
  "Ferretería y bricolaje": "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1600&q=80",
  "Bazar multiproducto": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80",
  "Souvenirs y regalos": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1600&q=80",
  "Papelería y material escolar": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80",
  "Floristería no perecedera": "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1600&q=80",
  "Librería": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80",
  "Moda y complementos": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
  "Calzado": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80",
  "Joyería y bisutería": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
  "Óptica": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1600&q=80",
  "Perfumería y cosmética": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1600&q=80",
  "Droguería": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1600&q=80",
  "Decoración y hogar": "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1600&q=80",
  "Textil hogar": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1600&q=80",
  "Muebles y diseño": "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1600&q=80",
  "Electrónica y accesorios": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
  "Telefonía móvil": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
  "Informática": "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80",
  "Fotografía": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80",
  "Juguetería": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1600&q=80",
  "Hobby y modelismo": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
  "Deporte": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80",
  "Bicicletas y movilidad urbana": "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1600&q=80",
  "Mascotas": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=80",
  "Artesanía local": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80",
  "Galerías y arte": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=1600&q=80",
  "Música": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
  "Mercería": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80",
  "Costura y arreglos": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80",
  "Segunda mano y vintage": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1600&q=80",
  "Antigüedades": "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1600&q=80",
  "Enmarcación": "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1600&q=80",
  "Copistería e impresión": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
  "Tatuaje y piercing retail": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
  "Estancos y loterías": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80",
  "Productos esotéricos": "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1600&q=80",
  "Tiendas de cómic y manga": "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=1600&q=80",
  "Gaming y videojuegos": "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1600&q=80",
  "Belleza profesional": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80",
  "Ortopedia": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
  "Material sanitario no farmacéutico": "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1600&q=80",
  "Regalos personalizados": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1600&q=80",
  "Cerámica y diseño local": "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1600&q=80",
  "Maletas y viaje": "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1600&q=80"
};

function mostCommonCategory(products: MarketplaceProduct[]) {
  const counts = products.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] ?? 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? products[0]?.category ?? "Comercio local";
}

export function getMerchants(): Merchant[] {
  const grouped = marketplaceProducts.reduce<Record<string, MarketplaceProduct[]>>((acc, product) => {
    acc[product.store] = acc[product.store] ?? [];
    acc[product.store].push(product);
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([name, products]) => {
      const mainCategory = mostCommonCategory(products);
      const location = getStoreLocation(products[0]);
      return {
        name,
        slug: merchantSlug(name),
        mainCategory,
        district: products[0].district,
        products,
        address: location.address,
        lat: location.lat,
        lng: location.lng,
        rating: Math.round((products.reduce((sum, p) => sum + p.rating, 0) / products.length) * 10) / 10,
        distance: Math.min(...products.map((p) => p.distance)),
        heroImage: sectorHeroImages[mainCategory] ?? resolvedProductImage(products[0])
      };
    })
    .sort((a, b) => a.distance - b.distance);
}

export function getMerchantBySlug(slug: string) {
  return getMerchants().find((merchant) => merchant.slug === slug) ?? null;
}
