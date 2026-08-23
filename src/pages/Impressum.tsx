import LegalLayout from '../components/LegalLayout'
import { EMAIL } from '../content/site'

export default function Impressum() {
  return (
    <LegalLayout title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        Malte Leon Lohrer
        <br />
        Obere Beutau 23
        <br />
        73728 Esslingen am Neckar
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <br />
        Oder über das Kontaktformular auf der Startseite.
      </p>

      {/*
        TODO: USt-IdNr. ist beantragt, aber noch nicht erteilt.
        Nach Erteilung diesen Block einkommentieren und die Nummer eintragen:

        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
          <br />
          DE XXX XXX XXX
        </p>
      */}

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>Malte Leon Lohrer, Anschrift wie oben.</p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit
        und Aktualität kann ich dennoch keine Gewähr übernehmen. Als Diensteanbieter bin ich für
        eigene Inhalte nach den allgemeinen Gesetzen verantwortlich (§ 7 Abs. 1 DDG), jedoch nicht
        verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
        Verpflichtungen zur Entfernung oder Sperrung von Inhalten nach den allgemeinen Gesetzen
        bleiben unberührt; eine entsprechende Haftung besteht erst ab Kenntnis einer konkreten
        Rechtsverletzung.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Diese Website enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte
        ich keinen Einfluss habe. Für diese Inhalte ist stets der jeweilige Anbieter verantwortlich.
        Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar; bei Bekanntwerden von
        Rechtsverletzungen entferne ich betroffene Links umgehend.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch mich erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen
        Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der Grenzen des
        Urheberrechts bedürfen meiner schriftlichen Zustimmung. Genannte Marken- und Firmennamen
        sind Eigentum der jeweiligen Inhaber und dienen ausschließlich der Beschreibung meiner
        beruflichen Tätigkeit.
      </p>
    </LegalLayout>
  )
}
