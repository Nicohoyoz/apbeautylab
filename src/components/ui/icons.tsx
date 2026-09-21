import type { SVGProps } from "react"

/** Inline social marks, traced from the pre-migration nav SVGs. */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M14 3v11.6a4.1 4.1 0 1 1-3.3-4.02" />
      <path d="M14 3.2c.45 2.7 2.5 4.6 5.2 4.8" />
    </svg>
  )
}
