import type { SVGProps } from "react"

/**
 * Line-art esthetician tools, drawn to match the weight of the social marks
 * in icons.tsx. Generic icon sets carry none of these, so they are hand-built.
 */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

export function TweezersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M9.4 3.2c-.9 6-1.1 12 2.6 17.6" />
      <path d="M14.6 3.2c.9 6 1.1 12-2.6 17.6" />
      <path d="M9.1 7h5.8" />
    </svg>
  )
}

export function SpoolieIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M12 21.5v-7.2" />
      <rect x="9.4" y="2.8" width="5.2" height="11.4" rx="2.6" />
      <path d="M9.4 6.2h5.2M9.4 8.8h5.2M9.4 11.4h5.2" />
    </svg>
  )
}

export function DropperIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <rect x="9.3" y="2.6" width="5.4" height="4" rx="1.2" />
      <path d="M10.9 6.6h2.2v8.6L12 19l-1.1-3.8z" />
    </svg>
  )
}

export function RollerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M3.4 20.6l6.4-6.4" />
      <ellipse cx="15.2" cy="8.8" rx="5.4" ry="3.6" transform="rotate(-45 15.2 8.8)" />
      <path d="M11.4 12.6l1.6 1.6" />
    </svg>
  )
}

export function GuaShaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M3.6 8.4c4.2-3.8 12.6-3.8 16.8 0-2.1 6-6.3 10.2-8.4 12.2-2.1-2-6.3-6.2-8.4-12.2z" />
      <path d="M8 8.6c2.6-1.2 5.4-1.2 8 0" />
    </svg>
  )
}

export function CottonRoundIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="4.6" />
    </svg>
  )
}

export function SparkleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M12 2.8l1.7 5.6 5.5 1.7-5.5 1.7-1.7 5.6-1.7-5.6L4.8 10.1l5.5-1.7z" />
    </svg>
  )
}
