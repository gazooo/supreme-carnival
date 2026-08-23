import { useState } from 'react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

/*
 * TODO: public/portrait.webp ablegen (Porträtfoto, 4:5, empfohlen 768×960,
 * WebP-Qualität ~80). Solange die Datei fehlt, rendert der onError-Fallback
 * das Monogramm — die Seite bleibt also auch ohne Foto intakt.
 */
function Portrait() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label="Monogramm von Malte Lohrer – Porträtfoto folgt"
        className="flex aspect-4/5 items-center justify-center border border-line bg-paper-alt"
      >
        <span
          aria-hidden="true"
          className="text-8xl font-semibold tracking-tighter text-line-strong select-none"
        >
          ML
        </span>
      </div>
    )
  }

  return (
    <img
      src="/portrait.webp"
      width={768}
      height={960}
      alt="Porträt von Malte Lohrer"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="aspect-4/5 w-full border border-line bg-paper-alt object-cover"
    />
  )
}

export default function About() {
  return (
    <section id="ueber-mich" className="border-t border-line py-20 md:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeading number="07" eyebrow="Über mich" title="Wer hier eigentlich baut" />
        </Reveal>
        <div className="mt-14 grid items-start gap-12 md:mt-20 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
          <Reveal>
            <div className="w-full max-w-sm">
              <Portrait />
              <p className="mt-3 font-mono text-xs text-ink-3">
                Esslingen am Neckar · Raum Stuttgart
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex max-w-2xl flex-col gap-5 text-lead text-ink-2">
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
