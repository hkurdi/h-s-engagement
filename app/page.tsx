"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { EnvelopeIntro } from "@/components/sections/EnvelopeIntro"
import { HeroReveal } from "@/components/sections/HeroReveal"
import { BackgroundCarousel } from "@/components/ui/BackgroundCarousel"

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <main>
      {/* Envelope intro — exits with opacity fade */}
      <AnimatePresence>
        {!introComplete && (
          <motion.div
            key="envelope-intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <EnvelopeIntro onComplete={() => setIntroComplete(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background carousel starts after intro */}
      <BackgroundCarousel active={introComplete} />

      {/* Main site fades in after intro completes */}
      {introComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroReveal />
        </motion.div>
      )}
    </main>
  )
}
