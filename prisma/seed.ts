import { PrismaClient, ProductStatus, MerchantStatus, PromotionType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
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

  for (const name of categories) {
    await prisma.category.upsert({
      where: { slug: name.toLowerCase().replaceAll(" ", "-") },
      update: {},
      create: { name, slug: name.toLowerCase().replaceAll(" ", "-") }
    });
  }

  const merchant = await prisma.merchant.upsert({
    where: { id: "demo-ferreteria" },
    update: {},
    create: {
      id: "demo-ferreteria",
      legalName: "Ferreteria Ramblas Pro SL",
      commercialName: "Ferreteria Ramblas Pro",
      status: MerchantStatus.ACTIVE,
      contactEmail: "comercio.ferreteria@demo.com",
      contactPhone: "+34 930 000 001",
      description: "Ferreteria local cerca de Las Ramblas con productos para pequenas reparaciones y bricolaje."
    }
  });

  const store = await prisma.store.upsert({
    where: { slug: "ferreteria-ramblas-pro" },
    update: {},
    create: {
      merchantId: merchant.id,
      name: "Ferreteria Ramblas Pro",
      slug: "ferreteria-ramblas-pro",
      street: "Carrer de la Portaferrissa 12",
      city: "Barcelona",
      district: "Gotico",
      lat: 41.3831,
      lng: 2.1738,
      pickupEnabled: true,
      deliveryEnabled: true
    }
  });

  const product = await prisma.product.upsert({
    where: { slug: "pinzas-pequenas-metalicas-pack-12" },
    update: {},
    create: {
      merchantId: merchant.id,
      storeId: store.id,
      name: "Pinzas pequenas metalicas pack 12",
      slug: "pinzas-pequenas-metalicas-pack-12",
      description: "Pack de pinzas pequenas metalicas para bricolaje, sujeccion y pequenas reparaciones.",
      status: ProductStatus.ACTIVE,
      basePrice: 2.95,
      isPromoted: true
    }
  });

  const variant = await prisma.productVariant.upsert({
    where: { sku: "FER-PINZAS-12" },
    update: {},
    create: {
      productId: product.id,
      name: "Pack 12 unidades",
      sku: "FER-PINZAS-12",
      optionSummary: "Metalicas, pequenas",
      price: 2.95
    }
  });

  await prisma.inventory.upsert({
    where: { variantId: variant.id },
    update: { stockAvailable: 42, lowStockThreshold: 5 },
    create: { variantId: variant.id, stockAvailable: 42, lowStockThreshold: 5 }
  });

  await prisma.promotion.upsert({
    where: { code: "FINBROADPEAK26" },
    update: {},
    create: {
      name: "Descuento Broad Peak",
      code: "FINBROADPEAK26",
      type: PromotionType.PERCENTAGE,
      value: 15,
      startsAt: new Date("2026-01-01T00:00:00.000Z"),
      endsAt: new Date("2026-12-31T23:59:59.000Z"),
      usageLimitPerUser: 1,
      minimumOrderAmount: 5,
      fundedBy: "MARKETPLACE"
    }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
