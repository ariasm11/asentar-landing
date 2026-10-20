'use client'

import Link from 'next/link'
import { useActionState, useEffect, useState } from 'react'
import { joinPilot } from '@/app/actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  PILOT_ROLES,
  PILOT_TX_VOLUMES,
  type JoinPilotState,
  type PilotField,
} from '@/lib/pilot-schema'

const fieldClass = 'h-11 bg-muted px-4 text-body'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const
type UtmKey = (typeof UTM_KEYS)[number]
type Utms = Record<UtmKey, string>

const initialState: JoinPilotState = { status: 'idle' }

function useUtms(): Utms {
  const [utms, setUtms] = useState<Utms>({ utm_source: '', utm_medium: '', utm_campaign: '' })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const next = { utm_source: '', utm_medium: '', utm_campaign: '' }
    for (const key of UTM_KEYS) {
      const fromUrl = params.get(key)
      try {
        if (fromUrl) sessionStorage.setItem(key, fromUrl)
        next[key] = sessionStorage.getItem(key) ?? ''
      } catch {
        next[key] = fromUrl ?? ''
      }
    }
    setUtms(next)
  }, [])

  return utms
}

export function PilotForm() {
  const [state, formAction, isPending] = useActionState(joinPilot, initialState)
  const utms = useUtms()

  const failed = 'ok' in state && !state.ok ? state : null
  const values = failed?.values
  const errors: Partial<Record<PilotField, string>> = failed?.fieldErrors ?? {}

  const [role, setRole] = useState<string>(PILOT_ROLES[0])
  const [volume, setVolume] = useState<string>(PILOT_TX_VOLUMES[0])

  if ('ok' in state && state.ok) {
    return (
      <Card className="gap-4 border border-border p-6 ring-0 md:p-8" role="status" aria-live="polite">
        <Badge className="h-auto gap-1.5 bg-sello-soft px-3 py-1 text-label text-sello">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-sello" />
          Anotado
        </Badge>
        {state.already || !state.name ? (
          <p className="text-h3 font-bold text-balance">
            Ese mail ya estaba en la lista. Te escribimos dentro de las 24 horas.
          </p>
        ) : (
          <>
            <p className="text-h3 font-bold text-balance">
              {state.name}, ya estás en la lista del piloto.
            </p>
            <p className="text-body leading-relaxed text-muted-foreground">
              Te escribimos dentro de las 24 horas a{' '}
              <span className="font-semibold text-foreground">{state.email}</span>.
            </p>
          </>
        )}
      </Card>
    )
  }

  // Re-key on each failed submit so uncontrolled inputs pick up the returned values
  // instead of being cleared by React's automatic form reset.
  const formKey = failed ? JSON.stringify(failed.values) + (failed.error ?? '') : 'initial'

  return (
    <Card className="border border-border p-6 ring-0 md:p-8">
      <form
        key={formKey}
        action={formAction}
        noValidate
        className="relative grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2"
      >
        <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
          <label htmlFor="website">Sitio web</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        {UTM_KEYS.map((key) => (
          <input key={key} type="hidden" name={key} value={utms[key]} />
        ))}
        <input type="hidden" name="role" value={role} />
        <input type="hidden" name="monthly_tx_volume" value={volume} />

        <TextField
          id="name"
          label="Nombre"
          autoComplete="name"
          defaultValue={values?.name}
          error={errors.name}
        />
        <TextField
          id="email"
          label="Mail de trabajo"
          type="email"
          autoComplete="email"
          inputMode="email"
          defaultValue={values?.email}
          error={errors.email}
        />
        <TextField
          id="company"
          label="Empresa"
          autoComplete="organization"
          defaultValue={values?.company}
          error={errors.company}
        />

        <SelectField
          id="role"
          label="Rol"
          value={role}
          options={PILOT_ROLES}
          onChange={setRole}
          error={errors.role}
        />

        <SelectField
          id="monthly_tx_volume"
          label="Transacciones on-chain por mes"
          value={volume}
          options={PILOT_TX_VOLUMES}
          onChange={setVolume}
          error={errors.monthly_tx_volume}
          className="sm:col-span-2"
        />

        <div className="flex flex-col gap-2 sm:col-span-2">
          <div className="flex items-center gap-3">
            <input
              id="consent_privacy"
              name="consent_privacy"
              type="checkbox"
              required
              defaultChecked={values?.consent_privacy}
              aria-invalid={errors.consent_privacy ? true : undefined}
              aria-describedby={errors.consent_privacy ? 'consent_privacy-error' : undefined}
              className="size-4 shrink-0 cursor-pointer accent-primary"
            />
            <Label htmlFor="consent_privacy" className="text-body font-normal">
              <span>
                Acepto la{' '}
                <Link
                  href="/privacidad"
                  className="font-semibold underline underline-offset-4 hover:text-muted-foreground"
                >
                  Política de privacidad
                </Link>
              </span>
            </Label>
          </div>
          {errors.consent_privacy ? (
            <p id="consent_privacy-error" className="text-label leading-relaxed text-destructive">
              {errors.consent_privacy}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:col-span-2">
          <Button type="submit" size="lg" disabled={isPending} className="h-11 w-full font-bold">
            {isPending ? 'Enviando…' : 'Sumarme al piloto'}
          </Button>
          {failed?.error ? (
            <p role="alert" className="text-label leading-relaxed text-diff">
              {failed.error}
            </p>
          ) : null}
        </div>
      </form>
    </Card>
  )
}

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  error,
  className,
}: {
  id: 'role' | 'monthly_tx_volume'
  label: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
  error?: string
  className?: string
}) {
  const errorId = `${id}-error`
  return (
    <div className={`flex flex-col gap-2 ${className ?? ''}`}>
      <Label htmlFor={id} className="text-label font-bold">
        {label}
      </Label>
      <Select value={value} onValueChange={(next) => next && onChange(next as string)}>
        <SelectTrigger
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`w-full ${fieldClass}`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? (
        <p id={errorId} className="text-label leading-relaxed text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function TextField({
  id,
  label,
  error,
  defaultValue,
  type = 'text',
  autoComplete,
  inputMode,
}: {
  id: 'name' | 'email' | 'company'
  label: string
  error?: string
  defaultValue?: string
  type?: string
  autoComplete?: string
  inputMode?: 'email' | 'text'
}) {
  const errorId = `${id}-error`
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-label font-bold">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        required
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldClass}
      />
      {error ? (
        <p id={errorId} className="text-label leading-relaxed text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
