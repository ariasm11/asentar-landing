'use client'

import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { LedgerParticles } from '@/components/ledger-particles'
import { cn } from '@/lib/utils'

export function Hero() {
  const [paused, setPaused] = useState(false)
  const [settled, setSettled] = useState(false)

  return (
    <div className="dark">
      <section
        id="hero"
        aria-labelledby="hero-title"
        className="relative isolate overflow-hidden bg-background text-foreground"
      >
        <LedgerParticles paused={paused} onSettledChange={setSettled} />

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-start px-6 pt-14 pb-96 md:pt-20 lg:min-h-0 lg:justify-center lg:px-16 lg:py-32">
          <div className="flex max-w-xl flex-col gap-6 lg:max-w-[min(36rem,48%)]">
            <p className="font-mono text-micro uppercase text-muted-foreground">
              Subledger contable cripto · LATAM
            </p>
            <h1 id="hero-title" className="text-display-2 text-balance md:text-display">
              Tu actividad <span className="whitespace-nowrap">on-chain,</span> asentada en tus
              libros.
            </h1>
            <p className="text-body-lg text-pretty text-muted-foreground">
              Asentar lee wallets y exchanges, clasifica cada movimiento con IA y genera los
              asientos para tu ERP. Cada cierre queda sellado en Ethereum.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#piloto"
                className="inline-flex h-12 items-center rounded-md bg-primary px-5 text-body-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sumarme al piloto
              </a>
              <a
                href="#producto"
                className="inline-flex h-12 items-center rounded-md border border-foreground/70 px-5 text-body-lg font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Ver cómo funciona
              </a>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? 'Reanudar animación' : 'Pausar animación'}
          className="absolute bottom-5 left-5 inline-flex size-9 items-center justify-center rounded-full border border-muted-foreground/60 text-muted-foreground transition-colors hover:text-foreground motion-reduce:hidden"
        >
          {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
        </button>

        <p role="status" className="absolute right-5 bottom-5">
          <span
            className={cn(
              'inline-flex items-center gap-2 rounded-full bg-sello-soft px-3 py-1.5 text-label text-sello transition-opacity duration-500',
              settled ? 'opacity-100' : 'opacity-0',
            )}
          >
            <span className="size-1.5 rounded-full bg-current" aria-hidden />
            {settled ? 'Conciliado' : null}
          </span>
        </p>
      </section>
    </div>
  )
}
