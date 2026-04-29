# Alcance funcional de faciliteaGO

## Vision

faciliteaGO by CaixaBank es un marketplace local para conectar consumidores con comercios de proximidad. La demo debe parecer un producto final, no un mockup. La pasarela externa de pago sera simulada, pero los procesos internos seran reales y persistentes.

## Requisitos obligatorios

### Web publica

- Home con identidad CaixaBank y enfoque comercio local.
- Buscador por producto, comercio, categoria, necesidad y barrio.
- Categorias locales: ferreteria, gominolas, souvenirs, papeleria, floristeria, moda, hogar, belleza, mascotas, electronica/reparacion, alimentacion gourmet y juguetes.
- Promociones de la semana.
- Comercios destacados.
- Productos destacados.
- Mapa interactivo sincronizado con resultados.
- Ficha de comercio.
- Ficha de producto.
- Estados vacios y errores.

### Usuario comprador

- Registro y login.
- Perfil, direcciones y consentimientos.
- Carrito persistente.
- Checkout real.
- Pago simulado con escenarios.
- Historico de pedidos.
- Detalle de pedido.
- Codigo de recogida.
- Cancelaciones y devoluciones.
- Incidencias.
- Resenas verificadas.
- Favoritos en fase posterior.

### Comercio

- Login comercio.
- Dashboard.
- Gestion de productos.
- Variantes.
- Stock.
- Imagenes.
- Promociones.
- Gestion de pedidos.
- Confirmar o rechazar subpedidos.
- Marcar como preparando, listo para recoger, entregado o cancelado.
- Ver ventas.
- Ver y responder resenas.
- Ver liquidaciones simuladas.

### Admin marketplace

- Dashboard global.
- Gestion de usuarios.
- Gestion de comercios.
- Alta, aprobacion, suspension y rechazo de comercios.
- Aprobacion de productos.
- Gestion de categorias.
- Gestion de promociones y cupones.
- Gestion de banners y contenido home.
- Revision de pedidos.
- Revision de incidencias.
- Moderacion de resenas.
- Auditoria y logs.
- KPIs.

### Pago simulado

La pasarela externa se simula, pero el sistema interno de pagos es real.

Escenarios:

- Pago aprobado.
- Pago rechazado.
- Pago pendiente.
- Error tecnico.
- Reembolso total.
- Reembolso parcial.

El pago debe impactar en pedido, subpedidos, stock, devoluciones, liquidaciones y auditoria.

### Stock

- Stock disponible.
- Stock reservado.
- Stock vendido.
- Movimientos de inventario.
- Reserva en checkout.
- Liberacion por expiracion o fallo.
- Descuento por venta.
- Reposicion por devolucion.

### Pedidos

- Pedido padre por comprador.
- Subpedido por comercio.
- Lineas con snapshot de precio, producto y comercio.
- Historico de estados.
- Trazabilidad de origen: usuario, comercio, admin, sistema o IA.

### JuanIAs

JuanIAs debe usar acciones reales:

- searchProducts
- filterProducts
- sortProducts
- getNearbyStores
- addToCart
- removeFromCart
- showCart
- applyCoupon
- getOrderStatus
- recommendBundle

Reglas:

- No inventar stock.
- No inventar precios.
- No recomendar productos inexistentes.
- No ejecutar compra, cancelacion o devolucion sin confirmacion.
- Registrar acciones en ai_action_logs.

### Demo Broad Peak obligatoria

- Ciudad inicial: Barcelona.
- Ubicacion por defecto: Las Ramblas.
- Codigo descuento: FINBROADPEAK26.
- Ferreteria con pinzas pequenas en promocion.
- Tienda de gominolas con anillo de caramelo en promocion.
- Tiendas de souvenirs, ferreterias, gominolas, papelerias, floristerias y otros comercios locales.
- Sin restaurantes.
- Compras navegables en portal usuario.
- Mapa interactivo.
- Precios realistas.
- Imagenes variadas y no repetidas.

## Criterios de aceptacion de demo

1. El usuario puede buscar y filtrar productos.
2. El mapa refleja resultados y comercios.
3. El usuario puede anadir productos al carrito.
4. JuanIAs puede modificar el carrito bajo peticion.
5. El usuario puede aplicar FINBROADPEAK26.
6. El usuario puede completar checkout con pago simulado.
7. Se crea pedido persistente.
8. Se crean subpedidos por comercio.
9. El comercio puede confirmar o rechazar.
10. El usuario puede ver el estado del pedido.
11. Se genera codigo de recogida.
12. El usuario puede crear incidencia o resena.
13. El admin puede ver datos y operar.
14. El despliegue en Vercel compila sin errores.
