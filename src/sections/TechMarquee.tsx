import Marquee from '../components/Marquee'
import { PRIMARY_SKILLS } from '../content/site'

/** Quiet status strip listing the core stack. */
export default function TechMarquee() {
  return (
    <section aria-label="Tech-Stack">
      <Marquee items={PRIMARY_SKILLS} />
    </section>
  )
}
