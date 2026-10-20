import { ComoFunciona } from '@/components/como-funciona'
import { Comparacion } from '@/components/comparacion'
import { Hero } from '@/components/hero'
import { IaReglas } from '@/components/ia-reglas'
import { NormativaBand } from '@/components/normativa-band'
import { ParaQuien } from '@/components/para-quien'
import { Piloto } from '@/components/piloto'
import { Preguntas } from '@/components/preguntas'
import { Sello } from '@/components/sello'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <NormativaBand />
        <ComoFunciona />
        <IaReglas />
        <Sello />
        <ParaQuien />
        <Comparacion />
        <Piloto />
        <Preguntas />
      </main>
      <SiteFooter />
    </>
  )
}
