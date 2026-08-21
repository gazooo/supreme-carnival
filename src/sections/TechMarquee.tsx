import Marquee from '../components/Marquee'
import { PRIMARY_SKILLS } from '../content/site'

/** Slightly tilted tech-stack ticker band. */
export default function TechMarquee() {
  return (
    <section aria-label="Tech-Stack" className="overflow-hidden py-8 md:py-10">
      <div className="-mx-4 -rotate-1">
        <Marquee items={PRIMARY_SKILLS} />
      </div>
    </section>
  )
}
