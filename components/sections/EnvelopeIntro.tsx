"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import gsap from "gsap"
import { IslamicPattern } from "@/components/ui/IslamicPattern"
import { WaxSeal } from "@/components/ui/WaxSeal"
import { useLanguage } from "@/context/LanguageContext"
import { SITE_CONFIG } from "@/data/config"
import { animateEnvelopeOpen } from "@/animations/envelope"

type EnvelopeIntroProps = {
  onComplete: () => void
}

export function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const { t } = useLanguage()
  const [cracked, setCracked] = useState(false)

  // DOM refs for GSAP
  const wrapperRef = useRef<HTMLDivElement>(null)
  const flapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const bismillahRef = useRef<HTMLDivElement>(null)
  const tapHintRef = useRef<HTMLParagraphElement>(null)

  // Guard: only open once
  const hasOpened = useRef(false)

  // On mount: fade in bismillah + start tap-hint pulse
  useEffect(() => {
    if (bismillahRef.current) {
      gsap.fromTo(
        bismillahRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.8, ease: "power2.out" }
      )
    }
    if (tapHintRef.current) {
      gsap.fromTo(
        tapHintRef.current,
        { opacity: 0.3 },
        { opacity: 0.7, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" }
      )
    }
  }, [])

  const handleOpen = useCallback(() => {
    if (hasOpened.current) return
    hasOpened.current = true

    // Kill & fade out tap hint
    if (tapHintRef.current) {
      gsap.killTweensOf(tapHintRef.current)
      gsap.to(tapHintRef.current, { opacity: 0, duration: 0.3 })
    }

    if (
      !sealRef.current ||
      !flapRef.current ||
      !cardRef.current ||
      !wrapperRef.current
    )
      return

    animateEnvelopeOpen(
      sealRef.current,
      flapRef.current,
      cardRef.current,
      wrapperRef.current,
      () => setCracked(true),
      onComplete
    )
  }, [onComplete])

  // Attach click + touchstart to the entire overlay
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    el.addEventListener("click", handleOpen)
    el.addEventListener("touchstart", handleOpen, { passive: true })
    return () => {
      el.removeEventListener("click", handleOpen)
      el.removeEventListener("touchstart", handleOpen)
    }
  }, [handleOpen])

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer select-none"
      style={{ background: "#0F0F0F" }}
    >
      {/* Subtle background pattern */}
      <IslamicPattern opacity={0.035} />

      {/* Bismillah — always Arabic */}
      <div
        ref={bismillahRef}
        className="absolute top-6 sm:top-10 left-0 right-0 text-center font-amiri text-gold text-sm sm:text-base tracking-widest pointer-events-none"
        style={{ opacity: 0 }}
      >
        {SITE_CONFIG.bismillah}
      </div>

      {/* ─── Envelope container ─────────────────────────────── */}
      <div className="relative w-[clamp(260px,80vw,400px)]">
        {/* Aspect-ratio holder — all positioned elements anchor to this */}
        <div className="relative" style={{ aspectRatio: "1.45 / 1" }}>

          {/* Cream envelope body background (gives shadow + cream fill) */}
          <div className="absolute inset-0 bg-cream shadow-2xl" />

          {/* ── Decorative flaps (clip-path triangles) ── */}

          {/* Bottom flap — triangle pointing up from bottom */}
          <div
            className="absolute bottom-0 inset-x-0 h-[52%] bg-cream-dark"
            style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 0)" }}
          />
          {/* Left flap */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1/2 bg-cream-dark"
            style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
          />
          {/* Right flap */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-cream-dark"
            style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }}
          />

          {/* ── Invitation card (outside overflow-hidden so it can rise above) ── */}
          <div
            ref={cardRef}
            className="absolute inset-x-2 bottom-2 h-[70%] flex items-center justify-center overflow-hidden"
            style={{ background: "#FAFAF8", opacity: 0, zIndex: 5 }}
          >
            <span className="font-playfair text-base text-black/50 tracking-wide">
              Hamza &amp; Sara
            </span>
          </div>

          {/* ── Top/back flap — GSAP rotates this open (z above card) ── */}
          <div
            ref={flapRef}
            className="absolute top-0 inset-x-0 h-[52%] bg-cream-dark"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transformOrigin: "bottom center",
              backfaceVisibility: "hidden",
              zIndex: 10,
            }}
          />

          {/* ── Wax seal ── */}
          <div
            ref={sealRef}
            className="absolute left-1/2 -translate-x-1/2 top-[28%] -translate-y-1/2 w-[70px] sm:w-[84px]"
            style={{ aspectRatio: "1 / 1", zIndex: 20 }}
          >
            <WaxSeal cracked={cracked} />
          </div>
        </div>

        {/* Tap hint — sits below the envelope, always visible on any phone */}
        <p
          ref={tapHintRef}
          className="text-center mt-6 font-inter text-[10px] sm:text-xs text-cream tracking-widest uppercase"
          style={{ opacity: 0.3 }}
        >
          {t.tap_to_open}
        </p>
      </div>
    </div>
  )
}
