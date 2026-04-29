export const localCommerceSectors = [
  "Souvenirs y regalos",
  "Ferretería y bricolaje",
  "Papelería y material escolar",
  "Librería",
  "Moda y complementos",
  "Calzado",
  "Joyería y bisutería",
  "Óptica",
  "Perfumería y cosmética",
  "Droguería",
  "Bazar multiproducto",
  "Decoración y hogar",
  "Textil hogar",
  "Muebles y diseño",
  "Electrónica y accesorios",
  "Telefonía móvil",
  "Informática",
  "Fotografía",
  "Juguetería",
  "Hobby y modelismo",
  "Deporte",
  "Bicicletas y movilidad urbana",
  "Mascotas",
  "Floristería no perecedera",
  "Artesanía local",
  "Galerías y arte",
  "Música",
  "Mercería",
  "Costura y arreglos",
  "Segunda mano y vintage",
  "Antigüedades",
  "Enmarcación",
  "Copistería e impresión",
  "Tatuaje y piercing retail",
  "Estancos y loterías",
  "Productos esotéricos",
  "Tiendas de cómic y manga",
  "Gaming y videojuegos",
  "Belleza profesional",
  "Ortopedia",
  "Material sanitario no farmacéutico",
  "Regalos personalizados",
  "Cerámica y diseño local",
  "Maletas y viaje"
] as const;

export const marketplaceCategories = ["Todos", ...localCommerceSectors] as const;

export const sectorMenuGroups = [
  {
    title: "Regalos y turismo",
    sectors: [
      "Souvenirs y regalos",
      "Regalos personalizados",
      "Artesanía local",
      "Cerámica y diseño local",
      "Productos esotéricos"
    ]
  },
  {
    title: "Hogar y bricolaje",
    sectors: [
      "Ferretería y bricolaje",
      "Droguería",
      "Bazar multiproducto",
      "Decoración y hogar",
      "Textil hogar",
      "Muebles y diseño",
      "Floristería no perecedera"
    ]
  },
  {
    title: "Cultura y ocio",
    sectors: [
      "Librería",
      "Tiendas de cómic y manga",
      "Juguetería",
      "Hobby y modelismo",
      "Música",
      "Gaming y videojuegos",
      "Galerías y arte",
      "Fotografía"
    ]
  },
  {
    title: "Moda y estilo",
    sectors: [
      "Moda y complementos",
      "Calzado",
      "Joyería y bisutería",
      "Óptica",
      "Perfumería y cosmética",
      "Belleza profesional",
      "Mercería",
      "Costura y arreglos",
      "Segunda mano y vintage"
    ]
  },
  {
    title: "Tecnología y oficina",
    sectors: [
      "Electrónica y accesorios",
      "Telefonía móvil",
      "Informática",
      "Papelería y material escolar",
      "Copistería e impresión",
      "Enmarcación"
    ]
  },
  {
    title: "Movilidad y servicios",
    sectors: [
      "Deporte",
      "Bicicletas y movilidad urbana",
      "Mascotas",
      "Antigüedades",
      "Tatuaje y piercing retail",
      "Estancos y loterías",
      "Ortopedia",
      "Material sanitario no farmacéutico",
      "Maletas y viaje"
    ]
  }
] as const;
