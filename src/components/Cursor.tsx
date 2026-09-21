import { useEffect, useRef } from "react"
import { prefersReducedMotion } from "@/hooks/useMotion"

const rgba = (hex: string, a: number) => {
  const h = hex.replace("#", "").trim()
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h
  const n = parseInt(full, 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

/**
 * The two-part custom cursor carried over from the original site.
 *
 * It inverts over anything marked [data-cursor-invert]. The dot is painted in
 * --color-foreground, which is also the fill of the dark bands, so without
 * this it disappears entirely on the newsletter, ticker, footer and the
 * expanded gallery image.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Read the palette rather than restating it, so a retheme carries through.
    const css = getComputedStyle(document.documentElement)
    const val = (name: string, fallback: string) =>
      css.getPropertyValue(name).trim() || fallback
    const DARK = val("--color-foreground", "#3d3027")
    const LIGHT = val("--color-primary-foreground", "#fbf6ea")
    const RING = val("--color-ring", "#a67c52")

    let mx = 0, my = 0, rx = 0, ry = 0, frame = 0
    let hovering = false
    let inverted = false

    const paint = () => {
      const base = inverted ? LIGHT : DARK
      dot.style.background = base
      ring.style.borderColor = hovering
        ? rgba(inverted ? LIGHT : RING, inverted ? 0.7 : 0.55)
        : rgba(base, inverted ? 0.5 : 0.35)
    }
    paint()

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = `${mx}px`
      dot.style.top = `${my}px`
      dot.style.opacity = "1"
      ring.style.opacity = "1"

      const next = Boolean(
        (e.target as HTMLElement)?.closest?.("[data-cursor-invert]")
      )
      if (next !== inverted) {
        inverted = next
        paint()
      }
    }

    const loop = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = `${rx}px`
      ring.style.top = `${ry}px`
      frame = requestAnimationFrame(loop)
    }

    const setHover = (on: boolean) => (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest?.("a,button,[data-cursor-grow]")) return
      hovering = on
      dot.style.transform = on ? "translate(-50%,-50%) scale(2)" : "translate(-50%,-50%)"
      ring.style.transform = on ? "translate(-50%,-50%) scale(1.5)" : "translate(-50%,-50%)"
      paint()
    }
    const onOver = setHover(true)
    const onOut = setHover(false)

    document.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseout", onOut)
    frame = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseout", onOut)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground opacity-0 transition-[transform,background-color] duration-100 max-[1024px]:hidden"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/35 opacity-0 transition-[transform,border-color] duration-200 max-[1024px]:hidden"
      />
    </>
  )
}
