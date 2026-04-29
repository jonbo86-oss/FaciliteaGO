# Despliegue en Vercel

## Objetivo

El repositorio esta preparado para conectarse a Vercel como proyecto Next.js full-stack. La demo debe poder evolucionar desde landing navegable hasta marketplace conectado a PostgreSQL, Prisma, Auth, seed y APIs reales.

## Pasos en Vercel

1. Importar el repositorio `jonbo86-oss/FaciliteaGO`.
2. Framework preset: Next.js.
3. Build command: `npm run build`.
4. Install command: `npm install`.
5. Output directory: automatico por Next.js.
6. Configurar variables de entorno.

## Variables obligatorias

```bash
NEXT_PUBLIC_APP_URL=https://tu-url.vercel.app
AUTH_SECRET=valor-seguro
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/faciliteago
PAYMENT_SIMULATOR_MODE=enabled
DEMO_COUPON_CODE=FINBROADPEAK26
```

## Variables opcionales

```bash
RESEND_API_KEY=
OPENAI_API_KEY=
BLOB_READ_WRITE_TOKEN=
SENTRY_DSN=
```

## Base de datos

Se recomienda Vercel Postgres, Neon, Supabase Postgres o cualquier PostgreSQL gestionado.

Comandos locales:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Rutas actuales

- `/`: marketplace publico.
- `/usuario`: portal usuario.
- `/comercio`: portal comercio.
- `/admin`: backoffice admin.
- `/api/health`: comprobacion de servicio.
- `/api/payment/simulate`: simulador de pago.
- `/api/juanias/actions`: acciones base de JuanIAs.

## Criterio de despliegue inicial

El primer despliegue debe validar:

- Build Next.js correcto.
- Carga de home.
- Carga de portales principales.
- APIs base responden.
- Prisma genera cliente.

## Siguientes iteraciones tecnicas

1. Conectar Auth real.
2. Ejecutar migraciones sobre PostgreSQL real.
3. Sustituir datos demo en frontend por consultas Prisma/API.
4. Implementar carrito persistente.
5. Implementar checkout real con pago simulado.
6. Implementar subpedidos por comercio.
7. Implementar acciones reales de JuanIAs contra carrito y catalogo.
8. Activar emails reales.
9. Activar observabilidad.
10. Endurecer ESLint de nuevo cuando el primer bootstrap compile estable.
