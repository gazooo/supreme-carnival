/** Central contact + engagement facts (single source of truth for the UI). */
export const EMAIL = 'maltelohrer1990@hotmail.de'
// TODO: E-Mail-Adresse auf Domain-Postfach umstellen, sobald die Domain existiert.
export const PHONE_DISPLAY = '+49 173 8682978'
export const PHONE_TEL = '+491738682978'
export const MAILTO = `mailto:${EMAIL}?subject=Projektanfrage`
export const AVAILABILITY_SHORT = 'Verfügbar ab Oktober 2026'
export const AVAILABILITY_DATE = '01.10.2026'
export const LOCATION = 'Esslingen am Neckar · Raum Stuttgart'

/** The 11 primary skills — exact list, in this order. */
export const PRIMARY_SKILLS = [
  'CI/CD',
  'GitLab CI',
  'Jenkins',
  'GitHub Actions',
  'Docker',
  'Kubernetes',
  'AWS',
  'Linux',
  'Python',
  'LLM-Integration',
  'n8n',
] as const

export const NAV_LINKS = [
  { href: '#leistungen', label: 'Leistungen' },
  { href: '#projekte', label: 'Projekte' },
  { href: '#werdegang', label: 'Werdegang' },
  { href: '#ueber-mich', label: 'Über mich' },
  { href: '#kontakt', label: 'Kontakt' },
] as const
