import LegalLayout from '../components/LegalLayout'
import { EMAIL, PHONE_DISPLAY } from '../content/site'

export default function Datenschutz() {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <h2>Das Wichtigste vorab</h2>
      <p>
        Diese Website ist eine statische Seite. Sie verwendet keine Cookies, kein Tracking, keine
        Analyse-Tools und lädt keine Inhalte von Drittanbietern nach. Auch die Schriften sind lokal
        eingebunden – beim Besuch dieser Website wird keine Verbindung zu externen Diensten
        aufgebaut.
      </p>

      <h2>Verantwortlicher</h2>
      <p>
        Malte Leon Lohrer
        <br />
        Obere Beutau 23
        <br />
        73728 Esslingen am Neckar
        <br />
        E-Mail: {EMAIL}
        <br />
        Telefon: {PHONE_DISPLAY}
      </p>

      <h2>Server-Logfiles</h2>
      <p>
        Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter automatisch technische
        Zugriffsdaten in sogenannten Server-Logfiles, zum Beispiel IP-Adresse, Datum und Uhrzeit
        des Abrufs, die aufgerufene Datei und den verwendeten Browser. Diese Daten sind für die
        Auslieferung der Website technisch erforderlich und werden nicht mit anderen Datenquellen
        zusammengeführt. Rechtsgrundlage ist mein berechtigtes Interesse an einem sicheren und
        stabilen Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO). Die Logfiles werden nach kurzer
        Zeit automatisch gelöscht.
      </p>

      <h2>Kontaktaufnahme</h2>
      <p>
        Wenn Sie mir per E-Mail oder Telefon eine Anfrage schicken, verarbeite ich die dabei
        übermittelten Daten (etwa Name, Kontaktdaten und den Inhalt der Nachricht) ausschließlich
        zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die
        Anfrage auf einen Vertrag zielt, im Übrigen mein berechtigtes Interesse an der Beantwortung
        (Art. 6 Abs. 1 lit. f DSGVO). Ich lösche diese Daten, sobald sie für die Bearbeitung nicht
        mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>

      <h2>Ihre Rechte</h2>
      <p>
        Sie haben gegenüber mir das Recht auf Auskunft über die verarbeiteten personenbezogenen
        Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
        Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen die
        Verarbeitung (Art. 21). Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde
        beschweren, zum Beispiel beim Landesbeauftragten für den Datenschutz und die
        Informationsfreiheit Baden-Württemberg.
      </p>

      <h2>Stand</h2>
      <p>
        August 2026. Diese Erklärung wird angepasst, sobald sich der Hosting-Anbieter oder der
        Funktionsumfang der Website ändert.
      </p>
    </LegalLayout>
  )
}
