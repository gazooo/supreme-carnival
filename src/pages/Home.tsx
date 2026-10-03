import Hero from '../sections/Hero'
import TrustBar from '../sections/TrustBar'
import Services from '../sections/Services'
import Projects from '../sections/Projects'
import Approach from '../sections/Approach'
import About from '../sections/About'
import Contact from '../sections/Contact'
import Timeline from '../sections/Timeline'
export default function Home() {
  return (
    <>
      <div id="home" tabIndex={-1} className="outline-none">
        <Hero />
        <TrustBar />
      </div>
      <div id="services" tabIndex={-1} className="outline-none">
        <Services />
      </div>
      <div id="projects" tabIndex={-1} className="outline-none">
        <Projects />
        <Approach />
      </div>
      <div id="career" tabIndex={-1} className="outline-none">
        <About />
        <Timeline />
      </div>
      <div id="contact" tabIndex={-1} className="outline-none">
        <Contact />
      </div>
    </>
  )
}
