/** Customer-facing copy. German is the default; both languages share one contract. */
import type { Route } from '../lib/router'
export type Lang = 'de' | 'en'
export interface Copy {
  titles: Record<Route, string>
  descriptions: Record<Route, string>
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
  nav: { tabs: readonly { route: Route; label: string }[]; availability: string; cta: string }
  hero: {
    eyebrow: string
    title: string
    titleAccent: string
    lead: string
    experience: string
    ctaContact: string
    ctaProjects: string
    location: string
    caption: string
  }
  trust: { label: string; names: readonly string[] }
  services: {
    eyebrow: string
    title: string
    description: string
    more: string
    items: readonly { title: string; description: string; bullets: readonly string[] }[]
    note: string
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
    more: string
    labels: { context: string; built: string; result: string; role: string }
    cases: readonly {
      id: string
      client: string
      period: string
      category: string
      title: string
      summary: string
      context: string
      role: string
      built: readonly string[]
      result: string
    }[]
  }
  about: {
    eyebrow: string
    title: string
    homeTitle: string
    homeBody: string
    more: string
    paragraphs: readonly string[]
    facts: readonly { title: string; detail: string }[]
  }
  career: {
    title: string
    stations: readonly { period: string; org: string; role: string; desc: string }[]
  }
  contact: {
    eyebrow: string
    title: string
    lead: string
    direct: string
    nextTitle: string
    nextBody: string
    ctaTitle: string
    ctaBody: string
    ctaButton: string
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
  footer: { imprint: string; privacy: string; top: string; tagline: string }
  legal: { backHome: string; home: string; note: string }
}
const de: Copy = {
  titles: {
    '/': 'Malte Lohrer · Softwareentwicklung & IT-Beratung',
    '/services': 'Leistungen · Software, Automatisierung & IT-Betrieb · Malte Lohrer',
    '/projects': 'Ausgewählte Projekte · Malte Lohrer',
    '/career': 'Über mich · Malte Lohrer',
    '/contact': 'Kontakt & Projektanfrage · Malte Lohrer',
    '/impressum': 'Impressum · Malte Lohrer',
    '/datenschutz': 'Datenschutzerklärung · Malte Lohrer',
  },
  descriptions: {
    '/': 'Freiberuflicher Softwareentwickler und IT-Berater aus Esslingen: individuelle Anwendungen, Automatisierung, KI und zuverlässiger Betrieb. Lernen wir uns kennen.',
    '/services':
      'Individuelle Software entwickeln, Abläufe automatisieren, Entwicklungsteams unterstützen und Anwendungen betreiben. Leistungen von Malte Lohrer.',
    '/projects':
      'Einblicke in meine Arbeit: eine interne Plattform mit KI-Assistent bei Aremus Finance und Softwarebereitstellung bei Mercedes-Benz.',
    '/career':
      'Malte Lohrer, Softwareentwickler und IT-Berater aus Esslingen. Seit 2015 in der IT, mit Erfahrung bei Mercedes-Benz, Aremus Finance und im öffentlichen Sektor.',
    '/contact':
      'Sie suchen Unterstützung für ein Softwareprojekt? Schildern Sie mir Ihr Vorhaben. Remote-Zusammenarbeit, Deutsch und Englisch, Projektstart ab Oktober 2026.',
    '/impressum': 'Anbieterkennzeichnung und Kontaktdaten von Malte Lohrer.',
    '/datenschutz': 'Informationen zur Verarbeitung personenbezogener Daten auf lohrer-digital.de.',
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
    portraitAlt: 'Malte Lohrer',
    portraitFallback: 'Initialen von Malte Lohrer',
  },
  nav: {
    tabs: [
      { route: '/services', label: 'Leistungen' },
      { route: '/projects', label: 'Projekte' },
      { route: '/career', label: 'Über mich' },
      { route: '/contact', label: 'Kontakt' },
    ],
    availability: 'Verfügbar ab Oktober 2026',
    cta: 'Projekt besprechen',
  },
  hero: {
    eyebrow: 'Freiberuflicher Softwareentwickler & IT-Berater',
    title: 'Software entwickeln.',
    titleAccent: 'Abläufe vereinfachen.',
    lead: 'Ich unterstütze Unternehmen dabei, eigene Anwendungen zu entwickeln, wiederkehrende Aufgaben zu automatisieren und bestehende Systeme weiterzuentwickeln. Von der ersten Idee bis zum laufenden Betrieb.',
    experience:
      'Seit 2015 in der IT. Ein direkter Ansprechpartner für Planung, Entwicklung und Betrieb.',
    ctaContact: 'Projekt besprechen',
    ctaProjects: 'Projekte ansehen',
    location: 'Esslingen am Neckar · Zusammenarbeit remote',
    caption: 'Ihr Ansprechpartner: Malte Lohrer',
  },
  trust: {
    label: 'Erfahrung aus Projekten und Tätigkeiten bei',
    names: ['Mercedes-Benz', 'Aremus Finance', 'Innenministerium Baden-Württemberg', 'Daimler'],
  },
  services: {
    eyebrow: 'Leistungen',
    title: 'Wobei ich Sie unterstütze',
    description:
      'Sie möchten einen Ablauf vereinfachen, eine Anwendung entwickeln oder Ihr Team bei einem technischen Vorhaben unterstützen? Hier kann ich ansetzen.',
    more: 'Alle Leistungen ansehen',
    items: [
      {
        title: 'Individuelle Software',
        description:
          'Interne Anwendungen und Web-Plattformen, die zu Ihren Abläufen passen und Informationen an einem Ort zusammenbringen.',
        bullets: [
          'Anforderungen gemeinsam klären und eine passende Lösung planen',
          'Anwendungen entwickeln, die Ihr Team im Browser nutzen kann',
          'Bestehende Systeme verbinden, etwa Microsoft 365 und SharePoint',
          'Vorhandene Anwendungen erweitern und weiterentwickeln',
        ],
      },
      {
        title: 'Automatisierung & KI',
        description:
          'Wiederkehrende Arbeit reduzieren: Informationen verarbeiten, Anwendungen verbinden und KI gezielt in Ihre Abläufe einbinden.',
        bullets: [
          'Wiederkehrende Aufgaben automatisieren, zum Beispiel mit n8n',
          'KI-Assistenten an Unternehmenswissen und Anwendungen anbinden',
          'Eingehende Nachrichten einordnen und die Bearbeitung vorbereiten',
          'Gemeinsam festlegen, welche Schritte eine menschliche Freigabe benötigen',
        ],
      },
      {
        title: 'Entwicklungsteams unterstützen',
        description:
          'Software automatisiert prüfen und veröffentlichen – damit Ihr Team Änderungen nachvollziehbar und zuverlässig ausliefern kann.',
        bullets: [
          'Automatische Abläufe für Softwaretests und Veröffentlichungen aufbauen',
          'Bestehende Entwicklungsplattformen verbessern oder umziehen',
          'Lange Durchlaufzeiten untersuchen und verkürzen',
          'Softwarestände nachvollziehbar verwalten und bei Bedarf zurücksetzen',
        ],
      },
      {
        title: 'Betrieb & Weiterentwicklung',
        description:
          'Anwendungen nach der Einführung betreuen, Störungen erkennen und die Grundlage für weitere Entwicklung schaffen.',
        bullets: [
          'Anwendungen auf eigenen Servern oder in einer passenden Cloud betreiben',
          'Den Betrieb überwachen und bei Störungen benachrichtigen lassen',
          'Verschlüsselte Datensicherungen getrennt vom laufenden System einrichten',
          'Fehler untersuchen, beheben und die Lösung verständlich dokumentieren',
        ],
      },
    ],
    note: 'Welche Anwendungen und Technologien sinnvoll sind, klären wir anhand Ihrer Anforderungen und der Systeme, die Sie bereits nutzen.',
  },
  approach: {
    eyebrow: 'Zusammenarbeit',
    title: 'So läuft ein Projekt mit mir ab',
    description:
      'Sie sprechen direkt mit mir – von der ersten Abstimmung bis zur Einführung und Betreuung.',
    principles: [
      {
        title: 'Ziel und Umfang klären',
        body: 'Wir schauen auf Ihre Abläufe und besprechen, was einfacher werden soll. Daraus entsteht ein konkreter Vorschlag mit nachvollziehbarem Umfang, Aufwand und nächsten Schritten.',
      },
      {
        title: 'Früh ausprobieren',
        body: 'Sie erhalten früh eine erste nutzbare Version und können sie an echten Aufgaben ausprobieren. Wir besprechen regelmäßig den Fortschritt und passen die nächsten Schritte anhand Ihres Feedbacks an.',
      },
      {
        title: 'Einführen und übergeben',
        body: 'Ich begleite den Start und zeige Ihrem Team die Anwendung. Einrichtung, Betrieb und wichtige Entscheidungen dokumentiere ich so, dass andere darauf aufbauen können. Bei Bedarf betreue ich die Lösung weiter.',
      },
    ],
  },
  projects: {
    eyebrow: 'Ausgewählte Projekte',
    title: 'Einblicke in meine Arbeit',
    description:
      'Zwei Beispiele aus unterschiedlichen Umgebungen: eine interne Unternehmensplattform und die Unterstützung einer großen Softwareentwicklung.',
    more: 'Projekt im Detail ansehen',
    labels: {
      context: 'Die Aufgabe',
      built: 'Mein Beitrag',
      result: 'Das Ergebnis',
      role: 'Meine Rolle',
    },
    cases: [
      {
        id: 'aremus',
        client: 'Aremus Finance',
        period: '07/2025 – 06/2026',
        category: 'Individuelle Software & KI',
        title: 'Eine interne Plattform mit KI-Unterstützung',
        summary:
          'Entwicklung und Betrieb einer Unternehmensplattform mit einem KI-Assistenten, der auf bestehende Anwendungen und Informationen zugreifen kann.',
        context:
          'Für einen Finanzdienstleister entstand eine interne Plattform zur Unterstützung des Tagesgeschäfts. Dazu gehörten ein KI-Assistent und die automatisierte Einordnung eingehender E-Mails.',
        role: 'Alleiniger Entwickler – von der Konzeption bis zum Betrieb.',
        built: [
          'Die Plattform als zusammenhängende Anwendung geplant und entwickelt',
          'Einen KI-Assistenten mit Zugriff auf Microsoft 365, SharePoint und die Kundenverwaltung eingebunden',
          'Die Einordnung eingehender E-Mails mit KI unterstützt und die weitere Verarbeitung durch feste Regeln gesteuert',
          'Automatische Tests und Veröffentlichungen sowie verschlüsselte, getrennt gespeicherte Datensicherungen eingerichtet',
        ],
        result:
          'Die Plattform und der KI-Assistent wurden im täglichen Betrieb eingesetzt. Entwicklung, technische Dokumentation und laufender Betrieb lagen in einer Hand.',
      },
      {
        id: 'mercedes',
        client: 'Mercedes-Benz',
        period: '11/2021 – 06/2025',
        category: 'Entwicklungsplattform & Betrieb',
        title: 'Software für die Fahrzeugbedienung bereitstellen',
        summary:
          'Verantwortung für die zentrale Plattform, über die die Entwicklung der Fahrzeugbedienung ihre Software baut, testet und veröffentlicht.',
        context:
          'Die Entwicklung von Bedienoberflächen im Fahrzeug benötigte eine verlässliche Plattform für automatische Tests und die Bereitstellung neuer Softwarestände.',
        role: 'Verantwortung für die Entwicklungsplattform über knapp vier Jahre.',
        built: [
          'Automatische Test- und Veröffentlichungsabläufe entwickelt und betreut',
          'Den Wechsel zwischen zwei Entwicklungsplattformen verantwortet',
          'Durchlaufzeiten durch parallele Verarbeitung und die Wiederverwendung von Zwischenergebnissen optimiert',
          'Die Betriebsüberwachung ausgebaut, Störungen bearbeitet und beim Aufbau des Teams für zuverlässigen Betrieb mitgewirkt',
        ],
        result:
          'Die zentrale Plattform unterstützte die gesamte Entwicklung der Fahrzeugbedienung bei der Prüfung und Bereitstellung ihrer Software. Auch die Migration und der laufende Betrieb gehörten zu meinem Verantwortungsbereich.',
      },
    ],
  },
  about: {
    eyebrow: 'Über mich',
    title: 'Hallo, ich bin Malte.',
    homeTitle: 'Ein direkter Ansprechpartner für Ihr Projekt.',
    homeBody:
      'Ich bin freiberuflicher Softwareentwickler und IT-Berater aus Esslingen am Neckar. Seit 2015 arbeite ich in der IT – von der öffentlichen Verwaltung über die Automobilbranche bis zu Finanzdienstleistungen. Ich übernehme sowohl die Entwicklung neuer Anwendungen als auch die Arbeit an bestehenden Systemen.',
    more: 'Mehr über mich',
    paragraphs: [
      'Ich entwickle Software, automatisiere Abläufe und kümmere mich darum, dass Anwendungen zuverlässig betrieben werden können. Besonders gern arbeite ich an Vorhaben, bei denen ich die fachliche Aufgabe verstehen und die Lösung von Anfang bis Ende begleiten kann.',
      'Meine Erfahrung reicht von großen Entwicklungsumgebungen bei Mercedes-Benz bis zur eigenständigen Umsetzung einer Unternehmensplattform bei Aremus Finance. Dadurch kenne ich sowohl die Zusammenarbeit in bestehenden Teams als auch die Verantwortung für ein komplettes Projekt.',
      'Ich arbeite remote aus Esslingen am Neckar. Für den gemeinsamen Projektstart ist ein einmaliges Treffen im Raum Stuttgart möglich. Die Zusammenarbeit kann auf Deutsch oder Englisch stattfinden.',
      'Auch abseits der Arbeit beschäftige ich mich gern mit Technik – unter anderem mit eigenen Hardware- und Maker-Projekten.',
    ],
    facts: [
      {
        title: 'Seit 2015 in der IT',
        detail: 'Erfahrung in Unternehmen und im öffentlichen Sektor',
      },
      { title: 'M.Sc. Computer Science & Media', detail: 'Hochschule der Medien Stuttgart' },
      { title: 'Esslingen am Neckar', detail: 'Remote-Zusammenarbeit auf Deutsch und Englisch' },
    ],
  },
  career: {
    title: 'Mein beruflicher Hintergrund',
    stations: [
      {
        period: '07/2025 – 06/2026',
        org: 'Aremus Finance',
        role: 'Softwareentwicklung & KI',
        desc: 'Eigenständige Entwicklung und Betrieb einer internen Unternehmensplattform mit KI-Assistent und Anbindung bestehender Anwendungen.',
      },
      {
        period: '11/2021 – 06/2025',
        org: 'Mercedes-Benz',
        role: 'Entwicklungsplattform & Betrieb',
        desc: 'Verantwortung für automatische Tests und Softwarebereitstellung in der Entwicklung von Bedienoberflächen im Fahrzeug, einschließlich Plattformwechsel und Betriebsüberwachung.',
      },
      {
        period: '02 – 07/2021',
        org: 'Innenministerium Baden-Württemberg',
        role: 'Aufbau der Cybersicherheitsagentur',
        desc: 'Mitwirkung beim Aufbau der neuen Cybersicherheitsagentur des Landes Baden-Württemberg.',
      },
      {
        period: '2015 – 2020',
        org: 'Daimler',
        role: 'Werkstudent & Masterand',
        desc: 'Überwachung der technischen Infrastruktur für automatische Softwaretests und Entwicklungsabläufe.',
      },
    ],
  },
  contact: {
    eyebrow: 'Kontakt',
    title: 'Lassen Sie uns Ihr Vorhaben besprechen.',
    lead: 'Sie haben eine konkrete Aufgabe oder möchten erst klären, was möglich ist? Schreiben Sie mir, worum es geht. Ein paar Sätze zu Ihrer Ausgangslage reichen für den Anfang.',
    direct: 'Lieber direkt per E-Mail?',
    nextTitle: 'Wie geht es danach weiter?',
    nextBody:
      'Ich melde mich bei Ihnen, um die offenen Fragen und einen passenden nächsten Schritt zu besprechen. Ein fertiges Konzept brauchen Sie dafür noch nicht.',
    ctaTitle: 'Was möchten Sie angehen?',
    ctaBody:
      'Eine neue Anwendung, weniger manuelle Arbeit oder Unterstützung für Ihr Team: Erzählen Sie mir kurz von Ihrem Vorhaben.',
    ctaButton: 'Kontakt aufnehmen',
    facts: [
      {
        title: 'Projektstart ab Oktober 2026',
        detail: 'Anfragen und erste Gespräche sind schon jetzt möglich.',
      },
      {
        title: 'Zusammenarbeit remote',
        detail: 'Einmaliges Auftakttreffen im Raum Stuttgart möglich.',
      },
      {
        title: 'Deutsch & Englisch',
        detail: 'Abstimmung und Dokumentation in der passenden Sprache.',
      },
    ],
    form: {
      name: 'Ihr Name',
      email: 'Ihre E-Mail-Adresse',
      message: 'Worum geht es?',
      namePlaceholder: 'Vor- und Nachname',
      emailPlaceholder: 'name@unternehmen.de',
      messagePlaceholder:
        'Was möchten Sie verbessern oder umsetzen? Gibt es bereits einen Zeitrahmen?',
      submit: 'Anfrage senden',
      sending: 'Wird gesendet …',
      success: 'Vielen Dank für Ihre Anfrage. Ich melde mich bei Ihnen.',
      errorPrefix: 'Ihre Anfrage konnte nicht gesendet werden. Schreiben Sie mir direkt an:',
      privacyPrefix: 'Ihre Angaben verwende ich zur Bearbeitung Ihrer Anfrage. Mehr dazu in der ',
      privacyLink: 'Datenschutzerklärung',
      privacySuffix: '.',
    },
  },
  footer: {
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    top: 'Nach oben',
    tagline: 'Softwareentwicklung & IT-Beratung · Esslingen am Neckar',
  },
  legal: { backHome: 'Zur Startseite', home: 'Startseite', note: '' },
}
const en: Copy = {
  titles: {
    '/': 'Malte Lohrer · Software Development & IT Consulting',
    '/services': 'Services · Software, Automation & Operations · Malte Lohrer',
    '/projects': 'Selected Projects · Malte Lohrer',
    '/career': 'About Me · Malte Lohrer',
    '/contact': 'Contact & Project Enquiries · Malte Lohrer',
    '/impressum': 'Legal Notice · Malte Lohrer',
    '/datenschutz': 'Privacy Policy · Malte Lohrer',
  },
  descriptions: {
    '/': 'Freelance software developer and IT consultant in Esslingen, Germany. Custom applications, automation, AI and reliable operations. Let’s discuss your project.',
    '/services':
      'Custom software, workflow automation, support for development teams and application operations. Services by Malte Lohrer.',
    '/projects':
      'Examples of my work: an internal platform with an AI assistant at Aremus Finance and software delivery at Mercedes-Benz.',
    '/career':
      'Malte Lohrer, software developer and IT consultant in Esslingen. Working in IT since 2015, with experience at Mercedes-Benz, Aremus Finance and in the public sector.',
    '/contact':
      'Need support with a software project? Tell me what you have in mind. Remote collaboration in German and English, available from October 2026.',
    '/impressum': 'Legal notice and contact details for Malte Lohrer.',
    '/datenschutz': 'Information about the processing of personal data on lohrer-digital.de.',
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
    portraitAlt: 'Malte Lohrer',
    portraitFallback: 'Initials of Malte Lohrer',
  },
  nav: {
    tabs: [
      { route: '/services', label: 'Services' },
      { route: '/projects', label: 'Projects' },
      { route: '/career', label: 'About me' },
      { route: '/contact', label: 'Contact' },
    ],
    availability: 'Available from October 2026',
    cta: 'Discuss a project',
  },
  hero: {
    eyebrow: 'Freelance Software Developer & IT Consultant',
    title: 'Build software.',
    titleAccent: 'Simplify everyday work.',
    lead: 'I help companies develop their own applications, automate recurring tasks and improve existing systems. From the first idea through to day-to-day operations.',
    experience:
      'Working in IT since 2015. One direct contact for planning, development and operations.',
    ctaContact: 'Discuss a project',
    ctaProjects: 'View projects',
    location: 'Esslingen, Germany · Working remotely',
    caption: 'Your point of contact: Malte Lohrer',
  },
  trust: {
    label: 'Experience from projects and roles at',
    names: [
      'Mercedes-Benz',
      'Aremus Finance',
      'Ministry of the Interior Baden-Württemberg',
      'Daimler',
    ],
  },
  services: {
    eyebrow: 'Services',
    title: 'Where I can help',
    description:
      'Looking to simplify a workflow, build an application or support your team with a technical project? These are the areas I work in.',
    more: 'Explore all services',
    items: [
      {
        title: 'Custom software',
        description:
          'Internal applications and web platforms that fit your workflows and bring information together in one place.',
        bullets: [
          'Clarify requirements together and plan a suitable solution',
          'Build applications your team can use in the browser',
          'Connect existing systems, such as Microsoft 365 and SharePoint',
          'Extend and improve applications you already use',
        ],
      },
      {
        title: 'Automation & AI',
        description:
          'Reduce repetitive work: process information, connect applications and introduce AI into specific workflows.',
        bullets: [
          'Automate recurring tasks, for example with n8n',
          'Connect AI assistants to company knowledge and applications',
          'Classify incoming messages and prepare them for processing',
          'Agree which steps require human approval',
        ],
      },
      {
        title: 'Support for development teams',
        description:
          'Automate software testing and delivery so your team can release changes reliably and keep track of what ships.',
        bullets: [
          'Set up automated software testing and release processes',
          'Improve or migrate existing development platforms',
          'Investigate and reduce long processing times',
          'Keep releases traceable and make it possible to restore earlier versions',
        ],
      },
      {
        title: 'Operations & ongoing development',
        description:
          'Look after applications after launch, detect issues and prepare the ground for further development.',
        bullets: [
          'Run applications on your own servers or with a suitable cloud provider',
          'Monitor operations and set up alerts for problems',
          'Set up encrypted backups stored separately from the running system',
          'Investigate and resolve faults, and document the solution clearly',
        ],
      },
    ],
    note: 'We choose applications and technologies based on your requirements and the systems you already use.',
  },
  approach: {
    eyebrow: 'Working together',
    title: 'What to expect from a project',
    description:
      'You work directly with me, from our first conversation through to launch and ongoing support.',
    principles: [
      {
        title: 'Agree on the goal and scope',
        body: 'We look at your workflows and discuss what you want to improve. I turn that into a concrete proposal with a clear scope, an estimate of the work involved and the next steps.',
      },
      {
        title: 'Try it early',
        body: 'You receive an initial working version early on and can try it with real tasks. We regularly review progress and use your feedback to shape the next steps.',
      },
      {
        title: 'Launch and hand over',
        body: 'I help introduce the application and show your team how to use it. I document setup, operations and key decisions so others can build on the work. Ongoing support is available if needed.',
      },
    ],
  },
  projects: {
    eyebrow: 'Selected projects',
    title: 'A closer look at my work',
    description:
      'Two examples from different environments: an internal business platform and support for a large software development organisation.',
    more: 'View project details',
    labels: {
      context: 'The task',
      built: 'My contribution',
      result: 'The result',
      role: 'My role',
    },
    cases: [
      {
        id: 'aremus',
        client: 'Aremus Finance',
        period: '07/2025 – 06/2026',
        category: 'Custom software & AI',
        title: 'An internal platform with AI support',
        summary:
          'Development and operation of a business platform with an AI assistant connected to existing applications and information.',
        context:
          'An internal platform was built to support the day-to-day work of a financial services company. It included an AI assistant and automated classification of incoming email.',
        role: 'Sole developer, responsible from initial design through to operations.',
        built: [
          'Designed and built the platform as a connected application',
          'Integrated an AI assistant with access to Microsoft 365, SharePoint and customer management',
          'Used AI to classify incoming email, with fixed rules governing subsequent processing',
          'Set up automated testing and releases, alongside encrypted backups stored separately',
        ],
        result:
          'The platform and AI assistant were used in daily operations. I was responsible for development, technical documentation and running the system.',
      },
      {
        id: 'mercedes',
        client: 'Mercedes-Benz',
        period: '11/2021 – 06/2025',
        category: 'Development platform & operations',
        title: 'Delivering software for in-car interfaces',
        summary:
          'Responsibility for the central platform used by the in-car interface development organisation to build, test and release its software.',
        context:
          'The teams developing in-car interfaces needed a reliable platform for automated testing and the delivery of new software versions.',
        role: 'Responsible for the development platform for almost four years.',
        built: [
          'Developed and maintained automated testing and release processes',
          'Led the migration between two development platforms',
          'Optimised processing times through parallel execution and reuse of intermediate results',
          'Extended monitoring, handled incidents and helped establish the team responsible for reliable operations',
        ],
        result:
          'The central platform supported the entire in-car interface development organisation in testing and delivering its software. My responsibilities included both the migration and ongoing operations.',
      },
    ],
  },
  about: {
    eyebrow: 'About me',
    title: 'Hello, I’m Malte.',
    homeTitle: 'One direct contact for your project.',
    homeBody:
      'I’m a software developer and IT consultant based in Esslingen, Germany. I have worked in IT since 2015, across the public sector, automotive industry and financial services. My work covers both new applications and existing systems.',
    more: 'More about me',
    paragraphs: [
      'I develop software, automate workflows and help keep applications running reliably. I particularly enjoy projects where I can understand the business need and see the solution through from start to finish.',
      'My experience ranges from large development environments at Mercedes-Benz to building an entire business platform at Aremus Finance. I know both how to contribute to an established team and how to take responsibility for a complete project.',
      'I work remotely from Esslingen am Neckar, Germany. A one-off kick-off meeting in the Stuttgart area is possible. We can work together in German or English.',
      'Outside work, I enjoy building things too, including my own hardware and maker projects.',
    ],
    facts: [
      {
        title: 'Working in IT since 2015',
        detail: 'Experience in companies and the public sector',
      },
      { title: 'M.Sc. Computer Science & Media', detail: 'Stuttgart Media University' },
      {
        title: 'Based in Esslingen, Germany',
        detail: 'Remote collaboration in German and English',
      },
    ],
  },
  career: {
    title: 'My professional background',
    stations: [
      {
        period: '07/2025 – 06/2026',
        org: 'Aremus Finance',
        role: 'Software development & AI',
        desc: 'Sole development and operation of an internal business platform with an AI assistant connected to existing applications.',
      },
      {
        period: '11/2021 – 06/2025',
        org: 'Mercedes-Benz',
        role: 'Development platform & operations',
        desc: 'Responsible for automated testing and software delivery for in-car interfaces, including platform migration and monitoring.',
      },
      {
        period: '02 – 07/2021',
        org: 'Ministry of the Interior Baden-Württemberg',
        role: 'Establishing the Cybersecurity Agency',
        desc: 'Contributed to setting up Baden-Württemberg’s new Cybersecurity Agency.',
      },
      {
        period: '2015 – 2020',
        org: 'Daimler',
        role: 'Working student & master’s thesis',
        desc: 'Monitoring the infrastructure used for automated software testing and development workflows.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Let’s discuss your project.',
    lead: 'Have a specific task in mind, or want to explore what is possible? Tell me a little about your situation. A few sentences are enough to get started.',
    direct: 'Prefer to email me directly?',
    nextTitle: 'What happens next?',
    nextBody:
      'I’ll get back to you to discuss any open questions and agree on a useful next step. You don’t need a finished specification to start the conversation.',
    ctaTitle: 'What would you like to work on?',
    ctaBody:
      'A new application, less manual work or support for your team: tell me a little about what you have in mind.',
    ctaButton: 'Get in touch',
    facts: [
      {
        title: 'Available from October 2026',
        detail: 'Enquiries and initial conversations are welcome now.',
      },
      {
        title: 'Working remotely',
        detail: 'A one-off kick-off meeting in the Stuttgart area is possible.',
      },
      {
        title: 'German & English',
        detail: 'Communication and documentation in the language that suits you.',
      },
    ],
    form: {
      name: 'Your name',
      email: 'Your email address',
      message: 'What do you have in mind?',
      namePlaceholder: 'First and last name',
      emailPlaceholder: 'name@company.com',
      messagePlaceholder:
        'What would you like to improve or build? Do you have a timeframe in mind?',
      submit: 'Send enquiry',
      sending: 'Sending …',
      success: 'Thank you for your enquiry. I’ll get back to you.',
      errorPrefix: 'Your enquiry could not be sent. Please email me directly at:',
      privacyPrefix: 'I use your details to respond to your enquiry. Read more in the ',
      privacyLink: 'privacy policy',
      privacySuffix: ' (in German).',
    },
  },
  footer: {
    imprint: 'Legal notice',
    privacy: 'Privacy',
    top: 'Back to top',
    tagline: 'Software Development & IT Consulting · Esslingen, Germany',
  },
  legal: { backHome: 'Back to home', home: 'Home', note: 'This document is provided in German.' },
}
export const COPY: Record<Lang, Copy> = { de, en }
