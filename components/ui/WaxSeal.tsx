import { useId } from "react"

type WaxSealProps = {
  cracked?: boolean
  size?: number
}

/**
 * SVG wax seal with feTurbulence texture, radial gradient fill,
 * gold monogram ring, and optional crack lines.
 * Uses viewBox 0 0 100 100 so it scales cleanly via width/height.
 */
export function WaxSeal({ cracked = false, size }: WaxSealProps) {
  const uid = useId().replace(/:/g, "_")
  const filterId = `wax-tex-${uid}`
  const gradId = `wax-grad-${uid}`

  return (
    <svg
      width={size ?? "100%"}
      height={size ?? "100%"}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <defs>
        {/* Wax texture filter */}
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Radial gradient: lighter warm center → very dark edge */}
        <radialGradient id={gradId} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#2a1010" />
          <stop offset="100%" stopColor="#0f0505" />
        </radialGradient>
      </defs>

      {/* Main wax circle with texture */}
      <circle
        cx="50"
        cy="50"
        r="47"
        fill={`url(#${gradId})`}
        filter={`url(#${filterId})`}
      />

      {/* Gold outer ring */}
      <circle cx="50" cy="50" r="43" stroke="#C6A664" strokeWidth="2" fill="none" />

      {/* Inner decorative ring */}
      <circle cx="50" cy="50" r="36" stroke="#C6A664" strokeWidth="0.6" fill="none" strokeOpacity="0.5" />

      {/* Monogram "HS" */}
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="var(--font-playfair), Georgia, serif"
        fill="#C6A664"
        fontSize="28"
        fontWeight="400"
        letterSpacing="2"
      >
        HS
      </text>

      {/* Crack lines — revealed after seal flicker animation */}
      {cracked && (
        <g stroke="#C6A664" strokeWidth="0.6" strokeOpacity="0.4" fill="none">
          <path d="M 50 50 L 63 30 L 59 24" />
          <path d="M 50 50 L 70 59 L 74 67" />
          <path d="M 50 50 L 37 67 L 33 74" />
          <path d="M 50 50 L 30 41 L 25 33" />
        </g>
      )}
    </svg>
  )
}
