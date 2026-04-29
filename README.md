# faciliteaGO by CaixaBank

Marketplace local funcional orientado a comercio de proximidad, preparado para desplegar en Vercel desde GitHub.

## Objetivo

Construir una demo avanzada que se comporte como producto real. La unica parte simulada sera la pasarela externa de pago. El resto debe funcionar de forma persistente y trazable: usuarios, comercios, productos, stock, carrito, checkout, pedidos, subpedidos por comercio, promociones, reseñas, incidencias, panel de usuario, panel de comercio, backoffice admin, auditoria, metricas y JuanIAs con acciones reales.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- NextAuth/Auth.js
- Vercel
- GitHub
- Playwright para e2e
- Vitest para logica de negocio

## Principios de producto

- No es una maqueta estatica.
- No se guardan datos de negocio en arrays de frontend.
- Todo flujo critico debe pasar por servidor.
- El pedido es real aunque el pago sea simulado.
- El stock se reserva, se confirma, se libera o se descuenta.
- Cada comercio opera sus propios subpedidos.
- El admin gobierna comercios, productos, promociones, incidencias y metricas.
- JuanIAs no es un chatbot decorativo: usa herramientas internas para buscar, filtrar, ordenar y actuar sobre el carrito.

## Usuarios demo previstos

- comprador@demo.com
- comercio.ferreteria@demo.com
- comercio.gominolas@demo.com
- comercio.souvenirs@demo.com
- soporte@demo.com
- admin@demo.com

## Flujos que deben funcionar

1. Usuario busca productos cerca de Las Ramblas.
2. Filtra por categoria, distancia, precio, stock, promocion y comercio abierto.
3. Visualiza mapa sincronizado con resultados.
4. Entra en comercio y producto.
5. JuanIAs recomienda y modifica el carrito.
6. Aplica cupon FINBROADPEAK26.
7. Realiza checkout.
8. Pago simulado confirma, rechaza o queda pendiente.
9. El pedido queda guardado.
10. Se generan subpedidos por comercio.
11. El comercio confirma o rechaza.
12. Se actualiza stock.
13. Se genera codigo de recogida.
14. Usuario consulta estado.
15. Usuario crea incidencia, devolucion o reseña.
16. Admin revisa metricas, comercios, productos e incidencias.

## Instalacion local

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

## Variables principales

Consultar `.env.example`.

## Estado actual

Base inicial del proyecto. El alcance completo esta documentado en `docs/PRODUCT_SCOPE.md` y el modelo de datos en `prisma/schema.prisma`.
