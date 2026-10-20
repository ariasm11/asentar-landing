import { Card } from '@/components/ui/card'

const audiences = [
  {
    tag: 'Hoy',
    title: 'PSAV y exchanges',
    description:
      'Equipos de finanzas de 2 a 8 personas que hoy concilian miles de movimientos en planillas.',
  },
  {
    tag: 'También',
    title: 'Empresas que operan en stablecoins',
    description:
      'Cobros y pagos en USDC o USDT que tienen que llegar al ERP con el tipo de cambio correcto.',
  },
  {
    tag: 'Canal',
    title: 'Estudios contables',
    description:
      'Licencia multicliente para llevar la contabilidad cripto de varios clientes desde un solo lugar.',
  },
]

export function ParaQuien() {
  return (
    <section
      id="para-quien"
      aria-labelledby="para-quien-title"
      className="scroll-mt-20 border-t border-border bg-background text-foreground"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 md:py-28 lg:px-16">
        <header className="flex max-w-2xl flex-col gap-4">
          <p className="font-mono text-micro uppercase text-muted-foreground">Para quién</p>
          <h2 id="para-quien-title" className="text-display-2 text-balance">
            Para los equipos que cierran el mes con actividad cripto.
          </h2>
        </header>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {audiences.map((audience) => (
            <li key={audience.tag} className="flex">
              <Card className="flex-1 gap-3 border border-border p-6 ring-0">
                <p className="font-mono text-micro uppercase text-muted-foreground">{audience.tag}</p>
                <h3 className="text-h3 font-bold text-balance">{audience.title}</h3>
                <p className="text-body leading-relaxed text-pretty text-muted-foreground">
                  {audience.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
