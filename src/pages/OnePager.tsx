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
import Insights from '../sections/Insights'
import About from '../sections/About'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'
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
        <Insights />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
