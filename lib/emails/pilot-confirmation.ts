/**
 * Confirmation email for people who join the Asentar pilot.
 * Usage (server only): const { subject, html, text } = pilotConfirmationEmail({...})
 *
 * Email-safe: table layout, inline styles, PNG logo (no SVG: Gmail blocks it),
 * system font fallbacks, 600px max width, works without images.
 * Colors mirror brand/tokens.css: ink #131f35, paper #f4f7fa, sello #137b5e, graphite #5d6a80, rule #d9dee6.
 */

export type PilotConfirmationInput = {
  name: string
  company: string
  role: string
  monthlyTxVolume: string
  /** Absolute origin, e.g. https://asentar.finance (no trailing slash) */
  siteUrl: string
}

const INK = "#131f35"
const PAPER = "#f4f7fa"
const WHITE = "#ffffff"
const SELLO = "#137b5e"
const SELLO_SOFT = "#e3f3ee"
const GRAPHITE = "#5d6a80"
const RULE = "#d9dee6"
const SANS = "'Public Sans', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
const MONO = "'JetBrains Mono', 'SFMono-Regular', Menlo, Consolas, 'Courier New', monospace"

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function firstName(full: string): string {
  return full.trim().split(/\s+/)[0] || full.trim()
}

export function pilotConfirmationEmail(input: PilotConfirmationInput) {
  const name = esc(firstName(input.name))
  const company = esc(input.company)
  const role = esc(input.role)
  const volume = esc(input.monthlyTxVolume)
  const site = input.siteUrl.replace(/\/$/, "")

  const subject = "Recibimos tu solicitud para el piloto de Asentar"
  const preheader = "Te escribimos dentro de las 24 horas para coordinar una llamada de 30 minutos."

  const step = (n: string, title: string, body: string, last = false) => `
              <tr>
                <td style="padding:14px 0;border-top:1px solid ${RULE};${last ? `border-bottom:1px solid ${RULE};` : ""}vertical-align:top;width:36px;font-family:${MONO};font-size:13px;line-height:20px;color:${GRAPHITE};">${n}</td>
                <td style="padding:14px 0;border-top:1px solid ${RULE};${last ? `border-bottom:1px solid ${RULE};` : ""}vertical-align:top;font-family:${SANS};">
                  <div style="font-size:15px;line-height:22px;font-weight:700;color:${INK};">${title}</div>
                  <div style="font-size:14px;line-height:21px;color:${GRAPHITE};padding-top:2px;">${body}</div>
                </td>
              </tr>`

  const row = (label: string, value: string) => `
                <tr>
                  <td style="padding:9px 0;border-bottom:1px solid ${RULE};font-family:${SANS};font-size:13px;line-height:18px;color:${GRAPHITE};">${label}</td>
                  <td align="right" style="padding:9px 0;border-bottom:1px solid ${RULE};font-family:${SANS};font-size:14px;line-height:18px;font-weight:600;color:${INK};">${value}</td>
                </tr>`

  const html = `<!doctype html>
<html lang="es-AR" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${PAPER};">${preheader}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAPER};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:${WHITE};border:1px solid ${RULE};border-radius:14px;overflow:hidden;">

          <!-- Header: ink band (on-chain) -->
          <tr>
            <td style="background:${INK};padding:28px 32px;">
              <a href="${site}" style="text-decoration:none;">
                <img src="${site}/email/asentar-logo.png" width="140" height="26" alt="asentar" style="display:block;border:0;outline:none;width:140px;height:26px;font-family:${SANS};font-size:22px;font-weight:800;color:${PAPER};">
              </a>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 32px 8px;font-family:${SANS};">
              <span style="display:inline-block;background:${SELLO_SOFT};color:${SELLO};font-size:12px;line-height:16px;font-weight:700;padding:4px 10px;border-radius:999px;">&#9679;&nbsp;Anotado</span>
              <h1 style="margin:16px 0 0;font-size:24px;line-height:30px;font-weight:800;letter-spacing:-0.02em;color:${INK};">Hola ${name}, recibimos tu solicitud.</h1>
              <p style="margin:12px 0 0;font-size:15px;line-height:23px;color:${GRAPHITE};">Ya estás en la lista del programa piloto de Asentar. Te escribimos <strong style="color:${INK};">dentro de las 24 horas</strong>, también los fines de semana, para coordinar una llamada.</p>
            </td>
          </tr>

          <!-- Next steps -->
          <tr>
            <td style="padding:24px 32px 0;">
              <div style="font-family:${MONO};font-size:11px;line-height:16px;letter-spacing:0.08em;text-transform:uppercase;color:${GRAPHITE};padding-bottom:8px;">Cómo sigue</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${step("01", "Hablamos", "Una llamada de 30 minutos para entender cómo cerrás hoy.")}${step("02", "Conectás una wallet", "Elegí una wallet con poco movimiento. Solo necesitamos su dirección pública; nunca claves privadas.")}${step("03", "Cerramos en paralelo", "Asentar cierra el mismo mes que tu equipo. Comparamos los dos cierres y decidís si te sirve.", true)}
              </table>
            </td>
          </tr>

          <!-- Summary, closed with the double rule -->
          <tr>
            <td style="padding:28px 32px 0;">
              <div style="font-family:${MONO};font-size:11px;line-height:16px;letter-spacing:0.08em;text-transform:uppercase;color:${GRAPHITE};padding-bottom:4px;">Tu solicitud</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${row("Empresa", company)}${row("Rol", role)}${row("Transacciones on-chain por mes", volume)}
              </table>
              <div style="height:3px;line-height:3px;font-size:0;border-top:1px solid ${INK};border-bottom:1px solid ${INK};margin-top:6px;">&nbsp;</div>
            </td>
          </tr>

          <!-- Invitation to reply -->
          <tr>
            <td style="padding:28px 32px 0;font-family:${SANS};">
              <p style="margin:0;font-size:15px;line-height:23px;color:${INK};">Si querés adelantar la conversación, <strong>respondé este mail</strong> contándonos qué ERP usan, cuántas wallets y exchanges manejan y cómo cierran hoy el mes.</p>
              <p style="margin:20px 0 0;font-size:15px;line-height:23px;color:${INK};">Gracias por sumarte,</p>
              <p style="margin:4px 0 0;font-size:15px;line-height:22px;color:${INK};"><strong>Matías Arias</strong><br><span style="color:${GRAPHITE};">Founder · Asentar</span></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 32px 28px;">
              <div style="border-top:1px solid ${RULE};padding-top:16px;font-family:${SANS};font-size:12px;line-height:18px;color:${GRAPHITE};">
                <a href="${site}" style="color:${INK};font-weight:600;text-decoration:none;">asentar.finance</a> · Tu actividad on-chain, asentada en tus libros.<br>
                Recibiste este mail porque te anotaste al piloto en asentar.finance. Si no fuiste vos, respondé este mail y eliminamos tus datos. <a href="${site}/privacidad" style="color:${GRAPHITE};">Política de privacidad</a>.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  const text = [
    `Hola ${firstName(input.name)}, recibimos tu solicitud.`,
    ``,
    `Ya estás en la lista del programa piloto de Asentar. Te escribimos dentro de las 24 horas, también los fines de semana, para coordinar una llamada.`,
    ``,
    `CÓMO SIGUE`,
    `01 Hablamos: una llamada de 30 minutos para entender cómo cerrás hoy.`,
    `02 Conectás una wallet: elegí una wallet con poco movimiento. Solo necesitamos su dirección pública; nunca claves privadas.`,
    `03 Cerramos en paralelo: Asentar cierra el mismo mes que tu equipo. Comparamos los dos cierres y decidís si te sirve.`,
    ``,
    `TU SOLICITUD`,
    `Empresa: ${input.company}`,
    `Rol: ${input.role}`,
    `Transacciones on-chain por mes: ${input.monthlyTxVolume}`,
    ``,
    `Si querés adelantar la conversación, respondé este mail contándonos qué ERP usan, cuántas wallets y exchanges manejan y cómo cierran hoy el mes.`,
    ``,
    `Gracias por sumarte,`,
    `Matías Arias`,
    `Founder · Asentar`,
    ``,
    `${site}`,
    `Recibiste este mail porque te anotaste al piloto en asentar.finance. Si no fuiste vos, respondé este mail y eliminamos tus datos. Política de privacidad: ${site}/privacidad`,
  ].join("\n")

  return { subject, html, text }
}
