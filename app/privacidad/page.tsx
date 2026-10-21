import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import {
  CUIT,
  DOMICILIO,
  PLAZO_CONSERVACION,
  PRIVACY_EMAIL,
  PRIVACY_UPDATED,
  PRIVACY_VERSION,
  RAZON_SOCIAL,
} from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Cómo Asentar trata los datos personales de quienes se suman al programa piloto.',
  alternates: { canonical: '/privacidad' },
}

const valueOrPending = (value: string) => value || 'En trámite'

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-background text-foreground">
        <article className="mx-auto max-w-[70ch] px-6 py-16 lg:py-24">
          <header className="mb-12">
            <h1 className="text-h1 text-balance">Política de privacidad</h1>
            <p className="mt-4 text-label text-muted-foreground">
              Versión {PRIVACY_VERSION} · Última actualización: {PRIVACY_UPDATED}
            </p>
          </header>

          <div className="flex flex-col gap-12 text-body-lg leading-relaxed">
            <p>Esta política explica qué datos personales recolecta Asentar a través del sitio asentar.finance, para qué los usa, con quién los comparte y cómo podés ejercer tus derechos, de acuerdo con la Ley N.° 25.326 de Protección de los Datos Personales y su reglamentación.</p>
            <section><h2 className="text-h2">1. Quién es el responsable de tus datos</h2><ul className="mt-5 list-disc space-y-3 pl-6"><li><strong>Responsable:</strong> {valueOrPending(RAZON_SOCIAL)}</li><li><strong>CUIT:</strong> {valueOrPending(CUIT)}</li><li><strong>Domicilio:</strong> {valueOrPending(DOMICILIO)}</li><li><strong>Contacto para temas de privacidad:</strong> <a className="underline underline-offset-4" href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a></li></ul></section>
            <section><h2 className="text-h2">2. Qué datos recolectamos</h2><p className="mt-5">Cuando completás el formulario para sumarte al programa piloto, recolectamos:</p><ul className="mt-4 list-disc space-y-3 pl-6"><li>Nombre.</li><li>Mail de trabajo.</li><li>Empresa.</li><li>Rol (por ejemplo, Controller o CFO).</li><li>Volumen aproximado de transacciones on-chain por mes.</li><li>La aceptación de esta política y su versión.</li><li>El origen de tu visita, si llegaste desde un enlace con parámetros de campaña (por ejemplo, el código QR de un evento). Estos datos no te identifican por sí solos.</li></ul><p className="mt-5">No guardamos tu dirección IP ni datos de tu navegador junto con tu solicitud. Nuestro proveedor de alojamiento puede registrar datos técnicos de cada visita (como la IP) por un tiempo limitado, con fines de seguridad y funcionamiento del sitio.</p><p className="mt-5">El sitio no usa cookies publicitarias ni de seguimiento de terceros.</p></section>
            <section><h2 className="text-h2">3. Para qué usamos tus datos</h2><ul className="mt-5 list-disc space-y-3 pl-6"><li>Contactarte para coordinar tu participación en el programa piloto.</li><li>Evaluar si Asentar se ajusta a la operación de tu empresa.</li><li>Enviarte comunicaciones relacionadas con el piloto y con Asentar. Podés pedir que dejemos de enviártelas en cualquier momento.</li></ul><p className="mt-5">No vendemos ni cedemos tus datos a terceros para fines comerciales.</p></section>
            <section><h2 className="text-h2">4. Consentimiento y carácter de los datos</h2><p className="mt-5">Tratamos tus datos con tu consentimiento, que otorgás al marcar la casilla de aceptación del formulario. Los datos del formulario son necesarios para anotarte al piloto: si no los completás, no podemos registrar tu solicitud. Podés revocar tu consentimiento en cualquier momento escribiendo a <a className="underline underline-offset-4" href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.</p></section>
            <section><h2 className="text-h2">5. Con quién compartimos tus datos</h2><p className="mt-5">Para operar el sitio y el formulario usamos proveedores que tratan los datos por cuenta nuestra y solo para prestarnos su servicio:</p><div className="mt-6 overflow-x-auto"><table className="min-w-[620px] w-full border-collapse text-body"><thead><tr className="border-b-2 border-foreground text-left"><th className="px-3 py-3 font-semibold">Proveedor</th><th className="px-3 py-3 font-semibold">Para qué</th><th className="px-3 py-3 font-semibold">Dónde</th></tr></thead><tbody><tr className="border-b border-border"><td className="px-3 py-3">Supabase</td><td className="px-3 py-3">Base de datos donde se guarda tu solicitud</td><td className="px-3 py-3">Estados Unidos</td></tr><tr className="border-b border-border"><td className="px-3 py-3">Vercel</td><td className="px-3 py-3">Alojamiento del sitio y procesamiento del formulario</td><td className="px-3 py-3">Estados Unidos</td></tr><tr className="border-b border-border"><td className="px-3 py-3">Resend</td><td className="px-3 py-3">Envío de avisos internos por mail al equipo de Asentar</td><td className="px-3 py-3">Estados Unidos</td></tr><tr className="border-b border-border"><td className="px-3 py-3">Discord</td><td className="px-3 py-3">Aviso interno al equipo de Asentar. Se envía solo tu primer nombre, empresa, rol, volumen y origen; nunca tu mail</td><td className="px-3 py-3">Estados Unidos</td></tr></tbody></table></div><p className="mt-5"><strong>Transferencia internacional.</strong> Estos proveedores almacenan los datos en Estados Unidos. Al aceptar esta política consentís expresamente esa transferencia. Elegimos proveedores que aplican medidas de seguridad reconocidas internacionalmente.</p></section>
            <section><h2 className="text-h2">6. Cuánto tiempo guardamos tus datos</h2><p className="mt-5">Guardamos tus datos mientras dure el programa piloto y hasta {PLAZO_CONSERVACION} desde nuestro último contacto, o hasta que pidas su supresión, lo que ocurra primero.</p></section>
            <section><h2 className="text-h2">7. Cómo protegemos tus datos</h2><ul className="mt-5 list-disc space-y-3 pl-6"><li>La base de datos no admite acceso público: solo nuestro servidor puede escribir en ella.</li><li>Las comunicaciones con el sitio viajan cifradas (HTTPS).</li><li>El acceso interno está limitado a las personas del equipo que necesitan contactarte.</li></ul></section>
            <section><h2 className="text-h2">8. Tus derechos</h2><p className="mt-5">Podés ejercer en forma gratuita los siguientes derechos:</p><ul className="mt-4 list-disc space-y-3 pl-6"><li><strong>Acceso:</strong> saber si tratamos tus datos, cuáles, con qué finalidad y a quién los transferimos. Respondemos dentro de los <strong>diez (10) días corridos</strong> de recibida la solicitud. Podés ejercerlo gratis a intervalos no inferiores a seis meses, salvo que acredites un interés legítimo (art. 14, Ley 25.326).</li><li><strong>Rectificación, actualización y supresión:</strong> corregir datos inexactos o pedir que los eliminemos. Lo hacemos dentro de los <strong>cinco (5) días hábiles</strong> (art. 16, Ley 25.326).</li><li><strong>Oposición y revocación:</strong> pedir que dejemos de enviarte comunicaciones o revocar tu consentimiento.</li></ul></section>
            <section><h2 className="text-h2">9. Cómo ejercer tus derechos</h2><p className="mt-5">Escribí a <strong><a className="underline underline-offset-4" href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a></strong> con el asunto "Ejercicio de derechos – [tu nombre]", indicando qué derecho querés ejercer.</p><p className="mt-5">Para proteger tus datos, verificamos tu identidad: si escribís desde el mismo mail con el que te anotaste, eso alcanza. Si escribís desde otra dirección o mediante un representante, te vamos a pedir una forma adicional de acreditar tu identidad.</p><p className="mt-5">Te enviamos un acuse de recibo dentro de las 24 horas hábiles y respondemos dentro de los plazos legales indicados en el punto 8.</p></section>
            <section><h2 className="text-h2">10. Autoridad de control</h2><p className="mt-5">El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley N.° 25.326. La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N.° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.</p></section>
            <section><h2 className="text-h2">11. Cambios en esta política</h2><p className="mt-5">Si modificamos esta política, publicamos la nueva versión en esta página con su fecha. Cada solicitud del formulario guarda la versión que aceptaste.</p></section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
