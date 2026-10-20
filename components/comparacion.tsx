const rows = [
  {
    criterio: 'Normativa',
    globales: 'GAAP, IFRS, IRS, MiCA',
    asentar: 'ARCA, CNV, UIF, normas FACPCE y ajuste por inflación',
  },
  {
    criterio: 'Tipo de cambio',
    globales: 'Una moneda funcional',
    asentar: 'Oficial, MEP y CCL según uso fiscal, contable o de gestión',
  },
  {
    criterio: 'Integraciones',
    globales: 'ERPs globales',
    asentar: 'Odoo, Tango, Bejerman y NetSuite',
  },
  {
    criterio: 'Cierre verificable',
    globales: 'Reportes exportables',
    asentar: 'Sello de cierre en Ethereum',
  },
  {
    criterio: 'Idioma y soporte',
    globales: 'Inglés',
    asentar: 'Español, con contadores de la región',
  },
]

export function Comparacion() {
  return (
    <section
      id="comparacion"
      aria-labelledby="comparacion-title"
      className="scroll-mt-20 border-t border-border bg-background text-foreground"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 md:py-28 lg:px-16">
        <header className="flex max-w-2xl flex-col gap-4">
          <p className="font-mono text-micro uppercase text-muted-foreground">
            Frente a las soluciones globales
          </p>
          <h2 id="comparacion-title" className="text-display-2 text-balance">
            Hecho en la región, para la región.
          </h2>
          <p className="text-body-lg leading-relaxed text-pretty text-muted-foreground">
            Las herramientas globales resuelven IFRS, IRS y MiCA. Asentar resuelve lo que te piden acá.
          </p>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left text-body">
            <caption className="sr-only">
              Comparación entre herramientas globales y Asentar
            </caption>
            <thead>
              <tr className="border-b-2 border-foreground">
                <td className="w-1/5 py-3 pr-4" />
                <th scope="col" className="w-1/5 py-3 pr-4 text-label font-semibold text-muted-foreground">
                  Herramientas globales
                </th>
                <th scope="col" className="py-3 text-label font-semibold">
                  Asentar
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.criterio} className="border-b border-border">
                  <th scope="row" className="py-4 pr-4 align-top font-bold">
                    {row.criterio}
                  </th>
                  <td className="py-4 pr-4 align-top">{row.globales}</td>
                  <td className="py-4 align-top font-semibold">{row.asentar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
