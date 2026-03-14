"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

const IMAGES = [
  "https://picsum.photos/seed/1/800/1200",
  "https://picsum.photos/seed/2/800/1200",
  "https://picsum.photos/seed/3/800/1200",
  "https://picsum.photos/seed/4/800/1200",
  "https://picsum.photos/seed/5/800/1200",
  "https://picsum.photos/seed/6/800/1200",
]

// Alternate ken-burns transform origins per image for visual variety
const ORIGINS = ["center", "top right", "bottom left", "center", "top right", "bottom left"]

type BackgroundCarouselProps = {
  active: boolean
}

export function BackgroundCarousel({ active }: BackgroundCarouselProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!active) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [active])

  if (!active) return null

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{
              animation: "ken-burns 7s ease-in-out forwards",
              transformOrigin: ORIGINS[index % ORIGINS.length],
            }}
          >
            <Image
              src={IMAGES[index]}
              alt=""
              fill
              className="object-cover"
              style={{
                filter: "grayscale(100%)",
                mixBlendMode: "soft-light",
                opacity: 0.15,
              }}
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
