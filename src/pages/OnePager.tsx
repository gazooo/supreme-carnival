import Nav from '../sections/Nav'
import Hero from '../sections/Hero'
import TrustBar from '../sections/TrustBar'
import TechMarquee from '../sections/TechMarquee'
import Services from '../sections/Services'
import Approach from '../sections/Approach'
import Projects from '../sections/Projects'
import Stats from '../sections/Stats'
import Timeline from '../sections/Timeline'
import Skills from '../sections/Skills'
import ScrollProgress from '../components/ScrollProgress'

export default function OnePager() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <TrustBar />
        <TechMarquee />
        <Services />
        <Approach />
        <Projects />
        <Stats />
        <Timeline />
        <Skills />
        {/* Placeholder anchors — Insights/Über mich/Kontakt land in Phase 4 */}
        <section id="ueber-mich" aria-label="Über mich" className="min-h-40" />
        <section id="kontakt" aria-label="Kontakt" className="min-h-40" />
      </main>
    </>
  )
}
