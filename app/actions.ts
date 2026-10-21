'use server'

import {
  pilotSchema,
  type JoinPilotState,
  type PilotField,
  type PilotValues,
} from '@/lib/pilot-schema'
import { after } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase-admin'
import { notifyDiscord, notifyEmail, type PilotNotificationData } from '@/lib/notify'

const GENERIC_ERROR =
  'No pudimos guardar tus datos. Probá de nuevo en un minuto o escribinos a hola@asentar.finance.'

function text(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value : ''
}

export async function joinPilot(
  _prevState: JoinPilotState,
  formData: FormData,
): Promise<JoinPilotState> {
  if (text(formData, 'asentar_hp_ref').trim() !== '') {
    return { ok: true }
  }

  const values: PilotValues = {
    name: text(formData, 'name'),
    email: text(formData, 'email'),
    company: text(formData, 'company'),
    role: text(formData, 'role'),
    monthly_tx_volume: text(formData, 'monthly_tx_volume'),
    consent_privacy: formData.get('consent_privacy') === 'on',
  }

  const parsed = pilotSchema.safeParse({
    ...values,
    consent_privacy: text(formData, 'consent_privacy'),
    utm_source: text(formData, 'utm_source'),
    utm_medium: text(formData, 'utm_medium'),
    utm_campaign: text(formData, 'utm_campaign'),
  })

  if (!parsed.success) {
    const fieldErrors: Partial<Record<PilotField, string>> = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as PilotField
      if (!fieldErrors[field]) fieldErrors[field] = issue.message
    }
    return { ok: false, fieldErrors, values }
  }

  const data = parsed.data
  const privacyVersion = process.env.PRIVACY_VERSION

  if (!privacyVersion) {
    console.error('[joinPilot] Missing PRIVACY_VERSION')
    return { ok: false, error: GENERIC_ERROR, values }
  }

  try {
    const supabase = createSupabaseAdmin()
    const { error } = await supabase.from('pilot_signups').insert({
      name: data.name,
      email: data.email,
      company: data.company,
      role: data.role,
      monthly_tx_volume: data.monthly_tx_volume,
      consent_privacy: true,
      privacy_version: privacyVersion,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
    })

    if (error) {
      if (error.code === '23505') {
        return { ok: true, already: true }
      }
      console.error('[joinPilot] Supabase insert failed', {
        code: error.code,
        message: error.message,
      })
      return { ok: false, error: GENERIC_ERROR, values }
    }
  } catch (err) {
    console.error('[joinPilot] Unexpected error', err)
    return { ok: false, error: GENERIC_ERROR, values }
  }

  const notificationData: PilotNotificationData = {
    name: data.name,
    email: data.email,
    company: data.company,
    role: data.role,
    monthly_tx_volume: data.monthly_tx_volume,
    utm_source: data.utm_source,
  }

  after(async () => {
    await Promise.allSettled([notifyDiscord(notificationData), notifyEmail(notificationData)])
  })

  return { ok: true, name: data.name, email: data.email }
}
