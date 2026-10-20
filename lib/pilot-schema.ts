import { z } from 'zod'

export const PILOT_ROLES = ['Controller', 'CFO', 'Contador', 'Auditor', 'Otro'] as const

export const PILOT_TX_VOLUMES = [
  'Menos de 1.000',
  '1.000 a 10.000',
  '10.000 a 100.000',
  'Más de 100.000',
] as const

const optionalUtm = z
  .string()
  .trim()
  .max(200)
  .transform((value) => value || null)
  .nullable()
  .catch(null)

export const pilotSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Ingresá tu nombre.')
    .max(120, 'El nombre puede tener hasta 120 caracteres.'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, 'Ingresá un mail válido, por ejemplo nombre@empresa.com.')
    .pipe(z.email('Ingresá un mail válido, por ejemplo nombre@empresa.com.')),
  company: z
    .string()
    .trim()
    .min(2, 'Ingresá el nombre de tu empresa.')
    .max(160, 'El nombre de la empresa puede tener hasta 160 caracteres.'),
  role: z.enum(PILOT_ROLES, 'Elegí un rol de la lista.'),
  monthly_tx_volume: z.enum(PILOT_TX_VOLUMES, 'Elegí un rango de la lista.'),
  consent_privacy: z.literal('on', 'Para sumarte tenés que aceptar la Política de privacidad.'),
  utm_source: optionalUtm,
  utm_medium: optionalUtm,
  utm_campaign: optionalUtm,
})

export type PilotInput = z.infer<typeof pilotSchema>

export const PILOT_FIELDS = [
  'name',
  'email',
  'company',
  'role',
  'monthly_tx_volume',
  'consent_privacy',
] as const

export type PilotField = (typeof PILOT_FIELDS)[number]

export type PilotValues = {
  name: string
  email: string
  company: string
  role: string
  monthly_tx_volume: string
  consent_privacy: boolean
}

export type JoinPilotState =
  | { status: 'idle' }
  | { ok: true; already?: boolean; name?: string; email?: string }
  | {
      ok: false
      error?: string
      fieldErrors?: Partial<Record<PilotField, string>>
      values: PilotValues
    }
