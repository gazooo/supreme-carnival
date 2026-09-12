import Hero from '../sections/Hero'
import TrustBar from '../sections/TrustBar'
import Services from '../sections/Services'
import Projects from '../sections/Projects'
import Approach from '../sections/Approach'
import About from '../sections/About'
import ContactCTA from '../sections/ContactCTA'
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services preview />
      <Projects preview />
      <Approach />
      <About preview />
      <ContactCTA />
    </>
  )
}
