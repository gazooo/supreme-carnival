# Inhalt und Positionierung

Stand der Überarbeitung: 12. September 2026.

## Ziel

Persönliches Aushängeschild von Malte Lohrer und Einstieg in eine Projektanfrage.
Die Texte richten sich auch an Entscheider ohne technischen Hintergrund.
Besucher sollen erkennen, wobei Malte hilft, welche Erfahrung er mitbringt und
wie eine Zusammenarbeit beginnt.

## Aufbau

- Startseite: Angebot, Porträt, berufliche Stationen als Vertrauensbasis,
  Leistungsüberblick, zwei Projektbeispiele, Zusammenarbeit, Kurzvorstellung,
  Kontaktaufruf.
- Leistungen: individuelle Software, Automatisierung und KI, Unterstützung von
  Entwicklungsteams, Betrieb und Weiterentwicklung.
- Projekte: Aufgabe, Rolle, Beitrag und Ergebnis bei Aremus Finance und
  Mercedes-Benz.
- Über mich: persönliche Vorstellung, Ausbildung, Arbeitsort und Werdegang.
- Kontakt: Ausgangslage schildern, Formular oder E-Mail, Verfügbarkeit und
  Erläuterung des nächsten Schritts.

## Redaktionelle Regeln

Deutsch ist die Standardsprache. Alle Marketingtexte und Beschriftungen werden
auch auf Englisch gepflegt. Der Name eines Werkzeugs wird genannt, wenn er
Kunden bei der Einordnung hilft; n8n, Microsoft 365 und SharePoint sind sinnvolle
Beispiele. Eine vollständige Technologieliste ist kein Ziel.

Beschreiben, was die Arbeit ermöglicht, und konkrete Aufgaben nennen.
Fachabkürzungen wie LLM, RAG, MCP, SRE oder CI/CD in einleitenden Texten vermeiden.
Die technische Erfahrung in Softwarebereitstellung und Betrieb bleibt in den
Leistungen und Projektbeschreibungen erkennbar.

Keine Codezeilen, Commit-Mengen, Testdatei- oder Dokumentationszahlen als
Qualitätsnachweis. Keine erfundenen Einsparungen, Erfolgsquoten,
Kundenzitate oder Qualifikationen. Dokumentation anhand ihres Nutzens erklären:
Einrichtung, Betrieb, Entscheidungen und Übergabe nachvollziehbar machen.

Die bisherigen Angaben sind die Faktenbasis: Tätigkeit in der IT seit 2015,
M.Sc. Computer Science & Media an der Hochschule der Medien Stuttgart,
Esslingen am Neckar, Remote-Arbeit, Deutsch und Englisch, Projektstart ab Oktober 2026. Die Mercedes-Benz-Station von November 2021 bis Juni 2025 wird als
„knapp vier Jahre“ beschrieben. Arbeitgeber und Projektumgebungen werden als
„Erfahrung aus Projekten und Tätigkeiten bei“ genannt; daraus wird keine
Kundenempfehlung oder ausschließlich freiberufliche Zusammenarbeit abgeleitet.

Die behauptete Antwortgarantie von 24 Stunden wurde entfernt. Ebenso entfallen
der unveröffentlichte Artikel, allgemeine Werkzeuglisten, Terminal-Texte und
rotierende Schlagwörter. Die vorhandenen Rechtstexte wurden inhaltlich nicht
umgeschrieben.

## Recherchegrundlage

Öffentliche Websites erfahrener selbstständiger IT-Fachleute, betrachtet am 12. September 2026. Erfahrung und Referenzen sind Selbstauskünfte auf den
jeweiligen Websites; wirtschaftlicher Erfolg oder die Wirksamkeit ihres
Webdesigns wurden nicht unabhängig gemessen.

- [Harry Roberts — Leistungen](https://csswizardry.com/services/) und
  [Profil](https://csswizardry.com/about/): klare Leistungsangebote mit Bezug
  zur Aufgabe des Kunden; Beratung, Umsetzung und Wissenstransfer.
- [Alexander Heit](https://alexanderheit.de/): seit 2005 selbstständig laut
  Website; Beschreibung von Aufgaben, Zusammenarbeit und Ansprechpartner.
- [Marc-Oliver Scheele](https://www.moscon.de/): konkrete langjährige Projekte,
  Rollen und Beiträge; Referenzen zur beruflichen Einordnung.
- [Simone Fellini](https://felliniweb.it/): Webentwicklung seit 2002 laut
  Website; Leistungen und Projektbeispiele vor ergänzenden Werkzeugangaben.
- [Heinz W. Richter](https://hwrichter.de/): IT-Erfahrung seit 1991 laut
  Website; Beratungsangebote und beruflicher Hintergrund.

Übernommen wurden allgemeine Strukturprinzipien. Texte, Projektangaben,
Kundenzitate und Gestaltungselemente der Vorbilder wurden nicht kopiert.

## Pflege

Inhalte und Metadaten: `src/content/i18n.ts`.
Kontaktadresse: `src/content/site.ts` sowie Personendaten in `index.html`.
Hauptadresse: `https://lohrer-digital.de`. Domainangaben in HTML-Vorlage,
Browser-Metadaten, Sitemap, robots.txt und Linkvorschau gemeinsam pflegen.
Ein Domainwechsel ändert die vorhandene Kontaktadresse nicht automatisch.
Verfügbarkeit vor Veröffentlichung prüfen und bei Änderungen in beiden
Sprachen aktualisieren. Projektangaben nur anhand gesicherter Fakten ergänzen.

Suchmaschinenbeschreibungen, Social-Vorschau und Startseitentext müssen zur
Positionierung passen. Beim Build werden die öffentlichen Routen aus den
gleichen Komponenten und deutschen Texten vorgerendert.
