'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'

const steps = [
  {
    key: 'datos',
    title: 'Datos',
    summary: 'Cada transacción, hasta el último bloque finalizado.',
    bullets: [
      'Wallets por dirección pública; nunca pide claves.',
      'Exchanges y custodios por API.',
      'Control de completitud: libro contra saldo on-chain.',
    ],
  },
  {
    key: 'clasificacion',
    title: 'Clasificación',
    summary: 'Primero las reglas, después la IA.',
    bullets: [
      'Reglas para lo conocido: swaps, transferencias internas, spam.',
      'IA para lo nuevo, con motivo y confianza.',
      'El texto de tokens desconocidos nunca llega al modelo.',
    ],
  },
  {
    key: 'revision',
    title: 'Revisión',
    summary: 'Vos decidís lo dudoso.',
    bullets: [
      'Va a revisión lo dudoso, lo material y lo nuevo.',
      'Cada decisión queda registrada con su autor.',
      'La próxima vez, la contraparte se reconoce sola.',
    ],
  },
  {
    key: 'libro',
    title: 'Libro diario',
    summary: 'Un asiento por transacción, en pesos.',
    bullets: [
      'Precio, tipo de cambio y lotes que explican cada línea.',
      'FIFO y tipo de cambio según tu política contable.',
      'Revaluación al cierre con resultado por tenencia.',
    ],
  },
  {
    key: 'cierre',
    title: 'Cierre y Sello',
    summary: 'Cerrá el mes y sellalo en Ethereum.',
    bullets: [
      'El período cierra solo si todo concilia.',
      'Atestación con el hash de libros y saldos.',
      'Exportación a Odoo con control de cambios.',
    ],
  },
]

const ADVANCE_DELAY_MS = 900
const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia(reducedMotionQuery)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  )
}

export function ComoFunciona() {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const reducedMotion = useReducedMotion()

  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const advanceTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    })
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (inView && !reducedMotion) {
      video.play().catch(() => {})
    } else if (!reducedMotion) {
      video.pause()
    }
  }, [active, inView, reducedMotion])

  useEffect(() => {
    if (!inView) return
    let frameId = 0
    const tick = () => {
      const video = videoRef.current
      const bar = progressRef.current
      if (video && bar) {
        const ratio = video.duration ? video.currentTime / video.duration : 0
        bar.style.transform = `scaleX(${ratio})`
      }
      frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [active, inView])

  useEffect(() => () => window.clearTimeout(advanceTimer.current), [])

  function selectTab(index: number) {
    window.clearTimeout(advanceTimer.current)
    setActive(index)
  }

  function handleEnded() {
    if (reducedMotion) return
    window.clearTimeout(advanceTimer.current)
    advanceTimer.current = window.setTimeout(() => {
      setActive((current) => (current + 1) % steps.length)
    }, ADVANCE_DELAY_MS)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = steps.length - 1
    let next: number | null = null
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = active === last ? 0 : active + 1
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = last
    if (next === null) return
    event.preventDefault()
    selectTab(next)
    tabRefs.current[next]?.focus()
  }

  const current = steps[active]

  return (
    <section
      id="producto"
      aria-labelledby="producto-title"
      className="border-t border-border bg-background text-foreground"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-20 md:py-28 lg:px-16">
        <header className="flex max-w-2xl flex-col gap-4">
          <p className="font-mono text-micro uppercase text-muted-foreground">Cómo funciona</p>
          <h2 id="producto-title" className="text-display-2 text-balance">
            Del bloque al balance, en cinco pasos.
          </h2>
          <p className="text-body-lg text-pretty text-muted-foreground">
            Asentar trae la actividad de tus wallets, la clasifica, te deja decidir lo dudoso y cierra
            el mes con asientos que tu auditor puede verificar.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[360px_1fr] lg:items-start lg:gap-16">
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Pasos de Asentar"
            onKeyDown={handleKeyDown}
            className="flex flex-col border-b border-border"
          >
            {steps.map((step, index) => {
              const selected = index === active
              return (
                <div key={step.key} className="relative border-t border-border">
                  <button
                    ref={(node) => {
                      tabRefs.current[index] = node
                    }}
                    type="button"
                    role="tab"
                    id={`paso-tab-${step.key}`}
                    aria-selected={selected}
                    aria-controls="paso-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectTab(index)}
                    className="group flex w-full items-baseline gap-5 py-5 text-left"
                  >
                    <span className="w-6 font-mono text-body-sm text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'text-h3 font-bold transition-colors',
                        selected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground',
                      )}
                    >
                      {step.title}
                    </span>
                  </button>

                  <div
                    inert={!selected}
                    className={cn(
                      'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
                      selected ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-3 pb-6 pl-11">
                        <p className="text-body-lg text-pretty text-muted-foreground">{step.summary}</p>
                        <ul className="flex list-disc flex-col gap-1.5 pl-5 text-body leading-relaxed marker:text-muted-foreground">
                          {step.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {selected && (
                    <span aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 overflow-hidden">
                      <span
                        ref={progressRef}
                        className="block h-full origin-left scale-x-0 bg-foreground"
                      />
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          <figure className="flex flex-col gap-3 lg:sticky lg:top-24">
            <div
              ref={frameRef}
              id="paso-panel"
              role="tabpanel"
              aria-labelledby={`paso-tab-${current.key}`}
              className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground"
            >
              <div className="flex h-9 items-center gap-4 border-b border-border px-4">
                <span aria-hidden className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-border" />
                  <span className="size-2.5 rounded-full bg-border" />
                  <span className="size-2.5 rounded-full bg-border" />
                </span>
                <span className="font-mono text-body-sm text-muted-foreground">app.asentar.finance</span>
              </div>
              <video
                key={current.key}
                ref={videoRef}
                src={`/demo/${current.key}.mp4`}
                poster={`/demo/${current.key}.jpg`}
                muted
                playsInline
                preload="metadata"
                controls={reducedMotion}
                onEnded={handleEnded}
                aria-label={`Demo: ${current.title}. ${current.summary}`}
                className="block aspect-[1200/760] w-full bg-muted object-cover"
              />
            </div>
            <figcaption className="text-label font-normal text-muted-foreground">
              Demo con datos ficticios de Pampa Exchange S.A., período septiembre 2026.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
