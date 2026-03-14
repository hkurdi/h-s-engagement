"use client"

import { useLanguage } from "@/context/LanguageContext"

export function LanguageToggle() {
  const { lang, setLang, t, isAr } = useLanguage()

  return (
    <button
      onClick={() => setLang(isAr ? "en" : "ar")}
      className={`fixed top-4 z-50 bg-black/60 backdrop-blur-sm text-cream font-inter text-xs tracking-widest uppercase px-4 py-2 border border-cream/10 rounded-none cursor-pointer hover:bg-black/80 transition-all duration-200 ${
        isAr ? "left-4" : "right-4"
      }`}
    >
      {t.lang_toggle}
    </button>
  )
}
