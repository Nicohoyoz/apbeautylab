import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from "react"
import { cn } from "@/lib/utils"

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
export type ButtonSize = "sm" | "md" | "lg"

interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  /** GSAP pull toward the cursor. Defaults on for primary/danger, like the rotor. */
  magnetic?: boolean
  className?: string
  children?: ReactNode
}

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined
  }

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string
  }

/** Per-variant surface, plus how strong the rotating edge reads. */
const VARIANTS: Record<
  ButtonVariant,
  { surface: string; edge: string; rotor: string | null }
> = {
  primary: {
    surface: "bg-primary text-primary-foreground hover:bg-chart-5",
    edge: "bg-border",
    rotor: "var(--color-primary-foreground)",
  },
  secondary: {
    surface: "bg-secondary text-secondary-foreground hover:bg-accent",
    edge: "bg-border",
    rotor: "var(--color-primary)",
  },
  outline: {
    surface: "bg-card text-foreground hover:bg-muted",
    edge: "bg-ring",
    rotor: "var(--color-foreground)",
  },
  // Lowest priority: no rotating edge at all, per the brief.
  ghost: {
    surface: "bg-transparent text-muted-foreground hover:text-foreground",
    edge: "bg-transparent",
    rotor: null,
  },
  danger: {
    surface: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    edge: "bg-destructive/40",
    rotor: "var(--color-destructive-foreground)",
  },
}

/* Type is the overline step across all sizes; only the box changes. */
const SIZES: Record<ButtonSize, string> = {
  sm: "gap-1.5 px-4 py-2",
  md: "gap-2 px-6 py-3",
  lg: "gap-2.5 px-8 py-4",
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="absolute h-3.5 w-3.5 animate-spin rounded-full border border-current border-t-transparent motion-reduce:animate-none"
    />
  )
}

/**
 * The one button in the system. Renders an <a> when given `href` so nav
 * anchors keep working, and a <button> otherwise.
 *
 * The rotating edge lives on a decorative layer underneath the surface, so
 * label and icons never move. Sizing is identical across every state, so
 * hover, focus and loading cause no layout shift.
 */
export function Button(props: ButtonProps | AnchorProps) {
  const {
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    magnetic,
    className,
    children,
    ...rest
  } = props

  const v = VARIANTS[variant]
  const isMagnetic = magnetic ?? (variant === "primary" || variant === "danger")
  const isAnchor = typeof (props as AnchorProps).href === "string"
  const isDisabled =
    loading || (!isAnchor && Boolean((rest as ButtonHTMLAttributes<HTMLButtonElement>).disabled))

  const shell = cn(
    "group relative isolate inline-flex select-none overflow-hidden rounded-[var(--radius)] p-px align-middle",
    "transition-[opacity,box-shadow] duration-300",
    "focus-within:outline-none",
    variant === "ghost" ? "shadow-none" : "shadow-[0_2px_10px_-6px_rgba(61,48,39,0.5)]",
    isDisabled && "pointer-events-none opacity-45",
    fullWidth ? "flex w-full" : "inline-flex",
    v.edge,
    className
  )

  const surface = cn(
    "relative z-10 inline-flex w-full items-center justify-center whitespace-nowrap rounded-[calc(var(--radius)-1px)]",
    "font-sans text-[0.75rem] font-medium tracking-[0.08em] uppercase no-underline",
    "transition-[background-color,color] duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "active:translate-y-px",
    SIZES[size],
    v.surface
  )

  const body = (
    <>
      {v.rotor && (
        <span
          aria-hidden="true"
          className="btn-rotor pointer-events-none absolute inset-0 rounded-[var(--radius)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 data-[always=true]:opacity-90"
          data-always={variant === "primary" || variant === "danger"}
          style={{ "--btn-rotor-hi": v.rotor } as CSSProperties}
        />
      )}
      <span className={surface}>
        {loading && <Spinner />}
        <span
          className={cn(
            "inline-flex items-center",
            SIZES[size].split(" ")[0], // keep the icon gap
            loading && "opacity-0"
          )}
        >
          {children}
        </span>
      </span>
    </>
  )

  if (isAnchor) {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a
        {...anchorRest}
        className={shell}
        data-magnetic={isMagnetic && !isDisabled ? "" : undefined}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : anchorRest.tabIndex}
      >
        {body}
      </a>
    )
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button
      type={buttonRest.type ?? "button"}
      {...buttonRest}
      className={shell}
      data-magnetic={isMagnetic && !isDisabled ? "" : undefined}
      disabled={isDisabled}
      aria-busy={loading || undefined}
    >
      {body}
    </button>
  )
}
