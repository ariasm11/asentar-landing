import { z } from 'zod'

export const PILOT_ROLES = ['Controller', 'CFO', 'Contador', 'Auditor', 'Otro'] as const

export const PILOT_TX_VOLUMES = [
  'Menos de 1.000',
  '1.000 a 10.000',
  '10.000 a 100.000',
  'Más de 100.000',
] as const

export const pilotSchema = z.object({
  name: z.string().trim().min(1, 'Ingresá tu nombre.').max(120),
  email: z
    .string()
    .trim()
    .max(254)
    .pipe(z.email('Ingresá un mail válido, por ejemplo nombre@empresa.com.')),
  company: z.string().trim().min(1, 'Ingresá el nombre de tu empresa.').max(160),
  role: z.enum(PILOT_ROLES),
  monthly_tx_volume: z.enum(PILOT_TX_VOLUMES),
})

export type PilotInput = z.infer<typeof pilotSchema>
export type PilotField = keyof PilotInput
