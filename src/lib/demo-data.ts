export const demoLocation = {
  label: "Las Ramblas, Barcelona",
  lat: 41.3809,
  lng: 2.1734
};

export const categories = [
  "Ferreteria",
  "Gominolas y dulces",
  "Souvenirs",
  "Papeleria",
  "Floristeria",
  "Moda local",
  "Hogar",
  "Mascotas",
  "Belleza",
  "Electronica"
];

export const featuredStores = [
  {
    name: "Ferreteria Ramblas Pro",
    district: "Gotico",
    category: "Ferreteria",
    distance: "350 m",
    rating: 4.8,
    open: true,
    badge: "Promocion activa"
  },
  {
    name: "DulceRaval",
    district: "Raval",
    category: "Gominolas y dulces",
    distance: "620 m",
    rating: 4.7,
    open: true,
    badge: "Top ventas"
  },
  {
    name: "Souvenirs Barcelona 92",
    district: "Born",
    category: "Souvenirs",
    distance: "900 m",
    rating: 4.6,
    open: true,
    badge: "Comercio verificado"
  }
];

export const promotions = [
  {
    product: "Pinzas pequenas metalicas pack 12",
    store: "Ferreteria Ramblas Pro",
    oldPrice: "4,90 €",
    price: "2,95 €",
    distance: "350 m"
  },
  {
    product: "Anillo de caramelo sabor fresa",
    store: "DulceRaval",
    oldPrice: "1,80 €",
    price: "0,99 €",
    distance: "620 m"
  },
  {
    product: "Iman premium Barcelona skyline",
    store: "Souvenirs Barcelona 92",
    oldPrice: "6,50 €",
    price: "4,95 €",
    distance: "900 m"
  }
];

export const platformModules = [
  "Base de datos real con Prisma y PostgreSQL",
  "Auth y roles comprador, comercio, soporte y admin",
  "Catalogo, variantes, imagenes y aprobacion de productos",
  "Stock disponible, reservado, vendido y movimientos",
  "Carrito persistente y checkout con idempotencia",
  "Pago simulado con estados de autorizacion y reembolso",
  "Pedido padre y subpedidos por comercio",
  "Portal usuario, portal comercio y backoffice admin",
  "Promociones, cupones y FINBROADPEAK26",
  "Incidencias, devoluciones, resenas y auditoria",
  "Mapa interactivo y busqueda por cercania",
  "JuanIAs con herramientas reales sobre catalogo y carrito"
];

export const juaniasSuggestions = [
  "Necesito herramientas para una reforma",
  "Busca promociones cerca de mi",
  "Anade las pinzas pequenas al carrito",
  "Ordena gominolas por cercania",
  "Que puedo recoger hoy en Las Ramblas?",
  "Aplica el cupon FINBROADPEAK26"
];
