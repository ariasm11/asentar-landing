import { AsentarMark } from '@/brand/logo'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const audiences = [
  { term: 'Auditores', description: 'Verifican que los papeles de trabajo son los del cierre.' },
  { term: 'Reguladores', description: 'Reciben saldos conciliados con la blockchain a una fecha.' },
  { term: 'Bancos', description: 'Pueden comprobar las reservas sin pedirte otro reporte.' },
]

const sealDetails = [
  { term: 'Red', value: 'Base' },
  { term: 'Atestación', value: '0x6b1e…a94c', mono: true },
  { term: 'Raíz de libros', value: '0x3c9e…f027', mono: true },
  { term: 'Raíz de saldos', value: '0x81d4…5b6a', mono: true },
  { term: 'Contenido', value: '6 asientos, 22 líneas' },
  { term: 'Cierre anterior', value: 'Agosto 2026, encadenado' },
]

export function Sello() {
  return (
    <div className="dark">
      <section
        id="sello"
        aria-labelledby="sello-title"
        className="scroll-mt-20 bg-background text-foreground"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:gap-12 lg:px-16">
          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-4">
              <p className="font-mono text-micro uppercase text-muted-foreground">
                Libros verificables en Ethereum
              </p>
              <h2 id="sello-title" className="text-display-2 text-balance">
                Cada cierre, sellado. Nada cambia después.
              </h2>
              <p className="max-w-xl text-body-lg leading-relaxed text-pretty text-muted-foreground">
                Al cerrar el mes, Asentar publica en Ethereum una atestación con el hash de tus
                libros y de los saldos conciliados. Si alguien modifica un asiento después del
                cierre, el sello deja de coincidir.
              </p>
            </header>

            <dl className="flex flex-col">
              {audiences.map((item) => (
                <div
                  key={item.term}
                  className="grid grid-cols-1 gap-1 border-b border-border py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
                >
                  <dt className="text-body-lg font-bold">{item.term}</dt>
                  <dd className="text-body-lg leading-relaxed text-pretty text-muted-foreground">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <article
            aria-labelledby="sello-card-title"
            className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 text-card-foreground"
          >
            <header className="total-cerrado flex items-center gap-3 pb-4">
              <AsentarMark size={28} className="shrink-0 text-foreground" />
              <h3 id="sello-card-title" className="flex-1 text-h3 font-bold text-balance">
                Sello de cierre, septiembre 2026
              </h3>
              <Badge className="h-auto shrink-0 gap-1.5 bg-sello-soft px-3 py-1 text-label text-sello">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-sello" />
                Sellado
              </Badge>
            </header>

            <dl className="grid grid-cols-[8.5rem_1fr] gap-x-4 gap-y-3 text-body-lg">
              {sealDetails.map((item) => (
                <div key={item.term} className="contents">
                  <dt className="text-muted-foreground">{item.term}</dt>
                  <dd className={cn(item.mono && 'font-mono text-body-sm')}>{item.value}</dd>
                </div>
              ))}
            </dl>

            <p className="text-label font-normal text-muted-foreground">
              Ejemplo con datos ficticios. Los saldos de clientes no se exponen.
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}
