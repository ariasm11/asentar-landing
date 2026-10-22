# CLAUDE.md — asentar-landing

## Contexto
Landing de Asentar (asentar.finance): subledger contable cripto para LATAM. Una página (`app/page.tsx`)
armada con secciones de `components/`, más `/privacidad` y un formulario de inscripción al piloto.

- Stack: Next.js 16 (App Router) · React 19 · TypeScript estricto · Tailwind CSS v4 · shadcn/Base UI ·
  Zod. Deploy en Vercel, con Vercel Analytics en producción.
- Formulario: `components/pilot-form.tsx` → server action `app/actions.ts` → Supabase
  (`lib/supabase-admin.ts`) y avisos por Resend y Discord (`lib/notify.ts`).
- Marca: `brand/BRAND.md` es la fuente de verdad (tokens, tipografía, logo). Leelo antes de tocar UI;
  nada de colores ni tamaños hardcodeados.
- Metadata global y JSON-LD `Organization` en `app/layout.tsx`. Imagen OG en `app/opengraph-image.png`.

## Correr local
```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # verificar tipos y build antes de abrir el PR
```
El formulario necesita en `.env.local`: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
`ALERT_EMAIL_TO`, `DISCORD_WEBHOOK_URL`, `PRIVACY_VERSION` y, opcional, `SITE_URL`. Para trabajo de
SEO/GEO no hacen falta: sin ellas el sitio funciona igual y el formulario se ve, pero al enviarlo da
error. Los valores no se comparten con colaboradores. Para probar el formulario, usá el preview del PR
en Vercel.

## Flujo de trabajo
- Nunca commitear a `main`. Una rama por tema: `seo/...`, `geo/...`, `fix/...`, `chore/...`.
- PRs chicos y enfocados en un solo tema.
- Todo cambio entra por PR revisado por @ariasm11 o @bogos (ver `.github/CODEOWNERS`).

## Alcance de SEO/GEO (se puede trabajar sin pedir permiso)
Metadata, títulos y descripciones, Open Graph, canonical, sitemap, robots.txt, datos estructurados
JSON-LD, llms.txt, textos y jerarquía de headings (un solo `h1` por página; en la home es el del hero), performance y accesibilidad.

## Requiere aprobación previa (preguntar antes de tocar)
- `lib/notify.ts`, `app/actions.ts` y cualquier lógica de formularios o integración con Supabase/Resend.
- Dependencias nuevas.
- Scripts de terceros: analytics, tags, píxeles.
- Configuración de build o deploy (`next.config.mjs`, `package.json`, `tsconfig.json`, Vercel). Esto
  incluye las redirecciones `/aff` y `/t`, que están impresas en QR de eventos.
- Textos legales: `app/privacidad/`, `lib/legal.ts`.

## Reglas de contenido
- No inventar features, clientes, métricas ni testimonios.
- Lo que declaren el JSON-LD y `llms.txt` tiene que coincidir con lo que dice la página.
- No bloquear crawlers de buscadores ni de IA en `robots.txt` sin consultarlo.

## Seguridad
- Nunca commitear `.env` ni credenciales; `.gitignore` ya los excluye, no lo debilites.
- No exponer datos personales: ni en código, ni en logs, ni en commits. Firmá con tu email noreply de GitHub.
