'use server'

import { pilotSchema, type PilotInput } from '@/lib/pilot-schema'

export type JoinPilotResult = { ok: true } | { ok: false; error: string }

export async function joinPilot(data: PilotInput): Promise<JoinPilotResult> {
  const parsed = pilotSchema.safeParse(data)
  if (!parsed.success) {
    return { ok: false, error: 'Revisá los datos del formulario.' }
  }

  // Stub: the Supabase insert is wired up in the final step.
  return { ok: true }
}
