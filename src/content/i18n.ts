/**
 * All UI copy in both languages. One shared interface keeps EN and DE in
 * lockstep at compile time — a missing translation is a type error, so the
 * layout can rely on every string existing in both languages.
 *
 * English is the default; German is offered via the toggle in the nav.
 * Proper nouns (tools, employers, the 11 primary skills) stay untranslated.
 */
import type { Route } from '../lib/router'

export type Lang = 'en' | 'de'

interface ServiceCopy {
  title: string
  bullets: readonly string[]
  chips: readonly string[]
  footnote?: string
}

interface CaseStudyCopy {
  id: string
  client: string
  period: string
  title: string
  context: string
  built: readonly string[]
  result: string
  metrics: readonly { value: string; label: string }[]
  chips: readonly string[]
}

interface StationCopy {
  period: string
  org: string
  role: string
  desc: string
  final?: boolean
}

export interface Copy {
  /** Document titles per route (document.title). */
  titles: Record<Route, string>
  a11y: {
    skipLink: string
    mainNav: string
    langSwitch: string
    home: string
    menu: string
    menuOpen: string
    menuClose: string
    legalNav: string
    portraitAlt: string
    portraitFallback: string
  }
  nav: {
    tabs: readonly { route: Route; label: string }[]
    availability: string
  }
  whoami: {
    /** `$ whoami` stays a command in both languages. */
    prompt: string
    intro: string
    rotating: readonly string[]
    lead: string
    metaKeys: { location: string; availability: string; languages: string }
    meta: { location: string; availability: string; languages: string }
    ctaContact: string
    ctaProjects: string
    scrollCue: string
    about: {
      eyebrow: string
      heading: string
      paragraphs: readonly string[]
    }
    explore: {
      heading: string
      entries: readonly { route: Route; name: string; desc: string }[]
    }
  }
  trust: { label: string; names: readonly string[] }
  marqueeLabel: string
  services: {
    eyebrow: string
    title: string
    description: string
    items: readonly ServiceCopy[]
  }
  approach: {
    eyebrow: string
    title: string
    description: string
    principles: readonly { title: string; body: string }[]
  }
  projects: {
    eyebrow: string
    title: string
    description: string
    labels: { context: string; built: string; result: string }
    cases: readonly CaseStudyCopy[]
  }
  insights: {
    eyebrow: string
    title: string
    description: string
    essay: {
      tag: string
      title: string
      teaser: string
      linkLabel: string
      pending: string
    }
  }
  career: {
    eyebrow: string
    title: string
    description: string
    availableChip: string
    stations: readonly StationCopy[]
  }
  skills: {
    eyebrow: string
    title: string
    description: string
    groups: readonly { label: string; items: readonly string[] }[]
  }
  contact: {
    eyebrow: string
    titleA: string
    titleMark: string
    titleB: string
    lead: string
    direct: string
    facts: readonly { title: string; detail: string }[]
    form: {
      name: string
      email: string
      message: string
      namePlaceholder: string
      emailPlaceholder: string
      messagePlaceholder: string
      submit: string
      sending: string
      success: string
      errorPrefix: string
      privacyPrefix: string
      privacyLink: string
      privacySuffix: string
    }
  }
  footer: {
    imprint: string
    privacy: string
    top: string
    madeIn: string
  }
  legal: { backHome: string; home: string; note: string }
}

const en: Copy = {
  titles: {
    '/': 'Malte Lohrer · DevOps, Platform & AI Engineer',
    '/services': 'Services · Malte Lohrer',
    '/projects': 'Projects · Malte Lohrer',
    '/career': 'Career · Malte Lohrer',
    '/contact': 'Contact · Malte Lohrer',
    '/impressum': 'Impressum · Malte Lohrer',
    '/datenschutz': 'Datenschutzerklärung · Malte Lohrer',
  },
  a11y: {
    skipLink: 'Skip to content',
    mainNav: 'Main navigation',
    langSwitch: 'Language',
    home: 'Malte Lohrer — home',
    menu: 'Menu',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    legalNav: 'Legal',
    portraitAlt: 'Portrait of Malte Lohrer',
    portraitFallback: 'Monogram of Malte Lohrer — portrait photo to follow',
  },
  nav: {
    tabs: [
      { route: '/', label: 'whoami' },
      { route: '/services', label: 'services' },
      { route: '/projects', label: 'projects' },
      { route: '/career', label: 'career' },
      { route: '/contact', label: 'contact' },
    ],
    availability: 'available from 10/2026',
  },
  whoami: {
    prompt: 'whoami',
    intro: 'I build and run',
    rotating: ['CI/CD platforms', 'business platforms', 'LLM agents', 'AI automation'],
    lead: 'Over ten years in IT: four of them running the CI/CD platform behind Mercedes-Benz’s in-car UI development, most recently a business platform and an agentic AI assistant in production. I ship systems that survive the day-to-day — built, documented, operated.',
    metaKeys: { location: 'location', availability: 'availability', languages: 'languages' },
    meta: {
      location: 'Esslingen am Neckar · near Stuttgart',
      availability: 'from Oct 2026',
      languages: 'German · English',
    },
    ctaContact: 'Get in touch',
    ctaProjects: 'View projects',
    scrollCue: 'Scroll',
    about: {
      eyebrow: 'about',
      heading: 'A bit more about me',
      paragraphs: [
        'M.Sc. in Computer Science & Media from Stuttgart Media University (grade 1.5), in IT since 2015 — from Daimler and the Ministry of the Interior of Baden-Württemberg to Mercedes-Benz and Aremus Finance. At home in Esslingen am Neckar.',
        'I work remotely, directly, and without translation loss: one person for concept, implementation, and operations. I put decisions in writing, and results are verifiable — when in doubt, what runs in production counts.',
        'And after hours the building continues anyway: hardware and maker projects — just with a soldering iron instead of a pipeline.',
      ],
    },
    explore: {
      heading: 'Where to next',
      entries: [
        { route: '/services', name: 'services/', desc: 'what I do, and how I work' },
        { route: '/projects', name: 'projects/', desc: 'case studies with real numbers' },
        { route: '/career', name: 'career/', desc: 'stations since 2015, plus the toolset' },
        { route: '/contact', name: 'contact/', desc: 'form, e-mail, availability' },
      ],
    },
  },
  trust: {
    label: 'Worked for',
    names: ['Mercedes-Benz', 'Aremus Finance', 'Ministry of the Interior BW', 'Daimler'],
  },
  marqueeLabel: 'Tech stack',
  services: {
    eyebrow: 'services',
    title: 'What you get',
    description: 'Four areas, one standard: systems that run in production — not just in the demo.',
    items: [
      {
        title: 'Applied AI Engineering',
        bullets: [
          'LLM integration into existing business processes',
          'Agentic assistants with tool access to Microsoft 365, SharePoint, and CRM',
          'AI automation with n8n',
          'RAG pipelines and MCP tooling',
        ],
        chips: ['LLM integration', 'n8n', 'RAG', 'MCP'],
      },
      {
        title: 'Business platforms',
        bullets: [
          'Internal platforms and web apps: React, Node.js, PostgreSQL',
          'Frontend, backend, and database from a single pair of hands — one point of contact',
          'Integrations: Microsoft 365, SharePoint, CRM, e-mail',
          'Eight services in production at Aremus Finance',
        ],
        chips: ['React', 'Node.js', 'PostgreSQL'],
      },
      {
        title: 'CI/CD & Platform Engineering',
        bullets: [
          'CI/CD platforms: design, build-out, and migration',
          'Pipeline performance through parallelization and caching',
          'Release automation: tagging, changelogs, rollbacks',
          'Docker and Kubernetes workloads',
        ],
        chips: ['GitLab CI', 'Jenkins', 'GitHub Actions', 'Kubernetes'],
      },
      {
        title: 'Operations & Infrastructure',
        bullets: [
          'Docker stacks in production — on a dedicated server or in AWS',
          'Monitoring and alerting with Grafana, Prometheus, and ELK',
          'Encrypted offsite backups (AWS S3)',
          'Incident management and SRE practices',
        ],
        chips: ['Docker', 'AWS', 'Linux', 'Grafana'],
        footnote: 'I operate what I build.',
      },
    ],
  },
  approach: {
    eyebrow: 'how I work',
    title: 'Three principles, no platitudes',
    description:
      'What to expect from working with me — derived from real projects, not from a mission statement.',
    principles: [
      {
        title: 'The model classifies, the code decides.',
        body: 'LLMs do what they are good at: understanding, classifying, suggesting. Critical decisions run through deterministic, testable control flow.',
      },
      {
        title: 'Built for operations, not for the demo.',
        body: 'Monitoring, backups, and rollbacks are part of the design, not an afterthought. I build what survives the day-to-day — not what shines on stage.',
      },
      {
        title: 'Documentation is part of the job.',
        body: '195 documentation files in a single project: architecture, runbooks, decisions. Handover without a knowledge monopoly.',
      },
    ],
  },
  projects: {
    eyebrow: 'projects',
    title: 'Two projects that show how I work',
    description: 'Context, build, result — with real numbers instead of adjectives.',
    labels: { context: 'Context', built: 'What I built', result: 'Result' },
    cases: [
      {
        id: 'aremus',
        client: 'Aremus Finance',
        period: '07/2025 – 06/2026',
        title: 'Agentic AI assistant & operations platform',
        context:
          'Internal operations platform for a financial services firm — sole developer, from the first line of code to production.',
        built: [
          'Agentic AI assistant in production, with tool access to Microsoft 365, SharePoint, and CRM',
          'Self-hosted LLM gateway and LLM e-mail triage with deterministic control flow',
          'React + Node + PostgreSQL, an 8-service Docker Compose stack on a dedicated server',
          '7 CI workflows and encrypted offsite backups (AWS S3)',
        ],
        result:
          'Roughly 172,000 lines of code as a solo developer — documented, tested, and in daily use.',
        metrics: [
          { value: '≈ 172,000', label: 'lines of code' },
          { value: '79', label: 'test files' },
          { value: '195', label: 'documentation files' },
          { value: '1,956', label: 'commits in 10 weeks' },
        ],
        chips: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS S3', 'LLM integration'],
      },
      {
        id: 'mercedes',
        client: 'Mercedes-Benz',
        period: '11/2021 – 06/2025',
        title: 'CI/CD platform for in-car UI development',
        context:
          'The central CI/CD platform on which all of Mercedes-Benz’s in-car UI development builds, tests, and ships.',
        built: [
          'GitLab CI and Jenkins pipelines, including the migration between the two',
          'Pipeline performance: parallelization and caching',
          'Release automation: tagging, changelogs, rollbacks',
          'Monitoring with Grafana, Prometheus, and ELK; incident management and helping build up the SRE team',
        ],
        result:
          'Four years of platform ownership for all of in-car UI development — from commit to release.',
        metrics: [
          { value: '4', label: 'years of platform ownership' },
          { value: 'GitLab CI ← Jenkins', label: 'migration owned' },
          { value: 'SRE team', label: 'co-built' },
        ],
        chips: ['GitLab CI', 'Jenkins', 'Docker', 'Kubernetes', 'Grafana', 'Prometheus'],
      },
    ],
  },
  insights: {
    eyebrow: 'insights',
    title: 'From the engine room',
    description: 'Lessons from real systems — written down so others can use them.',
    essay: {
      tag: 'Essay',
      title: 'Running an LLM email triage in production',
      teaser:
        'What happens when an LLM sorts the real e-mail of a financial services firm? Field notes from production: architecture, failure modes — and why deterministic control flow makes the difference.',
      linkLabel: 'Read the essay',
      pending: 'publication pending',
    },
  },
  career: {
    eyebrow: 'career',
    title: 'Stations since 2015',
    description: 'From student CI monitoring to an agentic AI assistant in production.',
    availableChip: 'available',
    stations: [
      {
        period: '2015 – 2020',
        org: 'Daimler',
        role: 'Working student & master’s thesis',
        desc: 'ELK monitoring for the CI infrastructure.',
      },
      {
        period: 'Degree',
        org: 'Stuttgart Media University',
        role: 'M.Sc. Computer Science & Media',
        desc: 'Final grade 1.5.',
      },
      {
        period: '02 – 07/2021',
        org: 'Ministry of the Interior BW',
        role: 'Helped establish the state’s Cybersecurity Agency (CSBW)',
        desc: 'Set-up of Baden-Württemberg’s new cybersecurity agency.',
      },
      {
        period: '11/2021 – 06/2025',
        org: 'Mercedes-Benz',
        role: 'CI/CD platform for in-car UI development',
        desc: 'GitLab CI and Jenkins including the migration, release automation, monitoring with Grafana, Prometheus, and ELK, incident management, helping build up the SRE team.',
      },
      {
        period: '07/2025 – 06/2026',
        org: 'Aremus Finance',
        role: 'Operations platform & agentic AI assistant',
        desc: 'Internal operations platform as the sole developer — eight services in production, an AI assistant with tool access to Microsoft 365, SharePoint, and CRM.',
      },
      {
        period: 'from 10/2026',
        org: 'Your project',
        role: 'Available for new engagements',
        desc: '100% remote; a one-time kick-off in the Stuttgart area is possible.',
        final: true,
      },
    ],
  },
  skills: {
    eyebrow: 'skills',
    title: 'What I work with',
    description: 'Eleven tools at the core — the rest clusters around them.',
    groups: [
      {
        label: 'Cloud & Infra',
        items: [
          'AWS S3',
          'Docker Compose',
          'Grafana',
          'Prometheus',
          'ELK',
          'Linux server operations',
        ],
      },
      {
        label: 'CI & Tooling',
        items: [
          'Pipeline optimization',
          'Release automation',
          'Rollback strategies',
          'Incident management',
          'SRE',
        ],
      },
      {
        label: 'AI & Automation',
        items: [
          'RAG',
          'MCP',
          'LLM gateways',
          'E-mail triage',
          'Agent tooling',
          'Microsoft 365 integration',
        ],
      },
      { label: 'Web', items: ['React', 'Node.js', 'PostgreSQL'] },
    ],
  },
  contact: {
    eyebrow: 'contact',
    titleA: 'Got a project in',
    titleMark: 'mind',
    titleB: '?',
    lead: 'Tell me what you want to build — a short message is enough. I reply within 24 hours.',
    direct: 'Or write directly to',
    facts: [
      {
        title: 'Available from Oct 1, 2026',
        detail: 'Project start can be planned from October 2026.',
      },
      { title: '100% remote', detail: 'A one-time kick-off in the Stuttgart area is possible.' },
      { title: 'German & English', detail: 'Native and business fluent, respectively.' },
      { title: 'Freelance', detail: 'Contract for services or for work — terms on request.' },
    ],
    form: {
      name: 'Name',
      email: 'E-mail',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'name@company.com',
      messagePlaceholder: 'What is it about? A few sentences are enough.',
      submit: 'Send message',
      sending: 'Sending …',
      success: 'Thanks for your message — I will get back to you within 24 hours.',
      errorPrefix: 'That did not go through. Write to me directly:',
      privacyPrefix: 'Your details are used solely to handle your inquiry — see the ',
      privacyLink: 'privacy policy',
      privacySuffix: ' (German).',
    },
  },
  footer: {
    imprint: 'Legal notice',
    privacy: 'Privacy',
    top: 'Back to top ↑',
    madeIn: 'Made in Esslingen',
  },
  legal: {
    backHome: 'Back to home',
    home: 'Home',
    note: 'This page is provided in German — it is the legally required version for a business based in Germany.',
  },
}

const de: Copy = {
  titles: {
    '/': 'Malte Lohrer · DevOps, Platform & AI Engineer',
    '/services': 'Leistungen · Malte Lohrer',
    '/projects': 'Projekte · Malte Lohrer',
    '/career': 'Werdegang · Malte Lohrer',
    '/contact': 'Kontakt · Malte Lohrer',
    '/impressum': 'Impressum · Malte Lohrer',
    '/datenschutz': 'Datenschutzerklärung · Malte Lohrer',
  },
  a11y: {
    skipLink: 'Zum Inhalt springen',
    mainNav: 'Hauptnavigation',
    langSwitch: 'Sprache',
    home: 'Malte Lohrer – zur Startseite',
    menu: 'Menü',
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schließen',
    legalNav: 'Rechtliches',
    portraitAlt: 'Porträt von Malte Lohrer',
    portraitFallback: 'Monogramm von Malte Lohrer – Porträtfoto folgt',
  },
  nav: {
    tabs: [
      { route: '/', label: 'whoami' },
      { route: '/services', label: 'leistungen' },
      { route: '/projects', label: 'projekte' },
      { route: '/career', label: 'werdegang' },
      { route: '/contact', label: 'kontakt' },
    ],
    availability: 'verfügbar ab 10/2026',
  },
  whoami: {
    prompt: 'whoami',
    intro: 'Ich baue und betreibe',
    rotating: ['CI/CD-Plattformen', 'Business-Plattformen', 'LLM-Agenten', 'KI-Automatisierung'],
    lead: 'Über zehn Jahre IT: vier Jahre CI/CD-Plattform für die In-Car-UI-Entwicklung von Mercedes-Benz, zuletzt Business-Plattform und agentischer KI-Assistent in Produktion. Ich liefere Systeme, die im Alltag bestehen – gebaut, dokumentiert, betrieben.',
    metaKeys: { location: 'standort', availability: 'verfügbar', languages: 'sprachen' },
    meta: {
      location: 'Esslingen am Neckar · Raum Stuttgart',
      availability: 'ab Okt. 2026',
      languages: 'Deutsch · Englisch',
    },
    ctaContact: 'Projekt anfragen',
    ctaProjects: 'Projekte ansehen',
    scrollCue: 'Scrollen',
    about: {
      eyebrow: 'über mich',
      heading: 'Etwas mehr über mich',
      paragraphs: [
        'M.Sc. Computer Science & Media an der Hochschule der Medien Stuttgart (Note 1,5), seit 2015 in der IT – von Daimler über das Innenministerium Baden-Württemberg bis zu Mercedes-Benz und Aremus Finance. Zuhause in Esslingen am Neckar.',
        'Ich arbeite remote, direkt und ohne Übersetzungsverlust: ein Ansprechpartner für Konzept, Umsetzung und Betrieb. Entscheidungen begründe ich schriftlich, Ergebnisse sind belegbar – im Zweifel zählt, was in Produktion läuft.',
        'Und nach Feierabend wird trotzdem gebaut: Hardware- und Maker-Projekte, nur mit Lötkolben statt Pipeline.',
      ],
    },
    explore: {
      heading: 'Wohin als Nächstes',
      entries: [
        { route: '/services', name: 'leistungen/', desc: 'was ich mache – und wie ich arbeite' },
        { route: '/projects', name: 'projekte/', desc: 'Fallstudien mit echten Zahlen' },
        {
          route: '/career',
          name: 'werdegang/',
          desc: 'Stationen seit 2015, dazu der Werkzeugkasten',
        },
        { route: '/contact', name: 'kontakt/', desc: 'Formular, E-Mail, Verfügbarkeit' },
      ],
    },
  },
  trust: {
    label: 'Gearbeitet für',
    names: ['Mercedes-Benz', 'Aremus Finance', 'Innenministerium BW', 'Daimler'],
  },
  marqueeLabel: 'Tech-Stack',
  services: {
    eyebrow: 'leistungen',
    title: 'Was Sie bei mir bekommen',
    description:
      'Vier Bereiche, ein Anspruch: Systeme, die produktiv laufen – nicht nur in der Demo.',
    items: [
      {
        title: 'Applied AI Engineering',
        bullets: [
          'LLM-Integration in bestehende Geschäftsprozesse',
          'Agentische Assistenten mit Tool-Zugriff auf Microsoft 365, SharePoint und CRM',
          'KI-Automatisierung mit n8n',
          'RAG-Pipelines und MCP-Tooling',
        ],
        chips: ['LLM-Integration', 'n8n', 'RAG', 'MCP'],
      },
      {
        title: 'Business-Plattformen',
        bullets: [
          'Interne Plattformen und Web-Apps: React, Node.js, PostgreSQL',
          'Frontend, Backend und Datenbank aus einer Hand – ein Ansprechpartner',
          'Integrationen: Microsoft 365, SharePoint, CRM, E-Mail',
          'Acht Dienste im Produktivbetrieb bei Aremus Finance',
        ],
        chips: ['React', 'Node.js', 'PostgreSQL'],
      },
      {
        title: 'CI/CD & Platform Engineering',
        bullets: [
          'CI/CD-Plattformen: Konzeption, Aufbau und Migration',
          'Pipeline-Performance durch Parallelisierung und Caching',
          'Release-Automatisierung: Tagging, Changelogs, Rollbacks',
          'Docker- und Kubernetes-Workloads',
        ],
        chips: ['GitLab CI', 'Jenkins', 'GitHub Actions', 'Kubernetes'],
      },
      {
        title: 'Betrieb & Infrastruktur',
        bullets: [
          'Docker-Stacks im Produktivbetrieb – auf eigenem Server oder in AWS',
          'Monitoring und Alerting mit Grafana, Prometheus und ELK',
          'Verschlüsselte Offsite-Backups (AWS S3)',
          'Incident Management und SRE-Praktiken',
        ],
        chips: ['Docker', 'AWS', 'Linux', 'Grafana'],
        footnote: 'Ich betreibe, was ich baue.',
      },
    ],
  },
  approach: {
    eyebrow: 'arbeitsweise',
    title: 'Drei Prinzipien, keine Floskeln',
    description:
      'Was Sie von der Zusammenarbeit erwarten können – abgeleitet aus realen Projekten, nicht aus einem Leitbild.',
    principles: [
      {
        title: 'Das Modell klassifiziert, der Code entscheidet.',
        body: 'LLMs übernehmen, was sie gut können: verstehen, einordnen, vorschlagen. Kritische Entscheidungen laufen durch deterministischen, testbaren Kontrollfluss.',
      },
      {
        title: 'Betriebsblick statt Prototyp.',
        body: 'Monitoring, Backups und Rollbacks sind Teil des Designs, nicht ein Nachtrag. Gebaut wird, was den Alltag übersteht – nicht, was in der Demo glänzt.',
      },
      {
        title: 'Dokumentation ist Teil der Arbeit.',
        body: '195 Doku-Dateien in einem einzigen Projekt: Architektur, Runbooks, Entscheidungen. Übergabe ohne Kopfmonopol.',
      },
    ],
  },
  projects: {
    eyebrow: 'projekte',
    title: 'Zwei Projekte, die zeigen, wie ich arbeite',
    description: 'Kontext, Umsetzung, Ergebnis – mit echten Zahlen statt Adjektiven.',
    labels: { context: 'Kontext', built: 'Was ich gebaut habe', result: 'Ergebnis' },
    cases: [
      {
        id: 'aremus',
        client: 'Aremus Finance',
        period: '07/2025 – 06/2026',
        title: 'Agentischer KI-Assistent & Betriebsplattform',
        context:
          'Interne Betriebsplattform für einen Finanzdienstleister – als einziger Entwickler verantwortlich, von der ersten Zeile bis zum Produktivbetrieb.',
        built: [
          'Agentischer KI-Assistent in Produktion, mit Tool-Zugriff auf Microsoft 365, SharePoint und CRM',
          'Selbst betriebener LLM-Gateway und LLM-E-Mail-Triage mit deterministischem Kontrollfluss',
          'React + Node + PostgreSQL, 8-Dienste-Docker-Compose-Stack auf eigenem Server',
          '7 CI-Workflows und verschlüsselte Offsite-Backups (AWS S3)',
        ],
        result:
          'Rund 172.000 Zeilen Code als Solo-Entwickler – dokumentiert, getestet und im täglichen Betrieb.',
        metrics: [
          { value: '≈ 172.000', label: 'Zeilen Code' },
          { value: '79', label: 'Testdateien' },
          { value: '195', label: 'Doku-Dateien' },
          { value: '1.956', label: 'Commits in 10 Wochen' },
        ],
        chips: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS S3', 'LLM-Integration'],
      },
      {
        id: 'mercedes',
        client: 'Mercedes-Benz',
        period: '11/2021 – 06/2025',
        title: 'CI/CD-Plattform für die In-Car-UI-Entwicklung',
        context:
          'Die zentrale CI/CD-Plattform, auf der die gesamte In-Car-UI-Entwicklung von Mercedes-Benz baut, testet und ausliefert.',
        built: [
          'GitLab-CI- und Jenkins-Pipelines, inklusive Migration zwischen den Systemen',
          'Pipeline-Performance: Parallelisierung und Caching',
          'Release-Automatisierung: Tagging, Changelogs, Rollbacks',
          'Monitoring mit Grafana, Prometheus und ELK; Incident Management und Aufbau des SRE-Teams',
        ],
        result:
          'Vier Jahre Plattformverantwortung für die gesamte In-Car-UI-Entwicklung – vom Commit bis zum Release.',
        metrics: [
          { value: '4', label: 'Jahre Plattformverantwortung' },
          { value: 'GitLab CI ← Jenkins', label: 'Migration verantwortet' },
          { value: 'SRE-Team', label: 'mit aufgebaut' },
        ],
        chips: ['GitLab CI', 'Jenkins', 'Docker', 'Kubernetes', 'Grafana', 'Prometheus'],
      },
    ],
  },
  insights: {
    eyebrow: 'insights',
    title: 'Aus dem Maschinenraum',
    description:
      'Erfahrungen aus echten Systemen – aufgeschrieben, damit andere sie nutzen können.',
    essay: {
      tag: 'Essay',
      title: 'Running an LLM email triage in production',
      teaser:
        'Was passiert, wenn ein LLM echte E-Mails eines Finanzdienstleisters sortiert? Ein Erfahrungsbericht aus dem Produktivbetrieb: Architektur, Fehlerfälle – und warum deterministischer Kontrollfluss den Unterschied macht.',
      linkLabel: 'Zum Essay',
      pending: 'Veröffentlichung folgt',
    },
  },
  career: {
    eyebrow: 'werdegang',
    title: 'Stationen seit 2015',
    description:
      'Vom Werkstudenten am CI-Monitoring bis zum agentischen KI-Assistenten in Produktion.',
    availableChip: 'verfügbar',
    stations: [
      {
        period: '2015 – 2020',
        org: 'Daimler',
        role: 'Werkstudent & Masterand',
        desc: 'ELK-Monitoring der CI-Infrastruktur.',
      },
      {
        period: 'Abschluss',
        org: 'Hochschule der Medien Stuttgart',
        role: 'M.Sc. Computer Science & Media',
        desc: 'Abschlussnote 1,5.',
      },
      {
        period: '02 – 07/2021',
        org: 'Innenministerium Baden-Württemberg',
        role: 'Mitaufbau der Cybersicherheitsagentur (CSBW)',
        desc: 'Aufbau der neuen Cybersicherheitsagentur des Landes Baden-Württemberg.',
      },
      {
        period: '11/2021 – 06/2025',
        org: 'Mercedes-Benz',
        role: 'CI/CD-Plattform der In-Car-UI-Entwicklung',
        desc: 'GitLab CI und Jenkins inklusive Migration, Release-Automatisierung, Monitoring mit Grafana, Prometheus und ELK, Incident Management, Aufbau des SRE-Teams.',
      },
      {
        period: '07/2025 – 06/2026',
        org: 'Aremus Finance',
        role: 'Betriebsplattform & agentischer KI-Assistent',
        desc: 'Interne Betriebsplattform als einziger Entwickler – acht Dienste im Produktivbetrieb, KI-Assistent mit Tool-Zugriff auf Microsoft 365, SharePoint und CRM.',
      },
      {
        period: 'ab 10/2026',
        org: 'Ihr Projekt',
        role: 'Verfügbar für neue Vorhaben',
        desc: '100 % remote, einmaliger Kick-off im Raum Stuttgart möglich.',
        final: true,
      },
    ],
  },
  skills: {
    eyebrow: 'skills',
    title: 'Womit ich arbeite',
    description: 'Elf Werkzeuge im Kern – der Rest gruppiert sich darum.',
    groups: [
      {
        label: 'Cloud & Infra',
        items: ['AWS S3', 'Docker Compose', 'Grafana', 'Prometheus', 'ELK', 'Linux-Server-Betrieb'],
      },
      {
        label: 'CI & Tooling',
        items: [
          'Pipeline-Optimierung',
          'Release-Automatisierung',
          'Rollback-Strategien',
          'Incident Management',
          'SRE',
        ],
      },
      {
        label: 'AI & Automation',
        items: [
          'RAG',
          'MCP',
          'LLM-Gateways',
          'E-Mail-Triage',
          'Agenten-Tooling',
          'Microsoft-365-Integration',
        ],
      },
      { label: 'Web', items: ['React', 'Node.js', 'PostgreSQL'] },
    ],
  },
  contact: {
    eyebrow: 'kontakt',
    titleA: 'Projekt im',
    titleMark: 'Kopf',
    titleB: '?',
    lead: 'Erzählen Sie mir, was Sie bauen wollen – eine kurze Nachricht genügt. Antwort innerhalb von 24 Stunden.',
    direct: 'Oder direkt an',
    facts: [
      { title: 'Verfügbar ab 01.10.2026', detail: 'Projektstart planbar ab Oktober 2026.' },
      { title: '100 % remote', detail: 'Einmaliger Kick-off im Raum Stuttgart möglich.' },
      { title: 'Deutsch & Englisch', detail: 'Muttersprache bzw. verhandlungssicher.' },
      { title: 'Freiberuflich', detail: 'Dienst- oder Werkvertrag – Konditionen auf Anfrage.' },
    ],
    form: {
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      namePlaceholder: 'Ihr Name',
      emailPlaceholder: 'name@firma.de',
      messagePlaceholder: 'Worum geht es? Ein paar Sätze genügen.',
      submit: 'Nachricht senden',
      sending: 'Wird gesendet …',
      success: 'Danke für Ihre Nachricht – ich melde mich innerhalb von 24 Stunden.',
      errorPrefix: 'Senden hat nicht geklappt. Schreiben Sie mir direkt:',
      privacyPrefix:
        'Ihre Angaben werden ausschließlich zur Bearbeitung der Anfrage verarbeitet – Details in der ',
      privacyLink: 'Datenschutzerklärung',
      privacySuffix: '.',
    },
  },
  footer: {
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    top: 'Nach oben ↑',
    madeIn: 'Made in Esslingen',
  },
  legal: { backHome: 'Zurück zur Startseite', home: 'Startseite', note: '' },
}

export const COPY: Record<Lang, Copy> = { en, de }
