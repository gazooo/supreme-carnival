import { lazy, Suspense } from 'react'
import Nav from '../sections/Nav'
import Hero from '../sections/Hero'
import TrustBar from '../sections/TrustBar'
import TechMarquee from '../sections/TechMarquee'
import Footer from '../sections/Footer'
import ScrollProgress from '../components/ScrollProgress'

const BelowFold = lazy(() => import('./BelowFold'))

/**
 * Placeholder shells while the below-fold chunk loads: they carry the anchor
 * ids (nav links work immediately) and approximate heights (no jumpy
 * scrollbar). They are replaced wholesale once the chunk is ready.
 */
function SectionShells() {
  return (
    <>
      <section id="leistungen" aria-label="Leistungen" className="min-h-[52rem]" />
      <section id="arbeitsweise" aria-label="Arbeitsweise" className="min-h-[44rem]" />
      <section id="projekte" aria-label="Ausgewählte Projekte" className="min-h-[90rem]" />
      <section aria-hidden="true" className="min-h-[18rem]" />
      <section id="werdegang" aria-label="Werdegang" className="min-h-[56rem]" />
      <section id="skills" aria-label="Skills" className="min-h-[48rem]" />
      <section id="insights" aria-label="Insights" className="min-h-[34rem]" />
      <section id="ueber-mich" aria-label="Über mich" className="min-h-[44rem]" />
      <section id="kontakt" aria-label="Kontakt" className="min-h-[44rem]" />
    </>
  )
}

export default function OnePager() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <TrustBar />
        <TechMarquee />
        <Suspense fallback={<SectionShells />}>
          <BelowFold />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
