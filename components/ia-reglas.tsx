const columns = [
  {
    title: 'Lo que hace la IA',
    items: [
      'Propone el tipo de movimiento, la contraparte y la cuenta.',
      'Explica por qué y con qué grado de confianza.',
      'Manda a revisión lo dudoso, lo material y lo nuevo.',
      'Aprende de cada corrección que hace tu equipo.',
    ],
  },
  {
    title: 'Lo que hacen las reglas',
    items: [
      'Valúan cada lote con su costo histórico y su valor contable.',
      'Convierten a pesos con el tipo de cambio de tu política: oficial, MEP o CCL.',
      'Calculan diferencias de cambio y resultados por tenencia.',
      'Bloquean el cierre si el saldo en libros no coincide con el on\u2011chain.',
    ],
  },
]

export function IaReglas() {
  return (
    <section
      aria-labelledby="ia-reglas-title"
      className="border-t border-border bg-background text-foreground"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 md:py-28 lg:px-16">
        <header className="flex max-w-2xl flex-col gap-4">
          <p className="font-mono text-micro uppercase text-muted-foreground">
            Contabilidad con IA, sin cajas negras
          </p>
          <h2 id="ia-reglas-title" className="text-display-2 text-balance">
            La IA clasifica. Las reglas calculan.
          </h2>
        </header>

        <div className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card text-card-foreground md:grid-cols-2 md:divide-x md:divide-y-0">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-4 p-6 md:p-7">
              <h3 className="text-h3 font-bold">{column.title}</h3>
              <ul className="flex flex-col divide-y divide-border">
                {column.items.map((item) => (
                  <li key={item} className="py-3 text-body leading-relaxed text-pretty first:pt-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="font-semibold">
          <span className="total-cerrado pb-0.5">La IA nunca calcula un monto.</span>
        </p>
      </div>
    </section>
  )
}
