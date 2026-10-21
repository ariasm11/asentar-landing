import 'server-only'

import { Resend } from 'resend'

export type PilotNotificationData = {
  name: string
  email: string
  company: string
  role: string
  monthly_tx_volume: string
  utm_source: string | null
}

const limit = (value: string) => value.slice(0, 100)

function firstName(value: string) {
  return limit(value.trim().split(/\s+/)[0] ?? '')
}

function origin(value: string | null) {
  return limit(value?.trim() || 'directo')
}

export async function notifyDiscord(data: PilotNotificationData) {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL
    if (!webhookUrl) return

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        allowed_mentions: { parse: [] },
        embeds: [
          {
            title: 'Nuevo anotado al piloto',
            color: 0x137b5e,
            fields: [
              { name: 'Nombre', value: firstName(data.name), inline: true },
              { name: 'Empresa', value: limit(data.company), inline: true },
              { name: 'Rol', value: limit(data.role), inline: true },
              { name: 'Volumen mensual', value: limit(data.monthly_tx_volume), inline: true },
              { name: 'Origen', value: origin(data.utm_source), inline: true },
            ],
            footer: { text: 'Respondé dentro de las 24 h · ver en Supabase' },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    })

    if (!response.ok) {
      console.error('[notifyDiscord] Webhook failed', response.status)
    }
  } catch (error) {
    console.error('[notifyDiscord] Failed', error)
  }
}

export async function notifyEmail(data: PilotNotificationData) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.ALERT_EMAIL_TO
    if (!apiKey || !to) return

    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send(
      {
        from: 'Asentar <avisos@asentar.finance>',
        to,
        subject: `Nuevo anotado al piloto: ${data.company}`,
        text: [
          `Nombre: ${data.name}`,
          `Email: ${data.email}`,
          `Empresa: ${data.company}`,
          `Rol: ${data.role}`,
          `Volumen mensual: ${data.monthly_tx_volume}`,
          `Origen: ${origin(data.utm_source)}`,
        ].join('\n'),
      },
      { idempotencyKey: `pilot-signup/${data.email}` },
    )

    if (error) {
      console.error('[notifyEmail] Resend failed', error)
    }
  } catch (error) {
    console.error('[notifyEmail] Failed', error)
  }
}
