'use client'

import { useState, useTransition, type FormEvent } from 'react'
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
  pilotSchema,
  type PilotField,
  type PilotInput,
} from '@/lib/pilot-schema'

type FieldErrors = Partial<Record<PilotField, string>>

const fieldClass = 'h-11 bg-muted px-4 text-body'

export function PilotForm() {
  const [role, setRole] = useState<PilotInput['role']>(PILOT_ROLES[0])
  const [volume, setVolume] = useState<PilotInput['monthly_tx_volume']>(PILOT_TX_VOLUMES[0])
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [joined, setJoined] = useState<{ name: string; email: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const parsed = pilotSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      role,
      monthly_tx_volume: volume,
    })

    if (!parsed.success) {
      const next: FieldErrors = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as PilotField
        if (!next[field]) next[field] = issue.message
      }
      setErrors(next)
      const firstInvalid = (['name', 'email', 'company'] as const).find((f) => next[f])
      if (firstInvalid) document.getElementById(firstInvalid)?.focus()
      return
    }

    setErrors({})
    setFormError(null)
    startTransition(async () => {
      const result = await joinPilot(parsed.data)
      if (result.ok) {
        setJoined({ name: parsed.data.name, email: parsed.data.email })
      } else {
        setFormError(result.error)
      }
    })
  }

  if (joined) {
    return (
      <Card className="gap-4 border border-border p-6 ring-0 md:p-8" role="status" aria-live="polite">
        <Badge className="h-auto gap-1.5 bg-sello-soft px-3 py-1 text-label text-sello">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-sello" />
          Anotado
        </Badge>
        <p className="text-h3 font-bold text-balance">
          {joined.name}, ya estás en la lista del piloto.
        </p>
        <p className="text-body leading-relaxed text-muted-foreground">
          Te escribimos a <span className="font-semibold text-foreground">{joined.email}</span> para
          coordinar.
        </p>
      </Card>
    )
  }

  return (
    <Card className="border border-border p-6 ring-0 md:p-8">
      <form noValidate onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
        <TextField
          id="name"
          label="Nombre"
          autoComplete="name"
          error={errors.name}
        />
        <TextField
          id="email"
          label="Mail de trabajo"
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.email}
        />
        <TextField
          id="company"
          label="Empresa"
          autoComplete="organization"
          error={errors.company}
        />

        <div className="flex flex-col gap-2">
          <Label htmlFor="role" className="text-label font-bold">
            Rol
          </Label>
          <Select
            name="role"
            value={role}
            onValueChange={(value) => value && setRole(value as PilotInput['role'])}
          >
            <SelectTrigger id="role" className={`w-full ${fieldClass}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PILOT_ROLES.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="monthly_tx_volume" className="text-label font-bold">
            Transacciones on-chain por mes
          </Label>
          <Select
            name="monthly_tx_volume"
            value={volume}
            onValueChange={(value) =>
              value && setVolume(value as PilotInput['monthly_tx_volume'])
            }
          >
            <SelectTrigger id="monthly_tx_volume" className={`w-full ${fieldClass}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PILOT_TX_VOLUMES.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-3 sm:col-span-2">
          <Button type="submit" size="lg" disabled={isPending} className="h-11 w-full font-bold">
            {isPending ? 'Enviando…' : 'Sumarme al piloto'}
          </Button>
          {formError ? (
            <p role="alert" className="text-label text-destructive">
              {formError}
            </p>
          ) : null}
        </div>
      </form>
    </Card>
  )
}

function TextField({
  id,
  label,
  error,
  type = 'text',
  autoComplete,
  inputMode,
}: {
  id: 'name' | 'email' | 'company'
  label: string
  error?: string
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
