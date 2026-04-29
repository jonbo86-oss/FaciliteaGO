import type { MarketplaceProduct } from "./marketplace-products";

export type StoreLocation = { address: string; lat: number; lng: number };

export const storeLocations: Record<string, StoreLocation> = {
  "Ferreteria Ramblas Pro": { address: "Carrer de la Canuda 27, 08002 Barcelona", lat: 41.3844, lng: 2.1702 },
  "DulceRaval": { address: "Carrer del Carme 34, 08001 Barcelona", lat: 41.3812, lng: 2.1665 },
  "Souvenirs Barcelona 92": { address: "Carrer de Ferran 21, 08002 Barcelona", lat: 41.3815, lng: 2.1766 },
  "Papereria Catalunya": { address: "Ronda de Sant Antoni 12, 08001 Barcelona", lat: 41.3830, lng: 2.1633 },
  "Floristeria La Rambla": { address: "La Rambla 89, 08002 Barcelona", lat: 41.3825, lng: 2.1727 },
  "Llibreria del Born": { address: "Carrer de l'Argenteria 18, 08003 Barcelona", lat: 41.3835, lng: 2.1817 },
  "Moda Gotic": { address: "Carrer d'Avinyó 22, 08002 Barcelona", lat: 41.3801, lng: 2.1782 },
  "Zapateria Raval": { address: "Carrer de l'Hospital 56, 08001 Barcelona", lat: 41.3805, lng: 2.1682 },
  "Bijoux Ramblas": { address: "Carrer de la Portaferrissa 17, 08002 Barcelona", lat: 41.3830, lng: 2.1737 },
  "Optica Catalunya": { address: "Avinguda del Portal de l'Àngel 9, 08002 Barcelona", lat: 41.3855, lng: 2.1727 },
  "Perfumeria Nova": { address: "Carrer de Pelai 38, 08001 Barcelona", lat: 41.3858, lng: 2.1679 },
  "Drogueria Central": { address: "Carrer del Pi 6, 08002 Barcelona", lat: 41.3830, lng: 2.1747 },
  "Bazar Rambla": { address: "La Rambla 121, 08002 Barcelona", lat: 41.3849, lng: 2.1703 },
  "Casa Born Deco": { address: "Carrer dels Carders 31, 08003 Barcelona", lat: 41.3860, lng: 2.1810 },
  "Textil Sant Antoni": { address: "Carrer del Parlament 18, 08015 Barcelona", lat: 41.3754, lng: 2.1614 },
  "Disseny Eixample": { address: "Carrer d'Aragó 221, 08007 Barcelona", lat: 41.3899, lng: 2.1622 },
  "Tech Local BCN": { address: "Carrer de Fontanella 16, 08010 Barcelona", lat: 41.3875, lng: 2.1720 },
  "Movil Express": { address: "Carrer dels Tallers 45, 08001 Barcelona", lat: 41.3843, lng: 2.1670 },
  "InfoRepair Gotic": { address: "Carrer de la Boqueria 28, 08002 Barcelona", lat: 41.3816, lng: 2.1742 },
  "Foto Born": { address: "Passeig del Born 15, 08003 Barcelona", lat: 41.3846, lng: 2.1830 },
  "Jocs i Somriures": { address: "Carrer de Petritxol 11, 08002 Barcelona", lat: 41.3828, lng: 2.1736 },
  "Modelisme BCN": { address: "Carrer de Trafalgar 42, 08010 Barcelona", lat: 41.3896, lng: 2.1781 },
  "Sport Local": { address: "Carrer de la Diputació 251, 08007 Barcelona", lat: 41.3900, lng: 2.1669 },
  "Bici Urbana": { address: "Carrer de la Marina 78, 08005 Barcelona", lat: 41.3906, lng: 2.1912 },
  "Mascotes Raval": { address: "Carrer de Joaquín Costa 44, 08001 Barcelona", lat: 41.3832, lng: 2.1647 },
  "Flor Seca Barcelona": { address: "Carrer del Rec 34, 08003 Barcelona", lat: 41.3850, lng: 2.1836 },
  "Artesans del Gotic": { address: "Carrer dels Banys Nous 10, 08002 Barcelona", lat: 41.3826, lng: 2.1762 },
  "Galeria Mini Art": { address: "Carrer de Montcada 20, 08003 Barcelona", lat: 41.3852, lng: 2.1818 },
  "Vinils & Music": { address: "Carrer dels Tallers 79, 08001 Barcelona", lat: 41.3845, lng: 2.1657 },
  "Merceria Ramblas": { address: "Carrer de la Portaferrissa 24, 08002 Barcelona", lat: 41.3832, lng: 2.1732 },
  "Arreglos Express": { address: "Carrer de Sant Pau 52, 08001 Barcelona", lat: 41.3790, lng: 2.1714 },
  "Vintage Born": { address: "Carrer de la Princesa 28, 08003 Barcelona", lat: 41.3855, lng: 2.1816 },
  "Antic Gotic": { address: "Carrer del Call 12, 08002 Barcelona", lat: 41.3825, lng: 2.1758 },
  "Marcs Barcelona": { address: "Carrer de Casanova 55, 08011 Barcelona", lat: 41.3845, lng: 2.1590 },
  "Copy Rambla": { address: "Carrer de Santa Anna 18, 08002 Barcelona", lat: 41.3847, lng: 2.1719 },
  "Piercing Studio Shop": { address: "Carrer dels Escudellers 26, 08002 Barcelona", lat: 41.3795, lng: 2.1776 },
  "Estanc del Centre": { address: "La Rambla 58, 08002 Barcelona", lat: 41.3806, lng: 2.1744 },
  "Aura Esoterica": { address: "Carrer de la Boqueria 17, 08002 Barcelona", lat: 41.3818, lng: 2.1747 },
  "Manga Gotic": { address: "Carrer de Pelai 32, 08001 Barcelona", lat: 41.3857, lng: 2.1685 },
  "Game Local BCN": { address: "Carrer de Balmes 12, 08007 Barcelona", lat: 41.3878, lng: 2.1655 },
  "Beauty Pro Shop": { address: "Carrer de Muntaner 42, 08011 Barcelona", lat: 41.3862, lng: 2.1604 },
  "Ortopedia Catalunya": { address: "Carrer de Mallorca 245, 08008 Barcelona", lat: 41.3939, lng: 2.1644 },
  "Salud Hogar BCN": { address: "Carrer de Provença 279, 08008 Barcelona", lat: 41.3951, lng: 2.1659 },
  "Personaliza BCN": { address: "Carrer de la Riera Baixa 21, 08001 Barcelona", lat: 41.3809, lng: 2.1661 },
  "Ceramica Local": { address: "Carrer de la Princesa 51, 08003 Barcelona", lat: 41.3860, lng: 2.1830 },
  "Travel Shop Rambla": { address: "La Rambla 133, 08002 Barcelona", lat: 41.3854, lng: 2.1695 }
};

export function getStoreLocation(product: MarketplaceProduct): StoreLocation {
  return storeLocations[product.store] ?? {
    address: `La Rambla ${Math.max(20, Math.round(product.distance * 100))}, 08002 Barcelona`,
    lat: 41.3825 + product.distance / 100,
    lng: 2.1727 + product.distance / 100
  };
}
