export type MarketplaceProduct = {
  id: string;
  slug: string;
  name: string;
  store: string;
  category: string;
  district: string;
  price: number;
  oldPrice?: number;
  distance: number;
  rating: number;
  stock: number;
  pickup: string;
  imageUrl: string;
  description: string;
  details: string[];
};

export const marketplaceProducts: MarketplaceProduct[] = [
  {
    id: "p1",
    slug: "pinzas-pequenas-metalicas-pack-12",
    name: "Pinzas pequenas metalicas pack 12",
    store: "Ferreteria Ramblas Pro",
    category: "Ferreteria",
    district: "Gotico",
    price: 2.95,
    oldPrice: 4.9,
    distance: 0.35,
    rating: 4.8,
    stock: 42,
    pickup: "25 min",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAyB7U9Dz5twILkqYUhIzOsBJuCC4zV6ho5Q&s",
    description: "Pack de pinzas pequenas para bricolaje ligero, manualidades, juegos infantiles y pequenas reparaciones domesticas.",
    details: ["Pack de 12 unidades", "Tamano pequeno", "Recogida rapida en tienda", "Producto en promocion"]
  },
  {
    id: "p2",
    slug: "anillo-caramelo-fresa",
    name: "Anillo de caramelo sabor fresa",
    store: "DulceRaval",
    category: "Gominolas",
    district: "Raval",
    price: 0.99,
    oldPrice: 1.8,
    distance: 0.62,
    rating: 4.7,
    stock: 68,
    pickup: "15 min",
    imageUrl: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=900&q=80",
    description: "Anillo de caramelo con sabor a fresa. Producto divertido para regalos, fiestas o compra rapida de barrio.",
    details: ["Sabor fresa", "Unidad individual", "Ideal para fiestas", "Oferta de la semana"]
  },
  {
    id: "p3",
    slug: "iman-premium-barcelona-skyline",
    name: "Iman premium Barcelona skyline",
    store: "Souvenirs Barcelona 92",
    category: "Souvenirs",
    district: "Born",
    price: 4.95,
    oldPrice: 6.5,
    distance: 0.9,
    rating: 4.6,
    stock: 24,
    pickup: "20 min",
    imageUrl: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=900&q=80",
    description: "Iman de recuerdo inspirado en el skyline de Barcelona, perfecto para turistas o regalos rapidos.",
    details: ["Diseno Barcelona", "Formato premium", "Comercio verificado", "Recogida en Born"]
  },
  {
    id: "p4",
    slug: "kit-reforma-rapida",
    name: "Kit reforma rapida: cinta, guantes y cutter",
    store: "Ferreteria Ramblas Pro",
    category: "Ferreteria",
    district: "Gotico",
    price: 14.95,
    distance: 0.35,
    rating: 4.8,
    stock: 17,
    pickup: "30 min",
    imageUrl: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=900&q=80",
    description: "Kit basico para pequenas reformas en casa: cinta, guantes de proteccion y cutter multiuso.",
    details: ["Incluye 3 productos", "Recomendado por JuanIAs", "Stock disponible", "Recogida hoy"]
  },
  {
    id: "p5",
    slug: "pack-oficina-libreta-boligrafos-clips",
    name: "Pack oficina libreta, boligrafos y clips",
    store: "Papereria Catalunya",
    category: "Papeleria",
    district: "Eixample",
    price: 8.75,
    oldPrice: 11.2,
    distance: 1.2,
    rating: 4.5,
    stock: 31,
    pickup: "35 min",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    description: "Pack practico de papeleria para oficina, estudio o teletrabajo con libreta, boligrafos y clips.",
    details: ["Pack ahorro", "Material oficina", "Comercio local", "Preparado en 35 minutos"]
  },
  {
    id: "p6",
    slug: "ramo-urbano-azul-amarillo",
    name: "Ramo urbano azul y amarillo",
    store: "Floristeria La Rambla",
    category: "Floristeria",
    district: "Gotico",
    price: 22.5,
    distance: 0.48,
    rating: 4.9,
    stock: 9,
    pickup: "45 min",
    imageUrl: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=900&q=80",
    description: "Ramo fresco de estilo urbano con tonos azules y amarillos, preparado por floristeria local.",
    details: ["Flores frescas", "Preparacion artesanal", "Recogida en tienda", "Unidades limitadas"]
  },
  {
    id: "p7",
    slug: "bolsa-mix-gominolas-500g",
    name: "Bolsa mix gominolas 500 g",
    store: "DulceRaval",
    category: "Gominolas",
    district: "Raval",
    price: 5.9,
    distance: 0.62,
    rating: 4.7,
    stock: 54,
    pickup: "15 min",
    imageUrl: "https://images.unsplash.com/photo-1575224300306-1b8da36134ec?auto=format&fit=crop&w=900&q=80",
    description: "Bolsa variada de gominolas de 500 gramos para fiestas, regalos o caprichos de ultima hora.",
    details: ["500 gramos", "Mix variado", "Preparacion inmediata", "Tienda cercana"]
  },
  {
    id: "p8",
    slug: "taza-ceramica-barcelona-local-edition",
    name: "Taza ceramica Barcelona local edition",
    store: "Souvenirs Barcelona 92",
    category: "Souvenirs",
    district: "Born",
    price: 9.95,
    distance: 0.9,
    rating: 4.6,
    stock: 18,
    pickup: "20 min",
    imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80",
    description: "Taza de ceramica inspirada en Barcelona, pensada para regalo local o recuerdo de viaje.",
    details: ["Ceramica", "Diseno local", "Apta para regalo", "Comercio verificado"]
  }
];

export const marketplaceCategories = ["Todos", "Ferreteria", "Gominolas", "Souvenirs", "Papeleria", "Floristeria"];

export function money(value: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
}
