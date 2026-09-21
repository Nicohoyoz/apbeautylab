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
    surface: "bg-ink text-paper hover:bg-bark",
    edge: "bg-warm",
    rotor: "var(--color-paper)",
  },
  secondary: {
    surface: "bg-warm text-ink hover:bg-stone/50",
    edge: "bg-stone/40",
    rotor: "var(--color-bark)",
  },
  outline: {
    surface: "bg-paper text-ink hover:bg-off",
    edge: "bg-stone/70",
    rotor: "var(--color-ink)",
  },
  // Lowest priority: no rotating edge at all, per the brief.
  ghost: {
    surface: "bg-transparent text-taupe hover:text-ink",
    edge: "bg-transparent",
    rotor: null,
  },
  danger: {
    surface: "bg-clay text-paper hover:bg-clay/90",
    edge: "bg-clay/40",
    rotor: "var(--color-paper)",
  },
}

const SIZES: Record<ButtonSize, string> = {
  sm: "gap-1.5 px-4 py-2 text-[0.55rem] tracking-[0.2em]",
  md: "gap-2 px-6 py-3 text-[0.6rem] tracking-[0.24em]",
  lg: "gap-2.5 px-9 py-4 text-[0.65rem] tracking-[0.26em]",
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
    className,
    children,
    ...rest
  } = props

  const v = VARIANTS[variant]
  const isAnchor = typeof (props as AnchorProps).href === "string"
  const isDisabled =
    loading || (!isAnchor && Boolean((rest as ButtonHTMLAttributes<HTMLButtonElement>).disabled))

  const shell = cn(
    "group relative isolate inline-flex select-none overflow-hidden rounded-[3px] p-px align-middle",
    "transition-[opacity,box-shadow] duration-300",
    "focus-within:outline-none",
    variant === "ghost" ? "shadow-none" : "shadow-[0_2px_10px_-6px_rgba(26,20,16,0.5)]",
    isDisabled && "pointer-events-none opacity-45",
    fullWidth ? "flex w-full" : "inline-flex",
    v.edge,
    className
  )

  const surface = cn(
    "relative z-10 inline-flex w-full items-center justify-center whitespace-nowrap rounded-[2px]",
    "font-sans uppercase no-underline",
    "transition-[background-color,color,letter-spacing] duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
    "active:translate-y-px",
    SIZES[size],
    v.surface
  )

  const body = (
    <>
      {v.rotor && (
        <span
          aria-hidden="true"
          className="btn-rotor pointer-events-none absolute inset-0 rounded-[3px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 data-[always=true]:opacity-90"
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
      disabled={isDisabled}
      aria-busy={loading || undefined}
    >
      {body}
    </button>
  )
}
