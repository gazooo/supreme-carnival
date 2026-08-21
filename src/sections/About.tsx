import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Chip from '../components/Chip'
import { Asterisk, Squiggle } from '../components/doodles'

/*
 * TODO: Porträtfoto einsetzen. Quelle laut Spezifikation:
 * templates/img/portrait.png (als optimiertes WebP/AVIF mit expliziten
 * Dimensionen in public/ ablegen und das Monogramm hier ersetzen).
 * Die Quelldatei lag in dieser Umgebung nicht vor.
 */
function PortraitPlaceholder() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        role="img"
        aria-label="Monogramm von Malte Lohrer – Porträtfoto folgt"
        className="relative flex aspect-4/5 items-center justify-center overflow-hidden rounded-[2rem] border-2 border-ink shadow-pop"
        style={{
          background:
            'linear-gradient(140deg, var(--color-mint) 0%, var(--color-sky) 45%, var(--color-lavender) 100%)',
        }}
      >
        <span
          aria-hidden="true"
          className="font-display text-9xl font-bold tracking-tight text-ink"
        >
          ML
        </span>
        <Asterisk aria-hidden="true" className="absolute top-6 right-6 h-8 w-8 text-ink/50" />
        <Squiggle aria-hidden="true" className="absolute bottom-7 left-6 h-5 w-28 text-ink/40" />
      </div>
      <div className="absolute -right-3 -bottom-4 rotate-2">
        <Chip variant="sticker" tone="white">
          Esslingen am Neckar
        </Chip>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="ueber-mich" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            number="07"
            eyebrow="Über mich"
            tone="peach"
            title="Wer hier eigentlich baut"
          />
        </Reveal>
        <div className="mt-14 grid items-center gap-12 md:mt-16 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <Reveal>
            <PortraitPlaceholder />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-5 text-lead text-ink-soft">
              <p>
                M.Sc. Computer Science &amp; Media an der Hochschule der Medien Stuttgart (Note
                1,5), seit 2015 in der IT – von Daimler über das Innenministerium Baden-Württemberg
                bis zu Mercedes-Benz und Aremus Finance. Zuhause in Esslingen am Neckar.
              </p>
              <p>
                Ich arbeite remote, direkt und ohne Übersetzungsverlust: ein Ansprechpartner für
                Konzept, Umsetzung und Betrieb. Entscheidungen begründe ich schriftlich, Ergebnisse
                sind belegbar – im Zweifel zählt, was in Produktion läuft.
              </p>
              <p>
                Und nach Feierabend wird trotzdem gebaut: Hardware- und Maker-Projekte, nur mit
                Lötkolben statt Pipeline.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
