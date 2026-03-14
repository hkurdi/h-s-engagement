"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { SITE_CONFIG } from "@/data/config"

// Shared stagger variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
}

export function HeroReveal() {
  const { t, isAr } = useLanguage()

  return (
    <section
      className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center overflow-hidden py-20 sm:py-24 md:py-32 px-4 sm:px-6"
      style={{ background: "rgba(246,243,237,0.92)" }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center w-full max-w-xl mx-auto"
      >
        {/* 1. Bismillah — always Arabic, never translated */}
        <motion.p
          variants={item}
          className="font-amiri text-black/35 text-base sm:text-lg mb-6 sm:mb-8 arabic"
          dir="rtl"
        >
          {SITE_CONFIG.bismillah}
        </motion.p>

        {/* 2. Hero photo */}
        <motion.div variants={item} className="mx-auto">
          {/* Outer frame wrapper */}
          <div
            className="relative mx-auto shadow-xl"
            style={{
              width: "clamp(180px, 55vw, 260px)",
              aspectRatio: "3 / 4",
              border: "3px solid rgba(198,166,100,0.25)",
              padding: "6px",
              backgroundColor: "var(--color-cream)",
              boxSizing: "border-box",
            }}
          >
            {/* next/image fill container — inset by the 6px mat */}
            <div
              className="absolute overflow-hidden"
              style={{ inset: "6px" }}
            >
              <Image
                src="/images/1.png"
                alt="Hamza and Sara"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 55vw, 30vw"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* 3. Couple names */}
        <motion.h1
          variants={item}
          className="font-playfair font-normal tracking-wide text-black mt-8 sm:mt-10"
          style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)" }}
        >
          Hamza &amp; Sara
        </motion.h1>

        {/* 4. Gold accent line */}
        <motion.div
          variants={item}
          className="my-5 sm:my-6 mx-auto bg-gold"
          style={{ width: 48, height: 1, opacity: 0.6 }}
        />

        {/* 5. Event type block — both languages always shown */}
        <motion.div variants={item} className="flex flex-col items-center gap-1">
          <p className="font-amiri text-2xl sm:text-3xl text-black/65 arabic" dir="rtl">
            {SITE_CONFIG.ar.event_type_arabic}
          </p>
          <p className="font-playfair italic text-base sm:text-lg text-black/50">
            {SITE_CONFIG.en.event_type}
          </p>
        </motion.div>

        {/* 6. Date and city */}
        <motion.p
          variants={item}
          className="font-inter text-[10px] sm:text-xs tracking-widest uppercase text-black/40 mt-6 sm:mt-8"
          dir={isAr ? "rtl" : "ltr"}
        >
          {t.date} &nbsp;·&nbsp; {t.city}
        </motion.p>

        {/* 7. Quran ayah */}
        <motion.div
          variants={item}
          className="mt-10 sm:mt-14 max-w-xs sm:max-w-sm md:max-w-md mx-auto px-2"
        >
          {/* Arabic text */}
          <p
            className="font-amiri text-xl sm:text-2xl text-black arabic leading-loose mb-3"
            dir="rtl"
          >
            {SITE_CONFIG.ayah.arabic}
          </p>
          {/* English translation */}
          <p className="font-inter text-xs sm:text-sm text-black/55 italic leading-relaxed">
            {SITE_CONFIG.ayah.english}
          </p>
          {/* Reference */}
          <p className="font-inter text-[10px] sm:text-xs text-black/35 tracking-widest uppercase mt-2 sm:mt-3">
            {isAr ? SITE_CONFIG.ayah.reference_ar : SITE_CONFIG.ayah.reference_en}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
