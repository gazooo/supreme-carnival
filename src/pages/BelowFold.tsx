import Services from '../sections/Services'
import Approach from '../sections/Approach'
import Projects from '../sections/Projects'
import Timeline from '../sections/Timeline'
import Skills from '../sections/Skills'
import Insights from '../sections/Insights'
import About from '../sections/About'
import Contact from '../sections/Contact'

/**
 * Everything below the fold, loaded as one lazy chunk so the initial
 * commit (Nav + Hero) stays small — see OnePager.
 */
export default function BelowFold() {
  return (
    <>
      <Services />
      <Approach />
      <Projects />
      <Timeline />
      <Skills />
      <Insights />
      <About />
      <Contact />
    </>
  )
}
