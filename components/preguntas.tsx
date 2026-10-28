import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: '¿Asentar necesita mis claves privadas?',
    a: 'No. Solo usa direcciones públicas y accesos de lectura por API. Si alguien pega una clave privada o una frase semilla, Asentar la rechaza y no la guarda.',
  },
  {
    q: '¿La IA puede equivocarse en un monto?',
    a: 'La IA no calcula montos. Propone la clasificación con su motivo y su confianza; los importes, el tipo de cambio y la valuación salen de reglas contables auditables.',
  },
  {
    q: '¿Con qué ERPs funciona?',
    a: 'El piloto exporta a Odoo. Tango, Bejerman y NetSuite están en la hoja de ruta. Los asientos llegan en borrador para que tu equipo los publique.',
  },
  {
    q: '¿Qué es el Sello de cierre?',
    a: 'Una atestación en Ethereum (EAS) con el hash de los libros y los saldos conciliados del período. Permite comprobar que nada cambió después del cierre sin exponer los saldos de tus clientes.',
  },
  {
    q: '¿Sirve para el régimen de información de ARCA?',
    a: 'El MVP trabaja con las wallets propias del PSAV. El reporte por cliente de la RG 5804/2025 es la siguiente etapa.',
  },
]

// Same questions as the accordion, so the structured data never drifts from what the page says.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export function Preguntas() {
  return (
    <section
      id="preguntas"
      aria-labelledby="preguntas-title"
      className="scroll-mt-20 border-t border-border bg-background text-foreground"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pt-20 pb-12 md:pt-28 md:pb-16 lg:px-16">
        <header className="flex max-w-2xl flex-col gap-4">
          <p className="font-mono text-micro uppercase text-muted-foreground">Preguntas</p>
          <h2 id="preguntas-title" className="text-display-2 text-balance">
            Lo que suelen preguntar los contadores.
          </h2>
        </header>

        <Accordion className="max-w-[820px] border-y border-border">
          {faqs.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-border">
              <AccordionTrigger className="rounded-none py-5 text-body font-bold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl pb-5 text-body leading-relaxed text-pretty text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
