type IslamicPatternProps = {
  opacity?: number
  color?: string
  size?: number
}

/**
 * Full-cover repeating 8-pointed Islamic geometric star tessellation.
 * Rendered as a CSS background-image data URI.
 */
export function IslamicPattern({
  opacity = 0.04,
  color = "#C6A664",
  size = 120,
}: IslamicPatternProps) {
  // Encode '#' for use inside the data URI
  const c = color.replace("#", "%23")

  // 8-pointed star: 16-point polygon alternating outer (r=40) and inner (r=17)
  // centered on a 120×120 viewBox.
  // Outer tips at 0°/45°/90°… inner saddles at 22.5°/67.5°/112.5°…
  const star =
    "60,20 66.5,44.3 88.3,31.7 75.7,53.5 100,60 75.7,66.5 88.3,88.3 " +
    "66.5,75.7 60,100 53.5,75.7 31.7,88.3 44.3,66.5 20,60 44.3,53.5 31.7,31.7 53.5,44.3"

  const svg = [
    `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 120 120'>`,
    `<g fill='none' stroke='${c}' stroke-width='0.75'>`,
    // Central 8-pointed star outline
    `<polygon points='${star}'/>`,
    // Cardinal lines from star tips to tile edges (form full crosses when tiled)
    `<line x1='60' y1='20' x2='60' y2='0'/>`,
    `<line x1='100' y1='60' x2='120' y2='60'/>`,
    `<line x1='60' y1='100' x2='60' y2='120'/>`,
    `<line x1='20' y1='60' x2='0' y2='60'/>`,
    // Diagonal lines from star tips to tile corners (form X shapes when tiled)
    `<line x1='88.3' y1='31.7' x2='120' y2='0'/>`,
    `<line x1='88.3' y1='88.3' x2='120' y2='120'/>`,
    `<line x1='31.7' y1='88.3' x2='0' y2='120'/>`,
    `<line x1='31.7' y1='31.7' x2='0' y2='0'/>`,
    // V-notches at edge midpoints — form small octagons when tiled
    `<path d='M46,0 L60,14 L74,0'/>`,
    `<path d='M46,120 L60,106 L74,120'/>`,
    `<path d='M0,46 L14,60 L0,74'/>`,
    `<path d='M120,46 L106,60 L120,74'/>`,
    // Corner diagonal segments — form small diamonds when tiled
    `<path d='M0,14 L14,0'/><path d='M106,0 L120,14'/>`,
    `<path d='M0,106 L14,120'/><path d='M106,120 L120,106'/>`,
    `</g></svg>`,
  ].join("")

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        backgroundImage: `url("data:image/svg+xml,${svg}")`,
        backgroundSize: `${size}px ${size}px`,
        backgroundRepeat: "repeat",
      }}
    />
  )
}
