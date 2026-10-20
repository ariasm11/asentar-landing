import { PilotForm } from '@/components/pilot-form'

const pasos = [
  {
    title: 'Hablamos',
    body: 'Te escribimos dentro de las 24 horas, también los fines de semana, para una llamada de 30 minutos y entender cómo cerrás hoy.',
  },
  {
    title: 'Conectás una wallet',
    body: 'Elegí una wallet con poco movimiento. Solo necesitamos su dirección pública; nunca claves privadas.',
  },
  {
    title: 'Cerramos en paralelo',
    body: 'Asentar cierra el mismo mes que tu equipo. Comparamos los dos cierres y decidís si te sirve.',
  },
]

export function Piloto() {
  return (
    <section
      id="piloto"
      aria-labelledby="piloto-title"
      className="scroll-mt-20 border-t border-border bg-background text-foreground"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-16">
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-4">
            <p className="font-mono text-micro uppercase text-muted-foreground">Programa piloto</p>
            <h2 id="piloto-title" className="text-display-2 text-balance">
              Cerrá un mes real con Asentar, en paralelo a tu cierre actual.
            </h2>
            <p className="max-w-xl text-lead leading-relaxed text-pretty text-muted-foreground">
              Buscamos uno o dos PSAV para cerrar un mes real con Asentar.
            </p>
          </header>

          <div className="flex flex-col gap-4">
            <h3
              id="piloto-pasos-title"
              className="font-mono text-micro uppercase text-muted-foreground"
            >
              Cómo es el piloto
            </h3>
            <ol aria-labelledby="piloto-pasos-title" className="flex max-w-xl flex-col">
              {pasos.map((paso, index) => (
                <li
                  key={paso.title}
                  className="flex gap-4 border-t border-border py-4 last:border-b"
                >
                  <span aria-hidden="true" className="font-mono text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">{paso.title}</p>
                    <p className="text-body leading-relaxed text-pretty text-muted-foreground">
                      {paso.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <p className="font-semibold">
            <span className="total-cerrado pb-0.5">El piloto no tiene costo.</span>
          </p>
        </div>

        <div className="lg:sticky lg:top-24">
          <PilotForm />
        </div>
      </div>
    </section>
  )
}
