/**
 * Small, local icon set — outline, thin stroke, currentColor only.
 * Every icon here is decorative (aria-hidden built in): pair it with
 * visible text, or put the accessible name on the link/button that
 * wraps it, never on the icon itself.
 */

interface IconProps {
  className?: string
  size?: number
}

const STROKE = 1.5

export function InstagramIcon({ className, size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE}
      />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth={STROKE} />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

export function TikTokIcon({ className, size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className}>
      {/* Optical compensation: at matching stroke width the raw note shape's
          bbox is ~14.3x16.3 in this viewBox, visibly smaller and taller-
          than-wide next to Instagram's 18x18 square footprint. Non-uniform
          scale about the glyph's center brings both dimensions to ~18,
          so the two read as the same size in a row — measured via
          SVGGraphicsElement.getBBox(), not eyeballed. */}
      <g transform="translate(11.15,11.47) scale(1.26,1.1) translate(-11.15,-11.47)">
        <path
          d="M14.2 3.3c.6 2 2 3.3 4.1 3.6v2.7c-1.4 0-2.8-.4-4.1-1.3v6.2a5.1 5.1 0 1 1-4.3-5v2.8a2.4 2.4 0 1 0 1.7 2.3V3.3h2.6z"
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

export function ArrowUpRightIcon({ className, size = 15 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className}>
      <path
        d="M7 17 17 7M9 7h8v8"
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowRightIcon({ className, size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className}>
      <path
        d="M4 12h16M14 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronLeftIcon({ className, size = 18 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className}>
      <path
        d="M15 5 8 12l7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronRightIcon({ className, size = 18 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className}>
      <path
        d="M9 5l7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ExternalLinkIcon({ className, size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className}>
      <path
        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
