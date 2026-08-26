import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { COPY, type Copy, type Lang } from '../content/i18n'

const STORAGE_KEY = 'lang'

function initialLang(): Lang {
  // English is the default; only an explicit earlier choice switches to German.
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'de' || stored === 'en') return stored
  } catch {
    /* storage unavailable (private mode etc.) — fall through to default */
  }
  return 'en'
}

interface I18nValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Copy
}

const I18nContext = createContext<I18nValue>({ lang: 'en', setLang: () => {}, t: COPY.en })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  // Keep the document language in sync (screen readers, hyphenation, search).
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* non-persistent is fine */
    }
  }, [])

  const value = useMemo(() => ({ lang, setLang, t: COPY[lang] }), [lang, setLang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18nValue {
  return useContext(I18nContext)
}

/** Shorthand for components that only read copy. */
// eslint-disable-next-line react-refresh/only-export-components
export function useCopy(): Copy {
  return useI18n().t
}
