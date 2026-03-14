import gsap from "gsap"

/**
 * Cinematic envelope-opening sequence.
 * All animated elements are passed as direct DOM node refs — no querySelector.
 *
 * @param sealEl      The wax-seal wrapper element
 * @param flapEl      The top/back flap element
 * @param cardEl      The rising invitation card element
 * @param wrapperEl   The full-screen envelope intro wrapper (fades out last)
 * @param onCracked   Called when the "cracked" visual state should be applied
 * @param onComplete  Called after the full sequence finishes
 */
export function animateEnvelopeOpen(
  sealEl: HTMLElement,
  flapEl: HTMLElement,
  cardEl: HTMLElement,
  wrapperEl: HTMLElement,
  onCracked: () => void,
  onComplete: () => void
): void {
  // Pre-position the card before the timeline starts
  gsap.set(cardEl, { y: "60%", opacity: 0, scale: 0.95 })

  const tl = gsap.timeline({ onComplete })

  // 1. Seal flicker — 0.97 → 1.02 cycle × 2 ≈ "0.25s, repeat 1"
  tl.to(sealEl, { scale: 0.97, duration: 0.125, ease: "none" })
    .to(sealEl, { scale: 1.02, duration: 0.125, ease: "none" })
    .to(sealEl, { scale: 0.97, duration: 0.125, ease: "none" })
    .to(sealEl, { scale: 1.02, duration: 0.125, ease: "none" })

  // 2. Seal crack — fire React state callback, then scale up + settle (0.4s)
  tl.call(onCracked)
    .to(sealEl, { scale: 1.08, duration: 0.2, ease: "power2.out" })
    .to(sealEl, { scale: 1.0, duration: 0.2, ease: "power2.in" })

  // 3. Flap open — rotateX 0 → -180, perspective applied on element, 0.65s
  tl.to(flapEl, {
    rotateX: -180,
    duration: 0.65,
    ease: "power2.inOut",
    transformOrigin: "bottom center",
    transformPerspective: 800,
  })

  // 4. Card rise — starts 0.3s after flap begins (= 0.35s before flap ends)
  tl.to(
    cardEl,
    { y: "-15%", opacity: 1, duration: 0.8, ease: "power2.out" },
    "-=0.35"
  )

  // 5. Card expand — scale 0.95 → 1 after rise completes
  tl.to(cardEl, { scale: 1, duration: 0.5 })

  // 6. Fade out entire intro wrapper
  tl.to(wrapperEl, { opacity: 0, duration: 0.6 })
}
