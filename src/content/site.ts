/** Language-independent facts (single source of truth for the UI). */
export const EMAIL = 'maltelohrer1990@hotmail.de'
// TODO: E-Mail-Adresse auf Domain-Postfach umstellen, sobald eines existiert.
export const MAILTO = `mailto:${EMAIL}?subject=Projektanfrage`

/**
 * Kontaktformular-Endpoint. Same-origin-Pfad, der auf dem Host (Caddy) zum
 * lokalen Site-Server proxied wird — siehe server/site-server.mjs und
 * DEPLOY.md. Im Dev/Preview ohne Dienst antwortet er 404; das Formular zeigt
 * dann den E-Mail-Fallback.
 */
export const CONTACT_ENDPOINT = '/api/contact'

/** The 11 primary skills — exact list, in this order (not translated). */
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
