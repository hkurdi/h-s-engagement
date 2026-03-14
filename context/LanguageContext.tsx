"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { SITE_CONFIG } from "@/data/config"

type Language = "en" | "ar"

type LanguageContextValue = {
  lang: Language
  setLang: (l: Language) => void
  t: typeof SITE_CONFIG.en
  isAr: boolean
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en")

  const isAr = lang === "ar"
  const t = isAr ? SITE_CONFIG.ar : SITE_CONFIG.en

  useEffect(() => {
    document.documentElement.dir = isAr ? "rtl" : "ltr"
    document.documentElement.lang = isAr ? "ar" : "en"
  }, [isAr])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isAr }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return ctx
}
