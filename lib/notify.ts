import 'server-only'

import { Resend } from 'resend'
import { pilotConfirmationEmail } from '@/lib/emails/pilot-confirmation'

export type PilotNotificationData = {
  id: string
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
    if (!webhookUrl) {
      console.error('[notify] DISCORD_WEBHOOK_URL no configurada, aviso omitido')
      return
    }

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
            footer: {
              text: `Respondé dentro de las 24 h · ver en Supabase · id: ${data.id.slice(0, 8)}`,
            },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    })

    const responseBody = await response.text()
    if (!response.ok) {
      console.error('[notify] Discord falló', {
        status: response.status,
        body: responseBody,
      })
      return
    }

    console.log('[notify] Discord enviado')
  } catch (error) {
    console.error('[notifyDiscord] Failed', error)
  }
}

export async function notifyEmail(data: PilotNotificationData) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.ALERT_EMAIL_TO
    if (!apiKey) {
      console.error('[notify] RESEND_API_KEY no configurada, aviso omitido')
    }
    if (!to) {
      console.error('[notify] ALERT_EMAIL_TO no configurada, aviso omitido')
    }
    if (!apiKey || !to) return

    const resend = new Resend(apiKey)
    const { data: sentEmail, error } = await resend.emails.send(
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
      { idempotencyKey: `pilot-signup/${data.id}` },
    )

    if (error) {
      console.error('[notify] Mail falló', {
        status: error.statusCode,
        body: error.message,
      })
      return
    }

    console.log(`[notify] Mail enviado, id: ${sentEmail?.id ?? 'desconocido'}`)
  } catch (error) {
    console.error('[notifyEmail] Failed', error)
  }
}

/** Confirmation email to the person who joined the pilot. Never logs their address. */
export async function sendPilotConfirmation(data: PilotNotificationData) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('[notify] RESEND_API_KEY no configurada, confirmación omitida')
      return
    }

    const { subject, html, text } = pilotConfirmationEmail({
      name: data.name,
      company: data.company,
      role: data.role,
      monthlyTxVolume: data.monthly_tx_volume,
      siteUrl: process.env.SITE_URL ?? 'https://asentar.finance',
    })

    const resend = new Resend(apiKey)
    const { data: sentEmail, error } = await resend.emails.send(
      {
        from: 'Asentar <hola@asentar.finance>',
        replyTo: 'matias@asentar.finance',
        to: data.email,
        subject,
        html,
        text,
      },
      { idempotencyKey: `pilot-confirmation/${data.id}` },
    )

    if (error) {
      console.error('[notify] Confirmación falló', {
        status: error.statusCode,
        body: error.message,
      })
      return
    }

    console.log(`[notify] Confirmación enviada, id: ${sentEmail?.id ?? 'desconocido'}`)
  } catch (error) {
    console.error('[sendPilotConfirmation] Failed', error)
  }
}
