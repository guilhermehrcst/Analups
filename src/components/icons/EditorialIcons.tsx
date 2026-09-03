interface IconProps {
  className?: string
  size?: number
}

const shared = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function InstagramIcon({ className, size = 18 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
    >
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25" {...shared} />
      <circle cx="12" cy="12" r="4.15" {...shared} />
      <circle cx="17.35" cy="6.7" r="0.95" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TikTokIcon({ className, size = 18 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
    >
      <path
        d="M14.1 3.4v10.9a4.15 4.15 0 1 1-3.55-4.1v2.65a1.65 1.65 0 1 0 1.05 1.54V3.4h2.5Zm0 0c.35 2.05 1.72 3.5 4.1 3.88v2.55c-1.52-.08-2.9-.53-4.1-1.35"
        {...shared}
      />
    </svg>
  )
}

export function ArrowUpRightIcon({ className, size = 15 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7M9 7h8v8" {...shared} />
    </svg>
  )
}
