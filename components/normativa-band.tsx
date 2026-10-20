const normativas = [
  { name: 'ARCA', detail: 'RG 5804/2025' },
  { name: 'CNV', detail: 'RG 1139/2026' },
  { name: 'Auditoría anual', detail: 'Registro de PSAV' },
  { name: 'FACPCE', detail: 'Normas contables' },
]

export function NormativaBand() {
  return (
    <section aria-labelledby="normativa-title" className="border-t border-border bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-baseline gap-4 px-6 py-6 md:grid-cols-[auto_1fr] md:gap-8 lg:px-16">
        <h2 id="normativa-title" className="font-mono text-micro uppercase text-muted-foreground">
          Hecho para la normativa local
        </h2>
        <dl className="flex flex-wrap gap-x-7 gap-y-2 text-body xl:flex-nowrap">
          {normativas.map((item) => (
            <div key={item.name} className="flex items-baseline gap-2">
              <dt className="font-semibold">{item.name}</dt>
              <dd className="text-muted-foreground">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
