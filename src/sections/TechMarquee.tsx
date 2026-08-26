import Marquee from '../components/Marquee'
import { useCopy } from '../lib/i18n'
import { PRIMARY_SKILLS } from '../content/site'

/** Quiet status strip listing the core stack. */
export default function TechMarquee() {
  const t = useCopy()
  return (
    <section aria-label={t.marqueeLabel}>
      <Marquee items={PRIMARY_SKILLS} />
    </section>
  )
}
