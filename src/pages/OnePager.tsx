import Nav from '../sections/Nav'
import Hero from '../sections/Hero'
import ScrollProgress from '../components/ScrollProgress'

export default function OnePager() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        {/* Placeholder anchors — real sections land in the next phases */}
        <section id="leistungen" aria-label="Leistungen" className="min-h-40" />
        <section id="projekte" aria-label="Projekte" className="min-h-40" />
        <section id="werdegang" aria-label="Werdegang" className="min-h-40" />
        <section id="ueber-mich" aria-label="Über mich" className="min-h-40" />
        <section id="kontakt" aria-label="Kontakt" className="min-h-40" />
      </main>
    </>
  )
}
