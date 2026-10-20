# Asentar — Brand & Design System

**This folder (`/brand`) is the source of truth for Asentar's identity.** Before any page,
screen, or component work, read this file and use the tokens, type scale and logo defined
here. Do not hardcode colors or sizes, and do not invent logo variants.

Asentar is an AI-powered crypto accounting subledger for Latin American companies (PSAVs,
crypto fintechs). It reads wallets and exchanges, classifies every movement, generates journal
entries for the client's ERP, and seals every month-end close on-chain (EAS).
Domain: **asentar.finance** (app, landing, email) · **asentar.io** (docs, API; redirects).

Architecture: **single brand.** Features carry plain Spanish descriptors, never sub-brands:
Ingesta · Clasificación · Conciliación · Cierre. The one proprietary term is **Sello de cierre**
(the on-chain attestation of a close). Country modules: `Asentar AR`, `Asentar UY`, ... (ISO code).

Personality: an accountant who understands blockchain. **Firme, exacta, local, transparente.**
The product speaks accounting (libro diario, asiento, conciliación, cierre), not trading.
Ethereum is the guarantee that a close was not altered, never the protagonist.

## Files in this folder
- `BRAND.md` — this doc.
- `tokens.css` — OKLCH color tokens + type scale + Tailwind v4 `@theme`. Imported by
  `app/globals.css`. **The color + type source of truth.**
- `logo.tsx` — `<AsentarMark />`, `<AsentarLogo />`.
- `assets/icon.svg` — app icon / favicon (ink tile). Master vector.

## Color — "tinta sobre papel"
One token set, values inverted between modes. `:root` = light (**default**; finance teams work
by day), `.dark` = dark. Toggle with `.dark` on `<html>`. Always consume token utilities
(`bg-background`, `text-foreground`, `bg-primary`, `text-sello`, `border-border`, ...) — never
hardcode hex or oklch in components.

- Neutrals are **cool** (hue 250–262): blue-black ink on cool paper. Never warm/cream, never
  pure black. Off-black L 0.19, paper L 0.975.
- **Primary = ink.** Buttons, CTAs and links are ink (`bg-primary text-primary-foreground`).
  Never green buttons.
- **Sello green (hue 168) is the single accent and means one thing: reconciled / sealed.**
  Use it for the Haber bar in the mark, the `Conciliado` / `Sellado` state, the Sello de cierre
  and focus rings. **Never decorative.** Target proportion on any screen: ~2% sello.
- Radius: 8px controls (`rounded-md`), 14px cards/panels (`rounded-xl`), full pill only for
  status chips. **No shadows** — hierarchy comes from 1px borders and the double total rule.

### Reconciliation states — hard rules
Every movement shows exactly one state, **always as label + color, never color alone**:

| State | Label (UI) | Tokens |
|---|---|---|
| Reconciled / sealed | `Conciliado`, `Sellado` | `bg-sello-soft text-sello` |
| Needs human review | `Revisar` | `bg-review-soft text-review` |
| Does not reconcile | `Diferencia` (+ amount) | `bg-diff-soft text-diff` |
| Informational | `Pendiente de ingesta`, etc. | `bg-info-soft text-info` |

`--review` (amber, hue 65) is a state, not a brand color.

### Amounts — accounting convention
- Always `font-mono` + `tabular-nums`, right-aligned, fixed decimals per currency.
- Format **es-AR**: thousands `.` decimals `,` → `1.250,00`. Use `Intl.NumberFormat("es-AR")`.
- **Negatives in parentheses** and `text-negative`: `(1.250,00)`. Positives stay in
  `text-foreground` — no green for gains (green is reserved for sello).
- Currency code after the amount in `text-muted-foreground`: `1.250,00 USDC`.
- Totals get the double rule: `.total-cerrado` (3px double border-bottom).
- ARS conversions always state the rate type: `oficial`, `MEP` or `CCL`.

### Landing — "oscuro = on-chain, claro = libros"
The **app** is light by default. The **landing** uses a fixed composition and does **not**
follow the visitor's system theme:
- **Dark bands (`.dark` wrapper):** only where the page talks about what happens on-chain —
  the **hero** (particle cloud settling into the mark) and the **Sello de cierre** section.
- **Light (`:root`):** everything about the books — how it works (demo videos show the light
  app), AI vs rules, who it's for, comparison, pilot form, FAQ, footer.
- **Header:** sticky; dark while it sits over the hero, paper after it (toggle `.dark` on the
  header as the hero scrolls out).
- Never add a third dark band without an on-chain reason.

## Typography
- UI / headings / body / wordmark: **Public Sans**. Hashes / addresses / tx IDs / block numbers /
  amounts in tables: **JetBrains Mono**. Both on Google Fonts.
- Install (Next.js): `next/font/google` → `Public_Sans({ variable: "--font-public-sans" })`,
  `JetBrains_Mono({ variable: "--font-jetbrains-mono" })`; put both `.variable` classes on
  `<html>`. `tokens.css` already maps them to `--font-sans` / `--font-mono`.
- Scale (Tailwind utilities from `tokens.css`, line-height/tracking/weight baked in):
  `text-display`, `text-display-2` (landing only), `text-h1`, `text-h2`, `text-h3`,
  `text-body-lg`, `text-body` (default UI, 14px), `text-body-sm`, `text-label`,
  `text-micro` (rótulo — add `uppercase` in markup).
- Weights: 400 / 500 / 600 / 700 in the app. **800 only for the wordmark and display.**
- Hashes and addresses are truncated middle: `0x7a3f…c21e`, always copyable, full value on hover.
- Tables: 40px rows, dense. `text-label` headers over a 2px `border-foreground` rule.

### Wordmark
**"asentar"** — Public Sans **ExtraBold (800)**, tracking **−0.045em**, **always lowercase**
in the logo. In running text the name is written "Asentar" (capital A). Use `<AsentarLogo />`.

## Logomark rules
The mark is an accounting entry: **Debe** bar (flush left), **Haber** bar (indented, sello
green), **double rule** (a closed total). Use `<AsentarMark />` / `<AsentarLogo />`.
- `tone="brand"` (default): currentColor + sello Haber. `tone="mono"`: all currentColor.
- Color via tokens: `text-foreground` on paper, `text-primary-foreground` on ink.
- Clear space ≥ 2× the height of one bar around the lockup. Min 16px (use `assets/icon.svg`
  for favicons; it is grid-snapped).
- **Never:** align the Haber bar left (it stops being an entry), color the Debe bar green,
  rotate, stretch, gradient, glow, shadow, 3D, uppercase the wordmark, or add a third bar.

## Voice & copy
- UI language: **Spanish**. Voseo for AR/UY (`Cerraste septiembre`), neutral tú elsewhere.
- Short sentences, precise accounting terms. Crypto jargon only when there is no accounting
  equivalent (`wallet`, `swap`, `bridge`, `gas` stay in English).
- Glossary: **asiento** (not entry), **cierre** (not snapshot), **Sello de cierre** in the UI
  ("atestación EAS" only in technical docs).
- AI **classifies**, rules **calculate**. Never write copy implying the AI computes amounts.
  Every AI classification shows its reason and confidence (`Cobro a cliente · confianza 97%`).
- Buttons state the exact action: `Cerrar septiembre`, `Exportar a Tango`, `Revisar 3 pendientes`.
- Errors say what failed and how to fix it. No apologies, no emoji, no "¡revolucionamos…!".

## Quick do / don't
- DO consume tokens and type utilities; DON'T hardcode hex, oklch or ad-hoc font sizes.
- DO keep amounts in `font-mono` + `tabular-nums` with es-AR format; DON'T misalign columns.
- DO use ink for actions and sello only for reconciled/sealed; DON'T use green as decoration.
- DO show state as label + color; DON'T rely on hue alone.
- DO keep light as default in the app; on the landing, DO keep dark only for on-chain bands
  (hero, Sello); DON'T invent a third theme or follow the system theme on the landing.
